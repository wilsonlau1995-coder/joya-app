"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BlocklistPage() {
  const router = useRouter();

  const blockedUsers = [
    { id: "1", name: "User123", avatar: null },
    { id: "2", name: "SpamUser", avatar: null },
    { id: "3", name: "TrollAccount", avatar: null },
  ];

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
        <div className="text-base font-semibold">黑名单</div>
        <div className="h-11 w-11" />
      </div>

      <div className="mt-6 space-y-3">
        {blockedUsers.length > 0 ? (
          blockedUsers.map((user) => (
            <div
              key={user.id}
              className="joya-card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-joya-black/10" />
                <span className="text-joya-black/80">{user.name}</span>
              </div>
              <button
                type="button"
                className="text-joya-black/50 text-sm"
              >
                解除
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-joya-black/50 py-12">
            暂无黑名单用户
          </div>
        )}
      </div>
    </div>
  );
}
