import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: 'Connect',
    subtitle: 'Stay connected, even when networks fail.',
    image: '📡',
    color: '#3B82F6',
  },
  {
    id: 2,
    title: 'Communicate',
    subtitle: 'Send help requests or updates instantly.',
    image: '💬',
    color: '#F97316',
  },
  {
    id: 3,
    title: 'Survive',
    subtitle: 'Your community is your network.',
    image: '🤝',
    color: '#10B981',
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = async () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/home');
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          style={styles.slideContainer}
        >
          <div style={{ ...styles.slide, borderColor: slide.color }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={styles.imageContainer}
            >
              <span style={styles.imageEmoji}>{slide.image}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ ...styles.title, color: slide.color }}
            >
              {slide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={styles.subtitle}
            >
              {slide.subtitle}
            </motion.p>

            <div style={styles.dotsContainer}>
              {slides.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === index ? [1, 1.2, 1] : 1,
                    backgroundColor: i === index ? slide.color : '#94A3B8',
                  }}
                  transition={{ duration: 0.3, repeat: i === index ? Infinity : 0, repeatDelay: 1.5 }}
                  style={styles.dot}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              style={{ ...styles.button, backgroundColor: slide.color }}
            >
              {index === slides.length - 1 ? 'Get Started' : 'Next →'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#020617',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    minHeight: '100vh',
    touchAction: 'pan-y',
  },
  slideContainer: {
    width: '100%',
    maxWidth: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '24px',
    padding: '50px 30px',
    width: '100%',
    backgroundColor: '#0F172A',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  imageContainer: {
    width: '220px',
    height: '220px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '110px',
  },
  imageEmoji: {
    fontSize: '120px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '12px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: '16px',
    textAlign: 'center',
    padding: '0 30px',
    marginBottom: '30px',
    lineHeight: '24px',
  },
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '30px',
    alignItems: 'center',
    gap: '12px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '5px',
  },
  button: {
    borderRadius: '999px',
    padding: '14px 40px',
    border: 'none',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
  },
};

