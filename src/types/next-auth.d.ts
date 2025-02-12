import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    access_token: string;
  }

  interface Session {
    user: {
      role: string;
      access_token: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    access_token: string;
  }
}
