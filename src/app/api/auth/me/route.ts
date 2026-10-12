import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import {
  getAuthTokenFromCookies,
  toPublicUser,
  verifyAuthToken,
} from "@/lib/auth-server"

export async function GET() {
  try {
    const token = await getAuthTokenFromCookies()
    if (!token) {
      return NextResponse.json({ user: null })
    }

    const payload = await verifyAuthToken(token)
    if (!payload) {
      return NextResponse.json({ user: null })
    }

    await connectDB()
    const user = await User.findById(payload._id)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user: toPublicUser(user) })
  } catch (error) {
    console.error("Auth me error:", error)
    return NextResponse.json({ user: null })
  }
}
