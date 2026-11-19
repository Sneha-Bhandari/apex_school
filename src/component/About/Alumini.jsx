import React from "react";
import { apiGet } from "@/lib/api";
import AlumniCards from "./AluminiCards";

const Alumini = async () => {
  let aboutData = null;
  let alumniStories = [];

  try {
    const [aboutResult, alumniResult] = await Promise.allSettled([
      apiGet("/about-page"),
      apiGet("/alumni-stories"),
    ]);

    if (aboutResult.status === "fulfilled") {
      aboutData = aboutResult.value;
    } else {
      console.error("Failed to fetch About Page:", aboutResult.reason);
    }

    if (alumniResult.status === "fulfilled") {
      alumniStories = Array.isArray(alumniResult.value?.data)
        ? alumniResult.value.data
        : [];
    } else {
      console.error("Failed to fetch Alumni Stories:", alumniResult.reason);
    }
  } catch (error) {
    console.error("Alumni Section Error:", error);
  }

  const alumniTitle =
    aboutData?.alumniTitle ||
    'Success Stories from <span style="color: #ff2525;">Our Accomplished Alumni</span>';

  const alumniSubtitle =
    aboutData?.alumniSubtitle ||
    "Our alumni have achieved great success in various fields, and their stories serve as inspiration for current and future students.";

  return (
    <section className="w-full bg-[#f8f9fb] py-16 md:py-20 overflow-hidden">
      <div className="max-w-11/12 mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div
            className="text-2xl font-semibold text-[#171717] leading-tight mb-5"
            dangerouslySetInnerHTML={{ __html: alumniTitle }}
          />

          <p className="text-gray-600 text-sm  leading-relaxed">
            {alumniSubtitle}
          </p>
        </div>

        {/* Alumni Cards */}
        <AlumniCards alumniStories={alumniStories} />

      </div>
    </section>
  );
};

export default Alumini;
