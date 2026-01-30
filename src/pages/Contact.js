import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Background3D from '../components/Background3D';
import SandButton from '../components/SandButton';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'raffayabdul9070@gmail.com',
      link: 'mailto:raffayabdul9070@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '03140594495',
      link: 'tel:03140594495'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Block#62B flat#5 G9/2, Islamabad',
      link: null
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '⚡', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' }
  ];

  return (
    <div className="contact">
      <Background3D />
      
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">GET IN TOUCH</h1>
          <div className="title-underline"></div>
          <p className="page-subtitle">
            Let's collaborate on your next project or discuss opportunities
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Contact Information</h2>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <h3>{info.label}</h3>
                  {info.link ? (
                    <a href={info.link}>{info.value}</a>
                  ) : (
                    <p>{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="social-links">
              <h3>Connect With Me</h3>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <span>{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2>Send Me a Message</h2>
            
            {submitted ? (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <SandButton type="submit">
                  SEND MESSAGE
                </SandButton>
              </form>
            )}
          </motion.div>
        </div>

        {/* Additional Section */}
        <motion.div 
          className="availability-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="availability-card">
            <h3>Currently Available For</h3>
            <div className="availability-items">
              <span className="availability-item">🔹 Freelance Projects</span>
              <span className="availability-item">🔹 Full-time Opportunities</span>
              <span className="availability-item">🔹 Collaboration</span>
              <span className="availability-item">🔹 Consulting</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
