import { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./workExperience.scss";

const WorkExperience = () => {
  const ref = useRef();
  const [activeCompany, setActiveCompany] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  const companies = useMemo(() => [
    {
      id: 1,
      name: "Reparametrize Studio.",
      position: "IT & AI Department",
      period: "Aug 2024 - Present",
      logo: "tech-innovators.webp",
      achievements: [
        "Led the full-stack web development of the platform using React (frontend) and PHP Laravel (backend)",
        "Implemented advanced performance optimizations including code splitting, lazy loading, and bundle size reduction",
        "Used Leaflet.js to build interactive, multi-layered map visualizations with real-time geospatial overlays",
        "Facilitated clean, modular code architecture, CI/CD pipelines, and Git-based workflows",
        "Conducted in-depth research on critical aspects of rebuilding Syria",
        "Optimized AI algorithms for performance and scalability"
      ],
      techStack: ["React.js", "Next.js", "LeafLet.js", "TypeScript", "PHP Laravel", "GitHub", "Python", "ML"],
      color: "#7b4dff"
    },
    {
      id: 2,
      name: "Fatio Store.",
      position: "Frontend Developer",
      period: "Feb 2025 - present",
      logo: "digital-solutions.webp",
      achievements: [
        "Leading the complete redesign and development of Fatio Store",
        "Built a custom Shopify theme from scratch using Liquid, JavaScript, and CSS",
        "Developed custom frontend features and user interactions with hand-coded JavaScript",
        "Implemented responsive, mobile-first layouts and pixel-perfect designs",
        "Applied performance best practices including lazy loading and asset minification"
      ],
      techStack: ["JavaScript", "Liquid", "Shopify", "CSS", "Shopify Theme Development", "Figma"],
      color: "#00c6ff"
    },
    {
      id: 3,
      name: "The RUSHIO",
      position: "Web Developer",
      period: "May 2024-Sep 2024",
      logo: "webcraft.webp",
      achievements: [
        "Collaborated with cross-functional teams to design and implement user-centric features",
        "Led the integration of third-party APIs and external services",
        "Optimized frontend performance through advanced techniques",
        "Maintained clean, modular codebases with reusable components",
        "Developed custom features and components using Liquid and React"
      ],
      techStack: ["React", "JavaScript", "Shopify", "Liquid", "Nodejs", "Figma", "Trello"],
      color: "#ff4d8d"
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
      boxShadow: "0 10px 25px rgba(123, 77, 255, 0.3)",
      transition: { type: "spring", stiffness: 500 }
    }
  }), []);

  const getGradient = (color) => {
    try {
      return `linear-gradient(135deg, ${color} 0%, ${lightenColor(color, 20)} 100%)`;
    } catch {
      return `linear-gradient(135deg, #7b4dff 0%, #6200ea 100%)`;
    }
  };

  const lightenColor = (color, percent) => {
    if (!color || typeof color !== 'string') return '#6200ea';
    
    const hex = color.replace('#', '');
    if (!/^[0-9A-F]{6}$/i.test(hex)) return '#6200ea';

    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    
    return `#${(
      (1 << 24) + (R << 16) + (G << 8) + B
    ).toString(16).slice(1)}`;
  };

  return (
    <section className="work-experience" ref={ref} id="experience">
      <motion.div className="bg-layer-1" style={{ y: y1 }} />
      <motion.div className="bg-layer-2" style={{ y: y2 }} />
      <motion.div className="bg-layer-3" style={{ y: y3 }} />

      <div className="particles">
        {[...Array(30)].map((_, i) => {
          const randomX = Math.random();
          const randomY = Math.random();
          return (
            <motion.div
              key={i}
              className="particle"
              style={{
                '--random-x': randomX,
                '--random-y': randomY,
                left: `${randomX * 100}%`,
                top: `${randomY * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
            />
          );
        })}
      </div>

      <div className="container">
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="gradient-text">Professional</span> Journey
          </motion.h2>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Where innovation meets experience
          </motion.p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          />
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
                  '--company-gradient': getGradient(company.color)
                }}
                aria-label={`View ${company.name} experience`}
              >
                <span>{company.name}</span>
                <motion.div 
                  className="active-indicator"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeCompany === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
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
                '--company-color': companies[activeCompany]?.color || '#7b4dff'
              }}
            >
              {companies[activeCompany] && (
                <>
                  <div className="company-header">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span>{companies[activeCompany].position}</span>
                      <span className="company-name"> @ {companies[activeCompany].name}</span>
                    </motion.h3>
                    <motion.p 
                      className="period"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {companies[activeCompany].period}
                    </motion.p>
                  </div>

                  <div className="achievements">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Key Achievements:
                    </motion.h4>
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
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Technologies Used:
                    </motion.h4>
                    <div className="tech-tags">
                      {companies[activeCompany].techStack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * i + 0.6 }}
                          whileHover={{ 
                            y: -3,
                            boxShadow: `0 5px 15px ${companies[activeCompany].color}40`
                          }}
                        >
                          {tech}
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