import { upload } from "@imagekit/next"
import type { AdImage } from "@/types/ad"
import type { CategoryImage } from "@/types/category"
import type { CityImage } from "@/types/city"
import type { TripImage } from "@/types/trip"

type UploadAuthResponse = {
  token: string
  expire: number
  signature: string
  publicKey: string
  folder: string
  error?: string
}

async function uploadWithAuth(
  file: File,
  authUrl: string
): Promise<TripImage> {
  const authResponse = await fetch(authUrl, {
    credentials: "include",
    cache: "no-store",
  })
  const auth = (await authResponse.json()) as UploadAuthResponse

  if (!authResponse.ok) {
    throw new Error(auth.error ?? "Unable to get upload credentials")
  }

  const result = await upload({
    file,
    fileName: file.name,
    token: auth.token,
    expire: auth.expire,
    signature: auth.signature,
    publicKey: auth.publicKey,
    folder: auth.folder,
  })

  if (!result.url || !result.fileId || !result.filePath) {
    throw new Error("ImageKit upload returned incomplete data")
  }

  return {
    url: result.url,
    fileId: result.fileId,
    filePath: result.filePath,
  }
}

/** Fetch ImageKit signed params and upload a file; returns CategoryImage fields. */
export async function uploadCategoryImage(file: File): Promise<CategoryImage> {
  return uploadWithAuth(file, "/api/admin/uploads/auth?purpose=category")
}

export async function uploadCityImage(file: File): Promise<CityImage> {
  return uploadWithAuth(file, "/api/admin/uploads/auth?purpose=city")
}

/** Upload home ad banners into /switch2travel/ads. */
export async function uploadAdImage(file: File): Promise<AdImage> {
  return uploadWithAuth(file, "/api/admin/uploads/auth?purpose=ad")
}

/** Upload into /switch2travel/trips/<tripKey>. */
export async function uploadTripImage(
  file: File,
  tripKey: string
): Promise<TripImage> {
  const key = encodeURIComponent(tripKey.trim() || "untitled")
  return uploadWithAuth(
    file,
    `/api/admin/uploads/auth?purpose=trip&tripKey=${key}`
  )
}
