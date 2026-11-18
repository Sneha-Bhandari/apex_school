"use client";

import React, { useRef, useState, useEffect } from "react";
import { Quote, X, ChevronLeft, ChevronRight } from "lucide-react";

const AlumniCard = ({ alumni, onReadMore }) => {
    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 pt-10 pb-6 px-6 flex flex-col h-full">

            {/* Quote Icon - Fully Inside Card */}
            <div className="absolute top-3 right-6 z-10 bg-white p-2 rounded-full">
                <Quote
                    size={34}
                    strokeWidth={2}
                    className="text-[#F0444D]"
                />
            </div>

            {/* Alumni Information */}
            <div className="flex items-center gap-4 mt-3 mb-5">
                <div className="relative w-16 h-16 shrink-0 rounded-full bg-gray-100 border-2 border-[#222052]/10 overflow-hidden flex items-center justify-center">
                    {alumni.featuredImage?.url && (
                        <img
                            src={alumni.featuredImage.url}
                            alt={alumni.alumniName || "Alumni"}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[#172033]">
                        {alumni.alumniName}
                    </h3>

                    {alumni.title && (
                        <p className="text-xs mb-1 text-gray-500 mt-1">
                            {alumni.title}
                        </p>
                    )}

                    {alumni.subTitle && (
                        <p className="text-xs text-gray-500">
                            {alumni.subTitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Short Description */}
            <div className="grow">
                <p className="text-[#475569] text-sm leading-6 line-clamp-8 text-justify">
                    {alumni.description?.replace(/^["']|["']$/g, "")}
                </p>
            </div>

            {/* Read More */}
            <div className="border-gray-100">
                <button
                    type="button"
                    onClick={() => onReadMore(alumni)}
                    className="inline-flex items-center gap-2 mt-3 text-red-500 underline underline-offset-2 cursor-pointer font-semibold text-sm hover:text-[#F0444D] transition-colors duration-300"
                >
                    Read More
                </button>
            </div>
        </div>
    );
};


const AlumniPopup = ({ alumni, onClose }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (!alumni) return null;

    const description =
        alumni.description?.replace(/^["']|["']$/g, "") || "";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="alumni-modal-title"
                className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close popup"
                    className="sticky top-4 float-right mr-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-[#F0444D] hover:text-white transition-all duration-300"
                >
                    <X size={21} />
                </button>

                <div className="px-6 sm:px-10 pt-10 pb-10">

                    {/* Profile */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
                        <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-[#222052]/10 bg-gray-100">
                            {alumni.featuredImage?.url && (
                                <img
                                    src={alumni.featuredImage.url}
                                    alt={alumni.alumniName || "Alumni"}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="text-center sm:text-left pt-2">
                            <span className="text-xs font-bold uppercase tracking-[3px] text-[#F0444D]">
                                Alumni Success Story
                            </span>

                            <h2
                                id="alumni-modal-title"
                                className="text-2xl sm:text-2xl font-semibold text-[#172033] mt-2"
                            >
                                {alumni.alumniName}
                            </h2>

                            {alumni.title && (
                                <p className="text-gray-600 mt-1">
                                    {alumni.title}
                                </p>
                            )}

                            {alumni.subTitle && (
                                <p className="text-gray-500 text-sm mt-1">
                                    {alumni.subTitle}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="w-16 h-1 rounded-full bg-[#F0444D] mb-7" />

                    {/* Full Description */}
                    <div className="flex gap-3 mb-4">
                        <Quote
                            size={28}
                            className="text-[#222052]/25 shrink-0"
                        />

                        <h3 className="text-lg font-semibold text-[#172033]">
                            Their Journey & Experience
                        </h3>
                    </div>

                    <div className="text-gray-600 text-[15px] sm:text-base leading-8 whitespace-pre-line wrap-break-words">
                        {description}
                    </div>

                  
                </div>
            </div>
        </div>
    );
};


const AlumniCards = ({ alumniStories = [] }) => {
    const sliderRef = useRef(null);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const count = alumniStories.length;

    // Automatic Carousel Sliding
    useEffect(() => {
        if (count <= 3 || selectedAlumni) return;

        const slider = sliderRef.current;

        if (!slider) return;

        const interval = setInterval(() => {
            const firstCard = slider.querySelector(".alumni-slide");

            if (!firstCard) return;

            const cardWidth = firstCard.getBoundingClientRect().width;
            const gap = 24;
            const scrollAmount = cardWidth + gap;

            const maxScroll =
                slider.scrollWidth - slider.clientWidth;

            if (slider.scrollLeft + scrollAmount >= maxScroll - 5) {
                slider.scrollTo({
                    left: 0,
                    behavior: "smooth",
                });
            } else {
                slider.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [count, selectedAlumni]);

    // Manual Navigation
    const scrollSlider = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const firstCard = slider.querySelector(".alumni-slide");
        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 24;
        const scrollAmount = cardWidth + gap;

        slider.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    if (count === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                    No alumni stories available at the moment.
                </p>
            </div>
        );
    }

    const renderCards = (stories) =>
        stories.map((alumni) => (
            <AlumniCard
                key={alumni.id}
                alumni={alumni}
                onReadMore={setSelectedAlumni}
            />
        ));

    return (
        <>
            {/* One or Two Alumni */}
            {count <= 2 && (
                <div
                    className={`grid grid-cols-1 ${
                        count === 2 ? "md:grid-cols-2" : ""
                    } gap-7 w-full mx-auto`}
                >
                    {renderCards(alumniStories)}
                </div>
            )}

            {/* Three Alumni */}
            {count === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                    {renderCards(alumniStories)}
                </div>
            )}

            {/* More Than Three: Automatic Slider */}
            {count > 3 && (
                <div className="relative w-full">

                    {/* Left Arrow */}
                    <button
                        type="button"
                        onClick={() => scrollSlider("prev")}
                        aria-label="Previous alumni"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#222052] hover:bg-[#F0444D] hover:text-white transition-all duration-300"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        type="button"
                        onClick={() => scrollSlider("next")}
                        aria-label="Next alumni"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#222052] hover:bg-[#F0444D] hover:text-white transition-all duration-300"
                    >
                        <ChevronRight size={22} />
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex items-stretch gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-6"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {alumniStories.map((alumni) => (
                            <div
                                key={alumni.id}
                                className="alumni-slide shrink-0 w-[88%] sm:w-[48%] lg:w-[32%] snap-start"
                            >
                                <AlumniCard
                                    alumni={alumni}
                                    onReadMore={setSelectedAlumni}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Carousel Indicator */}
                    <div className="flex justify-center mt-4">
                        <div className="w-12 h-1.5 rounded-full bg-[#F0444D]" />
                    </div>
                </div>
            )}

            {/* Full Story Popup */}
            {selectedAlumni && (
                <AlumniPopup
                    alumni={selectedAlumni}
                    onClose={() => setSelectedAlumni(null)}
                />
            )}
        </>
    );
};

export default AlumniCards;