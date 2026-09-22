import React, { useState, useEffect, useRef, FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Mic01Icon,
  MicOff01Icon,
  SentIcon,
  VolumeHighIcon,
  VolumeOffIcon,
  Key01Icon,
  Delete02Icon,
  Message01Icon,
  HeadphonesIcon,
  SparklesIcon,
  BrainIcon,
} from "@hugeicons/core-free-icons";
import { JarvisArcReactor } from "./JarvisArcReactor";

interface Message {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  timestamp: string;
}

const NAETHRA_SYSTEM_PROMPT = `You are Jarvis, the intelligent AI Assistant for Naethra Technologies.
Naethra Technologies is a premier software development outsourcing company specializing in:
- Full Stack Web Development (React, Angular, Node.js, PHP, .NET, CMS, Custom Web Publishing)
- Mobile & Cross-Platform Development (iOS, Android, Flutter, Ionic, React Native)
- Claris FileMaker Integration & Custom Database Solutions
- AWS & Cloud Application Support, DevOps, and Maintenance

Be helpful, concise, articulate, and intelligent in your responses. Keep spoken answers clean and easy to listen to.`;

export function JarvisAIAssistantNew() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"voice" | "chat">("voice");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState("");
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(true);
  const [audioPermission, setAudioPermission] = useState<"prompt" | "granted" | "denied">("prompt");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "jarvis",
      text: "Greetings! I am Jarvis, your Naethra AI assistant. How can I help you explore our software services and engineering solutions today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsMuted, setTtsMuted] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Request Microphone Permission
  const requestAudioPermission = async (): Promise<boolean> => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setAudioPermission("granted");
      return true;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setAudioPermission("granted");
      return true;
    } catch (err) {
      console.warn("Audio permission error:", err);
      setAudioPermission("denied");
      return false;
    }
  };

  // Load Saved API Key & Listen for open-jarvis Event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedKey = localStorage.getItem("gemini_api_key") || "";
    setApiKey(savedKey);
    setTempKeyInput(savedKey);

    const handleOpenJarvis = () => setIsOpen(true);
    window.addEventListener("open-jarvis", handleOpenJarvis);
    return () => window.removeEventListener("open-jarvis", handleOpenJarvis);
  }, []);

  // Auto Scroll Chat
  useEffect(() => {
    if (mode === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mode]);

  // Speech Recognition (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setHasSpeechSupport(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscriptText(currentTranscript);
          setInputText(currentTranscript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setHasSpeechSupport(false);
      }
    }
  }, []);

  // Speech Synthesis
  const speakText = (text: string) => {
    if (ttsMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google UK English Male") ||
            v.name.includes("Natural") ||
            v.name.includes("Samantha") ||
            v.name.includes("Daniel"))
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Microphone
  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        audioInputRef.current?.focus();
        return;
      }

      if (audioPermission !== "granted") {
        const granted = await requestAudioPermission();
        if (!granted) return;
      }

      setTranscriptText("");
      setInputText("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Could not start speech recognition:", err);
      }
    }
  };

  // Save Gemini Key
  const handleSaveKey = () => {
    const trimmed = tempKeyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem("gemini_api_key", trimmed);
    setShowKeyModal(false);
  };

  // Send Message to Gemini API
  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputText;
    if (!promptToSend.trim() || isLoading) return;

    if (!apiKey) {
      setShowKeyModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTranscriptText("");
    setIsLoading(true);

    try {
      const contents = [
        {
          role: "user",
          parts: [{ text: NAETHRA_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Jarvis, your Naethra AI assistant." }],
        },
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        {
          role: "user",
          parts: [{ text: promptToSend }],
        },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I've processed your request. How else can Naethra assist you?";

      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, jarvisMessage]);

      if (mode === "voice" || !ttsMuted) {
        speakText(replyText);
      }
    } catch (err: any) {
      console.error("Gemini API error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: `Error connecting to Gemini API: ${err.message || "Invalid API Key or network issue"}. Please verify your API key in settings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <JarvisArcReactor
          size={60}
          onClick={() => setIsOpen(true)}
          label="J.A.R.V.I.S"
          className="transition-all duration-300 hover:scale-110 active:scale-95"
        />
      </div>

      {/* Full-Screen Modern Light Theme AI Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-[#f3f5fa] text-[#142033] font-sans overflow-hidden animate-in fade-in duration-300">
          
          {/* Header Bar */}
          <header className="flex h-20 items-center justify-between border-b border-slate-200/80 px-6 lg:px-12 bg-white/90 backdrop-blur-md shadow-sm">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-x-3">
              <JarvisArcReactor size={44} label="J" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#142033] flex items-center gap-x-2">
                  JARVIS <span className="rounded-full bg-[#e8edf6] border border-[#005b96]/20 px-2.5 py-0.5 text-xs text-[#005b96] font-semibold">v3.0</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">Naethra Intelligence &amp; Voice Assistant</p>
              </div>
            </div>

            {/* Mode Switcher & Controls */}
            <div className="flex items-center gap-x-3 sm:gap-x-4">
              {/* Voice / Chat Mode Switcher */}
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setMode("voice")}
                  className={`flex items-center gap-x-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    mode === "voice"
                      ? "bg-[#005b96] text-white shadow-md shadow-[#005b96]/20"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <HugeiconsIcon icon={HeadphonesIcon} size={15} />
                  <span>Voice Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("chat")}
                  className={`flex items-center gap-x-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    mode === "chat"
                      ? "bg-[#005b96] text-white shadow-md shadow-[#005b96]/20"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <HugeiconsIcon icon={Message01Icon} size={15} />
                  <span>Chat Mode</span>
                </button>
              </div>

              {/* Mute Voice Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis?.cancel();
                  setTtsMuted(!ttsMuted);
                }}
                className={`flex size-10 items-center justify-center rounded-full border transition-colors ${
                  ttsMuted
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
                title={ttsMuted ? "Unmute Voice" : "Mute Voice"}
              >
                <HugeiconsIcon icon={ttsMuted ? VolumeOffIcon : VolumeHighIcon} size={18} />
              </button>

              {/* Gemini Key Config */}
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className={`flex items-center gap-x-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  apiKey
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-amber-400 bg-amber-50 text-amber-700 animate-pulse"
                }`}
              >
                <HugeiconsIcon icon={Key01Icon} size={15} />
                <span className="hidden sm:inline">{apiKey ? "API Key Set" : "Add Gemini Key"}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close Jarvis"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>
          </header>

          {/* Main Interface Content Area */}
          <main className="relative flex flex-1 flex-col overflow-hidden">
            {mode === "voice" ? (
              /* VOICE INTERFACE MODE (OLD JARVIS CONCENTRIC ROTATING ARC REACTOR IN CENTER) */
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-6 text-center max-w-3xl mx-auto w-full">
                
                {/* REUSABLE CONCENTRIC ROTATING ARC REACTOR LOGO */}
                <div className="my-6 flex items-center justify-center">
                  <JarvisArcReactor
                    size={280}
                    isListening={isListening}
                    isSpeaking={isSpeaking}
                    label={isListening ? "LISTENING" : isSpeaking ? "SPEAKING" : "J.A.R.V.I.S"}
                    onClick={toggleListening}
                  />
                </div>

                {/* Subtitle / Status Box */}
                <div className="w-full space-y-4">
                  <div className="min-h-[56px] rounded-2xl bg-white border border-slate-200/80 px-6 py-4 shadow-md flex items-center justify-center text-center">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-x-2 text-[#005b96] font-medium">
                        <span className="inline-block size-2.5 rounded-full bg-[#005b96] animate-ping" />
                        <span>Jarvis is processing query...</span>
                      </div>
                    ) : isListening ? (
                      <p className="text-base font-semibold text-[#005b96] italic">
                        &quot;{transcriptText || "Listening to your command..."}&quot;
                      </p>
                    ) : (
                      <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                        {messages[messages.length - 1]?.text || "HOW CAN I HELP YOU?"}
                      </p>
                    )}
                  </div>

                  {/* Input Bar */}
                  <form
                    onSubmit={handleFormSubmit}
                    className="flex items-center gap-x-2 w-full max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-lg focus-within:border-[#005b96]"
                  >
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                        isListening
                          ? "bg-amber-50 text-amber-600 border-amber-300 animate-pulse"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                      title="Microphone"
                    >
                      <HugeiconsIcon icon={isListening ? MicOff01Icon : Mic01Icon} size={18} />
                    </button>

                    <input
                      ref={audioInputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={hasSpeechSupport ? "Speak or type your question..." : "Ask Jarvis anything..."}
                      className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!inputText.trim() || isLoading}
                      className="flex size-10 items-center justify-center rounded-xl bg-[#005b96] text-white shadow-md hover:bg-[#061d45] disabled:opacity-40 transition-all"
                    >
                      <HugeiconsIcon icon={SentIcon} size={18} />
                    </button>
                  </form>

                  {/* Quick Prompts */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSendMessage("What core services does Naethra offer?")}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#005b96] hover:text-[#005b96] shadow-sm transition-all"
                    >
                      ⚡ Core services
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("Tell me about your mobile app capabilities")}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#005b96] hover:text-[#005b96] shadow-sm transition-all"
                    >
                      📱 Mobile apps
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("What FileMaker development services do you provide?")}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#005b96] hover:text-[#005b96] shadow-sm transition-all"
                    >
                      📊 FileMaker expertise
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("Describe your AWS DevOps & Cloud maintenance capabilities")}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#005b96] hover:text-[#005b96] shadow-sm transition-all"
                    >
                      ☁️ AWS DevOps
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* CHAT INTERFACE MODE */
              <div className="flex flex-1 flex-col overflow-hidden px-4 py-6 max-w-4xl mx-auto w-full">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-x-2 text-[11px] text-slate-400 mb-1 px-1 font-medium">
                        <span>{msg.sender === "user" ? "You" : "Jarvis AI"}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                          msg.sender === "user"
                            ? "bg-[#005b96] text-white rounded-tr-none"
                            : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-[#005b96] bg-white border border-slate-200 px-4 py-3 rounded-2xl w-fit shadow-sm">
                      <span className="size-2.5 rounded-full bg-[#005b96] animate-ping" />
                      <span>Jarvis is formulating response...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-x-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                      isListening
                        ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                    title="Voice Input"
                  >
                    <HugeiconsIcon icon={isListening ? MicOff01Icon : Mic01Icon} size={20} />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask Jarvis anything about Naethra..."
                    className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#005b96] focus:outline-none shadow-sm"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#005b96] text-white shadow-md hover:bg-[#061d45] disabled:opacity-40 transition-all"
                  >
                    <HugeiconsIcon icon={SentIcon} size={20} />
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8edf6] text-[#005b96]">
                  <HugeiconsIcon icon={Key01Icon} size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#142033]">Configure Gemini API Key</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your Google Gemini API key to enable live voice &amp; text AI responses. Your key is stored locally in your browser.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Gemini API Key</label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-[#005b96] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-x-3 pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#005b96] hover:underline font-medium"
              >
                Get free key from AI Studio ↗
              </a>
              <div className="flex gap-x-2">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("gemini_api_key");
                    setApiKey("");
                    setTempKeyInput("");
                  }}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="rounded-xl bg-[#005b96] px-5 py-2 text-xs font-bold text-white hover:bg-[#061d45] shadow-md transition-all"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
