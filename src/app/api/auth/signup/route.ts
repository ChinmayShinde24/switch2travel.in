import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import { signupSchema } from "@/lib/auth-validation"
import {
  createAuthToken,
  hashPassword,
  setAuthCookie,
  toPublicUser,
} from "@/lib/auth-server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid signup data" },
        { status: 400 }
      )
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
      role: "user",
    })

    const token = await createAuthToken({
      _id: String(user._id),
      role: user.role as "user" | "admin",
    })
    await setAuthCookie(token)

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
