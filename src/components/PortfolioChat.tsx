'use client';

import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Bot, User, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useUIStore } from '@/src/lib/uiStore';

export function PortfolioChat() {
  const isOpen = useUIStore((s) => s.isChatOpen);
  const openChat = useUIStore((s) => s.openChat);
  const closeChat = useUIStore((s) => s.closeChat);
  const [input, setInput] = useState('');

  const initialMessages: UIMessage[] = [
    {
      id: 'welcome',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: '¡Hola! Soy el asistente de IA de Giampier. Pregúntame sobre su portafolio, experiencia o stack técnico.',
        },
      ],
    },
  ];

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    messages: initialMessages,
  });

  const isStreaming = status === 'streaming' || status === 'submitted';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    sendMessage({ text });
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => openChat()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-rosegold text-pearl rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group focus-visible:ring-2 focus-visible:ring-rosegold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        aria-label="Hablar con el asistente de IA"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-navy light:bg-slate-900 text-pearl light:text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-pearl/10 light:border-slate-700">
          ¿Alguna duda? Pregúntame
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-navy light:bg-white border border-pearl/10 light:border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-label="Chat con asistente IA"
          >
            <div className="p-4 border-b border-pearl/10 light:border-slate-200 flex items-center justify-between bg-pearl/5 light:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rosegold flex items-center justify-center">
                  <Bot className="w-5 h-5 text-pearl" />
                </div>
                <div>
                  <h3 className="text-pearl font-semibold text-sm">AI Assistant</h3>
                  <span className="text-[10px] text-green-400">Online</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => closeChat()} aria-label="Cerrar chat">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              role="log"
              aria-live="polite"
            >
              {messages.map((m) => {
                const text = m.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => (part as { type: 'text'; text: string }).text)
                  .join('');

                return (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        m.role === 'user'
                          ? 'bg-rosegold text-pearl light:text-white rounded-tr-none'
                          : 'bg-pearl/10 light:bg-slate-100 text-platinum light:text-slate-700 rounded-tl-none border border-pearl/5 light:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] uppercase font-bold">
                        {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        <span className="sr-only">{m.role === 'user' ? 'Tú:' : 'Asistente:'}</span>
                        {m.role === 'user' ? 'Tú' : 'Asistente'}
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{text}</p>
                    </div>
                  </div>
                );
              })}
              {isStreaming && (
                <div className="flex justify-start">
                  <div className="bg-pearl/10 light:bg-slate-100 p-3 rounded-2xl rounded-tl-none border border-pearl/5 light:border-slate-200 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-platinum" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="p-4 border-t border-pearl/10 light:border-slate-200 bg-pearl/5 light:bg-slate-50">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu duda..."
                  className="pr-12 bg-navy/50 light:bg-white light:border-slate-300"
                  aria-label="Mensaje al asistente"
                  disabled={isStreaming}
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-rosegold disabled:opacity-30 transition-opacity"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
