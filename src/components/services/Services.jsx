import { useRef } from "react";
import "./services.scss";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const services = [
  {
    title: "Web Developer & Designer",
    description: "Crafting responsive and visually appealing websites tailored to your brand's identity. Specializing in modern design principles and seamless user experiences to help your business stand out online.",
    icon: "💻",
    color: "#7b4dff",
    gradient: "linear-gradient(135deg, #7b4dff 0%, #6200ea 100%)",
    particles: 15
  },
  {
    title: "AI & Machine Learning",
    description: "Transforming complex problems into intelligent solutions with AI. From image recognition to predictive modeling, I build systems that learn and adapt to your business needs.",
    icon: "🤖",
    color: "#00c6ff",
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    particles: 12
  },
  {
    title: "Social Media Management",
    description: "Building and managing engaging Instagram pages to connect with your audience. Expertise in content strategy, analytics, and brand growth across all major platforms.",
    icon: "📱",
    color: "#ff4d8d",
    gradient: "linear-gradient(135deg, #ff4d8d 0%, #ff0058 100%)",
    particles: 10
  },
];

const variants = {
  initial: { 
    y: 80,
    opacity: 0,
    rotateX: 15,
    scale: 0.95
  },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: index * 0.15,
      duration: 0.8
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px", once: true });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <motion.section 
      className="services" 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="elite-bg">
        <motion.div 
          className="quantum-dots" 
          style={{ y: y1 }}
        />
        <motion.div 
          className="holographic-grid" 
          style={{ y: y2 }}
        />
        <motion.div 
          className="floating-spheres" 
          style={{ y: y3 }}
        />
      </div>

      <div className="headerSection">
        <motion.div 
          className="textContainer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <p>
            Transforming visions into <span className="highlight-text">digital experiences</span>
            <br /> that captivate and convert
          </p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.div 
          className="titleContainer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="title">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
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
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 }}
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
        transition={{ delay: 1.2 }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="serviceCard"
            variants={variants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
            style={{ 
              '--card-color': service.color,
              '--card-gradient': service.gradient
            }}
          >
            <div className="particles">
              {[...Array(service.particles)].map((_, i) => (
                <div 
                  key={i}
                  className="particle"
                  style={{
                    // 'particles': `Math.floor(window.innerWidth > 768 ? 15 : 8)`
                    '--particle-size': `${Math.random() * 6 + 4}px`,
                    '--particle-opacity': `${Math.random() * 0.4 + 0.2}`,
                    '--particle-delay': `${Math.random() * 2}s`,
                    '--particle-duration': `${Math.random() * 3 + 2}s`,
                    '--particle-x': `${Math.random() * 100}%`,
                    '--particle-y': `${Math.random() * 100}%`
                  }}
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
                transition={{ duration: 0.6 }}
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