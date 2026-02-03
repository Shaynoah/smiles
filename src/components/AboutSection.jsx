import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './AboutSection.css'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="about-section" id="about">
      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="about-title">About SmileSmith Ltd</h2>
            <p className="about-description">
              At SmileSmith Ltd, we are dedicated to revolutionizing dental care
              through innovative implant solutions and advanced GBR (Guided Bone
              Regeneration) products. With years of expertise and a commitment
              to excellence, we provide dental professionals worldwide with
              cutting-edge technology that transforms patient outcomes.
            </p>
            <p className="about-description">
              Our mission is to combine precision engineering with clinical
              excellence, ensuring every product meets the highest standards of
              quality and reliability. We understand that behind every implant
              is a patient's smile, and we take that responsibility seriously.
            </p>
            <div className="about-features">
              <motion.div
                className="about-feature"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="feature-dot"></div>
                <span>ISO Certified Manufacturing</span>
              </motion.div>
              <motion.div
                className="about-feature"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="feature-dot"></div>
                <span>Global Distribution Network</span>
              </motion.div>
              <motion.div
                className="about-feature"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="feature-dot"></div>
                <span>Expert Clinical Support</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="visual-card">
              <motion.div
                className="card-decoration"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="card-content">
                <div className="card-icon">🦷</div>
                <h3>Excellence in Every Detail</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection
