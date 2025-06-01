"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Image as ImageIcon,
  Music,
  Video,
  Code,
  MessageSquare,
  Sparkles,
  Check,
  ArrowRight,
  Play
} from "lucide-react";
import Link from "next/link"; // Import Link for Next.js navigation

export function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    { icon: 

MessageSquare
, title: "AI Chatbot Interface", description: "Natural conversation with unlimited AI capabilities" }, { icon:


ImageIcon
, title: "Image Generation", description: "Create stunning visuals from text descriptions" }, { icon:


Music
, title: "Music & Audio", description: "Generate beats, songs, and audio content" }, { icon:


Video
, title: "Video Creation", description: "AI-powered video generation and editing" }, { icon:


Code
, title: "Code Generation", description: "Write, debug, and optimize code in any language" }, { icon:


Sparkles
, title: "Unlimited Access", description: "No restrictions on content or generation types" } ];

const pricingFeatures = [ "Unlimited AI generations", "All media types supported", "Priority processing", "Advanced AI models", "API access (coming soon)", "24/7 support", "Commercial usage rights", "Custom model training (enterprise)" ];

// Function to handle Stripe checkout link const handleGetStartedStripe = () => { window.open("https://buy.stripe.com/7sI3dlgcQ4uL0gMeUW", "_blank"); };

return (


div
        {/* Mobile menu button can be added here */}
      </div>
    </div>
  </nav>

  {/* Hero Section */}
  

section
  {/* Features Section */}
  

section
  {/* Pricing Section */}
  

section
  {/* CTA Section */}
  

section
  {/* Footer */}
  

footer
</div>
); }
