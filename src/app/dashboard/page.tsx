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
    { icon: ImageIcon, label: "Generate Image", prompt: "Create a stunning image of" },
    { icon: Music, label: "Create Music", prompt: "Generate a music track that" },
    { icon: Video, label: "Make Video", prompt: "Create a video showing" },
    { icon: Code, label: "Write Code", prompt: "Write code that" },
    { icon: FileText, label: "Write Text", prompt: "Write content about" }
  ];

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className="flex flex-col py-8 pl-6 pr-2 w-72 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <Zap size={24} />
            </div>
            <div className="ml-2 font-bold text-2xl">SmokeStream</div>
          </div>
          {/* User Profile (Optional) */}
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              {/* Placeholder for user image - replace with actual image or icon */}
              <User size={80} className="text-gray-500" />
            </div>
            <div className="text-sm font-semibold mt-2">Current User</div>
            <div className="text-xs text-gray-500">Free Plan</div>
            <div className="flex flex-row items-center mt-3">
              <Badge variant="premium">Upgrade <Zap size={12} className="ml-1" /></Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Quick Actions</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {quickActions.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setInput(action.prompt + " ")}
                >
                  <action.icon size={16} className="mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-auto flex flex-col space-y-1">
             <Button variant="outline" className="justify-start">
                <Settings size={16} className="mr-2" /> Settings
             </Button>
             <Button variant="outline" className="justify-start text-red-500 hover:text-red-600">
                <LogOut size={16} className="mr-2" /> Logout
             </Button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {/* Messages Area */}
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.map((message) => (
                  <div key={message.id} className={`grid grid-cols-12 gap-y-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === "assistant" && (
                      <div className="col-start-1 col-end-2 flex items-end">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                         <Bot size={24} className="text-white" />
                        </div>
                      </div>
                    )}
                    <div className={`col-start-${message.role === 'user' ? '7' : '2'} col-end-${message.role === 'user' ? '13' : '12'} p-3 rounded-lg`}>
                      <div className={`flex ${message.role === 'user' ? 'items-center justify-start flex-row-reverse' : 'items-center flex-row'}`}>
                        <div className={`relative ${message.role === 'user' ? 'mr-3' : 'ml-3'} text-sm ${message.role === 'user' ? 'bg-indigo-100 text-gray-700' : 'bg-white text-gray-600'} py-2 px-4 shadow rounded-xl`}>
                          <div>{message.content}</div>
                          {/* Add rendering for different message types (image, audio, etc.) here */}
                          {message.type === 'image' && message.metadata?.url && (
                            <img src={message.metadata.url} alt="generated image" className="mt-2 rounded-lg max-w-xs" />
                          )}
                          {message.type === 'audio' && message.metadata?.url && (
                            <audio controls src={message.metadata.url} className="mt-2" />
                          )}
                           {message.type === 'video' && message.metadata?.url && (
                            <video controls src={message.metadata.url} className="mt-2 rounded-lg max-w-xs" />
                          )}
                          {message.type === 'code' && message.metadata?.code && (
                            <pre className="mt-2 p-2 bg-gray-800 text-white rounded-md text-sm overflow-x-auto">
                              <code>{message.metadata.code}</code>
                            </pre>
                          )}
                          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                     {message.role === "user" && (
                      <div className="col-start-12 col-end-13 flex items-end justify-end">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 flex-shrink-0">
                         <User size={24} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                {isLoading && (
                  <div className="grid grid-cols-12 gap-y-2 justify-start">
                    <div className="col-start-1 col-end-2 flex items-end">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                           <Bot size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="col-start-2 col-end-12 p-3 rounded-lg">
                      <div className="flex items-center flex-row">
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2"></div>
                            <span>Thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              {/* Attachment button (optional) */}
              {/* <div>
                <Button variant="ghost" size="icon">
                  <Paperclip size={20} />
                </Button>
              </div> */}
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    placeholder="Type your message..."
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="ml-4">
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  <Send size={20} className="text-white" />
                  <span className="ml-2 hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
