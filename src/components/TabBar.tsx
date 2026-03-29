"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, User } from "lucide-react";
import clsx from "clsx";

const tabs = [
  { href: "/hub", label: "Hub", Icon: Home },
  { href: "/messages", label: "Messages", Icon: MessageCircle },
  { href: "/me", label: "ME", Icon: User },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-32px)] z-30"
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <div className="joya-card px-4 py-3">
        <div className="flex items-center justify-between">
          {tabs.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center gap-1"
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={clsx(
                    "h-5 w-5 transition",
                    active ? "text-joya-yellow" : "text-joya-black/55",
                  )}
                />
                <span
                  className={clsx(
                    "text-[11px] font-medium transition",
                    active ? "text-joya-yellow" : "text-joya-black/50",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
