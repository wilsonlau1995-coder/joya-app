import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joya - ME Demo",
  description: "Joya「我的（ME）」交互原型演示：底部三栏导航与可下滑关闭的弹层。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-joya-bg0 text-joya-black">
        <div className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
