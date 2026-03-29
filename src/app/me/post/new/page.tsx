"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Send } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function NewPostPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [text, setText] = useState("");

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">发布动态</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-4">
        <div className="joya-card p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">实景语境</div>
            <div className="text-xs text-joya-black/55">MVP 原型</div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="col-span-1 aspect-square rounded-2xl border border-dashed border-joya-black/20 bg-joya-black/3 grid place-items-center text-joya-black/60 transition active:scale-[0.98]"
              onClick={() => showToast("图片上传：原型占位")}
              aria-label="添加图片"
            >
              <ImageIcon className="h-6 w-6" />
            </button>
            <div className="col-span-2 rounded-2xl bg-joya-black/3 border border-joya-black/10 p-3">
              <div className="text-xs text-joya-black/55">小贴士</div>
              <div className="mt-1 text-sm text-joya-black/75">描述你看到的真实场景，让语言学习更地道。</div>
            </div>
          </div>
        </div>

        <div className="joya-card p-4">
          <div className="text-sm font-semibold">内容</div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Write something about your scene…"
            className="mt-3 w-full resize-none rounded-2xl bg-joya-black/3 border border-joya-black/10 px-3 py-3 outline-none text-joya-black placeholder:text-joya-black/35"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-joya-black/45">{text.length}/280</div>
            <button
              type="button"
              className="joya-btn-yellow px-4 py-2 font-semibold inline-flex items-center gap-2"
              onClick={() => {
                showToast("已发布（原型占位）");
                window.setTimeout(() => router.push("/me"), 500);
              }}
              aria-label="发布"
            >
              <Send className="h-4 w-4" />
              发布
            </button>
          </div>
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
