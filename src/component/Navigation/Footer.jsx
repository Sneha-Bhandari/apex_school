// import Link from "next/link";
// import Image from "next/image";
// import {
//   FaFacebook,
//   FaLinkedin,
//   FaInstagram,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaCaretRight,
// } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="w-full font-sans">
//       {/* Main Footer Area */}
//       <div className="bg-primary text-white pt-16 pb-20">
//         <div className=" mx-auto w-11/12">
//           {/* Newsletter Section */}
//           <div className="grid grid-cols-2 w-full  gap-4 items-center justify-between mb-6">
//             <div>
//               <span className="inline-block bg-[#ffd659] text-[#d32f2f] font-medium px-6 py-2.5 rounded-md text-xs mb-4">
//                 Our Newsletter
//               </span>
//               <h2 className="text-2xl font-bold tracking-wide">
//                 Get Regular <span className="text-[#ffd659]">Updates</span>
//               </h2>
//             </div>

//             <div className="flex w-full  gap-4 items-center">
//               <input
//                 type="email"
//                 placeholder="Your Email here"
//                 className="w-full px-5 py-2 rounded-md bg-white border text-black border-white/80 placeholder-primary focus:outline-none focus:border-white transition-colors"
//               />
//               <button className="bg-white text-primary font-medium px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-colors whitespace-nowrap text-base">
//                 Connect <FaCaretRight className="text-lg" />
//               </button>
//             </div>
//           </div>

//           {/* Footer Links Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
//             {/* Column 1: Logo & About */}
//             <div className="lg:col-span-2">
//               <Link href="/" className="inline-block mb-2">
//                 <Image
//                   src="/logo.png"
//                   alt="Apex School Logo"
//                   width={150}
//                   height={90}
//                   className="object-contain"
//                 />
//               </Link>
//               <p className="text-white/90 text-[14px] leading-relaxed max-w-[65vh]">
//                 At Apex School, we are committed to providing a nurturing and
//                 challenging environment that fosters academic excellence and
//                 character development.
//               </p>
//             </div>

//             {/* Column 2: Quick Links */}
//             <div>
//               <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-[13px] text-white/90 font-medium">
//                 <li>
//                   <Link
//                     href="/"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/about-us"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/events"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Events
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/student-story"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Student Story
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/contact"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 3: Other Links */}
//             <div>
//               <h3 className="text-xl font-bold mb-4">Other Links</h3>
//               <ul className="space-y-2 text-[13px] font-medium text-white/90">
//                 <li>
//                   <Link
//                     href="/curriculum"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Curriculum
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/admission"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Admission
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/resources"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Resources
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/blog"
//                     className="hover:text-[#ffd659] transition-colors"
//                   >
//                     Blog
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 4: Contact Us */}
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//               <ul className="space-y-4 text-[13px] text-white/90 font-medium">
//                 {/* Phone Number */}
//                 <li className="flex items-center gap-3">
//                   <FaPhoneAlt className="shrink-0 text-white text-lg" />
//                   <a
//                     href="tel:+97771414183"
//                     className=" transition-colors hover:underline"
//                   >
//                     +977 71414183
//                   </a>
//                 </li>

//                 {/* Location */}
//                 <li className="flex items-start gap-3">
//                   <FaMapMarkerAlt className="mt-1 shrink-0 text-white text-lg" />
//                   <a
//                     href="https://maps.google.com/?q=Apex+School+Rupandehi+Nepal"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="leading-relaxed transition-colors hover:underline"
//                   >
//                     Tilottama
//                     <br />
//                     Municipality-1, Apex
//                     <br />
//                     School, Rupandehi
//                     <br />
//                     District, Lumbini
//                     <br />
//                     Province, Nepal
//                   </a>
//                 </li>

//                 {/* Email */}
//                 <li className="flex items-center gap-3">
//                   <FaEnvelope className="shrink-0 text-white text-lg" />
//                   <a
//                     href="mailto:Apexschool2045@Gmail.Com"
//                     className=" hover:underline transition-colors break-all"
//                   >
//                     apexschool2045@Gmail.Com
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 5: Get in Touch (Socials) */}
//             <div>
//               <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
//               <ul className="space-y-2 gap-2 text-white/90 text-xs font-medium">
//                 <li>
//                   <Link
//                     href="https://www.facebook.com/Apexschool.Nepal"
//                     target="_blank"
//                     className="flex items-center gap-3 hover:text-white transition-colors"
//                   >
//                     <FaFacebook size={22} className="text-[#1877F2] " />
//                     <span>Facebook</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://linkedin.com"
//                     target="_blank"
//                     className="flex items-center gap-3 hover:text-white transition-colors"
//                   >
//                     <FaLinkedin size={22} className="text-[#0A66C2] " />
//                     <span>Linkedin</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://instagram.com"
//                     target="_blank"
//                     className="flex items-center gap-3 hover:text-white transition-colors"
//                   >
//                     <FaInstagram size={22} className="text-[#E1306C]" />
//                     <span>Instagram</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright Bar */}
//       <div className="bg-white py-2 ">
//         <div className=" mx-auto w-11/12 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-800">
//           <p className="text-secondary">
//             <span>©</span> Apex School 2024. All rights reserved.
//           </p>
//           <div className="flex items-center gap-4">
//             <Link
//               href="/terms-and-conditions"
//               className="hover:text-[#FF4B4B] transition-colors"
//             >
//               Terms and Conditions
//             </Link>
//             <span className="text-gray-800 text-lg">|</span>
//             <Link
//               href="/privacy-policy"
//               className="hover:text-[#FF4B4B] transition-colors"
//             >
//               Privacy Policies
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCaretRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full font-sans">
      {/* Main Footer Area */}
      <div className="bg-primary text-white pt-10 pb-12">
        <div className="mx-auto w-11/12 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            
            <div className="lg:col-span-2">
              <span className="inline-block bg-[#ffd659] text-[#d32f2f] font-medium px-6 py-2.5 rounded-md text-xs mb-4">
                Our Newsletter
              </span>
              <h2 className="text-2xl font-bold tracking-wide">
                Get Regular <span className="text-[#ffd659]">Updates</span>
              </h2>
            </div>

            {/* Form: Spans 4 columns (aligned from Quick Links to Get in Touch) */}
            <div className="lg:col-span-4 flex w-full gap-4 items-center lg:self-end">
              <input
                type="email"
                placeholder="Your Email here"
                className="w-full px-5 py-2 rounded-md bg-white border text-black border-white/80 placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-primary font-medium px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 transition-colors whitespace-nowrap text-base">
                Connect <FaCaretRight className="text-lg" />
              </button>
            </div>

            {/* Column 1: Logo & About */}
            <div className="lg:col-span-2 mt-6">
              <Link href="/" className="inline-block mb-2">
                <Image
                  src="/logo.png"
                  alt="Apex School Logo"
                  width={150}
                  height={90}
                  className="object-contain"
                />
              </Link>
              <p className="text-white/90 text-[14px] leading-relaxed max-w-[65vh]">
                At Apex School, we are committed to providing a nurturing and
                challenging environment that fosters academic excellence and
                character development.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-[13px] text-white/90 font-medium">
                <li>
                  <Link href="/" className="hover:text-[#ffd659] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#ffd659] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-[#ffd659] transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/student-story" className="hover:text-[#ffd659] transition-colors">
                    Student Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#ffd659] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Other Links */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Other Links</h3>
              <ul className="space-y-2 text-[13px] font-medium text-white/90">
                <li>
                  <Link href="/curriculum" className="hover:text-[#ffd659] transition-colors">
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/admission" className="hover:text-[#ffd659] transition-colors">
                    Admission
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-[#ffd659] transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#ffd659] transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4 text-[13px] text-white/90 font-medium">
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="shrink-0 text-white text-lg" />
                  <a href="tel:+97771414183" className="transition-colors hover:underline">
                    +977 71414183
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-white text-lg" />
                  <a
                    href="https://maps.google.com/?q=Apex+School+Rupandehi+Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed transition-colors hover:underline"
                  >
                    Tilottama
                    <br />
                    Municipality-1, Apex
                    <br />
                    School, Rupandehi
                    <br />
                    District, Lumbini
                    <br />
                    Province, Nepal
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <FaEnvelope className="shrink-0 text-white text-lg" />
                  <a href="mailto:apexschool2045@gmail.com" className="hover:underline transition-colors break-all">
                    apexschool2045@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Get in Touch (Socials) */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <ul className="space-y-2 gap-2 text-white/90 text-xs font-medium">
                <li>
                  <Link href="https://www.facebook.com/Apexschool.Nepal" target="_blank" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaFacebook size={22} className="text-[#1877F2]" />
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" target="_blank" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaLinkedin size={22} className="text-[#0A66C2]" />
                    <span>Linkedin</span>
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" target="_blank" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FaInstagram size={22} className="text-[#E1306C]" />
                    <span>Instagram</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-white py-2">
        <div className="mx-auto w-11/12 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-800">
          <p className="text-secondary">
            <span>©</span> Apex School 2024. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-[#FF4B4B] transition-colors">
              Terms and Conditions
            </Link>
            <span className="text-gray-800 text-lg">|</span>
            <Link href="/privacy-policy" className="hover:text-[#FF4B4B] transition-colors">
              Privacy Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}