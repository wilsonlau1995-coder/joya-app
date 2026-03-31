"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Send, Paperclip } from "lucide-react";

export default function MessageConversationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How are you?", sender: "other", time: "10:30 AM" },
    { id: 2, text: "I'm doing great, thanks!", sender: "me", time: "10:31 AM" },
    { id: 3, text: "What are you up to today?", sender: "other", time: "10:32 AM" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="joya-shell starfield bg-joya-bg0">
      <div className="absolute inset-0">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full flex flex-col">
            {/* Header */}
            <div className="px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="joya-card h-11 w-11 grid place-items-center"
                  onClick={() => router.back()}
                  aria-label="返回"
                >
                  <ArrowLeft className="h-5 w-5 text-joya-black/70" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-joya-black/5 border border-joya-black/10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                      alt="Aiko"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-joya-black">Aiko</div>
                    <div className="text-xs text-joya-black/60">在线</div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="joya-card h-11 w-11 grid place-items-center"
                aria-label="更多"
              >
                <Paperclip className="h-5 w-5 text-joya-black/70" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${msg.sender === "me" ? "bg-joya-yellow text-joya-black" : "bg-white text-joya-black/80"}`}
                  >
                    <p>{msg.text}</p>
                    <div className="text-xs text-joya-black/50 mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入消息..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-white border border-joya-black/10 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="h-12 w-12 rounded-full bg-joya-yellow text-joya-black grid place-items-center transition active:scale-[0.98]"
                  aria-label="发送"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
