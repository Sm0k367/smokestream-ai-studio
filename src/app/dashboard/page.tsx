done

Machine
Great! Now here's the thirteenth file:

File 13: src/app/dashboard/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Dashboard() {
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
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you want to create something amazing! Let me help you with that. What specific type of media would you like me to generate?",
        type: "text",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
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
          </div>
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
    {/* Quick Actions */}
    

div
      {/* Input Area */}
      

div
      </div>
    </div>
  </div>
</div>
); }
