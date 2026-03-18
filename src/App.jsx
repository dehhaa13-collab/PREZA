import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingDown, CheckCircle2, Gift } from 'lucide-react';
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
    title: 'INST НА МІЛЬЙОН',
    subtitle: 'Твій instagram приваблює клієнтів'
  },
  {
    id: 2,
    type: 'title',
    title: 'ЯКІ ПРОБЛЕМИ ВИРІШУЄ',
    highlight: 'INST НА МІЛЬЙОН'
  },
  {
    id: 3,
    type: 'problemsGrid',
    items: [
      { num: '01', text: 'Хаотичне ведення блогу' },
      { num: '02', text: 'Пошук актуальних тем' },
      { num: '03', text: 'Написання сценаріїв' },
      { num: '04', text: 'Не якісний контент' },
      { num: '05', text: 'Слабка упаковка профілю та недовіра клієнтів' },
      { num: '06', text: 'Відсутність унікальності серед конкурентів' },
      { num: '07', text: 'Неможливість підняти чек' },
      { num: '08', text: 'Невпевненість у правильності дій' },
      { num: '09', text: 'Відсутність зворотнього зв\'язку та росту' },
      { num: '10', text: 'Страх камери та невпевнений прояв' }
    ]
  },
  {
    id: 4,
    type: 'title-danger',
    title: 'ДО ЧОГО ПРИЗВОДИТЬ',
    highlight: 'НЕ ВИРІШЕННЯ ЦИХ ПРОБЛЕМ СЬОГОДНІ?'
  },
  {
    id: 5,
    type: 'consequences',
    items: [
      { text: 'Надія тільки на сарафан - нестабільні записи' },
      { text: 'Втрата впевненості в експертності' },
      { text: 'Неможливість підняти чек і прогнозовано залучати платоспроможних клієнтів' },
      { text: 'Стагнація особистого бренду в Instagram' },
      { text: 'Вигорання від контенту без результату' },
      { text: 'Відсутність росту та масштабування' }
    ]
  },
  {
    id: 6,
    type: 'title',
    title: 'З НАМИ ТИ',
    highlight: 'ОТРИМАЄШ РЕЗУЛЬТАТ, НАВІТЬ ЯКЩО...'
  },
  {
    id: 7,
    type: 'objections',
    items: [
      { text: 'Є ВСЬОГО 2 ВІЛЬНІ ГОДИНИ В ТИЖДЕНЬ', invert: true },
      { text: 'НЕМАЄ ДОСВІДУ ВЕДЕННЯ СОЦМЕРЕЖ', invert: false },
      { text: 'МАЛО ПІДПИСНИКІВ', invert: true },
      { text: 'ПРОБУВАЛА, АЛЕ НЕ ВИЙШЛО', invert: false },
      { text: 'СУМНІВАЄШСЯ В СОБІ', invert: false },
      { text: 'ЩІЛЬНИЙ ГРАФІК', invert: true },
      { text: 'НІКОЛИ НЕ ПРАЦЮВАЛА В СММ', invert: false },
      { text: 'ТИ У МАЛЕНЬКОМУ МІСТІ', invert: true }
    ]
  },
  {
    id: 8,
    type: 'title',
    title: 'ЩО КОНКРЕТНО',
    highlight: 'ВИ ОТРИМАЄТЕ?'
  },
  {
    id: 9,
    type: 'cost-comparison',
    title: 'СКІЛЬКИ ЦЕ КОШТУЄ,\nЯКЩО РОБИТИ САМОСТІЙНО',
    items: [
      { title: 'СУПРОВІД ПРОДЮСЕРА', cost: '150€ (7500+ ГРН)' },
      { title: 'СТВОРЕННЯ 10 СЦЕНАРІЇВ', cost: '5€ (250 ГРН) ЗА 1 СЦЕНАРІЙ = 50€ (2500 ГРН)' },
      { title: 'МОНТАЖ ВІДЕО', cost: '5€ (250 ГРН) - 1 ВІДЕО = 50€ (2500 ГРН)' },
      { title: 'ЗРОБИТИ ДИЗАЙН/ОБКЛАДИНКИ', cost: '5€ - 1 = 50€ (2500 ГРН)' },
      { title: 'ЗАПУСК РЕКЛАМНОЇ КАМПАНІЇ', cost: '100€ ТАРГЕТОЛОГУ (5000 ГРН)' }
    ],
    total: 'Всього: 400€',
    subTotal: '(без урахування рекламного бюджету)'
  },
  {
    id: 10,
    type: 'team',
    title: 'З ВАМИ БУДЕ ПРАЦЮВАТИ КОМАНДА:',
    roles: [
      'ПРОДЮСЕР',
      'СЦЕНАРИСТ',
      'МОНТАЖЕР',
      'ДИЗАЙНЕР',
      'ТАРГЕТОЛОГ'
    ]
  },
  {
    id: 11,
    type: 'title',
    title: 'СКІЛЬКИ КОШТУЮТЬ',
    highlight: 'НАШІ ПОСЛУГИ?'
  },
  {
    id: 12,
    type: 'price',
    label: 'ЦІНА:',
    package: 'STANDART',
    price: '250€'
  },
  {
    id: 13,
    type: 'price-special',
    label: 'СПЕЦІАЛЬНА\nПРОПОЗИЦІЯ',
    subLabel: 'ДО КІНЦЯ ДІАГНОСТИКИ',
    package: 'STANDART',
    price: '159€'
  },
  {
    id: 14,
    type: 'bonuses',
    title: 'БОНУСИ ПРИ ПОВНІЙ ОПЛАТІ',
    highlight: 'ДО КІНЦЯ ДІАГНОСТИКИ',
    items: [
      { num: '01', text: 'Урок по веденню сторіс' },
      { num: '02', text: 'Урок по налаштуванню реклами' },
      { num: '03', text: 'Безкоштовний місяць у Bless Community' }
    ]
  },
  {
    id: 15,
    type: 'payment-plan',
    title: 'ОПЛАТА ЧАСТИНАМИ',
    highlight: '0% БЕЗ ПЕРЕПЛАТ',
    boxText: 'Від мене\nна 2 платежі',
    footerText: 'БЕЗ ПЕРЕПЛАТ'
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
            style={{ width: '90%', height: '85%', position: 'absolute', display: 'flex' }}
            className={slideIndex > 0 ? "glass-panel" : ""}
          >
            <SlideContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '20px', zIndex: 100 }}>
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

function SlideContent({ slide }) {
  if (slide.type === 'hero') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center' }}>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: '7vw', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1, textTransform: 'uppercase' }}
        >
          {slide.title}
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0, scale: 0.9 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4 }}
          style={{ 
            background: 'var(--primary)',
            padding: '16px 48px',
            borderRadius: '50px',
            boxShadow: '0 10px 40px var(--primary-glow)'
          }}
        >
          <p style={{ fontSize: '2.5vw', fontWeight: 600, color: '#fff', margin: 0 }}>
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
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ fontSize: '5vw', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          style={{ 
            background: isDanger ? 'rgba(255, 60, 60, 0.9)' : 'var(--primary)',
            padding: '16px 48px',
            borderRadius: '50px',
            boxShadow: isDanger ? '0 10px 40px rgba(255, 60, 60, 0.4)' : '0 10px 40px var(--primary-glow)'
          }}
        >
          <h2 style={{ fontSize: '5vw', fontWeight: 800, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'problemsGrid') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '40px', width: '100%', height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', flex: 1, alignContent: 'center' }}>
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + (idx * 0.05) }}
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px', 
                padding: '24px 16px', 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px', color: 'var(--primary)' }}>
                {item.num}
              </span>
              <p style={{ color: '#fff', fontSize: '16px', lineHeight: 1.4, fontWeight: 500 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'consequences') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', width: '100%', height: '100%', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', width: '90%', margin: '0 auto' }}>
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px', 
                padding: '24px', 
                display: 'flex', 
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ background: '#fff', borderRadius: '12px', width: '50px', height: '50px', minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown color="#ff3c3c" size={28} strokeWidth={3} />
              </div>
              <p style={{ color: '#fff', fontSize: '20px', lineHeight: 1.3, fontWeight: 600, margin: 0 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'objections') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '40px', width: '100%', height: '100%', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', flex: 1, alignContent: 'center' }}>
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + (idx * 0.05) }}
              style={{ 
                background: item.invert ? 'var(--primary)' : '#fff', 
                borderRadius: '20px', 
                padding: '30px', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%',
                minHeight: '200px'
              }}
            >
              <CheckCircle2 color={item.invert ? '#fff' : 'var(--primary)'} size={36} style={{ marginBottom: '16px' }} />
              <p style={{ color: item.invert ? '#fff' : '#000', fontSize: '18px', lineHeight: 1.3, fontWeight: 800, textTransform: 'uppercase' }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'cost-comparison') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          style={{ fontSize: '3.5vw', fontWeight: 800, marginBottom: '40px', textTransform: 'uppercase', whiteSpace: 'pre-line' }}
        >
          {slide.title}
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center' }}>
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}
            >
              <span style={{ color: 'var(--primary)', fontSize: '24px', fontWeight: 700 }}>{item.title}</span>
              <span style={{ flex: 1, borderTop: '2px dashed rgba(255,255,255,0.2)', margin: '0 20px' }} />
              <span style={{ color: '#fff', fontSize: '24px', fontWeight: 600 }}>{item.cost}</span>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '40px' }}
        >
          <div style={{ background: 'var(--primary)', padding: '16px 32px', borderRadius: '12px', fontSize: '42px', fontWeight: 800 }}>
            {slide.total}
          </div>
          <span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>{slide.subTotal}</span>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'team') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', width: '100%', height: '100%' }}>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          style={{ fontSize: '4.5vw', fontWeight: 800, marginBottom: '60px', textTransform: 'uppercase', textAlign: 'center' }}
        >
          {slide.title}
        </motion.h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '900px' }}>
          {slide.roles.map((role, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '24px 48px',
                borderRadius: '16px',
                fontSize: '24px',
                fontWeight: 800,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              {role}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'price') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: '60px', gap: '40px' }}>
        <motion.h2 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          style={{ fontSize: '6vw', fontWeight: 800 }}
        >
          {slide.label}
        </motion.h2>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            minWidth: '400px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ background: 'var(--primary)', padding: '20px', textAlign: 'center', fontSize: '32px', fontWeight: 800, letterSpacing: '2px' }}>
            {slide.package}
          </div>
          <div style={{ padding: '60px 40px', textAlign: 'center', fontSize: '6vw', fontWeight: 900 }}>
            {slide.price}
          </div>
        </motion.div>
      </div>
    );
  }

  if (slide.type === 'price-special') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', padding: '60px', gap: '60px' }}>
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h2 style={{ fontSize: '5vw', fontWeight: 800, color: 'var(--primary)', whiteSpace: 'pre-line', lineHeight: 1.1, marginBottom: '20px' }}>
            {slide.label}
          </h2>
          <h3 style={{ fontSize: '2vw', fontWeight: 500 }}>
            {slide.subLabel}
          </h3>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            minWidth: '400px',
            boxShadow: '0 20px 50px var(--primary-glow)',
            color: '#000'
          }}
        >
          <div style={{ background: 'var(--primary)', padding: '20px', textAlign: 'center', fontSize: '32px', fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>
            {slide.package}
          </div>
          <div style={{ padding: '60px 40px', textAlign: 'center', fontSize: '7vw', fontWeight: 900, color: '#ff1414' }}>
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
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          style={{ fontSize: '3.5vw', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          style={{ background: 'var(--primary)', padding: '16px 48px', borderRadius: '50px', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '3.5vw', fontWeight: 800, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', 
          padding: '40px',
          display: 'flex',
          gap: '40px',
          position: 'relative',
          width: '90%'
        }}>
          <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', padding: '10px 40px', borderRadius: '20px', fontSize: '24px', fontWeight: 800 }}>
            БОНУСИ
          </div>
          
          {slide.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <div style={{ fontSize: '80px', fontWeight: 900, color: 'rgba(255,255,255,0.1)' }}>{item.num}</div>
              <div style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.2 }}>{item.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.type === 'payment-plan') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center', padding: '40px' }}>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          style={{ fontSize: '4.5vw', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase' }}
        >
          {slide.title}
        </motion.h2>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          style={{ background: 'var(--primary)', padding: '16px 48px', borderRadius: '50px', marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '4.5vw', fontWeight: 800, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
        
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.4 }}
           style={{ 
             background: 'linear-gradient(135deg, rgba(255,90,0,0.8), rgba(200,60,0,0.8))',
             padding: '40px 80px',
             borderRadius: '24px',
             boxShadow: '0 20px 50px rgba(255,90,0,0.4)'
           }}
        >
          <h3 style={{ fontSize: '3vw', fontWeight: 800, whiteSpace: 'pre-line', margin: 0 }}>{slide.boxText}</h3>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '40px', fontSize: '2vw', fontWeight: 600, letterSpacing: '1px', color: 'var(--text-muted)' }}
        >
          {slide.footerText}
        </motion.div>
      </div>
    );
  }

  return null;
}

export default App;
