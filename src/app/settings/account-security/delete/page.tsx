"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, X } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function DeleteAccountPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleDeleteAccount() {
    showToast("账号已注销");
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/settings/account-security")}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">注销账号</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-6">
        <div className="joya-card p-6 bg-white">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-joya-black mb-2">注销账号</h3>
              <p className="text-sm text-joya-black/60 leading-relaxed">
                注销账号将永久删除您的所有数据，包括个人资料、聊天记录、好友关系等。此操作不可撤销，请谨慎操作。
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-medium text-joya-black/50 uppercase tracking-wider">注销前请注意</div>
          <div className="joya-card p-4 bg-white space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-joya-black/30 mt-2 flex-shrink-0" />
              <p className="text-sm text-joya-black/70">所有个人资料将被永久删除</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-joya-black/30 mt-2 flex-shrink-0" />
              <p className="text-sm text-joya-black/70">聊天记录和好友关系将无法恢复</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-joya-black/30 mt-2 flex-shrink-0" />
              <p className="text-sm text-joya-black/70">已购买的虚拟物品将无法找回</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="joya-card w-full p-4 flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 transition text-red-600 font-medium"
          onClick={() => setShowConfirm(true)}
        >
          <AlertTriangle className="h-5 w-5" />
          <span>注销账号</span>
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="joya-card w-full max-w-sm bg-white p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-joya-black">确认注销账号</h3>
              </div>
              <button
                type="button"
                className="h-8 w-8 rounded-full bg-joya-black/5 flex items-center justify-center hover:bg-joya-black/10 transition"
                onClick={() => setShowConfirm(false)}
              >
                <X className="h-4 w-4 text-joya-black/60" />
              </button>
            </div>

            <p className="text-sm text-joya-black/70 leading-relaxed">
              您确定要注销账号吗？此操作不可撤销，您的所有数据将被永久删除。
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl border border-joya-black/10 text-joya-black/80 font-medium hover:bg-joya-black/5 transition"
                onClick={() => setShowConfirm(false)}
              >
                取消
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                onClick={handleDeleteAccount}
              >
                确认注销
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
