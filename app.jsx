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

function Tooltip({ label, children }) {
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  return (
    <>
      <div ref={ref}
        onMouseEnter={() => {
          if (ref.current && ref.current.scrollWidth > ref.current.clientWidth)
            setRect(ref.current.getBoundingClientRect());
        }}
        onMouseLeave={() => setRect(null)}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'default' }}>
        {children}
      </div>
      {rect && ReactDOM.createPortal(
        <div style={{
          position: 'fixed',
          top: rect.bottom + 7,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)',
          background: 'var(--ink-2)',
          color: '#fff',
          padding: '5px 11px',
          borderRadius: 7,
          fontSize: 12, fontWeight: 600,
          fontFamily: 'var(--sans)', letterSpacing: '-0.01em', lineHeight: 1.4,
          whiteSpace: 'nowrap', zIndex: 9999, pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderBottom: '5px solid var(--ink-2)',
          }} />
          {label}
        </div>,
        document.body
      )}
    </>
  );
}

const SectionLabel = ({ kor }) =>
<div style={{ marginBottom: 48 }}>
    <h2 style={{
    fontFamily: 'var(--sans)', fontWeight: 700,
    fontSize: 40, letterSpacing: '-0.04em', lineHeight: 1.1
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
    label: 'Knowledge',
    title: '전문가의 지식을 일상의 언어로',
    body: '현장에서 오랜도록 쌓아온 전문가의 시각으로, 어려운 개념도 일상의 언어로 풀어줍니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 5.83333V17.5M9.99935 5.83333C9.99935 4.94928 9.64816 4.10143 9.02304 3.47631C8.39792 2.85119 7.55007 2.5 6.66602 2.5H2.49935C2.27834 2.5 2.06637 2.5878 1.91009 2.74408C1.75381 2.90036 1.66602 3.11232 1.66602 3.33333V14.1667C1.66602 14.3877 1.75381 14.5996 1.91009 14.7559C2.06637 14.9122 2.27834 15 2.49935 15H7.49935C8.16239 15 8.79828 15.2634 9.26712 15.7322C9.73596 16.2011 9.99935 16.837 9.99935 17.5M9.99935 5.83333C9.99935 4.94928 10.3505 4.10143 10.9757 3.47631C11.6008 2.85119 12.4486 2.5 13.3327 2.5H17.4993C17.7204 2.5 17.9323 2.5878 18.0886 2.74408C18.2449 2.90036 18.3327 3.11232 18.3327 3.33333V14.1667C18.3327 14.3877 18.2449 14.5996 18.0886 14.7559C17.9323 14.9122 17.7204 15 17.4993 15H12.4993C11.8363 15 11.2004 15.2634 10.7316 15.7322C10.2627 16.2011 9.99935 16.837 9.99935 17.5" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  },
  {
    label: 'Online',
    title: 'ZOOM을 통한 비대면 수업',
    body: 'ZOOM 비대면 강의로 이동 시간 없이, 지역에 구애받지 않고 바로 물을 수 있는 소통 환경을 제공합니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9993 6.66732V5.00065C14.9993 4.55862 14.8238 4.1347 14.5112 3.82214C14.1986 3.50958 13.7747 3.33398 13.3327 3.33398H3.33268C2.89065 3.33398 2.46673 3.50958 2.15417 3.82214C1.84161 4.1347 1.66602 4.55862 1.66602 5.00065V10.834C1.66602 11.276 1.84161 11.6999 2.15417 12.0125C2.46673 12.3251 2.89065 12.5007 3.33268 12.5007H9.99935M8.33268 15.834V12.534V15.159M5.83268 15.834H9.99935M14.9993 10.0007H16.666C17.5865 10.0007 18.3327 10.7468 18.3327 11.6673V16.6673C18.3327 17.5878 17.5865 18.334 16.666 18.334H14.9993C14.0789 18.334 13.3327 17.5878 13.3327 16.6673V11.6673C13.3327 10.7468 14.0789 10.0007 14.9993 10.0007Z" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  },
  {
    label: 'Recording',
    title: '무제한 녹화본 제공',
    body: '수업이 끝난 뒤에도 언제든 다시 들을 수 있도록 고화질 녹화본을 제공하여 복습과 보완학습을 돕습니다.',
    icon:
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6673 1.66602H5.00065C4.55862 1.66602 4.1347 1.84161 3.82214 2.15417C3.50958 2.46673 3.33398 2.89066 3.33398 3.33268V16.666C3.33398 17.108 3.50958 17.532 3.82214 17.8445C4.1347 18.1571 4.55862 18.3327 5.00065 18.3327H15.0007C15.4427 18.3327 15.8666 18.1571 16.1792 17.8445C16.4917 17.532 16.6673 17.108 16.6673 16.666V6.66602M11.6673 1.66602C11.9311 1.66559 12.1924 1.71735 12.4361 1.81833C12.6798 1.9193 12.9011 2.06748 13.0873 2.25435L16.0773 5.24435C16.2647 5.43061 16.4133 5.65214 16.5146 5.89615C16.6158 6.14017 16.6677 6.40183 16.6673 6.66602M11.6673 1.66602L11.6673 5.83268C11.6673 6.0537 11.7551 6.26566 11.9114 6.42194C12.0677 6.57822 12.2796 6.66602 12.5007 6.66602L16.6673 6.66602M12.5282 11.1994C12.61 11.2467 12.6779 11.3148 12.7252 11.3967C12.7724 11.4786 12.7973 11.5715 12.7973 11.666C12.7973 11.7606 12.7724 11.8535 12.7252 11.9354C12.6779 12.0173 12.61 12.0853 12.5282 12.1327L9.14065 14.0927C9.05884 14.14 8.966 14.1649 8.87149 14.1649C8.77698 14.1649 8.68414 14.14 8.60233 14.0927C8.52052 14.0454 8.45264 13.9773 8.40552 13.8954C8.35841 13.8134 8.33374 13.7205 8.33398 13.626V9.70602C8.33382 9.61163 8.35851 9.51886 8.40558 9.43704C8.45265 9.35523 8.52044 9.28725 8.60212 9.23995C8.6838 9.19264 8.7765 9.16769 8.87089 9.16758C8.96528 9.16748 9.05803 9.19223 9.13982 9.23935L12.5282 11.1994Z" stroke="currentColor" strokeWidth="1.39167" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  }];

  return (
    <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line-dark)' }}>
      <Container>
        <SectionLabel kor="Inhalt를 선택해야 할 이유" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 40 : 56 }}>
          {items.map((it, i) =>
          <div key={i} style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>{it.icon}</div>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.03em', color: 'var(--paper)' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.85, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>{it.body}</p>
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

  const [calendarMonth, setCalendarMonth] = useState(5);
  const [openIdx, setOpenIdx] = useState(null);

  const juneCourses = [
  { date: '2026-06-01', topic: '미학: 사상가들을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의의 기본적인 목적은 <strong>미학에 입문하기 위해 갖춰야 할 지식의 전달</strong>입니다. 미학이라는 학문은 <strong>미학적 속성, 미학적 대상, 미학적 태도</strong>라는 세 가지 주제를 중심으로 그 내용을 마련해 왔습니다. 달리 말하자면, 미학은 이 세 가지 주제를 공전하는 개념과 쟁점들로 이루어진 학문인 것입니다.</p><p style={{marginBottom:14}}>우선 미학적 속성에는 아름다움과 추함, 그리고 숭고와 같이 <strong>논리적 사고가 쉽사리 그 뜻을 헤아릴 수 없는 감성적 차원의 가치들</strong>이 포함됩니다. 다음으로 미학적 대상은 미학적 속성을 내재한 대상을 지칭합니다. 미학적 대상의 대표적인 사례로는 예술과 자연이 있습니다. 마지막으로 미학적 태도란 미학적 대상에 접근할 때 요구되는 <strong>특별한 방식</strong>을 지칭합니다.</p><p>이 강의는 이렇듯 미학의 핵심을 이루는 세 가지 주제와 결부된 다양한 개념과 쟁점을 살펴봅니다. 이를 통해 수강생분들에게 <strong>미학의 기초를 다지는 기회, 또는 미학에 관한 지식을 보다 확장해 나갈 수 있는 기회</strong>를 제공할 것입니다.</p></> },
  { date: '2026-06-02', topic: '칸트의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 근대 미학의 정초자로 불리는 칸트의 미학을 집중적으로 다룹니다. 《판단력 비판》을 중심으로 <strong>취미 판단, 숭고, 미적 이념, 목적론</strong>의 개념들을 순서대로 살펴보며, 칸트가 이성·감성·오성을 어떻게 미학의 언어로 통합했는지를 이해합니다.</p><p style={{marginBottom:14}}>칸트의 미학에서 핵심이 되는 물음은 "<strong>아름다움에 관한 판단은 어떻게 보편성을 주장할 수 있는가</strong>"입니다. 주관적이면서도 보편적 동의를 요구하는 이 독특한 판단 형식을 이해하기 위해, 강의는 취미 판단의 네 계기를 꼼꼼히 분석합니다.</p><p>나아가 자연의 숭고와 예술의 미가 어떻게 구분되는지, 그리고 예술 천재 개념이 왜 등장했는지를 살펴보며 칸트 미학의 전체 구도를 파악합니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-06-03', topic: '헤겔의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>헤겔은 예술을 <strong>정신이 감각적 형식 속에서 자기를 드러내는 방식</strong>으로 정의했습니다. 이 강의는 헤겔의 《미학 강의》를 바탕으로, 예술이 상징적 형식에서 고전적 형식을 거쳐 낭만적 형식으로 발전해 나가는 역사적 도식을 면밀히 분석합니다.</p><p style={{marginBottom:14}}>특히 이 강의에서는 헤겔이 제기한 <strong>"예술의 종언"</strong> 테제를 집중적으로 검토합니다. 예술이 더 이상 정신의 최고 표현이 될 수 없다는 이 도발적 주장은, 오늘날까지도 예술철학의 핵심 쟁점으로 남아 있습니다.</p><p>헤겔 미학을 통해 예술과 역사, 예술과 철학의 관계를 새롭게 사유하는 기회를 가질 것입니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-06-04', topic: '서양미술사: 고대, 중세, 근대의 서양미술', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 고대 그리스의 조각과 건축에서 출발해 중세 고딕 미술, 르네상스, 바로크를 거쳐 <strong>근대 미술의 문턱</strong>까지 서양미술사의 긴 흐름을 조망합니다. 단순한 연대기적 나열이 아니라, 각 시대의 <strong>사회·종교·철학적 맥락</strong>과 미술의 관계를 중심으로 서술합니다.</p><p style={{marginBottom:14}}>그리스의 이상적 미, 중세의 신성한 상징 언어, 르네상스의 원근법과 인체 해부학, 바로크의 극적 표현 사이의 <strong>연속성과 단절</strong>을 추적함으로써, 서양미술이 어떤 문제의식 위에서 변화해 왔는지를 이해합니다.</p><p>미술사에 처음 입문하는 분들을 위해 설계된 강의로, 주요 작품과 작가를 사례로 들어 쉽게 설명합니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-06-08', topic: '예술철학: 사상가들을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>예술이란 무엇인가라는 물음은 철학사에서 끊임없이 제기되어 왔습니다. 이 강의는 플라톤의 모방론에서 아리스토텔레스의 카타르시스, 톨스토이의 감정 전달론, 듀이의 경험으로서의 예술까지 <strong>주요 사상가들의 예술론을 비교·검토</strong>합니다.</p><p style={{marginBottom:14}}>각 사상가들이 예술의 본질, 가치, 기능을 어떻게 규정했는지를 살펴보며, 그 이론들이 <strong>서로 어떻게 대립하고 대화하는지</strong>를 파악합니다. 이를 통해 예술을 둘러싼 철학적 논의의 전체 지형을 이해할 수 있습니다.</p><p>철학적 배경 없이도 충분히 따라올 수 있도록 설계된 강의입니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-06-05', topic: '이탈리아 르네상스의 도시와 미술', kind: 'special', weeks: 1, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이탈리아 르네상스 미술은 <strong>피렌체, 베네치아, 로마</strong>라는 세 도시를 중심으로 각기 다른 성격으로 꽃피었습니다. 이 강의는 르네상스 미술을 단순히 미술사적 사건으로 보는 것이 아니라, <strong>도시의 권력·상업·종교·인문주의</strong>가 미술과 어떻게 맞물려 새로운 시각 문화를 만들어냈는지를 추적합니다.</p><p style={{marginBottom:14}}>보티첼리와 레오나르도 다 빈치, 미켈란젤로와 티치아노를 예시로 들며, 각 도시의 후원 시스템과 사회적 맥락이 미술 양식에 어떤 영향을 미쳤는지를 살펴봅니다. 특히 <strong>원근법의 발명과 인체 표현의 변화</strong>가 당대의 세계관 전환과 어떻게 연결되는지를 중점적으로 다룹니다.</p><p>단회 특별강의로, 참가 인원이 한정되어 있습니다. 사전 신청 후 수강 확정 순으로 진행됩니다.</p></> },
  { date: '2026-06-12', topic: '바로크 미술의 두 세계: 카라바조와 렘브란트', kind: 'special', weeks: 1, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>바로크 미술은 르네상스의 이상적 조화를 넘어 <strong>강렬한 감정과 극적인 빛의 대비</strong>를 전면에 내세웁니다. 이 강의는 이탈리아의 카라바조와 네덜란드의 렘브란트를 중심으로, 바로크 미술의 두 가지 서로 다른 얼굴을 비교합니다.</p><p style={{marginBottom:14}}>카라바조의 <strong>키아로스쿠로</strong>와 거친 현실주의, 렘브란트의 내면적 심리 표현을 나란히 놓고 분석함으로써, 같은 시대에 왜 이렇게 다른 회화 언어가 발전했는지를 이해합니다. 여기서 종교개혁과 반종교개혁이라는 역사적 맥락이 중요한 열쇠가 됩니다.</p><p>단회 특별강의로, 참가 인원이 한정되어 있습니다. 사전 신청 후 수강 확정 순으로 진행됩니다.</p></> },
  { date: '2026-06-19', topic: '낭만주의 미술의 시작과 전개', kind: 'special', weeks: 1, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>낭만주의 미술은 계몽주의의 이성 중심주의에 대한 반발로 출현했습니다. <strong>감정, 상상력, 자연, 민족 정체성</strong>을 전면에 내세우며 미술의 언어를 근본적으로 바꾸어 놓은 이 운동을, 고야·들라크루아·프리드리히의 대표작을 통해 살펴봅니다.</p><p style={{marginBottom:14}}>특히 고야의 정치적 비판 의식, 들라크루아의 역동적 색채, 프리드리히의 숭고한 자연 풍경이 각각 어떤 방식으로 <strong>낭만주의적 세계 인식</strong>을 표현하는지를 비교합니다. 세 화가를 통해 낭만주의의 다양한 스펙트럼을 이해할 수 있습니다.</p><p>단회 특별강의로, 참가 인원이 한정되어 있습니다. 사전 신청 후 수강 확정 순으로 진행됩니다.</p></> },
  { date: '2026-06-26', topic: '인상주의와 후기 인상주의: 현대미술의 문턱', kind: 'special', weeks: 1, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>인상주의는 미술의 역사에서 하나의 결정적인 전환점입니다. <strong>빛과 순간, 개인적 감각</strong>을 포착하는 데 집중한 모네와 르누아르로부터, 이를 구조적·상징적으로 발전시킨 세잔과 반 고흐까지, 이 강의는 인상주의가 어떻게 현대미술로 나아가는 길을 열었는지를 추적합니다.</p><p style={{marginBottom:14}}>아카데미즘에 대한 반발로 시작된 인상주의가 <strong>색채, 붓터치, 구도</strong> 등 미술의 형식적 요소 자체를 탐구하는 방향으로 진화한 과정을 살펴봅니다. 세잔의 기하학적 구조와 반 고흐의 표현적 필선이 어떻게 20세기 미술에 영향을 미쳤는지도 다룹니다.</p><p>단회 특별강의로, 참가 인원이 한정되어 있습니다. 사전 신청 후 수강 확정 순으로 진행됩니다.</p></> }];

  const julyCourses = [
  { date: '2026-07-06', topic: '미학: 개념과 쟁점을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 <strong>재현, 표현, 형식, 제도</strong> 등 현대 미학의 핵심 개념들을 쟁점별로 정리합니다. '미학: 사상가들을 중심으로' 강의가 역사적 흐름을 따른다면, 이 강의는 개념과 논쟁 구도를 중심으로 미학을 체계적으로 이해하는 데 초점을 맞춥니다.</p><p style={{marginBottom:14}}>예술과 비예술의 경계는 어떻게 설정되는가, 예술 작품의 의미는 어디서 오는가, <strong>감상자의 경험은 어떤 역할을 하는가</strong> — 이러한 물음들을 통해 현대 미학이 다루는 핵심 문제들을 파악합니다.</p><p>입문 강의를 들은 후 심화학습을 원하는 분들께 추천합니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-07', topic: '벤야민의 미학', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>발터 벤야민의 〈기술복제시대의 예술작품〉은 20세기 미학의 가장 중요한 텍스트 중 하나입니다. 이 강의는 벤야민이 제시한 <strong>아우라, 복제, 지각의 변화</strong> 개념을 꼼꼼히 분석하며, 대중문화와 예술의 관계에 관한 그의 통찰을 현재의 시각에서 재조명합니다.</p><p style={{marginBottom:14}}>벤야민이 왜 영화와 사진에 주목했는지, <strong>파시즘의 미학화</strong>에 대한 그의 비판이 무엇을 의미하는지를 이해함으로써, 미학과 정치의 관계를 새로운 방식으로 사유할 수 있게 됩니다.</p><p>벤야민의 텍스트를 직접 읽으며 진행하되, 배경 지식 없이도 따라올 수 있도록 충분한 맥락을 제공합니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-01', topic: '서양미술사: 현대의 서양미술', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 인상주의 이후부터 현재까지, 20세기 서양미술의 격동하는 흐름을 다룹니다. <strong>표현주의, 다다, 초현실주의, 추상표현주의, 팝아트, 개념미술</strong>을 거쳐 오늘날의 동시대 미술까지, 각 사조의 핵심 문제의식과 대표 작가를 살펴봅니다.</p><p style={{marginBottom:14}}>단순한 연대기 서술이 아니라 <strong>왜 이 운동들이 등장했는가</strong>를 중심에 놓고 강의합니다. 두 차례의 세계대전, 냉전, 자본주의의 전개가 미술의 언어를 어떻게 바꾸었는지를 이해하는 것이 이 강의의 핵심입니다.</p><p>미술사 입문 강의('고대, 중세, 근대')를 먼저 수강하면 이해에 도움이 됩니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-02', topic: '한국미술사: 현대의 한국미술', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>한국 현대미술은 서양 미술의 영향을 받으면서도 독자적인 길을 걸어왔습니다. 이 강의는 해방 이후부터 현재까지 <strong>단색화, 민중미술, 설치·미디어아트</strong> 등 주요 흐름을 짚으며, 한국미술의 정체성이 어떻게 형성되어 왔는지를 탐구합니다.</p><p style={{marginBottom:14}}>박서보·윤형근·이우환 등 단색화 작가들의 수행적 미학, 1980년대 민중미술의 사회적 발언, 그리고 국제 미술 무대에서 한국 작가들이 어떻게 자리를 잡아왔는지를 살펴봅니다. <strong>국제성과 지역성의 긴장</strong>이 이 강의의 중심 주제입니다.</p><p>한국미술에 관심이 있다면 배경 지식 없이도 수강할 수 있습니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-13', topic: '서양음악사: 서양음악의 생성사', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 서양음악이 어떻게 오늘날의 형태로 발전해 왔는지를 역사적으로 살펴봅니다. <strong>바로크의 대위법, 고전주의의 소나타 형식, 낭만주의의 표제음악</strong>을 거쳐 20세기 현대음악까지, 음악의 양식적 변화를 핵심 작곡가와 작품을 통해 이해합니다.</p><p style={{marginBottom:14}}>악보를 읽지 못해도 충분히 즐길 수 있는 강의입니다. 바흐·모차르트·베토벤·슈베르트·브람스·드뷔시의 작품을 직접 들으면서, <strong>음악적 형식과 당대의 세계관</strong>이 어떻게 연결되는지를 감각적으로 파악합니다.</p><p>음악을 즐기는 분이라면 누구나 참여할 수 있습니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-14', topic: '세계영화사: 세계를 이미지로 사유하기', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>영화는 20세기가 발명한 가장 독창적인 예술 형식입니다. 이 강의는 뤼미에르 형제의 첫 상영부터 할리우드 고전기, 이탈리아 네오리얼리즘, 프랑스 누벨바그, 뉴 할리우드를 거쳐 <strong>동시대 세계 영화</strong>까지의 흐름을 추적합니다.</p><p style={{marginBottom:14}}>주요 감독들의 작품을 통해 <strong>편집, 미장센, 카메라 언어</strong>가 어떻게 의미를 만들어내는지를 배우며, 영화를 단순히 감상하는 것을 넘어 분석할 수 있는 시각을 기릅니다. 히치콕·고다르·구로사와·타르코프스키·홍상수 등을 다룹니다.</p><p>영화에 관심이 있다면 배경 지식 없이 수강할 수 있습니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-08', topic: '예술철학: 개념과 쟁점을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>이 강의는 <strong>예술의 정의, 예술적 가치, 미적 경험</strong>이라는 세 가지 큰 주제를 중심으로 현대 예술철학의 핵심 논쟁들을 체계적으로 살펴봅니다. 아서 단토의 예술종말론, 조지 디키의 제도론, 먼로 비어즐리의 의도론 등 20세기 예술철학의 주요 이론들을 비교합니다.</p><p style={{marginBottom:14}}>'예술이란 무엇인가'라는 물음에 다양한 철학자들이 어떻게 답해왔는지를 추적하면서, <strong>예술의 개념이 역사적으로 어떻게 변해왔는지</strong>를 이해합니다. 현대예술의 도발적인 사례들(뒤샹의 변기, 워홀의 브릴로 박스 등)이 이 논의에서 핵심 사례로 등장합니다.</p><p>예술철학 입문 강의를 먼저 들은 분들께 추천합니다. 총 5주 과정으로 진행됩니다.</p></> },
  { date: '2026-07-09', topic: '예술철학: 비평이론을 중심으로', kind: 'regular', weeks: 5, time: '20:20–22:00', detail: <><p style={{marginBottom:14}}>예술 작품을 어떻게 읽고 해석할 것인가의 문제는 20세기 내내 치열하게 논쟁되어 왔습니다. 이 강의는 <strong>형식주의, 마르크스주의, 정신분석, 페미니즘, 탈구조주의</strong> 비평 이론들을 각각의 방법론과 전제, 그리고 한계를 함께 검토합니다.</p><p style={{marginBottom:14}}>각 이론을 추상적으로 소개하는 데 그치지 않고, <strong>실제 미술 작품이나 문학 텍스트에 적용</strong>하면서 이론의 설명력과 맹점을 구체적으로 확인합니다. 롤랑 바르트의 '저자의 죽음', 로라 멀비의 '시각적 쾌락' 등 핵심 텍스트들을 함께 읽습니다.</p><p>비평에 관심 있는 분들을 위한 심화 강의입니다. 예술철학 입문 또는 개념 강의를 먼저 들으면 이해에 도움이 됩니다. 총 5주 과정으로 진행됩니다.</p></> }];

  // 강의 목록: 항상 6월 개강 강의 고정
  const data = juneCourses.slice().sort((a, b) => a.date.localeCompare(b.date));

  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + n);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
  // byDate: 6월 강의의 전체 세션 (7월까지 이어지는 것 포함)
  const sessionsByDate = {};
  for (const c of juneCourses) {
    for (let w = 0; w < c.weeks; w++) {
      const iso = addDays(c.date, w * 7);
      if (!sessionsByDate[iso]) sessionsByDate[iso] = [];
      sessionsByDate[iso].push({ ...c, weekIndex: w, isStart: w === 0 });
    }
  }
  const byDate = sessionsByDate;
  const months = { 5: buildMonth(2026, 5), 6: buildMonth(2026, 6) };
  const activeCells = months[calendarMonth];
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
                    <Tooltip key={k} label={e.topic}>
                      <span style={{
                        fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
                        lineHeight: 1.35, letterSpacing: '-0.01em',
                        color: e.kind === 'special' ? 'var(--accent)' : 'var(--ink)',
                      }}>{e.topic}</span>
                    </Tooltip>
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
          <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', overflowX: isMobile ? 'auto' : 'visible' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--ink)', minWidth: isMobile ? 480 : 'auto' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.0194em', color: 'var(--ink)', lineHeight: 1.364 }}>
                6월 강의 목록
              </div>
            </div>

            {data.length === 0 ?
            <div style={{ padding: '48px 24px', textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.385, letterSpacing: '0.0194em', color: 'var(--muted)' }}>
                이 달에 예정된 강의가 없습니다.
              </div> :

            <div>
                {data.map((row, i) => {
                const [, m, d] = row.date.split('-');
                const dow = weekdays[new Date(row.date).getDay()];
                const isOpen = openIdx === i;
                const isLast = i === data.length - 1;
                return (
                  <div key={i} style={{ borderBottom: isLast ? 'none' : '1px solid var(--line)' }}>
                      {/* 헤더 */}
                      <div onClick={() => setOpenIdx(isOpen ? null : i)} style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr auto' : '200px 1fr 160px auto',
                        gap: isMobile ? 0 : 0,
                        padding: '18px 24px',
                        cursor: 'pointer',
                        alignItems: 'center',
                        userSelect: 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        {isMobile ? (
                          <>
                            <div>
                              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.01em', marginBottom: 4 }}>
                                2026. {parseInt(m,10).toString().padStart(2,'0')}. {parseInt(d,10).toString().padStart(2,'0')}. · {row.kind === 'special' ? '' : '매주 '}{dow}요일 {row.time}
                              </div>
                              <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: row.kind === 'special' ? 'var(--accent)' : 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.4 }}>{row.topic}</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: 12 }}>
                              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        ) : (
                          <>
                            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.01em' }}>
                              2026. {parseInt(m,10).toString().padStart(2,'0')}. {parseInt(d,10).toString().padStart(2,'0')}.
                              <span style={{ color: 'var(--muted)', marginLeft: 8 }}>{row.kind === 'special' ? '(특강)' : `(총 ${row.weeks}주)`}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: row.kind === 'special' ? 'var(--accent)' : 'var(--ink)', letterSpacing: '-0.01em' }}>{row.topic}</div>
                            <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.01em' }}>{row.kind === 'special' ? '' : '매주 '}{dow}요일 {row.time}</div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: 8 }}>
                              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </div>

                      {/* 펼쳐진 상세 */}
                      {isOpen && (
                        <div style={{ padding: '28px 32px 32px', borderTop: '1px solid var(--line)' }}>
                          <div style={{ fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.9, letterSpacing: '-0.01em', color: 'var(--ink-soft)', marginBottom: 28 }}>{row.detail}</div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <a href="#catalog" style={{
                              display: 'inline-block',
                              padding: '11px 28px',
                              background: 'transparent',
                              color: 'var(--ink)',
                              border: '1px solid var(--ink)',
                              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600,
                              letterSpacing: '-0.01em', lineHeight: 1,
                              borderRadius: 9999, textDecoration: 'none',
                              transition: 'opacity 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                              자세히 보기
                            </a>
                            <a href="#cta" style={{
                              display: 'inline-block',
                              padding: '11px 28px',
                              background: 'var(--ink)',
                              color: 'var(--paper)',
                              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600,
                              letterSpacing: '-0.01em', lineHeight: 1,
                              borderRadius: 9999, textDecoration: 'none',
                              transition: 'opacity 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                              수강신청
                            </a>
                          </div>
                        </div>
                      )}
                    </div>);
              })}
              </div>
            }
          </div>

          <MonthCalendar
            title={calendarMonth === 5 ? '6월' : '7월'}
            cells={activeCells}
            tabs={
            <div style={{ display: 'inline-flex', border: '1px solid var(--ink)', borderRadius: 9999, overflow: 'hidden', flexShrink: 0 }}>
                {[[5, '6월'], [6, '7월']].map(([m, l]) =>
              <button key={m} onClick={() => setCalendarMonth(m)} style={{
                padding: '8px 20px',
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em',
                background: calendarMonth === m ? 'var(--ink)' : 'transparent',
                color: calendarMonth === m ? 'var(--paper)' : 'var(--ink)',
                border: 'none', lineHeight: 1, cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s'
              }}>{l}</button>
              )}
              </div>
            } />
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
