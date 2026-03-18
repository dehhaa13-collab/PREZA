import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './index.css';

function NotFound() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      {/* Ambient Background */}
      <div className="fixed-bg">
        <motion.div className="glow-orb" 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '50vw', height: '50vw', top: '10%', left: '25%', background: '#FF5A00', opacity: 0.4 }} 
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Glitching 404 Text */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="title-font"
          style={{ 
            fontSize: 'clamp(6rem, 20vw, 15rem)', 
            fontWeight: 900, 
            lineHeight: 1,
            margin: 0,
            color: '#FFF5F0',
            textShadow: '0 2px 10px rgba(255, 90, 0, 0.9), 0 0 40px rgba(255, 90, 0, 0.6), 0 0 80px rgba(255, 20, 0, 0.4)',
            letterSpacing: '-0.05em'
          }}
        >
          404
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pill-danger title-font"
          style={{ marginBottom: 'clamp(20px, 4vw, 40px)', padding: '10px 30px', boxShadow: '0 0 40px rgba(255, 60, 60, 0.4)' }}
        >
          <span style={{ fontWeight: 900, fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            СХОЖЕ, ЩОСЬ ПІШЛО НЕ ТАК
          </span>
        </motion.div>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="clamp-p text-readable" 
          style={{ color: '#A0A0AA', maxWidth: '500px', marginBottom: 'clamp(30px, 6vw, 60px)', fontWeight: 500 }}
        >
          Сторінку, яку ви шукаєте, не знайдено. Можливо, вона була видалена, перейменована, або ви просто ввели неправильну адресу.
        </motion.p>

        <motion.a 
          href="/"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.4 }}
          className="card-glass"
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '16px 32px', borderRadius: '100px',
            color: '#fff', textDecoration: 'none', fontWeight: 800,
            border: '1px solid rgba(255, 90, 0, 0.5)',
            background: 'linear-gradient(90deg, rgba(255,90,0,0.1), rgba(0,0,0,0.5))',
            boxShadow: '0 10px 30px rgba(255, 90, 0, 0.2)'
          }}
        >
          <ArrowLeft size={20} color="#FF5A00" />
          <span className="title-font" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>ПОВЕРНУТИСЬ НА ГОЛОВНУ</span>
        </motion.a>

      </div>
    </div>
  );
}

export default NotFound;
