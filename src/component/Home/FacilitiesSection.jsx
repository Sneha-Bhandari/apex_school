import { apiGet } from "@/lib/api";
import { 
  FaLaptopCode, FaFlask, FaTheaterMasks, FaBookOpen, 
  FaFutbol, FaBus, FaUtensils, FaMicroscope, FaPalette, FaMusic 
} from "react-icons/fa";

export default async function FacilitiesSection() {
  let data;

  try {
    data = await apiGet("/home-page");
  } catch (error) {
    return (
      <section className="py-16 w-full bg-white text-center">
        <p className="text-gray-600 text-lg">Unable to load facilities section.</p>
      </section>
    );
  }

  const facilitiesTitle = data?.facilitiesTitle || "";
  const facilitiesSubtitle = data?.facilitiesSubtitle || "";
  
  let facilities = [];
  try {
    facilities = data?.facilities ? JSON.parse(data.facilities) : [];
  } catch (e) {
    console.error("Failed to parse facilities data", e);
  }

  const icons = [
    <FaLaptopCode />, 
    <FaFlask />, 
    <FaTheaterMasks />, 
    <FaBookOpen />, 
    <FaFutbol />, 
    <FaBus />, 
    <FaUtensils />, 
    <FaMicroscope />, 
    <FaPalette />, 
    <FaMusic />
  ];

  return (
    <section className="py-12  bg-gray-50">
      <div className="w-11/12 mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-4">
            {facilitiesTitle}
          </h2>
          <p className="text-gray-600 text-md  leading-relaxed whitespace-pre-line">
            {facilitiesSubtitle}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {facilities.map((facility, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm cursor-pointer border border-gray-100 hover:shadow-md transition-color duration-300 flex items-start gap-5 group"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white  transition-colors duration-300">
                {icons[index % icons.length]}
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}