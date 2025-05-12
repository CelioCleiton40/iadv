import {
    perfilPessoalSchema,
    perfilProfissionalSchema,
    perfilSenhaSchema,
    PerfilPessoal,
    PerfilProfissional,
    PerfilSenha,
  } from "@/type/inter-face-perfil";
  
  export const validarPerfilPessoal = (data: PerfilPessoal) => {
    return perfilPessoalSchema.safeParse(data);
  };
  
  export const validarPerfilProfissional = (data: PerfilProfissional) => {
    return perfilProfissionalSchema.safeParse(data);
  };
  
  export const validarPerfilSenha = (data: PerfilSenha) => {
    return perfilSenhaSchema.safeParse(data);
  };
  