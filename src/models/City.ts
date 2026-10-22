import { Schema, models, model, type InferSchemaType, type Model } from "mongoose"
import type { CityStatus } from "@/types/city"

const cityImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    fileId: { type: String, required: true, trim: true },
    filePath: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const citySchema = new Schema(
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
      type: cityImageSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"] as CityStatus[],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export type CityDocument = InferSchemaType<typeof citySchema> & {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const City: Model<CityDocument> =
  models.City ?? model<CityDocument>("City", citySchema)
