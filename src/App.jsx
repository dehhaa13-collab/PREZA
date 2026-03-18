import React, { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingDown, CheckCircle2, ChevronDown } from 'lucide-react';
import './index.css';

const slides = [
  { id: 1, type: 'hero', title: 'INST НА МІЛЬЙОН', subtitle: 'Команда з 5 спеціалістів допомагає вести твій Instagram — від сценарію до реклами' },
  { id: 2, type: 'title', title: 'ЯКІ ПРОБЛЕМИ ВИРІШУЄ', highlight: 'INST НА МІЛЬЙОН' },
  { id: 3, type: 'problemsGrid', items: [
      { num: '01', text: 'Публікую хаотично, без плану і стратегії' }, { num: '02', text: 'Не знаю про що знімати — немає ідей' },
      { num: '03', text: 'Не вмію писати сценарії для reels' }, { num: '04', text: 'Знімаю контент, але він не приносить клієнтів' },
      { num: '05', text: 'Профіль виглядає не професійно' }, { num: '06', text: 'Мій блог нічим не відрізняється від конкурентів' },
      { num: '07', text: 'Витрачаю час на Instagram, а записів більше не стає' }, { num: '08', text: 'Роблю все сама і не знаю правильно чи ні' },
      { num: '09', text: 'Не розумію як запустити рекламу' }, { num: '10', text: 'Боюсь камери і не знаю як говорити на відео' }
    ]
  },
  { id: 4, type: 'title-danger', title: 'ДО ЧОГО ПРИЗВОДИТЬ', highlight: 'НЕ ВИРІШЕННЯ ЦИХ ПРОБЛЕМ СЬОГОДНІ?' },
  { id: 5, type: 'consequences', items: [
      { text: 'Клієнти приходять тільки по сарафану — то густо, то пусто' }, { text: 'Починаєш сумніватись у собі як в експерті' },
      { text: 'Не можеш підняти ціни — бо клієнти не бачать цінності' }, { text: 'Instagram не працює на тебе, а просто існує' },
      { text: 'Вигоряєш, бо знімаєш контент без жодного результату' }, { text: 'Конкуренти ростуть і забирають твоїх клієнтів' }
    ]
  },
  { id: 6, type: 'title', title: 'З НАМИ ТИ', highlight: 'ОТРИМАЄШ РЕЗУЛЬТАТ, НАВІТЬ ЯКЩО...' },
  { id: 7, type: 'objections', items: [
      { text: 'Є ВСЬОГО 2 ВІЛЬНІ ГОДИНИ В ТИЖДЕНЬ', invert: true }, { text: 'НЕМАЄ ДОСВІДУ ВЕДЕННЯ СОЦМЕРЕЖ', invert: false },
      { text: 'МАЛО ПІДПИСНИКІВ', invert: true }, { text: 'РАНІШЕ ПРОБУВАЛА І НЕ ВИЙШЛО', invert: false },
      { text: 'СУМНІВАЄШСЯ В СОБІ', invert: false }, { text: 'ЩІЛЬНИЙ ГРАФІК ЗАПИСІВ', invert: true },
      { text: 'НІКОЛИ НЕ ВЕЛА БЛОГ', invert: false }, { text: 'ПРАЦЮЄШ У МАЛЕНЬКОМУ МІСТІ', invert: true }
    ]
  },
  { id: 8, type: 'title', title: 'ЩО КОНКРЕТНО', highlight: 'ВИ ОТРИМАЄТЕ?' },
  { id: 9, type: 'deliverablesGrid', items: [
      { num: '01', title: 'ЗНАЙОМСТВО ТА АУДИТ', text: 'Закріплюємо за тобою персонального продюсера. Робимо глибокий розбір профілю та аналіз конкурентів.' },
      { num: '02', title: 'ПАКУВАННЯ ПРОФІЛЮ', text: 'Експрес-"ремонт" сторінки. Оформлюємо шапку, хайлайтси та стрічку так, щоб одразу викликати довіру клієнтів.' },
      { num: '03', title: 'ВІДБІР ТЕМ', text: 'Ніяких танців під тренди. Підбираємо 10 сильних експертних тем, які відповідають на болі саме твоєї аудиторії.' },
      { num: '04', title: 'НАПИСАННЯ СЦЕНАРІЇВ', text: 'Тобі не треба нічого вигадувати. Наш сценарист прописує 10 готових текстів з хуками та правильними закликами.' },
      { num: '05', title: 'ПРОЦЕС ЗЙОМКИ', text: 'Ти виділяєш лише пару годин свого часу в тиждень і записуєш відео за нашими чіткими інструкціями без стресу.' },
      { num: '06', title: 'МОНТАЖ ТА ДИЗАЙН', text: 'Робимо динамічний монтаж усіх 10 відзнятих відео, накладаємо субтитри та розробляємо соковиті обкладинки.' },
      { num: '07', title: 'ПЛАН ПУБЛІКАЦІЙ', text: 'Ти отримуєш готові відео та графік виходу. Твоя єдина задача — зайти і натиснути кнопку "Опублікувати".' },
      { num: '08', title: 'ЗАПУСК РЕКЛАМИ', text: 'Наш таргетолог тестує та запускає рекламу на найкращі ролики, щоб отримувати постійний потік заявок.' },
      { num: '09', title: 'СУПРОВІД ТА АНАЛІЗ', text: 'Ми 24/7 на зв\'язку у чаті. Аналізуємо результати за місяць, щоб далі масштабувати твій дохід.' }
    ]
  },
  { id: 10, type: 'cost-comparison', title: 'СКІЛЬКИ ЦЕ КОШТУЄ,\nЯКЩО РОБИТИ САМОСТІЙНО', items: [
      { title: 'СУПРОВІД ПРОДЮСЕРА', cost: '150€ (7 500 ГРН)' }, { title: 'СТВОРЕННЯ 10 СЦЕНАРІЇВ', cost: '50€ (2 500 ГРН)' },
      { title: 'МОНТАЖ ВІДЕО', cost: '50€ (2 500 ГРН)' }, { title: 'ЗРОБИТИ ДИЗАЙН', cost: '50€ (2 500 ГРН)' },
      { title: 'ЗАПУСК РЕКЛАМНОЇ КАМПАНІЇ', cost: '100€ (5 000 ГРН)' }
    ], total: 'Всього: 400€', subTotal: '(без урахування рекламного бюджету)'
  },
  { id: 11, type: 'team', title: 'З ВАМИ БУДЕ ПРАЦЮВАТИ КОМАНДА:', roles: [ 'ПРОДЮСЕР', 'СЦЕНАРИСТ', 'МОНТАЖЕР', 'ДИЗАЙНЕР', 'ТАРГЕТОЛОГ' ] },
  { id: 12, type: 'title', title: 'СКІЛЬКИ КОШТУЮТЬ', highlight: 'НАШІ ПОСЛУГИ?' },
  { id: 13, type: 'price', label: 'ЦІНА:', package: 'STANDART', price: '250€' },
  { id: 14, type: 'price-special', label: 'СПЕЦІАЛЬНА\nПРОПОЗИЦІЯ', subLabel: 'ДО КІНЦЯ ДІАГНОСТИКИ', package: 'STANDART', price: '169€' },
  { id: 15, type: 'bonuses', title: 'БОНУСИ ПРИ ПОВНІЙ ОПЛАТІ', highlight: 'ДО КІНЦЯ ДІАГНОСТИКИ', items: [
      { num: '01', text: 'Урок по веденню сторіс' }, { num: '02', text: 'Урок по налаштуванню реклами' }, { num: '03', text: 'Безкоштовний місяць у Bless Community' }
    ]
  },
  { id: 16, type: 'payment-plan', title: 'ОПЛАТА ЧАСТИНАМИ', highlight: '0% БЕЗ ПЕРЕПЛАТ', boxText: 'Від мене\nна 2 платежі', footerText: 'БЕЗ ПЕРЕПЛАТ' }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemAnim = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};

const titleAnim = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
};

const viewConfig = { once: true, margin: "-80px" };

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const orb1Hue = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["#FF5A00", "#FF1100", "#3366FF", "#FF5A00"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      {/* Progress Bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #FF5B00, #FFB088)', transformOrigin: '0%', scaleX: scrollYProgress, zIndex: 1000 }} />
      
      {/* Ambient Background */}
      <div className="fixed-bg">
        <motion.div className="glow-orb" style={{ width: '45vw', height: '45vw', top: '-10vh', right: '-8vw', y: orb1Y, background: orb1Hue, opacity: 0.45 }} />
        <motion.div className="glow-orb" style={{ width: '55vw', height: '55vw', bottom: '-15vh', left: '-12vw', y: orb2Y, background: '#1a0800', opacity: 0.7 }} />
      </div>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        {slides.map((slide) => (
          <section 
            key={slide.id}
            className="section-padding" 
            style={{ 
              minHeight: slide.type === 'hero' ? '100vh' : 'auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              padding: slide.type === 'hero' ? '0 5%' : '80px 5%',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', maxWidth: '1300px', margin: '0 auto' }}>
              <SlideSection slide={slide} />
            </div>
            
            {slide.type === 'hero' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                style={{ position: 'absolute', bottom: 'clamp(20px, 5vh, 50px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <span className="title-font text-readable" style={{ fontSize: '12px', letterSpacing: '3px', color: '#ccc', textTransform: 'uppercase', marginBottom: '6px' }}>Гортай вниз</span>
                <ChevronDown color="#FF5A00" size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} />
              </motion.div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

function SlideSection({ slide }) {
  // --- HERO ---
  if (slide.type === 'hero') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '60vh' }}>
        <motion.h1 variants={titleAnim} className="text-gradient title-font clamp-h1" style={{ fontWeight: 900, marginBottom: 'clamp(20px, 4vh, 40px)', textTransform: 'uppercase' }}>
          {slide.title}
        </motion.h1>
        <motion.div variants={itemAnim} className="pill-primary">
          <p className="title-font clamp-sub text-readable" style={{ fontWeight: 800, color: '#fff', margin: 0 }}>
            {slide.subtitle}
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // --- TITLE / TITLE-DANGER ---
  if (slide.type === 'title' || slide.type === 'title-danger') {
    const isDanger = slide.type === 'title-danger';
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2 text-3d" style={{ fontWeight: 800, marginBottom: 'clamp(20px, 4vh, 40px)', textTransform: 'uppercase', color: '#fff' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={itemAnim} className={isDanger ? "pill-danger" : "pill-primary"}>
          <h2 className="title-font clamp-h2-large text-3d" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>
            {slide.highlight}
          </h2>
        </motion.div>
      </motion.div>
    );
  }

  // --- PROBLEMS GRID ---
  if (slide.type === 'problemsGrid') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig}>
        <motion.div variants={staggerContainer} className="grid-5-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass" style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column' }}>
              <span className="text-gradient-primary title-font clamp-h2" style={{ fontWeight: 900, marginBottom: '12px' }}>{item.num}</span>
              <p className="clamp-p text-readable" style={{ color: '#F0F0FA', fontWeight: 500 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // --- CONSEQUENCES ---
  if (slide.type === 'consequences') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig}>
        <motion.div variants={staggerContainer} className="grid-2-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass" style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2vw, 30px)', borderLeft: '4px solid #FF3C3C' }}>
              <div style={{ background: '#fff', borderRadius: '14px', minWidth: '48px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(255, 60, 60, 0.4)' }}>
                <TrendingDown color="#ff3c3c" size={24} strokeWidth={3} />
              </div>
              <p className="clamp-sub text-readable" style={{ color: '#FFFFFF', fontWeight: 600, margin: 0 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // --- OBJECTIONS ---
  if (slide.type === 'objections') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig}>
        <motion.div variants={staggerContainer} className="grid-4-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ 
              background: item.invert ? 'linear-gradient(135deg, var(--primary), #D43F00)' : 'linear-gradient(135deg, #FFFFFF, #E8E8E8)', 
              padding: 'clamp(30px, 4vw, 50px) clamp(20px, 2vw, 30px)', 
              borderRadius: '24px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              boxShadow: item.invert ? '0 16px 32px rgba(255, 90, 0, 0.4)' : '0 16px 32px rgba(0, 0, 0, 0.5)' 
            }}>
              <CheckCircle2 color={item.invert ? '#fff' : 'var(--primary)'} size={48} strokeWidth={2.5} style={{ marginBottom: 'clamp(16px, 2vw, 30px)', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }} />
              <p className={`title-font clamp-sub ${item.invert ? 'text-3d' : ''}`} style={{ color: item.invert ? '#fff' : '#111', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // --- DELIVERABLES GRID ---
  if (slide.type === 'deliverablesGrid') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig}>
        <motion.div variants={staggerContainer} className="grid-3-cols">
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} className="card-glass" style={{ padding: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span className="text-gradient-primary title-font clamp-h2" style={{ fontWeight: 900 }}>{item.num}</span>
                <h3 className="title-font clamp-sub" style={{ fontWeight: 800, color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 1.2 }}>{item.title}</h3>
              </div>
              <p className="clamp-p" style={{ color: '#bbb', fontWeight: 500, margin: 0, lineHeight: 1.6 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // --- COST COMPARISON ---
  if (slide.type === 'cost-comparison') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2 text-3d" style={{ fontWeight: 900, marginBottom: 'clamp(30px, 5vw, 60px)', textTransform: 'uppercase', whiteSpace: 'pre-line' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
              <span className="text-gradient-primary title-font clamp-sub" style={{ fontWeight: 800 }}>{item.title}</span>
              <span style={{ flex: 1, minWidth: '40px', borderTop: '2px dotted rgba(255,255,255,0.15)', filter: 'drop-shadow(0 2px 4px #000)' }} />
              <span className="clamp-sub text-readable" style={{ color: '#fff', fontWeight: 600, fontFamily: "'Inter', monospace" }}>{item.cost}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={itemAnim} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'clamp(20px, 3vw, 40px)', marginTop: 'clamp(30px, 5vw, 60px)' }}>
          <div className="pill-primary title-font clamp-h2-large text-3d" style={{ fontWeight: 900 }}>
            {slide.total}
          </div>
          <span className="clamp-p text-readable" style={{ color: '#bbb', fontWeight: 500 }}>{slide.subTotal}</span>
        </motion.div>
      </motion.div>
    );
  }

  // --- TEAM ---
  if (slide.type === 'team') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2-large text-3d" style={{ fontWeight: 900, marginBottom: 'clamp(40px, 6vw, 80px)', textTransform: 'uppercase', textAlign: 'center' }}>
          {slide.title}
        </motion.h2>
        <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vw, 24px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(12px, 2vw, 24px)' }}>
            {slide.roles.slice(0, 3).map((role, idx) => (
              <motion.div key={`r1-${idx}`} variants={itemAnim} className="card-glass title-font clamp-sub text-readable" style={{ padding: 'clamp(18px, 2vw, 30px) clamp(30px, 4vw, 60px)', borderRadius: '100px', fontWeight: 900, color: '#fff' }}>
                {role}
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(12px, 2vw, 24px)' }}>
            {slide.roles.slice(3, 5).map((role, idx) => (
              <motion.div key={`r2-${idx}`} variants={itemAnim} className="card-glass title-font clamp-sub text-readable" style={{ padding: 'clamp(18px, 2vw, 30px) clamp(30px, 4vw, 60px)', borderRadius: '100px', fontWeight: 900, color: '#fff' }}>
                {role}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // --- PRICE ---
  if (slide.type === 'price') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <motion.div variants={itemAnim} className="price-card" style={{ 
          background: 'rgba(15, 15, 18, 0.7)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.03)',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
          
          <div className="title-font" style={{ width: '100%', padding: 'clamp(20px, 3vw, 24px)', textAlign: 'center', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            Пакет {slide.package}
          </div>
          
          <div style={{ padding: 'clamp(50px, 8vw, 90px) clamp(30px, 5vw, 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="title-font clamp-h1" style={{ fontWeight: 900, color: '#fff', textShadow: '0 4px 24px rgba(255,255,255,0.25)', lineHeight: 1 }}>{slide.price}</span>
            <span className="clamp-p" style={{ color: '#A0A0AA', marginTop: '16px', fontWeight: 500, letterSpacing: '0.05em' }}>за місяць роботи команди</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // --- PRICE SPECIAL ---
  if (slide.type === 'price-special') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 'clamp(40px, 6vw, 80px)' }}>
        <motion.div variants={titleAnim} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
          <h2 className="title-font text-gradient-primary clamp-h1" style={{ fontWeight: 900, whiteSpace: 'pre-line', marginBottom: 'clamp(16px, 2vw, 30px)' }}>{slide.label}</h2>
          <h3 className="clamp-sub text-readable" style={{ fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.12)', padding: '12px 32px', borderRadius: '100px' }}>{slide.subLabel}</h3>
        </motion.div>
        
        <motion.div variants={itemAnim} className="price-card" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)', boxShadow: '0 30px 80px rgba(255,90,0,0.5)' }}>
          <div className="clamp-sub title-font" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)', background: 'linear-gradient(90deg, var(--primary), #FF2A00)', padding: 'clamp(18px, 2.5vw, 30px)', textAlign: 'center', fontWeight: 900, color: '#fff', letterSpacing: '0.1em' }}>{slide.package}</div>
          <div className="title-font clamp-h1" style={{ textShadow: '0 4px 16px rgba(200,0,0,0.2)', padding: 'clamp(50px, 8vw, 100px) clamp(20px, 4vw, 40px)', textAlign: 'center', fontWeight: 900, color: '#D40000' }}>{slide.price}</div>
        </motion.div>
      </motion.div>
    );
  }

  // --- BONUSES ---
  if (slide.type === 'bonuses') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2 text-3d" style={{ fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase', textAlign: 'center' }}>{slide.title}</motion.h2>
        <motion.div variants={itemAnim} className="pill-primary" style={{ marginBottom: 'clamp(50px, 8vw, 100px)' }}>
          <h2 className="title-font clamp-h2 text-3d" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>{slide.highlight}</h2>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="card-glass" style={{ padding: 'clamp(50px, 6vw, 80px) clamp(24px, 4vw, 50px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(30px, 4vw, 60px)', position: 'relative', width: '100%', borderRadius: '32px' }}>
          <div className="clamp-sub title-font text-3d" style={{ position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, var(--primary), #FF8340)', padding: '14px 48px', borderRadius: '100px', fontWeight: 900, whiteSpace: 'nowrap' }}>БОНУСИ</div>
          {slide.items.map((item, idx) => (
            <motion.div key={idx} variants={itemAnim} style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
              <div className="title-font text-gradient-primary clamp-h1" style={{ fontWeight: 900, opacity: 0.3 }}>{item.num}</div>
              <div className="clamp-sub text-readable" style={{ fontWeight: 600, color: '#FFF' }}>{item.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // --- PAYMENT PLAN ---
  if (slide.type === 'payment-plan') {
    return (
      <motion.div initial="hidden" whileInView="show" viewport={viewConfig} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <motion.h2 variants={titleAnim} className="title-font clamp-h2 text-3d" style={{ fontWeight: 900, marginBottom: 'clamp(24px, 4vw, 40px)', textTransform: 'uppercase' }}>{slide.title}</motion.h2>
        <motion.div variants={itemAnim} className="pill-primary" style={{ marginBottom: 'clamp(50px, 8vw, 100px)' }}>
          <h2 className="title-font clamp-h2-large text-3d" style={{ fontWeight: 900, margin: 0, color: '#fff', textTransform: 'uppercase' }}>{slide.highlight}</h2>
        </motion.div>
        <motion.div variants={itemAnim} style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,90,0,0.25)', padding: 'clamp(40px, 5vw, 60px) clamp(30px, 6vw, 100px)', borderRadius: '32px', boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,90,0,0.08)' }}>
          <h3 className="text-gradient-primary title-font clamp-h2" style={{ fontWeight: 900, whiteSpace: 'pre-line', margin: 0 }}>{slide.boxText}</h3>
        </motion.div>
        <motion.div variants={itemAnim} className="clamp-sub text-readable" style={{ marginTop: 'clamp(30px, 5vw, 60px)', fontWeight: 700, letterSpacing: '0.08em', color: '#999' }}>
          {slide.footerText}
        </motion.div>
      </motion.div>
    );
  }

  return null;
}

export default App;
