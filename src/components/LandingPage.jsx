import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import AboutSection from './AboutSection'
import heroImage from '../images/image1.png'
import './LandingPage.css'

const LandingPage = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <motion.div
          style={{ y, opacity }}
          className="hero-background"
        >
          <div className="floating-shapes">
            <motion.div
              className="shape shape-1"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="shape shape-2"
              animate={{
                y: [0, 40, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            <motion.div
              className="shape shape-3"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 20, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-line">Expert Dental</span>
            <span className="title-line highlight">Implants & GBR</span>
            <span className="title-line">Solutions</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Transforming smiles with precision, innovation, and excellence in
            dental implant technology
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Products
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        <div className="hero-image-container">
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img
              src={heroImage}
              alt="Dental Implants"
              className="hero-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <motion.div
              className="image-glow"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                  '0 0 50px rgba(249, 115, 22, 0.4)',
                  '0 0 30px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: '🦷',
      title: 'Dental Products',
      description: 'World-class dental implants manufactured with precision',
    },
    {
      icon: '🔬',
      title: 'Dental Lab',
      description: 'Cutting-edge GBR products for optimal results',
    },
    {
      icon: '✨',
      title: 'Dental Clinic',
      description: 'Trusted by dental professionals worldwide',
    },
  ]

  return (
    <section ref={ref} className="features-section" id="products">
      <motion.div
        className="section-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Our Products
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div
                className="feature-icon"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { number: '5K+', label: 'Successful Implants' },
    { number: '100+', label: 'Dental Professionals' },
    { number: '5+', label: 'Countries Served' },
    { number: '99%', label: 'Satisfaction Rate' },
  ]

  return (
    <section ref={ref} className="stats-section">
      <motion.div
        className="stats-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="stat-number"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            >
              {stat.number}
            </motion.div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="cta-section" id="contact">
      <motion.div
        className="cta-container"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Ready to Transform Smiles?</h2>
        <p>Get in touch with our experts today</p>
        <motion.button
          className="btn btn-cta"
          whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(249, 115, 22, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
      </motion.div>
    </section>
  )
}

export default LandingPage
