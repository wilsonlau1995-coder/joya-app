"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const links = [
    { label: "用户协议", onClick: () => {} },
    { label: "隐私协议", onClick: () => {} },
    { label: "退款须知", onClick: () => {} },
    { label: "知识产权条款", onClick: () => {} },
  ];

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/settings")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">关于我们</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-3 flex flex-col items-center">
        <div className="h-14 w-14 rounded-3xl bg-joya-yellow flex items-center justify-center text-3xl font-bold text-joya-black shadow-glow">
          J
        </div>
        <div className="mt-1 text-xl font-semibold text-joya-black">Joya</div>
        <div className="mt-1 text-sm text-joya-black/50">Version 1.0.0</div>
      </div>

      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <button
            key={link.label}
            type="button"
            className="joya-card w-full p-3 flex items-center justify-between text-left"
            onClick={link.onClick}
          >
            <div className="flex items-center gap-3 text-joya-black/80">
              <FileText className="h-5 w-5" />
              <span>{link.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-joya-black/40" />
          </button>
        ))}
      </div>

      <div className="text-center text-joya-black/40 text-xs mt-3">
        Copyright © 2026 Joya. All rights reserved.
      </div>
    </div>
  );
}
