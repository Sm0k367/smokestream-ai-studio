import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Import other providers like Google, GitHub etc. if you plan to use them
// import GoogleProvider from "next-auth/providers/google";

// If using Prisma Adapter
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma"; // Your prisma client instance

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Uncomment if using Prisma Adapter
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add your own authentication logic here.
        // This is just a placeholder.
        // You'll need to query your database to verify the user.
        // Example:
        // const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
        // if (user && credentials?.password && (await bcrypt.compare(credentials.password, user.password))) {
        //   return { id: user.id, name: user.name, email: user.email, image: user.image };
        // }
        
        // For now, let's return a mock user for testing if email is provided
        if (credentials?.email) {
          return { id: "1", name: "Test User", email: credentials.email, image: null };
        }
        return null; // Return null if user data could not be retrieved
      }
    }),
    // Example Google Provider (get client ID and secret from Google Cloud Console)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },
  pages: {
    signIn: '/', // Redirect to landing page for sign-in
    // error: '/auth/error', // Custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env.local and Vercel
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
