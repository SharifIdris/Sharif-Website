import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/angole-sharif-abubakar' },
    { name: 'GitHub', icon: 'github', url: 'https://github.com/SharifIdris' },
    { name: 'WhatsApp', icon: 'whatsapp', url: 'https://wa.me/sharifidris8' },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-gray-800">Sharif<span className="text-blue-500">.</span></span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Computer Science student, Certified Virtual Assistant, and AI & Automation Specialist trained by ALX Africa.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={link.name}
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope text-blue-500 mt-1 mr-3"></i>
                <a href="mailto:contact@sharifabubakar.com" className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                  contact@sharifabubakar.com
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-3"></i>
                <span className="text-gray-600">Lira, Uganda</span>
              </li>
              <li className="flex items-start">
                <i className="fab fa-whatsapp text-blue-500 mt-1 mr-3"></i>
                <a href="https://wa.me/256123456789" className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} Sharif Abubakar. All rights reserved. Made with <span className="text-blue-500">💡</span> in Uganda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;