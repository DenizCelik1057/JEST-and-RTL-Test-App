import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (
          credentials?.email === "admin@test.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Admin", email: "admin@test.com" }
        }
        return null
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
})
