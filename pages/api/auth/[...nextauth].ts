import NextAuth, { NextAuthOptions }  from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GoogleProvider({
        /* @ts-ignore */
          clientId: process.env.GOOGLE_CLIENT_ID,
        /* @ts-ignore */
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    theme: {
      colorScheme: "light",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token, user }) {
        return session // The return type will match the one returned in `useSession()`
      },
    },
  }
  
  export default NextAuth(authOptions)