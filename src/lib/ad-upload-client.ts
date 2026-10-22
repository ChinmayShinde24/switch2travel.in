"use client"

import { upload } from "@imagekit/next"
import type { AdImage } from "@/types/ad"

type UploadAuthResponse = {
  token: string
  expire: number
  signature: string
  publicKey: string
  folder: string
  error?: string
}

/** Client-side ImageKit upload for home ad banners. */
export async function uploadAdImage(file: File): Promise<AdImage> {
  const authResponse = await fetch("/api/admin/uploads/auth?purpose=ad", {
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
