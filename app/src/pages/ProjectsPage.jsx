import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch('/projects/index.json')
      .then(response => response.json())
      .then(data => {
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
            title: 'Internship Tracker',
            brief: 'Platform for tracking internship applications',
            description: 'A comprehensive platform that helps students find, apply for, and track internship opportunities. Features include application status tracking, deadline reminders, and document management.',
            image: '/images/portfolio-1.jpg',
            category: 'web',
            tech: ['React', 'Node.js', 'MongoDB', 'Express'],
            link: 'https://internship-tracker.netlify.app'
          },
          {
            id: 2,
            title: 'AI Email Assistant',
            brief: 'Email automation with AI integration',
            description: 'Custom email automation tool that categorizes incoming emails, prioritizes them based on content, and drafts responses using AI. Integrates with Gmail and Outlook.',
            image: '/images/portfolio-2.jpg',
            category: 'automation',
            tech: ['Python', 'OpenAI API', 'Gmail API', 'Flask'],
            link: 'https://github.com/SharifIdris/ai-email-assistant'
          },
          {
            id: 3,
            title: 'Business Analytics Dashboard',
            brief: 'Interactive data visualization dashboard',
            description: 'Interactive dashboard for business analytics and performance monitoring. Visualizes key metrics, sales data, and customer insights with customizable widgets.',
            image: '/images/portfolio-3.jpg',
            category: 'data',
            tech: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
            link: 'https://business-dashboard-demo.netlify.app'
          }
        ]);
      });
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'automation', name: 'Automation' },
    { id: 'data', name: 'Data Projects' }
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