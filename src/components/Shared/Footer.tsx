import React, { FC } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Language Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Language</h3>
            <div className="space-y-2">
              <select
                className="bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
                defaultValue="English"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <br />
              <h3 className="font-semibold text-xl mb-4">Currency</h3>
              <select
                className="bg-gray-700 text-white border border-gray-600 px-4 py-2 rounded"
                defaultValue="USD"
              >
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Work With Us Section */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Work With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Join our Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Become a Supplier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-8">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
