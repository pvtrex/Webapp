import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, DollarSignIcon, InfoIcon, MailIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-300 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <HomeIcon size={24} className="text-primary-400" />
              <span className="text-xl font-bold text-white">Canyoubuyit.com</span>
            </Link>
            <p className="text-gray-400">
              Making smart financial decisions easier. Check if you can afford big purchases like cars and homes without hurting your budget.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <HomeIcon size={16} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <DollarSignIcon size={16} className="mr-2" />
                  Results
                </Link>
              </li>
              <li>
                <Link to="/comparison" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <DollarSignIcon size={16} className="mr-2" />
                  Compare
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <InfoIcon size={16} className="mr-2" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <a 
              href="mailto:info@canyoubuyit.com" 
              className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
            >
              <MailIcon size={16} className="mr-2" />
              info@canyoubuyit.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Canyoubuyit.com. All rights reserved.</p>
          <p className="mt-1">Created by Shikher Sharma & Prince</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;