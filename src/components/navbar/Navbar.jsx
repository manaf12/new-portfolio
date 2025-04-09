import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes,FaFacebook } from 'react-icons/fa';
import './navbar.scss'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Hero', href: '#hero' },
    { name: 'Work', href: '#work' },
    { name: 'Projects', href: '#Portfolio' },
    { name: 'Skills', href: '#tools' },
    { name: 'Services', href: '#Services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialIcons = [
    { icon: <FaGithub />, href: 'https://github.com/manaf12' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/manaf-saoub' },
    { icon: <FaFacebook />, href: 'https://twitter.com' }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="nav-container">
        {/* Logo */}
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">MS</span>
          <motion.span 
            className="logo-dot"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={item.href} className="nav-link">
                  <span className="link-number">0{index + 1}.</span>
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="social-icons">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <a href={item.href} className="mobile-nav-link">
                      <span className="link-number">0{index + 1}.</span>
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-social-icons">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;