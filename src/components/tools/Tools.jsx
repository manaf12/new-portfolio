import { useRef, useState } from "react";
import "./tools.scss";
import { motion, useInView } from "framer-motion";

const tools = [
  {
    title: "Web Development",
    description: "Modern web development using cutting-edge technologies",
    icon: "🌐",
    stack: ["JavaScript (ES6+)", "React", "Next.js", "Node.js", "TypeScript", "Express.js"],
    color: "#7b4dff"
  },
  {
    title: "E-Commerce",
    description: "Full-service e-commerce solutions",
    icon: "🛒",
    stack: ["Shopify", "WooCommerce", "Payment Gateways", "Inventory Systems"],
    color: "#ff4d8d"
  },
  {
    title: "Design Tools",
    description: "Professional design implementation",
    icon: "🎨",
    stack: ["Figma", "Adobe XD", "Photoshop", "WebGL", "Three.js"],
    color: "#00c6ff"
  },
  {
    title: "AI & Cloud",
    description: "Intelligent solutions infrastructure",
    icon: "☁️",
    stack: ["Python", "TensorFlow", "AWS", "Firebase", "Docker"],
    color: "#ffa800"
  }
];

const Tools = () => {
  const ref = useRef();
  const [hoveredCard, setHoveredCard] = useState(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  // Animation variants
  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px var(--card-shadow)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.section className="tools" ref={ref}>
      {/* Enhanced Animated Background */}
      <motion.div 
        className="elite-bg"
        variants={bgVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="quantum-dots" />
        <div className="holographic-grid" />
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
        </div>
      </motion.div>

      <div className="headerSection">
        <motion.div 
          className="textContainer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p>
            Leveraging Modern Technologies
            <br /> to Drive Digital Innovation
          </p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "backOut" }}
          />
        </motion.div>

        <div className="titleContainer">
          <motion.div
            className="title"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h1><span className="highlight">Tech</span> Stack</h1>
          </motion.div>
          <motion.div
            className="title"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h1><span className="highlight">&</span> Expertise</h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="gridContainer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.0 }}
      >
        {tools.map((tool, index) => (
          <motion.div 
            key={index}
            className="toolCard"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            custom={index}
            style={{ 
              "--card-color": tool.color,
              "--card-shadow": `${tool.color}40`
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="cardContent">
              <div className="iconWrapper">
                <div className="iconGlow" />
                <div className="icon">{tool.icon}</div>
              </div>
              
              <h3>{tool.title}</h3>
              <p className="description">{tool.description}</p>
              
              <div className="stack">
                {tool.stack.map((item, i) => (
                  <motion.span 
                    key={i}
                    className="stackItem"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { 
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.5 + i * 0.05,
                        duration: 0.4
                      }
                    } : {}}
                    whileHover={{
                      y: -3,
                      backgroundColor: "rgba(255,255,255,0.1)"
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="cardReflection" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Tools;