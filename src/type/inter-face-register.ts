export type RegisterUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  
  export type RegisterState = {
    register: (user: RegisterUser) => Promise<string | null>;
  };
  