"use client";

import { useFilteredResults } from "../hooks/useFilteredResults";
import { useSearchFilters } from "../hooks/useSearchFilters";
import FiltersSidebar from "./FiltersSidebar";
import ResultsGrid from "./ResultsGrid";
import SearchHeader from "./SearchHeader";

const Experience = () => {
  const filters = useSearchFilters();
  const results = useFilteredResults({
    query: filters.query,
    price: filters.price,
    ratings: filters.ratings,
    cancellationParams: filters.cancellationParams,
  });

  return (
    <div className="min-h-screen px-4 md:px-12 pt-8 pb-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 px-18">
        Choose the Tours You’re Interested In
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        <FiltersSidebar {...filters} />

        <main className="md:w-3/4 flex flex-col gap-1">
          <SearchHeader
            query={filters.query}
            view={filters.view}
            updateParam={filters.updateParam}
          />

          {results.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No experiences found
            </p>
          ) : (
            <ResultsGrid
              results={results}
              view={filters.view}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Experience;
