import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import FAQSection from "@/component/Home/FAQSection";

export const dynamic = "force-dynamic";

export default async function ClubsPage() {
  let clubs = [];
  let heroData = null;

  try {
    const [clubsRes, heroRes] = await Promise.all([
      apiGet("/clubs"),
      apiGet("/clubs-page"),
    ]);

    if (clubsRes && Array.isArray(clubsRes.data)) {
      clubs = clubsRes.data;
    } else if (Array.isArray(clubsRes)) {
      clubs = clubsRes;
    }

    if (heroRes && heroRes.heroTitle) {
      heroData = heroRes;
    } else if (heroRes && heroRes.data) {
      heroData = heroRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch clubs data:", error);
  }

  const title = heroData?.heroTitle || "OUR CLUBS & CIRCLES";
  const subtitle =
    heroData?.heroSubtitle ||
    "Explore our wide range of student clubs and discover your passion today.";
  const imageUrl =
    heroData?.heroImage?.url ||
    "https://backend.apexschoolrupendehi.com/api/upload/images/get-image/543417989_1652199492363831_7004614523786918764_n-uDYw1.jpeg";

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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-wide">
            {title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="py-16 bg-gray-50">
        <div className="w-11/12 mx-auto">
          {clubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="relative h-64 w-full bg-gray-100">
                    {club.image?.url ? (
                      <Image
                        src={club.image.url}
                        alt={club.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-box">
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a164c] mb-2">
                      {club.name}
                    </h3>
                    <div 
                      className="text-gray-600 text-sm text-justify leading-light mb-3 line-clamp-3 prose prose-p:mb-2"
                      dangerouslySetInnerHTML={{ __html: club.description }}
                    />
                    <Link
                      href={`/clubs/${club.id}`}
                      className="inline-flex items-center text-[#FF4B4B] font-medium text-sm  hover:underline"
                    >
                      Read more &gt;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No clubs available at the moment.
            </p>
          )}
        </div>
      </div>
      <FAQSection/>
    </div>
  );
}