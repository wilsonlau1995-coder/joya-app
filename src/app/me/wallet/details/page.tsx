"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Gem } from "lucide-react";

type TransactionType = "recharge" | "consumption";

type RechargeTransaction = {
  id: string;
  diamonds: number;
  time: string;
  status: "success" | "failed";
};

type ConsumptionTransaction = {
  id: string;
  item: string;
  diamonds: number;
  time: string;
};

export default function WalletDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TransactionType>("recharge");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const monthScrollRef = useRef<HTMLDivElement>(null);
  const yearScrollRef = useRef<HTMLDivElement>(null);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 5 }, (_, i) => 2026 - i);
  
  const rechargeTransactions: RechargeTransaction[] = [
    { id: "r1", diamonds: 120, time: "2026-03-28 14:32:45", status: "success" },
    { id: "r2", diamonds: 680, time: "2026-03-25 10:15:30", status: "success" },
    { id: "r3", diamonds: 1280, time: "2026-03-20 16:48:22", status: "failed" },
    { id: "r4", diamonds: 120, time: "2026-03-15 09:22:18", status: "success" },
  ];
  
  const consumptionTransactions: ConsumptionTransaction[] = [
    { id: "c1", item: "Translation Points x 100", diamonds: -50, time: "2026-03-28 15:20:33" },
    { id: "c2", item: "Translation Points x 200", diamonds: -100, time: "2026-03-27 12:45:10" },
    { id: "c3", item: "Translation Points x 50", diamonds: -25, time: "2026-03-26 18:10:05" },
    { id: "c4", item: "Translation Points x 150", diamonds: -75, time: "2026-03-25 11:30:28" },
  ];
  
  useEffect(() => {
    setTimeout(() => {
      scrollToSelectedMonth();
      scrollToSelectedYear();
    }, 100);
  }, []);
  
  function scrollToSelectedMonth() {
    if (monthScrollRef.current) {
      const monthIndex = selectedMonth;
      const monthElement = monthScrollRef.current.children[monthIndex] as HTMLElement;
      if (monthElement) {
        monthElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }
  
  function scrollToSelectedYear() {
    if (yearScrollRef.current) {
      const yearIndex = years.indexOf(selectedYear);
      const yearElement = yearScrollRef.current.children[yearIndex] as HTMLElement;
      if (yearElement) {
        yearElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me/wallet")}
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">Transaction History</div>
        <div className="h-11 w-11"></div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          className={`flex-1 py-3 rounded-2xl font-medium transition ${
            activeTab === "recharge"
              ? "bg-joya-yellow text-joya-black"
              : "bg-joya-black/5 text-joya-black/70"
          }`}
          onClick={() => setActiveTab("recharge")}
        >
          Recharge
        </button>
        <button
          type="button"
          className={`flex-1 py-3 rounded-2xl font-medium transition ${
            activeTab === "consumption"
              ? "bg-joya-yellow text-joya-black"
              : "bg-joya-black/5 text-joya-black/70"
          }`}
          onClick={() => setActiveTab("consumption")}
        >
          Consumption
        </button>
      </div>

      {activeTab === "recharge" && (
        <div className="mt-6">
          {rechargeTransactions.map((transaction, index) => (
            <div key={transaction.id} className={`py-4 ${index !== rechargeTransactions.length - 1 ? "border-b border-joya-black/10" : ""}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-joya-black/80 font-medium">{transaction.diamonds}</span>
                    <Gem className="h-3 w-3 text-joya-black/80" />
                  </div>
                  <div className="mt-1 text-xs text-joya-black/50">{transaction.time}</div>
                </div>
                <div className={`text-sm font-semibold ${
                  transaction.status === "success" ? "text-joya-black/80" : "text-red-500"
                }`}>
                  {transaction.status === "success" ? "Success" : "Failed"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "consumption" && (
        <div className="mt-6">
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-joya-black/80 font-medium mb-4"
            onClick={() => setShowMonthPicker(true)}
          >
            <span>{selectedYear} {monthNames[selectedMonth]}</span>
            <ChevronRight className="h-3 w-3 text-joya-black/50" />
          </button>

          {consumptionTransactions.map((transaction, index) => (
            <div key={transaction.id} className={`py-4 ${index !== consumptionTransactions.length - 1 ? "border-b border-joya-black/10" : ""}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-joya-black/80 font-medium">{transaction.item}</div>
                  <div className="mt-1 text-xs text-joya-black/50">{transaction.time}</div>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-joya-black">
                  {transaction.diamonds}
                  <Gem className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showMonthPicker && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMonthPicker(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                className="text-joya-black/70 text-sm font-medium"
                onClick={() => setShowMonthPicker(false)}
              >
                Cancel
              </button>
              <div className="text-base font-semibold">Select Month</div>
              <button
                type="button"
                className="text-joya-yellow text-sm font-semibold"
                onClick={() => setShowMonthPicker(false)}
              >
                Confirm
              </button>
            </div>
            
            <div className="flex justify-between relative h-48">
              <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
                <div className="w-full h-12 bg-joya-yellow/20 rounded-xl"></div>
              </div>
              
              <div 
                ref={yearScrollRef} 
                className="flex-1 overflow-y-auto h-full px-1 relative z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={`w-full py-3 text-center ${
                      selectedYear === year ? "text-gray-800 font-bold text-lg" : "text-gray-400 text-base"
                    }`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
              
              <div 
                ref={monthScrollRef} 
                className="flex-1 overflow-y-auto h-full px-1 relative z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {monthNames.map((month, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-full py-3 text-center ${
                      selectedMonth === index ? "text-gray-800 font-bold text-lg" : "text-gray-400 text-base"
                    }`}
                    onClick={() => setSelectedMonth(index)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
