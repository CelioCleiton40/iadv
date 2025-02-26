import { z } from "zod";

// Schema para o formulário de login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Schema para o formulário de registro
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres"),
    lastName: z
      .string()
      .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
      .max(50, "O sobrenome deve ter no máximo 50 caracteres"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Formato de e-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Types inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;