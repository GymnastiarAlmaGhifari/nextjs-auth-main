import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-in",
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jhon@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          throw new Error("Email Anda Belum Terdaftar");
        }

        if (existingUser.password) {
          const passwordMatch = await compare(credentials.password, existingUser.password);

          if (!passwordMatch) {
            throw new Error("Password Anda Salah");
          }
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
      return session;
    },
  },
};