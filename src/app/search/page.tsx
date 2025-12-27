// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { mockData } from "@/data/mockData";


// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // State for input
//   const [destination, setDestination] = useState(
//     searchParams?.get("destination") ?? ""
//   );

//   // Update URL when typing
//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (destination) params.set("destination", destination);
//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   }, [destination, router]);

//   // Filter tours based on input
//   const results = mockData.tour.filter((tour) =>
//     tour.destination.toLowerCase().includes(destination.toLowerCase())
//   );

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-6">Search Tours</h1>

//       {/* Live Search Input */}
//       <input
//         type="text"
//         placeholder="Enter destination..."
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//         className="border p-3 rounded-lg w-full mb-6"
//       />

//       {/* Results */}
//       {results.length === 0 ? (
//         <p className="text-gray-500">No tours found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {results.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-xl p-4 shadow hover:shadow-lg transition"
//             >


//               <h1 className="font-semibold text-lg">{item.title}</h1>
//               <h2 className="font-semibold text-lg">{item.destination}</h2>
//               <p className="text-blue-600 font-bold">₹{item.price}</p>
//               <p className="">{item.description}</p>
//               <p className="">{item.rating}</p>
//               <p className="">{item.duration}</p>
//               <p className="">{item.trending}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPage;


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



// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import dubaiData from "@/data/dubaiExperiences.json";
// import Image from "next/image";

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [query, setQuery] = useState(searchParams.get("destination") ?? "");

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (query) params.set("destination", query);
//     else params.delete("destination");
//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   }, [query]);

//   const results = dubaiData.experiences.filter((exp) =>
//     exp.title.toLowerCase().includes(query.toLowerCase()) ||
//     exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
//     dubaiData.destination.name.toLowerCase().includes(query.toLowerCase())
//   );

//   const viewParam = searchParams.get("view");
//   const [view, setView] = useState<"grid" | "list">(viewParam === "list" ? "list" : "grid");

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("view", view);
//     router.replace(`/search?${params.toString()}`, { scroll: false });
//   }, [view]);

//   return (
//     <div className="px-4 md:px-12 pt-8 pb-24 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
//         Choose the Tours You’re Interested In
//       </h1>

//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
//         {/* Filter Sidebar */}
//         <aside className="md:w-1/4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Filter</h2>
//           {/* Add filter options later */}
//         </aside>

//         {/* Main Content */}
//         <main className="md:w-3/4 flex flex-col gap-6">
//           {/* Search + Toggle */}
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow">
//             <input
//               type="text"
//               placeholder="Search by tour name"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
//             />

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setView("grid")}
//                 className={`px-4 py-2 rounded-full border ${view === "grid" ? "bg-pink-500 text-white border-pink-500" : "text-gray-700 border-gray-300 hover:bg-pink-50"
//                   } transition`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setView("list")}
//                 className={`px-4 py-2 rounded-full border ${view === "list" ? "bg-pink-500 text-white border-pink-500" : "text-gray-700 border-gray-300 hover:bg-pink-50"
//                   } transition`}
//               >
//                 List
//               </button>
//             </div>
//           </div>

//           {/* Tour Cards */}
//           {results.length === 0 ? (
//             <p className="text-gray-500 text-center mt-10">No experiences found</p>
//           ) : (
//             <div
//               className={`pt-6 ${view === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//                   : "flex flex-col gap-4"
//                 }`}
//             >
//               {results.map((item) => (
//                 <div
//                   key={item.experienceId}
//                   className={`bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden ${view === "list" ? "flex flex-row gap-4 p-4 items-center" : ""
//                     }`}
//                 >
//                   <Image
//                     src={item?.images?.[0] || "/placeholder.jpg"}
//                     alt={item.title}
//                     width={400}
//                     height={250}
//                     className={`object-cover rounded-xl ${view === "list" ? "w-48 h-32 shrink-0" : "w-full h-48"
//                       }`}
//                   />

//                   <div className="flex flex-col justify-between flex-1">
//                     <div className="flex justify-between items-center mt-2 md:mt-0">
//                       <span className="text-sm font-semibold text-pink-400">
//                         {item.tourType}
//                       </span>
//                       <span className="text-sm font-semibold bg-yellow-50 px-2 py-1 rounded">
//                         ⭐ {item.rating.score}
//                       </span>
//                     </div>

//                     <h2 className="text-lg md:text-xl font-semibold mt-2">
//                       {item.title}
//                     </h2>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {item.destination}
//                     </p>
//                      <p className="text-sm text-gray-600 mt-1">
//                       {item.duration.total}
//                     </p>

//                     <p className="text-sm text-green-600 mt-1">
//                       {item.cancellationPolicy.type}
//                     </p>


//                     <p className="text-blue-600 font-bold mt-2 text-lg">
//                       {item.priceRange.currency} {item.priceRange.adult}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;





"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dubaiData from "@/data/dubaiExperiences.json";
import Image from "next/image";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search input state
  const [query, setQuery] = useState(
    searchParams.get("destination") ?? ""
  );

  // Sync search query with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("destination", query);
    else params.delete("destination");

    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [query]);

  // Filter experiences
  const results = dubaiData.experiences.filter((exp) =>
    exp.title.toLowerCase().includes(query.toLowerCase()) ||
    exp.tourType.toLowerCase().includes(query.toLowerCase()) ||
    dubaiData.destination.name.toLowerCase().includes(query.toLowerCase())
  );

  // View toggle synced with URL
  const viewParam = searchParams.get("view");
  const [view, setView] = useState<"grid" | "list">(
    viewParam === "list" ? "list" : "grid"
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [view]);

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-12 pt-8 pb-24">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
        Choose the Tours You’re Interested In
      </h1>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
        {/* Sidebar Filter */}
        <aside className="md:w-1/4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Filter
          </h2>
          <p className="text-sm text-gray-500">
            Filters coming soon…
          </p>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4 flex flex-col gap-6">
          {/* Search + View Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow">
            <input
              type="text"
              placeholder="Search by tour name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-1/2 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`px-4 py-2 rounded-full border transition ${
                  view === "grid"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "border-gray-300 text-gray-700 hover:bg-pink-50"
                }`}
              >
                Grid
              </button>

              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-full border transition ${
                  view === "list"
                    ? "bg-pink-500 text-white border-pink-500"
                    : "border-gray-300 text-gray-700 hover:bg-pink-50"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No experiences found
            </p>
          ) : (
            <div
              className={`pt-6 ${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }`}
            >
              {results.map((item) => (
                <div
                  key={item.experienceId}
                  className={`bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                    view === "list"
                      ? "flex gap-5 p-4 items-center"
                      : "flex flex-col"
                  }`}
                >
                  {/* Image */}
                  <div className={view === "list" ? "shrink-0" : ""}>
                    <Image
                      src={item?.images?.[0] || "/placeholder.jpg"}
                      alt={item.title}
                      width={400}
                      height={250}
                      className={`object-cover rounded-xl ${
                        view === "list"
                          ? "w-56 h-36"
                          : "w-full h-52 rounded-b-none"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 px-1">
                    {/* Meta */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-pink-500">
                        {item.tourType}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
                        ⭐ {item.rating.score}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-2 text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Extra info */}
                    <div className="text-sm text-gray-500 mt-1 space-y-1">
                      <p>{item.destination}</p>
                      <p>{item.duration.total}</p>
                      <p className="text-green-600 font-medium">
                        {item.cancellationPolicy.type}
                      </p>
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-blue-600">
                        {item.priceRange.currency}{" "}
                        {item.priceRange.adult}
                      </p>

                      <button className="text-sm font-semibold text-white bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 transition">
                        View Details
                      </button>
                    </div>
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


