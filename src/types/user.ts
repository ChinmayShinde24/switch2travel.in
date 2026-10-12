export const USER_ROLES = ["user", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

export type PublicUser = {
  id: string
  name: string
  phone: string
  email: string
  role: UserRole
}

export type SignupInput = {
  name: string
  phone: string
  email: string
  password: string
}

export type LoginInput = {
  phone: string
  password: string
}

export type AuthTokenPayload = {
  _id: string
  role: UserRole
}
