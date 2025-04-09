import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import "./hero.scss";

const Hero = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);
  const title = "Manaf Alsaoub".split("");
  const subtitle = "Web Developer & UI Designer".split("");

  // Master animation sequence
  useEffect(() => {
    const masterAnimation = async () => {
      await controls.start("visible");
      await controls.start({
        rotate: 360,
        transition: { duration: 60, repeat: Infinity, ease: "linear" }
      });
    };
    masterAnimation();

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        controls.start({
          x: (x - 0.5) * 20,
          y: (y - 0.5) * 20,
          transition: { type: "spring", stiffness: 100, damping: 10 }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  // Text animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Character animation
  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      textShadow: "0 0 0px rgba(255,255,255,0)"
    },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 0 12px currentColor",
        "0 0 0px rgba(255,255,255,0)"
      ],
      transition: { 
        duration: 1.8,
        textShadow: { 
          duration: 4, 
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    hover: {
      y: -5,
      color: "#7b4dff",
      transition: { type: "spring", stiffness: 500, damping: 10 }
    }
  };

  // Photo animation
  const photoVariants = {
    hidden: { 
      scale: 0.9, 
      opacity: 0,
      rotateY: 15,
      rotateX: 5
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      scale: 1.03,
      rotateY: 5,
      rotateX: 2,
      boxShadow: "0 25px 50px -12px rgba(98, 0, 234, 0.4)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  // Button animation
  const buttonVariants = {
    initial: { 
      y: 10,
      opacity: 0 
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px -10px rgba(98, 0, 234, 0.4)",
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    tap: { 
      scale: 0.96,
      boxShadow: "0 10px 20px -5px rgba(98, 0, 234, 0.3)"
    }
  };

  // Floating elements animation
  const floatingElements = [
    { id: 1, size: 120, x: 10, y: 20, delay: 0.1, duration: 15 },
    { id: 2, size: 80, x: 80, y: 60, delay: 0.3, duration: 20 },
    { id: 3, size: 60, x: 30, y: 80, delay: 0.5, duration: 25 },
    { id: 4, size: 100, x: 70, y: 30, delay: 0.7, duration: 18 }
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* Premium Background Elements */}
      <motion.div 
        className="elite-bg"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            transition: { duration: 1.5 }
          }
        }}
      >
        <div className="quantum-dots"></div>
        <div className="holographic-grid"></div>
        <div className="neon-lines"></div>
        
        {/* Floating 3D elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="floating-element"
            initial={{ 
              x: `${element.x}%`,
              y: `${element.y}%`,
              opacity: 0,
              rotate: 0
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              rotate: 360,
              transition: {
                opacity: { duration: element.duration, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: element.duration * 2, repeat: Infinity, ease: "linear" }
              }
            }}
            style={{
              width: element.size,
              height: element.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(123, 77, 255, 0.15) 0%, transparent 70%)`,
              position: 'absolute',
              filter: 'blur(20px)'
            }}
          />
        ))}
      </motion.div>

      <div className="hero-content">
        <motion.div 
          className="text-content"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.p 
            className="greeting"
            variants={textVariants}
            style={{ color: "#9c9cff" }}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1 className="title">
            {title.map((char, i) => (
              <motion.span 
                key={i} 
                variants={charVariants}
                whileHover="hover"
                style={{ 
                  color: "#ffffff",
                  transitionDelay: `${i * 0.05}s`,
                  display: 'inline-block'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.h2 className="subtitle">
            {subtitle.map((char, i) => (
              <motion.span 
                key={i} 
                variants={charVariants}
                whileHover="hover"
                className={char === " " ? "space" : ""}
                style={{
                  color: i < 12 ? "#7b4dff" : "#ff4d8d",
                  transitionDelay: `${i * 0.05 + 0.5}s`,
                  display: 'inline-block'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 1.8,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            style={{ color: "#c5c5ff" }}
          >
            Crafting digital experiences with clean code and beautiful design
          </motion.p>

          <motion.div 
            className="buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 2.1,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate={{ y: 0, opacity: 1, transition: { delay: 2.3 } }}
              whileHover="hover"
              whileTap="tap"
              className="portfolio-btn"
            >
              <span>🚀 Latest Works</span>
              <div className="button-aura"></div>
              <div className="button-sparkles"></div>
            </motion.button>
            <a href="#Contact">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate={{ y: 0, opacity: 1, transition: { delay: 2.4 } }}
              whileHover="hover"
              whileTap="tap"
              className="contact-btn"
            >
              <span>📬 Contact Me</span>
              <div className="button-aura"></div>
              <div className="button-sparkles"></div>
            </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <div className="visual-content">
          <motion.div 
            className="photo-container"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img 
              src="/me.png" 
              alt="Manaf Alsaoub" 
              className="profile-photo"
              loading="eager"
            />
            <div className="photo-hologram"></div>
            <div className="photo-reflection"></div>
            <div className="photo-glare"></div>
            <div className="photo-particles"></div>
          </motion.div>
        </div>
      </div>

      <div className="tech-signature">
        {["REACT", "TYPESCRIPT", "FRAMER", "NODE", "FIGMA", "GSAP", "THREE.JS", "WEBGL"].map((tech, i) => (
          <motion.span 
            key={i}
            initial={{ 
              x: i % 2 === 0 ? -100 : 100, 
              opacity: 0,
              rotate: i % 2 === 0 ? -10 : 10
            }}
            animate={{ 
              x: 0, 
              opacity: 1,
              rotate: 0,
              transition: { 
                duration: 0.8, 
                delay: i * 0.15 + 1.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }
            }}
            whileHover={{
              scale: 1.2,
              color: "#7b4dff",
              y: -8,
              textShadow: "0 5px 15px rgba(123, 77, 255, 0.5)",
              background: "rgba(123, 77, 255, 0.1)",
              borderColor: "rgba(123, 77, 255, 0.3)"
            }}
          >
            {tech}
            <span className="tech-glow"></span>
          </motion.span>
        ))}
      </div>

     
    </section>
  );
};

export default Hero;