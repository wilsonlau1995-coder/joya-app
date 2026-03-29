"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function AboutPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleLinkClick(title: string) {
    showToast(`即将打开：${title}`);
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/settings")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">关于我们</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-3">
        <div className="joya-card p-6 bg-white text-center">
          <div className="h-20 w-20 rounded-3xl bg-joya-yellow flex items-center justify-center mx-auto mb-4">
            <Heart className="h-10 w-10 text-joya-black" />
          </div>
          <h2 className="text-2xl font-bold text-joya-black mb-1">Joya</h2>
          <p className="text-sm text-joya-black/50">版本 1.0.0</p>
        </div>

        <div className="joya-card bg-white overflow-hidden">
          <button
            type="button"
            className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
            onClick={() => handleLinkClick("用户协议")}
          >
            <span className="text-joya-black/80">用户协议</span>
            <ExternalLink className="h-4 w-4 text-joya-black/40" />
          </button>
          <button
            type="button"
            className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
            onClick={() => handleLinkClick("隐私协议")}
          >
            <span className="text-joya-black/80">隐私协议</span>
            <ExternalLink className="h-4 w-4 text-joya-black/40" />
          </button>
          <button
            type="button"
            className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
            onClick={() => handleLinkClick("退款须知")}
          >
            <span className="text-joya-black/80">退款须知</span>
            <ExternalLink className="h-4 w-4 text-joya-black/40" />
          </button>
          <button
            type="button"
            className="w-full p-4 flex items-center justify-between hover:bg-joya-yellow/20 transition"
            onClick={() => handleLinkClick("知识产权")}
          >
            <span className="text-joya-black/80">知识产权</span>
            <ExternalLink className="h-4 w-4 text-joya-black/40" />
          </button>
        </div>

        <div className="text-center py-4">
          <p className="text-xs text-joya-black/40">
            © 2025 Joya. All rights reserved.
          </p>
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
