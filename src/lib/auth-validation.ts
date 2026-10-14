import { z } from "zod"
import { isValidIndianMobile, normalizeIndianPhone } from "@/lib/phone"

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => normalizeIndianPhone(value))
  .refine(isValidIndianMobile, {
    message: "Enter a 10-digit phone number (without +91)",
  })

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email").toLowerCase(),
  password: passwordSchema,
})

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "Password is required"),
})

/**
 * Postman-only admin bootstrap.
 * Public /api/auth/signup must never accept role — this schema is separate.
 */
export const createAdminSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email").toLowerCase(),
  password: passwordSchema,
  role: z.literal("admin"),
  setupSecret: z.string().min(1, "setupSecret is required"),
})
