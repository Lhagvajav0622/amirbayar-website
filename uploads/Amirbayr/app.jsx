// Амирбаяр ХХК — Single-page website
const { useState, useEffect, useMemo, useRef } = React;

// ====== ICONS ======
const ICONS = {
  pipe: '<path d="M2 12h7l3-9 3 18 3-9h4"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.4 0 2.5-1.1 2.5-2.5 0-3.4-3.5-2.5-3.5-7 0 0-1.5 1.5-1.5 4 0 2.5 1.5 4 1.5 4M14.5 14.5C14.5 16 13 17 11.5 17"/><path d="M12 22a8 8 0 0 0 8-8c0-5-4-8-7-12-3 4-7 7-7 12a8 8 0 0 0 6 8z"/>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  pin: '<path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  more: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  certificate: '<circle cx="12" cy="8" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/>',
};

const Icon = ({ name, size = 20, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}
    dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }} />
);

const fmt = (n) => n.toLocaleString("en-US");

// ====== HOOKS ======
function useScrolled(threshold = 30) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return seen;
}

// ====== ATOMS ======
const Btn = ({ variant = "primary", size = "md", children, onClick, href, style }) => {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: "var(--ds-font-body)",
    fontSize: size === "lg" ? 16 : 14,
    fontWeight: 600,
    padding: size === "lg" ? "14px 24px" : "10px 18px",
    borderRadius: 8,
    border: "1.5px solid transparent",
    cursor: "pointer",
    transition: "all 200ms cubic-bezier(0.2,0,0,1)",
    display: "inline-flex", alignItems: "center", gap: 8,
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...style,
  };
  const variants = {
    primary: { background: "#EB1E24", color: "#fff" },
    dark: { background: "#031A4F", color: "#fff" },
    ghost: { background: "rgba(255,255,255,0.08)", color: "#fff", borderColor: "rgba(255,255,255,0.25)" },
    light: { background: "#fff", color: "#1A1A24", borderColor: "#DDE5EF" },
    outline: { background: "transparent", color: "#EB1E24", borderColor: "#EB1E24" },
  };
  const hovers = {
    primary: { background: "#C8161B" },
    dark: { background: "#0E3399" },
    ghost: { background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.45)" },
    light: { background: "#F7F9FC", borderColor: "#C8D3E2" },
    outline: { background: "#EB1E24", color: "#fff" },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(hover ? hovers[variant] : {}) }}>
      {children}
    </Tag>
  );
};

const Kicker = ({ num, children, color = "#EB1E24" }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 12,
    fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.16em", textTransform: "uppercase", color,
  }}>
    {num && <span style={{ opacity: 0.6 }}>{num}</span>}
    {num && <span style={{ width: 24, height: 1, background: color, opacity: 0.4 }} />}
    {children}
  </div>
);

// ====== NAVBAR ======
const Navbar = ({ onJump }) => {
  const scrolled = useScrolled(40);
  const links = [
    { id: "about", label: "Тухай" },
    { id: "products", label: "Бүтээгдэхүүн" },
    { id: "contact", label: "Холбоо" },
  ];
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
      borderBottom: scrolled ? "1px solid #DDE5EF" : "1px solid transparent",
      transition: "all 240ms cubic-bezier(0.2,0,0,1)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 5%",
        height: scrolled ? 64 : 76,
        display: "flex", alignItems: "center", gap: 32,
        transition: "height 240ms cubic-bezier(0.2,0,0,1)",
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src="assets/brand-logo.svg" alt="" style={{ height: scrolled ? 36 : 42, width: "auto", flexShrink: 0 }}/>
          <div style={{ whiteSpace: "nowrap" }}>
            <div style={{
              fontFamily: "Roboto", fontWeight: 900, fontSize: scrolled ? 16 : 17,
              color: scrolled ? "#1A1A24" : "#fff",
              lineHeight: 1, letterSpacing: "-0.01em",
              transition: "color 240ms",
              whiteSpace: "nowrap",
            }}>АМИРБАЯР ХХК</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", color: "#EB1E24", marginTop: 3, whiteSpace: "nowrap" }}>
              PPR ХООЛОЙ · ФИТИНГ
            </div>
          </div>
        </a>
        <nav className="nav-links" style={{ display: "flex", gap: 4, marginLeft: 32 }}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); onJump(l.id); }}
              style={{
                padding: "8px 14px", borderRadius: 6,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                color: scrolled ? "#1A1A24" : "rgba(255,255,255,0.9)",
                transition: "all 180ms",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#EB1E24"}
              onMouseLeave={(e) => e.currentTarget.style.color = scrolled ? "#1A1A24" : "rgba(255,255,255,0.9)"}
            >{l.label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <a href="tel:+97699064486" style={{
            display: "flex", alignItems: "center", gap: 8,
            color: scrolled ? "#031A4F" : "#fff",
            fontWeight: 600, fontSize: 14, textDecoration: "none",
          }}>
            <Icon name="phone" size={16}/>
            <span>9906-4486</span>
          </a>
          <Btn variant="primary" onClick={() => onJump("products")}>
            Үнийн жагсаалт <Icon name="arrow" size={14}/>
          </Btn>
        </div>
      </div>
    </header>
  );
};

// ====== HERO ======
const Hero = ({ onJump }) => {
  return (
    <section id="top" style={{
      position: "relative", overflow: "hidden",
      background: "radial-gradient(ellipse at 30% 20%, #0E3399 0%, #052678 40%, #031A4F 100%)",
      color: "#fff", padding: "160px 5% 120px",
    }}>
      {/* grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        pointerEvents: "none",
      }}/>
      {/* red glow */}
      <div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(235,30,36,0.22) 0%, transparent 65%)",
        top: -200, right: -150, filter: "blur(40px)", pointerEvents: "none",
      }}/>

      <div className="hero-grid" style={{
        maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2,
        display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "center",
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 16px", borderRadius: 999,
            background: "rgba(235,30,36,0.15)", border: "1px solid rgba(235,30,36,0.4)",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "#FF6B70",
            marginBottom: 28,
          }}>
            <span style={{
              width: 8, height: 8, background: "#EB1E24", borderRadius: "50%",
              boxShadow: "0 0 12px #EB1E24", animation: "pulse 1.6s ease-in-out infinite",
            }}/>
            BLUE OCEAN — ГЭРЭЭТ БОРЛУУЛАГЧ
          </div>

          <h1 className="display-h1" style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 76, fontWeight: 700, lineHeight: 1.02,
            letterSpacing: "-0.025em", margin: 0, color: "#fff",
          }}>
            PPR хоолой,<br/>
            <span style={{ color: "#FF6B70" }}>фитингний</span> найдвартай нийлүүлэгч.
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.78)",
            marginTop: 28, maxWidth: 560,
          }}>
            EN ISO 15874:2013 болон Герман улсын DIN 8077; 8078:2008 стандартын дагуу үйлдвэрлэсэн чанартай бүтээгдэхүүн. <strong style={{ color: "#fff", fontWeight: 600 }}>Чанар бол хэмнэлт.</strong>
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Btn variant="primary" size="lg" onClick={() => onJump("products")}>
              Үнийн жагсаалт үзэх <Icon name="arrow" size={16}/>
            </Btn>
            <Btn variant="ghost" size="lg" onClick={() => onJump("contact")}>
              <Icon name="phone" size={16}/> Холбогдох
            </Btn>
          </div>

          {/* certifications */}
          <div style={{ display: "flex", gap: 28, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { l1: "ISO 9001:2008", l2: "Чанарын сертификат" },
              { l1: "ISO 14001:2004", l2: "Байгаль орчны" },
              { l1: "EN ISO 15874:2013", l2: "Олон улсын стандарт" },
              { l1: "DIN 8077; 8078", l2: "Герман стандарт" },
            ].map((c, i) => (
              <div key={i} style={{ borderLeft: "2px solid rgba(255,107,112,0.5)", paddingLeft: 14 }}>
                <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>{c.l1}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2, letterSpacing: "0.04em" }}>{c.l2}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: visual */}
        <div style={{ position: "relative", height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "absolute", width: 360, height: 360, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "spin 40s linear infinite",
          }}/>
          <div style={{
            position: "absolute", width: 460, height: 460, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            animation: "spin 60s linear infinite reverse",
          }}/>

          <img src="assets/brand-logo.svg" alt="" style={{
            width: 280, height: 280, position: "relative", zIndex: 2,
            filter: "drop-shadow(0 30px 60px rgba(235,30,36,0.4))",
            animation: "float 6s ease-in-out infinite",
          }}/>

          {/* floating spec cards */}
          <div style={{
            position: "absolute", top: 30, left: 0,
            padding: "14px 18px",
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12,
            animation: "float 5s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>ТЕМПЕРАТУР</div>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 26, fontWeight: 700, color: "#fff", marginTop: 2 }}>+95°C</div>
          </div>
          <div style={{
            position: "absolute", bottom: 60, right: 0,
            padding: "14px 18px",
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12,
            animation: "float 5s ease-in-out infinite 2s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>ХЭМЖЭЭ</div>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 26, fontWeight: 700, color: "#fff", marginTop: 2 }}>Ø16–160</div>
          </div>
          <div style={{
            position: "absolute", bottom: 30, left: 30,
            padding: "14px 18px",
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12,
            animation: "float 5s ease-in-out infinite 3.5s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>БАТАЛГАА</div>
            <div style={{ fontFamily: "var(--ds-font-display)", fontSize: 26, fontWeight: 700, color: "#fff", marginTop: 2 }}>50 жил</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ====== ABOUT ======
const About = () => {
  const ref = useRef(null);
  const seen = useInView(ref);

  const trust = [
    { icon: "certificate", t: "Олон улсын стандарт", d: "EN ISO 15874:2013 / DIN 8077; 8078:2008" },
    { icon: "shield", t: "Чанарын баталгаа", d: "ISO 9001:2008 чанарын менежмент" },
    { icon: "globe", t: "Байгаль орчны", d: "ISO 14001:2004 сертификаттай" },
    { icon: "award", t: "Гэрээт борлуулагч", d: "BLUE OCEAN брэндийн албан ёсны нийлүүлэгч" },
  ];

  return (
    <section id="about" ref={ref} className="section-pad" style={{
      padding: "120px 5%", background: "#fff",
      borderTop: "1px solid #DDE5EF", borderBottom: "1px solid #DDE5EF",
    }}>
      <div className="row-grid-2" style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start",
      }}>
        <div>
          <Kicker num="01">Бидний тухай</Kicker>
          <h2 className="section-h2" style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 48, fontWeight: 700, lineHeight: 1.05,
            letterSpacing: "-0.02em", color: "#1A1A24",
            marginTop: 16, marginBottom: 24,
          }}>
            Чанартай PPR<br/>хоолойн төв нийлүүлэгч
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#4A5568", margin: 0 }}>
            <strong style={{ color: "#1A1A24" }}>«Амирбаяр» ХХК</strong> нь олон улсын <strong style={{ color: "#1A1A24" }}>BLUE OCEAN</strong> брэндийн гэрээт борлуулагч бөгөөд Монголын барилга, сантехникийн салбарыг чанартай PPR хоолой, фитингээр хангаж буй найдвартай нийлүүлэгч юм.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#4A5568", marginTop: 16 }}>
            Манай бүтээгдэхүүн EN ISO 15874:2013 болон Герман улсын DIN 8077; 8078:2008 стандартын дагуу үйлдвэрлэгдсэн ба ISO 9001:2008, ISO 14001:2004 сертификаттай.
          </p>

          <div style={{
            marginTop: 32, padding: "20px 24px",
            background: "#F7F9FC", borderRadius: 8,
            borderLeft: "3px solid #EB1E24",
          }}>
            <div style={{
              fontFamily: "var(--ds-font-display)", fontSize: 22, fontWeight: 700,
              color: "#031A4F", letterSpacing: "-0.01em",
            }}>«Чанар бол хэмнэлт»</div>
            <div style={{ fontSize: 13, color: "#6B7A8F", marginTop: 4 }}>— Манай үндсэн зарчим</div>
          </div>
        </div>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {trust.map((t, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: 8,
              background: "#fff", border: "1px solid #DDE5EF",
              opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(16px)",
              transition: `all 500ms cubic-bezier(0.2,0,0,1) ${i * 80}ms`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8,
                background: "#FFE8E9", color: "#EB1E24",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <Icon name={t.icon} size={22}/>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#1A1A24", letterSpacing: "-0.005em" }}>{t.t}</div>
              <div style={{ fontSize: 13, color: "#6B7A8F", marginTop: 6, lineHeight: 1.5 }}>{t.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== PRODUCT TABLE ======
const PriceTable = ({ category, query }) => {
  const items = useMemo(() => {
    if (!query) return category.items;
    const q = query.toLowerCase();
    return category.items.filter(i =>
      i.code.toLowerCase().includes(q) ||
      i.size.toLowerCase().includes(q) ||
      String(i.price).includes(q)
    );
  }, [category, query]);

  if (items.length === 0) return null;

  return (
    <div style={{
      background: "#fff", border: "1px solid #DDE5EF", borderRadius: 8,
      overflow: "hidden", marginBottom: 24,
    }}>
      <div style={{
        padding: "20px 24px",
        background: "linear-gradient(135deg, #031A4F 0%, #052678 100%)",
        color: "#fff",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8,
          background: "rgba(235,30,36,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name={category.icon} size={20} color="#FF6B70"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>{category.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{category.desc}</div>
        </div>
        <div style={{
          fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)",
          padding: "4px 10px", background: "rgba(255,255,255,0.08)", borderRadius: 999,
        }}>{items.length} ТӨРӨЛ</div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#F7F9FC", borderBottom: "1px solid #DDE5EF" }}>
              <th className="pdt-cell" style={thStyle}>Код</th>
              <th className="pdt-cell" style={thStyle}>Хэмжээ</th>
              <th className="pdt-cell" style={{ ...thStyle, textAlign: "right" }}>Үнэ (₮)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <PriceRow key={category.id + "_" + idx} it={it} idx={idx}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left", padding: "12px 18px",
  fontFamily: "var(--ds-font-body)", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7A8F",
};

const PriceRow = ({ it, idx }) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(it.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  };

  return (
    <tr
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderBottom: "1px solid #F0F4FA",
        background: hover ? "#F7F9FC" : (idx % 2 === 0 ? "#fff" : "#FCFDFE"),
        transition: "background 160ms",
      }}>
      <td className="pdt-cell" style={{ padding: "13px 18px", fontFamily: "var(--ds-font-mono)", fontSize: 13, color: "#1A1A24" }}>
        <button onClick={copyCode} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer",
          fontFamily: "var(--ds-font-mono)", fontSize: 13, color: copied ? "#2F9E5E" : "#1A1A24",
          display: "inline-flex", alignItems: "center", gap: 8,
        }}
        title="Хуулах">
          <span>{it.code}</span>
          <Icon name={copied ? "check" : "copy"} size={12} color={copied ? "#2F9E5E" : (hover ? "#6B7A8F" : "transparent")}/>
        </button>
      </td>
      <td className="pdt-cell" style={{ padding: "13px 18px", color: "#4A5568" }}>{it.size}</td>
      <td className="pdt-cell" style={{
        padding: "13px 18px", textAlign: "right",
        fontFamily: "var(--ds-font-body)", fontWeight: 700, color: "#031A4F",
        fontSize: 15,
      }}>
        {fmt(it.price)}<span style={{ color: "#9B9BA8", fontWeight: 500, marginLeft: 4 }}>₮</span>
      </td>
    </tr>
  );
};

// ====== PRODUCTS SECTION ======
const Products = () => {
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState("pipes");
  const groups = window.PRODUCT_GROUPS;
  const cats = window.PRODUCT_CATEGORIES;

  // when query is non-empty, search across ALL groups
  const activeCats = useMemo(() => {
    if (query.trim()) return cats;
    const g = groups.find(x => x.id === groupId);
    return cats.filter(c => g.catIds.includes(c.id));
  }, [groupId, query]);

  const totalMatches = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return cats.reduce((sum, c) => sum + c.items.filter(i =>
      i.code.toLowerCase().includes(q) ||
      i.size.toLowerCase().includes(q) ||
      String(i.price).includes(q)
    ).length, 0);
  }, [query]);

  return (
    <section id="products" className="section-pad" style={{ padding: "120px 5%", background: "#F7F9FC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <Kicker num="02">Бүтээгдэхүүн / Үнийн жагсаалт</Kicker>
          <h2 className="section-h2" style={{
            fontFamily: "var(--ds-font-display)",
            fontSize: 48, fontWeight: 700, lineHeight: 1.05,
            letterSpacing: "-0.02em", color: "#1A1A24",
            marginTop: 16, marginBottom: 16,
          }}>
            Бүх бүтээгдэхүүн, бодит үнэ.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#4A5568", margin: 0 }}>
            Ø16-аас Ø160 мм хүртэлх PPR хоолой, 350+ төрлийн фитинг, хаалт, багаж хэрэгсэл. Үнэ нь тогтоосон бөгөөд дээж хэмжээний цутгамал.
          </p>
        </div>

        {/* search bar */}
        <div style={{
          background: "#fff", border: "1px solid #DDE5EF", borderRadius: 8,
          padding: "8px 12px", display: "flex", alignItems: "center", gap: 12,
          marginBottom: 20,
          boxShadow: "0 1px 2px rgba(13,27,42,0.04)",
        }}>
          <Icon name="search" size={18} color="#6B7A8F"/>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Бүтээгдэхүүний нэр, хэмжээ, эсвэл код хайх… (жишээ нь: Ø32, муфьт, PPR-CW)"
            style={{
              flex: 1, border: "none", outline: "none",
              fontFamily: "var(--ds-font-body)", fontSize: 15,
              padding: "12px 0", color: "#1A1A24", background: "transparent",
            }}
          />
          {query && (
            <>
              <span style={{ fontFamily: "var(--ds-font-mono)", fontSize: 12, color: "#6B7A8F" }}>
                {totalMatches} илэрц
              </span>
              <button onClick={() => setQuery("")} style={{
                width: 32, height: 32, borderRadius: 6, border: "none",
                background: "#F7F9FC", cursor: "pointer", color: "#4A5568",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="x" size={14}/>
              </button>
            </>
          )}
        </div>

        {/* group tabs (hidden during search) */}
        {!query && (
          <div className="group-tabs" style={{
            display: "flex", gap: 8, marginBottom: 32,
            paddingBottom: 4, overflowX: "auto",
          }}>
            {groups.map((g) => (
              <button key={g.id} onClick={() => setGroupId(g.id)} style={{
                padding: "10px 18px", borderRadius: 999,
                border: "1px solid " + (groupId === g.id ? "#031A4F" : "#DDE5EF"),
                background: groupId === g.id ? "#031A4F" : "#fff",
                color: groupId === g.id ? "#fff" : "#4A5568",
                fontFamily: "var(--ds-font-body)", fontSize: 14, fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 180ms",
              }}>
                <Icon name={g.icon} size={15}/>
                {g.name}
                <span style={{
                  fontFamily: "var(--ds-font-mono)", fontSize: 11,
                  opacity: 0.7, marginLeft: 4,
                }}>
                  {cats.filter(c => g.catIds.includes(c.id)).reduce((s, c) => s + c.items.length, 0)}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* tables */}
        <div>
          {activeCats.map(c => (
            <PriceTable key={c.id} category={c} query={query}/>
          ))}
          {query && totalMatches === 0 && (
            <div style={{
              padding: 64, background: "#fff", borderRadius: 8, border: "1px solid #DDE5EF",
              textAlign: "center", color: "#6B7A8F",
            }}>
              <Icon name="search" size={32} color="#C8D3E2"/>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#1A1A24", marginTop: 12 }}>
                «{query}» гэсэн илэрц олдсонгүй
              </div>
              <div style={{ fontSize: 14, marginTop: 6 }}>
                Өөр түлхүүр үг ашиглан хайна уу.
              </div>
            </div>
          )}
        </div>

        {/* note */}
        <div style={{
          marginTop: 40,
          padding: "24px 28px",
          background: "linear-gradient(135deg, #031A4F 0%, #052678 100%)",
          borderRadius: 8,
          color: "#fff",
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 8,
            background: "rgba(235,30,36,0.2)", color: "#FF6B70",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon name="settings" size={22}/>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{
              fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.16em", color: "#FF6B70",
            }}>ТЭМДЭГЛЭЛ</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, letterSpacing: "-0.01em" }}>
              ЗАХИАЛГААР ХИЙНЭ
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4, lineHeight: 1.5 }}>
              Жагсаалтад байхгүй хэмжээ, тусгай захиалгат бүтээгдэхүүн авах боломжтой. Хэмжээ, тоогоо хэлээрэй — бид найдвартай хүлээн авна.
            </div>
          </div>
          <Btn variant="primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Холбогдох <Icon name="arrow" size={14}/>
          </Btn>
        </div>
      </div>
    </section>
  );
};

// ====== CONTACT ======
const Contact = () => {
  const c = window.CONTACT;
  const ref = useRef(null);
  const seen = useInView(ref);

  const items = [
    {
      icon: "phone",
      title: "Утас",
      lines: c.phones.map(p => ({ text: p, href: `tel:+976${p.replace("-","")}` })),
    },
    {
      icon: "mail",
      title: "И-мэйл",
      lines: [{ text: c.email, href: `mailto:${c.email}` }],
    },
    {
      icon: "pin",
      title: "Хаяг",
      lines: [{ text: c.address }],
    },
    {
      icon: "globe",
      title: "Веб",
      lines: c.web.map(w => ({ text: w, href: `https://${w}` })),
    },
  ];

  return (
    <section id="contact" ref={ref} className="section-pad" style={{
      padding: "120px 5%", background: "#fff",
      borderTop: "1px solid #DDE5EF",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="row-grid-2" style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64,
        }}>
          <div>
            <Kicker num="03">Холбоо барих</Kicker>
            <h2 className="section-h2" style={{
              fontFamily: "var(--ds-font-display)",
              fontSize: 48, fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.02em", color: "#1A1A24",
              marginTop: 16, marginBottom: 24,
            }}>
              Шууд утсаар<br/>холбогдоорой.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#4A5568", margin: 0 }}>
              Үнийн судалгаа, тоо хэмжээ, хүргэлтийн талаар лавлахдаа доорх дугаараар холбогдоно уу. Бид Гермес худалдааны төвд таныг угтаж байна.
            </p>

            <div style={{
              marginTop: 32, padding: "20px 24px",
              background: "#F7F9FC", borderRadius: 8,
              borderLeft: "3px solid #031A4F",
            }}>
              <div style={{
                fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.16em", color: "#6B7A8F",
              }}>АЖЛЫН ЦАГ</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A24", marginTop: 6, lineHeight: 1.5 }}>
                Даваа – Бямба: 09:00 – 19:00<br/>
                <span style={{ color: "#6B7A8F", fontWeight: 500 }}>Ням гараг: Амарна</span>
              </div>
            </div>
          </div>

          <div className="features-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "start",
          }}>
            {items.map((it, i) => (
              <div key={it.title} style={{
                padding: 24, borderRadius: 8,
                background: "#fff", border: "1px solid #DDE5EF",
                opacity: seen ? 1 : 0, transform: seen ? "translateY(0)" : "translateY(16px)",
                transition: `all 500ms cubic-bezier(0.2,0,0,1) ${i * 80}ms`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8D3E2"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(13,27,42,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDE5EF"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: "#FFE8E9", color: "#EB1E24",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14,
                }}>
                  <Icon name={it.icon} size={20}/>
                </div>
                <div style={{
                  fontFamily: "var(--ds-font-mono)", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.16em", color: "#6B7A8F", textTransform: "uppercase",
                }}>{it.title}</div>
                <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                  {it.lines.map((l, j) => (
                    l.href
                      ? <a key={j} href={l.href} style={{ fontSize: 15, fontWeight: 600, color: "#031A4F", textDecoration: "none", letterSpacing: "-0.005em" }}>{l.text}</a>
                      : <div key={j} style={{ fontSize: 15, fontWeight: 600, color: "#031A4F", letterSpacing: "-0.005em" }}>{l.text}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ====== FOOTER ======
const Footer = () => {
  const c = window.CONTACT;
  return (
    <footer style={{ padding: "60px 5% 36px", background: "#031A4F", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="row-grid-3" style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 48,
          paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src="assets/brand-logo.svg" alt="" style={{ height: 44 }}/>
              <div>
                <div style={{ fontFamily: "Roboto", fontWeight: 900, fontSize: 16, color: "#fff" }}>АМИРБАЯР ХХК</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", color: "#FF6B70", marginTop: 3 }}>PPR ХООЛОЙ</div>
              </div>
            </div>
            <p style={{ lineHeight: 1.6, margin: 0, maxWidth: 360, color: "rgba(255,255,255,0.55)" }}>
              «BLUE OCEAN» компанийн гэрээт борлуулагч. EN ISO 15874:2013, DIN 8077;8078:2008 стандартын дагуу үйлдвэрлэсэн чанартай PPR бүтээгдэхүүн.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>Холбоо</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.phones.map(p => (
                <a key={p} href={`tel:+976${p.replace("-","")}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{p}</a>
              ))}
              <a href={`mailto:${c.email}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{c.email}</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>Хаяг</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, color: "rgba(255,255,255,0.7)" }}>
              <span>{c.address}</span>
              {c.web.map(w => (
                <a key={w} href={`https://${w}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{w}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
          <div>© 2026 Амирбаяр ХХК · Бүх эрх хуулиар хамгаалагдсан</div>
          <div style={{ fontFamily: "var(--ds-font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            ISO 9001:2008 · ISO 14001:2004 · EN ISO 15874:2013 · DIN 8077;8078:2008
          </div>
        </div>
      </div>
    </footer>
  );
};

// ====== APP ======
function App() {
  const onJump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar onJump={onJump}/>
      <Hero onJump={onJump}/>
      <About/>
      <Products/>
      <Contact/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
