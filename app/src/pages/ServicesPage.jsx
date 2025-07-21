import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../contentful';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.getEntries({ 
      content_type: 'serviceItem',
      select: 'fields.title,fields.category,fields.short_description,fields.icon'
    })
    .then((response) => {
      const services = response.items.map(s => ({ 
        id: s.sys.id,
        title: s.fields.title,
        category: s.fields.category || 'General',
        short_description: s.fields.short_description,
        icon: s.fields.icon
      }));
      
      const categories = services.reduce((acc, service) => {
        if (!acc[service.category]) {
          acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
      }, {});
      
      const categoryArray = Object.keys(categories).map(key => ({
        id: key,
        title: key,
        services: categories[key]
      }));

      setServiceCategories(categoryArray);
      setIsLoading(false);
    })
    .catch(err => {
      console.error('Error fetching services:', err);
      setError(err);
      setIsLoading(false);
    });
  }, []);

  const toggleCategory = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">My Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional solutions to help your business grow and operate more efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            {serviceCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div 
                  className={`p-6 cursor-pointer ${
                    activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div>
                        <h2 className="text-2xl font-bold">{category.title}</h2>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      activeCategory === category.id ? 'rotate-180' : ''
                    }`}>
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
                        {category.services.map((service, index) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            {service.icon && (
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <img src={service.icon.fields.file.url} alt={service.title} className="w-8 h-8" />
                              </div>
                            )}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.short_description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">My Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I follow a structured approach to ensure your project is completed efficiently and meets your expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Consultation',
                description: 'We discuss your needs, goals, and expectations to understand your project requirements.',
                icon: 'comments'
              },
              {
                step: 2,
                title: 'Planning',
                description: 'I create a detailed plan outlining the scope, timeline, and deliverables for your project.',
                icon: 'clipboard-list'
              },
              {
                step: 3,
                title: 'Implementation',
                description: 'I execute the plan, keeping you updated on progress and milestones throughout the process.',
                icon: 'cogs'
              },
              {
                step: 4,
                title: 'Review & Support',
                description: 'After delivery, I provide ongoing support and make any necessary adjustments.',
                icon: 'headset'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
                <div className="flex justify-center mt-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className={`fas fa-${step.icon} text-blue-500`}></i>
                  </div>
                </div>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg 
                      className="w-8 h-8 text-blue-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Let's discuss how I can help you achieve your business goals with my services.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/contact" 
                  className="bg-white text-blue-500 hover:bg-blue-50 font-medium py-3 px-8 rounded-md inline-flex items-center transition-colors duration-300"
                >
                  Contact Me
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
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;
