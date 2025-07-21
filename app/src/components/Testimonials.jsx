import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ featured }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/content/testimonials/index.json')
      .then(response => response.json())
      .then(data => {
        const allTestimonials = data.map(t => ({ ...t, ...t.fields }));
        if (featured) {
          setTestimonials(allTestimonials.filter(t => t.featured));
        } else {
          setTestimonials(allTestimonials);
        }
      });
  }, [featured]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
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
