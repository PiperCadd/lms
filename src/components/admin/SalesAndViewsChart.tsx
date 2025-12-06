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
    <div className="bg-linear-to-b from-[#0f1624] to-[#0b1220] rounded-2xl p-5 md:p-6 shadow-xl h-fit overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-lg font-semibold">Sales & Views</div>
          <div className="text-sm text-gray-400">Overview</div>
        </div>
        <div className="flex gap-2">
          <Dropdown options={["a", "b", "c"]} />
          <Dropdown options={["a", "b", "c"]} />
        </div>
        {/* <select
        title='x'
          value={mode}
          onChange={(e) => setMode(e.target.value as 'month' | 'year')}
          className="bg-transparent border border-gray-700 text-gray-200 text-sm rounded px-3 py-1"
        >
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select> */}
      </div>

      {/* Content box */}
      <div className="mt-5 rounded-xl bg-[#0b1326] p-4">
        <div className="flex flex-nowrap gap-4 justify-between items-center w-full">
          {/* LEFT block */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-20 md:w-28 shrink-0">
              <UnifiedChart
                type="radial"
                series={leftSeries}
                height={100}
                primaryColor={mode === "month" ? "#47A3FF" : "#FFD54F"}
                secondaryColor="#0b1220"
              />
            </div>

            <div className="min-w-0">
              <div className="text-sm text-gray-300">
                {mode === "month" ? "Monthly" : "Yearly"}
              </div>

              <div className="text-2xl font-semibold text-white truncate">
                {(mode === "month"
                  ? monthly.sales
                  : yearly.sales
                ).toLocaleString()}
              </div>

              <div className="text-sm mt-1 whitespace-nowrap">
                <span className="text-green-400 font-semibold">
                  {selected.changePercent}%
                </span>
                <span className="text-gray-400 ml-2">
                  {selected.amountUsd.toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT block */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-20 md:w-28 flex-shrink-0">
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
