"use client";

import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";
import { useState } from "react";

const messages = [
  {
    id: "m1",
    name: "Aiko",
    snippet: "Hi Wilson, can you help me with this phrase?",
    time: "14:20",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "m2",
    name: "Mateo",
    snippet: "That scene looks amazing — where is it?",
    time: "11:05",
    unread: 0,
  },
  {
    id: "m3",
    name: "Lina",
    snippet: "Let’s practice English in real contexts!",
    time: "昨天",
    unread: 0,
    isDeleted: true,
  },
  {
    id: "m4",
    name: "Tom",
    snippet: "I'll see you tomorrow!",
    time: "3天前",
    unread: 0,
    isDeleted: true,
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [toast, setToast] = useState({ open: false, message: "" });

  function showToast(message: string) {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleAvatarClick(userId: string, isDeleted: boolean) {
    if (isDeleted) {
      showToast("该用户已注销");
    } else {
      router.push(`/user/${userId}`);
    }
  }

  return (
    <div className="px-5 pt-[calc(32px+env(safe-area-inset-top))]">
      <div className="text-2xl font-semibold">Messages</div>
      <div className="mt-2 text-joya-black/60">会话列表占位，用于验证未读态与滚动。</div>

      <div className="mt-6 space-y-3">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className="joya-card p-4 cursor-pointer hover:bg-joya-black/5 transition"
            onClick={() => router.push(`/messages/${m.id}`)}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAvatarClick(m.id, m.isDeleted || false);
                }}
                className={`h-12 w-12 rounded-2xl flex-shrink-0 ${m.avatar && !m.isDeleted ? 'overflow-hidden' : 'bg-joya-black/5'}`}
              >
                {m.avatar && !m.isDeleted && (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium truncate">{m.isDeleted ? '用户已注销' : m.name}</div>
                  <div className="text-xs text-joya-black/45">{m.time}</div>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <div className="text-sm text-joya-black/55 truncate">{m.snippet}</div>
                  {!m.isDeleted && m.unread > 0 ? (
                    <div className="min-w-6 h-6 px-2 rounded-full bg-joya-yellow text-joya-black text-xs font-semibold grid place-items-center">
                      {m.unread}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
