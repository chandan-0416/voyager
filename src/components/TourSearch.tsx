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



// Responsive 

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
//     <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl mx-auto p-5 sm:p-8 md:p-10">

//       {/* Tabs */}
//       <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             className={
//               tab === "Tour"
//                 ? "px-4 py-2 rounded-full text-sm sm:text-base bg-pink-500 hover:bg-pink-600 text-white"
//                 : "px-4 py-2 rounded-full text-sm sm:text-base bg-white shadow text-black cursor-not-allowed"
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
//           className="w-full border rounded-xl py-4 sm:py-5 md:py-6 pl-4 sm:pl-6 pr-24 sm:pr-28 text-sm sm:text-base text-black focus:outline-none border-t border-black/30"
//         />

//         <button
//           type="submit"
//           className="absolute right-1 sm:right-1 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-4 sm:py-5 rounded-lg text-sm sm:text-base font-semibold"
//         >
//           Search
//         </button>
//       </form>

//     </div>
//   );
// };

// export default TourSearch;



"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchType } from "@/types/search";

const tabs: SearchType[] = [
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
  const [destination, setDestination] = useState("");
  const[mounted, setMounted] = useState(false);
  const handleSearch = () => {
    if (!destination.trim()) return;
    router.push(
      `/search?type=tour&destination=${encodeURIComponent(destination)}`
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <div
      className="
        w-full max-w-5xl mx-auto
        rounded-3xl
        bg-white/95 backdrop-blur-xl
        shadow-2xl
        p-5 sm:p-8 md:p-10
      "
    >
      {/* Tabs */}
      <div className="flex gap-3 sm:gap-4 mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition
              ${
                tab === "Tour"
                  ? "bg-pink-500 text-white hover:bg-pink-600 shadow-md"
                  : "bg-white text-black/70 shadow cursor-not-allowed"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Search destinations & experiences"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="
            w-full
            rounded-2xl
            border border-black/20
            py-4 sm:py-5
            pl-5 sm:pl-6
            pr-28 sm:pr-32
            text-sm sm:text-base
            text-black
            focus:outline-none focus:ring-2 focus:ring-pink-400
          "
        />

        <button
          type="submit"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            bg-pink-500 hover:bg-pink-600
            text-white font-semibold
            px-5 sm:px-7
            py-3.5 sm:py-4
            rounded-xl
            transition shadow-md
          "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default TourSearch;
