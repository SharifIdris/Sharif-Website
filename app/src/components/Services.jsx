import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/services/index.json')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <section id="services" className="mb-12">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl font-bold mb-4">Services</h2>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Services;
