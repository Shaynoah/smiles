import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import logo from '../images/logo.png'
import { processImage } from '../utils/removeWhiteBackground'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [processedLogo, setProcessedLogo] = useState(null)
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Process the logo to remove white background
    const processLogo = async () => {
      try {
        const processed = await processImage(logo, 240)
        setProcessedLogo(processed)
      } catch (error) {
        console.warn('Could not process logo, using original:', error)
        setProcessedLogo(logo)
      }
    }
    
    processLogo()
  }, [])

  const navItems = [
    { name: 'Our Products', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 }
        }}
      >
        <div className="nav-container">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              scale: { type: "spring", stiffness: 400, damping: 17 }
            }}
          >
            <Link
              to="/"
              className="logo"
            >
            <div className="logo-wrapper">
              <motion.img
                ref={imgRef}
                src={processedLogo || logo}
                alt="SmileSmith Ltd Logo"
                className="logo-img"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0,
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  filter: 'brightness(1.1)',
                  rotate: [0, -5, 5, -5, 0],
                  scale: 1.05
                }}
              />
              <motion.div 
                className="logo-separator"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scaleY: 1.1 }}
              />
              <motion.div 
                className="logo-text-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.span 
                  className="logo-company-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    color: 'var(--orange)',
                    transition: { duration: 0.2 }
                  }}
                >
                  SmileSmith
                </motion.span>
                <motion.span 
                  className="logo-company-suffix"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    color: 'var(--orange)',
                    transition: { duration: 0.2 }
                  }}
                >
                  Experts in Implants & GBR products
                </motion.span>
              </motion.div>
            </div>
          </Link>
          </motion.div>

        <div className="nav-links">
          {navItems.map((item, index) => {
            const isExternal = item.href.startsWith('#')
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ 
                  delay: index * 0.15 + 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                {isExternal ? (
                  <motion.a
                    href={item.href}
                    className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    whileHover={{ 
                      scale: 1.1, 
                      color: 'var(--orange)',
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="nav-link-text">{item.name}</span>
                  </motion.a>
                ) : (
                  <motion.div
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.href}
                      className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    >
                      <span className="nav-link-text">{item.name}</span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span 
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.span>
        </motion.button>
      </div>

      <motion.div
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {navItems.map((item, index) => {
          const isExternal = item.href.startsWith('#')
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              {isExternal ? (
                <motion.a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 10, color: 'var(--orange)' }}
                >
                  {item.name}
                </motion.a>
              ) : (
                <Link
                  to={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          )
        })}
      </motion.div>
      </motion.nav>
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
    </>
  )
}

export default Navbar
