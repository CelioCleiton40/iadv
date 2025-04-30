import { RegisterSchema, type User } from "@/models/userModel";

export async function validateRegister(userData: unknown): Promise<User> {
  const parsed = RegisterSchema.parse(userData);
  return parsed as User;
}