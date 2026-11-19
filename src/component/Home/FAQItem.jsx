"use client";

import { useState } from "react";

export default function FAQItem({ faq, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`
        rounded-xl overflow-hidden transition-all duration-300
        ${isOpen ? "shadow-sm" : "hover:bg-gray-100"}
      `}
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer focus:outline-none group bg-gray-100"
      >
        <span className="text-gray-900 font-medium text-sm md:text-base pr-4">
          {faq.title}
        </span>

        {/* Chevron Icon */}
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Answer Content */}
      <div
        className={`
          grid transition-[grid-template-rows] duration-300 ease-out bg-gray-50
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <div
            className="p-3 md:p-4 pt-0 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-p:mb-2"
            dangerouslySetInnerHTML={{ __html: faq.description }}
          />
        </div>
      </div>
    </div>
  );
}