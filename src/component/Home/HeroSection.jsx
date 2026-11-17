// import Link from "next/link";
// import Image from "next/image";
// import { apiGet } from "@/lib/api";

// export default async function HeroSection() {
//   let hero = null;

//   try {
//     const data = await apiGet("/hero-section");

//     if (data && data.length > 0) {
//       hero = data[0];
//     }
//   } catch (error) {
//     console.error("Failed to fetch hero section:", error);
//   }

//   // Error or no data
//   if (!hero) {
//     return (
//       <section className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-gray-100">
//         <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
//       </section>
//     );
//   }

//   return (
//     <section className="relative flex min-h-[calc(100vh-5rem)] w-full items-center overflow-hidden">

//       {/* Background image */}
//       {hero.image?.imageUrl && (
//         <Image
//           src={hero.image.imageUrl}
//           alt={hero.title || "Hero image"}
//           fill
//           priority
//           unoptimized
//           className="object-cover object-center"
//         />
//       )}

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-linear-to-r from-black/55 to-black/20" />

//       {/* Content */}
//       <div className="relative mx-auto w-11/12 py-16">
//         <div className="max-w-2xl">

//           {/* Title */}
//           {hero.title && (
//             <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white lg:text-6xl">
//               {hero.title}
//             </h1>
//           )}

//           {/* Subtitle */}
//           {hero.subTitle && (
//             <h2 className="mt-3 text-4xl font-semibold text-secondary">
//               {hero.subTitle}
//             </h2>
//           )}

//           {/* Description */}
//           {hero.description && (
//             <div
//               className="prose prose-invert mt-5 max-w-xl text-base leading-relaxed text-white"
//               dangerouslySetInnerHTML={{
//                 __html: hero.description,
//               }}
//             />
//           )}

//           {/* Buttons */}
//           <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//             <Link
//               href="/tours"
//               className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-700"
//             >
//               Book a Ride
//               <span aria-hidden>→</span>
//             </Link>

//             <Link
//               href="/fleet"
//               className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
//             >
//               View Our Fleet
//             </Link>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

export default function HeroSection(){
return(
  <div>
    hero section
  </div>
)
}
