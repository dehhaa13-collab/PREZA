import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Target, Rocket } from 'lucide-react';
import './index.css';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  })
};

const slides = [
  {
    id: 1,
    type: 'hero',
    title: 'THE FUTURE OF UX',
    subtitle: 'Beautiful. Dynamic. Autonomous.',
    actionText: 'Begin Presentation'
  },
  {
    id: 2,
    type: 'features',
    title: 'Core Principles',
    items: [
      { icon: Zap, title: 'Speed', text: 'Lightning fast interactions' },
      { icon: Target, title: 'Precision', text: 'Pixel-perfect typography' },
      { icon: Rocket, title: 'Scale', text: 'Ready for enterprise load' },
    ]
  },
  {
    id: 3,
    type: 'text',
    title: 'Aesthetic Focus',
    content: 'We use the power of motion, precise typography, and contrast to establish hierarchy and user intent.'
  },
  {
    id: 4,
    type: 'cta',
    title: 'Let\'s build together',
    content: '(Insert your Figma prototype content here. The presentation foundation is ready.)',
  }
];

function App() {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = Math.abs(page % slides.length);
  const currentSlide = slides[slideIndex];

  const paginate = (newDirection) => {
    if (slideIndex + newDirection < 0 || slideIndex + newDirection >= slides.length) return;
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  const progress = ((slideIndex + 1) / slides.length) * 100;

  return (
    <>
      <div className="glow-orb top-right" />
      <div className="glow-orb bottom-left" />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 }
            }}
            style={{ width: '80%', height: '70%', position: 'absolute', display: 'flex' }}
            className="glass-panel"
          >
            <SlideContent slide={currentSlide} next={() => paginate(1)} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '20px', zIndex: 100 }}>
        <button 
          className="nav-btn" 
          onClick={() => paginate(-1)} 
          disabled={slideIndex === 0}
        >
          <ChevronLeft />
        </button>
        <button 
          className="nav-btn" 
          onClick={() => paginate(1)} 
          disabled={slideIndex === slides.length - 1}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="progress-container" style={{ width: '100%' }}>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}

function SlideContent({ slide, next }) {
  if (slide.type === 'hero') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center' }}>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: '5vw', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}
        >
          {slide.title}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          style={{ fontSize: '2vw', color: 'var(--text-muted)', marginBottom: '50px' }}
        >
          {slide.subtitle}
        </motion.p>
        <motion.button 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ delay: 0.6 }}
          onClick={next}
          style={{ 
            padding: '16px 48px', 
            fontSize: '20px', 
            background: 'var(--primary)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            boxShadow: '0 10px 30px var(--primary-glow)'
          }}
        >
          {slide.actionText}
        </motion.button>
      </div>
    );
  }

  if (slide.type === 'features') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: '3vw', fontWeight: 800, marginBottom: '60px' }}
        >
          {slide.title}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', flex: 1, placeItems: 'center' }}>
          {slide.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                <div style={{ padding: '24px', background: 'rgba(255, 90, 0, 0.1)', borderRadius: '24px', marginBottom: '24px' }}>
                  <Icon size={48} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.6 }}>{item.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px', width: '100%', height: '100%' }}>
      <motion.h2 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2 }}
        style={{ fontSize: '4vw', fontWeight: 800, marginBottom: '40px', color: 'var(--primary)' }}
      >
        {slide.title}
      </motion.h2>
      <motion.p 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4 }}
        style={{ fontSize: '32px', lineHeight: 1.5, maxWidth: '80%' }}
      >
        {slide.content}
      </motion.p>
    </div>
  );
}

export default App;
