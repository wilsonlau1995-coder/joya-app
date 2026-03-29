"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Shield, Users, Globe, Info, LogOut, AlertTriangle, Pencil } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function SettingsPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'zh-CN';
    }
    return 'zh-CN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const languageNames: Record<string, string> = {
    'zh-CN': '中文',
    'zh-TW': '繁體中文',
    'en': 'English',
    'ko': '한국어',
  };

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleLogout() {
    showToast("已登出");
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">设置</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
          onClick={() => router.push("/settings/account-security")}
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-joya-black/70" />
            <span className="text-joya-black/80">账号安全</span>
          </div>
          <ChevronRight className="h-5 w-5 text-joya-black/40" />
        </button>

        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
          onClick={() => router.push("/settings/blacklist")}
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-joya-black/70" />
            <span className="text-joya-black/80">黑名单</span>
          </div>
          <ChevronRight className="h-5 w-5 text-joya-black/40" />
        </button>

        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
          onClick={() => router.push("/settings/language")}
        >
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-joya-black/70" />
            <span className="text-joya-black/80">语言选择</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-joya-black/50">{languageNames[currentLanguage] || '中文'}</span>
            <ChevronRight className="h-5 w-5 text-joya-black/40" />
          </div>
        </button>

        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
          onClick={() => router.push("/settings/about")}
        >
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-joya-black/70" />
            <span className="text-joya-black/80">关于我们</span>
          </div>
          <ChevronRight className="h-5 w-5 text-joya-black/40" />
        </button>

        <div className="pt-4 border-t border-joya-black/10">
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center gap-3 bg-white hover:bg-joya-yellow/20 transition text-joya-black/80"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
