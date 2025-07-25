import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '../contentful';

const Testimonials = ({ featured }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParams = { 
      content_type: 'testimonial',
      select: 'fields.clientName,fields.roleOrCompany,fields.testimonialContent,fields.profileImage,fields.featuredStatus'
    };
    
    if (featured) {
      fetchParams['fields.featuredStatus'] = true;
    }
    
    setIsLoading(true);
    client.getEntries(fetchParams)
      .then((response) => {
        const allTestimonials = response.items.map(t => ({
          id: t.sys.id,
          clientName: t.fields.clientName,
          roleOrCompany: t.fields.roleOrCompany,
          testimonialContent: t.fields.testimonialContent,
          profileImage: t.fields.profileImage
        }));
        setTestimonials(allTestimonials);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
        setError(err);
        setIsLoading(false);
      });
  }, [featured]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <div className="text-gray-600 mb-4 flex-grow">
                {documentToReactComponents(testimonial.testimonialContent)}
              </div>
              <div className="flex items-center mt-auto">
                {testimonial.profileImage && (
                  <img
                    src={testimonial.profileImage.fields.file.url}
                    alt={testimonial.clientName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-500">{testimonial.roleOrCompany}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
