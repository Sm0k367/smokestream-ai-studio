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

export function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // This state isn't used yet, but can be for a demo video modal

  const features = [
    {
      icon: 

MessageSquare
, // Added text color for visibility title: "AI Chatbot Interface", description: "Natural conversation with unlimited AI capabilities" }, { icon:


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

const pricingFeatures = [ "Unlimited AI generations", "All media types supported", "Priority processing", "Advanced AI models", "API access", "24/7 support", "Commercial usage rights", "Custom model training (soon)" ];

return (


div

span
        </div>
        

div
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
