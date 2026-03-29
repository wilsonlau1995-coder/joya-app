"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Copy,
  Gem,
  Pencil,
  Plus,
  Settings,
} from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function MePage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  const user = useMemo(
    () => ({
      name: "Wilson",
      id: "58658654",
      bio: "nice to meet you guys",
      native: "English",
      learning: "Japanese",
      points: 1280,
      diamonds: 680,
    }),
    [],
  );

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  async function onCopyId() {
    try {
      await navigator.clipboard.writeText(user.id);
      showToast("已复制 ID");
    } catch {
      showToast("复制失败，请重试");
    }
  }

  return (
    <div className="px-5 pt-[calc(24px+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/me/wallet")}
          className="joya-card h-11 w-11 grid place-items-center active:scale-[0.99] transition"
          aria-label="进入内购"
        >
          <div className="h-9 w-9 rounded-2xl bg-joya-yellow text-joya-black grid place-items-center shadow-glow">
            <Gem className="h-5 w-5" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="joya-card h-11 w-11 grid place-items-center"
          aria-label="打开设置"
        >
          <Settings className="h-5 w-5 text-joya-black/70" />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <div className="relative">
          <div className="h-[116px] w-[116px] rounded-3xl bg-joya-black/5 border border-joya-black/10 shadow-card overflow-hidden">
            <div className="h-full w-full bg-gradient-to-br from-joya-black/5 to-transparent" />
          </div>
          <button
            type="button"
            onClick={() => router.push("/me/edit")}
            className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-joya-black/5 border border-joya-black/10 text-joya-black shadow-card grid place-items-center transition active:scale-[0.98]"
            aria-label="编辑资料"
          >
            <Pencil className="h-4 w-4 text-joya-black/80" />
          </button>
        </div>

        <div className="mt-4 text-2xl font-semibold">{user.name}</div>

        <div className="mt-1.5 inline-flex items-center gap-2 text-joya-black/60">
          <span className="text-sm">ID: {user.id}</span>
          <button
            type="button"
            onClick={onCopyId}
            className="inline-flex items-center justify-center p-1 text-joya-black/55 transition active:scale-[0.96]"
            aria-label="复制用户 ID"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-2 max-w-[320px] text-joya-black/70">“{user.bio}”</div>

        <div
          className="mt-3 inline-flex items-center gap-2"
          aria-label={`Native language ${user.native}, language of interest ${user.learning}`}
        >
          <img
            src="https://flagcdn.com/w40/gb.png"
            alt="英国国旗"
            className="h-5 w-7 object-cover rounded-sm border border-joya-black/10"
          />
          <ArrowLeftRight className="h-3.5 w-3.5 text-joya-yellow" strokeWidth={2} aria-hidden />
          <img
            src="https://flagcdn.com/w40/jp.png"
            alt="日本国旗"
            className="h-5 w-7 object-cover rounded-sm border border-joya-black/10"
          />
          <span className="sr-only">Native: {user.native}. Learning: {user.learning}.</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-3xl bg-gradient-to-b from-joya-black/5 to-joya-black/2 border border-joya-black/10 shadow-card p-6">
          <div className="text-joya-black/60 text-sm">Tell your stories</div>
          <div className="mt-1 text-joya-black/80 text-xl font-semibold">Share with the world</div>
          <button
            type="button"
            onClick={() => router.push("/me/post/new")}
            className="mt-5 w-full rounded-full border border-dashed border-joya-black/20 bg-white/70 px-5 py-4 text-joya-black/70 font-semibold inline-flex items-center justify-center gap-2 transition active:scale-[0.99]"
            aria-label="发布动态"
          >
            <Plus className="h-5 w-5" />
            Publish
          </button>
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
