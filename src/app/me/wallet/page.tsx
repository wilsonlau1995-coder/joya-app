"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Gem, ReceiptText } from "lucide-react";

import Toast from "@/components/Toast";

type ToastState = { open: boolean; message: string };

export default function WalletPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const [diamonds, setDiamonds] = useState(680);
  const [points, setPoints] = useState(1280);

  const packs = useMemo(
    () => [
      { id: "p1", diamonds: 120, bonusPoints: 10, price: "$12" },
      { id: "p2", diamonds: 680, bonusPoints: 80, price: "$68" },
      { id: "p3", diamonds: 1280, bonusPoints: 180, price: "$128" },
    ],
    [],
  );

  function showToast(message: string) {
    setToast({ open: true, message });
    window.setTimeout(() => setToast({ open: false, message: "" }), 1600);
  }

  function buyPack(packId: string) {
    const pack = packs.find((p) => p.id === packId);
    if (!pack) return;
    setDiamonds((v) => v + pack.diamonds);
    setPoints((v) => v + pack.bonusPoints);
    showToast(`Purchase simulated: ${pack.price}`);
  }

  return (
    <div className="relative px-5 pt-[calc(18px+env(safe-area-inset-top))] pb-[calc(18px+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me")}
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-joya-black/70" />
        </button>
        <div className="text-base font-semibold">Recharge Diamonds</div>
        <button
          type="button"
          className="joya-card h-11 w-11 grid place-items-center"
          onClick={() => router.push("/me/wallet/details")}
          aria-label="View details"
        >
          <ReceiptText className="h-5 w-5 text-joya-black/70" />
        </button>
      </div>

      <div className="mt-6 joya-card p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-2xl bg-joya-yellow text-joya-black grid place-items-center shadow-glow mb-3">
            <Gem className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-joya-black">{diamonds.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {packs.map((pack) => (
          <div key={pack.id} className="joya-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-lg">
              {pack.diamonds}
              <Gem className="h-4 w-4" />
            </div>
            <button
              type="button"
              className="joya-btn-yellow px-5 py-2 font-semibold"
              onClick={() => buyPack(pack.id)}
            >
              {pack.price}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-joya-black/45">
        If you have questions about recharge service, please contact customer support
      </div>

      <Toast open={toast.open} message={toast.message} />
    </div>
  );
}
