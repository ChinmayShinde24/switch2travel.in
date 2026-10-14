import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import type { AuthTokenPayload, PublicUser, UserRole } from "@/types/user"
import type { UserDocument } from "@/models/User"

/** JWT session cookie (opaque) — contains signed `_id` + `role` claims. */
export const AUTH_COOKIE = "s2t_token"
/** Plain httpOnly copy of user `_id` for DevTools / server reads. */
export const AUTH_ID_COOKIE = "s2t_uid"
/** Plain httpOnly copy of `role` for DevTools / server reads. */
export const AUTH_ROLE_COOKIE = "s2t_role"

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

  // Explicitly embed `_id` and `role` in the JWT payload
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

/** Login / signup: save JWT + `_id` + `role` cookies (all httpOnly). Returns JWT for Postman/Bearer use. */
export async function setAuthSession(payload: AuthTokenPayload) {
  const token = await createAuthToken(payload)
  const cookieStore = await cookies()
  const maxAge = 60 * 60 * 24 * 7

  cookieStore.set(AUTH_COOKIE, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge,
  })
  cookieStore.set(AUTH_ID_COOKIE, payload._id, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge,
  })
  cookieStore.set(AUTH_ROLE_COOKIE, payload.role, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge,
  })

  return token
}

/** @deprecated Prefer setAuthSession — kept for any direct token callers. */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  const cleared = {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  }

  // Clear JWT + identity cookies completely on logout
  for (const name of [AUTH_COOKIE, AUTH_ID_COOKIE, AUTH_ROLE_COOKIE]) {
    cookieStore.set(name, "", cleared)
    cookieStore.delete(name)
  }
}

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE)?.value ?? null
}
