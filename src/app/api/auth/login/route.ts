import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import { loginSchema } from "@/lib/auth-validation"
import {
  setAuthSession,
  toPublicUser,
  verifyPassword,
} from "@/lib/auth-server"
import { phoneLookupCandidates } from "@/lib/phone"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid login data" },
        { status: 400 }
      )
    }

    const { phone, password } = parsed.data
    await connectDB()

    const candidates = phoneLookupCandidates(phone)
    const user = await User.findOne({ phone: { $in: candidates } }).select(
      "+passwordHash"
    )

    if (!user?.passwordHash) {
      return NextResponse.json(
        { error: "Invalid phone or password" },
        { status: 401 }
      )
    }

    // Repair legacy records that stored country code with the number
    if (user.phone !== phone && phone.length === 10) {
      const taken = await User.findOne({ phone, _id: { $ne: user._id } }).lean()
      if (!taken) {
        user.phone = phone
        await user.save()
      }
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid phone or password" },
        { status: 401 }
      )
    }

    const token = await setAuthSession({
      _id: String(user._id),
      role: user.role as "user" | "admin",
    })

    return NextResponse.json({ user: toPublicUser(user), token })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Unable to sign in right now" },
      { status: 500 }
    )
  }
}
