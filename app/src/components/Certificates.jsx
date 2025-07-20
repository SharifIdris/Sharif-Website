import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/certificates/index.json')
      .then((response) => response.json())
      .then((data) => setCertificates(data))
      .catch((error) => console.error('Error fetching certificates:', error));
  }, []);

  return (
    <section id="certificates" className="mb-12">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl font-bold mb-4">Certificates</h2>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {certificates.map((certificate, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">{certificate.title}</h3>
              <p className="text-gray-600 mb-2">{certificate.issuer}</p>
              <p className="text-gray-600 mb-4">{certificate.date}</p>
              <img src={certificate.image} alt={certificate.title} className="w-full h-auto rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;
