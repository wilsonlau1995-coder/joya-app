"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Shield, AlertTriangle } from "lucide-react";

export default function AccountSecurityPage() {
  const router = useRouter();

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
        <div className="text-base font-semibold text-joya-black">账号安全</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
          onClick={() => router.push("/settings/account-security/delete")}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-joya-black/80">注销账号</span>
          </div>
          <ChevronRight className="h-5 w-5 text-joya-black/40" />
        </button>
      </div>
    </div>
  );
}
