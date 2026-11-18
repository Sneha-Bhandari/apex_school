import { apiGet } from "@/lib/api";
import FAQItem from "./FAQItem";

export default async function FAQSection() {
  let faqs = [];

  try {
    const response = await apiGet("/faqs");

    if (Array.isArray(response)) {
      faqs = response;
    } else if (response && Array.isArray(response.data)) {
      faqs = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch FAQs from API:", error);
  }

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="w-11/12 max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">
            <span className="text-secondary">Frequently</span> Asked Questions
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            We hope this section will help you better understand the key aspects of our school.
          </p>
        </div>

        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={faq.id} 
                faq={faq} 
                defaultOpen={index === 0} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Unable to load FAQs at this time. Please try again later.
          </div>
        )}

      </div>
    </section>
  );
}