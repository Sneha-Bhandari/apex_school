"use client";

import React, { useState } from "react";
import {
  X,

  Image as ImageIcon,
} from "lucide-react";

const AchievementGallery = ({ achievements = [] }) => {
  const [activeTab, setActiveTab] = useState("Academic");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const getImageUrl = (image) => {
    if (!image) return null;
    if (typeof image === "string") return image;
    return image.url || image.imageUrl || null;
  };

  const filteredAchievements = achievements.filter((item) => {
    return (
      item.category?.toLowerCase() === activeTab.toLowerCase() ||
      item.type?.toLowerCase() === activeTab.toLowerCase()
    );
  });

  const displayedAchievements = showAll
    ? filteredAchievements
    : filteredAchievements.slice(0, 3);

  const getGalleryImages = (item) => {
    const images = item.gallery || item.images || [];
    const gallery = images
      .map((image) => getImageUrl(image))
      .filter(Boolean);

    const featured = getImageUrl(item.featuredImage || item.image);

    return [
      ...(featured ? [featured] : []),
      ...gallery.filter((url) => url !== featured),
    ];
  };

  const openAchievement = (item) => {
    setSelectedAchievement(item);
    setActiveImage(0);
  };

  const closeAchievement = () => {
    setSelectedAchievement(null);
    setActiveImage(0);
  };

  const nextImage = () => {
    const images = getGalleryImages(selectedAchievement);
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    const images = getGalleryImages(selectedAchievement);
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7 mb-12 w-11/12 mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-black">
            Our <span className="text-red-500">Achievements</span>
          </h2>

          <p className="text-gray-600 mt-2 text-sm">
            Building a legacy of academic and personal growth.
          </p>
        </div>

        <div className="inline-flex items-center gap-2  self-start lg:self-auto">
          {["Academic", "ECA"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`relative px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#222052] text-white shadow-md"
                  : "text-gray-500 hover:text-[#222052] hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredAchievements.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto">
            {displayedAchievements.map((item) => {
              const image = getImageUrl(
                item.featuredImage || item.image
              );

              return (
                <article
                  key={item.id}
                  className="group bg-white overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-60 sm:h-70 overflow-hidden bg-gray-100">
                    {image ? (
                      <img
                        src={image}
                        alt={item.title || "School achievement"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon
                          size={40}
                          className="text-gray-300"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-md leading-relaxed font-semibold mb-2 line-clamp-2 transition-colors">
                      {item.title}
                    </h3>

                    <p
                      className="text-gray-600 text-[14px] text-justify leading-relaxed line-clamp-3 mb-6"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />

                    <button
                      onClick={() => openAchievement(item)}
                      className="inline-flex items-center gap-2 text-sm underline underline-offset-2 font-semibold hover:text-[#F0444D] text-red-500 cursor-pointer transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

        
          {filteredAchievements.length > 3 && (
            <div className="w-11/12 mx-auto mt-8 flex justify-start">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-6 py-3 cursor-pointer hover:bg-[#222052] bg-blue-900 text-white text-sm font-semibold rounded-lg  transition-all duration-300"
              >
                {showAll ? "Show Less" : "Show More"}

             
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <ImageIcon
            size={42}
            className="mx-auto text-gray-300 mb-4"
          />

          <h3 className="text-xl font-semibold text-gray-700">
            No {activeTab} Achievements Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Please check back soon for our latest achievements.
          </p>
        </div>
      )}

     {selectedAchievement &&
        (() => {
          const galleryImages = (
            selectedAchievement.achievementGallery ||
            selectedAchievement.gallery ||
            selectedAchievement.images ||
            []
          )
            .map((image) => getImageUrl(image))
            .filter(Boolean);

          return (
            <div
              className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
              onClick={closeAchievement}
            >
              <div
                className="bg-white w-8/12 max-h-[90vh] overflow-y-auto rounded-2xl relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeAchievement}
                  className="sticky top-4 float-right mr-4 z-30 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:bg-[#F0444D] hover:text-white transition-colors duration-300"
                  aria-label="Close achievement"
                >
                  <X size={22} />
                </button>

                <div className="px-6 sm:px-10 pt-10 pb-10">
                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] leading-tight mb-3">
                    {selectedAchievement.title}
                  </h2>

                  {/* Subtitle */}
                  {selectedAchievement.subTitle && (
                    <p className="text-gray-500 text-sm sm:text-base mb-5">
                      {selectedAchievement.subTitle}
                    </p>
                  )}

                  <div className="w-16 h-1 bg-[#F0444D] rounded-full mb-7" />

                  {/* Description */}
                  <div
                    className="text-gray-600 text-[15px] sm:text-base leading-8 whitespace-pre-line mb-8"
                    dangerouslySetInnerHTML={{
                      __html: selectedAchievement.description,
                    }}
                  />

                  {/* Achievement Gallery Images — medium size grid */}
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden bg-gray-100"
                        >
                          <img
                            src={image}
                            alt={`${selectedAchievement.title} - image ${index + 1}`}
                            className="w-full h-56 sm:h-60 object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
};

export default AchievementGallery;