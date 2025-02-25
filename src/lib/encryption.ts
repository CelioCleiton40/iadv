import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export function encryptData(text: string): { encryptedData: string; iv: string } {
  const iv = randomBytes(16)
  const cipher = createCipheriv("aes-256-gcm", process.env.ENCRYPTION_KEY!, iv)
  
  const encryptedData = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ])

  return {
    encryptedData: encryptedData.toString("hex"),
    iv: iv.toString("hex"),
  }
}