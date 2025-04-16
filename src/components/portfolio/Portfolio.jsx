import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ProjectModal from './ProjectModal';
import './portfolio.scss';

const Portfolio = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  
  // Advanced scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);

  // 2025 Project Data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      img: "blog-enh.webp",
      desc: "Developed a real-time analytics platform with predictive capabilities using TensorFlow.js and WebGL visualization. Implemented custom data pipelines handling 10M+ daily events.",
      technologies: ["React", "TensorFlow", "Node.js", "WebGL", "GraphQL"],
      github: "#",
      live: "#",
      accent: "#6366f1"
    },
    {
      id: 2,
      title: "Web3 Social Platform",
      img: "web3-social.jpg",
      desc: "Built a decentralized social network with Ethereum smart contracts for content monetization. Integrated IPFS for storage and MetaMask for wallet connectivity.",
      technologies: ["Next.js", "Solidity", "IPFS", "Ethers.js", "Tailwind"],
      github: "#",
      live: "#",
      accent: "#ec4899"
    },
    {
      id: 3,
      title: "AR E-Commerce Experience",
      img: "ar-commerce.jpg",
      desc: "Created WebXR-powered augmented reality shopping experience allowing users to visualize products in their space before purchasing.",
      technologies: ["Three.js", "React", "WebXR", "GSAP", "Node.js"],
      github: "#",
      live: "#",
      accent: "#f59e0b"
    },
    {
      id: 4,
      title: "Quantum Computing Simulator",
      img: "quantum-sim.jpg",
      desc: "Developed educational quantum circuit simulator with drag-and-drop interface and real-time visualization of qubit states.",
      technologies: ["TypeScript", "React", "Qiskit", "D3.js", "WebAssembly"],
      github: "#",
      live: "#",
      accent: "#10b981"
    }
  ];

  // 3D Hover Effect with Lighting
  const handleMouseMove = (e, id) => {
    setHoveredId(id);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 20;
    const rotateX = (centerY - y) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.section 
      className="portfolio-section" 
      id="portfolio"
      style={{ opacity }}
      ref={containerRef}
    >
      {/* Quantum Background Elements */}
      <motion.div 
        className="bg-shape-1" 
        style={{ y: y1 }}
      />
      <motion.div 
        className="bg-shape-2" 
        style={{ y: y2 }}
      />
      <div className="particle-field" />
      <div className="grid-overlay" />

      {/* Main Content Container */}
      <div className="portfolio-container">
        {/* Animated Header */}
        <motion.div 
          className="portfolio-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="title-wrapper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>
              <span className="title-gradient">SELECTED</span>
              <span className="title-outline">WORKS</span>
            </h2>
            <div className="title-line" />
          </motion.div>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.4 }}
          >
            Innovative solutions crafted with cutting-edge 2025 technologies
          </motion.p>
        </motion.div>

        {/* Holographic Project Grid */}
        <motion.div 
          className="portfolio-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`portfolio-card ${hoveredId === project.id ? 'hovered' : ''}`}
              style={{ '--accent': project.accent }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              whileHover={{ scale: 1.03 }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => {
                setHoveredId(null);
                const card = document.querySelector(`.portfolio-card[data-id="${project.id}"]`);
                if (card) {
                  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                }
              }}
              onClick={() => setSelectedId(project.id)}
              data-id={project.id}
            >
              <div className="card-inner">
                <div className="card-reflection" />
                <div className="card-image">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    loading="lazy"
                  />
                  <div className="image-overlay" />
                </div>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <div className="tech-tags">
                    {project.technologies.map((tech, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ y: -3, backgroundColor: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div 
                    className="card-cta"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span>View Case Study</span>
                    <div className="arrow-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
                <div className="card-glow" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Futuristic Project Modal */}
      <AnimatePresence>
        {selectedId && (
          <ProjectModal 
            project={projects.find(p => p.id === selectedId)} 
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Portfolio;