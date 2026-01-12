"use client";

import React, { useState } from "react";
import UnifiedChart from "./UnifiedChart";
import Dropdown from "@/ui/Dropdown";

export default function SalesAndViewsCard({
  monthly,
  yearly,
}: {
  monthly: { sales: number; changePercent: number; amountUsd: number };
  yearly: { sales: number; changePercent: number; amountUsd: number };
}) {
  const [mode, setMode] = useState<"month" | "year">("month");

  const monthlyPercent = Math.round(
    (monthly.sales / Math.max(yearly.sales, 1)) * 100
  );
  const yearlyPercent = 100;

  const selected = mode === "month" ? monthly : yearly;
  const leftSeries = mode === "month" ? [monthlyPercent] : [yearlyPercent];

  return (
    <div className="[background-image:var(--admin-bgimg)] bg-(--admin-card-bg) rounded-2xl p-5 md:p-6 shadow-xl h-fit overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-lg font-semibold">Sales & Views</div>
          <div className="text-sm text-gray-400">Overview</div>
        </div>
        <div className="flex gap-2">
          <Dropdown
            placeholder="Month"
            options={["January", "February", "March"]}
          />
          <Dropdown placeholder="Year" options={["2000", "2001", "2002"]} />
        </div>
      </div>

      {/* Content box */}
      <div className="mt-5 rounded-xl border border-(--border-color) p-4">
        <div className="grid grid-cols-2 divide-x divide-(--border-color)">
          {/* LEFT block */}
          <div className="flex items-center gap-3 min-w-0 overflow-hidden px-3">
            <div className="w-20 md:w-28 shrink-0">
              <UnifiedChart
                type="radial"
                series={leftSeries}
                height={100}
                primaryColor={"#47A3FF"}
                secondaryColor="oklch(37.2% 0.044 257.287)"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm text-gray-300">
                {mode === "month" ? "Monthly" : "Yearly"}
              </div>

              <div className="text-2xl font-semibold text-white truncate">
                {monthly.sales.toLocaleString()}
              </div>

              <div className="text-sm mt-1 flex flex-wrap gap-x-2">
                <span className="text-green-400 font-semibold whitespace-nowrap">
                  {selected.changePercent}%
                </span>
                <span className="text-gray-400 truncate">
                  {selected.amountUsd.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT block */}
          <div className="flex items-center gap-3 min-w-0 overflow-hidden px-3">
            <div className="w-20 md:w-28 shrink-0">
              <UnifiedChart
                type="radial"
                series={[yearlyPercent]}
                height={100}
                primaryColor="#FFD54F"
                secondaryColor="#0b1220"
              />
            </div>

            <div className="min-w-0">
              <div className="text-sm text-gray-300">Yearly</div>

              <div className="text-2xl font-semibold text-white truncate">
                {yearly.sales.toLocaleString()}
              </div>

              <div className="text-sm mt-1 whitespace-nowrap">
                <span className="text-green-400 font-semibold">
                  {yearly.changePercent}%
                </span>
                <span className="text-gray-400 ml-2">
                  {yearly.amountUsd.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
