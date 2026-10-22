import { getUploadAuthParams } from "@imagekit/next/server"

/** Server-only URL endpoint (not NEXT_PUBLIC_). */
export function getImageKitUrlEndpoint() {
  return (
    process.env.NEXT_IMAGEKIT_URL_ENDPOINT?.trim() ||
    process.env.IMAGEKIT_URL_ENDPOINT?.trim() ||
    null
  )
}

export function getImageKitUploadAuth() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY

  if (!privateKey || !publicKey) {
    throw new Error("Missing ImageKit keys in environment variables")
  }

  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  })

  return {
    token,
    expire,
    signature,
    publicKey,
    urlEndpoint: getImageKitUrlEndpoint(),
  }
}
