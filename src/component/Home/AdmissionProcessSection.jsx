import Image from "next/image";
import { apiGet } from "@/lib/api";

export default async function AdmissionProcessSection() {
  let homeData;
  let processData;

  try {
    // Fetch both APIs concurrently for better performance
    const [homeRes, processRes] = await Promise.all([
      apiGet("/home-page"),
      apiGet("/admission-processes"),
    ]);
    homeData = homeRes;
    processData = processRes;
  } catch (error) {
    return (
      <section className="py-16 w-full bg-white text-center">
        <p className="text-gray-600 text-lg">Unable to load admission process.</p>
      </section>
    );
  }

  const admissionTitle = homeData?.admissionProcessTitle || "";
  
  // Extract the steps array and reverse it so Step 1 (Inquiry) comes first.
  // The API returns them newest first, but logically we want oldest first.
  const steps = processData?.data ? [...processData.data].reverse() : [];

  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 mx-auto">
        
        {/* Header */}
        <div 
          className="text-center text-2xl md:text-3xl font-medium text-gray-900 md:mb-12"
          dangerouslySetInnerHTML={{ __html: admissionTitle }}
        />

        {/* Timeline Steps */}
        <div className="relative space-y-12 md:space-y-24">
          
          {/* Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={step.id} 
                className={`relative flex flex-col md:flex-row items-center justify-between z-10 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Text Content */}
                <div className={`w-full md:w-[45%] ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} mb-6 md:mb-0`}>
                  <span className="text-primary font-bold text-lg mb-2 block">
                    Step {index + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <div 
                    className="text-gray-600 text-sm md:text-base leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>

                {/* Center Number Circle (Desktop only) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white items-center justify-center font-bold text-lg shadow-lg border-4 border-white">
                  {index + 1}
                </div>

                {/* Image */}
                <div className="w-full md:w-[45%] h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-md">
                  {step.image?.url ? (
                    <Image
                      src={step.image.url}
                      alt={step.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}