"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, Heart, MessageCircle, MoreHorizontal } from "lucide-react";

import BottomSheet from "@/components/BottomSheet";
import Toast from "@/components/Toast";

type Photo = { id: string; url: string };
type Language = { code: string; name: string; flag: string };

type ToastState = { open: boolean; message: string };

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(() => {
    const userId = params.id || "123";
    const blockedUsers = localStorage.getItem('blockedUsers');
    if (blockedUsers) {
      try {
        const blockedList = JSON.parse(blockedUsers);
        return blockedList.includes(userId);
      } catch (e) {
        return false;
      }
    }
    return false;
  });
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });

  const photos: Photo[] = [
    { id: "1", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop" },
    { id: "2", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop" },
  ];

  const nativeLanguages: Language[] = [
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ];
  const interestLanguages: Language[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const nickname = "Aiko";
  const gender = "female";
  const birthday = "1999-05-15";
  const region = "Tokyo";
  const bio = "Love learning languages and traveling!";

  const posts = useMemo(
    () => [
      {
        id: "3",
        date: "Mar 12",
        content: "Trying new matcha desserts today! 🍵",
        type: "text",
        likes: 89,
      },
      {
        id: "2",
        date: "Mar 10",
        content: "Beautiful cherry blossoms in Ueno Park! 🌸",
        type: "image",
        image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=300&fit=crop",
        likes: 234,
      },
      {
        id: "1",
        date: "Mar 8",
        content: "Practiced English conversation for 2 hours today!",
        type: "text",
        likes: 56,
      },
    ],
    [],
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      const photoWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: currentPhotoIndex * photoWidth,
        behavior: "smooth",
      });
    }
  }, [currentPhotoIndex]);

  function handleScroll() {
    if (scrollContainerRef.current) {
      const photoWidth = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollContainerRef.current.scrollLeft / photoWidth);
      if (newIndex !== currentPhotoIndex && newIndex >= 0 && newIndex < photos.length) {
        setCurrentPhotoIndex(newIndex);
      }
    }
  }

  function handleMessageClick() {
    const userId = params.id || "123";
    router.push(`/messages/${userId}`);
  }

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleReport() {
    setMainMenuOpen(false);
    setReportMenuOpen(true);
  }

  function handleReportReason(reason: string) {
    setReportMenuOpen(false);
    showToast("举报成功");
  }

  function handleBlock() {
    const userId = params.id || "123";
    setMainMenuOpen(false);
    setIsBlocked(true);
    
    // 持久化到本地存储
    const blockedUsers = localStorage.getItem('blockedUsers');
    let blockedList = [];
    if (blockedUsers) {
      try {
        blockedList = JSON.parse(blockedUsers);
      } catch (e) {
        blockedList = [];
      }
    }
    if (!blockedList.includes(userId)) {
      blockedList.push(userId);
      localStorage.setItem('blockedUsers', JSON.stringify(blockedList));
    }
    
    showToast("拉黑成功");
  }

  function handleUnblock() {
    const userId = params.id || "123";
    setMainMenuOpen(false);
    setIsBlocked(false);
    
    // 从本地存储中移除
    const blockedUsers = localStorage.getItem('blockedUsers');
    if (blockedUsers) {
      try {
        let blockedList = JSON.parse(blockedUsers);
        blockedList = blockedList.filter((id: string) => id !== userId);
        localStorage.setItem('blockedUsers', JSON.stringify(blockedList));
      } catch (e) {
        // 忽略错误
      }
    }
    
    showToast("移除黑名单成功");
  }

  return (
    <div className="joya-shell starfield bg-joya-bg0">
      <div className="absolute inset-0">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto pb-28">
            <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="joya-card h-11 w-11 grid place-items-center"
                  onClick={() => {
                    if (window.history.length > 1) {
                      router.back();
                    } else {
                      router.push("/me");
                    }
                  }}
                  aria-label="返回"
                >
                  <ArrowLeft className="h-5 w-5 text-joya-black/70" />
                </button>
                <div className="text-base font-semibold text-joya-black">个人资料</div>
                <button
                  type="button"
                  className="h-11 w-11 grid place-items-center"
                  onClick={() => setMainMenuOpen(true)}
                  aria-label="更多"
                >
                  <MoreHorizontal className="h-5 w-5 text-joya-black/70" />
                </button>
              </div>

              <div className="mt-6">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-joya-black/5">
                  <div
                    ref={scrollContainerRef}
                    className="flex h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    onScroll={handleScroll}
                  >
                    {photos.map((photo, index) => (
                      <div key={photo.id} className="flex-shrink-0 w-full aspect-[3/4] snap-center">
                        <img
                          src={photo.url}
                          alt={`照片 ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                    <div className="text-white">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-semibold">{nickname}</span>
                        <span className="text-xl text-pink-400">♀</span>
                      </div>
                      
                      <div className="mt-1 text-sm text-white/70">ID: 42568973</div>
                      
                      <div className="mt-2 text-sm text-white/90">{bio}</div>
                      
                      <div className="mt-2 flex items-center gap-1 text-sm text-white/80">
                        <span className="text-lg">🇯🇵</span>
                        <span>,</span>
                        <span>{nativeLanguages.map(l => l.name).join(', ')}</span>
                        <ArrowLeftRight className="h-3 w-3" />
                        <span>{interestLanguages.map(l => l.name).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {photos.length > 1 && (
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {photos.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all ${
                            index === currentPhotoIndex ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-lg font-semibold text-joya-black mb-4">动态</div>
                <div className="grid grid-cols-2 gap-3">
                  {posts.map((post, index) => {
                    const colors = ["bg-joya-yellow/30", "bg-joya-pink/30", "bg-joya-blue/30", "bg-joya-purple/30"];
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
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-joya-bg0 via-joya-bg0/95 to-transparent z-10">
        <button
          type="button"
          onClick={handleMessageClick}
          className="w-full py-3 rounded-2xl bg-joya-yellow text-joya-black font-medium flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Message
        </button>
      </div>

      <BottomSheet open={mainMenuOpen} onClose={() => setMainMenuOpen(false)}>
        <div className="space-y-3">
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-yellow font-semibold"
            onClick={handleReport}
          >
            举报
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-yellow font-semibold"
            onClick={isBlocked ? handleUnblock : handleBlock}
          >
            {isBlocked ? "移除黑名单" : "拉黑"}
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-black/5 transition text-joya-black/60"
            onClick={() => setMainMenuOpen(false)}
          >
            取消
          </button>
        </div>
      </BottomSheet>

      <BottomSheet open={reportMenuOpen} onClose={() => setReportMenuOpen(false)}>
        <div className="space-y-3">
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-black"
            onClick={() => handleReportReason("信息违规")}
          >
            信息违规
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-black"
            onClick={() => handleReportReason("色情内容")}
          >
            色情内容
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-black"
            onClick={() => handleReportReason("骚扰谩骂")}
          >
            骚扰谩骂
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-yellow/20 transition text-joya-black"
            onClick={() => handleReportReason("垃圾广告")}
          >
            垃圾广告
          </button>
          <button
            type="button"
            className="joya-card w-full p-4 flex items-center justify-center bg-white hover:bg-joya-black/5 transition text-joya-black/60"
            onClick={() => setReportMenuOpen(false)}
          >
            取消
          </button>
        </div>
      </BottomSheet>

      <Toast open={toast.open} message={toast.message} />
      <div id="overlay-root" className="absolute inset-0 z-40" />
    </div>
  );
}
