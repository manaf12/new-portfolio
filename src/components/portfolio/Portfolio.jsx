import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import "./portfolio.scss";

const Portfolio = () => {
  const ref = useRef();
  const containerRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRequestRef = useRef(null);
  
  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Memoized project data
  const projects = useMemo(() => [
    {
      id: 1,
      title: "MERN Full Stack Blog App",
      img: "blog.png",
      desc: "Developed a dynamic and user-friendly web application using the MERN stack...",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Clerk", "ImageKit"],
      github: "https://github.com/manaf12/full-stack-mern-blog-project-",
      live: "https://blog-app-manafs-projects-7a962bb5.vercel.app"
    },
    {
      id: 2,
      title: "Responsive Social Media Web Application",
      img: "social.jpg",
      desc: "Developed a fully responsive social media platform utilizing the MERN stack...",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.IO", "Redux"],
      github: "https://github.com/manaf12/social-media-app"
    },
    {
      id: 3,
      title: "Admin Dashboard",
      img: "dashboard.png",
      desc: "React Admin Panel UI, designed with React Router DOM 6 for navigation...",
      technologies: ["React", "Material UI", "Context API", "React Router", "Chart.js"],
      github: "https://github.com/manaf12/Admin-Dashboard",
      live: "https://admin-dashboard-phi-sage-38.vercel.app/"
    },
    {
      id: 4,
      title: "Responsive Blog Application Built with Next.js",
      img: "second.jpg",
      desc: "Developed a responsive and modern blog application using Next.js...",
      technologies: ["Next.js", "React", "Context API", "SSR", "SEO Optimization"],
      github: "https://github.com/manaf12/nextjs-app"
    },
  ], []);

  // Optimized scroll tracking
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.01
  });

  // Simplified parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Memoized event handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      setActiveIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      setActiveIndex(prev => Math.min(projects.length - 1, prev + 1));
    } else if (e.key === "Escape" && selectedId) {
      setSelectedId(null);
    }
  }, [selectedId, projects.length]);

  // Custom smooth scroll function
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const scrollToActiveIndex = useCallback(() => {
    if (scrollRequestRef.current) {
      cancelAnimationFrame(scrollRequestRef.current);
    }

    scrollRequestRef.current = requestAnimationFrame(() => {
      if (containerRef.current && !isDragging) {
        const container = containerRef.current;
        const card = container.children[activeIndex];
        if (card) {
          const containerWidth = container.offsetWidth;
          const cardWidth = card.offsetWidth;
          const cardLeft = card.offsetLeft;
          const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
          
          if (isMobile) {
            // On mobile, use native smooth scroll
            container.scrollTo({
              left: scrollPosition,
              behavior: 'smooth'
            });
          } else {
            // On desktop, use custom smooth scroll
            const startTime = performance.now();
            const duration = 500;
            const startPos = container.scrollLeft;
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = easeOutCubic(progress);
              
              container.scrollLeft = startPos + (scrollPosition - startPos) * easeProgress;
              
              if (progress < 1) {
                scrollRequestRef.current = requestAnimationFrame(animateScroll);
              }
            };
            
            scrollRequestRef.current = requestAnimationFrame(animateScroll);
          }
        }
      }
    });
  }, [activeIndex, isDragging, isMobile]);

  useEffect(() => {
    scrollToActiveIndex();
  }, [scrollToActiveIndex]);

  const handleTouchMove = useCallback((e) => {
    if (isDragging) {
      e.preventDefault();
    }
  }, [isDragging]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    if (isMobile) {
      document.body.classList.add('carousel-dragging');
    }
  }, [isMobile]);
  
  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    if (isMobile) {
      document.body.classList.remove('carousel-dragging');
      
      // Snap to nearest card based on velocity
      if (Math.abs(info.velocity.x) > 100) {
        const direction = info.velocity.x > 0 ? -1 : 1;
        const newIndex = Math.max(0, Math.min(projects.length - 1, activeIndex + direction));
        setActiveIndex(newIndex);
      } else {
        // If slow swipe, snap based on position
        const container = containerRef.current;
        const scrollPosition = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const newIndex = Math.round(scrollPosition / (containerWidth * 0.85));
        setActiveIndex(Math.max(0, Math.min(projects.length - 1, newIndex)));
      }
    } else {
      // Desktop behavior
      if (Math.abs(info.velocity.x) > 300) {
        const direction = info.velocity.x > 0 ? -1 : 1;
        setActiveIndex(prev => Math.max(0, Math.min(projects.length - 1, prev + direction)));
      }
    }
  }, [isMobile, activeIndex, projects.length]);

  // Simplified animations
  const cardVariants = {
    offscreen: {
      y: 30,
      opacity: 0,
      scale: 0.98
    },
    onscreen: (index) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.05,
        duration: 0.5
      }
    }),
    hover: {
      y: -5,
      scale: 1.02
    },
    active: {
      scale: 1.03,
      zIndex: 10,
      boxShadow: "0 15px 30px -5px rgba(123, 77, 255, 0.3)"
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { opacity: 0, y: 10 }
  };

  // Optimized particles
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      opacity: Math.random() * 0.15 + 0.05,
      scale: Math.random() * 0.5 + 0.8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 3
    }))
  , []);

  // Memoized project card
  const ProjectCard = useCallback(({ project, index, isActive }) => (
    <motion.article
      key={project.id}
      className={`project-card ${isActive ? 'active' : ''}`}
      custom={index}
      initial="offscreen"
      whileInView="onscreen"
      whileHover={!isMobile ? "hover" : undefined}
      animate={isActive ? "active" : ""}
      variants={cardVariants}
      onClick={() => !isDragging && setSelectedId(project.id)}
      layoutId={`card-${project.id}`}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    >
      <div className="card-glow" />
      <figure className="card-image">
        <img 
          src={project.img} 
          alt={project.title}
          loading="lazy"
          decoding="async"
        />
        <div className="image-overlay" />
      </figure>
      
      <div className="card-content" onTouchMove={handleTouchMove}>
        <h3>{project.title}</h3>
        <div className="tech-tags">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech}>{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span>+{project.technologies.length - 3}</span>
          )}
        </div>
      </div>
    </motion.article>
  ), [isDragging, isMobile, handleTouchMove]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollRequestRef.current) {
        cancelAnimationFrame(scrollRequestRef.current);
      }
      document.body.classList.remove('carousel-dragging');
    };
  }, [handleKeyDown]);

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="parallax-bg" style={{ y }}>
        <div className="bg-layer" />
      </motion.div>

      <div className="particles-container">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              x: [0, particle.x],
              y: [0, particle.y],
              opacity: [0, particle.opacity],
              scale: [1, particle.scale]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <motion.div className="progress-header">
        <motion.h1>
          Work That <span className="gradient-text">Speaks</span>
          <motion.span className="counter">
            {activeIndex + 1}/{projects.length}
          </motion.span>
        </motion.h1>
        <motion.div className="progress-bar" style={{ scaleX }} />
        <p className="subtitle">Swipe or use arrow keys to navigate</p>
      </motion.div>

      <div className="carousel-container">
        {!isMobile && (
          <motion.button 
            className="carousel-nav prev"
            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={activeIndex === 0}
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </motion.button>
        )}
        
        <motion.div 
          ref={containerRef}
          className="carousel-track"
          drag={isMobile ? "x" : false}
          dragConstraints={{ right: 0, left: 0 }}
          dragElastic={isMobile ? 0.2 : 0.05}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            overflowX: isMobile ? 'auto' : 'hidden',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            scrollBehavior: isMobile ? 'smooth' : 'auto',
            WebkitOverflowScrolling: isMobile ? 'touch' : 'auto'
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              project={project} 
              index={index} 
              isActive={index === activeIndex} 
              key={project.id}
            />
          ))}
        </motion.div>

        {!isMobile && (
          <motion.button 
            className="carousel-nav next"
            onClick={() => setActiveIndex(prev => Math.min(projects.length - 1, prev + 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={activeIndex === projects.length - 1}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div className="project-modal" onClick={() => setSelectedId(null)}>
            <motion.div className="modal-backdrop" />
            
            {projects.map(project => (
              project.id === selectedId && (
                <motion.div 
                  key={project.id}
                  className="modal-content"
                  layoutId={`card-${project.id}`}
                  onClick={(e) => e.stopPropagation()}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button className="close-btn" onClick={() => setSelectedId(null)}>
                    <svg viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>

                  <div className="modal-grid">
                    <figure className="modal-image">
                      <img src={project.img} alt={project.title} />
                    </figure>

                    <div className="modal-details">
                      <h2>{project.title}</h2>
                      
                      <div className="tech-stack">
                        <h4>Tech Stack</h4>
                        <div className="tech-tags">
                          {project.technologies.map(tech => (
                            <motion.span key={tech} whileHover={{ scale: 1.03 }}>
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="project-description">
                        <h4>Project Details</h4>
                        <p>{project.desc}</p>
                      </div>

                      <div className="project-links">
                        <motion.a 
                          href={project.github} 
                          className="project-link github"
                          target="_blank" 
                          rel="noopener noreferrer"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View Code
                        </motion.a>
                        {project.live && (
                          <motion.a 
                            href={project.live} 
                            className="project-link live"
                            target="_blank" 
                            rel="noopener noreferrer"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;