"use client";

import { useMemo } from "react";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: string | null;
  onChange: (value: string) => void;
};

export default function PriceRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: Props) {
  const { minVal, maxVal } = useMemo(() => {
    if (!value) return { minVal: min, maxVal: max };

    const [from, to] = value.split("-").map(Number);
    return {
      minVal: Math.max(min, from),
      maxVal: Math.min(max, to),
    };
  }, [value, min, max]);

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium mb-3">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>

      <div className="relative h-4">
        {/* Base track */}
        <div className="absolute inset-0 bg-pink-500 rounded-full" />

        {/* Active track */}
        <div
          className="absolute rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* LEFT RANGE (covers left half only) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), maxVal - step);
            onChange(`${v}-${maxVal}`);
          }}
          className="range-left"
        />

        {/* RIGHT RANGE (covers right half only) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), minVal + step);
            onChange(`${minVal}-${v}`);
          }}
          className="range-right"
        />
      </div>
    </div>
  );
}
