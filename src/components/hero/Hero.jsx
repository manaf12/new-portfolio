import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import "./hero.scss";

const Hero = () => {
  const controls = useAnimation();
  const heroRef = useRef(null);
  const title = "Manaf Alsaoub".split("");
  const subtitle = "Web Developer & AI Specialist".split("");

  // Throttle function for performance
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

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
  }, [controls]);

  // Mouse parallax effect
  const handleMouseMove = useCallback((e) => {
    if (heroRef.current) {
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      controls.start({
        x: (x - 0.5) * 10,
        y: (y - 0.5) * 10,
        transition: { type: "spring", stiffness: 100, damping: 10 }
      });
    }
  }, [controls]);

  useEffect(() => {
    const throttledMouseMove = throttle(handleMouseMove, 50);
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [handleMouseMove]);

  // Text animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(2px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Character animation
  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      textShadow: "0 0 0px rgba(255,255,255,0)"
    },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 0 8px currentColor",
        "0 0 0px rgba(255,255,255,0)"
      ],
      transition: { 
        duration: 1.2,
        textShadow: { 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    hover: {
      y: -4,
      color: "#7b4dff",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Photo animation
  const photoVariants = {
    hidden: { 
      scale: 0.95,
      opacity: 0,
      rotateY: 10,
      rotateX: 3
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      scale: 1.02,
      rotateY: 3,
      rotateX: 1,
      boxShadow: "0 20px 40px -10px rgba(98, 0, 234, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 200,
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
      y: -5,
      boxShadow: "0 15px 30px -8px rgba(98, 0, 234, 0.3)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 12
      }
    },
    tap: { 
      scale: 0.96,
      boxShadow: "0 8px 15px -5px rgba(98, 0, 234, 0.25)"
    }
  };

  // Floating elements
  const floatingElements = [
    { id: 1, size: 100, x: 10, y: 20, delay: 0.1, duration: 12 },
    { id: 2, size: 70, x: 80, y: 60, delay: 0.3, duration: 16 },
    { id: 3, size: 50, x: 30, y: 80, delay: 0.5, duration: 20 },
    { id: 4, size: 80, x: 70, y: 30, delay: 0.7, duration: 15 }
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* Enhanced Background Elements */}
      <motion.div 
        className="elite-bg"
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 5,
            transition: { duration: 1.2 }
          }
        }}
      >
        {/* Parallax layers */}
        <motion.div 
          className="parallax-layer deep-layer"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.8,
            transition: { duration: 1.5 }
          }}
        />
        
        <motion.div 
          className="parallax-layer mid-layer"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            transition: { duration: 1.5, delay: 0.3 }
          }}
        />
        
        <div className="quantum-dots"></div>
        <div className="holographic-grid"></div>
        <div className="neon-lines"></div>
        
        {/* Interactive cursor effect */}
        <motion.div 
          className="interactive-cursor-effect"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1 }
          }}
        />
        
        {/* Floating elements */}
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
              opacity: [0.15, 0.3, 0.2],
              rotate: 360,
              transition: {
                opacity: { 
                  duration: element.duration, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                rotate: { 
                  duration: element.duration * 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }
              }
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
                  transitionDelay: `${i * 0.04}s`,
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
                  color: i < 13 ? "#7b4dff" : "#ff4d8d",
                  transitionDelay: `${i * 0.04 + 0.4}s`, 
                  display: 'inline-block'
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            className="description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 1,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            Crafting digital experiences with clean code and beautiful design
          </motion.p>

          <motion.div 
            className="buttons"
            initial={{ opacity: 0, y: 15 }} 
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 1.5, 
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <a href="#work">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate={{ y: 0, opacity: 1, transition: { delay: 1.4 } }} 
              whileHover="hover"
              whileTap="tap"
              className="portfolio-btn"
            >
              <span>🚀 Latest Works</span>
              <div className="button-aura"></div>
              <div className="button-sparkles"></div>
            </motion.button>
            </a>

            <a href="#contact">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate={{ y: 0, opacity: 1, transition: { delay: 1.5 } }} 
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
    </section>
  );
};

export default Hero;