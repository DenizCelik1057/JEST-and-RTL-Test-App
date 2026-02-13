import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const users = [
  { id: "1", name: "Admin", email: "admin@test.com", password: "password" },
  { id: "2", name: "Test User", email: "test@test.com", password: "1234" }
]

export const auth = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@test.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Admin", email: "admin@test.com" }
        }
        return null
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
})