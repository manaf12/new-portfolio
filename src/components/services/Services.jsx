import { useRef, useMemo } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "Web Developer & Designer",
    description: "Crafting responsive and visually appealing websites tailored to your brand's identity. Specializing in modern design principles and seamless user experiences to help your business stand out online.",
    icon: "💻",
    color: "#7b4dff",
    gradient: "linear-gradient(135deg, #7b4dff 0%, #6200ea 100%)"
  },
  {
    title: "AI & Machine Learning",
    description: "Transforming complex problems into intelligent solutions with AI. From image recognition to predictive modeling, I build systems that learn and adapt to your business needs.",
    icon: "🤖",
    color: "#00c6ff",
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
  },
  {
    title: "Social Media Management",
    description: "Building and managing engaging Instagram pages to connect with your audience. Expertise in content strategy, analytics, and brand growth across all major platforms.",
    icon: "📱",
    color: "#ff4d8d",
    gradient: "linear-gradient(135deg, #ff4d8d 0%, #ff0058 100%)"
  }
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-50px", once: true });

  return (
    <section className="services" ref={ref}>
      <div className="headerSection">
        <motion.div 
          className="textContainer"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p>
            Transforming visions into <span className="highlight-text">digital experiences</span>
            <br /> that captivate and convert
          </p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </motion.div>

        <div className="titleContainer">
          <div className="title">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="highlight">Cutting-edge</span> Solutions
            </motion.h1>
          </div>
          <div className="title">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="highlight">Tailored</span> For You
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="listContainer">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="serviceCard"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : {}}
            transition={{ delay: 0.1 * index }}
            style={{ 
              '--card-color': service.color,
              '--card-gradient': service.gradient
            }}
          >
            <div className="cardContent">
              <div className="iconWrapper">
                <div className="iconGlow" />
                <div className="icon">{service.icon}</div>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="hoverEffect" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;