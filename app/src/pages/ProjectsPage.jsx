import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import client from '../contentful';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    client.getEntries({ content_type: 'project' })
      .then((response) => {
        const allProjects = response.items.map(p => ({ ...p.fields, id: p.sys.id }));
        setProjects(allProjects.sort((a, b) => a.title.localeCompare(b.title)));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredProjects = projects;

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
                            src={project.image.fields.file.url} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                      
                      <div className={`p-6 ${expandedId === project.id ? 'md:w-1/2' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
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
                          {expandedId === project.id ? project.description : `${project.description.substring(0, 100)}...`}
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
                                  {project.tech_stack.map((tech, index) => (
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
                        
                        <div className="flex gap-4">
                          {project.live_demo_url && (
                            <a 
                              href={project.live_demo_url} 
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
                          )}
                          {project.github_url && (
                            <a 
                              href={project.github_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-gray-500 hover:text-gray-700 font-medium inline-flex items-center transition-colors duration-300"
                            >
                              GitHub
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
                                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" 
                                />
                              </svg>
                            </a>
                          )}
                        </div>
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
