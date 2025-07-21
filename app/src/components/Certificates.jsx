import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import contentService from '../services/contentService';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    contentService.getCertificates()
      .then((allCertificates) => {
        setCertificates(allCertificates.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching certificates:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="certificates" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Certificates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of my professional certifications and qualifications.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(certificate.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-certificate text-blue-500"></i>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{certificate.title}</h2>
                        <p className="text-gray-600">
                          {certificate.issuer} • {new Date(certificate.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      expandedId === certificate.id ? 'rotate-180' : ''
                    }`}>
                      <svg 
                        className="w-6 h-6 text-gray-500" 
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
                  {expandedId === certificate.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4 mt-2">
                          {(certificate.image || certificate.file) && (
                            <div className="mb-4">
                              {(certificate.image || certificate.file?.fields?.file?.contentType?.startsWith('image/')) ? (
                                <img 
                                  src={certificate.image || certificate.file.fields.file.url} 
                                  alt={certificate.title} 
                                  className="rounded-lg shadow-sm object-cover w-full"
                                />
                              ) : (
                                <a 
                                  href={certificate.image || certificate.file.fields.file.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  View Certificate (PDF)
                                </a>
                              )}
                            </div>
                          )}
                          {certificate.description && (
                            <div className="prose prose-lg max-w-none">
                              {typeof certificate.description === 'string' 
                                ? certificate.description 
                                : documentToReactComponents(certificate.description)}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;