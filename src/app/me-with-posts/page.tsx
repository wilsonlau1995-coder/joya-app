"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ChevronRight,
  Copy,
  Gem,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  Heart,
} from "lucide-react";

import BottomSheet from "@/components/BottomSheet";
import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function MeWithPostsPage() {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  const user = useMemo(
    () => ({
      name: "Wilson",
      id: "58658654",
      bio: "nice to meet you guys",
      native: "English",
      learning: "Japanese",
      points: 1280,
      diamonds: 680,
    }),
    [],
  );

  const posts = useMemo(
    () => [
      {
        id: "3",
        date: "Mar 10",
        content: "Practicing my pronunciation every day",
        type: "text",
        likes: 42,
      },
      {
        id: "2",
        date: "Mar 8",
        content: "Spring is coming! Look at these beautiful flowers",
        type: "image",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop",
        likes: 128,
      },
      {
        id: "1",
        date: "Mar 5",
        content: "Today I learned a new Japanese phrase! 今日はいい天気ですね",
        type: "text",
        likes: 76,
      },
    ],
    [],
  );

  const colors = ["bg-joya-yellow/30", "bg-joya-pink/30", "bg-joya-blue/30", "bg-joya-purple/30"];

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  async function onCopyId() {
    try {
      await navigator.clipboard.writeText(user.id);
      showToast("已复制 ID");
    } catch {
      showToast("复制失败，请重试");
    }
  }

  return (
    <div className="joya-shell starfield bg-joya-bg0">
      <div className="absolute inset-0">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto pb-28">
            <div className="px-5 pt-[calc(24px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/settings")}
                  className="joya-card h-11 w-11 grid place-items-center"
                  aria-label="打开设置"
                >
                  <Settings className="h-5 w-5 text-joya-black/70" />
                </button>
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-[116px] w-[116px] rounded-3xl bg-joya-black/5 border border-joya-black/10 shadow-card overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
                      alt="头像"
                      className="h-full w-full object-cover object-[50%_65%]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/me/edit-profile")}
                    className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-white border border-joya-black/10 text-joya-black shadow-card grid place-items-center transition active:scale-[0.98]"
                    aria-label="编辑资料"
                  >
                    <Pencil className="h-4 w-4 text-joya-black/80" />
                  </button>
                </div>

                <div className="mt-4 text-2xl font-semibold flex items-center gap-1">{user.name} <span className="text-lg text-blue-500 transform rotate-12">♂</span></div>

                <div className="mt-1.5 inline-flex items-center gap-2 text-joya-black/60">
                  <span className="text-sm">ID: {user.id}</span>
                  <button
                    type="button"
                    onClick={onCopyId}
                    className="inline-flex items-center justify-center p-1 text-joya-black/55 transition active:scale-[0.96]"
                    aria-label="复制用户 ID"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-2 max-w-[320px] text-joya-black/70">“{user.bio}”</div>

                <div
                  className="mt-3 inline-flex items-center gap-2 text-sm text-joya-black/80"
                  aria-label={`From United States, native language ${user.native}, language of interest ${user.learning}`}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    🇺🇸
                  </span>
                  <span>,</span>
                  <span>Eng</span>
                  <ArrowLeftRight className="h-3.5 w-3.5 text-joya-yellow" strokeWidth={2} aria-hidden />
                  <span>Jpn</span>
                  <span className="sr-only">From United States. Native: {user.native}. Learning: {user.learning}.</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => router.push("/me/wallet")}
                  className="w-full rounded-3xl bg-joya-yellow/20 border border-joya-yellow/40 shadow-card p-3 flex items-center justify-between active:scale-[0.99] transition"
                  aria-label="进入钻石充值页面"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-2xl bg-joya-yellow text-joya-black grid place-items-center shadow-glow">
                      <Gem className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-joya-black/70">Diamond</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-joya-black">{user.diamonds}</span>
                    <ChevronRight className="h-4 w-4 text-joya-black/60" />
                  </div>
                </button>
              </div>

              <div className="mt-6">
                <div className="text-lg font-semibold text-joya-black mb-4">动态</div>
                <div className="grid grid-cols-2 gap-3">
                  {posts.map((post, index) => {
                    const randomColor = colors[index % colors.length];
                    
                    return (
                      <div 
                        key={post.id} 
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden"
                      >
                        {post.type === "image" && post.image ? (
                          <img
                            src={post.image}
                            alt="动态图片"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className={`h-full w-full ${randomColor}`}></div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                          <p className="text-lg text-white font-semibold">{post.date}</p>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 pr-16">
                          <p className="text-sm text-white line-clamp-2">{post.content}</p>
                        </div>
                        
                        <div className="absolute bottom-4 right-4 flex items-center gap-1">
                          <Heart className="h-4 w-4 text-white fill-white" />
                          <span className="text-sm text-white font-medium">{post.likes}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="设置">
                <div className="space-y-3">
                  <button
                    type="button"
                    className="joya-card w-full p-4 flex items-center justify-between bg-white hover:bg-joya-yellow/20 transition"
                    onClick={() => setEditOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <Pencil className="h-5 w-5 text-joya-black/70" />
                      <span className="text-joya-black/80">编辑资料</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-joya-black/40" />
                  </button>
                  <div className="joya-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-joya-black/80">
                      <Sparkles className="h-4 w-4" />
                      语言选择
                    </div>
                    <select className="bg-white/70 border border-joya-black/10 rounded-lg px-3 py-2 text-sm">
                      <option>中文</option>
                      <option>English</option>
                      <option>日本語</option>
                    </select>
                  </div>
                  <button type="button" className="joya-card w-full p-4 text-left text-joya-black/80">
                    黑名单
                  </button>
                  <button type="button" className="joya-card w-full p-4 text-left text-joya-black/80">
                    关于我们
                  </button>
                  <button type="button" className="joya-card w-full p-4 text-left text-joya-black/80">
                    检查更新
                  </button>
                  <button type="button" className="joya-card w-full p-4 text-left text-red-400">
                    注销账号
                  </button>
                  <button type="button" className="joya-card w-full p-4 text-left text-joya-black/60">
                    登出
                  </button>
                </div>
              </BottomSheet>

              <BottomSheet open={editOpen} onClose={() => setEditOpen(false)} title="编辑资料">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditOpen(false);
                    showToast("已保存（原型占位）");
                  }}
                >
                  <div className="joya-card p-4">
                    <div className="grid grid-cols-3 gap-3 items-center">
                      <label className="text-joya-black/60 text-sm">昵称</label>
                      <input
                        className="col-span-2 bg-joya-black/3 border border-joya-black/10 rounded-lg px-3 py-2 outline-none"
                        defaultValue={user.name}
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
                      defaultValue={user.bio}
                    />
                  </div>

                  <button type="submit" className="joya-btn-yellow w-full py-3 font-semibold">
                    保存
                  </button>
                </form>
              </BottomSheet>

              <Toast open={toast.open} message={toast.message} />
            </div>
          </div>
        </div>
      </div>
      <div id="overlay-root" className="absolute inset-0 z-40" />
    </div>
  );
}
