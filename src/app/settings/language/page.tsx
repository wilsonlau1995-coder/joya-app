"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };
type Language = { code: string; name: string; flag: string };

export default function LanguagePage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'zh-CN';
    }
    return 'zh-CN';
  });
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
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
        setSelectedLanguage(savedLanguage);
      }
    }
  }, []);

  const languages: Language[] = [
    { code: "en", name: "English", flag: "" },
    { code: "zh-CN", name: "简体中文", flag: "" },
    { code: "zh-TW", name: "繁體中文", flag: "" },
    { code: "vi", name: "Tiếng Việt", flag: "" },
    { code: "ko", name: "한국어", flag: "" },
    { code: "id", name: "Bahasa Indonesia", flag: "" },
  ];

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleLanguageSelect(code: string) {
    setSelectedLanguage(code);
  }

  function handleComplete() {
    if (selectedLanguage !== currentLanguage) {
      localStorage.setItem('language', selectedLanguage);
      setCurrentLanguage(selectedLanguage);
      showToast(`已切换至 ${languages.find(l => l.code === selectedLanguage)?.name}`);
      setTimeout(() => {
        router.push("/settings");
      }, 100);
    }
  }

  const hasChanges = selectedLanguage !== currentLanguage;

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
        <div className="text-base font-semibold text-joya-black">language</div>
        <button
          type="button"
          className={`h-11 px-4 rounded-2xl font-medium transition ${
            hasChanges
              ? "bg-joya-yellow text-joya-black hover:bg-joya-yellow/80"
              : "bg-joya-black/10 text-joya-black/40 cursor-not-allowed"
          }`}
          onClick={handleComplete}
          disabled={!hasChanges}
        >
          完成
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {languages.map((language) => (
          <button
            key={language.code}
            type="button"
            className={`joya-card w-full p-4 flex items-center justify-between bg-white transition ${
              selectedLanguage === language.code
                ? "border-joya-yellow bg-joya-yellow/10"
                : "hover:bg-joya-yellow/20"
            }`}
            onClick={() => handleLanguageSelect(language.code)}
          >
            <span className="text-joya-black/80 font-medium">{language.name}</span>
            {selectedLanguage === language.code ? (
              <div className="h-6 w-6 rounded-full bg-joya-yellow flex items-center justify-center">
                <Check className="h-4 w-4 text-joya-black" />
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full border border-joya-black/20 flex items-center justify-center">
              </div>
            )}
          </button>
        ))}
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
