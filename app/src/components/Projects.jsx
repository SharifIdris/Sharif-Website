import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/projects/index.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <section id="projects" className="mb-12">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Project
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
