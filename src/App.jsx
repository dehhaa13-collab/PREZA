import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingDown, CheckCircle2, ChevronDown } from 'lucide-react';
import './index.css';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemAnim = {
  hidden: { y: 30, opacity: 0, scale: 0.98 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

const titleAnim = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const orb1Color = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["#FF5A00", "#FF1100", "#1E90FF", "#FF5A00"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF5B00, #FFB088)', transformOrigin: '0%', scaleX: scrollYProgress, zIndex: 1000, boxShadow: '0 0 15px rgba(255, 90, 0, 0.8)' }} />
      
      <div className="fixed-bg">
        <motion.div 
          className="glow-orb" 
          style={{ width: '50vw', height: '50vw', top: '-10vh', right: '-10vw', y: orb1Y, background: orb1Color, opacity: 0.5, willChange: 'transform' }} 
        />
        <motion.div 
          className="glow-orb" 
          style={{ width: '60vw', height: '60vw', bottom: '-20vh', left: '-15vw', y: orb2Y, background: '#220800', opacity: 0.8, willChange: 'transform' }} 
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        {slides.map((slide) => (
          <section 
            key={slide.id} 
            style={{ 
              minHeight: '100vh',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              padding: '10vh 5%',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', maxWidth: '1400px', position: 'relative', margin: '0 auto' }}>
               <SlideSection slide={slide} isHero={slide.type === 'hero'} />
            </div>
            
            {slide.type === 'hero' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <span className="title-font" style={{ fontSize: '14px', letterSpacing: '4px', color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Гортай вниз</span>
                <ChevronDown color="#FF5A00" size={32} />
              </motion.div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

const viewConfig = { once: true, margin: "-50px" };

function SlideSection({ slide, isHero }) {
  if (isHero) {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.h1 variants={titleAnim} className="text-gradient title-font clamp-h1" style={{ fontWeight: 900, marginBottom: '30px', textTransform: 'uppercase' }}>
          {slide.title}
        </motion.h1>
        <motion.div variants={itemAnim} className="pill-primary">
          <p className="title-font clamp-sub" style={{ fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '0.02em' }}>
            {slide.subtitle}
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'title' || slide.type === 'title-danger') {
    const isDanger = slide.type === 'title-danger';
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2" style={{ fontWeight: 800, marginBottom: '40px', textTransform: 'uppercase', color: '#fff' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={itemAnim} className={isDanger ? "pill-danger" : "pill-primary"}>
          <h2 className="title-font clamp-h2-large" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'problemsGrid') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column' }}>
        <motion.div variants={staggerContainer} className="grid-5-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <span className="text-gradient-primary title-font clamp-h2" style={{ fontWeight: 900, marginBottom: '16px' }}>{item.num}</span>
              <p className="clamp-p" style={{ color: '#E0E0EA', fontWeight: 500 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'consequences') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div variants={staggerContainer} className="grid-2-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass" style={{ padding: '40px', display: 'flex', alignItems: 'center', gap: '30px', borderLeft: '4px solid #FF3C3C' }}>
              <div style={{ background: '#fff', borderRadius: '16px', minWidth: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown color="#ff3c3c" size={32} strokeWidth={3} />
              </div>
              <p className="clamp-sub" style={{ color: '#F8F9FA', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'objections') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div variants={staggerContainer} className="grid-4-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ background: item.invert ? 'linear-gradient(135deg, var(--primary), #D43F00)' : 'linear-gradient(135deg, #FFFFFF, #E0E0E0)', padding: '50px 30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '260px', boxShadow: item.invert ? '0 20px 40px rgba(255, 90, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.4)' }}>
              <CheckCircle2 color={item.invert ? '#fff' : 'var(--primary)'} size={64} strokeWidth={2.5} style={{ marginBottom: '30px' }} />
              <p className="title-font clamp-sub" style={{ color: item.invert ? '#fff' : '#030303', fontWeight: 800, textTransform: 'uppercase', margin: 0, lineHeight: 1.3 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'cost-comparison') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2" style={{ fontWeight: 900, marginBottom: '60px', textTransform: 'uppercase', whiteSpace: 'pre-line' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
              <span className="text-gradient-primary title-font clamp-sub" style={{ fontWeight: 800 }}>{item.title}</span>
              <span style={{ flex: 1, minWidth: '100px', borderTop: '2px dotted rgba(255,255,255,0.2)', opacity: 0.5 }} />
              <span className="clamp-sub" style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>{item.cost}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={itemAnim} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '40px', marginTop: '60px' }}>
          <div className="pill-primary title-font clamp-h2-large" style={{ fontWeight: 900, padding: '20px 60px' }}>
            {slide.total}
          </div>
          <span className="clamp-sub" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{slide.subTotal}</span>
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'team') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2-large" style={{ fontWeight: 900, marginBottom: '80px', textTransform: 'uppercase', textAlign: 'center' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={staggerContainer} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', maxWidth: '1000px' }}>
          {slide.roles.map((role, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass title-font clamp-sub" style={{ padding: '30px 60px', borderRadius: '100px', fontWeight: 900, color: '#fff' }}>
              {role}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'price') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '80px' }}>
        <motion.h2 variants={titleAnim} className="text-gradient title-font clamp-h1" style={{ fontWeight: 900, textAlign: 'center' }}>{slide.label}</motion.h2>
        <motion.div variants={itemAnim} style={{ background: 'rgba(30, 30, 35, 0.8)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '40px', overflow: 'hidden', minWidth: 'min(100%, 500px)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
          <div className="clamp-sub" style={{ background: 'linear-gradient(90deg, var(--primary), #D43F00)', padding: '30px', textAlign: 'center', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{slide.package}</div>
          <div className="title-font clamp-h1" style={{ padding: '100px 40px', textAlign: 'center', fontWeight: 900, color: '#fff' }}>{slide.price}</div>
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'price-special') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '80px' }}>
        <motion.div variants={titleAnim} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <h2 className="title-font text-gradient-primary clamp-h1" style={{ fontWeight: 900, whiteSpace: 'pre-line', marginBottom: '30px' }}>{slide.label}</h2>
          <h3 className="clamp-sub" style={{ fontWeight: 600, color: '#E0E0EA', letterSpacing: '0.02em', background: 'rgba(255,255,255,0.1)', padding: '15px 40px', borderRadius: '100px', display: 'inline-block', margin: '0 auto' }}>{slide.subLabel}</h3>
        </motion.div>
        
        <motion.div variants={itemAnim} style={{ background: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)', borderRadius: '40px', overflow: 'hidden', minWidth: 'min(100%, 500px)', boxShadow: '0 40px 100px rgba(255,90,0,0.6)' }}>
          <div className="clamp-sub" style={{ background: 'linear-gradient(90deg, var(--primary), #FF2A00)', padding: '30px', textAlign: 'center', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>{slide.package}</div>
          <div className="title-font clamp-h1" style={{ padding: '100px 40px', textAlign: 'center', fontWeight: 900, color: '#D40000' }}>{slide.price}</div>
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'bonuses') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2" style={{ fontWeight: 900, marginBottom: '24px', textTransform: 'uppercase', textAlign: 'center' }}>{slide.title}</motion.h2>
        <motion.div variants={itemAnim} className="pill-primary" style={{ marginBottom: '100px' }}>
          <h2 className="title-font clamp-h2" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>{slide.highlight}</h2>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="card-glass" style={{ padding: '80px 50px', display: 'flex', flexWrap: 'wrap', gap: '60px', position: 'relative', width: '100%', borderRadius: '40px' }}>
          <div className="clamp-sub" style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, var(--primary), #FF8340)', padding: '20px 60px', borderRadius: '100px', fontWeight: 900 }}>БОНУСИ</div>
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
              <div className="title-font text-gradient-primary clamp-h1" style={{ fontWeight: 900, opacity: 0.3, lineHeight: 0.8 }}>{item.num}</div>
              <div className="clamp-sub" style={{ fontWeight: 600, lineHeight: 1.4, color: '#F8F9FA' }}>{item.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (slide.type === 'payment-plan') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2" style={{ fontWeight: 900, marginBottom: '40px', textTransform: 'uppercase' }}>{slide.title}</motion.h2>
        <motion.div variants={itemAnim} className="pill-primary" style={{ marginBottom: '100px' }}>
          <h2 className="title-font clamp-h2-large" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>{slide.highlight}</h2>
        </motion.div>
        <motion.div variants={itemAnim} style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(10,10,10,0.9))', border: '1px solid rgba(255,90,0,0.3)', padding: '60px clamp(40px, 8vw, 120px)', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 0 40px rgba(255,90,0,0.1)' }}>
          <h3 className="text-gradient-primary title-font clamp-h2" style={{ fontWeight: 900, whiteSpace: 'pre-line', margin: 0 }}>{slide.boxText}</h3>
        </motion.div>
        <motion.div variants={itemAnim} className="clamp-sub" style={{ marginTop: '60px', fontWeight: 700, letterSpacing: '0.1em', color: '#888' }}>
          {slide.footerText}
        </motion.div>
      </motion.div>
    );
  }

  return null;
}

export default App;
