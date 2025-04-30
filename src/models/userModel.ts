import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hash
};