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
          console.log("message", data.message);
          if ([401, 403].includes(res.status)) {
            throw new Error(data.message);
          }
        }
        throw new Error("server");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = user.access_token;
        // token.id = profile?.name;
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
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
