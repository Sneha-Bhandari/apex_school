import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";

export default async function CtaSection() {
  let homeData = null;

  try {
    homeData = await apiGet("/home-page");
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  // Parse feature actions
  let actions = [];
  try {
    if (homeData?.featureActions) {
      actions =
        typeof homeData.featureActions === "string"
          ? JSON.parse(homeData.featureActions)
          : homeData.featureActions;
    }
  } catch (e) {
    console.error("Failed to parse featureActions:", e);
  }

  const title = homeData?.featureTitle || "Our Philosophy";
  const subtitle = homeData?.featureSubtitle || "";
  const description = homeData?.featureDescription || "";
  const imageUrl = homeData?.featureImage?.url || "";

  return (
    <section className="relative w-full h-[55vh] flex items-center justify-center py-20 px-4">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
        {/* Dark purple/gray overlay similar to the screenshot */}
        <div className="absolute inset-0 bg-[#0f0b29]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-11/12 mx-auto text-center text-white">
        
        {/* Small Label */}
        <p className="text-sm font-semibold tracking-wide text-white mb-2">
          {title}
        </p>

        {/* Main Heading */}
        {subtitle && (
          <div
            className="text-3xl font-bold mb-4 leading-tight prose prose-invert max-w-none prose-headings:text-white prose-p:text-white"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        {/* Description */}
        {description && (
          <div
            className="text-white/90 text-sm leading-relaxed mb-10 max-w-6xl mx-auto prose prose-invert prose-p:mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {actions.map((action, index) => {
              // Primary Button (First action) - Dark Blue/Purple
              if (index === 0) {
                return (
                  <Link
                    key={index}
                    href={action.link}
                    className="inline-block bg-primary text-white font-medium text-sm px-6 py-2.5 rounded-md hover:bg-[#2a246e] transition-colors duration-300"
                  >
                    {action.label}
                  </Link>
                );
              }
              // Secondary Button (Second action) - White
              return (
                <Link
                  key={index}
                  href={action.link}
                  className="inline-block bg-white text-[#1a164c] font-medium text-sm px-6 py-2.5 rounded-md hover:bg-gray-100 transition-colors duration-300"
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}