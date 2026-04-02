"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import Toast from "@/components/Toast";

export default function MessageConversationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How are you?", sender: "other", time: "10:30 AM" },
    { id: 2, text: "I'm doing great, thanks!", sender: "me", time: "10:31 AM" },
    { id: 3, text: "What are you up to today?", sender: "other", time: "10:32 AM" },
  ]);
  const [toast, setToast] = useState({ open: false, message: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Check if the user is deleted (for demo purposes, we'll assume m3 and m4 are deleted users)
  const isDeletedUser = params.id === "m3" || params.id === "m4";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function showToast(message: string) {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  const handleSend = () => {
    if (isDeletedUser) {
      showToast("对方已注销账号，无法发送消息");
      return;
    }
    
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
                  aria-label="Back"
                >
                  <ArrowLeft className="h-5 w-5 text-joya-black/70" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-joya-black/5 border border-joya-black/10 overflow-hidden">
                    {!isDeletedUser && (
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-joya-black">{isDeletedUser ? '用户已注销' : 'Aiko'}</div>
                    {!isDeletedUser && (
                      <div className="text-xs text-joya-black/60">Online</div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="joya-card h-11 w-11 grid place-items-center"
                aria-label="More"
                disabled={isDeletedUser}
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
                  placeholder={isDeletedUser ? "对方已注销，无法发送消息" : "Type a message..."}
                  disabled={isDeletedUser}
                  className={`flex-1 px-4 py-3 rounded-2xl border focus:outline-none ${isDeletedUser ? 'bg-joya-black/5 border-joya-black/10 text-joya-black/40' : 'bg-white border-joya-black/10'}`}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isDeletedUser}
                  className={`h-12 w-12 rounded-full grid place-items-center transition active:scale-[0.98] ${isDeletedUser ? 'bg-joya-black/10 text-joya-black/40' : 'bg-joya-yellow text-joya-black'}`}
                  aria-label="Send"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>

            <Toast open={toast.open} message={toast.message} />
          </div>
        </div>
      </div>
    </div>
  );
}
