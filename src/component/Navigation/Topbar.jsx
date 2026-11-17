import { FiMail, FiPhone } from "react-icons/fi"; // Feather icons for mail/phone
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa"; // FontAwesome for socials

export default function Topbar() {
  return (
    <div className="bg-primary text-white text-sm py-3">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="mailto:apexschool2045@gmail.com"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FiMail size={16} />
            <span>apexschool2045@gmail.com</span>
          </a>
          
          <div className="h-4 w-px bg-gray-400 hidden md:block"></div>
          
          <a
            href="tel:+97771414183"
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <FiPhone size={16} />
            <span>+97771414183</span>
          </a>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-100 transition-colors">
            <FaFacebook size={24} className="text-[#1877F2] " />
          </a>
          <a href="#" className="text-gray-100 transition-colors">
            <FaLinkedin size={24} className="text-[#0A66C2] " />
          </a>
          <a href="#" className="text-gray-100 transition-colors">
            <FaInstagram size={24} className="text-[#E4405F]" />
          </a>
        </div>
      </div>
    </div>
  );
}