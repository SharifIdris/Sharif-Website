import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ featured = false }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const url = featured 
          ? '/api/testimonials?featured=true' 
          : '/api/testimonials';
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
        
        // Fallback data for development
        setTestimonials([
          {
            id: 1,
            name: 'John Doe',
            position: 'CEO',
            company: 'Tech Innovations',
            content: 'Sharif delivered exceptional results for our automation needs. His expertise in AI tools saved us countless hours and improved our workflow efficiency by 40%.',
            image: '/images/testimonials/john-doe.jpg',
            rating: 5,
            featured: true
          },
          {
            id: 2,
            name: 'Jane Smith',
            position: 'Marketing Director',
            company: 'Creative Solutions',
            content: 'Working with Sharif was a game-changer for our marketing team. His virtual assistance and AI integration skills helped us scale our campaigns while maintaining quality.',
            image: '/images/testimonials/jane-smith.jpg',
            rating: 5,
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, [featured]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          <i className="fas fa-star"></i>
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available at the moment.</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-4"
          >
            <div className="flex flex-col md:flex-row items-center">
              {testimonials[currentIndex].image && (
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div className="font-semibold text-gray-800">
                  {testimonials[currentIndex].name}
                </div>
                
                <div className="text-gray-600 text-sm">
                  {testimonials[currentIndex].position}
                  {testimonials[currentIndex].company && (
                    <>, {testimonials[currentIndex].company}</>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-blue-50 transition-colors"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
      
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;