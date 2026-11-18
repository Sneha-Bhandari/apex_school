import Image from "next/image";
import { apiGet } from "@/lib/api";
import { FiCheckCircle } from "react-icons/fi";

export default async function WhyChooseUsSection() {
  let data;

  try {
    data = await apiGet("/home-page");
  } catch (error) {
    return (
      <section className="py-16 w-full bg-white text-center">
        <p className="text-gray-600 text-lg">Unable to load Why Choose Us section.</p>
      </section>
    );
  }

  const benefitTitle = data?.benefitTitle || "";
  const benefitDescription = data?.benefitDescription || "";
  const benefitImage = data?.benefitImage?.url || null;

  // Safely parse the benefits JSON string
  let benefits = [];
  try {
    benefits = data?.benefits ? JSON.parse(data.benefits) : [];
  } catch (e) {
    console.error("Failed to parse benefits data", e);
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="w-11/12 mx-auto">
        
        {/* Header Section - Matched to FacilitiesSection styling */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div 
            className="text-2xl md:text-4xl font-medium text-gray-900 mb-4"
            dangerouslySetInnerHTML={{ __html: benefitTitle }}
          />
          <div 
            className="text-gray-600 text-md leading-relaxed"
            dangerouslySetInnerHTML={{ __html: benefitDescription }}
          />
        </div>

        {/* Content: Image on Left, Benefits on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* Image Side */}
          <div className="relative w-full h-[55vh] md:h-[65vh] rounded-xl overflow-hidden shadow-lg">
            {benefitImage ? (
              <Image
                src={benefitImage}
                alt="Why Choose Us"
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

          {/* Benefits List Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 text-xl">
                  <FiCheckCircle />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}