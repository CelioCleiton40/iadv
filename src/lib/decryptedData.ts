import { createDecipheriv } from "crypto";

export function decryptData(encryptedData: string, iv: string, authTag: string): string {
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, "utf8");

  if (!key || key.length !== 32) {
    throw new Error("A chave de descriptografia (ENCRYPTION_KEY) deve ter exatamente 32 caracteres.");
  }

  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]);

  return decryptedData.toString("utf8");
}