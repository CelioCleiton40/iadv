import { z } from "zod";
import DOMPurify from "dompurify";

// Schema para o formulário de login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine((val) => DOMPurify.sanitize(val) === val, {
      message: "E-mail contém caracteres inválidos",
    }),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres") // Aumentado o mínimo para 8 caracteres
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
    ),
});

// Schema para o formulário de registro
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres")
      .refine((val) => DOMPurify.sanitize(val) === val, {
        message: "Nome contém caracteres inválidos",
      }),
    lastName: z
      .string()
      .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
      .max(50, "O sobrenome deve ter no máximo 50 caracteres")
      .refine((val) => DOMPurify.sanitize(val) === val, {
        message: "Sobrenome contém caracteres inválidos",
      }),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Formato de e-mail inválido")
      .refine((val) => DOMPurify.sanitize(val) === val, {
        message: "E-mail contém caracteres inválidos",
      }),
    password: z
      .string()
      .min(10, "A senha deve ter pelo menos 10 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
      ),
  })
  .refine((data) => data.password === data.password, {
    message: "As senhas não coincidem",
    path: ["password"], // Exibe o erro no campo 'password'
  });



// Types inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;