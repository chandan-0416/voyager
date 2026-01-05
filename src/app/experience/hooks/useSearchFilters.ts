"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useSearchFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("destination") ?? "";
  const rawView = searchParams.get("view");

const view: "grid" | "list" =
  rawView === "list" ? "list" : "grid";

  const price = searchParams.get("price");
  const ratingParam = searchParams.get("rating");

  const ratings = useMemo(() => {
    return ratingParam ? ratingParam.split(",").map(Number) : [];
  }, [ratingParam]);

  const cancellationParams = useMemo(() => {
    return searchParams.get("cancellation")?.split(",") ?? [];
  }, [searchParams]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.replace(`/experience?${params.toString()}`, { scroll: false });
  };

  const clearParams = (keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));

    router.replace(`/experience?${params.toString()}`, { scroll: false });
  };

  const toggleRating = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get("rating")
      ? params.get("rating")!.split(",").map(Number)
      : [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (updated.length === 0) params.delete("rating");
    else params.set("rating", updated.join(","));

    router.replace(`/experience?${params.toString()}`, { scroll: false });
  };

  return {
    query,
    view,
    price,
    ratings,
    cancellationParams,
    updateParam,
    clearParams,
    toggleRating,
  };
};
