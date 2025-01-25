// src/lib/auth.ts

import { User } from "@/types/user";
import { loginUser } from "@/utils/auth-api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
 


declare module "next-auth" {
    interface Session {
        user: User;
        accessToken: string;
      }
    
      interface JWT {
        user: User;
        accessToken: string;
      }
  }


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            // console.log("credentials:", credentials);
          if (!credentials) {
            throw new Error("Credentials not provided");
          }
  
          try {
            // console.log("credentials:", credentials);
            const data = await loginUser(credentials.username, credentials.password);
            // console.log('data:',data);
            // Explicitly return a User type
            const user: User = {
              id: String(data.user.id),
              username: data.user.username,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              organization: data.user.organization,
              token: data.token,
            };
  
            return user; // Return the user object
          } catch (error: any) {
            console.error("Login error:", error);
            throw new Error(error.response?.data?.message || "Login failed");
          }
        },
      }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        console.log("token details:", token);
        token.accessToken = (user as User).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET,
};
