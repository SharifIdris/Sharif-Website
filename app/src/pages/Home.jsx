import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 md:pt-40 md:pb-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                  Hi, I'm <span className="text-blue-500">Sharif Abubakar</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  Virtual Assistant & AI Automation Specialist
                </p>
                <p className="text-gray-600 mb-8 max-w-lg">
                  I help businesses streamline operations through AI-powered automation, 
                  virtual assistance, and modern web development solutions.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/projects" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md inline-flex items-center transition-colors duration-300"
                  >
                    Explore My Work
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Sharif Abubakar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
                  <span className="font-medium">ALX Africa Graduate</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What I Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I offer specialized services to help businesses leverage technology for growth and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'user-tie',
                title: 'Virtual Assistance',
                description: 'Professional administrative support, email management, and scheduling to keep your business running smoothly.'
              },
              {
                icon: 'robot',
                title: 'AI Integration',
                description: 'Custom AI solutions and automation workflows to streamline operations and boost productivity.'
              },
              {
                icon: 'laptop-code',
                title: 'Web Development',
                description: 'Modern, responsive websites and web applications built with React.js and other cutting-edge technologies.'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <i className={`fas fa-${service.icon} text-2xl text-blue-500`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link 
              to="/services" 
              className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center transition-colors duration-300"
            >
              View All Services
              <svg 
                className="w-5 h-5 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out some of my recent work that showcases my skills and expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Executive Virtual Assistance',
                image: '/images/portfolio-1.jpg',
                category: 'Virtual Assistant',
                description: 'Comprehensive virtual assistance services for executives and business owners.'
              },
              {
                title: 'AI Email Assistant',
                image: '/images/portfolio-2.jpg',
                category: 'AI Tools',
                description: 'Custom email automation tool that categorizes, prioritizes, and drafts responses.'
              },
              {
                title: 'Portfolio Website',
                image: '/images/portfolio-3.jpg',
                category: 'Web Development',
                description: 'Modern, responsive portfolio website with smooth animations and CMS integration.'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-blue-500 font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link 
                    to="/projects" 
                    className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center transition-colors duration-300"
                  >
                    View Details
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link 
              to="/projects" 
              className="bg-white hover:bg-gray-50 text-blue-500 font-medium py-3 px-8 rounded-md inline-flex items-center border border-blue-500 transition-colors duration-300"
            >
              View All Projects
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Let's discuss how I can help you achieve your business goals through technology and automation.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/contact" 
                className="bg-white text-blue-500 hover:bg-blue-50 font-medium py-3 px-8 rounded-md inline-flex items-center transition-colors duration-300"
              >
                Get in Touch
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;