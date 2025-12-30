// Search on second Page ie destination Page

// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import dubaiData from "@/data/dubaiExperiences.json";
// import Image from "next/image";

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   // Search input state
//   const [query, setQuery] = useState(
//     searchParams.get("destination") ?? ""
//   );
//   // Sync input with URL
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (query) params.set("destination", query);
//     else params.delete("destination");
//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   }, [query]);

//   // Filter experiences
//   const results = dubaiData.experiences.filter((exp) =>
//     exp.title.toLowerCase().includes(query.toLowerCase()) ||
//     exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
//     dubaiData.destination.name.toLowerCase().includes(query.toLowerCase())
//   );
//   //  view Toggle
//   const viewParam = searchParams.get("view");
//   const [view, setView] = useState<"grid" | "list">(
//     viewParam === "list" ? "list" : "grid"
//   );
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("view", view);
//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   }, [view]);
//   return (
//     <div className="px-4 md:px-10 pt-8 pb-20">
//       <h1 className="text-xl font-bold mb-15 px-20">
//         Choose type of Tours you are interested
//       </h1>
//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
//         {/* Filter  */}
//         <div className="md:flex-3 border border-gray-300 p-4 mb-30 rounded-2xl">
//           <h1 className="text-2xl text-black font-bold"> Filter</h1>
//         </div>
//         {/* Tour experiences */}
//         <div className="md:flex-12">
//           <div className=" flex border border-gray-300 rounded-2xl">
//             {/* Search Input */}
//             <input
//               type="text"
//               placeholder="Search by tour name"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="border border-black/30 p-2 rounded-2xl mx-10 my-4"
//             />
//             <div className="flex gap-2 m-4">
//               <button
//                 onClick={() => setView("grid")}
//                 className={`px-3 py-1 border rounded ${view === "grid" ? "bg-black text-white" : ""
//                   }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setView("list")}
//                 className={`px-3 py-1 border rounded ${view === "list" ? "bg-black text-white" : ""
//                   }`}
//               >
//                 List
//               </button>
//             </div>
//           </div>
//           {/* <hr className="border border-black/30 w-full " /> */}
//           {/* Tour Card - Results */}
//           {results.length === 0 ? (
//             <p className="text-gray-500">No experiences found</p>
//           ) : (
//             <div
//               className={`pt-10 ${view === "grid"
//                 ? "grid grid-cols-1 md:grid-cols-3 gap-6"
//                 : "flex flex-col gap-4"
//                 }`}
//             >
//               {results.map((item) => (
//                 <div
//                   key={item.experienceId}
//                   className={`border border-black/30 rounded-xl shadow hover:shadow-lg transition ${view === "list" ? "flex gap-4 p-4" : ""
//                     }`}
//                 >
//                   {/* Image */}
//                   <Image
//                     src={item?.images?.[0] || "/placeholder.jpg"}
//                     alt={item.title}
//                     width={400}
//                     height={250}
//                     className={`object-cover rounded-lg ${view === "list" ? "w-48 h-32" : "h-40 w-full rounded-t-lg"
//                       }`}
//                   />
//                   <div className="flex justify-between mx-2">
//                     {/* Tour Type */}
//                     <p className="text-sm font-semibold text-pink-400">
//                       {item.tourType}
//                     </p>
//                     {/* Rating */}
//                     <p className="text-sm font-semibold bg-yellow-50">
//                       ⭐  {item.rating.score}
//                     </p>
//                   </div>
//                   {/* Title */}
//                   <h2 className="font-semibold text-lg p-1 m-1">
//                     {item.title}
//                   </h2>
//                   {/* Price */}
//                   <p className="text-blue-600 font-bold mt-2">
//                     {item.priceRange.currency} {item.priceRange.adult}
//                   </p>
//                   {/* Cancellation */}
//                   {/* <p className="text-sm text-green-600 mt-1">
//                     {item.cancellationPolicy.type}
//                   </p> */}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SearchPage;



//  Responsive Page

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import dubaiData from "@/data/dubaiExperiences.json";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL → UI (Single Source of Truth)
  const query = searchParams.get("destination") ?? "";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  // filter -1
  const price = searchParams.get("price");
  const rating = searchParams.get("rating");
  const cancellationParams = useMemo(() => {
    return searchParams.get("cancellation")?.split(",") ?? [];
  }, [searchParams]);



  // Handlers (Event-driven navigation)
  // Single param update (safe & strict)
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.replace(`/search?${params.toString()}`, {
      scroll: false,
    });
  };

  // Clear multiple params safely
  const clearParams = (keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => params.delete(key));

    router.replace(`/search?${params.toString()}`, {
      scroll: false,
    });
  };


  // filter -2
  const matchesPrice = (
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

  const matchesRating = (
    ratingScore: number,
    filter: string | null
  ) => {
    if (!filter) return true;
    return Math.floor(ratingScore) === Number(filter); //Math.floor(x: number): number => Returns the greatest integer less than or equal to its numeric argument.
  };

  const matchesCancellation = (
    policy: string,
    filters: string[]
  ) => {
    if (filters.length === 0) return true;
    return filters.includes(policy);
  };


  // Filter logic (memoized)
  const results = useMemo(() => {
    return dubaiData.experiences.filter((exp) => {
      const matchesSearch =
        exp.title.toLowerCase().includes(query.toLowerCase()) ||
        exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
        dubaiData.destination.name
          .toLowerCase()
          .includes(query.toLowerCase());

      const priceMatch = matchesPrice(exp.priceRange, price);
      const ratingMatch = matchesRating(exp.rating.score, rating);
      const cancellationMatch = matchesCancellation(
        exp.cancellationPolicy.type,
        cancellationParams
      );

      return matchesSearch && priceMatch && ratingMatch && cancellationMatch;
    });
  }, [query, price, rating, cancellationParams]);

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-12 pt-8 pb-24">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
        Choose the Tours You’re Interested In
      </h1>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4 bg-white border border-gray-300 rounded-2xl p-6 shadow-sm h-fit">
          <div className="flex flex-cols justify-between">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <p className="">
              <button
                onClick={() => clearParams(["price", "rating", "cancellation"])}
                className="text-xl text-red-400 underline font-semibold"
              >
                Clear filters
              </button>
            </p>
          </div>

          <hr className="border-dashed border-gray-300 mt-2 mx-3 " />

          <h3 className="font-semibold mt-4 mb-2">Price</h3>
          <div className="flex flex-col gap-2">
            {["0-150", "151-300", "301-450", "451-650", "650+"].map((p) => (
              <button
                key={p}
                onClick={() => updateParam("price", p)}
                className={`text-left px-3 py-2 rounded-lg border ${price === p
                  ? "bg-pink-500 text-white border-pink-500"
                  : "border-gray-300"
                  }`}
              >
                {p === " 650+" ? " 650+" : `${p}`}
              </button>
            ))}
          </div>


          <hr className="border-dashed border-gray-300 mt-4 mx-3 " />

          <h3 className="font-semibold mt-6 mb-2">Rating</h3>
          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={rating === String(r)}
                  onChange={() =>
                    updateParam(
                      "rating",

                      rating === String(r) ? "" : String(r)
                    )
                  }
                />
                {"⭐".repeat(r)}
              </label>
            ))}
          </div>

          <hr className="border-dashed border-gray-300 mt-4 mx-3 " />

          <h3 className="font-semibold mt-6 mb-2">
            Cancellation Policy
          </h3>

          <div className="flex flex-col gap-2">
            {[
              "Free Cancellation 48 Hours Prior",
              "Non Refundable",
              "Free Cancellation 24 Hours Prior",
            ].map((policy) => (
              <label
                key={policy}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={cancellationParams.includes(policy)}
                  onChange={() => {
                    const updated = cancellationParams.includes(policy)
                      ? cancellationParams.filter((p) => p !== policy)
                      : [...cancellationParams, policy];

                    updateParam(
                      "cancellation",
                      updated.join(",")
                    );
                  }}
                />
                {policy}
              </label>
            ))}
          </div>


        </aside>

        {/* Main */}
        <main className="md:w-3/4 flex flex-col gap-6">
          {/* Search + View Toggle */}
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow">
            <input
              type="text"
              placeholder="Search by tour name"
              value={query}
              onChange={(e) =>
                updateParam("destination", e.target.value)
              }
              className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            {/* ❌ Hidden on small devices */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => updateParam("view", "grid")}
                className={`px-4 py-2 rounded-full border ${view === "grid"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "border-gray-300"
                  }`}
              >
                Grid
              </button>

              <button
                onClick={() => updateParam("view", "list")}
                className={`px-4 py-2 rounded-full border ${view === "list"
                  ? "bg-pink-500 text-white border-pink-500"
                  : "border-gray-300"
                  }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No experiences found
            </p>
          ) : (
            <div
              className={`pt-6 ${view === "list"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                }`}
            >
              {results.map((item) => (
                <div
                  key={item.experienceId}
                  className={`bg-white rounded-2xl hover:shadow-lg cursor-pointer transition ${view === "list"
                    ? "flex gap-5"
                    : "flex flex-col"
                    }`}
                >
                  {/* Image */}
                  <div className={view === "list" ? "shrink-0" : ""}>
                    <Image
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.title}
                      width={400}
                      height={250}
                      className={`object-cover ${view === "list"
                        ? "w-56 h-full rounded-l-2xl"
                        : "w-full h-52 rounded-t-2xl"
                        }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex justify-between mt-2">
                      <span className="text-xl font-semibold text-pink-500 p-2">
                        {item.tourType}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-semibold bg-yellow-50 text-yellow-700 px-2 py-1 m-2 rounded-xs">
                        ⭐ {item.rating.score}
                      </span>

                    </div>

                    <h2 className="mt-2 px-3 font-semibold text-lg line-clamp-2">
                      {item.title}
                    </h2>

                    <div className="text-sm text-gray-500 mt-1 px-3">
                      <p>{item.destination}</p>
                      <p>{item.duration.total}</p>
                      <p className="text-green-600">
                        {item.cancellationPolicy.type}
                      </p>
                    </div>
                    <hr className="border-dashed border-gray-300 mt-2 mx-3 " />

                    <p className="mt-4 text-xl font-bold text-blue-600 text-right m-2">
                      {item.priceRange.currency}{" "}
                      {item.priceRange.adult}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;




// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useMemo, useState } from "react";
// import dubaiData from "@/data/dubaiExperiences.json";
// import Image from "next/image";

// /* ================= FILTER CONFIG ================= */

// // type PriceRange = {
// //   label: string;
// //   min: number;
// //   max: number;
// // };

// type DurationRange = {
//   label: string;
//   min?: number;
//   max?: number;
// };

// // const PRICE_RANGES: PriceRange[] = [
// //   { label: "Below AED 250", min: 0, max: 249 },
// //   { label: "AED 250 – 340", min: 250, max: 340 },
// //   { label: "Above AED 341", min: 341, max: 850 },
// // ];

// const RATING_RANGES = ["5", "4", "3", "2", "1"];


// const DURATION_RANGES: DurationRange[] = [
//   { label: "Up to 2 hours", max: 2 },
//   { label: "2 – 4 hours", min: 2, max: 4 },
//   { label: "More than 4 hours", min: 4 },
// ];

// const CANCELLATION_TYPES = ["Free Cancellation", "Non-Refundable"];

// /* ================= COMPONENT ================= */

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [view, setView] = useState(
//     searchParams.get("view") === "list" ? "list" : "grid"
//   );

//   const query = searchParams.get("destination") ?? "";

//   /* ================= URL PARAMS ================= */

//   const selectedPrices = useMemo<string[]>(
//     () => searchParams.get("price")?.split(",") ?? [],
//     [searchParams]
//   );

//   const selectedRatings = useMemo<string[]>(
//     () => searchParams.get("rating")?.split(",") ?? [],
//     [searchParams]
//   );

//   const selectedDurations = useMemo<string[]>(
//     () => searchParams.get("duration")?.split(",") ?? [],
//     [searchParams]
//   );

//   const selectedCancellations = useMemo<string[]>(
//     () => searchParams.get("cancel")?.split(",") ?? [],
//     [searchParams]
//   );

//   const updateMultiParam = (key: string, values: string[]) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (values.length > 0) params.set(key, values.join(","));
//     else params.delete(key);

//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   };

//   const toggleValue = (key: string, current: string[], value: string) => {
//     const updated = current.includes(value)
//       ? current.filter((v) => v !== value)
//       : [...current, value];
//     updateMultiParam(key, updated);
//   };

//   const updateParam = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (value) params.set(key, value);
//     else params.delete(key);
//     router.replace(`/search?${params.toString()}`, {
//       scroll: false,
//     });
//   };

//   /* ================= FILTER LOGIC ================= */

//   const results = useMemo(() => {
//     return dubaiData.experiences.filter((exp) => {
//       const matchesSearch =
//         exp.title.toLowerCase().includes(query.toLowerCase()) ||
//         exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
//         dubaiData.destination.name
//           .toLowerCase()
//           .includes(query.toLowerCase());

//       const matchesPrice =
//         selectedPrices.length === 0 ||
//         exp.priceRange.adult <= Number(selectedPrices[0]);


//       const matchesRating =
//         selectedRatings.length === 0 ||
//         selectedRatings.some((r) => exp.rating.score >= Number(r));

//       const matchesCancellation =
//         selectedCancellations.length === 0 ||
//         selectedCancellations.some((c) =>
//           exp.cancellationPolicy.type.includes(c)
//         );

//       const hours = Number.parseFloat(exp.duration.total.replace(/[^\d.]/g, ""));
//       const matchesDuration =
//         selectedDurations.length === 0 ||
//         selectedDurations.some((label) => {
//           const d = DURATION_RANGES.find((x) => x.label === label);
//           if (!d) return false;
//           if (d.min !== undefined && d.max !== undefined)
//             return hours >= d.min && hours <= d.max;
//           if (d.min !== undefined) return hours > d.min;
//           if (d.max !== undefined) return hours <= d.max;
//           return true;
//         });

//       return matchesSearch && matchesPrice && matchesRating && matchesCancellation && matchesDuration;
//     });
//   }, [query, selectedPrices, selectedRatings, selectedCancellations, selectedDurations]);

//   /* ================= UI ================= */

//   return (
//     <div className="bg-gray-50 min-h-screen px-4 md:px-12 pt-8 pb-24">
//       <h1 className="text-2xl md:text-3xl font-extrabold mb-8">
//         Choose the Tours You’re Interested In
//       </h1>

//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
//         {/* ================= FILTER SIDEBAR ================= */}
//         <aside className="hidden md:block md:w-1/4 bg-white rounded-2xl shadow p-6 space-y-6">
//           <h2 className="text-xl font-bold border-b pb-3">Filters</h2>

//           <FilterSection title="Price Range (AED)">
//             <div className="overflow-x-auto">
//               <input
//                 type="range"
//                 min={60}
//                 max={850}
//                 step={8}
//                 value={selectedPrices[0] ? Number(selectedPrices[0]) : 65}
//                 onChange={(e) =>
//                   updateMultiParam("price", [e.target.value])
//                 }
//                 className="w-full accent-pink-500"
//               />

//               <div className="flex justify-between text-xs text-gray-600 mt-2">
//                 <span>AED 60</span>
//                 <span>AED 850</span>
//               </div>

//               <p className="text-sm font-semibold mt-2">
//                 Selected: AED {selectedPrices[0] ?? 65}
//               </p>
//             </div>
//           </FilterSection>


//           <FilterSection title="Rating">
//             {RATING_RANGES.map((r) => (
//               <Checkbox
//                 key={r}
//                 label={`⭐ ${r}`}
//                 checked={selectedRatings.includes(r)}
//                 onChange={() => toggleValue("rating", selectedRatings, r)}
//               />
//             ))}
//           </FilterSection>

//           <FilterSection title="Cancellation">
//             {CANCELLATION_TYPES.map((c) => (
//               <Checkbox
//                 key={c}
//                 label={c}
//                 checked={selectedCancellations.includes(c)}
//                 onChange={() => toggleValue("cancel", selectedCancellations, c)}
//               />
//             ))}
//           </FilterSection>

//           <FilterSection title="Duration">
//             {DURATION_RANGES.map((d) => (
//               <Checkbox
//                 key={d.label}
//                 label={d.label}
//                 checked={selectedDurations.includes(d.label)}
//                 onChange={() => toggleValue("duration", selectedDurations, d.label)}
//               />
//             ))}
//           </FilterSection>
//         </aside>

//         {/* ================= MAIN CONTENT ================= */}
//         <main className="md:w-3/4 flex flex-col gap-6">

//           <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow">
//             <input
//               type="text"
//               placeholder="Search by tour name"
//               value={query}
//               onChange={(e) =>
//                 updateParam("destination", e.target.value)
//               }
//               className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
//             />

//             {/* View Toggle */}
//             <div className="flex justify-end gap-2 mb-4">
//               <button
//                 className={`px-4 py-2 rounded ${view === "grid" ? "bg-pink-500 text-white" : "bg-gray-200"
//                   }`}
//                 onClick={() => setView("grid")}
//               >
//                 Grid
//               </button>
//               <button
//                 className={`px-4 py-2 rounded ${view === "list" ? "bg-pink-500 text-white" : "bg-gray-200"
//                   }`}
//                 onClick={() => setView("list")}
//               >
//                 List
//               </button>
//             </div>
//           </div>
//           {/* Render Results */}
//           {results.length === 0 ? (
//             <p className="text-gray-500">No results found.</p>
//           ) : view === "grid" ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {results.map((exp) => (
//                 <div
//                   key={exp.experienceId}
//                   className="bg-white rounded-2xl shadow p-4 flex flex-col"
//                 >
//                   <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
//                     {/* Image */}
//                     <div className={view === "grid" ? "shrink-0" : ""}>
//                       <Image
//                         src={exp.images?.[0] || "/placeholder.jpg"}
//                         alt={exp.title}
//                         width={400}
//                         height={250}
//                         className={`object-cover ${view === "grid"
//                           ? "w-56 h-full rounded-l-2xl"
//                           : "w-full h-52 rounded-t-2xl"
//                           }`}
//                       />
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-lg">{exp.title}</h3>
//                   <p className="text-sm text-gray-600">{exp.tourType}</p>
//                   <p className="mt-2 font-semibold">AED {exp.priceRange.adult}</p>
//                   <p className="text-sm text-yellow-500"> ⭐ {exp.rating.score}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col gap-4">
//               {results.map((exp) => (
//                 <div
//                   key={exp.experienceId}
//                   className="bg-white rounded-2xl shadow p-4 flex items-center gap-4"
//                 >
//                   {/* Image */}
//                   <div className={view === "list" ? "shrink-0" : ""}>
//                     <Image
//                       src={exp.images?.[0] || "/placeholder.jpg"}
//                       alt={exp.title}
//                       width={400}
//                       height={250}
//                       className={`object-cover ${view === "list"
//                         ? "w-56 h-full rounded-l-2xl"
//                         : "w-full h-52 rounded-t-2xl"
//                         }`}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg">{exp.title}</h3>
//                     <p className="text-sm text-gray-600">{exp.tourType}</p>
//                     <p className="font-semibold mt-1">AED {exp.priceRange.adult}</p>
//                     <p className="text-sm text-yellow-500">⭐ {exp.rating.score}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* ================= REUSABLE UI ================= */

// function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div className="space-y-3">
//       <h3 className="font-semibold text-gray-800">{title}</h3>
//       <div className="space-y-2">{children}</div>
//     </div>
//   );
// }

// function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
//   return (
//     <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-pink-500">
//       <input type="checkbox" checked={checked} onChange={onChange} className="accent-pink-500" />
//       {label}
//     </label>
//   );
// }
