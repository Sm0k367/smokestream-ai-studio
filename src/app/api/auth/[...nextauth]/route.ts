import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Make sure src/lib/prisma.ts exists and is correct
import bcrypt from 'bcryptjs';   // Make sure bcryptjs is installed

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Optional: Consider for full DB session/account management
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          console.log("Auth Error: Missing email or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("Auth Error: No user found with email:", credentials.email);
            return null;
          }

          if (!user.hashedPassword) {
            console.log("Auth Error: User does not have a hashed password set:", user.email);
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isValidPassword) {
            console.log("Auth Error: Invalid password for user:", credentials.email);
            return null;
          }

          console.log("User authenticated successfully:", user.email);
          return {
            id: user.id,
            name: user.name ?? "User", // Provide a default if name is null
            email: user.email,
            image: user.image ?? null,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      }
    }),
    // Example Google Provider (configure if needed)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/', // Redirects to landing page if sign-in is required
    // error: '/auth/error', // Optional: custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // You can add other user properties to the token here if needed
        // token.name = user.name;
        // token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        // Retrieve other properties from token if you added them in jwt callback
        // session.user.name = token.name as string | null | undefined;
        // session.user.image = token.picture as string | null | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development', // Uncomment for more verbose logs during development
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
