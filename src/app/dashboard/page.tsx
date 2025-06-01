"use client";

import { useState, useRef, useEffect, FormEvent } from "react"; // Added FormEvent
import { Button } from "@/components/ui/button";
// Card components are not directly used in this layout, can be removed if not planned for future use here
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Image as ImageIcon,
  Music,
  Video,
  Code,
  FileText,
  Download,
  Copy,
  Zap,
  User,
  Bot,
  Settings,
  LogOut,
  Loader2 // Added for loading spinner
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react"; // For authentication

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image" | "audio" | "video" | "code"; // Added 'code'
  metadata?: any;
  timestamp: Date;
}

// Define a type for the AI generation options if you plan to make them dynamic
type GenerationType = "text" | "image" | "code" | "music" | "video";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-assistant-message",
      role: "assistant",
      content: "Welcome to SmokeStream AI Studio! How can I help you create something amazing today?",
      type: "text",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when a quick action is clicked
  useEffect(() => {
    if (!isLoading && inputRef.current && input.endsWith(" ")) { // Check if input ends with space (from quick action)
        inputRef.current.focus();
    }
  }, [input, isLoading]);


  const handleSend = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Prevent default form submission if event is passed
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      type: "text",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    // Determine generation type (simple example, can be more sophisticated)
    let genType: GenerationType = "text";
    if (currentInput.toLowerCase().startsWith("create an image of") || currentInput.toLowerCase().startsWith("generate an image of")) {
        genType = "image";
    } else if (currentInput.toLowerCase().startsWith("write code for") || currentInput.toLowerCase().startsWith("generate code for")) {
        genType = "code";
    }
    // Add more rules for music, video etc.

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput, type: genType, options: { size: "1024x1024" } }) // Pass type and options
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `API error: ${response.statusText}` }));
        throw new Error(errorData.error || `API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.result) {
        const aiMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.result.content,
          type: data.result.type as Message['type'],
          metadata: data.result.metadata,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "Failed to get a valid response from AI");
      }

    } catch (error) {
      console.error("Failed to send message or get AI response:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}`,
        type: "text",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); // Re-focus input after sending
    }
  };

  const quickActions = [
    { icon: 

ImageIcon
, label: "Image", prompt: "Create an image of " }, { icon:


Music
, label: "Music", prompt: "Generate a music track that is " }, { icon:


Video
, label: "Video", prompt: "Create a short video showing " }, { icon:


Code
, label: "Code", prompt: "Write code for " }, { icon:


FileText
, label: "Text", prompt: "Write an article about " } ];

if (status === "loading") { return (


div
);
}

if (status === "unauthenticated") { // Optionally, redirect to sign-in or show a message // For now, let's assume the landing page handles the redirect if session is null // Or you can force sign in: // useEffect(() => { signIn(); }, []); // This would trigger a sign-in redirect return (


div
);
}

return (


div

span
      </div>
    </div>

    

nav

div

div
{/*
div
          </div> */}
        </div>
        

Button
      </div>
    </div>
  </div>

  {/* Main Chat Area */}
  

div

Badge
      </div>
    </div>

    {/* Messages */}
    

div

div
                )}
              </div>
            </div>
            

div
          </div>
        </div>
      ))}

      {isLoading && (
        

div

div

div

div
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      

div
    {/* Quick Actions & Input Area */}
    

div

form
    </div>
  </div>
</div>
); }

