import { Link } from "react-router";
import { Mail } from "lucide-react";
import logoImage from "../../../assets/images/Blood aid.png";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-[#BC1823] to-[#3f060a] py-10 px-10 mx-4 rounded-xl  text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img
              className="h-14 w-10 rounded-full"
              src={logoImage}
              alt="BloodAid Logo"
            />
           
            <h3 className="text-lg font-bold">BloodAid</h3>
          </div>
          <ul className="space-y-2 mt-4">
            <li>
              <Link to="/" className="hover:text-teal-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-teal-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-teal-200">
                Services
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/events" className="hover:text-teal-200">
                Events
              </Link>
            </li>
            <li>
              <Link to="/donation-requests" className="hover:text-teal-200">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/search-donor" className="hover:text-teal-200">
                Search Donor
              </Link>
            </li>
            <li>
              <Link to="/funding" className="hover:text-teal-200">
                Funding
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-teal-200">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex gap-4 mb-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-200"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-200"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-200"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <div>
            <a
              href="mailto:bloodaid@gmail.com"
              className="flex items-center hover:text-teal-200"
            >
              <Mail size={18} className="mr-2" /> bloodaid@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#fa7171] mt-8 pt-4 text-center text-sm">
        <p>© {currentYear} BloodAid. All Rights Reserved.</p>
        <p className="mt-2">
          <Link to="/privacy-policy" className="hover:text-teal-200 mr-3">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-teal-200">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
