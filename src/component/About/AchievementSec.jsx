
import React from "react";
import { apiGet } from "@/lib/api";
import AchievementGallery from "./AchievementGallery";

const AchievementSection = async () => {
  let achievements = [];

  try {
    const response = await apiGet("/achievements");

    achievements = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : [];
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
  }

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">

        <AchievementGallery achievements={achievements} />

      </div>
    </section>
  );
};

export default AchievementSection;
