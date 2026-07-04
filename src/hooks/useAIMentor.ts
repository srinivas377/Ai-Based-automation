import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  agentType?: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-mentor`;

export function useAIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to your AI Career Mentor! 👋\n\nI'm your intelligent assistant powered by multiple specialized agents. I can help you with:\n\n• **Resume optimization** - Tailored for specific roles\n• **Job matching** - Finding positions that fit your profile\n• **Skill gap analysis** - Identifying areas for growth\n• **Interview preparation** - Mock interviews and tips\n• **Career planning** - Long-term strategy development\n\nWhat would you like to work on today?",
      timestamp: new Date(),
      agentType: "mentor",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const determineAgentType = (input: string): string => {
    const text = input.toLowerCase();
    if (text.includes("resume")) return "resume";
    if (text.includes("job") || text.includes("match") || text.includes("apply")) return "matching";
    if (text.includes("learn") || text.includes("skill") || text.includes("course")) return "roadmap";
    if (text.includes("market") || text.includes("trend") || text.includes("salary")) return "market";
    if (text.includes("interview")) return "mentor";
    if (text.includes("feedback") || text.includes("reject")) return "feedback";
    return "mentor";
  };

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    let assistantContent = "";
    const agentType = determineAgentType(input);

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id.startsWith("streaming-")) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [
          ...prev,
          {
            id: `streaming-${Date.now()}`,
            role: "assistant",
            content: assistantContent,
            timestamp: new Date(),
            agentType,
          },
        ];
      });
    };

    try {
      // Build messages array for API
      const apiMessages = messages
        .filter((m) => m.id !== "1") // Exclude welcome message
        .map((m) => ({ role: m.role, content: m.content }));
      apiMessages.push({ role: "user", content: input });

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages, type: "mentor" }),
        signal: abortControllerRef.current.signal,
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${resp.status}`);
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) updateAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Finalize the message ID
      setMessages((prev) =>
        prev.map((m) =>
          m.id.startsWith("streaming-")
            ? { ...m, id: Date.now().toString() }
            : m
        )
      );
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        console.log("Request aborted");
        return;
      }

      console.error("AI Mentor error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response";
      
      toast.error(errorMessage);
      
      // Add error message
      setMessages((prev) => [
        ...prev.filter((m) => !m.id.startsWith("streaming-")),
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `I apologize, but I encountered an issue: ${errorMessage}. Please try again.`,
          timestamp: new Date(),
          agentType: "mentor",
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    cancelRequest,
  };
}
