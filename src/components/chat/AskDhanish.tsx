'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { streamGeminiResponse } from '@/lib/gemini';
import ChatMessage from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What's your strongest skill?",
  'Tell me about RecruitMate',
  'Are you open to opportunities?',
];

export default function AskDhanish() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      await streamGeminiResponse(text, (chunk) => {
        assistantContent += chunk;
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: assistantContent },
        ]);
      });
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(question: string) {
    setInput(question);
    sendMessage(question);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="chat-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-bg-surface border border-accent/40 rounded-full shadow-[0_0_30px_rgba(245,164,32,0.15)] hover:border-accent transition-all flex items-center justify-center"
              aria-label="Open chat"
            >
              <span className="font-mono text-accent text-sm font-bold">DM</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 right-6 w-[360px] h-[520px] bg-bg-surface border border-bg-border rounded-2xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-bg-border">
              <span className="font-mono text-sm text-text-primary">Ask Dhanish</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Suggested questions (shown only when no messages) */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 p-4 border-b border-bg-border">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs font-mono px-3 py-2 border border-bg-border text-text-secondary hover:border-accent hover:text-accent rounded-full cursor-pointer transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} role={msg.role} content={msg.content} />
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <span className="text-text-muted text-sm font-mono">Thinking...</span>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer: input + send */}
            <div className="px-4 py-3 border-t border-bg-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted font-mono focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="px-3 py-2 bg-accent text-bg-base rounded-lg font-mono text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
              <p className="text-[10px] text-text-muted font-mono mt-2 text-center">
                Powered by Gemini
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
