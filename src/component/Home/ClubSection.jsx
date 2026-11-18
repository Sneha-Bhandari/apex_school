import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";

export default async function ClubSection() {
  let clubs = [];

  try {
    // Fetch only 3 clubs for the home page
    const response = await apiGet("/clubs?take=3");
    if (response && Array.isArray(response.data)) {
      clubs = response.data;
    } else if (Array.isArray(response)) {
      clubs = response;
    }
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
  }

  return (
    <section className="py-12 bg-[#f8f9fa]">
      <div className="w-11/12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
          <h2 className="text-3xl  font-medium text-gray-900 mb-2">
            Our <span className="text-secondary">Clubs</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Discover your passion and explore our wide range of student clubs and circles.
          </p>
        </div>
        {/* Grid of Clubs */}
        {clubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                {/* Image */}
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

                {/* Content */}
                <div className="p-4 flex flex-col flex-blox">
                  <h3 className="text-xl font-bold text-[#1a164c] mb-2">
                    {club.name}
                  </h3>
                  
                  {/* Description */}
                  <div 
                    className="text-gray-600 text-sm leading-light mb-3 line-clamp-4 prose prose-p:mb-2"
                    dangerouslySetInnerHTML={{ __html: club.description }}
                  />
                  
                  {/* Read More Link */}
                  <Link
                    href={`/clubs/${club.id}`}
                    className="inline-flex items-center text-secondary font-medium text-sm mt-auto"
                  >
                    Read more &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No clubs available.</p>
        )}

        {/* View All Button */}
        {clubs.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/clubs"
              className="inline-block bg-[#1a164c] text-white font-medium px-5 py-2 text-sm rounded-full hover:bg-[#2a246e] transition-colors duration-300"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}