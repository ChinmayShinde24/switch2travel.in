import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import { createAdminSchema } from "@/lib/auth-validation"
import { hashPassword, toPublicUser } from "@/lib/auth-server"

/**
 * Postman-only admin creation.
 * Protected by ADMIN_SETUP_SECRET — not available from the UI signup flow.
 * Public /api/auth/signup always creates role "user".
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Hard reject any attempt that isn't explicitly admin bootstrap
    if (body?.role && body.role !== "admin") {
      return NextResponse.json(
        { error: "Only role \"admin\" is allowed on this endpoint" },
        { status: 400 }
      )
    }

    const parsed = createAdminSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid admin data" },
        { status: 400 }
      )
    }

    const setupSecret = process.env.ADMIN_SETUP_SECRET
    if (!setupSecret || parsed.data.setupSecret !== setupSecret) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, phone, email, password } = parsed.data
    await connectDB()

    const existing = await User.findOne({
      $or: [{ phone }, { email }],
    }).lean()

    if (existing) {
      const conflict =
        existing.phone === phone
          ? "Phone number is already registered"
          : "Email is already registered"
      return NextResponse.json({ error: conflict }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const user = await User.create({
      name,
      phone,
      email,
      passwordHash,
      role: "admin", // always admin here — never from public signup
    })

    return NextResponse.json({ user: toPublicUser(user) }, { status: 201 })
  } catch (error) {
    console.error("Create admin error:", error)
    return NextResponse.json(
      { error: "Unable to create admin right now" },
      { status: 500 }
    )
  }
}
