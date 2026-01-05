"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {

  const footerPathname = usePathname();
  const isHomePage = footerPathname === "/";
  const isTourSeachPage = footerPathname === "/search";

  return (
    <footer
      className={`
      w-full px-6 py-8
      ${isHomePage ? "mt-45" : ""}
      ${isTourSeachPage ? "relative mt-35" : ""}

      `}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-3">

        {/* Brand */}
        <div className="text-center md:text-left">
          <Link href="/" className="inline-block hover:text-blue-600">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <Image
                src="/travel-app-logo.avif"
                width={40}
                height={40}
                alt="travel app logo"
                className="rounded-3xl"
              />
              <span className="text-xl font-bold">Voyager</span>
            </div>
          </Link>

          <p className="text-sm text-gray-600 max-w-sm mx-auto md:mx-0">
            Making the world a better place through constructing elegant hierarchies.
          </p>
        </div>

        {/* Terms */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-black mb-3">
            Terms and settings
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Privacy Notice</li>
            <li>Terms of Service</li>
            <li>Accessibility Statement</li>
            <li>Grievance officer</li>
          </ul>
        </div>

        {/* Help */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-black mb-3">
            Need Help?
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Address: Chikhali, Surat</li>
            <li>Contact: +91-0000000000</li>
            <li>Email: info@voyager.com</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
