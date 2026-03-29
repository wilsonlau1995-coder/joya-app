"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

const languages = [
  { code: "en", name: "English" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "ko", name: "한국어" },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState("en");
  const [originalLang, setOriginalLang] = useState("en");
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  useEffect(() => {
    const savedLangName = localStorage.getItem("selectedLanguage");
    if (savedLangName) {
      const lang = languages.find((l) => l.name === savedLangName);
      if (lang) {
        setSelectedLang(lang.code);
        setOriginalLang(lang.code);
      }
    }
  }, []);

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleSelect(langCode: string) {
    setSelectedLang(langCode);
  }

  function handleComplete() {
    const lang = languages.find((l) => l.code === selectedLang);
    if (lang) {
      localStorage.setItem("selectedLanguage", lang.name);
      setOriginalLang(selectedLang);
      showToast(`语言已切换为 ${lang.name}`);
      router.push("/settings");
    }
  }

  const hasChanged = selectedLang !== originalLang;

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/settings")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">语言选择</div>
        <button
          type="button"
          className={`h-11 px-4 rounded-2xl font-semibold transition ${
            hasChanged
              ? "bg-joya-yellow text-joya-black"
              : "bg-joya-black/10 text-joya-black/40"
          }`}
          onClick={handleComplete}
          disabled={!hasChanged}
        >
          完成
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className="joya-card w-full p-4 flex items-center justify-between text-left"
            onClick={() => handleSelect(lang.code)}
          >
            <span className="text-joya-black/80">{lang.name}</span>
            {selectedLang === lang.code && (
              <Check className="h-5 w-5 text-joya-yellow" />
            )}
          </button>
        ))}
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
