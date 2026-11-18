import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import FAQSection from "@/component/Home/FAQSection";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let events = [];
  let heroData = null;

  try {
    const [eventsRes, heroRes] = await Promise.all([
      apiGet("/events"),
      apiGet("/events-page"),
    ]);

    if (eventsRes && Array.isArray(eventsRes.data)) {
      events = eventsRes.data;
    } else if (Array.isArray(eventsRes)) {
      events = eventsRes;
    }

    if (heroRes && heroRes.heroTitle) {
      heroData = heroRes;
    } else if (heroRes && heroRes.data) {
      heroData = heroRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch events data:", error);
  }

  const title = heroData?.heroTitle || "Events & Programs";
  const subtitle = heroData?.heroSubtitle || "Welcome to our events";
  const imageUrl =
    heroData?.heroImage?.url ||
    "https://backend.apexschoolrupendehi.com/api/upload/images/get-image/screenshot-2026-10-15-at-110701-PwU_5.png";

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
        <div className="relative w-11/12  mx-auto text-center z-10">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-wide">
            {title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="py-16 bg-gray-50">
        <div className="w-11/12  mx-auto">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
                // Alternate colors for the badges based on index
                const isEven = index % 2 === 0;
                const dateBg = isEven ? "bg-[#fbc02d]" : "bg-[#1a164c]";
                const dateText = isEven ? "text-[#1a164c]" : "text-white";
                const locBg = isEven ? "bg-[#fbc02d]" : "bg-[#1a164c]";
                const locText = isEven ? "text-[#1a164c]" : "text-white";

                // Format date for the badge (e.g., "15 Oct")
                const eventDate = new Date(event.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                });

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col group"
                  >
                    {/* Clickable Area: Image and Main Content */}
                    <Link href={`/events/${event.id}`} className="flex flex-col flex-box cursor-pointer">
                      {/* Image Container with Date Badge */}
                      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                        {event.featuredImage?.url ? (
                          <Image
                            src={event.featuredImage.url}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        
                        {/* Date Badge */}
                        <div className={`absolute top-0 left-0 ${dateBg} ${dateText} px-4 py-2 rounded-b-lg font-semibold text-sm shadow-md z-10`}>
                          {eventDate}
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="p-5 pb-3">
                        {/* Subtitle */}
                        <p className="text-gray-500 text-sm mb-2 leading-snug line-clamp-2">
                          {event.subTitle || event.description.replace(/<[^>]+>/g, '').substring(0, 80) + '...'}
                        </p>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2 leading-tight group-hover:text-[#FF4B4B] transition-colors">
                          {event.title}
                        </h3>
                      </div>
                    </Link>

                    {/* Non-Clickable Area: Location Badge */}
                    <div className="px-4 pb-2 md:pb-5 ">
                      <a
                        href={event.locationLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 ${locBg} ${locText} font-medium text-xs px-3 py-2 rounded-full hover:opacity-90 transition-opacity`}
                      >
                        <FaMapMarkerAlt className="text-lg" />
                        {event.locationLabel || "Apex School"}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No events available at the moment.
            </p>
          )}
        </div>
      </div>

      <FAQSection/>
    </div>
  );
}