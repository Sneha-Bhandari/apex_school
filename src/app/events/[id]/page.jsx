import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function SingleEventPage({ params }) {
  const { id } = await params;

  let event = null;

  try {
    const response = await apiGet(`/events/${id}`);

    if (response && response.id) {
      event = response;
    } else if (response && response.data && response.data.id) {
      event = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch event:", error.message);
  }

  if (!event) {
    notFound();
  }

  // Format Date for meta row
  const eventDate = new Date(event.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Full Image at the Top */}
      {event.featuredImage?.url && (
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src={event.featuredImage.url}
            alt={event.title}
            fill
            className="object-cover object-full "
            unoptimized
            priority
          />
          {/* Optional dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content Below the Image */}
      <div className="w-11/12 md:w-11/13 mx-auto py-12">
        
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/events"
            className="inline-flex items-center text-[#FF4B4B] font-medium hover:underline"
          >
            ← Back to Events
          </Link>
        </div>

        {/* Category / Badge */}
        <span className="inline-block bg-[#FF4B4B] text-white text-xs font-semibold px-3 py-2 rounded-full mb-4 uppercase tracking-wider">
          {event.eventType?.name || "Event"}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 leading-tight">
          {event.title}
        </h1>

        {/* Subtitle */}
        {event.subTitle && (
          <p className="text-lg text-gray-600 mb-4">
            {event.subTitle}
          </p>
        )}

        {/* Meta (Date & Location) */}
        <div className="text-gray-500 text-sm flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-300">
          <span className="flex items-center gap-2">
            <FaCalendarAlt /> {eventDate}
          </span>
          {event.locationLabel && (
            <a 
              href={event.locationLink || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FF4B4B] transition-colors"
            >
              <FaMapMarkerAlt /> {event.locationLabel}
            </a>
          )}
        </div>

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none text-justify text-gray-700 prose-headings:text-gray-900 prose-p:mb-4 prose-a:text-[#FF4B4B] prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: event.description || "" }}
        />

        {/* Event Gallery Section */}
        {event.gallery && event.gallery.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#1a164c] mb-8">
              Event Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.gallery.map((image) => (
                <div 
                  key={image.id} 
                  className="relative h-40 md:h-52 rounded-lg overflow-hidden group cursor-pointer shadow-sm"
                >
                  <Image
                    src={image.url}
                    alt="Event Gallery Image"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}