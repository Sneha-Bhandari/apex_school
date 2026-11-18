import AdmissionProcessSection from "@/component/Home/AdmissionProcessSection";
import BlogSection from "@/component/Home/BlogSection";
import ClubSection from "@/component/Home/ClubSection";
import CtaSection from "@/component/Home/CtaSection";
import FacilitiesSection from "@/component/Home/FacilitiesSection";
import FAQSection from "@/component/Home/FAQSection";
import HeroSection from "@/component/Home/HeroSection";
import PhilosophySection from "@/component/Home/PhilosophySection";
import WhyChooseUsSection from "@/component/Home/WhyChooseUsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <HeroSection/>
      <PhilosophySection/>
      <FacilitiesSection/>
      <AdmissionProcessSection/>
      <WhyChooseUsSection/>
      <BlogSection/>
      <CtaSection/>
      <ClubSection/>
      <FAQSection/>
    </div>
  );
}
