import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from '../components/Background3D';
import SandButton from '../components/SandButton';
import '../styles/Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    demo: '',
    images: []
  });

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects
      setProjects([
        {
          id: 1,
          title: 'Python Desktop Tools',
          description: 'Custom automation tools built with PyQt for productivity enhancement. Features include speech recognition, web automation, and AI integration.',
          technologies: ['Python', 'PyQt', 'Speech Recognition', 'Web Automation'],
          category: 'Desktop Application',
          status: 'Completed'
        },
        {
          id: 2,
          title: 'Data Management System',
          description: 'Comprehensive system for data cleaning, scraping, and conversion. Streamlines workflow efficiency for data teams.',
          technologies: ['Python', 'Pandas', 'BeautifulSoup', 'SQLite'],
          category: 'Data Processing',
          status: 'In Progress'
        },
        {
          id: 3,
          title: 'E-Commerce Marketplace',
          description: 'Facebook Marketplace seller management system with automated listings, customer communication, and sales tracking.',
          technologies: ['Python', 'Selenium', 'API Integration'],
          category: 'Automation',
          status: 'Completed'
        }
      ]);
    }
  }, []);

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      id: Date.now(),
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      category: 'Custom',
      status: 'New'
    };

    saveProjects([...projects, newProject]);
    
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github: '',
      demo: '',
      images: []
    });
    setIsAddingProject(false);
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="projects">
      <Background3D />
      
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">MY PROJECTS</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            Explore my work and contributions to the tech world
          </p>
          
          <SandButton onClick={() => setIsAddingProject(true)}>
            + ADD NEW PROJECT
          </SandButton>
        </motion.div>

        {/* Add Project Modal */}
        <AnimatePresence>
          {isAddingProject && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingProject(false)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Add New Project</h2>
                <form onSubmit={handleSubmit} className="project-form">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  
                  <textarea
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Technologies (comma separated)"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    required
                  />
                  
                  <input
                    type="url"
                    placeholder="GitHub URL (optional)"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                  />
                  
                  <input
                    type="url"
                    placeholder="Demo URL (optional)"
                    value={formData.demo}
                    onChange={(e) => setFormData({...formData, demo: e.target.value})}
                  />
                  
                  <div className="image-upload">
                    <label>Upload Project Images:</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    {formData.images.length > 0 && (
                      <div className="image-preview">
                        {formData.images.map((img, idx) => (
                          <img key={idx} src={img} alt={`Preview ${idx}`} />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">Add Project</button>
                    <button type="button" onClick={() => setIsAddingProject(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="modal-content project-details"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{selectedProject.title}</h2>
                <p className="project-description">{selectedProject.description}</p>
                
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="project-images">
                    {selectedProject.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`${selectedProject.title} ${idx}`} />
                    ))}
                  </div>
                )}
                
                <div className="project-tech-list">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                {(selectedProject.github || selectedProject.demo) && (
                  <div className="project-links">
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
                
                <button onClick={() => setSelectedProject(null)} className="close-btn">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={projectVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-header">
                <span className="project-category">{project.category}</span>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              
              {project.images && project.images.length > 0 && (
                <div className="project-thumbnail">
                  <img src={project.images[0]} alt={project.title} />
                </div>
              )}
              
              <div className="project-card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag more">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
              
              <div className="project-card-footer">
                <button onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }} className="view-details">
                  View Details
                </button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project.id);
                }} className="delete-btn">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
