import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error("A chave de criptografia (ENCRYPTION_KEY) deve ter exatamente 32 caracteres.");
}

export function encryptData(text: string): { encryptedData: string; iv: string; authTag: string } {
  const iv = randomBytes(16);
  const key = Buffer.from(ENCRYPTION_KEY, "utf8");

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encryptedData = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedData: encryptedData.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}

