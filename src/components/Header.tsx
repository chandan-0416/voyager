// import Image from "next/image"
// import Link from "next/link"

// export default function Header() {
//     return (
//         <div className="relative w-full h-25 p-4">

//             <div className="flex justify-between items-center">

//                 <Link href="/" className="hover:text-blue-600">
//                     <div className="flex gap-2 m-2">
//                         <Image
//                             className="rounded-3xl"
//                             src="/travel-app-logo.avif"
//                             width="40"
//                             height="40"
//                             alt="travel app logo"
//                         />
//                         <h1 className="text-xl font-bold mt-2  w-px h-6 bg-black">Voyager</h1>
//                     </div>
//                 </Link>

//                 <div className="flex m-4 p-2 gap-16">
//                     <Link href="/" className="hover:text-blue-600 font-semibold">Home</Link>
//                     <Link href="/trip" className="hover:text-blue-600 font-semibold">Plan a trip</Link>
//                     <Link href="/about" className="hover:text-blue-600 font-semibold">About</Link>
//                     <Link href="/profile" className="hover:text-blue-600 font-semibold">Profile</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }


// Responsive

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/travel-app-logo.avif"
            width={40}
            height={40}
            alt="travel app logo"
            className="rounded-3xl"
          />
          <span className="text-xl font-bold">Voyager</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 font-semibold">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/trip" className="hover:text-blue-600">Plan a trip</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/profile" className="hover:text-blue-600">Profile</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 px-4 font-semibold">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/trip" onClick={() => setOpen(false)}>Plan a trip</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
        </nav>
      )}
    </header>
  );
}
