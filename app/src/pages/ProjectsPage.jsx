import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        // Projects are already sorted by order in the API
        setProjects(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
        // Fallback data in case the fetch fails
        setProjects([
          {
            id: 1,
            title: 'Executive Virtual Assistance',
            brief: 'Comprehensive virtual assistance for busy professionals',
            description: 'Providing comprehensive virtual assistance services including inbox management, scheduling, document preparation, and administrative support for executives and business owners.',
            image: '/images/portfolio-1.jpg',
            category: 'virtual-assistant',
            tech: ['Google Workspace', 'Notion', 'Trello', 'Calendly'],
            link: '#'
          },
          {
            id: 2,
            title: 'AI Email Assistant',
            brief: 'Email automation with AI integration',
            description: 'Custom email automation tool that categorizes incoming emails, prioritizes them based on content, and drafts responses using AI. Integrates with Gmail and Outlook.',
            image: '/images/portfolio-2.jpg',
            category: 'ai-tools',
            tech: ['ChatGPT', 'Gemini', 'Gmail API', 'Zapier'],
            link: 'https://github.com/SharifIdris/ai-email-assistant'
          },
          {
            id: 3,
            title: 'Portfolio Website',
            brief: 'Modern responsive portfolio website',
            description: 'A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. Features include smooth animations, responsive design, and a content management system.',
            image: '/images/portfolio-3.jpg',
            category: 'web',
            tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Netlify CMS'],
            link: '#'
          },
          {
            id: 4,
            title: 'Client Onboarding System',
            brief: 'Streamlined client onboarding process',
            description: 'A comprehensive client onboarding system that automates the collection of client information, contract signing, and initial setup. Improves efficiency and client experience.',
            image: '/images/portfolio-4.jpg',
            category: 'virtual-assistant',
            tech: ['Notion', 'Make.com', 'DocuSign', 'Google Forms'],
            link: '#'
          },
          {
            id: 5,
            title: 'AI Content Generator',
            brief: 'Automated content creation with AI',
            description: 'An AI-powered content generation system that creates blog posts, social media content, and marketing copy based on specific prompts and brand guidelines.',
            image: '/images/portfolio-5.jpg',
            category: 'ai-tools',
            tech: ['GPT-4', 'Midjourney', 'Zapier', 'WordPress'],
            link: '#'
          },
          {
            id: 6,
            title: 'E-commerce Website',
            brief: 'Custom e-commerce solution',
            description: 'A custom e-commerce website built with modern web technologies. Features include product catalog, shopping cart, secure checkout, and admin dashboard.',
            image: '/images/portfolio-6.jpg',
            category: 'web',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: '#'
          }
        ]);
      });
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'virtual-assistant', name: 'Virtual Assistant' },
    { id: 'ai-tools', name: 'AI Tools' },
    { id: 'web', name: 'Web Development' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">My Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my portfolio of web development, automation, and data projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  filter === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
                      expandedId === project.id ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <div className={`${expandedId === project.id ? 'flex flex-col md:flex-row' : ''}`}>
                      <div className={`${expandedId === project.id ? 'md:w-1/2' : ''}`}>
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                      
                      <div className={`p-6 ${expandedId === project.id ? 'md:w-1/2' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="text-sm text-blue-500 font-medium capitalize">
                              {project.category}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-800 mt-1">
                              {project.title}
                            </h3>
                          </div>
                          <button 
                            onClick={() => toggleExpand(project.id)}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            aria-label={expandedId === project.id ? "Collapse" : "Expand"}
                          >
                            <svg 
                              className="w-5 h-5" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {expandedId === project.id ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              )}
                            </svg>
                          </button>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {expandedId === project.id ? project.description : project.brief}
                        </p>
                        
                        <AnimatePresence>
                          {expandedId === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.tech.map((tech, index) => (
                                    <span 
                                      key={index}
                                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center transition-colors duration-300"
                        >
                          View Project
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
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectsPage;