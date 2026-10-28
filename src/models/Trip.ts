import { Schema, models, model, type InferSchemaType, type Model } from "mongoose"
import type { TripDistanceUnit, TripStatus, TripVisibility } from "@/types/trip"

const tripImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    fileId: { type: String, required: true, trim: true },
    filePath: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const tripDistanceSchema = new Schema(
  {
    value: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      enum: ["km", "m", "mi"] as TripDistanceUnit[],
      required: true,
    },
  },
  { _id: false }
)

const tripItineraryDaySchema = new Schema(
  {
    day: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    distance: { type: tripDistanceSchema, required: false },
    // string (HTML) preferred; Mixed keeps legacy string[] readable
    points: {
      type: Schema.Types.Mixed,
      default: "",
    },
  },
  { _id: false }
)

const tripFaqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 10000 },
  },
  { _id: false }
)

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      index: true,
    },
    categoryIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Category" }],
      default: [],
      index: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"] as TripStatus[],
      default: "draft",
      index: true,
    },
    visibility: {
      type: String,
      enum: ["active", "inactive"] as TripVisibility[],
      default: "active",
      index: true,
    },
    cardImage: {
      type: tripImageSchema,
      required: true,
    },
    pickup: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    drop: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    durationDays: {
      type: Number,
      required: true,
      min: 1,
    },
    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    heroImage: {
      type: tripImageSchema,
      required: true,
    },
    galleryImages: {
      type: [tripImageSchema],
      default: [],
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20000,
    },
    itinerary: {
      type: [tripItineraryDaySchema],
      default: [],
    },
    inclusions: {
      type: Schema.Types.Mixed,
      default: "",
    },
    exclusions: {
      type: Schema.Types.Mixed,
      default: "",
    },
    cancellationPolicy: {
      type: Schema.Types.Mixed,
      default: "",
    },
    paymentPolicy: {
      type: Schema.Types.Mixed,
      default: "",
    },
    faqs: {
      type: [tripFaqSchema],
      default: [],
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

tripSchema.index({ status: 1, visibility: 1 })
tripSchema.index({ categoryId: 1, status: 1, visibility: 1 })
tripSchema.index({ categoryIds: 1, status: 1, visibility: 1 })
tripSchema.index({ cityId: 1, status: 1, visibility: 1 })

export type TripDocument = InferSchemaType<typeof tripSchema> & {
  _id: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const Trip: Model<TripDocument> =
  models.Trip ?? model<TripDocument>("Trip", tripSchema)
