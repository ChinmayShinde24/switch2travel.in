import { Schema, models, model, type InferSchemaType, type Model } from "mongoose"
import type { UserRole } from "@/types/user"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be a 10-digit number"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email must be valid"],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"] as UserRole[],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: Schema.Types.ObjectId
}

export const User: Model<UserDocument> =
  models.User ?? model<UserDocument>("User", userSchema)
