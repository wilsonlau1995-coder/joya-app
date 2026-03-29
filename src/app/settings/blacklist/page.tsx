"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserMinus, X, UserX } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };
type BlacklistedUser = { id: string; name: string; avatar: string };

export default function BlacklistPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BlacklistedUser | null>(null);

  const blacklistedUsers: BlacklistedUser[] = [
    { id: "1", name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleUnblock(user: BlacklistedUser) {
    setSelectedUser(user);
    setShowConfirm(true);
  }

  function confirmUnblock() {
    if (selectedUser) {
      showToast(`已解除 ${selectedUser.name} 的拉黑状态`);
      setShowConfirm(false);
      setSelectedUser(null);
    }
  }

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
        <div className="text-base font-semibold text-joya-black">黑名单</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6">
        {blacklistedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-24 w-24 rounded-full bg-joya-yellow/20 flex items-center justify-center mb-6">
              <UserX className="h-12 w-12 text-joya-black/30" />
            </div>
            <h3 className="text-lg font-semibold text-joya-black mb-2">暂无拉黑用户</h3>
            <p className="text-sm text-joya-black/50 text-center max-w-xs">
              您还没有拉黑任何用户，这里会显示您拉黑的用户列表
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {blacklistedUsers.map((user) => (
              <div
                key={user.id}
                className="joya-card p-4 flex items-center justify-between bg-white"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-joya-black/80 font-medium">{user.name}</span>
                </div>
                <button
                  type="button"
                  className="h-9 w-9 rounded-2xl bg-joya-yellow/20 flex items-center justify-center hover:bg-joya-yellow/30 transition"
                  onClick={() => handleUnblock(user)}
                  aria-label={`解除 ${user.name} 的拉黑`}
                >
                  <UserMinus className="h-4 w-4 text-joya-black/70" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="joya-card w-full max-w-sm bg-white p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-joya-yellow/20 flex items-center justify-center flex-shrink-0">
                  <UserMinus className="h-5 w-5 text-joya-black/70" />
                </div>
                <h3 className="text-lg font-semibold text-joya-black">解除拉黑</h3>
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
              确定要解除对 <span className="font-semibold text-joya-black">{selectedUser.name}</span> 的拉黑吗？解除后，该用户将可以正常与您互动。
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
                className="flex-1 py-3 rounded-2xl bg-joya-yellow text-joya-black font-medium hover:bg-joya-yellow/80 transition"
                onClick={confirmUnblock}
              >
                确认解除
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
