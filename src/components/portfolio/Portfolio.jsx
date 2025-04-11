import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./portfolio.scss";

const Portfolio = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Projects data
  const projects = useMemo(() => [
    {
      id: 1,
      title: "MERN Full Stack Blog App",
      img: "blog.png",
      desc: "Developed a dynamic and user-friendly web application using the MERN stack. Implemented secure and scalable authentication with Clerk. Optimized image handling and performance through ImageKit, featuring advanced image optimization and lazy loading techniques. Integrated infinite scrolling functionality with TanStack and Axios to provide a smooth and engaging data browsing experience.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Clerk", "ImageKit"],
      github: "https://github.com/manaf12/full-stack-mern-blog-project-",
      live: "https://blog-app-manafs-projects-7a962bb5.vercel.app"
    },
    {
      id: 2,
      title: "Responsive Social Media Web Application",
      img: "social.jpg",
      desc: "Developed a fully responsive social media platform utilizing the MERN stack, to provide users with an intuitive, dynamic, and scalable social networking experience. This platform integrates real-time features using Socket.IO.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.IO", "Redux"],
      github: "https://github.com/manaf12/social-media-app"
    },
    {
      id: 3,
      title: "Admin Dashboard",
      img: "dashboard.png",
      desc: "React Admin Panel UI, designed with React Router DOM 6 for navigation, and utilizes Material-UI (MUI) for tables, data grids, and components. The dashboard includes reusable widgets, a Progress Bar, and interactive charts, along with a dynamic Single Item Page and Form Page Design. It also supports Dark Mode via the Context API and smooth navigation with React Router DOM Links.",
      technologies: ["React", "Material UI", "Context API", "React Router", "Chart.js"],
      github: "https://github.com/manaf12/Admin-Dashboard",
      live: "https://admin-dashboard-phi-sage-38.vercel.app/"
    },
    {
      id: 4,
      title: "Responsive Blog Application Built with Next.js",
      img: "second.jpg",
      desc: "Developed a responsive and modern blog application using Next.js to deliver fast performance and SEO optimization. The app features dynamic content rendering and is built with a focus on user experience, providing a smooth and engaging interface across all devices. One of the standout features is the integration of Context API for state management, specifically used to allow users to switch between light and dark theme modes.",
      technologies: ["Next.js", "React", "Context API", "SSR", "SEO Optimization"],
      github: "https://github.com/manaf12/nextjs-app"
    },
  ], []);

  // Mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setActiveIndex(prev => Math.min(projects.length - 1, prev + 1));
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right
      setActiveIndex(prev => Math.max(0, prev - 1));
    }
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowLeft") {
      setActiveIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      setActiveIndex(prev => Math.min(projects.length - 1, prev + 1));
    } else if (e.key === "Escape" && selectedId) {
      setSelectedId(null);
    }
  }, [selectedId, projects.length]);

  // Auto-scroll to active card
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const card = container.children[activeIndex];
      if (card) {
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const cardLeft = card.offsetLeft;
        const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  // Modal animations
  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: 20 }
  };

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="portfolio">
      <div className="portfolio-header">
        <h2>
          My <span className="highlight">Projects</span>
          <span className="counter">
            {activeIndex + 1}/{projects.length}
          </span>
        </h2>
        <p className="subtitle">Swipe or use arrow keys to navigate</p>
      </div>

      <div 
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-track" ref={containerRef}>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-card ${index === activeIndex ? 'active' : ''}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={!isMobile ? "hover" : undefined}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              onClick={() => setSelectedId(project.id)}
            >
              <div className="card-image">
                <img 
                  src={project.img} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="card-content">
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
          ))}
        </div>

        {!isMobile && (
          <>
            <button 
              className="carousel-nav prev"
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
              </svg>
            </button>
            <button 
              className="carousel-nav next"
              onClick={() => setActiveIndex(prev => Math.min(projects.length - 1, prev + 1))}
              disabled={activeIndex === projects.length - 1}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="project-modal" onClick={() => setSelectedId(null)}>
            <div className="modal-backdrop" />
            
            {projects.map(project => (
              project.id === selectedId && (
                <motion.div 
                  key={project.id}
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button 
                    className="close-btn" 
                    onClick={() => setSelectedId(null)}
                    aria-label="Close modal"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>

                  <div className="modal-grid">
                    {!isMobile && (
                      <div className="modal-image">
                        <img 
                          src={project.img} 
                          alt={project.title} 
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="modal-details">
                      <h2>{project.title}</h2>
                      
                      <div className="tech-stack">
                        <h4>Tech Stack</h4>
                        <div className="tech-tags">
                          {project.technologies.map(tech => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-description">
                        <h4>Project Details</h4>
                        <div className="description-content">
                          <p>{project.desc}</p>
                        </div>
                      </div>

                      <div className="project-links">
                        <a 
                          href={project.github} 
                          className="project-link github"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View Code
                        </a>
                        {project.live && (
                          <a 
                            href={project.live} 
                            className="project-link live"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;