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
    if (homeData?.heroActions) {
      actions =
        typeof homeData.heroActions === "string"
          ? JSON.parse(homeData.heroActions)
          : homeData.heroActions;
    }
  } catch (e) {
    console.error("Failed to parse hero Actions:", e);
  }

  const title = homeData?.featureTitle || "Our Philosophy";
  const subtitle = homeData?.featureSubtitle || "";
  const description = homeData?.featureDescription || "";
  const imageUrl = homeData?.featureImage?.url || "";

  return (
    <section className="relative w-full min-h-[40vh] md:min-h-[65vh] flex items-center justify-center py-16 md:py-24 px-4 overflow-hidden">
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
        {/* Dark purple/gray overlay */}
        <div className="absolute inset-0 bg-[#0f0b29]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-11/12 max-w-6xl mx-auto text-center text-white">
        
        {/* Small Label */}
        <p className="text-xs md:text-sm font-semibold tracking-wider md:tracking-wide text-white/90 uppercase mb-2 md:mb-3">
          {title}
        </p>

        {/* Main Heading */}
        {subtitle && (
          <div
            className="text-4xl font-bold mb-4 md:mb-6 leading-tight md:leading-tight prose prose-invert max-w-none prose-headings:text-white prose-p:text-white prose-p:mb-0"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        {/* Description */}
        {description && (
          <div
            className="text-white/80 text-sm leading-relaxed mb-8 md:mb-10 max-w-4xl mx-auto prose prose-invert prose-p:mb-3 md:prose-p:mb-4 prose-p:last:mb-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            {actions.map((action, index) => {
              // Primary Button (First action)
              if (index === 0) {
                return (
                  <Link
                    key={index}
                    href={action.link}
                    className="w-full sm:w-auto inline-block bg-primary text-white font-medium text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-md hover:bg-[#2a246e] transition-colors duration-300"
                  >
                    {action.label}
                  </Link>
                );
              }
              // Secondary Button (Other actions)
              return (
                <Link
                  key={index}
                  href={action.link}
                  className="w-full sm:w-auto inline-block bg-white text-[#1a164c] font-medium text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-md hover:bg-gray-100 transition-colors duration-300"
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