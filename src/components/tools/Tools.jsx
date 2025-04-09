import { useRef, useState } from "react";
import "./tools.scss";
import { motion, useInView } from "framer-motion";

const tools = [
  {
    title: "Web Development",
    description: "Modern web development using cutting-edge technologies",
    icon: "🌐",
    stack: ["JavaScript (ES6+)", "React", "Next.js", "Node.js", "TypeScript", "Express.js"],
    color: "#7b4dff",
    particles: ["⚡", "🚀", "💻", "🔌"]
  },
  {
    title: "E-Commerce",
    description: "Full-service e-commerce solutions",
    icon: "🛒",
    stack: ["Shopify", "WooCommerce", "Payment Gateways", "Inventory Systems"],
    color: "#ff4d8d",
    particles: ["💰", "🛍️", "📦", "💳"]
  },
  {
    title: "Design Tools",
    description: "Professional design implementation",
    icon: "🎨",
    stack: ["Figma", "Adobe XD", "Photoshop", "WebGL", "Three.js"],
    color: "#00c6ff",
    particles: ["✨", "🎭", "🖌️", "🖼️"]
  },
  {
    title: "AI & Cloud",
    description: "Intelligent solutions infrastructure",
    icon: "☁️",
    stack: ["Python", "TensorFlow", "AWS", "Firebase", "Docker"],
    color: "#ffa800",
    particles: ["🧠", "🤖", "🔮", "📊"]
  }
];

const cardVariants = {
  initial: { 
    y: 100,
    opacity: 0,
    rotateX: -15,
    scale: 0.9
  },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.15,
      rotateX: { duration: 0.5 }
    }
  }),
  hover: {
    y: -20,
    rotateX: 5,
    rotateY: 5,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};

const particleVariants = {
  initial: { 
    opacity: 0,
    y: 0,
    x: 0
  },
  animate: (i) => {
    const angle = (i * 90) + 45;
    const radius = 100;
    return {
      opacity: [0, 1, 0],
      y: Math.sin(angle * (Math.PI/180)) * radius,
      x: Math.cos(angle * (Math.PI/180)) * radius,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * 0.3,
        ease: "easeInOut"
      }
    }
  }
};

const Tools = () => {
  const ref = useRef();
  const [hoveredCard, setHoveredCard] = useState(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <motion.section className="tools" ref={ref}>
      <div className="elite-bg">
        <div className="quantum-dots" />
        <div className="holographic-grid" />
        <div className="floating-shapes" />
      </div>

      <div className="headerSection">
        <motion.div 
          className="textContainer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Leveraging Modern Technologies
            <br /> to Drive Digital Innovation
          </motion.p>
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
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
                animate={{
                  textShadow: [
                    "0 0 0px #7b4dff",
                    "0 0 10px #7b4dff",
                    "0 0 0px #7b4dff"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                Tech
              </motion.span> Stack
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
                animate={{
                  textShadow: [
                    "0 0 0px #ff4d8d",
                    "0 0 10px #ff4d8d",
                    "0 0 0px #ff4d8d"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                &
              </motion.span> Expertise
            </motion.h1>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="gridContainer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        {tools.map((tool, index) => (
          <motion.div 
            key={index}
            className="toolCard"
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            whileHover="hover"
            custom={index}
            style={{ "--card-color": tool.color }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="cardContent">
              <div className="iconWrapper">
                <div className="iconGlow" />
                <div className="icon">{tool.icon}</div>
                <div className="iconParticles">
                  {tool.particles.map((particle, i) => (
                    <motion.span
                      key={i}
                      className="particle"
                      variants={particleVariants}
                      animate={hoveredCard === index ? "animate" : "initial"}
                      custom={i}
                    >
                      {particle}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <h3>{tool.title}</h3>
              <p className="description">{tool.description}</p>
              
              <div className="stack">
                {tool.stack.map((item, i) => (
                  <motion.span 
                    key={i}
                    className="stackItem"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { 
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.5 + i * 0.1,
                        type: "spring",
                        stiffness: 500
                      }
                    } : {}}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transition: { type: "spring", stiffness: 800 }
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="cardReflection" />
            <div className="cardHologram" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Tools;