import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import type { AuthTokenPayload, PublicUser, UserRole } from "@/types/user"
import type { UserDocument } from "@/models/User"

export const AUTH_COOKIE = "s2t_token"

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables")
  }
  return new TextEncoder().encode(secret)
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash)
}

export function toPublicUser(user: UserDocument): PublicUser {
  return {
    id: String(user._id),
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role as UserRole,
  }
}

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
}

export async function createAuthToken(payload: AuthTokenPayload) {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d"

  return new SignJWT({
    _id: payload._id,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload._id)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getJwtSecret())
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret())
  const _id =
    typeof payload._id === "string"
      ? payload._id
      : typeof payload.sub === "string"
        ? payload.sub
        : null
  const role = payload.role

  if (!_id || (role !== "user" && role !== "admin")) {
    return null
  }

  return { _id, role } satisfies AuthTokenPayload
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  // Overwrite then delete so the browser fully drops the session cookie
  cookieStore.set(AUTH_COOKIE, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  })
  cookieStore.delete(AUTH_COOKIE)
}

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE)?.value ?? null
}
