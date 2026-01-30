import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/SandButton.css';

const SandButton = ({ children, onClick, variant = 'primary' }) => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const animationRef = useRef(null);

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1,
        size: Math.random() * 3 + 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
    if (onClick) onClick(e);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2,
            life: particle.life - 0.02
          }))
          .filter(particle => particle.life > 0);
      });

      particles.forEach(particle => {
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = variant === 'primary' ? '#00f3ff' : '#ff00ea';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, variant]);

  return (
    <motion.button
      className={`sand-button ${variant}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <canvas ref={canvasRef} className="particle-canvas" />
      <span className="button-text">{children}</span>
    </motion.button>
  );
};

export default SandButton;
