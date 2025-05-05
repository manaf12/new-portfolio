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
      id:1,
      title:'3D T-Shirt Customizer App',
      img:'lets.jpg',
      desc: "Created an interactive 3D T-shirt customization app using Three.js and React Three Fiber. Enabled users to customize colors and upload designs directly onto a 3D model. Integrated DALL·E for AI-generated textures, and added smooth animations with Framer Motion. Ensured full responsiveness and performance optimization across devices.",
      technologies: ["Three.js", "React Three Fiber", "TailwindCSS", "Framer Motion", "DALL·E",'HOCs'],    
      github:"https://github.com/manaf12/project_threejs_ai",
      live:'https://project-threejs-ai-woad.vercel.app/',
      accent: "#14b8a6",
    },
    {
      id: 2,
      title: "MERN Full Stack Blog App",
      img: "blog-enh.webp",
      desc: "Developed a dynamic and user-friendly web application using the MERN stack. Implemented secure and scalable authentication with Clerk. Optimized image handling and performance through ImageKit, featuring advanced image optimization and lazy loading techniques. Integrated infinite scrolling functionality with TanStack and Axios to provide a smooth and engaging data browsing experience.",    
      technologies: ["React", "Node.js", "MongoDB", "Express", "Clerk", "ImageKit"],
      github:"https://github.com/manaf12/full-stack-mern-blog-project-",
      live: "https://blog-app-manafs-projects-7a962bb5.vercel.app",
      accent: "#6366f1"
    },
    {
      id:3,
      title:"",
      img:"new-dashboard.jpg",
      desc:"Built a real-time CRM dashboard using Refine Framework, Ant Design, GraphQL, and TypeScript. Implemented full authentication and authorization for secure user access. Designed an interactive homepage featuring dynamic charts and activity logs with real-time updates. Developed a fully functional company management module with advanced CRUD operations, server-side search, and pagination, leveraging Refine's useList and GraphQL integrations. Engineered a real-time Kanban board with seamless drag-and-drop functionality, utilizing Refine's mutation hooks for instant UI synchronization. Achieved a scalable, strongly typed architecture using TypeScript, ensuring high code quality, maintainability, and performance",
      technologies:["Refine Framework ","Ant Design","React","TypeScript","graphQl"," Refine's built-in cache, React Query","drag and drop"],
      live:"https://refine-dashboard-beta.vercel.app/",
      github:"https://github.com/manaf12/refine_dashboard"

    },

    {
      id:4,
      title:"Modern Landing Page",
      img:"landingpage.jpg",
      desc:"Designed and developed a fully responsive website featuring sleek parallax scrolling effects and a visually engaging bento box layout. This project showcases my ability to craft modern, stylish user interfaces while applying mobile-first design principles. Built using React.js and Tailwind CSS, it demonstrates strong frontend skills, smooth animations, and component-based architecture.",
      technologies: ["React , React Router , Tailwind CSS, scroll-lock,react-just-parallax"],
      github:"https://github.com/manaf12/LandingPage",
      live:"https://landing-page-eight-inky-25.vercel.app/",
      
    },
    {
      id: 5,
      title: "Responsive Social Media Web Application",
      img: "social.jpg",
desc: "Developed a fully responsive social media platform utilizing the MERN stack, to provide users with an intuitive, dynamic, and scalable social networking experience. ",  
  technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.IO", "Redux"],
      github: "https://github.com/manaf12/social-media-app",
      accent: "#ec4899"
    },
    {
      id: 6,
      title: "Admin Dashboard",
      img: "dashboard.png",
      desc: "React Admin Panel UI, designed with React Router DOM 6 for navigation, and utilizes Material-UI (MUI) for tables, data grids, and components. The dashboard includes reusable widgets, a Progress Bar, and interactive charts, along with a dynamic Single Item Page and Form Page Design. It also supports Dark Mode via the Context API and smooth navigation with React Router DOM Links.",
      technologies: ["React", "Material UI", "Context API", "React Router", "Chart.js"],
      github: "https://github.com/manaf12/Admin-Dashboard",
      live: "https://admin-dashboard-phi-sage-38.vercel.app/",
      accent: "#f59e0b"
    },
    {
      id: 7,
      title: "Responsive Blog Application Built with Next.js",
      img: "second.jpg",
      desc: "Developed a responsive and modern blog application using Next.js to deliver fast performance and SEO optimization. The app features dynamic content rendering and is built with a focus on user experience, providing a smooth and engaging interface across all devices. One of the standout features is the integration of Context API for state management, specifically used to allow users to switch between light and dark theme modes.",
      technologies: ["Next.js", "React", "Context API", "SSR", "SEO Optimization"],
      github: "https://github.com/manaf12/nextjs-app",
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