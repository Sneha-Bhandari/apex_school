import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api";

export default async function PhilosophySection() {
  let data;

  try {
    data = await apiGet("/home-page");
  } catch (error) {
    return (
      <section className="py-16 w-full bg-white text-center">
        <p className="text-gray-600 text-lg">Unable to load philosophy section.</p>
      </section>
    );
  }

  const featureTitle = data?.featureTitle || "";
  const featureSubtitle = data?.featureSubtitle || "";
  const featureDescription = data?.featureDescription || "";
  const featureActions = data?.featureActions ? JSON.parse(data.featureActions) : [];
  const featureImage = data?.featureImage?.url || null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <div className="flex flex-col justify-center">
          
          {/* Changed text-[#F4C430] to text-yellow */}
          <h4 className="text-yellow text-lg font-semibold tracking-wide mb-1">
            {featureTitle}
          </h4>

          <h2 
            className="text-3xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: featureSubtitle }}
          />

          <div 
            className="text-gray-700 text-[16px] leading-relaxed space-y-4 mb-8 text-justify"
            dangerouslySetInnerHTML={{ __html: featureDescription }}
          />

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {featureActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className={
                  index === 0
                    ? "px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300"
                    : "px-6 py-2 rounded-md border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative w-full h-[70vh] md:h-[60vh] rounded-xl overflow-hidden shadow-lg">
          {featureImage ? (
            <Image
              src={featureImage}
              alt="Apex School Philosophy"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

      </div>
    </section>
  );
}