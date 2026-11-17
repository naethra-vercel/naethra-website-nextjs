"use client";

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
  ActivityIcon,
  Globe02Icon,
  CpuIcon,
  ShieldCheckIcon,
  RadarIcon,
  Settings01Icon,
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

export function JarvisAIAssistantBackup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"hud" | "text">("hud");
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState("");
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(true);
  const [audioPermission, setAudioPermission] = useState<"prompt" | "granted" | "denied">("prompt");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // System Hardware Stats (Animated telemetry)
  const [cpuUsage, setCpuUsage] = useState(32);
  const [memUsage, setMemUsage] = useState(48);
  const [netUsage, setNetUsage] = useState(87);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "jarvis",
      text: "Greetings. I am Jarvis, your Naethra AI assistant. All primary systems online. How may I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsMuted, setTtsMuted] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [activeSystemAction, setActiveSystemAction] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Synth Sound Effects for Futuristic Sci-Fi UI
  const playHudSound = (type: "activate" | "beep" | "scan" | "complete") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "activate") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "beep") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(784, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "scan") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "complete") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn("Web Audio sound playback error:", e);
    }
  };

  // Telemetry fluctuation effect to make the HUD feel alive
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCpuUsage(30 + Math.floor(Math.random() * 8));
      setMemUsage(46 + Math.floor(Math.random() * 5));
      setNetUsage(85 + Math.floor(Math.random() * 6));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Request explicit microphone permission via navigator.mediaDevices.getUserMedia
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

    window.speechSynthesis.cancel(); // Stop active speech

    const cleanText = text.replace(/[*_#`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 0.95; // Slightly deeper Jarvis pitch

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Daniel") ||
            v.name.includes("Oliver") ||
            v.name.includes("Arthur") ||
            v.name.includes("Google UK English Male") ||
            v.name.includes("Natural") ||
            v.name.includes("Samantha"))
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
    playHudSound("beep");
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
        console.warn("Could not start recognition:", err);
      }
    }
  };

  // System Action Button Trigger (Systems, Analyze, Track, Optimize, Secure)
  const triggerSystemAction = (actionName: string, speechMessage: string) => {
    playHudSound("scan");
    setActiveSystemAction(actionName);
    setTimeout(() => {
      setActiveSystemAction(null);
      playHudSound("complete");
    }, 1500);

    const jarvisMessage: Message = {
      id: Date.now().toString(),
      sender: "jarvis",
      text: speechMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, jarvisMessage]);
    speakText(speechMessage);
  };

  // Save API Key
  const handleSaveKey = () => {
    playHudSound("complete");
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

    playHudSound("activate");

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
          parts: [{ text: "Understood. Primary systems operational. I am Jarvis." }],
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
        "All telemetry verified. How else can Naethra assist your technical stack?";

      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, jarvisMessage]);
      playHudSound("complete");

      if (mode === "hud" || !ttsMuted) {
        speakText(replyText);
      }
    } catch (err: any) {
      console.error("Gemini API error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "jarvis",
        text: `Diagnostic Alert: ${err.message || "Invalid API Key or network offline"}. Please verify your API key configuration.`,
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
      {/* Floating Arc Reactor Core Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => {
            playHudSound("activate");
            setIsOpen(true);
          }}
          className="group relative flex size-14 items-center justify-center rounded-full bg-transparent p-1 transition-all duration-300 hover:scale-110"
          aria-label="Activate Jarvis HUD System"
          title="Activate Jarvis HUD System"
        >
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

      {/* Full-Screen Stark JARVIS Sci-Fi HUD Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-[#030712] text-cyan-400 font-mono overflow-hidden select-none animate-in fade-in duration-300">
          {/* Subtle Cybernetic Grid Scanline & Radial Overlay Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950/80 to-slate-950" />

          {/* Top HUD Header Bar */}
          <header className="relative z-10 flex h-16 items-center justify-between border-b border-cyan-500/30 px-4 lg:px-8 bg-slate-950/80 backdrop-blur-md">
            {/* System Status Brand Header */}
            <div className="flex items-center gap-x-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <svg viewBox="0 0 100 100" className="size-6">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="8 6" className="animate-spin" style={{ transformOrigin: "center", animationDuration: "14s" }} />
                  <polygon points="50,18 78,68 22,68" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="14" fill="#38bdf8" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold tracking-wider text-cyan-200">JARVIS (BACKUP)</span>
                  <span className="rounded border border-cyan-500/40 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] text-cyan-300 font-bold">
                    BACKUP SYSTEM
                  </span>
                </div>
                <p className="text-[10px] text-cyan-600 tracking-widest uppercase">STARK TACTICAL INTERFACE • NAETHRA AI</p>
              </div>
            </div>

            {/* Mode & Sound Controls */}
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <div className="flex items-center rounded-md border border-cyan-500/40 bg-slate-900/90 p-1">
                <button
                  type="button"
                  onClick={() => {
                    playHudSound("beep");
                    setMode("hud");
                  }}
                  className={`flex items-center gap-x-1.5 rounded px-3 py-1 text-xs font-semibold tracking-wider transition-all ${
                    mode === "hud"
                      ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                      : "text-slate-400 hover:text-cyan-300"
                  }`}
                >
                  <HugeiconsIcon icon={RadarIcon} size={14} />
                  <span>HUD MODE</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playHudSound("beep");
                    setMode("text");
                  }}
                  className={`flex items-center gap-x-1.5 rounded px-3 py-1 text-xs font-semibold tracking-wider transition-all ${
                    mode === "text"
                      ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                      : "text-slate-400 hover:text-cyan-300"
                  }`}
                >
                  <HugeiconsIcon icon={Message01Icon} size={14} />
                  <span>LOG CHAT</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) playHudSound("beep");
                }}
                className={`flex size-9 items-center justify-center rounded border transition-all ${
                  soundEnabled
                    ? "border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400"
                    : "border-slate-800 bg-slate-900 text-slate-500"
                }`}
                title={soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects"}
              >
                <HugeiconsIcon icon={Settings01Icon} size={16} />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis?.cancel();
                  setTtsMuted(!ttsMuted);
                }}
                className={`flex size-9 items-center justify-center rounded border transition-colors ${
                  ttsMuted
                    ? "border-red-500/50 bg-red-950/40 text-red-400"
                    : "border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400"
                }`}
                title={ttsMuted ? "Unmute Voice Output" : "Mute Voice Output"}
              >
                <HugeiconsIcon icon={ttsMuted ? VolumeOffIcon : VolumeHighIcon} size={16} />
              </button>

              <button
                type="button"
                onClick={() => {
                  playHudSound("beep");
                  setShowKeyModal(true);
                }}
                className={`flex items-center gap-x-1.5 rounded border px-3 py-1.5 text-xs font-semibold tracking-wider transition-all ${
                  apiKey
                    ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-400"
                    : "border-amber-500/60 bg-amber-950/40 text-amber-300 animate-pulse"
                }`}
              >
                <HugeiconsIcon icon={Key01Icon} size={14} />
                <span className="hidden sm:inline">{apiKey ? "KEY LOADED" : "SET API KEY"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playHudSound("beep");
                  if (isSpeaking) window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="flex size-9 items-center justify-center rounded border border-cyan-500/30 bg-slate-900 text-cyan-400 transition-colors hover:border-red-500/60 hover:text-red-400"
                aria-label="Close HUD Interface"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>
          </header>

          <main className="relative z-10 flex flex-1 flex-col overflow-hidden p-4 lg:p-6">
            {mode === "hud" ? (
              <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-12 h-full overflow-y-auto lg:overflow-hidden">
                <div className="lg:col-span-3 lg:row-span-12 flex flex-col gap-4 justify-between">
                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={Globe02Icon} size={16} className="text-cyan-400" />
                        <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">GLOBAL SCAN</span>
                      </div>
                      <span className="text-[10px] text-cyan-500 font-mono animate-pulse">● LIVE</span>
                    </div>

                    <div className="relative my-2 flex items-center justify-center h-32 overflow-hidden">
                      <svg viewBox="0 0 100 100" className="size-28 text-cyan-400 opacity-90 animate-spin" style={{ animationDuration: "20s" }}>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                        <ellipse cx="50" cy="50" rx="42" ry="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        <ellipse cx="50" cy="50" rx="18" ry="42" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                        <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                        <circle cx="28" cy="38" r="2" fill="#fbbf24" className="animate-ping" />
                        <circle cx="72" cy="62" r="2" fill="#38bdf8" className="animate-ping" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="space-y-1.5 text-[10px] tracking-wider font-mono text-cyan-400">
                      <div className="flex justify-between border-b border-cyan-900/40 pb-1">
                        <span className="text-slate-400">SATELLITE</span>
                        <span className="text-emerald-400 font-bold">ONLINE</span>
                      </div>
                      <div className="flex justify-between border-b border-cyan-900/40 pb-1">
                        <span className="text-slate-400">WEATHER</span>
                        <span className="text-cyan-300">STABLE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">THREAT LEVEL</span>
                        <span className="text-emerald-400 font-bold">NONE</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)] flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative flex items-center justify-center size-20">
                        <svg viewBox="0 0 100 100" className="size-full">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" strokeWidth="8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="8"
                            strokeDasharray="251.2"
                            strokeDashoffset="0"
                            className="transition-all duration-700"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-sm font-black text-cyan-200">100%</span>
                          <span className="text-[8px] tracking-widest text-cyan-500 uppercase">POWER</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="flex justify-between text-[10px] text-cyan-300 mb-1">
                            <span>CPU</span>
                            <span>{cpuUsage}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30">
                            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${cpuUsage}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-cyan-300 mb-1">
                            <span>MEMORY</span>
                            <span>{memUsage}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30">
                            <div className="h-full bg-indigo-400 transition-all duration-500" style={{ width: `${memUsage}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-cyan-300 mb-1">
                            <span>NETWORK</span>
                            <span>{netUsage}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-cyan-500/30">
                            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${netUsage}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-2">
                      <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">MARK XLVI SCHEMATIC</span>
                      <span className="text-[10px] text-amber-400 font-mono">STARK-V8</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="relative size-24 flex items-center justify-center">
                        <svg viewBox="0 0 100 120" className="size-full text-cyan-400 opacity-80">
                          <polygon points="50,10 62,24 38,24" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <polygon points="30,30 70,30 62,60 38,60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="50" cy="44" r="6" fill="#38bdf8" className="animate-pulse" />
                          <line x1="30" y1="30" x2="15" y2="60" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="70" y1="30" x2="85" y2="60" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="40" y1="60" x2="35" y2="105" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="60" y1="60" x2="65" y2="105" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>

                      <div className="space-y-1.5 text-[10px] font-mono">
                        <div className="flex items-center gap-1 text-emerald-400">
                          <span>●</span>
                          <span>SYSTEMS ONLINE</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-300">
                          <span>●</span>
                          <span>ARMOR STANDBY</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <span>○</span>
                          <span>WEAPONS OFFLINE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:row-span-12 flex flex-col justify-between items-center relative py-2">
                  {isLoading && (
                    <div className="absolute inset-x-0 h-1 bg-cyan-400/80 shadow-[0_0_15px_#38bdf8] animate-bounce z-30" />
                  )}

                  <div className="relative my-auto flex items-center justify-center w-full max-w-lg aspect-square">
                    <div
                      className={`absolute size-[380px] rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-amber-500/20 blur-3xl transition-all duration-700 ${
                        isSpeaking ? "scale-125 opacity-100 animate-pulse" : isListening ? "scale-110 opacity-90" : "scale-100 opacity-50"
                      }`}
                    />

                    <div
                      className="absolute size-[360px] rounded-full border border-cyan-400/30 border-dashed animate-spin pointer-events-none"
                      style={{ animationDuration: "35s", animationDirection: "reverse" }}
                    />

                    <div
                      className="absolute size-[300px] rounded-full border-2 border-amber-400/40 border-t-transparent border-b-transparent animate-spin pointer-events-none"
                      style={{ animationDuration: "18s" }}
                    />

                    <div
                      className="absolute size-[240px] rounded-full border border-cyan-400/60 animate-spin pointer-events-none"
                      style={{ animationDuration: "12s", animationDirection: "reverse" }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-[1px] bg-cyan-500/20" />
                      <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
                    </div>

                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`group relative size-[160px] rounded-full bg-slate-950 border-2 border-cyan-400/80 p-4 shadow-[0_0_60px_rgba(56,189,248,0.5)] transition-all duration-500 cursor-pointer flex flex-col items-center justify-center ${
                        isListening
                          ? "scale-110 border-amber-400 shadow-[0_0_80px_rgba(251,191,36,0.7)] ring-4 ring-amber-400/30"
                          : isSpeaking
                          ? "scale-105 border-cyan-300 shadow-[0_0_80px_rgba(56,189,248,0.8)]"
                          : "hover:scale-105 hover:border-cyan-200"
                      }`}
                    >
                      <svg viewBox="0 0 100 100" className="size-20 text-cyan-400">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 4"
                          className="animate-spin"
                          style={{ transformOrigin: "center", animationDuration: "10s" }}
                        />
                        <polygon
                          points="50,18 78,68 22,68"
                          fill="none"
                          stroke="url(#core-arc-grad)"
                          strokeWidth="5"
                          strokeLinejoin="round"
                        />
                        <polygon
                          points="50,82 22,32 78,32"
                          fill="none"
                          stroke="url(#core-arc-grad)"
                          strokeWidth="3"
                          strokeLinejoin="round"
                          opacity="0.7"
                        />
                        <circle cx="50" cy="50" r="12" fill="url(#core-arc-glow)" />
                        <circle cx="50" cy="50" r="5" fill="#ffffff" />
                        <defs>
                          <linearGradient id="core-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="50%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                          <radialGradient id="core-arc-glow">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="40%" stopColor="#38bdf8" />
                            <stop offset="80%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </radialGradient>
                        </defs>
                      </svg>
                      <span className="text-[11px] font-black tracking-widest text-cyan-200 uppercase mt-1 drop-shadow">
                        {isListening ? "LISTENING" : isSpeaking ? "SPEAKING" : "JARVIS"}
                      </span>
                    </button>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="min-h-[56px] rounded-xl border border-cyan-500/40 bg-slate-950/80 px-6 py-3 flex items-center justify-center text-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      {isLoading ? (
                        <div className="flex items-center gap-3 text-cyan-300 font-bold tracking-wider">
                          <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
                          <span>NEURAL MATRIX PROCESSING...</span>
                        </div>
                      ) : isListening ? (
                        <p className="text-base font-semibold text-amber-300 italic tracking-wide">
                          &quot;{transcriptText || "Listening for command..."}&quot;
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-cyan-100 tracking-wide leading-relaxed">
                          {messages[messages.length - 1]?.text || "HOW CAN I HELP YOU?"}
                        </p>
                      )}
                    </div>

                    <form
                      onSubmit={handleFormSubmit}
                      className="flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-slate-950/90 p-2 focus-within:border-cyan-300 focus-within:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
                    >
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all ${
                          isListening
                            ? "border-amber-400 bg-amber-950/50 text-amber-300 animate-pulse"
                            : "border-cyan-500/30 bg-slate-900 text-cyan-400 hover:border-cyan-300"
                        }`}
                        title="Voice Microphone"
                      >
                        <HugeiconsIcon icon={isListening ? MicOff01Icon : Mic01Icon} size={18} />
                      </button>

                      <input
                        ref={audioInputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="ASK JARVIS ANYTHING ABOUT NAETHRA..."
                        className="flex-1 bg-transparent px-3 py-2 text-xs text-cyan-100 placeholder-cyan-700 tracking-wider font-mono focus:outline-none"
                      />

                      <button
                        type="submit"
                        disabled={!inputText.trim() || isLoading}
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/60 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/40 disabled:opacity-30 transition-all shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                      >
                        <HugeiconsIcon icon={SentIcon} size={18} />
                      </button>
                    </form>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => handleSendMessage("What core services does Naethra offer?")}
                        className="rounded border border-cyan-500/30 bg-slate-900/90 px-3 py-1 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all"
                      >
                        ⚡ CORE SERVICES
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendMessage("Tell me about your mobile app stack")}
                        className="rounded border border-cyan-500/30 bg-slate-900/90 px-3 py-1 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all"
                      >
                        📱 MOBILE APP STACK
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendMessage("What FileMaker database solutions do you provide?")}
                        className="rounded border border-cyan-500/30 bg-slate-900/90 px-3 py-1 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all"
                      >
                        📊 FILEMAKER DB
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendMessage("Describe your AWS DevOps & Cloud maintenance capabilities")}
                        className="rounded border border-cyan-500/30 bg-slate-900/90 px-3 py-1 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all"
                      >
                        ☁️ AWS DEVOPS
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 lg:row-span-12 flex flex-col gap-4 justify-between">
                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={Mic01Icon} size={16} className="text-cyan-400" />
                        <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">JARVIS AUDIO</span>
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">
                        {isListening ? "LISTENING..." : isSpeaking ? "SPEAKING..." : "STANDBY"}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 h-20 my-2 px-2">
                      {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70].map((h, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 rounded-full transition-all duration-300 ${
                            isSpeaking
                              ? "bg-cyan-400 animate-pulse"
                              : isListening
                              ? "bg-amber-400 animate-bounce"
                              : "bg-cyan-900/60"
                          }`}
                          style={{
                            height: isSpeaking || isListening ? `${Math.max(20, Math.round(h * Math.random()))}%` : "20%",
                            animationDelay: `${idx * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-[10px] text-slate-400 text-center font-mono">
                      AUDIO SPECTRUM SENSORS ACTIVE
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)] flex-1 flex flex-col justify-center space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase mb-1 block border-b border-cyan-500/30 pb-1">
                      SYSTEM CONTROLS
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        triggerSystemAction("SYSTEMS", "Running full diagnostic scan on all Naethra application modules. Systems operating at peak efficiency.")
                      }
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between ${
                        activeSystemAction === "SYSTEMS"
                          ? "border-cyan-300 bg-cyan-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : "border-cyan-500/30 bg-slate-900/90 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40"
                      }`}
                    >
                      <span>[ SYSTEMS ]</span>
                      <HugeiconsIcon icon={CpuIcon} size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerSystemAction("ANALYZE", "Analyzing technology stack performance. React 19, TypeScript, and Tailwind CSS compiled without bottlenecks.")
                      }
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between ${
                        activeSystemAction === "ANALYZE"
                          ? "border-cyan-300 bg-cyan-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : "border-cyan-500/30 bg-slate-900/90 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40"
                      }`}
                    >
                      <span>[ ANALYZE ]</span>
                      <HugeiconsIcon icon={ActivityIcon} size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerSystemAction("TRACK", "Tracking user interaction telemetry. Speech recognition and voice synthesis links established.")
                      }
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between ${
                        activeSystemAction === "TRACK"
                          ? "border-cyan-300 bg-cyan-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : "border-cyan-500/30 bg-slate-900/90 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40"
                      }`}
                    >
                      <span>[ TRACK ]</span>
                      <HugeiconsIcon icon={RadarIcon} size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerSystemAction("OPTIMIZE", "Optimizing memory cache and response latency. Ready for multi-modal queries.")
                      }
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between ${
                        activeSystemAction === "OPTIMIZE"
                          ? "border-cyan-300 bg-cyan-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : "border-cyan-500/30 bg-slate-900/90 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40"
                      }`}
                    >
                      <span>[ OPTIMIZE ]</span>
                      <HugeiconsIcon icon={Settings01Icon} size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        triggerSystemAction("SECURE", "Security protocols enforced. Local API key encryption active.")
                      }
                      className={`w-full rounded border px-3 py-2 text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between ${
                        activeSystemAction === "SECURE"
                          ? "border-cyan-300 bg-cyan-500/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : "border-cyan-500/30 bg-slate-900/90 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/40"
                      }`}
                    >
                      <span>[ SECURE ]</span>
                      <HugeiconsIcon icon={ShieldCheckIcon} size={14} />
                    </button>
                  </div>

                  <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-2">
                      <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">TARGET RADAR</span>
                      <span className="text-[10px] text-emerald-400 font-mono">SWEEPING</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="relative size-20 rounded-full border border-cyan-500/40 bg-slate-950 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-full" />
                        <div className="absolute inset-2 border border-cyan-500/20 rounded-full" />
                        <div className="w-full h-[1px] bg-cyan-500/30" />
                        <div className="h-full w-[1px] bg-cyan-500/30 absolute" />
                        <div
                          className="absolute inset-0 bg-[conic-gradient(from_0deg,#38bdf8_0deg,transparent_60deg)] animate-spin opacity-70"
                          style={{ animationDuration: "4s", transformOrigin: "center" }}
                        />
                        <circle cx="65%" cy="35%" r="2" fill="#fbbf24" className="absolute animate-ping" />
                      </div>

                      <div className="space-y-1 text-[10px] font-mono text-cyan-300 text-right">
                        <div>40.7128° N</div>
                        <div>74.0060° W</div>
                        <div className="text-amber-400 font-bold">EARTH</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-1 flex-col overflow-hidden p-4 max-w-4xl mx-auto w-full">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-cyan-700">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-x-2 text-[10px] text-cyan-500 mb-1 px-1 font-mono">
                        <span>{msg.sender === "user" ? "YOU" : "JARVIS AI"}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-xl px-5 py-3.5 text-xs leading-relaxed font-sans ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-sky-700 text-white rounded-tr-none shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                            : "bg-slate-950 border border-cyan-500/40 text-cyan-100 rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-cyan-300 bg-slate-950 border border-cyan-500/40 px-4 py-3 rounded-xl w-fit font-mono">
                      <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>JARVIS IS PROCESSING QUERY...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-x-2 pt-2 border-t border-cyan-500/30">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
                      isListening
                        ? "bg-amber-950/40 text-amber-300 border-amber-500 animate-pulse"
                        : "bg-slate-950 border-cyan-500/30 text-cyan-400 hover:border-cyan-300"
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
                    className="flex-1 rounded-xl border border-cyan-500/40 bg-slate-950 px-5 py-3.5 text-xs text-cyan-100 placeholder-cyan-700 focus:border-cyan-300 focus:outline-none font-mono"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/30 border border-cyan-400/60 text-cyan-200 transition-all hover:bg-cyan-500/50 disabled:opacity-40"
                  >
                    <HugeiconsIcon icon={SentIcon} size={20} />
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      )}

      {showKeyModal && (
        <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200 font-mono">
          <div className="w-full max-w-md rounded-2xl border border-cyan-500/50 bg-slate-950 p-6 text-cyan-200 shadow-[0_0_40px_rgba(6,182,212,0.3)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <HugeiconsIcon icon={Key01Icon} size={20} />
                </div>
                <h3 className="text-sm font-bold tracking-wider">CONFIGURE GEMINI API KEY</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-cyan-500 hover:text-white"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Enter your Google Gemini API key to activate live voice & text intelligence. The key is securely stored in your local browser storage.
            </p>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-wider text-cyan-300 uppercase">GEMINI API KEY</label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-lg border border-cyan-500/40 bg-slate-900 px-4 py-3 text-xs text-white focus:border-cyan-300 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-x-3 pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-cyan-400 hover:underline font-sans"
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
                  className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-950/50"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="rounded-lg border border-cyan-400/60 bg-cyan-500/30 px-5 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-500/50 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                >
                  SAVE KEY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
