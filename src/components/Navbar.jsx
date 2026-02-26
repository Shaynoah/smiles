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
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [processedLogo, setProcessedLogo] = useState(null)
  const imgRef = useRef(null)
  const dropdownRef = useRef(null)
  const dropdownTimeoutRef = useRef(null)
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false)
      }
    }
    if (productsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [productsDropdownOpen])

  // Handle dropdown timeout for smooth hover experience
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setProductsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false)
    }, 200) // 200ms delay before closing
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
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
    { 
      name: 'Our Products', 
      href: '#products',
      hasDropdown: true,
      submenu: [
        { 
          name: 'Dental Products', 
          href: '#dental-products',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          )
        },
        { 
          name: 'Dental Lab', 
          href: '#dental-lab',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          )
        },
        { 
          name: 'Dental Clinic', 
          href: '#dental-clinic',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <path d="M9 22V12h6v10"/>
            </svg>
          )
        },
      ]
    },
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
                  SmileSmith Ltd
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
            
            // Handle dropdown menu for "Our Products"
            if (item.hasDropdown) {
              return (
                <motion.div
                  key={item.name}
                  ref={dropdownRef}
                  className="nav-item-dropdown"
                  initial={{ opacity: 0, y: -20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.a
                    href={item.href}
                    className={`nav-link ${productsDropdownOpen ? 'active' : ''}`}
                    whileHover={{ 
                      scale: 1.1, 
                      color: 'var(--orange)',
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="nav-link-text">
                      {item.name}
                      <motion.svg
                        className="dropdown-arrow"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        animate={{ rotate: productsDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M6 9L1 4h10L6 9z" />
                      </motion.svg>
                    </span>
                  </motion.a>
                  
                  <motion.div
                    className="dropdown-menu"
                    initial={false}
                    animate={{
                      opacity: productsDropdownOpen ? 1 : 0,
                      y: productsDropdownOpen ? 0 : -15,
                      scale: productsDropdownOpen ? 1 : 0.95,
                      display: productsDropdownOpen ? 'block' : 'none',
                    }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      staggerChildren: 0.1
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="dropdown-header">
                      <div className="dropdown-header-line"></div>
                      <span className="dropdown-header-text">Our Services</span>
                      <div className="dropdown-header-line"></div>
                    </div>
                    {item.submenu.map((subItem, subIndex) => (
                      <motion.a
                        key={subItem.name}
                        href={subItem.href}
                        className="dropdown-item"
                        initial={{ opacity: 0, y: -10, x: -20 }}
                        animate={{
                          opacity: productsDropdownOpen ? 1 : 0,
                          y: productsDropdownOpen ? 0 : -10,
                          x: productsDropdownOpen ? 0 : -20,
                        }}
                        transition={{ 
                          delay: subIndex * 0.08,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => setProductsDropdownOpen(false)}
                      >
                        <motion.div 
                          className="dropdown-item-icon"
                          whileHover={{ 
                            scale: 1.1
                          }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          {subItem.icon}
                        </motion.div>
                        <div className="dropdown-item-content">
                          <span className="dropdown-item-name">{subItem.name}</span>
                          <motion.div 
                            className="dropdown-item-underline"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <motion.svg
                          className="dropdown-item-arrow"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </motion.svg>
                      </motion.a>
                    ))}
                    <div className="dropdown-footer">
                      <motion.div 
                        className="dropdown-footer-accent"
                        animate={{
                          scaleX: productsDropdownOpen ? [0, 1] : 0,
                        }}
                        transition={{ 
                          delay: 0.3,
                          duration: 0.5,
                          ease: 'easeOut'
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
            }
            
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
          
          if (item.hasDropdown) {
            return (
              <div key={item.name}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setProductsDropdownOpen(!productsDropdownOpen)
                    }}
                    whileHover={{ x: 10, color: 'var(--orange)' }}
                  >
                    {item.name}
                    <motion.svg
                      className="mobile-dropdown-arrow"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      animate={{ rotate: productsDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M6 9L1 4h10L6 9z" />
                    </motion.svg>
                  </motion.a>
                </motion.div>
                <motion.div
                  className="mobile-dropdown-menu"
                  initial={false}
                  animate={{
                    height: productsDropdownOpen ? 'auto' : 0,
                    opacity: productsDropdownOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <motion.a
                      key={subItem.name}
                      href={subItem.href}
                      className="mobile-dropdown-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={productsDropdownOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: subIndex * 0.08, duration: 0.3 }}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setProductsDropdownOpen(false)
                      }}
                      whileHover={{ x: 10, color: 'var(--orange)' }}
                    >
                      <motion.div 
                        className="mobile-dropdown-item-icon"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {subItem.icon}
                      </motion.div>
                      <span>{subItem.name}</span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            )
          }
          
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
