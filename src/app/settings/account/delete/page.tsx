"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function DeleteAccountPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleConfirm() {
    if (!checked) {
      showToast("请先确认注销须知");
      return;
    }
    showToast("账号已注销（原型占位）");
    router.push("/");
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/settings/account")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">注销账号</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 flex-1">
        <div className="joya-card p-4">
          <div className="text-joya-black/80 font-semibold mb-3">注销须知</div>
          <ul className="text-joya-black/60 text-sm space-y-2">
            <li>• 注销后，您的账号将无法恢复</li>
            <li>• 注销后，您的所有数据将被清除</li>
            <li>• 注销后，您将无法使用该账号登录</li>
            <li>• 如有未完成的订单，请先处理完毕</li>
          </ul>
        </div>

        <label className="mt-4 flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-5 w-5 rounded border-joya-black/20"
          />
          <span className="text-joya-black/70 text-sm">我已阅读并同意注销须知</span>
        </label>
      </div>

      <button
        type="button"
        className={`w-full py-4 rounded-2xl font-semibold transition ${
          checked
            ? "bg-joya-yellow text-joya-black"
            : "bg-joya-black/10 text-joya-black/40"
        }`}
        onClick={handleConfirm}
        disabled={!checked}
      >
        确认注销
      </button>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
