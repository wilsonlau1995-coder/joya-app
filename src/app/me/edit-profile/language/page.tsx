"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };
type Language = { code: string; name: string; flag: string };

function LanguageSelectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  
  const languageType = searchParams.get("type") as "native" | "interest";
  const selectedLanguages = searchParams.get("selected") ? JSON.parse(decodeURIComponent(searchParams.get("selected")!)) : [];
  
  const [selected, setSelected] = useState<Language[]>(selectedLanguages);

  const allLanguages: Language[] = [
    { code: "zh-CN", name: "中文", flag: "🇨🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "sv", name: "Svenska", flag: "🇸🇪" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "zh-TW", name: "繁體中文", flag: "🇹🇼" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
  ];

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleLanguageSelect(language: Language) {
    const isSelected = selected.some(l => l.code === language.code);
    let newLanguages;
    if (isSelected) {
      if (selected.length === 1) {
        showToast("至少选择一种语言");
        return;
      }
      newLanguages = selected.filter(l => l.code !== language.code);
    } else {
      if (selected.length >= 3) {
        showToast("最多选择3种语言");
        return;
      }
      newLanguages = [...selected, language];
    }
    setSelected(newLanguages);
  }

  function handleConfirm() {
    if (selected.length === 0) {
      showToast("至少选择1种语言");
      return;
    }
    
    const returnUrl = `/me/edit-profile?type=${languageType}&selected=${encodeURIComponent(JSON.stringify(selected))}`;
    router.push(returnUrl);
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.back()}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">
          {languageType === "native" ? "选择母语" : "选择感兴趣的语言"}
        </div>
        <button
          type="button"
          className="h-11 px-4 rounded-2xl bg-joya-yellow text-joya-black font-medium hover:bg-joya-yellow/80 transition"
          onClick={handleConfirm}
        >
          保存
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {allLanguages.map((language) => {
            const isSelected = selected.some(l => l.code === language.code);
            
            return (
              <button
                key={language.code}
                type="button"
                className={`w-full p-4 flex items-center justify-between hover:bg-joya-yellow/20 transition ${isSelected ? 'bg-joya-yellow/10' : ''}`}
                onClick={() => handleLanguageSelect(language)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{language.flag}</span>
                  <span className="text-joya-black/80">{language.name}</span>
                </div>
                {isSelected && (
                  <Check className="h-5 w-5 text-joya-yellow" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}

export default function LanguageSelectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-joya-bg0 flex items-center justify-center">
      <div className="text-joya-black/50">加载中...</div>
    </div>}>
      <LanguageSelectContent />
    </Suspense>
  );
}
