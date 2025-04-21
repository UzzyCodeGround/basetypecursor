import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"

// Your config
export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        (session.user as any).id = token.sub
      }
      return session
    },
  }
}

// Create the handler once
const handler = NextAuth(authOptions)

// ✅ Export it to handle GET and POST
export { handler as GET, handler as POST }