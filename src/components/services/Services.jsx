import { useRef , useMemo } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "Web Developer & Designer",
    description: "Crafting responsive and visually appealing websites tailored to your brand's identity. Specializing in modern design principles and seamless user experiences to help your business stand out online.",
    icon: "💻",
    color: "#7b4dff",
    gradient: "linear-gradient(135deg, #7b4dff 0%, #6200ea 100%)",
    particles: 12 // Reduced from 15
  },
  {
    title: "AI & Machine Learning",
    description: "Transforming complex problems into intelligent solutions with AI. From image recognition to predictive modeling, I build systems that learn and adapt to your business needs.",
    icon: "🤖",
    color: "#00c6ff",
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    particles: 10 // Reduced from 12
  },
  {
    title: "Social Media Management",
    description: "Building and managing engaging Instagram pages to connect with your audience. Expertise in content strategy, analytics, and brand growth across all major platforms.",
    icon: "📱",
    color: "#ff4d8d",
    gradient: "linear-gradient(135deg, #ff4d8d 0%, #ff0058 100%)",
    particles: 8 // Reduced from 10
  },
];

const variants = {
  initial: { 
    y: 60, // Reduced from 80
    opacity: 0,
    rotateX: 10, // Reduced from 15
    scale: 0.97 // Reduced from 0.95
  },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 80, // Reduced from 100
      damping: 12, // Reduced from 15
      delay: index * 0.12, // Reduced from 0.15
      duration: 0.6 // Reduced from 0.8
    }
  }),
  hover: {
    y: -8, // Reduced from -10
    scale: 1.01, // Reduced from 1.02
    transition: {
      type: "spring",
      stiffness: 300, // Reduced from 400
      damping: 8 // Reduced from 10
    }
  }
};

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-50px", once: true }); 
  
  const particleStyles = useMemo(() => 
    services.map(service => 
      Array.from({ length: service.particles }, () => ({
        '--particle-size': `${Math.random() * 5 + 3}px`,
        '--particle-opacity': `${Math.random() * 0.3 + 0.1}`,
        '--particle-delay': `${Math.random() * 1.5}s`,
        '--particle-duration': `${Math.random() * 2 + 1.5}s`,
        '--particle-x': `${Math.random() * 100}%`,
        '--particle-y': `${Math.random() * 100}%`
      }))
    ),
    []
  );

  return (
    <motion.section 
      className="services" 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }} 
    >
      <div className="headerSection">
        <motion.div 
          className="textContainer"
          initial={{ opacity: 0, y: 15 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }} 
        >
          <p>
            Transforming visions into <span className="highlight-text">digital experiences</span>
            <br /> that captivate and convert
          </p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }} 
          />
        </motion.div>

        <motion.div 
          className="titleContainer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
        >
          <div className="title">
            <motion.h1
              initial={{ opacity: 0, x: -40 }} 
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }} 
            >
              <motion.span 
                className="highlight" 
                whileHover={{ color: "#7b4dff" }}
              >
                Cutting-edge
              </motion.span>{" "}
              Solutions
            </motion.h1>
          </div>
          <div className="title">
            <motion.h1
              initial={{ opacity: 0, x: 40 }} 
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.75 }}
            >
              <motion.span 
                className="highlight" 
                whileHover={{ color: "#ff4d8d" }}
              >
                Tailored
              </motion.span>{" "}
              For You
            </motion.h1>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="listContainer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }} 
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="serviceCard"
            variants={variants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, margin: "-30px" }} 
            custom={index}
            style={{ 
              '--card-color': service.color,
              '--card-gradient': service.gradient
            }}
          >
            <div className="particles">
              {particleStyles[index].map((style, i) => (
                <div 
                  key={i}
                  className="particle"
                  style={style}
                />
              ))}
            </div>
            <div className="cardContent">
              <div className="iconWrapper">
                <div className="iconGlow" />
                <div className="icon">{service.icon}</div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.div 
                className="hoverEffect"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="cardReflection" />
            <div className="cardBorder"></div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Services;