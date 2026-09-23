import React, { useState, useEffect, useRef, FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  SentIcon,
  Maximize01Icon,
  Minimize01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";

export function openNaethraAssistant() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-naethra-assistant"));
  }
}

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

const NAETHRA_SYSTEM_PROMPT = `You are Naethra Assistant, the official AI representative for Naethra Technologies.
Naethra Technologies provides full-stack web and mobile development, custom cloud solutions, Zoho Creator consulting, Claris FileMaker integrations, AWS DevOps, and software maintenance services.
Be helpful, professional, friendly, and concise in your responses.`;

export function NaethraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hi, I'm your AI assistant for Naethra Technologies. Ask me anything about our company and services.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Listen for global trigger event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-naethra-assistant", handleOpen);
    return () => window.removeEventListener("open-naethra-assistant", handleOpen);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Simulate/Fetch AI response using Gemini API or smart response
      const savedKey = typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";
      
      let botResponseText = "";
      if (savedKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${savedKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${NAETHRA_SYSTEM_PROMPT}\n\nUser Question: ${userText}` }],
                },
              ],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      }

      if (!botResponseText) {
        // Fallback intelligent response matrix for Naethra Technologies
        const lower = userText.toLowerCase();
        if (lower.includes("service") || lower.includes("offer") || lower.includes("do")) {
          botResponseText = "Naethra Technologies specializes in Web & Mobile Application Development, Zoho Creator Solutions, Claris FileMaker Integration, AWS Cloud Infrastructure, and IT Staffing.";
        } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach") || lower.includes("hire")) {
          botResponseText = "You can reach our team at info@naethra.com or schedule a free 30-minute meeting using the header CTA button on our home page.";
        } else if (lower.includes("location") || lower.includes("office") || lower.includes("where")) {
          botResponseText = "Naethra Technologies is headquartered in Chennai, Tamil Nadu, India, serving global clients across 110+ countries.";
        } else {
          botResponseText = `Thank you for reaching out! Regarding "${userText}", Naethra Technologies offers end-to-end custom software solutions tailored to your business needs. How can we best assist your project today?`;
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: "I am having trouble connecting to the network right now. Please try again or reach us at info@naethra.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Action Launcher Button (Matching Screenshot 2) */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Naethra Assistant"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#0052d4] via-[#0072ff] to-[#00c6ff] text-white shadow-[0_10px_30px_rgba(0,114,255,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {/* Outer Glow Halo */}
            <span className="absolute -inset-1.5 rounded-full bg-cyan-400/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />
            <span className="relative flex items-center justify-center">
              <HugeiconsIcon icon={Message01Icon} size={28} className="drop-shadow-sm text-white" />
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close Naethra Assistant"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#09152b] border border-slate-700/80 text-white shadow-2xl shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
        )}
      </div>

      {/* Floating AI Bot Chat Modal (Matching Screenshot 1) */}
      {isOpen && (
        <div
          className={`fixed z-[10000] flex flex-col overflow-hidden bg-[#071124] border border-[#162744] text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 ${
            isExpanded
              ? "inset-4 sm:inset-10 rounded-3xl"
              : "bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[calc(100vh-8rem)] rounded-3xl"
          }`}
        >
          {/* Header Bar (Matching Screenshot 1) */}
          <header className="flex h-16 items-center justify-between border-b border-[#14233c] bg-[#09152b] px-5 select-none">
            {/* Left Brand Identifier */}
            <div className="flex items-center gap-x-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <h2 className="text-base font-semibold tracking-tight text-white">
                Naethra Assistant
              </h2>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? "Minimize Window" : "Maximize Window"}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14233c] text-slate-300 transition-colors hover:bg-[#1f355c] hover:text-white"
              >
                <HugeiconsIcon icon={isExpanded ? Minimize01Icon : Maximize01Icon} size={15} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14233c] text-slate-300 transition-colors hover:bg-[#1f355c] hover:text-white"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>
          </header>

          {/* Dismissible Alert Banner (Matching Screenshot 1 style notice) */}
          {showErrorAlert && (
            <div className="flex items-center justify-between bg-[#2d1217] border-b border-red-900/50 px-4 py-2 text-xs text-red-300">
              <span>Unable to load knowledge base.</span>
              <button
                type="button"
                onClick={() => setShowErrorAlert(false)}
                className="text-red-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-x-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Bot Target Scope Avatar (Matching Screenshot 1) */}
                {msg.sender === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#102038] border border-cyan-500/40 text-cyan-400 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {/* Message Bubble (Matching Screenshot 1 dark slate bubble) */}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#0052d4] to-[#0072ff] text-white rounded-tr-none shadow-md"
                      : "bg-[#162338] border border-[#203454] text-slate-100 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Thinking / Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-x-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#102038] border border-cyan-500/40 text-cyan-400">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current animate-spin">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#162338] border border-[#203454] px-4 py-3 text-xs text-slate-400 flex items-center gap-x-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area (Matching Screenshot 1) */}
          <footer className="border-t border-[#14233c] bg-[#081427] p-3 sm:p-4">
            <form onSubmit={handleFormSubmit} className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="w-full rounded-full bg-[#0d1d36] border border-[#1b3154] px-5 py-3 pr-14 text-sm text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                aria-label="Send message"
                className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#0072ff] to-[#00c6ff] text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              >
                <HugeiconsIcon icon={SentIcon} size={18} className="translate-x-0.5" />
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}
