import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedParticles = ({ color, count }) => {
  const particlesRef = useRef(null);
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1
  }));

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (particlesRef.current) {
        particlesRef.current.style.width = particlesRef.current.parentElement.offsetWidth + 'px';
        particlesRef.current.style.height = particlesRef.current.parentElement.offsetHeight + 'px';
      }
    });

    if (particlesRef.current) {
      resizeObserver.observe(particlesRef.current.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <svg 
      ref={particlesRef}
      className="animated-particles" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
    >
      {particles.map(particle => (
        <motion.circle
          key={particle.id}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={color}
          opacity={particle.opacity}
          initial={{
            cx: particle.x,
            cy: particle.y
          }}
          animate={{
            cx: [particle.x, particle.x + (Math.random() * 20 - 10)],
            cy: [particle.y, particle.y + (Math.random() * 20 - 10)]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  );
};

export default AnimatedParticles;