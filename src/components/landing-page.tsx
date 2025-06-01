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
    { icon: <MessageSquare className="h-8 w-8 text-indigo-500" />, title: "AI Chatbot Interface", description: "Natural conversation with unlimited AI capabilities" },
    { icon: <ImageIcon className="h-8 w-8 text-indigo-500" />, title: "Image Generation", description: "Create stunning visuals from text descriptions" },
    { icon: <Music className="h-8 w-8 text-indigo-500" />, title: "Music & Audio", description: "Generate beats, songs, and audio content" },
    { icon: <Video className="h-8 w-8 text-indigo-500" />, title: "Video Creation", description: "AI-powered video generation and editing" },
    { icon: <Code className="h-8 w-8 text-indigo-500" />, title: "Code Generation", description: "Write, debug, and optimize code in any language" },
    { icon: <Sparkles className="h-8 w-8 text-indigo-500" />, title: "Unlimited Access", description: "No restrictions on content or generation types" }
  ];

  const pricingFeatures = [
    "Unlimited AI generations",
    "All media types supported",
    "Priority processing",
    "Advanced AI models",
    "API access (coming soon)",
    "24/7 support",
    "Commercial usage rights",
    "Custom model training (enterprise)"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">SmokeStream AI</span>
            </div>
            <div className="space-x-4">
              <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</Button>
              <Button variant="ghost" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Pricing</Button>
              <Button variant="ghost">Docs</Button>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <a href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold md:text-6xl">The Future of Content Creation is Here</h1>
          <p className="mt-6 text-xl text-indigo-100">
            SmokeStream AI empowers you to generate any type of media with unparalleled freedom and power.
            No limits, just pure creation.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" className="text-indigo-700 hover:bg-gray-100" onClick={() => setIsVideoPlaying(true)}>
              <Play className="mr-2 h-5 w-5" /> See it in Action
            </Button>
            <Button size="lg" className="ml-4 bg-white text-indigo-700 hover:bg-gray-100" asChild>
               <a href="/dashboard">Start Creating Now <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
          <div className="mt-12 relative mx-auto w-full max-w-3xl h-72 rounded-xl shadow-2xl overflow-hidden">
            {/* Placeholder for a demo video or image */}
            <img src="https://placehold.co/1200x600/7e5bef/white?text=SmokeStream+AI+Demo" alt="SmokeStream AI Demo" className="w-full h-full object-cover" />
            {isVideoPlaying && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsVideoPlaying(false)}>
                    <div className="bg-white p-4 rounded-lg max-w-4xl w-full aspect-video relative" onClick={(e) => e.stopPropagation()}>
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Demo Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <Button variant="ghost" size="icon" className="absolute -top-4 -right-4 bg-white hover:bg-gray-200 rounded-full" onClick={() => setIsVideoPlaying(false)}>X</Button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-indigo-600 border-indigo-600">Core Features</Badge>
            <h2 className="mt-4 text-4xl font-bold text-gray-800">Everything You Need, Nothing You Don't</h2>
            <p className="mt-4 text-lg text-gray-600">
              Generate diverse content types with our powerful and intuitive AI engine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-indigo-600 border-indigo-600">Simple Pricing</Badge>
            <h2 className="mt-4 text-4xl font-bold text-gray-800">Get Unlimited Access</h2>
            <p className="mt-4 text-lg text-gray-600">
              One simple plan for everything. Unlock the full potential of AI content creation.
            </p>
          </div>
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl bg-white">
              <CardHeader className="text-center bg-indigo-50 p-8">
                <CardTitle className="text-3xl font-bold text-indigo-600">Pro Plan</CardTitle>
                <CardDescription className="text-gray-600 mt-2">All-inclusive access to SmokeStream AI.</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-extrabold text-gray-900">$29</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {pricingFeatures.map((item) => (
                    <li key={item} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700">
                  Get Started with Pro <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Cancel anytime. 7-day money-back guarantee.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Ready to Revolutionize Your Workflow?</h2>
          <p className="mt-6 text-xl text-indigo-100">
            Join thousands of creators, developers, and businesses leveraging SmokeStream AI.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" className="text-indigo-700 hover:bg-gray-100" asChild>
               <a href="/dashboard">Start Your Free Trial Today <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-800 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">SmokeStream AI</h3>
              <p className="mt-2 text-sm">Unleashing creative potential with artificial intelligence.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Email: support@smokestream.ai</li>
                <li>Twitter: @SmokeStreamAI</li>
                {/* Social media icons can be added here */}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} SmokeStream AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
