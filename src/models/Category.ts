import { Schema, models, model, type InferSchemaType, type Model } from "mongoose"
import type { CategoryStatus } from "@/types/category"

const categoryImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    fileId: { type: String, required: true, trim: true },
    filePath: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    image: {
      type: categoryImageSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"] as CategoryStatus[],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const Category: Model<CategoryDocument> =
  models.Category ?? model<CategoryDocument>("Category", categorySchema)
