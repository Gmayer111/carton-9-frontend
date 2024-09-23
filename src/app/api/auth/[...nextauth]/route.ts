import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const res = await fetch(`${process.env.API_PATH}/auth/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (res.status === 200) {
          const json: { role: string; access_token: string } = await res.json();

          return json;
        } else {
          const data = await res.json();
          if ([401, 403].includes(res.status)) {
            throw new Error(data.message);
          }
        }
        throw new Error("server");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = user.access_token;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          role: token.role,
          access_token: token.access_token,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
