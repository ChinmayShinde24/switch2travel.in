import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import { signupSchema } from "@/lib/auth-validation"
import {
  hashPassword,
  setAuthSession,
  toPublicUser,
} from "@/lib/auth-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Security: public signup can never create admins (ignore/reject role)
    if (body?.role === "admin") {
      return NextResponse.json(
        {
          error:
            "Admin accounts cannot be created from signup. Use the admin bootstrap API.",
        },
        { status: 403 }
      )
    }

    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid signup data" },
        { status: 400 }
      )
    }

    // Always force user — never trust client role
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
      role: "user",
    })

    await setAuthSession({
      _id: String(user._id),
      role: "user",
    })

    return NextResponse.json(
      { user: toPublicUser(user) },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Unable to create account right now" },
      { status: 500 }
    )
  }
}
