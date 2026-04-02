"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };
type Country = { code: string; name: string; flag: string };

function RegionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [currentRegion, setCurrentRegion] = useState("US");
  const [selectedRegion, setSelectedRegion] = useState("US");

  useEffect(() => {
    const selected = searchParams.get("selected");
    if (selected) {
      setCurrentRegion(selected);
      setSelectedRegion(selected);
    }
  }, [searchParams]);

  const countries: Country[] = [
    { code: "US", name: "美国", flag: "🇺🇸" },
    { code: "CN", name: "中国", flag: "🇨🇳" },
    { code: "TW", name: "中国台湾", flag: "🇨🇳" },
    { code: "HK", name: "中国香港", flag: "🇭🇰" },
    { code: "MO", name: "中国澳门", flag: "🇲🇴" },
    { code: "JP", name: "日本", flag: "🇯🇵" },
    { code: "KR", name: "韩国", flag: "🇰🇷" },
    { code: "VN", name: "越南", flag: "🇻🇳" },
    { code: "ID", name: "印度尼西亚", flag: "🇮🇩" },
    { code: "TH", name: "泰国", flag: "🇹🇭" },
    { code: "SG", name: "新加坡", flag: "🇸🇬" },
    { code: "MY", name: "马来西亚", flag: "🇲🇾" },
    { code: "PH", name: "菲律宾", flag: "🇵🇭" },
  ];

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleRegionSelect(code: string) {
    setSelectedRegion(code);
  }

  function handleComplete() {
    if (selectedRegion !== currentRegion) {
      const selectedCountry = countries.find(c => c.code === selectedRegion);
      if (selectedCountry) {
        const url = `/me/edit-profile?region=${selectedRegion}&regionName=${encodeURIComponent(selectedCountry.name)}&regionFlag=${encodeURIComponent(selectedCountry.flag)}`;
        router.push(url);
      }
    }
  }

  const hasChanges = selectedRegion !== currentRegion;

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me/edit-profile")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">选择地区</div>
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

      <div className="mt-6 bg-white overflow-hidden">
        {countries.map((country, index) => (
          <button
            key={country.code}
            type="button"
            className={`w-full p-4 flex items-center justify-between transition ${
              selectedRegion === country.code
                ? "bg-joya-yellow/10"
                : "hover:bg-joya-yellow/20"
            } ${
              index < countries.length - 1 ? "border-b border-joya-black/5" : ""
            }`}
            onClick={() => handleRegionSelect(country.code)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-joya-black/80 font-medium">{country.name}</span>
            </div>
            {selectedRegion === country.code ? (
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

export default function RegionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-joya-bg0 flex items-center justify-center">
      <div className="text-joya-black/50">加载中...</div>
    </div>}>
      <RegionPageContent />
    </Suspense>
  );
}
