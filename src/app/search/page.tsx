"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockData } from "@/data/mockData";


const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for input
  const [destination, setDestination] = useState(
    searchParams?.get("destination") ?? ""
  );

  // Update URL when typing
  useEffect(() => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [destination, router]);

  // Filter tours based on input
  const results = mockData.tour.filter((tour) =>
    tour.destination.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Search Tours</h1>

      {/* Live Search Input */}
      <input
        type="text"
        placeholder="Enter destination..."
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      />

      {/* Results */}
      {results.length === 0 ? (
        <p className="text-gray-500">No tours found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >


              <h1 className="font-semibold text-lg">{item.title}</h1>
              <h2 className="font-semibold text-lg">{item.destination}</h2>
              <p className="text-blue-600 font-bold">₹{item.price}</p>
              <p className="">{item.description}</p>
              <p className="">{item.rating}</p>
              <p className="">{item.duration}</p>
              <p className="">{item.trending}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;



