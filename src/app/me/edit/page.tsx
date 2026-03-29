"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function EditProfilePage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    showToast("已保存（原型占位）");
    router.push("/me");
  }

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
        <div className="text-base font-semibold">编辑资料</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 flex-1 space-y-4">
        <div className="joya-card p-4">
          <div className="grid grid-cols-3 gap-3 items-center">
            <label className="text-joya-black/60 text-sm">昵称</label>
            <input
              className="col-span-2 bg-joya-black/3 border border-joya-black/10 rounded-lg px-3 py-2 outline-none"
              defaultValue="Wilson"
            />
          </div>
        </div>

        <div className="joya-card p-4">
          <div className="grid grid-cols-3 gap-3 items-center">
            <label className="text-joya-black/60 text-sm">生日</label>
            <input
              type="date"
              className="col-span-2 bg-joya-black/3 border border-joya-black/10 rounded-lg px-3 py-2 outline-none"
              defaultValue="1998-10-01"
            />
          </div>
        </div>

        <div className="joya-card p-4">
          <label className="text-joya-black/60 text-sm block mb-2">个性签名</label>
          <textarea
            rows={3}
            className="w-full bg-joya-black/3 border border-joya-black/10 rounded-lg px-3 py-2 outline-none"
            defaultValue="nice to meet you guys"
          />
        </div>
      </div>

      <button
        type="button"
        className="joya-btn-yellow w-full py-3 font-semibold"
        onClick={handleSubmit}
      >
        保存
      </button>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
