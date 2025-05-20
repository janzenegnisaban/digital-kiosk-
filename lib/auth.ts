import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        if (credentials?.email === "admin@example.com" && credentials?.password === "password") {
          return {
            id: "admin",
            name: "Admin User",
            email: credentials.email,
            isAdmin: true,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      session.user = session.user || {}
      session.user.isAdmin = token.isAdmin as boolean
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
}
