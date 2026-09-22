import React, { useState, useEffect, useRef, FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SparklesIcon,
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
} from "@hugeicons/core-free-icons";

interface Message {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  timestamp: string;
}

const NAETHRA_SYSTEM_PROMPT = `You are Jarvis, the advanced AI Voice & Text Assistant for Naethra Technologies.
Naethra Technologies is a premier software development outsourcing company specializing in:
- Full Stack Web Development (React, Angular, Node.js, PHP, .NET, CMS, Custom Web Publishing)
- Mobile & Cross-Platform Development (iOS, Android, Flutter, Ionic, React Native)
- Claris FileMaker Integration & Custom Database Solutions
- AWS & Cloud Application Support, DevOps, and Maintenance

Be helpful, concise, articulate, and intelligent in your responses. Keep spoken answers clean and easy to listen to.`;

export function JarvisAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"audio" | "text">("audio");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState("");
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(true);
  const [audioPermission, setAudioPermission] = useState<"prompt" | "granted" | "denied">("prompt");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "jarvis",
      text: "Greetings. I am Jarvis, your Naethra AI assistant. How may I assist you with our technology stack or services today?",
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

  // Request explicit microphone permission via navigator.mediaDevices.getUserMedia
  const requestAudioPermission = async (): Promise<boolean> => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setAudioPermission("granted");
      return true;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop tracks immediately so mic light turns off until STT starts
      stream.getTracks().forEach((track) => track.stop());
      setAudioPermission("granted");
      return true;
    } catch (err) {
      console.warn("Audio permission denied or error:", err);
      setAudioPermission("denied");
      return false;
    }
  };

  // Load API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("gemini_api_key") || "";
      setApiKey(savedKey);
      setTempKeyInput(savedKey);
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (mode === "text") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mode]);

  // Speech Recognition setup (Web Speech API)
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

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setHasSpeechSupport(false);
      }
    }
  }, []);

  // Handle Speech Synthesis
  const speakText = (text: string) => {
    if (ttsMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const cleanText = text.replace(/[*_#`~]/g, ""); // Strip markdown formatting
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Voice Recognition
  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        // Fallback for Firefox and unsupported STT browsers: focus audio mode text input
        audioInputRef.current?.focus();
        return;
      }

      // Explicitly request microphone audio permission first
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
        console.warn("Could not start recognition:", err);
      }
    }
  };

  // Save API Key
  const handleSaveKey = () => {
    const trimmed = tempKeyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem("gemini_api_key", trimmed);
    setShowKeyModal(false);
  };

  // Send message to Gemini API
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
      // Build past history for Gemini multi-turn conversation
      const contents = [
        {
          role: "user",
          parts: [{ text: NAETHRA_SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Jarvis, Naethra AI assistant." }],
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
        "I've processed your request. How else can Naethra help you?";

      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, jarvisMessage]);

      // Speak response aloud if in audio mode or speech enabled
      if (mode === "audio" || !ttsMuted) {
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
      {/* Floating Jarvis AI Logo Trigger Button on Page (Clean Logo, No BG, No Shadow, No Green Dot) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex size-14 items-center justify-center rounded-full bg-transparent p-1 transition-all duration-300 hover:scale-110"
          aria-label="Open Jarvis AI Assistant"
          title="Open Jarvis AI Assistant"
        >
          {/* Jarvis Arc Reactor Core Logo */}
          <div className="relative flex items-center justify-center size-full rounded-full bg-transparent p-1 overflow-hidden">
            <svg viewBox="0 0 100 100" className="size-full text-sky-400">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray="8 6"
                className="animate-spin"
                style={{ transformOrigin: "center", animationDuration: "12s" }}
              />
              <polygon points="50,18 78,68 22,68" fill="none" stroke="url(#jarvis-3d-grad)" strokeWidth="5.5" strokeLinejoin="round" />
              <polygon points="50,82 22,32 78,32" fill="none" stroke="url(#jarvis-3d-grad)" strokeWidth="3" strokeLinejoin="round" opacity="0.65" />
              <circle cx="50" cy="50" r="14" fill="url(#jarvis-3d-core)" />
              <circle cx="50" cy="50" r="6" fill="#ffffff" />
              <defs>
                <linearGradient id="jarvis-3d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <radialGradient id="jarvis-3d-core">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#38bdf8" />
                  <stop offset="80%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </button>
      </div>

      {/* Full-Screen Jarvis AI Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-[#060c1a] text-slate-100 font-sans backdrop-blur-3xl overflow-hidden animate-in fade-in duration-300">
          {/* Header Bar */}
          <header className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6 lg:px-12 bg-slate-950/60">
            {/* Left Brand Title */}
            <div className="flex items-center gap-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 border border-sky-400/40 p-1.5 shadow-lg shadow-sky-500/20">
                <svg viewBox="0 0 100 100" className="size-full">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 6" className="animate-spin" style={{ transformOrigin: "center", animationDuration: "14s" }} />
                  <polygon points="50,18 78,68 22,68" fill="none" stroke="#818cf8" strokeWidth="5" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="14" fill="#38bdf8" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-x-2 font-mono">
                  JARVIS <span className="rounded bg-sky-500/20 px-2 py-0.5 text-xs text-sky-400 font-mono">v2.5</span>
                </h1>
                <p className="text-xs text-slate-400 font-sans">Naethra Intelligence & Voice Assistant</p>
              </div>
            </div>

            {/* Mode Switcher & Control Buttons */}
            <div className="flex items-center gap-x-3 sm:gap-x-4">
              {/* Audio / Text Mode Switcher */}
              <div className="flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 p-1">
                <button
                  type="button"
                  onClick={() => setMode("audio")}
                  className={`flex items-center gap-x-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    mode === "audio"
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <HugeiconsIcon icon={HeadphonesIcon} size={15} />
                  <span>Audio Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("text")}
                  className={`flex items-center gap-x-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    mode === "text"
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <HugeiconsIcon icon={Message01Icon} size={15} />
                  <span>Text Mode</span>
                </button>
              </div>

              {/* Speech Mute Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis?.cancel();
                  setTtsMuted(!ttsMuted);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition-colors ${
                  ttsMuted ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-slate-900 text-slate-300 hover:text-white"
                }`}
                title={ttsMuted ? "Unmute Voice" : "Mute Voice"}
              >
                <HugeiconsIcon icon={ttsMuted ? VolumeOffIcon : VolumeHighIcon} size={18} />
              </button>

              {/* Gemini API Key Settings */}
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className={`flex items-center gap-x-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                  apiKey
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/50 bg-amber-500/10 text-amber-300 animate-pulse"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close Jarvis"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={20} />
              </button>
            </div>
          </header>

          {/* Main Content Area: Audio Mode vs Text Mode */}
          <main className="relative flex flex-1 flex-col overflow-hidden">
            {mode === "audio" ? (
              /* AUDIO MODE INTERFACE */
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center max-w-3xl mx-auto w-full">
                {/* Glowing Interactive Cybernetic Arc Core Visualizer */}
                <div className="relative mb-10 flex items-center justify-center">
                  {/* Outer Pulsing Aura */}
                  <div
                    className={`absolute size-[340px] rounded-full bg-gradient-to-r from-sky-500/25 via-indigo-500/25 to-cyan-500/25 blur-3xl transition-all duration-700 ${
                      isSpeaking ? "scale-125 opacity-100 animate-pulse" : isListening ? "scale-110 opacity-80" : "scale-100 opacity-40"
                    }`}
                  />
                  
                  {/* Outer Precision Rotating Sci-Fi Gyro Rings */}
                  <div className="absolute size-[280px] rounded-full border border-sky-400/40 border-dashed animate-spin" style={{ animationDuration: "25s" }} />
                  <div className="absolute size-[230px] rounded-full border border-indigo-500/50 animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }} />

                  {/* Core Futuristic Arc Reactor Orb Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`group relative flex size-[160px] cursor-pointer items-center justify-center rounded-full bg-slate-950 border-2 border-sky-400/60 p-4 shadow-[0_0_50px_rgba(56,189,248,0.4)] transition-all duration-500 ${
                      isListening
                        ? "scale-110 border-amber-400 shadow-[0_0_70px_rgba(251,191,36,0.6)] ring-4 ring-amber-400/30"
                        : isSpeaking
                        ? "scale-105 border-sky-300 shadow-[0_0_70px_rgba(56,189,248,0.7)]"
                        : "hover:scale-105 hover:border-sky-300"
                    }`}
                  >
                    {/* Inner Cybernetic Core SVG */}
                    <div className="relative flex flex-col items-center justify-center size-full">
                      <svg viewBox="0 0 100 100" className="size-20 text-sky-400">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 4"
                          className="animate-spin"
                          style={{ transformOrigin: "center", animationDuration: "12s" }}
                        />
                        <polygon
                          points="50,18 78,68 22,68"
                          fill="none"
                          stroke="url(#orb-core-grad)"
                          strokeWidth="4.5"
                          strokeLinejoin="round"
                        />
                        <circle cx="50" cy="50" r="12" fill="url(#orb-core-glow)" />
                        <circle cx="50" cy="50" r="5" fill="#ffffff" />
                        <defs>
                          <linearGradient id="orb-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="50%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                          <radialGradient id="orb-core-glow">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="40%" stopColor="#38bdf8" />
                            <stop offset="80%" stopColor="#1e3a8a" />
                          </radialGradient>
                        </defs>
                      </svg>
                      <span className="text-[10px] font-black tracking-widest text-sky-200 uppercase mt-1 drop-shadow font-mono">
                        {isListening ? "Listening" : isSpeaking ? "Speaking" : "Tap to Speak"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Subtitle / Status Display */}
                <div className="w-full space-y-4">
                  <div className="min-h-[50px] flex items-center justify-center px-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-x-2 text-sky-400 font-medium">
                        <span className="inline-block size-2 rounded-full bg-sky-400 animate-ping" />
                        <span>Jarvis is thinking...</span>
                      </div>
                    ) : isListening ? (
                      <p className="text-lg font-medium text-sky-300 italic">
                        &quot;{transcriptText || "Listening to your voice..."}&quot;
                      </p>
                    ) : (
                      <p className="text-base text-slate-300 font-medium leading-relaxed">
                        {messages[messages.length - 1]?.text || "Ask Jarvis anything about Naethra — voice audio response will play out loud."}
                      </p>
                    )}
                  </div>

                  {audioPermission === "denied" && (
                    <div className="inline-flex items-center gap-x-3 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-1.5 text-xs text-red-300">
                      <span>🎙️ Microphone permission denied. Allow mic access in browser or click below:</span>
                      <button
                        type="button"
                        onClick={requestAudioPermission}
                        className="rounded-full bg-red-500/20 hover:bg-red-500/30 px-3 py-0.5 font-bold text-red-200 transition-colors"
                      >
                        Grant Permission
                      </button>
                    </div>
                  )}

                  {!hasSpeechSupport && (
                    <div className="inline-flex items-center gap-x-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs text-amber-300">
                      <span>🎙️ Audio Response Mode Active: Type below or tap a quick prompt — Jarvis speaks back aloud!</span>
                    </div>
                  )}

                  {/* Integrated Audio Input Form (Supported in all browsers including Firefox) */}
                  <form
                    onSubmit={(e: FormEvent) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-x-2 w-full max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-2 backdrop-blur-md focus-within:border-sky-500/60 transition-all shadow-lg"
                  >
                    <input
                      ref={audioInputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={hasSpeechSupport ? "Speak or type your question..." : "Ask Jarvis anything (voice answers aloud)..."}
                      className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isLoading}
                      className="flex size-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md hover:bg-sky-400 disabled:opacity-40 transition-all"
                    >
                      <HugeiconsIcon icon={SentIcon} size={18} />
                    </button>
                  </form>

                  {/* Audio Controls & Quick Voice Prompts */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSendMessage("What core services does Naethra offer?")}
                      className="rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs text-slate-300 hover:border-sky-500/50 hover:text-white transition-all"
                    >
                      💡 Core services
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("Tell me about your mobile app capabilities")}
                      className="rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs text-slate-300 hover:border-sky-500/50 hover:text-white transition-all"
                    >
                      📱 Mobile apps
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendMessage("What FileMaker development services do you provide?")}
                      className="rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 text-xs text-slate-300 hover:border-sky-500/50 hover:text-white transition-all"
                    >
                      ⚡ FileMaker expertise
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* TEXT CHAT MODE INTERFACE */
              <div className="flex flex-1 flex-col overflow-hidden px-4 py-6 max-w-4xl mx-auto w-full">
                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-x-2 text-[10px] text-slate-400 mb-1 px-1">
                        <span>{msg.sender === "user" ? "You" : "Jarvis AI"}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none shadow-md"
                            : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-sky-400 bg-slate-900/60 border border-slate-800/80 px-4 py-3 rounded-2xl w-fit">
                      <span className="size-2 rounded-full bg-sky-400 animate-ping" />
                      <span>Jarvis is formulating response...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Text Form Input */}
                <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-x-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                      isListening
                        ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
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
                    className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white transition-all hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <HugeiconsIcon icon={SentIcon} size={20} />
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Gemini API Key Modal Dialog */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <HugeiconsIcon icon={Key01Icon} size={20} />
                </div>
                <h3 className="text-lg font-bold">Configure Gemini API Key</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your Google Gemini API key to enable live voice &amp; text AI responses. Your key is stored locally in your browser.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Gemini API Key</label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-x-3 pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-400 hover:underline"
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
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white hover:opacity-90"
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
