import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAIMentor } from "@/hooks/useAIMentor";
import { 
  Send, 
  Bot, 
  Sparkles, 
  Paperclip, 
  Mic, 
  MoreVertical,
  FileText,
  Briefcase,
  GraduationCap,
  TrendingUp,
  RefreshCw,
  Square,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const quickActions = [
  { icon: FileText, label: "Resume Review", prompt: "Please analyze my current resume and suggest specific improvements to increase my interview rate" },
  { icon: Briefcase, label: "Job Match", prompt: "Find jobs that match my profile and skills. Focus on senior software engineering positions at tech companies" },
  { icon: GraduationCap, label: "Learning Path", prompt: "Create a detailed learning roadmap for my career goals. I want to become a senior engineer in the next year" },
  { icon: TrendingUp, label: "Market Insights", prompt: "What are the current trends in the software engineering job market? Include salary data and in-demand skills" },
  { icon: RefreshCw, label: "Application Status", prompt: "Give me an update on my job applications and suggest ways to improve my response rate" },
];

const Mentor = () => {
  const { messages, isLoading, sendMessage, cancelRequest } = useAIMentor();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    sendMessage(text);
    setInput("");
  };

  const getAgentColor = (agentType?: string) => {
    switch (agentType) {
      case "resume": return "border-agent-resume";
      case "matching": return "border-agent-matching";
      case "roadmap": return "border-agent-roadmap";
      case "market": return "border-agent-market";
      case "feedback": return "border-agent-feedback";
      default: return "border-primary";
    }
  };

  const getAgentLabel = (agentType?: string) => {
    switch (agentType) {
      case "resume": return "Resume Agent";
      case "matching": return "Matching Agent";
      case "roadmap": return "Roadmap Agent";
      case "market": return "Market Agent";
      case "feedback": return "Feedback Agent";
      default: return "Mentor Agent";
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">AI Career Mentor</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Powered by 12 specialized agents
              </p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 py-4 overflow-x-auto scrollbar-thin">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleSend(action.prompt)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all whitespace-nowrap disabled:opacity-50"
            >
              <action.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in-up",
                message.role === "user" && "justify-end"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border-2",
                    getAgentColor(message.agentType),
                    "bg-white/5"
                  )}>
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  {message.agentType && (
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {getAgentLabel(message.agentType).split(" ")[0]}
                    </span>
                  )}
                </div>
              )}
              <div
                className={cn(
                  "max-w-[70%] p-4 rounded-2xl",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "glass-card rounded-bl-md"
                )}
              >
                <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-2">{children}</ol>,
                        li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                        code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-xs">{children}</code>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
                <span className="text-xs text-muted-foreground/60 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 animate-fade-in-up">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border-2 border-primary">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask your AI mentor anything..."
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
              />
            </div>
            <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
            {isLoading ? (
              <button
                onClick={cancelRequest}
                className="p-3 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all"
              >
                <Square className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  input.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                    : "bg-white/5 text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Mentor;
