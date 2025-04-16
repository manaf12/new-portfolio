import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import './projectModal.scss';

const ProjectModal = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState([]);
  const modalRef = useRef(null);

  // Image data with proper alt text
  const images = [
    { src: project.img, alt: `${project.title} main screenshot` },
    { src: `/${project.id}-feature.webp`, alt: `${project.title} feature close-up` },
    { src: `/${project.id}-mockup.webp`, alt: `${project.title} device mockup` }
  ];

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => [...prev, index]);
  };

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setCursorPos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveImage((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImage((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, images.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <motion.div 
          className="modal-container"
          ref={modalRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              damping: 25,
              stiffness: 120
            }
          }}
          exit={{ 
            y: 50, 
            opacity: 0,
            transition: { ease: "easeIn" }
          }}
          style={{
            '--mouse-x': cursorPos.x,
            '--mouse-y': cursorPos.y,
            '--accent': project.accent || '#6366f1'
          }}
        >
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="modal-grid">
            <motion.div 
              className="modal-media"
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                transition: { delay: 0.2 }
              }}
            >
              <div className="media-viewport">
                <motion.div
                  className="image-container"
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={images[activeImage].src}
                    alt={images[activeImage].alt}
                    onLoad={() => handleImageLoad(activeImage)}
                    style={{
                      opacity: imagesLoaded.includes(activeImage) ? 1 : 0.5,
                      transition: 'opacity 0.3s ease'
                    }}
                  />
                  {!imagesLoaded.includes(activeImage) && (
                    <div className="image-loader">
                      <div className="loader-spinner"></div>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="media-nav">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={i === activeImage ? 'active' : ''}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="modal-details"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.4 }
              }}
            >
              <div className="modal-header">
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 0.5 }
                  }}
                >
                  {project.title}
                </motion.h2>
                
                <div className="project-meta">
                  <div className="meta-item">
                    <span>Category</span>
                    <p>Web Application</p>
                  </div>
                  <div className="meta-item">
                    <span>Year</span>
                    <p>{new Date().getFullYear()}</p>
                  </div>
                </div>
              </div>

              <div className="tech-stack">
                <h3>Technology Stack</h3>
                <div className="tech-chips">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        transition: { 
                          delay: 0.8 + (i * 0.05),
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="project-description">
                <h3>Project Overview</h3>
                <p>{project.desc}</p>
              </div>

              <div className="project-links">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button github"
                  whileHover={{ y: -3 }}
                >
                  <span>View Source</span>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3 3 0 00-1-2.3c3-.3 6-.4 6-3a3 3 0 00-1-2 3 3 0 00-1-2h-1a3 3 0 00-3 3c0 .6.2 1.3.5 2"/>
                  </svg>
                </motion.a>
                
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button live"
                    whileHover={{ y: -3 }}
                  >
                    <span>Live Demo</span>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 14a4 4 0 110-8 4 4 0 010 8z"/>
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;