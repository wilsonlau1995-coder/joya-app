"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, X, Calendar, Globe, ChevronRight, AlertTriangle, Check, Edit } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };
type Photo = { id: string; url: string; pending?: boolean };
type Language = { code: string; name: string; flag: string };

function EditProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  
  const [photos, setPhotos] = useState<Photo[]>([
    { id: "1", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
    { id: "2", url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop", pending: true },
  ]);
  
  const [nickname, setNickname] = useState("Wilson");
  const [gender, setGender] = useState("male");
  const [birthday, setBirthday] = useState("1998-10-01");
  const [region, setRegion] = useState("Shanghai");
  const [bio, setBio] = useState("nice to meet you guys");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<"nickname" | "birthday" | "bio" | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({ code: "US", name: "美国", flag: "🇺🇸" });
  
  const [nativeLanguages, setNativeLanguages] = useState<Language[]>([
    { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  ]);
  const [interestLanguages, setInterestLanguages] = useState<Language[]>([
    { code: "en", name: "English", flag: "🇬🇧" },
  ]);

  useEffect(() => {
    const type = searchParams.get("type") as "native" | "interest";
    const selected = searchParams.get("selected");
    const region = searchParams.get("region");
    const regionName = searchParams.get("regionName");
    const regionFlag = searchParams.get("regionFlag");
    
    if (type && selected) {
      try {
        const selectedLanguages = JSON.parse(decodeURIComponent(selected));
        if (type === "native") {
          setNativeLanguages(selectedLanguages);
        } else if (type === "interest") {
          setInterestLanguages(selectedLanguages);
        }
        router.push("/me/edit-profile", { scroll: false });
      } catch (error) {
        console.error("解析语言选择结果失败:", error);
      }
    } else if (region && regionName && regionFlag) {
      setSelectedRegion({ code: region, name: regionName, flag: regionFlag });
      setRegion(regionName);
      showToast("已保存");
      router.push("/me/edit-profile", { scroll: false });
    }
  }, [searchParams, router]);

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function handleAddPhoto() {
    showToast("调起系统相册");
  }

  function handleDeletePhoto(id: string) {
    setPhotoToDelete(id);
    setShowDeleteConfirm(true);
  }

  function confirmDeletePhoto() {
    if (photoToDelete) {
      setPhotos(photos.filter(p => p.id !== photoToDelete));
      showToast("已删除照片");
      setShowDeleteConfirm(false);
      setPhotoToDelete(null);
    }
  }

  function handleLanguageClick(type: "native" | "interest") {
    const selectedLanguages = type === "native" ? nativeLanguages : interestLanguages;
    const url = `/me/edit-profile/language?type=${type}&selected=${encodeURIComponent(JSON.stringify(selectedLanguages))}`;
    router.push(url);
  }

  const [editValue, setEditValue] = useState("");
  
  const [selectedYear, setSelectedYear] = useState(1998);
  const [selectedMonth, setSelectedMonth] = useState(9);
  const [selectedDay, setSelectedDay] = useState(1);
  
  const yearScrollRef = useRef<HTMLDivElement>(null);
  const monthScrollRef = useRef<HTMLDivElement>(null);
  const dayScrollRef = useRef<HTMLDivElement>(null);
  
  const years = Array.from({ length: 50 }, (_, i) => 2026 - i);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function handleEdit(field: "nickname" | "birthday" | "bio") {
    if (field === "nickname") {
      setEditValue(nickname);
      setEditingField(field);
      setShowEditModal(true);
    } else if (field === "birthday") {
      const dateParts = birthday.split("-");
      if (dateParts.length === 3) {
        setSelectedYear(parseInt(dateParts[0]));
        setSelectedMonth(parseInt(dateParts[1]) - 1);
        setSelectedDay(parseInt(dateParts[2]));
      }
      setShowBirthdayPicker(true);
      
      setTimeout(() => {
        scrollToSelected();
      }, 100);
    } else if (field === "bio") {
      setEditValue(bio);
      setEditingField(field);
      setShowEditModal(true);
    }
  }
  
  function scrollToSelected() {
    if (monthScrollRef.current) {
      const monthIndex = months.indexOf(selectedMonth);
      const monthElement = monthScrollRef.current.children[monthIndex] as HTMLElement;
      if (monthElement) {
        monthElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
    
    if (dayScrollRef.current) {
      const dayIndex = days.indexOf(selectedDay);
      const dayElement = dayScrollRef.current.children[dayIndex] as HTMLElement;
      if (dayElement) {
        dayElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
    
    if (yearScrollRef.current) {
      const yearIndex = years.indexOf(selectedYear);
      const yearElement = yearScrollRef.current.children[yearIndex] as HTMLElement;
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }

  function handleSave() {
    if (editingField) {
      if (editingField === "nickname") {
        setNickname(editValue);
      } else if (editingField === "birthday") {
        setBirthday(editValue);
      } else if (editingField === "bio") {
        setBio(editValue);
      }
      showToast("已保存");
      setShowEditModal(false);
      setEditingField(null);
    }
  }

  function handlePreview() {
    router.push("/me/profile-preview");
  }

  function handleBirthdayConfirm() {
    const formattedMonth = (selectedMonth + 1).toString().padStart(2, "0");
    const formattedDay = selectedDay.toString().padStart(2, "0");
    const newBirthday = `${selectedYear}-${formattedMonth}-${formattedDay}`;
    setBirthday(newBirthday);
    showToast("已保存");
    setShowBirthdayPicker(false);
  }

  function handleRegionClick() {
    router.push(`/me/edit-profile/region?selected=${selectedRegion.code}`);
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))] min-h-screen bg-joya-bg0">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.back()}
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold text-joya-black">编辑资料</div>
        <button
          type="button"
          className="h-11 px-4 rounded-2xl bg-joya-yellow text-joya-black font-medium hover:bg-joya-yellow/80 transition"
          onClick={handlePreview}
        >
          预览
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-joya-black">我的照片 <span className="text-sm text-joya-black/50 font-normal">{photos.length}/6</span></h3>
          
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square relative"
              >
                {photo.url ? (
                  <>
                    <img
                      src={photo.url}
                      alt="照片"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                    {photo.pending && (
                      <div className="absolute inset-0 rounded-2xl bg-black/50 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mb-2"></div>
                        <span className="text-white text-sm font-medium">审核中</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full w-full rounded-2xl bg-joya-yellow/20 flex items-center justify-center">
                    <span className="text-joya-black/40 text-sm">照片</span>
                  </div>
                )}
                {!photo.pending && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white/90 flex items-center justify-center transition"
                    onClick={() => handleDeletePhoto(photo.id)}
                    aria-label="删除照片"
                  >
                    <X className="h-3 w-3 text-joya-black/60" />
                  </button>
                )}
              </div>
            ))}

            {[...Array(6 - photos.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="aspect-square rounded-2xl bg-joya-black/5 border-2 border-dashed border-joya-black/20 flex items-center justify-center"
              >
                <button
                  type="button"
                  className="h-full w-full flex items-center justify-center"
                  onClick={handleAddPhoto}
                  aria-label="添加照片"
                >
                  <Plus className="h-8 w-8 text-joya-black/30" />
                </button>
              </div>
            ))}
          </div>
        </div>


        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-joya-black">基本资料</h3>
          
          <div className="joya-card bg-white overflow-hidden">
            <button
              type="button"
              className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
              onClick={() => handleEdit("nickname")}
            >
              <span className="text-joya-black/80 font-medium">昵称</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-joya-black/50">{nickname}</span>
                <ChevronRight className="h-4 w-4 text-joya-black/40" />
              </div>
            </button>

            <div className="w-full p-4 flex items-center justify-between border-b border-joya-black/5">
              <span className="text-joya-black/80 font-medium">性别</span>
              <span className="text-sm text-joya-black/50">男</span>
            </div>

            <button
              type="button"
              className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
              onClick={() => handleEdit("birthday")}
            >
              <span className="text-joya-black/80 font-medium">生日</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-joya-black/50">{birthday}</span>
                <ChevronRight className="h-4 w-4 text-joya-black/40" />
              </div>
            </button>

            <button
              type="button"
              className="w-full p-4 flex items-center justify-between border-b border-joya-black/5 hover:bg-joya-yellow/20 transition"
              onClick={handleRegionClick}
            >
              <span className="text-joya-black/80 font-medium">地区</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedRegion.flag}</span>
                <span className="text-sm text-joya-black/50">{selectedRegion.name}</span>
                <ChevronRight className="h-4 w-4 text-joya-black/40" />
              </div>
            </button>

            <button
              type="button"
              className="w-full p-4 flex items-center justify-between hover:bg-joya-yellow/20 transition"
              onClick={() => handleEdit("bio")}
            >
              <span className="text-joya-black/80 font-medium">个性签名</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-joya-black/50 truncate max-w-[150px]">{bio}</span>
                <ChevronRight className="h-4 w-4 text-joya-black/40" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {showEditModal && editingField && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="joya-card w-full max-w-sm bg-white p-6 space-y-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-joya-black">
                {editingField === "nickname" && "编辑昵称"}
                {editingField === "birthday" && "选择生日"}
                {editingField === "bio" && "编辑个性签名"}
              </h3>
              <button
                type="button"
                className="h-8 w-8 rounded-full bg-joya-black/5 flex items-center justify-center hover:bg-joya-black/10 transition"
                onClick={() => setShowEditModal(false)}
              >
                <X className="h-4 w-4 text-joya-black/60" />
              </button>
            </div>

            {editingField === "nickname" && (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full bg-joya-black/5 border border-joya-black/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-joya-yellow"
                  placeholder="请输入昵称"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            )}

            {editingField === "birthday" && (
              <div className="space-y-4">
                <input
                  type="date"
                  className="w-full bg-joya-black/5 border border-joya-black/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-joya-yellow"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            )}

            {editingField === "bio" && (
              <div className="space-y-4">
                <textarea
                  rows={4}
                  className="w-full bg-joya-black/5 border border-joya-black/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-joya-yellow resize-none"
                  placeholder="请输入个性签名"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl border border-joya-black/10 text-joya-black/80 font-medium hover:bg-joya-black/5 transition"
                onClick={() => setShowEditModal(false)}
              >
                取消
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl bg-joya-yellow text-joya-black font-medium hover:bg-joya-yellow/80 transition"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="joya-card w-full max-w-sm bg-white p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-joya-black">确认删除</h3>
              </div>
              <button
                type="button"
                className="h-8 w-8 rounded-full bg-joya-black/5 flex items-center justify-center hover:bg-joya-black/10 transition"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <X className="h-4 w-4 text-joya-black/60" />
              </button>
            </div>

            <p className="text-sm text-joya-black/70 leading-relaxed">
              确定要删除这张照片吗？此操作不可撤销。
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl border border-joya-black/10 text-joya-black/80 font-medium hover:bg-joya-black/5 transition"
                onClick={() => setShowDeleteConfirm(false)}
              >
                取消
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                onClick={confirmDeletePhoto}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}



      {showBirthdayPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full rounded-t-3xl p-4 pb-[calc(18px+env(safe-area-inset-bottom))] max-h-[70vh]">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                className="h-10 w-10 flex items-center justify-center"
                onClick={() => setShowBirthdayPicker(false)}
              >
                <X className="h-8 w-8 text-gray-500" />
              </button>
              <div></div>
              <button
                type="button"
                className="h-10 w-10 flex items-center justify-center"
                onClick={handleBirthdayConfirm}
              >
                <Check className="h-8 w-8 text-teal-500" />
              </button>
            </div>
            
            <div className="flex justify-between mb-4 relative">
              <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
                <div className="w-full h-14 bg-gray-100 rounded-2xl"></div>
              </div>
              
              <div ref={monthScrollRef} className="flex-1 overflow-y-auto max-h-40 px-1 relative z-10">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    className={`w-full py-4 text-center ${selectedMonth === month ? 'text-gray-800 font-bold text-3xl' : 'text-gray-400 text-2xl'}`}
                    onClick={() => setSelectedMonth(month)}
                  >
                    {monthNames[month]}
                  </button>
                ))}
              </div>
              
              <div ref={dayScrollRef} className="flex-1 overflow-y-auto max-h-40 px-1 relative z-10">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`w-full py-4 text-center ${selectedDay === day ? 'text-gray-800 font-bold text-3xl' : 'text-gray-400 text-2xl'}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              
              <div ref={yearScrollRef} className="flex-1 overflow-y-auto max-h-40 px-1 relative z-10">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`w-full py-4 text-center ${selectedYear === year ? 'text-gray-800 font-bold text-3xl' : 'text-gray-400 text-2xl'}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}



      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-joya-bg0 flex items-center justify-center">
      <div className="text-joya-black/50">加载中...</div>
    </div>}>
      <EditProfileContent />
    </Suspense>
  );
}
