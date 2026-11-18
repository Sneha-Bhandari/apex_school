import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SingleClubPage({ params }) {
  const { id } = await params;

  let club = null;

  try {
    const response = await apiGet(`/clubs/${id}`);

    if (response && response.id) {
      club = response;
    } else if (response && response.data && response.data.id) {
      club = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch club:", error.message);
  }

  if (!club) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Full Image at the Top */}
      {club.image?.url && (
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src={club.image.url}
            alt={club.name}
            fill
            className="object-cover"
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
            href="/clubs"
            className="inline-flex items-center text-[#FF4B4B] font-medium hover:underline"
          >
            ← Back to Clubs
          </Link>
        </div>

        {/* Category / Badge */}
        <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-2 rounded-full mb-4 uppercase tracking-wider">
          Club & Circle
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
          {club.name}
        </h1>

        {/* Meta (Estd Date) */}
        {club.estdOn && (
          <div className="text-gray-500 text-sm flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
            <span>
              Established:{" "}
              {new Date(club.estdOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {/* Main Content */}
        <div
          className="prose prose-lg max-w-none text-justify text-gray-700 prose-headings:text-gray-900 prose-p:mb-4 prose-a:text-[#FF4B4B] prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: club.description || "" }}
        />
        
      </div>
    </div>
  );
}