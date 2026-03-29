import TabBar from "@/components/TabBar";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="joya-shell starfield bg-joya-bg0">
      <div className="absolute inset-0">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto pb-28">{children}</div>
        </div>
      </div>
      <div id="overlay-root" className="absolute inset-0 z-40" />
      <TabBar />
    </div>
  );
}
