import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingDown, CheckCircle2 } from 'lucide-react';
import './index.css';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 10 : -10,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? -10 : 10,
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemAnim = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    transition: { type: 'spring', stiffness: 200, damping: 20 } 
  }
};

const slides = [
  { id: 1, type: 'hero', title: 'INST НА МІЛЬЙОН', subtitle: 'Твій instagram приваблює клієнтів' },
  { id: 2, type: 'title', title: 'ЯКІ ПРОБЛЕМИ ВИРІШУЄ', highlight: 'INST НА МІЛЬЙОН' },
  { id: 3, type: 'problemsGrid', items: [
      { num: '01', text: 'Хаотичне ведення блогу' }, { num: '02', text: 'Пошук актуальних тем' },
      { num: '03', text: 'Написання сценаріїв' }, { num: '04', text: 'Не якісний контент' },
      { num: '05', text: 'Слабка упаковка профілю та недовіра клієнтів' }, { num: '06', text: 'Відсутність унікальності серед конкурентів' },
      { num: '07', text: 'Неможливість підняти чек' }, { num: '08', text: 'Невпевненість у правильності дій' },
      { num: '09', text: 'Відсутність зворотнього зв\'язку та росту' }, { num: '10', text: 'Страх камери та невпевнений прояв' }
    ]
  },
  { id: 4, type: 'title-danger', title: 'ДО ЧОГО ПРИЗВОДИТЬ', highlight: 'НЕ ВИРІШЕННЯ ЦИХ ПРОБЛЕМ СЬОГОДНІ?' },
  { id: 5, type: 'consequences', items: [
      { text: 'Надія тільки на сарафан — нестабільні записи' }, { text: 'Втрата впевненості в експертності' },
      { text: 'Неможливість підняти чек і прогнозовано залучати платоспроможних клієнтів' }, { text: 'Стагнація особистого бренду в Instagram' },
      { text: 'Вигорання від контенту без результату' }, { text: 'Відсутність росту та масштабування' }
    ]
  },
  { id: 6, type: 'title', title: 'З НАМИ ТИ', highlight: 'ОТРИМАЄШ РЕЗУЛЬТАТ, НАВІТЬ ЯКЩО...' },
  { id: 7, type: 'objections', items: [
      { text: 'Є ВСЬОГО 2 ВІЛЬНІ ГОДИНИ В ТИЖДЕНЬ', invert: true }, { text: 'НЕМАЄ ДОСВІДУ ВЕДЕННЯ СОЦМЕРЕЖ', invert: false },
      { text: 'МАЛО ПІДПИСНИКІВ', invert: true }, { text: 'ПРОБУВАЛА, АЛЕ НЕ ВИЙШЛО', invert: false },
      { text: 'СУМНІВАЄШСЯ В СОБІ', invert: false }, { text: 'ЩІЛЬНИЙ ГРАФІК', invert: true },
      { text: 'НІКОЛИ НЕ ПРАЦЮВАЛА В СММ', invert: false }, { text: 'ТИ У МАЛЕНЬКОМУ МІСТІ', invert: true }
    ]
  },
  { id: 8, type: 'title', title: 'ЩО КОНКРЕТНО', highlight: 'ВИ ОТРИМАЄТЕ?' },
  { id: 9, type: 'cost-comparison', title: 'СКІЛЬКИ ЦЕ КОШТУЄ,\nЯКЩО РОБИТИ САМОСТІЙНО', items: [
      { title: 'СУПРОВІД ПРОДЮСЕРА', cost: '150€ (7500+ ГРН)' }, { title: 'СТВОРЕННЯ 10 СЦЕНАРІЇВ', cost: '5€ = 50€ (2500 ГРН)' },
      { title: 'МОНТАЖ ВІДЕО', cost: '5€ = 50€ (2500 ГРН)' }, { title: 'ЗРОБИТИ ДИЗАЙН', cost: '5€ = 50€ (2500 ГРН)' },
      { title: 'ЗАПУСК РЕКЛАМНОЇ КАМПАНІЇ', cost: '100€ (5000 ГРН)' }
    ], total: 'Всього: 400€', subTotal: '(без урахування рекламного бюджету)'
  },
  { id: 10, type: 'team', title: 'З ВАМИ БУДЕ ПРАЦЮВАТИ КОМАНДА:', roles: [ 'ПРОДЮСЕР', 'СЦЕНАРИСТ', 'МОНТАЖЕР', 'ДИЗАЙНЕР', 'ТАРГЕТОЛОГ' ] },
  { id: 11, type: 'title', title: 'СКІЛЬКИ КОШТУЮТЬ', highlight: 'НАШІ ПОСЛУГИ?' },
  { id: 12, type: 'price', label: 'ЦІНА:', package: 'STANDART', price: '250€' },
  { id: 13, type: 'price-special', label: 'СПЕЦІАЛЬНА\nПРОПОЗИЦІЯ', subLabel: 'ДО КІНЦЯ ДІАГНОСТИКИ', package: 'STANDART', price: '159€' },
  { id: 14, type: 'bonuses', title: 'БОНУСИ ПРИ ПОВНІЙ ОПЛАТІ', highlight: 'ДО КІНЦЯ ДІАГНОСТИКИ', items: [
      { num: '01', text: 'Урок по веденню сторіс' }, { num: '02', text: 'Урок по налаштуванню реклами' }, { num: '03', text: 'Безкоштовний місяць у Bless Community' }
    ]
  },
  { id: 15, type: 'payment-plan', title: 'ОПЛАТА ЧАСТИНАМИ', highlight: '0% БЕЗ ПЕРЕПЛАТ', boxText: 'Від мене\nна 2 платежі', footerText: 'БЕЗ ПЕРЕПЛАТ' }
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
    <div style={{ perspective: '1500px' }}>
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
              x: { type: "spring", stiffness: 220, damping: 28 },
              opacity: { duration: 0.4 },
              rotateY: { duration: 0.5, ease: 'easeOut' }
            }}
            style={{ width: '92%', height: '86%', position: 'absolute', display: 'flex' }}
            className={slideIndex > 0 ? "glass-panel" : ""}
          >
            <SlideContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full screen click areas */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '50vw', height: '100vh', zIndex: 90, cursor: slideIndex > 0 ? 'pointer' : 'default' }} 
        onClick={() => paginate(-1)} 
      />
      <div 
        style={{ position: 'absolute', top: 0, right: 0, width: '50vw', height: '100vh', zIndex: 90, cursor: slideIndex < slides.length - 1 ? 'pointer' : 'default' }} 
        onClick={() => paginate(1)} 
      />

      <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: slideIndex === 0 ? 0.2 : 0.8, transition: 'opacity 0.3s' }}>
          <span style={{ fontSize: '12px', letterSpacing: '2px', color: '#A0A0AA', marginBottom: '8px', textTransform: 'uppercase' }}>Назад</span>
          <button className="nav-btn" onClick={() => paginate(-1)} disabled={slideIndex === 0} style={{ pointerEvents: 'auto' }}>
            <ChevronLeft size={28} color="#fff" strokeWidth={2.5} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: slideIndex === slides.length - 1 ? 0.2 : 1, transition: 'opacity 0.3s' }}>
          <span style={{ fontSize: '12px', letterSpacing: '2px', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', animation: 'pulseText 2s infinite' }}>Далі</span>
          <button className="nav-btn pulse-glow" onClick={() => paginate(1)} disabled={slideIndex === slides.length - 1} style={{ pointerEvents: 'auto' }}>
            <ChevronRight size={28} color="#fff" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="progress-container" style={{ width: '100%', top: 0, bottom: 'auto' }}>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function SlideContent({ slide }) {
  if (slide.type === 'hero') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center' }}>
        <motion.h1 
          initial={{ y: 30, opacity: 0, filter: "blur(10px)" }} 
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-gradient"
          style={{ fontSize: '7vw', fontWeight: 900, marginBottom: '30px', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.04em' }}
        >
          {slide.title}
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0, scale: 0.9 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #D43F00)',
            padding: '20px 60px',
            borderRadius: '100px',
            boxShadow: '0 20px 50px rgba(255, 90, 0, 0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <p className="title-font" style={{ fontSize: '2.5vw', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.01em' }}>
            {slide.subtitle}
          </p>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'title' || slide.type === 'title-danger') {
    const isDanger = slide.type === 'title-danger';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center', padding: '40px' }}>
        <motion.h2 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{ fontSize: '5vw', fontWeight: 800, marginBottom: '30px', textTransform: 'uppercase', color: '#fff' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
          style={{ 
            background: isDanger ? 'linear-gradient(135deg, #FF3C3C, #A00000)' : 'linear-gradient(135deg, var(--primary), #D43F00)',
            padding: '24px 64px',
            borderRadius: '100px',
            boxShadow: isDanger ? '0 20px 50px rgba(255, 60, 60, 0.4)' : '0 20px 50px var(--primary-glow)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'inline-block'
          }}
        >
          <h2 className="title-font" style={{ fontSize: '5vw', fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1 }}>
            {slide.highlight}
          </h2>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'problemsGrid') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '100%', height: '100%' }}>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', flex: 1, alignContent: 'center' }}
        >
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemAnim}
              className="card-glass"
              style={{ padding: '30px 24px', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <span className="text-gradient-primary title-font" style={{ fontSize: '42px', fontWeight: 900, marginBottom: '16px', lineHeight: 1 }}>
                {item.num}
              </span>
              <p style={{ color: '#E0E0EA', fontSize: '18px', lineHeight: 1.5, fontWeight: 500 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'consequences') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', width: '100%', height: '100%', justifyContent: 'center' }}>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', width: '90%', margin: '0 auto' }}
        >
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemAnim}
              className="card-glass"
              style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '24px', borderLeft: '4px solid #FF3C3C' }}
            >
              <div style={{ background: '#fff', borderRadius: '16px', width: '60px', height: '60px', minWidth: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(255,60,60,0.2)' }}>
                <TrendingDown color="#ff3c3c" size={32} strokeWidth={3} />
              </div>
              <p style={{ color: '#F8F9FA', fontSize: '22px', lineHeight: 1.4, fontWeight: 600, margin: 0 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'objections') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '50px', width: '100%', height: '100%', justifyContent: 'center' }}>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', flex: 1, alignContent: 'center' }}
        >
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemAnim}
              style={{ 
                background: item.invert ? 'linear-gradient(135deg, var(--primary), #D43F00)' : 'linear-gradient(135deg, #FFFFFF, #E0E0E0)', 
                borderRadius: '24px', 
                padding: '40px 30px', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%',
                minHeight: '220px',
                boxShadow: item.invert ? '0 20px 40px rgba(255, 90, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.4)',
                border: item.invert ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'
              }}
            >
              <CheckCircle2 color={item.invert ? '#fff' : 'var(--primary)'} size={48} strokeWidth={2.5} style={{ marginBottom: '20px' }} />
              <p className="title-font" style={{ color: item.invert ? '#fff' : '#030303', fontSize: '20px', lineHeight: 1.3, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'cost-comparison') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '70px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          style={{ fontSize: '3.8vw', fontWeight: 900, marginBottom: '50px', textTransform: 'uppercase', whiteSpace: 'pre-line', lineHeight: 1.1 }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: '28px', flex: 1, justifyContent: 'center' }}
        >
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemAnim}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px' }}
            >
              <span className="text-gradient-primary title-font" style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '0.02em' }}>
                {item.title}
              </span>
              <span style={{ flex: 1, borderTop: '2px dotted rgba(255,255,255,0.2)', margin: '0 30px', opacity: 0.5 }} />
              <span style={{ color: '#fff', fontSize: '26px', fontWeight: 600, fontFamily: 'monospace' }}>
                {item.cost}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '50px' }}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary), #D43F00)', 
            padding: '20px 48px', 
            borderRadius: '16px', 
            fontSize: '48px', 
            fontWeight: 900,
            boxShadow: '0 20px 40px rgba(255,90,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {slide.total}
          </div>
          <span style={{ fontSize: '26px', color: 'var(--text-muted)', fontWeight: 500 }}>{slide.subTotal}</span>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'team') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          style={{ fontSize: '4.5vw', fontWeight: 900, marginBottom: '80px', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '-0.02em' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', maxWidth: '1000px' }}
        >
          {slide.roles.map((role, idx) => (
            <motion.div 
              key={idx}
              variants={itemAnim}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-glass title-font"
              style={{ 
                padding: '30px 60px',
                borderRadius: '20px',
                fontSize: '28px',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '0.05em',
                cursor: 'default'
              }}
            >
              {role}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'price') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: '60px', gap: '60px' }}>
        <motion.h2 
          initial={{ x: -40, opacity: 0, filter: 'blur(10px)' }} 
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }} 
          transition={{ duration: 0.8 }}
          className="text-gradient"
          style={{ fontSize: '8vw', fontWeight: 900, letterSpacing: '-0.03em' }}
        >
          {slide.label}
        </motion.h2>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
          style={{ 
            background: 'rgba(30, 30, 35, 0.8)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '32px',
            overflow: 'hidden',
            minWidth: '450px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 2px 20px rgba(255,255,255,0.05)'
          }}
        >
          <div style={{ background: 'linear-gradient(90deg, var(--primary), #D43F00)', padding: '24px', textAlign: 'center', fontSize: '36px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {slide.package}
          </div>
          <div className="title-font" style={{ padding: '80px 40px', textAlign: 'center', fontSize: '7vw', fontWeight: 900, color: '#fff', textShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
            {slide.price}
          </div>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'price-special') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: '60px', gap: '70px' }}>
        <motion.div 
          initial={{ x: -40, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h2 className="title-font text-gradient-primary" style={{ fontSize: '6vw', fontWeight: 900, whiteSpace: 'pre-line', lineHeight: 1.05, marginBottom: '24px' }}>
            {slide.label}
          </h2>
          <h3 style={{ fontSize: '2.2vw', fontWeight: 600, color: '#E0E0EA', letterSpacing: '0.02em' }}>
            {slide.subLabel}
          </h3>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.5 }}
          style={{ 
            background: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)',
            borderRadius: '32px',
            overflow: 'hidden',
            minWidth: '450px',
            boxShadow: '0 40px 100px rgba(255,90,0,0.6)',
            color: '#000',
            position: 'relative'
          }}
        >
          {/* subtle shine effect */}
          <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'skewX(-20deg)', animation: 'shine 3s infinite' }} />
          <style>{`@keyframes shine { 0% { left: -100% } 20% { left: 200% } 100% { left: 200% } }`}</style>

          <div style={{ background: 'linear-gradient(90deg, var(--primary), #FF2A00)', padding: '24px', textAlign: 'center', fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>
            {slide.package}
          </div>
          <div className="title-font" style={{ padding: '80px 40px', textAlign: 'center', fontSize: '8vw', fontWeight: 900, color: '#D40000', position: 'relative', zIndex: 1 }}>
            {slide.price}
          </div>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'bonuses') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          style={{ fontSize: '3.8vw', fontWeight: 900, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: -20, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #D43F00)', 
            padding: '20px 60px', 
            borderRadius: '100px', 
            marginBottom: '80px',
            boxShadow: '0 20px 50px rgba(255,90,0,0.3)'
          }}
        >
          <h2 className="title-font" style={{ fontSize: '3.8vw', fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
          className="card-glass"
          style={{ 
            padding: '50px',
            display: 'flex',
            gap: '40px',
            position: 'relative',
            width: '95%',
            borderRadius: '32px'
          }}
        >
          <div style={{ 
            position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', 
            background: 'linear-gradient(90deg, var(--primary), #FF8340)', 
            padding: '12px 50px', borderRadius: '30px', fontSize: '28px', fontWeight: 900, 
            boxShadow: '0 10px 30px rgba(255,90,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', letterSpacing: '0.05em'
          }}>
            БОНУСИ
          </div>
          
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + (idx * 0.15) }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '24px' }}
            >
              <div className="title-font text-gradient-primary" style={{ fontSize: '100px', fontWeight: 900, opacity: 0.3, lineHeight: 0.8 }}>{item.num}</div>
              <div style={{ fontSize: '26px', fontWeight: 600, lineHeight: 1.3, color: '#F8F9FA' }}>{item.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'payment-plan') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center', padding: '40px' }}>
        <motion.h2 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }}
          style={{ fontSize: '5vw', fontWeight: 900, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #D43F00)', 
            padding: '24px 64px', 
            borderRadius: '100px', 
            marginBottom: '80px',
            boxShadow: '0 30px 60px rgba(255,90,0,0.4)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <h2 className="title-font" style={{ fontSize: '4.8vw', fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
        
        <motion.div
           initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
           animate={{ scale: 1, opacity: 1, rotateX: 0 }}
           transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
           style={{ 
             background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(10,10,10,0.9))',
             backdropFilter: 'blur(20px)',
             border: '1px solid rgba(255,90,0,0.3)',
             padding: '50px 100px',
             borderRadius: '32px',
             boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 40px rgba(255,90,0,0.1)'
           }}
        >
          <h3 className="text-gradient-primary title-font" style={{ fontSize: '3.5vw', fontWeight: 900, whiteSpace: 'pre-line', margin: 0, lineHeight: 1.2 }}>
            {slide.boxText}
          </h3>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: '50px', fontSize: '2.5vw', fontWeight: 700, letterSpacing: '0.1em', color: '#888' }}
        >
          {slide.footerText}
        </motion.div>
      </div>
    );
  }

  return null;
}

export default App;
