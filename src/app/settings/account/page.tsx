"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();

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
        <div className="text-base font-semibold">账号与安全</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-between text-left"
          onClick={() => router.push("/settings/account/delete")}
        >
          <span className="text-joya-black/80">注销账号</span>
          <ChevronRight className="h-5 w-5 text-joya-black/40" />
        </button>
      </div>
    </div>
  );
}
