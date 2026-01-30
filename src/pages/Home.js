import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Background3D from '../components/Background3D';
import SandButton from '../components/SandButton';
import profileImage from '../assets/profile.jpg';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const skills = [
    'Python', 'React', 'Flutter', 'Java', 'Data Analysis',
    'Web Automation', 'PyQt', 'AI Integration', 'Data Scraping'
  ];

  return (
    <div className="home">
      <Background3D />
      
      <motion.div 
        className="home-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <div className="hero-section">
          <motion.div 
            className="profile-image-container"
            variants={itemVariants}
          >
            <div className="profile-glow"></div>
            <img src={profileImage} alt="Abdul Raffay" className="profile-image" />
          </motion.div>

          <motion.div className="hero-content" variants={itemVariants}>
            <motion.div className="glitch-wrapper">
              <h1 className="hero-title">
                ABDUL RAFFAY
              </h1>
            </motion.div>
            
            <motion.p className="hero-subtitle" variants={itemVariants}>
              Computer Science Student • Python Developer • Tool Creator
            </motion.p>

            <motion.p className="hero-description" variants={itemVariants}>
              Building innovative solutions with Python, React, and Flutter. 
              Passionate about automation, AI integration, and creating tools 
              that make a difference.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <SandButton onClick={() => navigate('/projects')}>
                VIEW PROJECTS
              </SandButton>
              <SandButton variant="secondary" onClick={() => navigate('/contact')}>
                GET IN TOUCH
              </SandButton>
            </motion.div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div className="about-section" variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">ABOUT ME</h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="card-icon">🎓</div>
              <h3>Education</h3>
              <p>Bachelor of Computer Science</p>
              <p className="institution">National Skill University (2023-2027)</p>
            </div>

            <div className="about-card">
              <div className="card-icon">💼</div>
              <h3>Current Role</h3>
              <p>Data Team Assistant</p>
              <p className="institution">2025 - Present</p>
            </div>

            <div className="about-card">
              <div className="card-icon">⚡</div>
              <h3>Experience</h3>
              <p>Python Tool Creator</p>
              <p className="institution">2023 - 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div className="skills-section" variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">SKILLS & EXPERTISE</h2>
            <div className="title-underline"></div>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div className="stats-section" variants={itemVariants}>
          <div className="stat-card">
            <h3 className="stat-number">5+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">2+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">100%</h3>
            <p className="stat-label">Client Satisfaction</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
