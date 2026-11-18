
import React from "react";
import Image from "next/image";
import { apiGet } from "@/lib/api"; 

const ContactBanner = async () => {
  let contactData = null;

  try {
    contactData = await apiGet("/contact-page");
  } catch (error) {
    console.error("Failed to fetch contact page:", error);
  }

  const title = contactData?.heroTitle || "Contact & Feedback";
  const subtitle = contactData?.heroSubtitle || 'We value open communication and suggestion from you....'
  const heroImage = contactData?.heroImage?.url;

  return (
    <section className="relative w-full h-75 sm:h-87.5 md:h-103.75 overflow-hidden flex items-center justify-center">

      {/* Background Image */}
      {heroImage ? (
        <Image
          src={heroImage}
          alt="Contact Apex School"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#222052]" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#101126]/70" />

      {/* Hero Title */}
      <div className="relative z-10 w-full px-4 text-center">
        <h1 className="text-white text-3xl sm:text-3xl md:text-[30px] font-semibold leading-tight">
          {title}
        </h1>
         <h1 className="text-gray-200 w-8/12 mx-auto mt-3 leading-relaxed text-md ">
          {subtitle}
        </h1>
      </div>
    </section>
  );
};

export default ContactBanner;
