import { Schema, models, model, type InferSchemaType, type Model } from "mongoose"
import type { AdStatus } from "@/types/ad"

const adImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    fileId: { type: String, required: true, trim: true },
    filePath: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const adSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    image: {
      type: adImageSchema,
      required: true,
    },
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"] as AdStatus[],
      default: "active",
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export type AdDocument = InferSchemaType<typeof adSchema> & {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const Ad: Model<AdDocument> =
  models.Ad ?? model<AdDocument>("Ad", adSchema)
