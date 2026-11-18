import Link from "next/link";
import Image from "next/image";
import { apiGet } from "@/lib/api"; 

export default async function HeroSection() {
  let data;

  try {
    data = await apiGet("/home-page");
  } catch (error) {
    return (
      <section className="relative h-[85vh] w-full bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg">Unable to load hero section.</p>
      </section>
    );
  }

  const heroTitle = data?.heroTitle || "";
  const heroDescription = data?.heroDescription || "";
  const heroActions = data?.heroActions ? JSON.parse(data.heroActions) : [];
  const heroVideo = data?.heroVideo?.url || null;
  const heroImage = data?.heroImage?.url || null;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {heroVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none" 
          poster={heroImage || ""} 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : heroImage ? (
        <Image
          src={heroImage}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
      ) : null}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 max-w-5xl mx-auto">
        
        <div
          className="text-white text-3xl sm:text-4xl md:text-6xl  font-semibold leading-[1.15] md:leading-tight mb-6"
          dangerouslySetInnerHTML={{ __html: heroTitle }}
        />

        <div
          className="text-white text-sm  leading-[1.6] md:leading-[1.8] mb-10 max-w-11/12 mx-auto font-normal"
          dangerouslySetInnerHTML={{ __html: heroDescription }}
        />

        <div className="flex flex-wrap gap-4 justify-center">
          {heroActions.map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className="px-8 py-2.5 rounded-full border border-white text-white font-medium text-sm hover:bg-primary hover:text-white transition-all duration-500 ease-in-out"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}