"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "./theme-provider";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({
  dict,
  lang,
}: {
  dict: {
    title: string;
    subtitle: string;
    placeholder: string;
    greeting: string;
    bubble: string;
    ariaLabel: string;
    chips: string[];
  };
  lang: string;
}) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showChips, setShowChips] = useState(false);
  const greetedRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true;
      setMessages([
        { id: crypto.randomUUID(), role: "assistant", content: dict.greeting },
      ]);
      setShowChips(true);
    }
  }, [open, dict.greeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setShowChips(false);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply || data.error || "Something went wrong.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            lang === "pt"
              ? "Erro de ligação. Tenta novamente."
              : "Connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    send(text);
  }

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "bottom right" }}
            className={`flex w-[calc(100vw-2rem)] flex-col overflow-hidden border sm:w-96 ${
              isDark
                ? "border-[#333] bg-[#0a0a0a]"
                : "border-muted/30 bg-white"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between border-b px-4 py-3 ${
                isDark ? "border-[#333]" : "border-muted/20"
              }`}
            >
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[2px]">
                  {dict.title}
                </p>
                <p className="font-mono text-[8px] uppercase tracking-[1px] text-muted">
                  {dict.subtitle}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted transition-colors hover:text-foreground"
                aria-label="Close chat"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="scrollbar-none max-h-80 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.role === "assistant"
                      ? `max-w-[85%] border px-4 py-2.5 text-sm ${
                          isDark
                            ? "border-[#333] text-[#ccc]"
                            : "border-muted/20 text-foreground/70"
                        }`
                      : `max-w-[85%] ml-auto px-4 py-2.5 text-sm ${
                          isDark
                            ? "bg-white text-black"
                            : "bg-foreground text-background"
                        }`
                  }
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 px-2 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick reply chips */}
            {showChips && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {dict.chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[1px] transition-colors ${
                      isDark
                        ? "border-[#333] text-muted hover:border-white hover:text-white"
                        : "border-muted/30 text-muted hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className={`flex items-center gap-2 border-t px-4 py-3 ${
                isDark ? "border-[#333]" : "border-muted/20"
              }`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={dict.placeholder}
                className="flex-1 bg-transparent px-0 py-1 font-mono text-sm text-foreground outline-none placeholder:text-muted/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-foreground disabled:opacity-30"
                aria-label="Send"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.2 }}
            className={`relative flex items-center gap-2 border px-4 py-2.5 ${
              isDark
                ? "border-[#333] bg-[#0a0a0a]"
                : "border-muted/30 bg-white"
            }`}
          >
            <button
              onClick={() => {
                setOpen(true);
                setShowBubble(false);
              }}
              className="font-mono text-[10px] uppercase tracking-[2px] text-muted transition-colors hover:text-foreground"
            >
              {dict.bubble}
            </button>
            <button
              onClick={() => setShowBubble(false)}
              className="text-muted/50 transition-colors hover:text-foreground"
              aria-label="Dismiss"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (showBubble) setShowBubble(false);
        }}
        aria-label={dict.ariaLabel}
        className={`relative flex h-12 w-12 items-center justify-center border transition-all ${
          isDark
            ? "border-[#333] bg-[#0a0a0a] text-white hover:bg-[#111]"
            : "border-muted/30 bg-white text-foreground hover:bg-muted/10"
        }`}
      >
        {showBubble && !open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foreground" />
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
