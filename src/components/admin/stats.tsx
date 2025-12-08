"use client";

import React from "react";
import UnifiedChart from "./UnifiedChart";

type StatItem = {
  title: string;
  value: string;
  percent?: number | null;
  change?: number | null;
  trend: number[];
  positiveIf?: boolean; // optional override for color
};

export default function Stats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, idx) => {
        const isPositive =
          typeof s.percent === "number" ? s.percent >= 0 : (s.change ?? 0) >= 0;
        const color = isPositive ? "text-green-400" : "text-red-400";
        return (
          <div
            key={idx}
            className="[background-image:var(--admin-bgimg)] bg-[var(--admin-card-bg)] rounded-2xl p-4 shadow-sm"
          >
              <div className="text-white text-lg font-semibold">{s.value}</div>
              <div className="text-sm text-gray-300">{s.title}</div>
            <div className="mt-10 h-20">
              <UnifiedChart
                type="area"
                series={[{ name: s.title, data: s.trend }]}
                height={48}
                primaryColor={isPositive ? "#6dff8b" : "#ff6b6b"}
              />
            </div>
            <p className="text-sm text-center text-gray-300">
              <span className={`text-sm font-medium ${color}`}>
                {s.percent != null
                  ? `${s.percent}%`
                  : s.change != null
                  ? `${s.change}`
                  : ""}
              </span>
              {" "}From last Month
            </p>
          </div>
        );
      })}
    </div>
  );
}
