import { useMemo } from "react";
import dubaiData from "@/data/dubaiExperiences.json";
import {
  matchesPrice,
  matchesRating,
  matchesCancellation,
} from "../utils/filterMatchers";

type Props = {
  query: string;
  price: string | null;
  ratings: number[];
  cancellationParams: string[];
};

export const useFilteredResults = ({
  query,
  price,
  ratings,
  cancellationParams,
}: Props) => {
  return useMemo(() => {
    return dubaiData.experiences.filter((exp) => {
      const matchesSearch =
        exp.title.toLowerCase().includes(query.toLowerCase()) ||
        exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
        dubaiData.destination.name
          .toLowerCase()
          .includes(query.toLowerCase());

      return (
        matchesSearch &&
        matchesPrice(exp.priceRange, price) &&
        matchesRating(exp.rating.score, ratings) &&
        matchesCancellation(
          exp.cancellationPolicy.type,
          cancellationParams
        )
      );
    });
  }, [query, price, ratings, cancellationParams]);
};
