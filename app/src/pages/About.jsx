import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'Virtual Assistance', level: 95 },
    { name: 'AI Tools & Automation', level: 90 },
    { name: 'React.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'WordPress', level: 80 },
    { name: 'UI/UX Design', level: 75 },
  ];

  const technologies = [
    'JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'Git', 
    'WordPress', 'Python', 'Figma', 'ChatGPT', 'Midjourney',
    'Zapier', 'Make.com', 'Notion', 'Airtable', 'Firebase'
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Me</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about my journey, skills, and what drives me to create innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <img 
                  src="/images/profile.jpg" 
                  alt="Sharif Abubakar" 
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-800 font-medium">Computer Science Student</p>
                  <p className="text-blue-500">Busitema University</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2 mt-10 md:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Angole Sharif Abubakar</h2>
              <p className="text-gray-600 mb-6">
                I'm a Computer Science student at Busitema University with a passion for leveraging technology 
                to solve real-world problems. As a Certified Virtual Assistant and AI & Automation Specialist 
                trained by ALX Africa, I combine technical expertise with practical business solutions.
              </p>
              <p className="text-gray-600 mb-6">
                My journey began with a fascination for how technology can streamline business operations. 
                This led me to specialize in virtual assistance and AI-powered automation, where I've helped 
                numerous clients optimize their workflows and increase productivity.
              </p>
              <p className="text-gray-600 mb-6">
                One of my notable achievements is the development of the Internship Tracker platform, 
                which helps students find and manage internship opportunities efficiently. This project 
                showcases my ability to identify needs and create practical solutions.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Virtual Assistant
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  AI Specialist
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Web Developer
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  ALX Africa Graduate
                </span>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/files/Sharif_Abubakar_CV.pdf" 
                  download
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md inline-flex items-center transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">My Skills</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I've developed a diverse set of skills that allow me to deliver comprehensive solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-blue-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technologies & Tools</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Education & Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              My academic background and professional certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-graduation-cap text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Computer Science</h3>
                  <p className="text-gray-600">Busitema University, 2020 - Present</p>
                </div>
              </div>
              <p className="text-gray-600">
                Currently pursuing a Bachelor's degree in Computer Science, focusing on software development, 
                artificial intelligence, and data structures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-certificate text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Virtual Assistant Certification</h3>
                  <p className="text-gray-600">ALX Africa, 2023</p>
                </div>
              </div>
              <p className="text-gray-600">
                Comprehensive training in virtual assistance, including administrative support, 
                email management, scheduling, and client communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-robot text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">AI & Automation Specialist</h3>
                  <p className="text-gray-600">ALX Africa, 2023</p>
                </div>
              </div>
              <p className="text-gray-600">
                Advanced training in AI tools, automation workflows, and integration of AI solutions 
                for business process optimization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-code text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Web Development</h3>
                  <p className="text-gray-600">Udemy, 2022</p>
                </div>
              </div>
              <p className="text-gray-600">
                Comprehensive course covering modern web development technologies including HTML5, CSS3, 
                JavaScript, React.js, and responsive design principles.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Passion Section */}
      <section className="py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">My Passion</h2>
              <p className="text-xl mb-8 text-blue-100">
                I'm passionate about leveraging technology to create efficient solutions that help businesses 
                and individuals achieve more with less effort. I believe in the power of automation and AI 
                to transform how we work and live.
              </p>
              <p className="text-blue-100">
                My goal is to bridge the gap between complex technology and practical business needs, 
                making advanced tools accessible and useful for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;