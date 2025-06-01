import { LandingPage } from "@/components/landing-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Assuming your authOptions are here
import { getServerSession } from "next-auth/next"; // Correct import for getServerSession
import { redirect } from "next/navigation";

export default async function HomePage() { // Renamed to avoid conflict if 'Home' is a component name
  const session = await getServerSession(authOptions); // Pass authOptions

  if (session) {
    redirect("/dashboard");
  }

  return 

LandingPage
; }
