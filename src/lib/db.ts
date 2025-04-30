import { User } from "@/models/userModel";

const users: User[] = [];

export const db = {
  user: {
    findUnique: (email: string) =>
      users.find((user) => user.email === email),
    create: (data: User) => {
      users.push(data);
      return data;
    },
  },
};