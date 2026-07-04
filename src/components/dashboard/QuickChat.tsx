import { useState } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  "Analyze my resume",
  "Find matching jobs",
  "Suggest skills to learn",
  "Review my applications",
];

export function QuickChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Career Mentor. I can help you with resume optimization, job matching, skill development, and more. What would you like to work on today?",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm analyzing your request. The full AI Mentor is available in the dedicated chat section for deeper conversations.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">AI Mentor</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 mb-4 max-h-48">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cn(
              "max-w-[85%] p-3 text-sm",
              msg.role === "user" ? "chat-bubble-user ml-auto" : "chat-bubble-ai"
            )}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setMessage(suggestion)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <button
          onClick={handleSend}
          className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
