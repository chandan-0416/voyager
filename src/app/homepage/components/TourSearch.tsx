"use client";

import { useRouter } from "next/navigation"; // Allows navigation without page reload.
import { useState } from "react";
import { SearchType } from "../types/search";

const tabs: SearchType[] = [ // UI-driven logic
  "Tour",
  "Hotel",
  "Flight",
  "Transfer",
  "Visa",
  "Restaurant",
  "Cruise",
];

const TourSearch = () => {
  const router = useRouter();
  const [destination, setDestination] = useState(""); // Controlled component input

  const handleSearch = () => { // Guard + navigation
    if (!destination.trim()) return; // Input validation
    router.push(
      `/experience?type=tour&destination=${encodeURIComponent(destination)}` // URL-based state
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl mx-auto p-5 sm:p-8 md:p-10">

      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={
              tab === "Tour"
                ? "px-4 py-2 rounded-full text-sm sm:text-base bg-pink-500 hover:bg-pink-600 text-white"
                : "px-4 py-2 rounded-full text-sm sm:text-base bg-white shadow text-black cursor-not-allowed"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <form // Enables Enter key search
        onSubmit={(e) => {
          e.preventDefault(); // Prevents page reload
          handleSearch();
        }}
        className="relative "
      >
        <input
          type="text"
          placeholder="Search destinations & experiences"
          value={destination} // Es fields ke according data search ke skate hai
          onChange={(e) => setDestination(e.target.value)} // 
          className="w-full border rounded-xl py-4 sm:py-5 md:py-6 pl-4 sm:pl-6 pr-24 sm:pr-28 text-sm sm:text-base text-black focus:outline-none border-t border-black/30"
        />

        <button
          type="submit" //Triggers form submit
          className="absolute right-1 sm:right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-4 sm:py-5 rounded-lg text-sm sm:text-base font-semibold"
        >
          Search
        </button>
      </form>

    </div>
  );
};

export default TourSearch;