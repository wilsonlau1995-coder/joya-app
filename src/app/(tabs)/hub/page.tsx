export default function HubPage() {
  return (
    <div className="px-5 pt-[calc(32px+env(safe-area-inset-top))]">
      <div className="text-2xl font-semibold">Hub</div>
      <div className="mt-2 text-joya-black/60">星河首页占位，用于验证 Tab 切换与滚动。</div>

      <div className="mt-6 space-y-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="joya-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Scene Card #{idx + 1}</div>
                <div className="text-sm text-joya-black/55 mt-1">
                  极简内容占位（实景语境 + 语言互动）
                </div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-joya-black/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
