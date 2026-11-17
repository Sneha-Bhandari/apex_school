"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Student Story", href: "/student-story" },
    { name: "Clubs", href: "/clubs" },
    { name: "Curriculum", href: "/curriculum" },
    { name: "Admission", href: "/admission" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-11/12 mx-auto py-2 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image 
            src="/apex-logo.png" 
            alt="Apex School Logo" 
            width={80} 
            height={80} 
            className="object-contain"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-[16px] font-medium text-gray-800">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-red-500 ${
                  link.active ? "text-red-500" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="lg:hidden text-gray-800 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-lg">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-[16px] font-medium text-gray-800">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block w-full transition-colors hover:text-red-500 ${
                    link.active ? "text-red-500" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}