// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { SearchType } from "@/types/search";

// const tabs: SearchType[] = [
//   "Tour",
//   "Hotel",
//   "Flight",
//   "Transfer",
//   "Visa",
//   "Restaurant",
//   "Cruise",
// ];

// const TourSearch = () => {
//   const router = useRouter();
//   const [destination, setDestination] = useState("");

//   const handleSearch = () => {
//     if (!destination.trim()) return;
//     router.push(
//       `/search?type=tour&destination=${encodeURIComponent(destination)}`
//     );
//   };
//   return (
//     <div className="bg-white p-10  rounded-2xl shadow-lg w-full max-w-6xl mx-auto">
//       {/* Tabs */}
//       <div className="flex gap-3 mb-6 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             className={
//               tab === "Tour"
//                 ? "px-4 py-2 rounded-full  bg-pink-500 hover:bg-pink-600 text-white"
//                 : "px-4 py-2 rounded-full  bg-white shadow-2xl text-black cursor-not-allowed"
//             }
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       {/* Search */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSearch();
//         }}
//         className="relative "
//       >
//         <input
//           type="text"
//           placeholder="Search destinations & experiences"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           className="w-full border rounded-xl py-6 pl-6 pr-28 text-black focus:outline-none border-t border-black/30"
//         />
//         <button
//           type="submit"
//           className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white p-6 rounded-lg text-sm font-semibold"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };
// export default TourSearch;


// Responsive  - Search on Main | Home Page

"use client";

import { useRouter } from "next/navigation"; // Allows navigation without page reload.
import { useState } from "react";
import { SearchType } from "@/types/search";

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
      `/search?type=tour&destination=${encodeURIComponent(destination)}` // URL-based state
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













































// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const TOUR_DESTINATIONS = [
//   "Dubai",
//   "Goa",
//   "Paris",
//   "Bali",
//   "Singapore",
//   "Maldives",
//   "Bangkok",
// ] as const;

// const TourSearch = () => {
//   const router = useRouter();

//   const [destination, setDestination] = useState("");
//   const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [error, setError] = useState("");

//   /* 🔥 Debounced suggestions */
//   useEffect(() => {
//     if (!destination.trim()) return;

//     const timer = setTimeout(() => {
//       const filtered = TOUR_DESTINATIONS.filter((item) =>
//         item.toLowerCase().includes(destination.toLowerCase())
//       );

//       setSuggestions(filtered);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [destination]);

//   /* 🧠 Handle typing */
//   const handleChange = (value: string) => {
//     setDestination(value);
//     setSelectedDestination(null); // 🔴 typing invalidates selection
//     setError("");

//     if (!value.trim()) {
//       setSuggestions([]);
//     }
//   };

//   /* ✅ Handle dropdown selection */
//   const handleSelect = (value: string) => {
//     setDestination(value);              // fill exact suggestion
//     setSelectedDestination(value);      // mark as valid
//     setSuggestions([]);
//     setError("");
//   };

//   /* 🔍 Strict validation */
//   const handleSearch = () => {
//     if (!selectedDestination) {
//       setError("Please select a destination from the suggestions");
//       return;
//     }

//     router.push(
//       `/search?type=tour&destination=${encodeURIComponent(selectedDestination)}`
//     );
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg max-w-6xl mx-auto p-8">

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSearch();
//         }}
//         className="relative"
//       >
//         <input
//           type="text"
//           value={destination}
//           onChange={(e) => handleChange(e.target.value)}
//           placeholder="Search destinations & experiences"
//           className="w-full border rounded-xl py-5 pl-6 pr-28 focus:outline-none"
//         />

//         <button
//           type="submit"
//           className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-lg font-semibold"
//         >
//           Search
//         </button>

//         {/* 🔽 Dropdown */}
//         {suggestions.length > 0 && (
//           <ul className="absolute z-10 bg-white border w-full mt-2 rounded-xl shadow">
//             {suggestions.map((item) => (
//               <li
//                 key={item}
//                 onClick={() => handleSelect(item)}
//                 className="px-4 py-3 cursor-pointer hover:bg-gray-100"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )}
//       </form>

//       {error && <p className="text-red-500 mt-3">{error}</p>}
//     </div>
//   );
// };

// export default TourSearch;
