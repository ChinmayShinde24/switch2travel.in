import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/models/User"
import {
  getAuthTokenFromCookies,
  toPublicUser,
  verifyAuthToken,
} from "@/lib/auth-server"
import type { PublicUser } from "@/types/user"

function bearerToken(request?: Request): string | null {
  if (!request) return null
  const header = request.headers.get("authorization")
  if (!header) return null
  const [scheme, token] = header.split(" ")
  if (scheme?.toLowerCase() !== "bearer" || !token) return null
  return token.trim()
}

/**
 * Resolve admin session from:
 * 1) Authorization: Bearer <jwt>  (Postman-friendly)
 * 2) httpOnly cookie s2t_token     (browser)
 */
export async function requireAdmin(request?: Request): Promise<
  { user: PublicUser } | { error: NextResponse }
> {
  const token =
    bearerToken(request) ?? (await getAuthTokenFromCookies())

  if (!token) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  const payload = await verifyAuthToken(token)
  if (!payload) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  await connectDB()
  const user = await User.findById(payload._id)
  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  const publicUser = toPublicUser(user)
  if (publicUser.role !== "admin") {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    }
  }

  return { user: publicUser }
}
