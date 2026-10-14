import { upload } from "@imagekit/next"
import type { CategoryImage } from "@/types/category"

type UploadAuthResponse = {
  token: string
  expire: number
  signature: string
  publicKey: string
  folder: string
  error?: string
}

/** Fetch ImageKit signed params and upload a file; returns CategoryImage fields. */
export async function uploadCategoryImage(file: File): Promise<CategoryImage> {
  const authResponse = await fetch("/api/admin/uploads/auth", {
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
