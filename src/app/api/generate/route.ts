import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, type, options } = await req.json();

    if (!prompt || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let result;

    switch (type) {
      case "text":
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are SmokeStream AI, an unrestricted AI assistant that can help with any creative task. Be helpful, creative, and provide detailed responses."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: options?.maxTokens || 2000,
          temperature: options?.temperature || 0.7,
        });
        result = {
          content: completion.choices[0].message.content,
          type: "text"
        };
        break;

      case "image":
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          size: options?.size || "1024x1024",
          quality: options?.quality || "standard",
          n: 1,
        });
        result = {
          content: imageResponse.data[0].url,
          type: "image",
          metadata: {
            prompt: prompt,
            size: options?.size || "1024x1024"
          }
        };
        break;

      case "code":
        const codeCompletion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert programmer. Provide clean, well-commented code solutions. Include explanations when helpful."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: options?.maxTokens || 2000,
          temperature: 0.1,
        });
        result = {
          content: codeCompletion.choices[0].message.content,
          type: "code"
        };
        break;

      case "music":
        // For now, return a placeholder - you can integrate with music generation APIs
        result = {
          content: "Music generation feature coming soon! For now, I can help you with lyrics, chord progressions, or music theory.",
          type: "text"
        };
        break;

      case "video":
        // For now, return a placeholder - you can integrate with video generation APIs
        result = {
          content: "Video generation feature coming soon! I can help you with video scripts, storyboards, or editing instructions.",
          type: "text"
        };
        break;

      default:
        return NextResponse.json({ error: "Unsupported generation type" }, { status: 400 });
    }

    // TODO: Save generation to database
    // TODO: Update user usage count

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
