import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiPhone, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import './contact.scss'

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const isInView = useInView(ref, { margin: "-100px", once: true });

  // Floating background elements
  const floatingShapes = [
    { 
      id: 1, 
      size: 120, 
      position: { x: 10, y: 20 },
      color: 'rgba(59, 130, 246, 0.08)',
      animation: {
        opacity: [0.1, 0.3, 0.1],
        x: ['10%', '12%', '10%'],
        y: ['20%', '22%', '20%'],
        transition: { duration: 15, repeat: Infinity }
      }
    },
    { 
      id: 2, 
      size: 80, 
      position: { x: 80, y: 60 },
      color: 'rgba(139, 92, 246, 0.06)',
      animation: {
        opacity: [0.1, 0.25, 0.1],
        x: ['80%', '82%', '80%'],
        y: ['60%', '62%', '60%'],
        transition: { duration: 20, repeat: Infinity }
      }
    },
    { 
      id: 3, 
      size: 150, 
      position: { x: 30, y: 70 },
      color: 'rgba(59, 130, 246, 0.05)',
      animation: {
        opacity: [0.05, 0.2, 0.05],
        x: ['30%', '32%', '30%'],
        y: ['70%', '72%', '70%'],
        transition: { duration: 25, repeat: Infinity }
      }
    }
  ];

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await emailjs.sendForm(
        "service_2dxv4oh",
        "template_j2moghv",
        formRef.current,
        "fHIJD0GWW_aRo2DAq"
      );
      setStatus({ loading: false, error: null, success: true });
      formRef.current.reset();
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 4000);
    } catch (error) {
      setStatus({ 
        loading: false, 
        error: error.message || "Failed to send message. Please try again.", 
        success: false 
      });
      setTimeout(() => setStatus(s => ({ ...s, error: null })), 5000);
    }
  };

  return (
    <motion.section
      ref={ref}
      className="contact"
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tech-inspired Background */}
      <div className="contact-background">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="floating-shape"
            initial={{ 
              x: shape.position.x + '%',
              y: shape.position.y + '%',
              opacity: 0
            }}
            animate={shape.animation}
            style={{
              width: shape.size,
              height: shape.size,
              background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
              filter: 'blur(30px)'
            }}
          />
        ))}
        
        <div className="tech-grid">
          <div className="grid-line vertical"></div>
          <div className="grid-line horizontal"></div>
          <div className="grid-line diagonal"></div>
        </div>
      </div>

      <div className="content-wrapper">
        <motion.div 
          className="text-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1>
            Let's <span className="highlight">Connect</span>
          </h1>
          <p className="subtitle">
            Ready to collaborate or have questions? Reach out and let's start a conversation.
          </p>

          <div className="contact-methods">
            <motion.div 
              className="contact-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="icon-wrapper">
                <FiMail className="icon" />
              </div>
              <div className="contact-info">
                <h3>Email</h3>
                <a href="mailto:manafsaoub02@gmail.com">
                  manafsaoub02@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="contact-card"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="icon-wrapper">
                <FiPhone className="icon" />
              </div>
              <div className="contact-info">
                <h3>Phone</h3>
                <a href="tel:+963991445188">
                  +86 152 759 10297
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div 
            className="form-card"
            whileHover={{ boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
          >
            <form ref={formRef} onSubmit={sendEmail}>
              <div className="input-group">
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input 
                    type="text" 
                    id="name"
                    required 
                    placeholder=" "
                    name="name" 
                    className="form-input"
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder=" "
                    name="email"
                    className="form-input"
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>

              <div className="input-group">
                <div className="input-wrapper">
                  <FiMessageSquare className="input-icon" />
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder=" "
                    name="message"
                    className="form-input"
                  />
                  <label htmlFor="message">Your Message</label>
                </div>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    <ImSpinner8 className="spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="icon" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status.error && (
                  <motion.div
                    className="status-message error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {status.error}
                  </motion.div>
                )}

                {status.success && (
                  <motion.div
                    className="status-message success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;