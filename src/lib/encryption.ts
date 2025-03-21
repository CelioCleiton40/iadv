import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const SALT = process.env.ENCRYPTION_SALT || randomBytes(16).toString("hex"); // Salt para derivação de chaves

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
  throw new Error("A chave de criptografia (ENCRYPTION_KEY) deve ter pelo menos 32 caracteres.");
}

// Função assíncrona para derivar a chave de criptografia
async function deriveKey(password: string, salt: string): Promise<Buffer> {
  return promisify(scrypt)(password, salt, 32) as Promise<Buffer>;
}


export async function encryptData(text: string): Promise<{ encryptedData: string; iv: string; authTag: string }> {
  const iv = randomBytes(16); // Vetor de inicialização
  const key = await deriveKey(ENCRYPTION_KEY, SALT); // Deriva a chave usando scrypt

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encryptedData = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedData: encryptedData.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}


export async function decryptData(
  encryptedData: string,
  iv: string,
  authTag: string
): Promise<string> {
  const key = await deriveKey(ENCRYPTION_KEY, SALT); // Deriva a chave usando scrypt
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));

  decipher.setAuthTag(Buffer.from(authTag, "hex"));
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]);

  return decryptedData.toString("utf8");
}