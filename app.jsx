const { useState, useEffect, useRef } = React;

/* ============ Responsive hook ============ */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

/* ============ Shared ============ */

const SectionLabel = ({ kor }) =>
<div style={{ marginBottom: 48 }}>
    <h2 style={{
    fontFamily: 'var(--sans)', fontWeight: 700,
    fontSize: 40, letterSpacing: '-0.03em', lineHeight: 1.15
  }}>{kor}</h2>
  </div>;

const Container = ({ children, style, max = 1200 }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ maxWidth: max, margin: '0 auto', padding: isMobile ? '0 24px' : '0 40px', ...style }}>
      {children}
    </div>
  );
};

/* ============ NAV ============ */

function Nav() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: isMobile ? '16px 24px' : '20px 40px',
      background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <img src={window.__resources.logoBlack} alt="Inhalt"
      style={{ height: 20, width: 'auto', display: 'block' }} />
      {!isMobile &&
        <div style={{ display: 'flex', gap: 36, fontSize: 14, lineHeight: 1.429, letterSpacing: '0.0145em', fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
          {[['강의소개', '#catalog'], ['강의일정', '#schedule'], ['수강후기', '#reviews'], ['강의신청', '#cta']].map(([l, h]) =>
          <a key={l} href={h} style={{ transition: 'color 0.15s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--muted)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}>
              {l}
            </a>
          )}
        </div>
      }
      <button style={{
        border: '1px solid var(--ink)', padding: isMobile ? '10px 18px' : '14px 28px',
        fontSize: 14, fontWeight: 500, color: 'var(--ink)',
        background: 'transparent', transition: 'background 0.15s, color 0.15s',
        fontFamily: 'var(--sans)', letterSpacing: '-0.01em', lineHeight: 1,
        borderRadius: 9999, whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--ink)';e.currentTarget.style.color = 'var(--paper)';}}
      onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--ink)';}}>
        문의 및 제안
      </button>
    </nav>);
}

/* ============ HERO ============ */

function LogoMark() {
  const isMobile = useIsMobile();
  return (
    <img src={window.__resources.logoOutline} alt="Inhalt"
    style={{ width: isMobile ? '80vw' : 320, maxWidth: 420, height: 'auto', display: 'block' }} />);
}

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      padding: isMobile ? '120px 24px 80px' : '160px 40px 100px', position: 'relative',
      background: `
        repeating-linear-gradient(to right,  rgba(17,17,17,0.07) 0, rgba(17,17,17,0.07) 1px, transparent 1px, transparent 32px),
        repeating-linear-gradient(to bottom, rgba(17,17,17,0.07) 0, rgba(17,17,17,0.07) 1px, transparent 1px, transparent 32px),
        var(--paper)
      `
    }}>
      <LogoMark />
      <div style={{ marginTop: 56, maxWidth: 620 }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: isMobile ? 18 : 22, lineHeight: 1.7,
          letterSpacing: '-0.02em', color: 'var(--ink)', fontWeight: 500
        }}>
          미학, 예술사, 그리고 예술철학을<br />
          <span style={{ fontWeight: 700 }}>일상의 언어</span>로 강의합니다.
        </p>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
      <div style={{
        position: 'absolute', bottom: 40,
        fontSize: 10, letterSpacing: '0.2em',
        color: '#BBBBBB', fontFamily: 'var(--sans)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
      }}>
        <span>SCROLL</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ animation: 'scrollBounce 1.6s ease-in-out infinite' }}>
          <path d="M9.99935 4.16602V15.8327M9.99935 15.8327L15.8327 9.99935M9.99935 15.8327L4.16602 9.99935" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>);
}

/* ============ WHY INHALT ============ */

function Features() {
  const isMobile = useIsMobile();
  const items = [
  {
    title: '전문가의 지식을 일상의 언어로',
    body: '현장에서 오랜도록 쌓아온 전문가의 시각으로, 어려운 개념도 일상의 언어로 풀어줍니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 5.83333V17.5M9.99935 5.83333C9.99935 4.94928 9.64816 4.10143 9.02304 3.47631C8.39792 2.85119 7.55007 2.5 6.66602 2.5H2.49935C2.27834 2.5 2.06637 2.5878 1.91009 2.74408C1.75381 2.90036 1.66602 3.11232 1.66602 3.33333V14.1667C1.66602 14.3877 1.75381 14.5996 1.91009 14.7559C2.06637 14.9122 2.27834 15 2.49935 15H7.49935C8.16239 15 8.79828 15.2634 9.26712 15.7322C9.73596 16.2011 9.99935 16.837 9.99935 17.5M9.99935 5.83333C9.99935 4.94928 10.3505 4.10143 10.9757 3.47631C11.6008 2.85119 12.4486 2.5 13.3327 2.5H17.4993C17.7204 2.5 17.9323 2.5878 18.0886 2.74408C18.2449 2.90036 18.3327 3.11232 18.3327 3.33333V14.1667C18.3327 14.3877 18.2449 14.5996 18.0886 14.7559C17.9323 14.9122 17.7204 15 17.4993 15H12.4993C11.8363 15 11.2004 15.2634 10.7316 15.7322C10.2627 16.2011 9.99935 16.837 9.99935 17.5" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  },
  {
    title: 'ZOOM을 통한 비대면 수업',
    body: 'ZOOM 비대면 강의로 이동 시간 없이, 지역에 구애받지 않고 바로 물을 수 있는 소통 환경을 제공합니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9993 6.66732V5.00065C14.9993 4.55862 14.8238 4.1347 14.5112 3.82214C14.1986 3.50958 13.7747 3.33398 13.3327 3.33398H3.33268C2.89065 3.33398 2.46673 3.50958 2.15417 3.82214C1.84161 4.1347 1.66602 4.55862 1.66602 5.00065V10.834C1.66602 11.276 1.84161 11.6999 2.15417 12.0125C2.46673 12.3251 2.89065 12.5007 3.33268 12.5007H9.99935M8.33268 15.834V12.534V15.159M5.83268 15.834H9.99935M14.9993 10.0007H16.666C17.5865 10.0007 18.3327 10.7468 18.3327 11.6673V16.6673C18.3327 17.5878 17.5865 18.334 16.666 18.334H14.9993C14.0789 18.334 13.3327 17.5878 13.3327 16.6673V11.6673C13.3327 10.7468 14.0789 10.0007 14.9993 10.0007Z" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  },
  {
    title: '무제한 녹화본 제공',
    body: '수업이 끝난 뒤에도 언제든 다시 들을 수 있도록 고화질 녹화본을 제공하여 복습과 보완학습을 돕습니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6673 1.66602H5.00065C4.55862 1.66602 4.1347 1.84161 3.82214 2.15417C3.50958 2.46673 3.33398 2.89066 3.33398 3.33268V16.666C3.33398 17.108 3.50958 17.532 3.82214 17.8445C4.1347 18.1571 4.55862 18.3327 5.00065 18.3327H15.0007C15.4427 18.3327 15.8666 18.1571 16.1792 17.8445C16.4917 17.532 16.6673 17.108 16.6673 16.666V6.66602M11.6673 1.66602C11.9311 1.66559 12.1924 1.71735 12.4361 1.81833C12.6798 1.9193 12.9011 2.06748 13.0873 2.25435L16.0773 5.24435C16.2647 5.43061 16.4133 5.65214 16.5146 5.89615C16.6158 6.14017 16.6677 6.40183 16.6673 6.66602M11.6673 1.66602L11.6673 5.83268C11.6673 6.0537 11.7551 6.26566 11.9114 6.42194C12.0677 6.57822 12.2796 6.66602 12.5007 6.66602L16.6673 6.66602M12.5282 11.1994C12.61 11.2467 12.6779 11.3148 12.7252 11.3967C12.7724 11.4786 12.7973 11.5715 12.7973 11.666C12.7973 11.7606 12.7724 11.8535 12.7252 11.9354C12.6779 12.0173 12.61 12.0853 12.5282 12.1327L9.14065 14.0927C9.05884 14.14 8.966 14.1649 8.87149 14.1649C8.77698 14.1649 8.68414 14.14 8.60233 14.0927C8.52052 14.0454 8.45264 13.9773 8.40552 13.8954C8.35841 13.8134 8.33374 13.7205 8.33398 13.626V9.70602C8.33382 9.61163 8.35851 9.51886 8.40558 9.43704C8.45265 9.35523 8.52044 9.28725 8.60212 9.23995C8.6838 9.19264 8.7765 9.16769 8.87089 9.16758C8.96528 9.16748 9.05803 9.19223 9.13982 9.23935L12.5282 11.1994Z" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  }];

  return (
    <section style={{ background: 'var(--ivory)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <SectionLabel kor="Inhalt를 선택해야 할 이유" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 40 : 56 }}>
          {items.map((it, i) =>
          <div key={i} style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ color: '#111111' }}>{it.icon}</div>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, lineHeight: 1.364, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, letterSpacing: '0.0145em', color: 'var(--ink-soft)', fontWeight: 400 }}>{it.body}</p>
            </div>
          )}
        </div>
      </Container>
    </section>);
}

/* ============ CATALOG ============ */

function Catalog() {
  const isMobile = useIsMobile();
  const regular = [
  { k: '미학', v: [
    '〈미학: 사상가들을 중심으로〉',
    '〈미학: 개념과 쟁점을 중심으로〉',
    '〈칸트의 미학〉',
    '〈헤겔의 미학〉',
    '〈벤야민의 미학〉']
  },
  { k: '예술사', v: [
    '〈서양미술사: 고대, 중세, 근대의 서양미술〉',
    '〈서양미술사: 현대의 서양미술〉',
    '〈한국미술사: 현대의 한국미술〉',
    '〈서양음악사: 서양음악의 생성사〉',
    '〈세계영화사: 세계를 이미지로 사유하기〉']
  },
  { k: '예술철학', v: [
    '〈예술철학: 사상가들을 중심으로〉',
    '〈예술철학: 개념과 쟁점을 중심으로〉',
    '〈예술철학: 비평이론을 중심으로〉']
  }];

  const special = [
  '〈이탈리아 르네상스의 도시와 미술〉',
  '〈바로크 미술의 두 세계: 카라바조와 렘브란트〉',
  '〈낭만주의 미술의 시작과 전개〉',
  '〈인상주의와 후기 인상주의: 현대미술의 문턱〉'];

  return (
    <section id="catalog" style={{ background: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <SectionLabel kor="강의 소개" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 48 }}>
          {/* 정규 강의 */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              paddingBottom: 16, marginBottom: 28,
              borderBottom: '1px solid var(--ink)', flexWrap: 'nowrap'
            }}>
              <span style={{ width: 14, height: 14, background: 'var(--ink)', flexShrink: 0, display: 'inline-block' }} />
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 20, lineHeight: 1.4, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                정규 강의
              </h3>
              <span style={{ fontSize: 11, lineHeight: 1.273, fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.1em' }}>정규강의에 대한 설명</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {regular.map((col, i) =>
              <div key={i}>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.429, letterSpacing: '0.0145em', fontWeight: 700, color: 'var(--ink)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>
                    {col.k}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {col.v.map((v, j) =>
                  <li key={j} style={{ fontFamily: 'var(--sans)', fontSize: 14, letterSpacing: '0.0145em', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                        {v}
                      </li>
                  )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 특별 강의 */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              paddingBottom: 16, marginBottom: 28,
              borderBottom: '1px solid var(--ink)', flexWrap: 'nowrap'
            }}>
              <span style={{ width: 14, height: 14, background: 'var(--accent)', flexShrink: 0, display: 'inline-block' }} />
              <h3 style={{ fontFamily: 'var(--sans)', fontSize: 20, lineHeight: 1.4, fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                특별 강의
              </h3>
              <span style={{ fontSize: 11, lineHeight: 1.273, fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.1em' }}>특별강의에 대한 설명</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {special.map((v, i) =>
              <li key={i} style={{ fontFamily: 'var(--sans)', fontSize: 14, letterSpacing: '0.0145em', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                  {v}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </section>);
}

/* ============ SCHEDULE ============ */

function Schedule() {
  const isMobile = useIsMobile();

  function buildMonth(year, month) {
    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      const d = prevMonthDays - startDay + 1 + i;
      const py = month === 0 ? year - 1 : year;
      const pm = (month + 11) % 12;
      const iso = `${py}-${String(pm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ d, iso, muted: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ d, iso, muted: false });
    }
    let nd = 1;
    const ny = month === 11 ? year + 1 : year;
    const nm = (month + 1) % 12;
    while (cells.length % 7 !== 0) {
      const iso = `${ny}-${String(nm + 1).padStart(2, '0')}-${String(nd).padStart(2, '0')}`;
      cells.push({ d: nd, iso, muted: true });
      nd++;
    }
    return cells;
  }

  const [activeMonth, setActiveMonth] = useState(5);

  const juneCourses = [
  { date: '2026-06-01', topic: '미학: 사상가들을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-02', topic: '칸트의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-03', topic: '헤겔의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-04', topic: '서양미술사: 고대, 중세, 근대의 서양미술', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-08', topic: '예술철학: 사상가들을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-05', topic: '이탈리아 르네상스의 도시와 미술', kind: 'special', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-12', topic: '바로크 미술의 두 세계: 카라바조와 렘브란트', kind: 'special', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-19', topic: '낭만주의 미술의 시작과 전개', kind: 'special', weeks: 5, time: '20:20–22:00' },
  { date: '2026-06-26', topic: '인상주의와 후기 인상주의: 현대미술의 문턱', kind: 'special', weeks: 5, time: '20:20–22:00' }];

  const julyCourses = [
  { date: '2026-07-06', topic: '미학: 개념과 쟁점을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-07', topic: '벤야민의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-01', topic: '서양미술사: 현대의 서양미술', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-02', topic: '한국미술사: 현대의 한국미술', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-13', topic: '서양음악사: 서양음악의 생성사', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-14', topic: '세계영화사: 세계를 이미지로 사유하기', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-08', topic: '예술철학: 개념과 쟁점을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00' },
  { date: '2026-07-09', topic: '예술철학: 비평이론을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00' }];

  const data = (activeMonth === 5 ? juneCourses : julyCourses).slice().sort((a, b) => a.date.localeCompare(b.date));

  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + n);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
  const sessionsByDate = {};
  for (const c of data) {
    for (let w = 0; w < c.weeks; w++) {
      const iso = addDays(c.date, w * 7);
      if (!sessionsByDate[iso]) sessionsByDate[iso] = [];
      sessionsByDate[iso].push({ ...c, weekIndex: w, isStart: w === 0 });
    }
  }
  const byDate = sessionsByDate;
  const months = { 5: buildMonth(2026, 5), 6: buildMonth(2026, 6) };
  const activeCells = months[activeMonth];
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  function MonthCalendar({ title, cells, tabs }) {
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)' }}>
        <div style={{
          padding: '18px 24px', borderBottom: '1px solid var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16
        }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.0194em', color: 'var(--ink)', lineHeight: 1.364, fontFamily: 'var(--sans)' }}>
            {title}
          </div>
          {tabs}
        </div>
        <div style={{ overflowX: isMobile ? 'auto' : 'visible' }}>
        <div style={{ minWidth: isMobile ? 480 : 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--line)' }}>
            {weekdays.map((w, i) => <div key={i} style={{
              padding: '10px 8px', textAlign: 'center',
              fontFamily: 'var(--sans)', fontSize: 11, lineHeight: 1.273, fontWeight: 500,
              letterSpacing: '0.0311em', color: i === 0 ? '#C44' : 'var(--muted)',
              borderRight: i === 6 ? 'none' : '1px solid var(--line)'
            }}>{w}</div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((c, i) => {
              const isSun = i % 7 === 0;
              const isLastRow = i >= cells.length - 7;
              const ev = c && !c.muted && byDate[c.iso];
              const muted = c && c.muted;
              return (
                <div key={i} style={{
                  height: 108, padding: '8px 8px 6px',
                  borderRight: i % 7 === 6 ? 'none' : '1px solid var(--line)',
                  borderBottom: isLastRow ? 'none' : '1px solid var(--line)',
                  background: 'var(--paper)', color: 'var(--ink)',
                  display: 'flex', flexDirection: 'column', gap: 4, overflow: 'hidden'
                }}>
                  {c &&
                  <>
                      <div style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.385, letterSpacing: '0.0194em', fontWeight: 500, color: muted ? '#C9C6BF' : isSun ? '#C44' : 'var(--ink)' }}>{c.d}</div>
                      {ev && ev.map((e, k) =>
                    <div key={k} title={e.topic} style={{
                      fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
                      lineHeight: 1.35, letterSpacing: '-0.01em',
                      color: e.kind === 'special' ? 'var(--accent)' : 'var(--ink)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'default'
                    }}>{e.topic}</div>
                    )}
                    </>
                  }
                </div>);
            })}
          </div>
        </div>
        </div>
      </div>);
  }

  return (
    <section id="schedule" style={{ background: 'var(--ivory)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <SectionLabel kor="강의 일정" />
            <p style={{ fontSize: 15, lineHeight: 1.467, letterSpacing: '0.0096em', color: 'var(--ink-soft)', fontWeight: 400, marginTop: -32 }}>
              강의일정은 매달 갱신됩니다.
            </p>
          </div>
          <div style={{ display: 'inline-flex', gap: 20, fontSize: 12, lineHeight: 1.334, letterSpacing: '0.0252em', fontWeight: 500, color: 'var(--muted)', alignItems: 'center', flexWrap: 'nowrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <span style={{ width: 12, height: 12, background: 'var(--ink)', display: 'inline-block', flexShrink: 0 }} />정규강의
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <span style={{ width: 12, height: 12, background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />특별강의
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <MonthCalendar
            title={activeMonth === 5 ? '6월' : '7월'}
            cells={activeCells}
            tabs={
            <div style={{ display: 'inline-flex', border: '1px solid var(--ink)', borderRadius: 9999, overflow: 'hidden', flexShrink: 0 }}>
                {[[5, '6월'], [6, '7월']].map(([m, l]) =>
              <button key={m} onClick={() => setActiveMonth(m)} style={{
                padding: '8px 20px',
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em',
                background: activeMonth === m ? 'var(--ink)' : 'transparent',
                color: activeMonth === m ? 'var(--paper)' : 'var(--ink)',
                border: 'none', lineHeight: 1, cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s'
              }}>{l}</button>
              )}
              </div>
            } />

          <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', overflowX: isMobile ? 'auto' : 'visible' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--ink)', minWidth: isMobile ? 480 : 'auto' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.0194em', color: 'var(--ink)', lineHeight: 1.364 }}>
                {activeMonth === 5 ? '6월' : '7월'} 강의 목록
              </div>
            </div>

            {data.length === 0 ?
            <div style={{ padding: '48px 24px', textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.385, letterSpacing: '0.0194em', color: 'var(--muted)' }}>
                이 달에 예정된 강의가 없습니다.
              </div> :

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '160px 1fr 120px' : '220px 1fr 140px', minWidth: isMobile ? 480 : 'auto' }}>
                <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--ink)', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', borderRight: '1px solid var(--line)' }}>개강 날짜</div>
                <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--ink)', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', borderRight: '1px solid var(--line)' }}>강의명</div>
                <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--ink)', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>시간</div>

                {data.map((row, i) => {
                const [, m, d] = row.date.split('-');
                const dow = weekdays[new Date(row.date).getDay()];
                const isLast = i === data.length - 1;
                const cellStyle = { padding: '18px 24px', borderBottom: isLast ? 'none' : '1px solid var(--line)', borderRight: '1px solid var(--line)', alignItems: 'center', display: 'flex' };
                return (
                  <React.Fragment key={i}>
                      <div style={cellStyle}>
                        <div style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.385, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.0194em' }}>
                          2026. {parseInt(m, 10).toString().padStart(2, '0')}. {parseInt(d, 10).toString().padStart(2, '0')}.
                          <span style={{ color: 'var(--muted)', marginLeft: 8, fontWeight: 500 }}>(총 {row.weeks}주)</span>
                        </div>
                      </div>
                      <div style={cellStyle}>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? 13 : 15, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.45, color: 'var(--ink)' }}>{row.topic}</span>
                      </div>
                      <div style={{ ...cellStyle, borderRight: 'none' }}>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.385, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.0194em' }}>매주 {dow}요일 {row.time}</span>
                      </div>
                    </React.Fragment>);
              })}
              </div>
            }
          </div>
        </div>
      </Container>
    </section>);
}

/* ============ REVIEWS ============ */

function Reviews() {
  const isMobile = useIsMobile();
  const reviews = [
  { quote: '일방적인 강의가 아니라 미학이 정말 일상의 언어로 들어오는 느낌을 받았습니다. 예술을 보는 눈이 탁 트인 것 같은 경험입니다.', name: '강O수' },
  { quote: '비교 맥락이 풍부해 강사님과 대화가 있는 소통이 당연하게 느껴졌습니다. 매 수업 시간이 기다려지는 강의입니다.', name: '최O선' },
  { quote: '미술사의 방대한 흐름을 맥락 위주로 설명해주셔서 훨씬 체계적으로 정리되었습니다. 강력 추천합니다.', name: '한O민' },
  { quote: '미술사의 방대한 흐름을 맥락 위주로 설명해주셔서 훨씬 체계적으로 정리가 되었습니다. 다음 수업도 기대됩니다.', name: '박O연' },
  { quote: '매달 공부할 때마다 달라지는 시각이 느껴집니다. 강의를 들을수록 예술이 이렇게 넓은 세계였다는 걸 실감합니다. 강력 추천합니다.', name: '이O현' },
  { quote: '미술사의 방대한 흐름을 맥락 위주로 설명해주셔서 훨씬 체계적으로 정리되었습니다. 다음 수업도 기대됩니다.', name: '정O아' }];

  return (
    <section id="reviews" style={{ background: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <SectionLabel kor="수강생 후기" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {reviews.map((r, i) =>
          <figure key={i} style={{
            background: 'var(--paper)', border: '1px solid var(--line)',
            padding: '24px 22px 20px', display: 'flex', flexDirection: 'column', gap: 12,
            minHeight: 220, transition: 'border-color 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>
              <div style={{ width: 22, height: 28, marginBottom: 4, backgroundImage: `url(${window.__resources.logoSimbol})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center' }} />
              <blockquote style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.7, letterSpacing: '0.0194em', color: 'var(--ink-soft)', fontWeight: 400, flex: 1 }}>{r.quote}</blockquote>
              <figcaption style={{ paddingTop: 12, borderTop: '1px solid var(--line)', fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.334, letterSpacing: '0.0252em', fontWeight: 500, color: 'var(--ink)' }}>
                — {r.name} 수강생
              </figcaption>
            </figure>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="https://blog.naver.com/radiognod/224247972656" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', background: 'transparent', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
            letterSpacing: '-0.01em', border: '1px solid var(--ink)', lineHeight: 1,
            borderRadius: 9999, transition: 'background 0.15s, color 0.15s'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--ink)';e.currentTarget.style.color = 'var(--paper)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--ink)';}}>
            자세히 보기 →
          </a>
        </div>
      </Container>
    </section>);
}

/* ============ HOW TO APPLY ============ */

function HowTo() {
  const isMobile = useIsMobile();
  const steps = [
  { n: '01', title: '강의 선택', body: '강의 소개 페이지에서 이번 달 강의 내용을 확인하세요.' },
  { n: '02', title: '신청서 작성', body: '신청하기 버튼을 통해 구글폼 신청서를 작성합니다.' },
  { n: '03', title: '수강료 결제', body: '안내된 계좌로 수강료를 입금합니다.' },
  { n: '04', title: '수강 확정', body: 'ZOOM 강의 링크가 수업 전날 발송됩니다.' }];

  return (
    <section style={{ background: 'var(--ivory)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <SectionLabel kor="수강 신청 방법" />
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 1, background: 'var(--line)', border: '1px solid var(--line)'
        }}>
          {steps.map((s, i) =>
          <div key={i} style={{ padding: isMobile ? '28px 20px 24px' : '40px 32px 36px', background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.334, fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.15em' }}>{s.n}</div>
              <h4 style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? 17 : 20, lineHeight: 1.4, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{s.title}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.75, letterSpacing: '0.0194em', color: 'var(--ink-soft)', fontWeight: 400 }}>{s.body}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <a href="https://forms.gle/" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', background: 'var(--ink)', color: 'var(--paper)',
            fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
            letterSpacing: '-0.01em', border: '1px solid var(--ink)', lineHeight: 1,
            borderRadius: 9999, transition: 'opacity 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            강의 신청하기 →
          </a>
        </div>
      </Container>
    </section>);
}

/* ============ CTA ============ */

function CTA() {
  const isMobile = useIsMobile();
  return (
    <section id="cta" style={{ background: 'var(--ivory)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--sans)', fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 24, color: 'var(--ink)', fontSize: isMobile ? 32 : 40
        }}>
          강의 신청
        </h2>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: 16, letterSpacing: '0.0057em',
          marginBottom: 48, lineHeight: 1.7, fontWeight: 400, color: 'var(--ink-soft)'
        }}>
          지금 Inhalt와 함께 예술을 배워보세요.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
          { label: '정규강의 신청하기', primary: true },
          { label: '특별강의 신청하기', primary: false },
          { label: '녹화본 신청하기', primary: false }].map((b, i) =>
          <button key={i} style={{
            padding: '14px 28px',
            background: b.primary ? 'var(--ink)' : 'transparent',
            color: b.primary ? 'var(--paper)' : 'var(--ink)',
            border: '1px solid var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500,
            letterSpacing: '-0.01em', lineHeight: 1,
            borderRadius: 9999, transition: 'all 0.15s', cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            if (b.primary) { e.currentTarget.style.opacity = '0.85'; } else
            { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)'; }
          }}
          onMouseLeave={(e) => {
            if (b.primary) { e.currentTarget.style.opacity = '1'; } else
            { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }
          }}>
              {b.label}
            </button>
          )}
        </div>
      </Container>
    </section>);
}

/* ============ FOOTER ============ */

function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '40px 24px 24px' : '40px 40px 28px' }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, marginBottom: 28, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: '-0.01em', maxWidth: 560, color: '#FFFFFF', fontWeight: 500, margin: 0 }}>미학, 예술사, 예술철학을 일상의 언어로 강의합니다.</p>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', gap: 12, padding: 0, margin: 0 }}>
            {[
            { name: 'Instagram', href: 'https://www.instagram.com/inhalt.lecture/', svg:
              <svg width="18" height="18" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 376,40 H 136 C 83.07,40 40,83.07 40,136 v 240 c 0,52.93 43.07,96 96,96 h 240 c 52.93,0 96,-43.07 96,-96 V 136 C 472,83.07 428.93,40 376,40 Z" />
                  <circle cx="256" cy="256" r="93" />
                  <circle cx="388.33" cy="123.67" r="25" fill="currentColor" stroke="none" />
                </svg>
            },
            { name: 'Naver Blog', href: 'https://blog.naver.com/radiognod', svg:
              <svg width="18" height="18" viewBox="0 0 924.43 1000" fill="currentColor">
                  <path d="M344.06 286.98c-70.27 0-135.39 22.03-188.86 59.55V70.18H0v858.3h155.2v-42.62c53.47 37.51 118.59 59.55 188.86 59.55 181.82 0 329.21-147.39 329.21-329.21s-147.4-329.22-329.21-329.22zm-14.78 514.64c-99.13 0-179.49-83.08-179.49-185.56S230.15 430.5 329.28 430.5s179.49 83.08 179.49 185.56-80.36 185.56-179.49 185.56zM862.35 0h62.08v1000h-62.08z" />
                </svg>
            }].map((s) =>
            <li key={s.name} style={{ listStyle: 'none' }}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38, border: '1px solid #3A3528', borderRadius: 9999,
                color: 'var(--paper)', transition: 'background 0.15s, color 0.15s'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--paper)';e.currentTarget.style.color = 'var(--ink)';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent';e.currentTarget.style.color = 'var(--paper)';}}>
                  {s.svg}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div style={{ paddingTop: 20, borderTop: '1px solid #2E2A20', lineHeight: 1.273, letterSpacing: '0.1em', fontWeight: 400, color: 'rgb(204,204,204)', fontSize: 12 }}>
          © 2026 Inhalt. All Rights Reserved.
        </div>
      </Container>
    </footer>);
}

/* ============ APP ============ */

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Catalog />
      <Schedule />
      <Reviews />
      <CTA />
      <Footer />
    </>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
