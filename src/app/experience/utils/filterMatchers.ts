export const matchesPrice = (
  priceRange: { adult: number },
  filter: string | null
) => {
  if (!filter) return true;

  if (filter === "650+") {
    return priceRange.adult >= 650;
  }

  const [min, max] = filter.split("-").map(Number);
  return priceRange.adult >= min && priceRange.adult <= max;
};

export const matchesRating = (
  ratingScore: number,
  filters: number[]
) => {
  if (filters.length === 0) return true;
  const rounded = Math.floor(ratingScore);
  return filters.includes(rounded);
};

export const matchesCancellation = (
  policy: string,
  filters: string[]
) => {
  if (filters.length === 0) return true;
  return filters.includes(policy);
};
