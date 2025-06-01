"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Not used directly, can be removed if not needed for layout
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
  LogOut
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image" | "audio" | "video" | "code";
  metadata?: any;
  timestamp: Date;
}

export default function DashboardPage() { // Renamed to avoid conflict if 'Dashboard' is a component name
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to SmokeStream AI Studio! I can help you generate any type of media without restrictions. What would you like to create today?",
      type: "text",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      type: "text",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input; // Capture input before clearing
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput, type: 'text' }) // Default to text for now, can be dynamic
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.result) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
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
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}`,
        type: "text",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: 

ImageIcon
, label: "Generate Image", prompt: "Create a stunning image of" }, { icon:


Music
, label: "Create Music", prompt: "Generate a music track that" }, { icon:


Video
, label: "Make Video", prompt: "Create a video showing" }, { icon:


Code
, label: "Write Code", prompt: "Write code that" }, { icon:


FileText
, label: "Write Text", prompt: "Write content about" } ];

return (


div

span
      </div>
    </div>

    

div
    </div>

    

div

div
{/* Placeholder */} </div> </div>


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
    {/* Quick Actions */}
    

div
      {/* Input Area */}
      

div
      </div>
    </div>
  </div>
</div>
); }
  </div>
</div>
); }
