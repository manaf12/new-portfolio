import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./workExperience.scss";

const WorkExperience = () => {
  const [activeCompany, setActiveCompany] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);
  const canvasRef = useRef(null);

  const companies = useMemo(() => [
    {
      id: 1,
      name: "Reparametrize Studio",
      position: "IT & AI Department",
      period: "Aug 2024 - Present",
      logo: "FOUNDATION_LOGO_BLACK.png",
      achievements: [
        "Led the full-stack web development of the platform using React (frontend) and PHP Laravel (backend)",
        "Implemented advanced performance optimizations including code splitting, lazy loading, and bundle size reduction",
        "Used Leaflet.js to build interactive, multi-layered map visualizations with real-time geospatial overlays",
        "Facilitated clean, modular code architecture, CI/CD pipelines, and Git-based workflows",
        "Conducted in-depth research on critical aspects of rebuilding Syria",
        "Optimized AI algorithms for performance and scalability"
      ],
      techStack: ["React.js", "Next.js", "LeafLet.js", "TypeScript", "PHP Laravel", "GitHub", "Python", "ML"],
      color: "#7b4dff",
      accentColor: "#9d7aff"
    },
    {
      id: 2,
      name: "Fatio Store",
      position: "Frontend Developer",
      period: "Feb 2025 - Present",
      logo: "Fatio_logo_round.jpg",
      achievements: [
        "Leading the complete redesign and development of Fatio Store",
        "Built a custom Shopify theme from scratch using Liquid, JavaScript, and CSS",
        "Developed custom frontend features and user interactions with hand-coded JavaScript",
        "Implemented responsive, mobile-first layouts and pixel-perfect designs",
        "Applied performance best practices including lazy loading and asset minification"
      ],
      techStack: ["JavaScript", "Liquid", "Shopify", "CSS", "Shopify Theme Development", "Figma"],
      color: "#00c6ff",
      accentColor: "#6bdfff"
    },
    {
      id: 3,
      name: "The RUSHIO",
      position: "Web Developer",
      period: "May 2024 - Sep 2024",
      logo: "rushio_logo.webp",
      achievements: [
        "Collaborated with cross-functional teams to design and implement user-centric features",
        "Led the integration of third-party APIs and external services",
        "Optimized frontend performance through advanced techniques",
        "Maintained clean, modular codebases with reusable components",
        "Developed custom features and components using Liquid and React"
      ],
      techStack: ["React", "JavaScript", "Shopify", "Liquid", "Nodejs", "Figma", "Trello"],
      color: "#ff4d8d",
      accentColor: "#ff8db3"
    }
  ], []);

  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    active: {
      backgroundColor: "rgba(123, 77, 255, 0.15)",
      borderColor: "var(--company-color)",
      transition: { type: "spring", stiffness: 500 }
    },
    techHover: {
      scale: 1.05,
      y: -3,
      backgroundColor: "var(--tech-hover-bg)",
      transition: { type: "spring", stiffness: 500, damping: 15 }
    }
  }), []);

  // Canvas animation for connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let connections = [];
    let lastTime = 0;
    const fps = 30;
    const frameInterval = 1000 / fps;
  
    // Connection line class
    class Connection {
      constructor(canvasWidth, canvasHeight, color, accentColor) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.color = color;
        this.accentColor = accentColor;
        this.reset();
      }
  
      reset() {
        this.x1 = Math.random() * this.canvasWidth;
        this.y1 = Math.random() * this.canvasHeight;
        this.x2 = Math.random() * this.canvasWidth;
        this.y2 = Math.random() * this.canvasHeight;
        this.speed = 0.1 + Math.random() * 0.3;
        this.progress = Math.random();
        this.goingForward = Math.random() > 0.5;
        this.width = 0.2 + Math.random() * 0.3;
        this.alpha = 0.05 + Math.random() * 0.1;
        this.useAccentColor = Math.random() > 0.7;
      }
  
      update() {
        if (this.goingForward) {
          this.progress += this.speed / 100;
          if (this.progress >= 1) this.goingForward = false;
        } else {
          this.progress -= this.speed / 100;
          if (this.progress <= 0) this.goingForward = true;
        }
  
        // Occasionally reset the line for variety
        if (Math.random() < 0.002) {
          this.reset();
        }
      }
  
      draw(ctx) {
        const x = this.x1 + (this.x2 - this.x1) * this.progress;
        const y = this.y1 + (this.y2 - this.y1) * this.progress;
  
        // Create gradient for the line
        const gradient = ctx.createLinearGradient(this.x1, this.y1, x, y);
        gradient.addColorStop(0, this.useAccentColor ? this.accentColor : this.color);
        gradient.addColorStop(1, 'transparent');
  
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.globalAlpha = this.alpha;
        ctx.stroke();
      }
    }
  
    // Initialize connections
    const initConnections = () => {
      connections = [];
      const count = 12; // Optimal number for performance
      const color = companies[activeCompany].color;
      const accentColor = companies[activeCompany].accentColor;
      
      for (let i = 0; i < count; i++) {
        connections.push(new Connection(canvas.width, canvas.height, color, accentColor));
      }
    };
  
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initConnections();
    };
  
    const draw = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
  
      if (deltaTime > frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a subtle grid first
        ctx.strokeStyle = companies[activeCompany].color;
        ctx.lineWidth = 0.1;
        ctx.globalAlpha = 0.03;
        const gridSize = 40;
        
        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
  
        // Update and draw connections
        connections.forEach(conn => {
          conn.update();
          conn.draw(ctx);
        });
  
        lastTime = timestamp - (deltaTime % frameInterval);
      }
  
      animationFrameId = requestAnimationFrame(draw);
    };
  
    // Initialize
    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);
  
    // Start animation
    animationFrameId = requestAnimationFrame(draw);
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [activeCompany]);

  const getTechDescription = (tech) => {
    const descriptions = {
      "React.js": "JavaScript library for building user interfaces",
      "Next.js": "React framework for server-rendered applications",
      "LeafLet.js": "Lightweight JavaScript library for interactive maps",
      "TypeScript": "Typed JavaScript superset for large-scale applications",
      "PHP Laravel": "PHP framework for web application development",
      "GitHub": "Platform for version control and collaboration",
      "Python": "High-level programming language for general purposes",
      "ML": "Machine Learning algorithms and models",
      "JavaScript": "Programming language for interactive web pages",
      "Liquid": "Template language for Shopify themes",
      "Shopify": "E-commerce platform for online stores",
      "CSS": "Styling language for web pages",
      "Shopify Theme Development": "Creating custom themes for Shopify stores",
      "Figma": "Collaborative interface design tool",
      "Nodejs": "JavaScript runtime for server-side development",
      "Trello": "Project management tool"
    };
    
    return descriptions[tech] || "Technology used in project";
  };
  const ConnectionLines = () => {
    const connections = [];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      connections.push({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        endX: Math.random() * 100,
        endY: Math.random() * 100,
        color: companies[activeCompany].color,
        delay: i * 0.1
      });
    }
    
    return (
      <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={conn.startX}
            y1={conn.startY}
            x2={conn.endX}
            y2={conn.endY}
            stroke={conn.color}
            strokeWidth="0.3"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              stroke: companies[activeCompany].color
            }}
            transition={{
              duration: 2,
              delay: conn.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    );
  };
  return (
    <section className="work-experience" id="experience">
      {/* Optimized Background Elements */}
      <div className="optimized-background">
      <ConnectionLines />
        <div className="css-grid-background" />
        <canvas ref={canvasRef} className="canvas-connections" />
        <div 
          className="gradient-overlay" 
          style={{ background: `radial-gradient(circle at 20% 30%, ${companies[activeCompany].color}20 0%, transparent 50%)` }} 
        />
        <div 
          className="gradient-overlay" 
          style={{ background: `radial-gradient(circle at 70% 50%, ${companies[activeCompany].accentColor}20 0%, transparent 45%)` }} 
        />
      </div>

      <div className="container">
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2>
            <motion.span 
              className="gradient-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Professional
            </motion.span>{" "}
            <span>Journey</span>
          </h2>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Where innovation meets experience
          </motion.p>
        </motion.div>

        <div className="experience-container">
          <div className="company-selector">
            {companies.map((company, index) => (
              <motion.button
                key={company.id}
                className={`company-tab ${activeCompany === index ? 'active' : ''}`}
                onClick={() => setActiveCompany(index)}
                initial="hidden"
                whileInView="visible"
                custom={index}
                variants={variants}
                whileHover="hover"
                animate={activeCompany === index ? "active" : ""}
                viewport={{ once: true, margin: "-30px" }}
                style={{
                  '--company-color': company.color,
                  '--company-accent': company.accentColor
                }}
              >
                <div className="company-logo-wrapper">
                  <img 
                    src={`/${company.logo}`} 
                    alt={`${company.name} logo`} 
                    className="company-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
             
                </div>
                <div className="company-info">
                  <span>{company.name}</span>
                  <small>{company.period}</small>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={companies[activeCompany]?.id || 'empty'}
              className="company-details"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                '--company-color': companies[activeCompany]?.color,
                '--company-accent': companies[activeCompany]?.accentColor
              }}
            >
              {companies[activeCompany] && (
                <>
                  <div className="company-header">
                    <div className="position-period">
                      <h3>
                        <span>{companies[activeCompany].position}</span>
                        <span className="company-name"> @ {companies[activeCompany].name}</span>
                      </h3>
                      <p className="period">
                        {companies[activeCompany].period}
                      </p>
                    </div>
                  </div>

                  <div className="achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                      {companies[activeCompany].achievements.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i + 0.4 }}
                        >
                          <div className="bullet" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="tech-stack">
                    <h4>Technologies Used</h4>
                    <div className="tech-tags">
                      {companies[activeCompany].techStack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover="techHover"
                          variants={variants}
                          transition={{ delay: 0.05 * i + 0.6 }}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                          style={{
                            '--tech-hover-bg': companies[activeCompany].accentColor + '22'
                          }}
                        >
                          {tech}
                          {hoveredTech === tech && (
                            <motion.span 
                              className="tech-tooltip"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {getTechDescription(tech)}
                            </motion.span>
                          )}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;