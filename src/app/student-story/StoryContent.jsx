"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function StoryContent({ stories }) {
  const [activeClub, setActiveClub] = useState("");

  const uniqueClubs = [
    ...new Set(
      stories
        .map((story) => story.club?.name)
        .filter((name) => name !== undefined)
    ),
  ];

  const filteredStories = activeClub
    ? stories.filter((story) => story.club?.name === activeClub)
    : stories;

  return (
    <div className="flex flex-col gap-8 items-start w-11/12 mx-auto">
      <div className="w-1/4 shrink-0">
        <div className="relative w-full mb-2">
          <select
            value={activeClub}
            onChange={(e) => setActiveClub(e.target.value)}
            className="w-full p-3 pl-4 pr-10 rounded-md border border-gray-300 bg-white text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400 appearance-none cursor-pointer shadow-sm"
          >
            <option value="">Student Club Type</option>
            {uniqueClubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
        </div>
      </div>

      <div className="w-full">
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => {
              const storyDate = new Date(story.createdAt).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                }
              );

              return (
                <div
                  key={story.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col group"
                >
                  <Link
                    href={`/student-story/${story.id}`}
                    className="flex flex-col flex-box cursor-pointer"
                  >
                    {/* Image Container with Date Badge */}
                    <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                      {story.featuredImage?.url ? (
                        <Image
                          src={story.featuredImage.url}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="absolute top-0 left-0 bg-primary text-white px-4 py-2 rounded-br-lg font-bold text-sm shadow-md z-10">
                        {storyDate}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="p-4 pt-5 pb-4">
                      {/* Student Name (Optional, acts like a category tag) */}
                      <p className="text-[#FF4B4B] text-xs font-bold uppercase tracking-wider mb-2">
                        {story.studentName}
                      </p>
                      {/* Subtitle */}
                      <p className="text-gray-600 text-sm mb-2 leading-snug line-clamp-2">
                        {story.subTitle ||
                          (story.description
                            ? story.description
                                .replace(/<[^>]+>/g, "")
                                .substring(0, 80) + "..."
                            : "")}
                      </p>

                      {/* Title */}
                      <h3 className="text-[17px] font-bold text-[#1a164c] leading-snug line-clamp-3 transition-colors">
                        {story.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg py-10">
            No student stories available for this club.
          </p>
        )}
      </div>
    </div>
  );
}
