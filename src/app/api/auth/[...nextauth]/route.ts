import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Import other providers like Google, GitHub etc. if you plan to use them
// import GoogleProvider from "next-auth/providers/google";

// --- FOR PRODUCTION: UNCOMMENT AND CONFIGURE PRISMA ADAPTER ---
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client"; // Or your specific prisma client path
// const prisma = new PrismaClient(); // Or your specific prisma client instance
// import bcrypt from 'bcryptjs'; // You'll need bcryptjs for password hashing

export const authOptions: NextAuthOptions = {
  // --- FOR PRODUCTION: UNCOMMENT AND CONFIGURE PRISMA ADAPTER ---
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // --- THIS IS THE CORE LOGIC YOU NEED TO IMPLEMENT ---
        // Replace with actual database lookup and password comparison
        console.log("Mock authorize called with email:", credentials.email); // For debugging
        // For now, let's return a mock user for testing if email is provided
        // DO NOT USE THIS IN PRODUCTION.
        return {
          id: "mockUserId-" + Math.random().toString(36).substring(7),
          name: "Mock User",
          email: credentials.email,
          image: null,
        };
      }
    }),
    // Example Google Provider
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
    // error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development', // Optional: for more logs
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // This should be the VERY LAST line.
