import Image from "next/image";
import { apiGet } from "@/lib/api";
import FAQSection from "@/component/Home/FAQSection";
import StoryContent from "./StoryContent"; 

export const dynamic = "force-dynamic";

export default async function StudentStoriesPage() {
  let stories = [];
  let heroData = null;

  try {
    const [storiesRes, heroRes] = await Promise.all([
      apiGet("/student-stories"),
      apiGet("/student-stories-page"),
    ]);

    if (storiesRes && Array.isArray(storiesRes.data)) {
      stories = storiesRes.data;
    } else if (Array.isArray(storiesRes)) {
      stories = storiesRes;
    }

    if (heroRes && heroRes.heroTitle) {
      heroData = heroRes;
    } else if (heroRes && heroRes.data) {
      heroData = heroRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch student stories data:", error);
  }

  const title = heroData?.heroTitle || "Student Stories";
  const subtitle = heroData?.heroSubtitle || "Celebrating the achievements of our students";
  const imageUrl =
    heroData?.heroImage?.url ||
    "https://backend.apexschoolrupendehi.com/api/upload/images/get-image/screenshot-2026-10-15-at-112357-fH07A.png";

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Banner */}
      <div className="relative bg-gray-900 text-white h-[55vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center opacity-40"
            unoptimized
            priority
          />
        </div>
        <div className="relative w-11/12 mx-auto text-center z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-wide">
            {title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-12 bg-gray-50 min-h-[60vh]">
        {/* Pass stories down to the layout component */}
        <StoryContent stories={stories} />
      </div>

      <FAQSection/>
    </div>
  );
}