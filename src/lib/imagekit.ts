import { getUploadAuthParams } from "@imagekit/next/server"

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

  return { token, expire, signature, publicKey }
}
