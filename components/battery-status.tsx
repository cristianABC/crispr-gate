"use client"

import { useEffect, useState } from "react";

type BatteryInfo = {
  level: number | null;
  isCharging: boolean | null;
  supported: boolean;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManagerLike>;
};

type BatteryManagerLike = {
  level: number;
  charging: boolean;
};

export function BatteryStatus() {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfo>({
    level: null,
    isCharging: null,
    supported: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function setupBattery() {
      if (typeof navigator === "undefined") {
        if (!isMounted) return;
        setBatteryInfo((prev) => ({
          ...prev,
          supported: false,
        }));
        return;
      }

      const navWithBattery = navigator as NavigatorWithBattery;

      if (!navWithBattery.getBattery) {
        if (!isMounted) return;
        setBatteryInfo((prev) => ({
          ...prev,
          supported: false,
        }));
        return;
      }

      try {
        const battery = (await navWithBattery.getBattery()) as BatteryManagerLike;
        if (!isMounted) return;
        setBatteryInfo({
          level: battery.level * 100,
          isCharging: battery.charging,
          supported: true,
        });
      } catch {
        if (!isMounted) return;
        setBatteryInfo((prev) => ({
          ...prev,
          supported: false,
        }));
      }
    }

    setupBattery();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!batteryInfo.supported) {
    return (
      <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        Batería: N/D
      </div>
    );
  }

  const level = batteryInfo.level;

  if (level === null) {
    return (
      <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        Batería: ...
      </div>
    );
  }

  const isLow = level < 30;
  const isCritical = level < 15;

  const bgClass = isLow ? "bg-yellow-300" : "bg-green-400";
  const textClass = isCritical ? "text-red-600" : "text-slate-900";

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${bgClass}`}
    >
      <span>{batteryInfo.isCharging ? "Cargando" : "Batería"}</span>
      <span className={textClass}>{Math.round(level)}%</span>
    </div>
  );
}