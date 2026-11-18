import AboutBanner from "@/component/About/AboutBanner";
import AchievementSection from "@/component/About/AchievementSec";
import Alumini from "@/component/About/Alumini";
import Team from "@/component/About/Team";

export default function About() {
  return (
    <div className="h-full">
      {/* <HeroSection/> */}
      <AboutBanner/>
      <Alumini/>
      <AchievementSection/>
      <Team/>
    </div>
  );
}
