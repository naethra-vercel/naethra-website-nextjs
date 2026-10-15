"use client";

import React, { useEffect, useRef, useState, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  SentIcon,
  Maximize01Icon,
  Minimize01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";

import {
  APP_CATEGORIES,
  WELCOME_MESSAGE,
  createAgentSession,
  getStepOptions,
  type AgentOption,
  type AgentSession,
} from "@/lib/agent-flow";

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
  options?: AgentOption[];
  showCta?: boolean;
}

function stamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createWelcomeMessage(session: AgentSession): Message {
  return {
    id: "welcome-1",
    sender: "assistant",
    text: WELCOME_MESSAGE,
    timestamp: stamp(),
    options: getStepOptions(session),
  };
}

export function NaethraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [session, setSession] = useState<AgentSession>(() => createAgentSession());
  const [messages, setMessages] = useState<Message[]>(() => [
    createWelcomeMessage(createAgentSession()),
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-naethra-assistant", handleOpen);
    window.addEventListener("open-jarvis", handleOpen);
    return () => {
      window.removeEventListener("open-naethra-assistant", handleOpen);
      window.removeEventListener("open-jarvis", handleOpen);
    };
  }, []);

  const restartFlow = () => {
    const next = createAgentSession();
    setSession(next);
    setMessages([createWelcomeMessage(next)]);
    setShowErrorAlert(false);
    setInputText("");
  };

  const sendMessage = async (rawText: string) => {
    const userText = rawText.trim();
    if (!userText || isLoading) return;

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: userText,
      timestamp: stamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter((msg) => msg.id !== "welcome-1" || msg.sender === "assistant")
        .slice(-10)
        .map((msg) => ({ role: msg.sender, text: msg.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          session,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed (${response.status})`);
      }

      const data = (await response.json()) as {
        reply: string;
        session: AgentSession;
        options?: AgentOption[];
        showCta?: boolean;
      };

      setSession(data.session);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          sender: "assistant",
          text: data.reply,
          timestamp: stamp(),
          options: data.options ?? [],
          showCta: Boolean(data.showCta),
        },
      ]);
    } catch (err) {
      console.error("AI Error:", err);
      setShowErrorAlert(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          sender: "assistant",
          text: "I am having trouble connecting right now. Please try again, or reach us at info@naethra.com.",
          timestamp: stamp(),
          options: getStepOptions(session),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(inputText);
  };

  const latestOptions =
    [...messages].reverse().find((msg) => msg.sender === "assistant" && (msg.options?.length || msg.showCta))
      ?.options ?? [];

  const showCta = [...messages].reverse().find((msg) => msg.sender === "assistant")?.showCta;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Naethra Assistant"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#0052d4] via-[#0072ff] to-[#00c6ff] text-white shadow-[0_10px_30px_rgba(0,114,255,0.5)] transition-all duration-300 hover:scale-110 active:scale-95"
          >
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

      {isOpen && (
        <div
          className={`fixed z-[10000] flex flex-col overflow-hidden bg-[#071124] border border-[#162744] text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 ${
            isExpanded
              ? "inset-4 sm:inset-10 rounded-3xl"
              : "bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[calc(100vh-8rem)] rounded-3xl"
          }`}
        >
          <header className="flex h-16 items-center justify-between border-b border-[#14233c] bg-[#09152b] px-5 select-none">
            <div className="flex items-center gap-x-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <h2 className="text-base font-semibold tracking-tight text-white">Naethra Assistant</h2>
            </div>

            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={restartFlow}
                aria-label="Restart intake flow"
                className="rounded-full bg-[#14233c] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition-colors hover:bg-[#1f355c] hover:text-white"
              >
                Restart
              </button>
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

          {showErrorAlert && (
            <div className="flex items-center justify-between bg-[#2d1217] border-b border-red-900/50 px-4 py-2 text-xs text-red-300">
              <span>Unable to reach the assistant API.</span>
              <button
                type="button"
                onClick={() => setShowErrorAlert(false)}
                className="text-red-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-x-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
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

            {!isLoading && latestOptions.length > 0 && (
              <div className="pl-12">
                <div
                  className={`flex flex-wrap gap-2 ${
                    latestOptions.length > 12 ? "max-h-44 overflow-y-auto pr-1" : ""
                  }`}
                >
                  {latestOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      disabled={isLoading}
                      onClick={() => void sendMessage(option.label)}
                      className="rounded-full border border-cyan-500/30 bg-[#0d1d36] px-3 py-1.5 text-xs font-medium text-cyan-100 transition hover:border-cyan-400 hover:bg-[#123056] disabled:opacity-50"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {latestOptions.length === APP_CATEGORIES.length && (
                  <p className="mt-2 text-[11px] text-slate-400">
                    Tip: type a category name if the list is long.
                  </p>
                )}
              </div>
            )}

            {!isLoading && showCta && (
              <div className="pl-12 flex flex-wrap gap-2">
                <a
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-[#0072ff] to-[#00c6ff] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20"
                >
                  Contact Us
                </a>
                <a
                  href="/30-mins-meeting"
                  className="inline-flex items-center rounded-full border border-cyan-400/40 bg-[#0d1d36] px-4 py-2 text-xs font-semibold text-cyan-100"
                >
                  Book a meeting
                </a>
                <button
                  type="button"
                  onClick={restartFlow}
                  className="inline-flex items-center rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-400"
                >
                  Start over
                </button>
              </div>
            )}

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

          <footer className="border-t border-[#14233c] bg-[#081427] p-3 sm:p-4">
            <form onSubmit={handleFormSubmit} className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={showCta ? "Ask a follow-up..." : "Choose an option or type..."}
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
