"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Shield, Ban, Globe, Info } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function SettingsPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [currentLanguage, setCurrentLanguage] = useState("English");

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleLogout() {
    showToast("已退出登录（原型占位）");
    router.push("/");
  }

  const menuItems = [
    {
      icon: Shield,
      label: "账号与安全",
      onClick: () => router.push("/settings/account"),
    },
    {
      icon: Ban,
      label: "黑名单",
      onClick: () => router.push("/settings/blocklist"),
    },
    {
      icon: Globe,
      label: "语言选择",
      value: currentLanguage,
      onClick: () => router.push("/settings/language"),
    },
    {
      icon: Info,
      label: "关于我们",
      onClick: () => router.push("/settings/about"),
    },
  ];

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">设置</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="joya-card w-full p-4 flex items-center justify-between text-left"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3 text-joya-black/80">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && (
                <span className="text-joya-black/50 text-sm">{item.value}</span>
              )}
              <ChevronRight className="h-5 w-5 text-joya-black/40" />
            </div>
          </button>
        ))}

        <button
          type="button"
          className="joya-card w-full p-4 text-center text-joya-black/80 font-semibold"
          onClick={handleLogout}
        >
          退出登录
        </button>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
