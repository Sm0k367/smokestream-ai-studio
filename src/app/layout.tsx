import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Corrected import for Geist
import { GeistMono } from "geist/font/mono"; // Corrected import for Geist Mono
import "./globals.css";
import { Providers } from "@/components/providers"; // Assuming this is for NextAuth SessionProvider

export const metadata: Metadata = {
  title: "SmokeStream AI Studio - Unrestricted Media Generation",
  description: "Generate any type of media with AI - text, images, audio, video, code, and music without restrictions.",
  keywords: ["AI", "media generation", "chatbot", "SaaS", "artificial intelligence", "SmokeStream"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    

html
); }

