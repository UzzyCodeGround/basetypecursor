// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

console.log("NextAuth URL:", process.env.NEXTAUTH_URL)

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }