
import React from "react";
import { apiGet } from "@/lib/api";

const AboutBanner = async () => {
  let aboutData = null;

  try {
    aboutData = await apiGet("/about-page");
  } catch (error) {
    console.error("Failed to fetch About Page:", error);
  }

  // Hero Data
  const title = aboutData?.heroTitle || "About Us";
  const videoUrl = aboutData?.heroVideo?.url;
  const heroImage = aboutData?.heroImage?.url;

  // Principal Data
  const messageTitle =
    aboutData?.messageTitle || "FROM THE PRINCIPAL'S DESK";

  const principalName = aboutData?.principalName || "Principal";

  const principalMessage = aboutData?.principalMessage;

  const principalImage = aboutData?.principalImage?.url;

  return (
    <>
      <section className="relative w-full h-75 sm:h-87.5 md:h-103.75 overflow-hidden flex items-center justify-center">

        {videoUrl ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage || undefined}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : heroImage ? (
          <img
            src={heroImage}
            alt="About Apex School"
            className="absolute inset-0 w-full h-full object-cover"
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
        </div>
      </section>

      <section className="relative bg-[#fafafa] py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">

        <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <div className="lg:col-span-7">

              {/* Section Label */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-0.5 bg-[#F0444D] shrink-0"></span>

                <p className="text-[#F0444D] text-sm font-semibold tracking-[2px] uppercase">
                  {messageTitle}
                </p>
              </div>

              {/* Principal Name */}
              <h2 className="text-2xl sm:text-2xl lg:text-[30px] font-bold text-[#171717] leading-tight mb-6">
                {principalName}
              </h2>

              {/* Principal Message */}
              {principalMessage && (
                <div
                  className="
                    text-[#555555]
                    text-base
                    md:text-[16px]
                    leading-[1.9]
                    text-justify
                    font-normal
                    [&_p]:mb-0
                  "
                  dangerouslySetInnerHTML={{
                    __html: principalMessage,
                  }}
                />
              )}

            </div>

            {/* RIGHT: PRINCIPAL IMAGE */}
            <div className="lg:col-span-5 relative">

              {/* Decorative Background */}
              <div className="absolute -top-5 -right-5 w-32 h-32 bg-[#F0444D]/10 rounded-full blur-2xl"></div>

              <div className="relative">

                {/* Principal Image */}
                {principalImage ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={principalImage}
                      alt={principalName}
                      className="w-full h-105 sm:h-125  lg:h-120  object-cover object-center transition-transform duration-700 hover:scale-[1.03]
                      "
                    />
                  </div>
                ) : (
                  <div className="w-full h-105 sm:h-125 lg:h-140 bg-gray-200 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-500">
                      Principal Image
                    </p>
                  </div>
                )}

               
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutBanner;
