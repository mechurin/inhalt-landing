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
          {[['강의소개', '#catalog'], ['수강후기', '#reviews'], ['강의신청', '#cta']].map(([l, h]) =>
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

/* ============ FEATURES ============ */

function Features() {
  const isMobile = useIsMobile();
  const items = [
  { num: '1', title: '전문가의 지식을 일상의 언어로', body: '현장에서 오랜도록 쌓아온 전문가의 시각으로, 어려운 개념도 일상의 언어로 풀어줍니다.' },
  { num: '2', title: 'ZOOM을 통한 비대면 수업', body: 'ZOOM 비대면 강의로 이동 시간 없이, 지역에 구애받지 않고 바로 물을 수 있는 소통 환경을 제공합니다.' },
  { num: '3', title: '무제한 녹화본 제공', body: '수업이 끝난 뒤에도 언제든 다시 들을 수 있도록 고화질 녹화본을 제공하여 복습과 보완학습을 돕습니다.' },
  ];

  return (
    <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line-dark)' }}>
      <Container>
        <SectionLabel kor="Inhalt를 선택해야 할 이유" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 48 : 56 }}>
          {items.map((it, i) =>
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.15)' }}>{it.num}</div>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.03em', color: 'var(--paper)' }}>{it.title}</h3>
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
  const [activeFilter, setActiveFilter] = useState('전체');
  const [openGroup, setOpenGroup] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  const filters = ['전체', '미학', '예술사', '예술철학'];

  const regularCourses = [
    { category: '미학', title: '〈미학: 사상가들을 중심으로〉', detail: '미학의 핵심 주제인 미학적 속성, 미학적 대상, 미학적 태도를 주요 사상가들의 논의를 통해 살펴보는 입문 강의입니다. 플라톤에서 칸트, 헤겔, 니체까지 미학사의 흐름을 짚으며 미학의 기초를 다집니다.' },
    { category: '미학', title: '〈미학: 개념과 쟁점을 중심으로〉', detail: '재현, 표현, 형식, 제도 등 현대 미학의 핵심 개념들을 쟁점별로 정리합니다. 예술과 비예술의 경계, 예술 작품의 의미, 감상자의 경험이라는 물음을 중심으로 현대 미학의 논쟁 구도를 이해합니다.' },
    { category: '미학', title: '〈칸트의 미학〉', detail: '《판단력 비판》을 중심으로 취미 판단, 숭고, 미적 이념, 목적론의 개념들을 순서대로 살펴봅니다. "아름다움에 관한 판단은 어떻게 보편성을 주장할 수 있는가"라는 물음을 핵심으로 칸트 미학의 전체 구도를 파악합니다.' },
    { category: '미학', title: '〈헤겔의 미학〉', detail: '헤겔의 《미학 강의》를 바탕으로 예술이 상징적 형식에서 고전적 형식을 거쳐 낭만적 형식으로 발전해 나가는 역사적 도식을 분석합니다. 헤겔이 제기한 "예술의 종언" 테제를 집중적으로 검토합니다.' },
    { category: '미학', title: '〈벤야민의 미학〉', detail: '〈기술복제시대의 예술작품〉을 중심으로 아우라, 복제, 지각의 변화 개념을 꼼꼼히 분석합니다. 대중문화와 예술의 관계, 파시즘의 미학화에 대한 벤야민의 비판을 현재의 시각에서 재조명합니다.' },
    { category: '예술사', title: '〈서양미술사: 고대, 중세, 근대의 서양미술〉', detail: '고대 그리스 조각과 건축에서 출발해 중세 고딕 미술, 르네상스, 바로크를 거쳐 근대 미술의 문턱까지 서양미술사의 긴 흐름을 조망합니다. 각 시대의 사회·종교·철학적 맥락과 미술의 관계를 중심으로 서술합니다.' },
    { category: '예술사', title: '〈서양미술사: 현대의 서양미술〉', detail: '인상주의 이후부터 현재까지 표현주의, 다다, 초현실주의, 추상표현주의, 팝아트, 개념미술을 거쳐 동시대 미술까지 20세기 서양미술의 격동하는 흐름을 다룹니다.' },
    { category: '예술사', title: '〈한국미술사: 현대의 한국미술〉', detail: '해방 이후부터 현재까지 단색화, 민중미술, 설치·미디어아트 등 주요 흐름을 짚으며 한국미술의 정체성이 어떻게 형성되어 왔는지를 탐구합니다.' },
    { category: '예술사', title: '〈서양음악사: 서양음악의 생성사〉', detail: '바로크의 대위법, 고전주의의 소나타 형식, 낭만주의의 표제음악을 거쳐 20세기 현대음악까지 음악의 양식적 변화를 핵심 작곡가와 작품을 통해 이해합니다.' },
    { category: '예술사', title: '〈세계영화사: 세계를 이미지로 사유하기〉', detail: '뤼미에르 형제의 첫 상영부터 할리우드 고전기, 이탈리아 네오리얼리즘, 프랑스 누벨바그, 뉴 할리우드를 거쳐 동시대 세계 영화까지의 흐름을 추적합니다.' },
    { category: '예술철학', title: '〈예술철학: 사상가들을 중심으로〉', detail: '플라톤의 모방론에서 아리스토텔레스의 카타르시스, 톨스토이의 감정 전달론, 듀이의 경험으로서의 예술까지 주요 사상가들의 예술론을 비교·검토합니다.' },
    { category: '예술철학', title: '〈예술철학: 개념과 쟁점을 중심으로〉', detail: '예술의 정의, 예술적 가치, 미적 경험이라는 세 가지 큰 주제를 중심으로 현대 예술철학의 핵심 논쟁들을 체계적으로 살펴봅니다.' },
    { category: '예술철학', title: '〈예술철학: 비평이론을 중심으로〉', detail: '형식주의, 마르크스주의, 정신분석, 페미니즘, 탈구조주의 비평 이론들을 각각의 방법론과 전제, 한계를 함께 검토합니다.' },
  ];

  const readingCourses = [
    { title: '〈서양미술사〉 강독 — E.H. 곰브리치', detail: '곰브리치의 《서양미술사》를 함께 읽으며 텍스트를 직접 분석합니다. 각 장의 핵심 논지를 파악하고, 곰브리치의 미술사 서술 방식을 비판적으로 검토합니다.', status: 'open' },
    { title: '〈현대미술의 의미〉 강독 — T. J. 클라크', detail: '클라크의 텍스트를 통해 마르크스주의 미술사 방법론을 이해합니다.', status: 'upcoming' },
  ];

  const specialCourses = [
    { title: '〈이탈리아 르네상스의 도시와 미술〉', detail: '피렌체, 베네치아, 로마를 중심으로 르네상스 미술이 도시의 권력·상업·종교·인문주의와 어떻게 맞물려 새로운 시각 문화를 만들어냈는지를 추적합니다.' },
    { title: '〈바로크 미술의 두 세계: 카라바조와 렘브란트〉', detail: '카라바조의 키아로스쿠로와 거친 현실주의, 렘브란트의 내면적 심리 표현을 나란히 놓고 분석하며 같은 시대에 왜 이렇게 다른 회화 언어가 발전했는지를 이해합니다.' },
    { title: '〈낭만주의 미술의 시작과 전개〉', detail: '고야·들라크루아·프리드리히의 대표작을 통해 계몽주의에 대한 반발로 출현한 낭만주의 미술의 다양한 스펙트럼을 살펴봅니다.' },
    { title: '〈인상주의와 후기 인상주의: 현대미술의 문턱〉', detail: '모네와 르누아르로부터 세잔과 반 고흐까지, 인상주의가 어떻게 현대미술로 나아가는 길을 열었는지를 추적합니다.' },
    { title: '〈20세기 추상미술의 탄생〉', detail: '칸딘스키, 몬드리안, 말레비치를 중심으로 추상미술이 왜 20세기 초에 출현했는지, 각 작가들이 추상을 어떻게 다르게 이해했는지를 비교합니다.' },
    { title: '〈다다와 초현실주의〉', detail: '1차 세계대전 이후 등장한 다다의 반예술 정신과, 이를 계승하면서도 무의식의 세계를 탐구한 초현실주의를 살펴봅니다.' },
    { title: '〈팝아트와 소비사회〉', detail: '워홀, 리히텐슈타인, 해밀턴을 통해 팝아트가 소비사회와 대중문화를 어떻게 미술의 언어로 전환했는지를 이해합니다.' },
    { title: '〈개념미술과 현대미술의 확장〉', detail: '뒤샹의 레디메이드에서 시작해 1960–70년대 개념미술까지, 예술의 물질성이 해체되고 아이디어 자체가 작품이 되는 과정을 살펴봅니다.' },
  ];

  const filteredRegular = activeFilter === '전체' ? regularCourses : regularCourses.filter(c => c.category === activeFilter);

  const groups = [
    { id: 'regular', label: '정규 강의', courses: filteredRegular, totalCount: regularCourses.length, hasFilter: true, color: 'var(--ink)' },
    { id: 'reading', label: '정규 강독', courses: readingCourses, totalCount: readingCourses.length, hasFilter: false, color: 'var(--ink)' },
    { id: 'special', label: '특별 강의', courses: specialCourses, totalCount: specialCourses.length, hasFilter: false, color: 'var(--accent)' },
  ];

  return (
    <section id="catalog" style={{ background: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <SectionLabel kor="강의 소개" />
        <div style={{ border: '1px solid var(--ink)' }}>
          {groups.map((group, gi) => {
            const isGroupOpen = openGroup === group.id;
            return (
              <div key={group.id} style={{ borderBottom: gi < groups.length - 1 ? '1px solid var(--ink)' : 'none' }}>
                <div
                  onClick={() => { setOpenGroup(isGroupOpen ? null : group.id); setOpenCourse(null); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '20px 20px' : '24px 32px', cursor: 'pointer', userSelect: 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ width: 10, height: 10, background: group.color, flexShrink: 0, display: 'inline-block', borderRadius: 2 }} />
                    <span style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? 18 : 22, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{group.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{group.totalCount}개</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s', transform: isGroupOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {isGroupOpen && (
                  <div style={{ borderTop: '1px solid var(--line)' }}>
                    {group.hasFilter && (
                      <div style={{ padding: isMobile ? '16px 20px' : '16px 32px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {filters.map(f => (
                          <button key={f}
                            onClick={e => { e.stopPropagation(); setActiveFilter(f); setOpenCourse(null); }}
                            style={{
                              padding: '7px 16px', borderRadius: 9999, border: '1px solid',
                              borderColor: activeFilter === f ? 'var(--ink)' : 'var(--line)',
                              background: activeFilter === f ? 'var(--ink)' : 'transparent',
                              color: activeFilter === f ? 'var(--paper)' : 'var(--muted)',
                              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', cursor: 'pointer', transition: 'all 0.15s'
                            }}
                          >{f}</button>
                        ))}
                      </div>
                    )}

                    {group.courses.map((course, ci) => {
                      const courseKey = `${group.id}-${ci}`;
                      const isCourseOpen = openCourse === courseKey;
                      const isLast = ci === group.courses.length - 1;
                      return (
                        <div key={ci} style={{ borderBottom: isLast ? 'none' : '1px solid var(--line)' }}>
                          <div
                            onClick={e => { e.stopPropagation(); setOpenCourse(isCourseOpen ? null : courseKey); }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '16px 20px' : '18px 32px', cursor: 'pointer', userSelect: 'none', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {group.hasFilter && (
                                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', minWidth: 44, fontFamily: 'var(--sans)' }}>{course.category}</span>
                              )}
                              {course.status === 'upcoming' && (
                                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.05em', fontFamily: 'var(--sans)' }}>예정</span>
                              )}
                              <span style={{ fontFamily: 'var(--sans)', fontSize: isMobile ? 14 : 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.5 }}>{course.title}</span>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s', transform: isCourseOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: 12 }}>
                              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          {isCourseOpen && (
                            <div style={{ padding: isMobile ? '16px 20px 20px' : '20px 32px 28px', borderTop: '1px solid var(--line)', background: 'var(--ivory)' }}>
                              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.9, letterSpacing: '-0.005em', color: 'var(--ink-soft)', fontWeight: 400 }}>{course.detail}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>);
}

/* ============ REVIEWS ============ */

function ReviewCard({ r }) {
  const [hovered, setHovered] = useState(false);
  return (
    <figure
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 320, flexShrink: 0,
        background: hovered ? 'var(--ink)' : 'var(--paper)',
        border: '1px solid', borderColor: hovered ? 'var(--ink)' : 'var(--line)',
        borderRadius: 16, padding: '28px 28px 24px',
        display: 'flex', flexDirection: 'column',
        transition: 'background 0.2s, border-color 0.2s', cursor: 'default',
      }}
    >
      <div style={{
        width: 22, height: 28, marginBottom: 20,
        backgroundImage: `url(${window.__resources.logoSimbol})`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center',
        filter: hovered ? 'brightness(10)' : 'none', transition: 'filter 0.2s'
      }} />
      <blockquote style={{
        fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.75, letterSpacing: '-0.005em',
        color: hovered ? 'rgba(255,255,255,0.85)' : 'var(--ink-soft)',
        fontWeight: 400, flex: 1, transition: 'color 0.2s'
      }}>{r.quote}</blockquote>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid', borderTopColor: hovered ? 'rgba(255,255,255,0.15)' : 'var(--line)', transition: 'border-color 0.2s' }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.5, letterSpacing: '0.01em', fontWeight: 400, color: hovered ? 'rgba(255,255,255,0.45)' : 'var(--muted)', marginBottom: 4, transition: 'color 0.2s' }}>{r.course} · {r.date} 수강</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.4, letterSpacing: '-0.01em', fontWeight: 600, color: hovered ? 'var(--paper)' : 'var(--ink)', transition: 'color 0.2s' }}>{r.name} 수강생</div>
      </div>
    </figure>
  );
}

function Reviews() {
  const isMobile = useIsMobile();
  const reviews = [
    { quote: '칸트 미학을 이렇게 쉽게 접근할 수 있을 거라고 생각 못 했습니다. 숭고와 아름다움의 차이, 취미 판단의 개념이 실제 예술 감상에 어떻게 연결되는지 명확하게 설명해주셔서 어렵게만 느껴지던 철학이 친근하게 다가왔습니다. 다음 수업도 기대됩니다.', name: '박O연', course: '칸트의 미학', date: '26.01.12' },
    { quote: '매달 수업을 들을 때마다 예술을 바라보는 시각이 조금씩 달라지는 게 느껴집니다. 처음엔 그림 보는 취미 정도로 시작했는데, 강의를 들을수록 예술이 이렇게 넓은 세계였다는 걸 실감하게 됩니다. 헤겔의 정신 개념이 예술사와 이어지는 순간이 특히 인상 깊었습니다.', name: '이O현', course: '헤겔의 미학', date: '26.02.09' },
    { quote: '일방적인 강의가 아니라 미학이 정말 일상의 언어로 들어오는 느낌을 받았습니다. 예술을 보는 눈이 탁 트인 것 같은 경험입니다.', name: '강O수', course: '미학: 사상가들을 중심으로', date: '25.11.03' },
    { quote: '비교 맥락이 풍부해 강사님과 대화가 있는 소통이 당연하게 느껴졌습니다. 매 수업 시간이 기다려지는 강의입니다.', name: '최O선', course: '서양미술사: 현대의 서양미술', date: '25.12.08' },
    { quote: '미술사의 방대한 흐름을 맥락 위주로 설명해주셔서 훨씬 체계적으로 정리되었습니다. 강력 추천합니다.', name: '한O민', course: '서양미술사: 고대, 중세, 근대', date: '25.10.06' },
    { quote: '미술사의 방대한 흐름을 맥락 위주로 설명해주셔서 훨씬 체계적으로 정리가 되었습니다. 다음 수업도 기대됩니다.', name: '정O아', course: '한국미술사: 현대의 한국미술', date: '26.03.10' },
    { quote: '벤야민의 아우라 개념이 이렇게 현대적으로 다가올 수 있다는 게 놀라웠습니다. 철학 텍스트를 혼자 읽을 때는 막막했는데 강의를 통해 맥락이 잡혔습니다.', name: '윤O지', course: '벤야민의 미학', date: '26.01.19' },
    { quote: '음악사 강의를 들으면서 바흐와 모차르트가 단순히 유명한 작곡가가 아니라 시대의 산물이라는 걸 깨달았습니다. 음악이 더 깊이 들리게 됩니다.', name: '김O현', course: '서양음악사', date: '25.12.15' },
    { quote: '예술철학이 이렇게 실용적인 학문이었다는 걸 이번 강의에서 처음 알았습니다. 작품을 감상하는 방식 자체가 달라졌어요.', name: '서O영', course: '예술철학: 사상가들을 중심으로', date: '26.02.03' },
    { quote: '영화를 좋아해서 수강했는데 단순히 감상하는 것을 넘어 이미지의 언어를 배운 것 같습니다. 강의 후 영화를 보는 시각이 완전히 달라졌습니다.', name: '임O준', course: '세계영화사', date: '26.03.17' },
    { quote: '소수 인원으로 진행되어서 질문과 토론이 활발했습니다. 강사님의 설명이 탁월하고 강의 자료도 풍부했습니다. 다음 기수도 꼭 신청할 예정입니다.', name: '오O아', course: '미학: 개념과 쟁점을 중심으로', date: '26.01.26' },
  ];

  const doubled = [...reviews, ...reviews];

  return (
    <section id="reviews" style={{ background: 'var(--ivory)', padding: isMobile ? '80px 0' : '140px 0', borderTop: '1px solid var(--line)', overflow: 'hidden' }}>
      <style>{`
        @keyframes rollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reviews-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: rollLeft 40s linear infinite;
          padding: 0 8px;
        }
        .reviews-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div style={{ paddingLeft: isMobile ? 24 : 40, marginBottom: 48 }}>
        <SectionLabel kor="수강생 후기" />
      </div>
      <div className="reviews-track">
        {doubled.map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </section>
  );
}

/* ============ CTA ============ */

function CTA() {
  const isMobile = useIsMobile();
  return (
    <section id="cta" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '80px 24px' : '140px 40px', borderTop: '1px solid var(--line-dark)' }}>
      <Container style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20, color: 'var(--paper)', fontSize: isMobile ? 36 : 48 }}>
          강의 신청
        </h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 16, letterSpacing: '-0.01em', marginBottom: 56, lineHeight: 1.7, fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>
          블로그와 인스타그램에서 강의 일정과 신청 방법을 확인하세요.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://blog.naver.com/radiognod" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--paper)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, borderRadius: 9999, border: '1px solid var(--paper)', textDecoration: 'none', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >블로그에서 확인하기</a>
          <a href="https://www.instagram.com/inhalt.lecture/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'transparent', color: 'var(--paper)', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1, borderRadius: 9999, border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--paper)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
          >인스타에서 확인하기</a>
        </div>
      </Container>
    </section>
  );
}

/* ============ CONTACT ============ */

function Contact() {
  const isMobile = useIsMobile();
  const [copiedKakao, setCopiedKakao] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  function copy(text, setter) {
    navigator.clipboard.writeText(text).then(() => { setter(true); setTimeout(() => setter(false), 1800); });
  }

  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section style={{ background: 'var(--paper)', padding: isMobile ? '80px 24px' : '120px 40px', borderTop: '1px solid var(--line)' }}>
      <Container>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 40 }}>
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: isMobile ? 32 : 40, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink)', flexShrink: 0 }}>문의 및 제안</h2>
          <div style={{ border: '1px solid var(--line)', borderRadius: 20, padding: isMobile ? '24px 24px' : '28px 36px', display: 'flex', flexDirection: 'column', gap: 16, minWidth: isMobile ? '100%' : 400 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)', flex: 1 }}>카카오톡 : <strong>inhalt</strong></span>
              <button onClick={() => copy('inhalt', setCopiedKakao)} style={{ color: copiedKakao ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.15s', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }} title="복사">
                {copiedKakao ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
            <div style={{ height: 1, background: 'var(--line)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)', flex: 1 }}>이메일 : <strong>inhalt.lecture@gmail.com</strong></span>
              <button onClick={() => copy('inhalt.lecture@gmail.com', setCopiedEmail)} style={{ color: copiedEmail ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.15s', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }} title="복사">
                {copiedEmail ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
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
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, border: '1px solid #3A3528', borderRadius: 9999, color: 'var(--paper)', transition: 'background 0.15s, color 0.15s' }}
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
      <Reviews />
      <CTA />
      <Contact />
      <Footer />
    </>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
