// Cabinet Elshall — sections
const { useState, useEffect, useRef, useMemo } = React;

// ───────── helpers ─────────
function useInView(opts = { threshold: 0.18 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      opts
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, delay = 0, as: As = "div", className = "", style = {} }) {
  const [ref, seen] = useInView();
  return (
    <As
      ref={ref}
      className={`reveal ${seen ? "reveal-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

// ───────── NAV ─────────
function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "services", label: t.nav.services },
    { id: "approach", label: t.nav.approach },
    { id: "trust", label: t.nav.trust },
    { id: "verbatim", label: t.nav.verbatim },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Cabinet Elshall">
          <span className="brand-mark">AE</span>
          <span className="brand-name">
            <span>Abdallah&nbsp;Elshall</span>
            <span className="brand-sub">{lang === "ar" ? "مكتب محاماة" : "Law Firm"}</span>
          </span>
        </a>

        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-switch" role="tablist">
            {["fr", "en", "ar"].map((code) => (
              <button
                key={code}
                role="tab"
                aria-selected={lang === code}
                className={lang === code ? "on" : ""}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary nav-cta">
            {t.nav.cta}
            <Arrow />
          </a>
          <button className="hamb" aria-label="menu" onClick={() => setOpen((o) => !o)}>
            <span /> <span /> <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary">
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" className="arrow-icon">
      <path d="M2 7h10M7 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ───────── HERO ─────────
function Hero({ t, lang }) {
  const [sIdx, setSIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSIdx((i) => (i + 1) % t.hero.slogans.length), 3800);
    return () => clearInterval(id);
  }, [t]);

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-left">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              {t.hero.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={80} as="h1" className="hero-title">
            <span className="serif">{t.hero.name}</span>
          </Reveal>

          <Reveal delay={160} className="hero-sub">{t.hero.title}</Reveal>

          <Reveal delay={240} className="slogan-stage" aria-live="polite">
            {t.hero.slogans.map((s, i) => (
              <span key={i} className={`slogan ${i === sIdx ? "slogan-on" : ""}`}>
                {s}
              </span>
            ))}
          </Reveal>

          <Reveal delay={320} className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              {t.hero.ctaPrimary}
              <Arrow />
            </a>
            <a href="#services" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </Reveal>

          <Reveal delay={400} className="hero-meta">
            <div className="meta-line">
              <span className="meta-key">TEL</span>
              <a href={`tel:${t.hero.phone.replace(/\s+/g, "")}`}>{t.hero.phone}</a>
            </div>
            <div className="meta-line">
              <span className="meta-key">LOC</span>
              <a
                href="https://maps.google.com/?q=30.077291,31.311699"
                target="_blank"
                rel="noopener"
              >
                {t.hero.location}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hero-right">
          <PortraitCard t={t} />
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
        </div>
      </div>
    </section>
  );
}

function PortraitCard({ t }) {
  return (
    <div className="portrait-card">
      <div className="portrait-frame">
        <image-slot
          id="portrait-main"
          shape="rect"
          placeholder={t.locale === "ar" ? "ضع صورة الأستاذ هنا" : t.locale === "en" ? "Drop the lawyer's photo here" : "Glisser la photo de Maître Elshall"}
          style={{ width: "100%", height: "100%", display: "block" }}
        ></image-slot>
        <div className="portrait-corner tl" />
        <div className="portrait-corner tr" />
        <div className="portrait-corner bl" />
        <div className="portrait-corner br" />
      </div>

      <div className="portrait-meta">
        <div className="pm-row">
          <span className="mono">EST.</span>
          <span className="serif">MMXII</span>
        </div>
        <div className="pm-row">
          <span className="mono">BAR</span>
          <span>Cairo · Paris (associate)</span>
        </div>
        <div className="pm-row">
          <span className="mono">LANG</span>
          <span>عربي · Français · English</span>
        </div>
      </div>
    </div>
  );
}

// ───────── SERVICES ─────────
function Services({ t }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead kicker={t.services.kicker} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="tiers">
          {t.services.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 90} className={`tier ${tier.featured ? "tier-featured" : ""}`}>
              {tier.featured && <div className="tier-ribbon">★</div>}
              <div className="tier-head">
                <div className="tier-tag serif">{tier.tag}</div>
                <div className="tier-name serif">{tier.name}</div>
                <div className="tier-price mono">{tier.price}</div>
              </div>
              <div className="tier-tagline">{tier.tagline}</div>
              <p className="tier-desc">{tier.desc}</p>
              <ul className="tier-features">
                {tier.features.map((f, j) => (
                  <li key={j}>
                    <span className="bullet" aria-hidden="true">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${tier.featured ? "btn-primary" : "btn-ghost"} tier-cta`}>
                {t.nav.cta}
                <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── APPROACH ─────────
function Approach({ t }) {
  return (
    <section className="section section-dark" id="approach">
      <div className="container approach-grid">
        <div>
          <SectionHead kicker={t.approach.kicker} title={t.approach.title} align="start" />
          <Reveal delay={100} className="approach-body">{t.approach.body}</Reveal>
        </div>
        <div className="pillars">
          {t.approach.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 90} className="pillar">
              <div className="pillar-n mono">{p.n}</div>
              <div className="pillar-t serif">{p.t}</div>
              <div className="pillar-d">{p.d}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── TRUST (CLIENTS) ─────────
function Trust({ t }) {
  return (
    <section className="section" id="trust">
      <div className="container">
        <SectionHead kicker={t.trust.kicker} title={t.trust.title} subtitle={t.trust.subtitle} />
        <div className="clients">
          {t.trust.clients.map((c, i) => (
            <Reveal key={i} delay={i * 90} className="client-card">
              <div className="client-mark">
                <ClientGlyph name={c.name} mark={c.mark} />
              </div>
              <div className="client-meta">
                <div className="client-name serif">{c.name}</div>
                <div className="client-cat">{c.cat}</div>
                <div className="client-city mono">{c.city}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="trust-andmore mono">— {t.trust.andMore} —</div>
      </div>
    </section>
  );
}

// Bespoke typographic mark per client — original designs, no copyrighted assets reused
function ClientGlyph({ name, mark }) {
  if (name === "French Touch") {
    return (
      <div className="glyph glyph-img">
        <img src="assets/french-touch.webp" alt="French Touch" />
      </div>
    );
  }
  if (name === "Wahasian") {
    return (
      <div className="glyph glyph-img">
        <img src="assets/wahasian.png" alt="Wahasian" />
      </div>
    );
  }
  if (name === "Padel Prestige") {
    return (
      <svg viewBox="0 0 120 120" className="glyph">
        {/* shield outline */}
        <path d="M60 10 L100 22 L100 64 Q100 96 60 112 Q20 96 20 64 L20 22 Z"
              fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <path d="M60 18 L94 28 L94 64 Q94 92 60 105 Q26 92 26 64 L26 28 Z"
              fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
        {/* crossed padel rackets — geometric, original */}
        <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round">
          <ellipse cx="48" cy="50" rx="11" ry="13" transform="rotate(-30 48 50)" />
          <line x1="58" y1="60" x2="70" y2="78" transform="rotate(-30 48 50)" />
          <ellipse cx="72" cy="50" rx="11" ry="13" transform="rotate(30 72 50)" />
          <line x1="62" y1="60" x2="50" y2="78" transform="rotate(30 72 50)" />
        </g>
        {/* ball */}
        <circle cx="60" cy="58" r="3" fill="currentColor" />
        <text x="60" y="96" textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="11" fontWeight="600" fill="currentColor" letterSpacing="2">PADEL</text>
        <text x="60" y="107" textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="6.5" fill="currentColor" letterSpacing="3" opacity="0.7">PRESTIGE</text>
      </svg>
    );
  }
  // fallback monogram
  return (
    <svg viewBox="0 0 120 120" className="glyph">
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <text x="60" y="74" textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="44" fontStyle="italic" fill="currentColor">{mark}</text>
    </svg>
  );
}

// ───────── VERBATIM ─────────
function Verbatim({ t }) {
  const items = t.verbatim.items;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items]);

  return (
    <section className="section section-dark" id="verbatim">
      <div className="container">
        <SectionHead kicker={t.verbatim.kicker} title={t.verbatim.title} />

        <div className="verb-stage">
          <div className="verb-quote-mark serif" aria-hidden="true">"</div>
          <div className="verb-track">
            {items.map((it, idx) => (
              <blockquote key={idx} className={`verb ${idx === i ? "verb-on" : ""}`}>
                <p className="serif verb-q">{it.q}</p>
                <footer>
                  <span className="verb-a">{it.a}</span>
                  <span className="verb-sep">·</span>
                  <span className="verb-c mono">{it.c}</span>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="verb-dots" role="tablist">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-selected={idx === i}
                className={idx === i ? "on" : ""}
                onClick={() => setI(idx)}
                aria-label={`testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── CONTACT ─────────
function Contact({ t, lang }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", tier: "Classique", msg: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div className="contact-left">
          <SectionHead kicker={t.contact.kicker} title={t.contact.title} subtitle={t.contact.subtitle} align="start" />

          <div className="contact-cards">
            <a href={`tel:${t.hero.phone.replace(/\s+/g, "")}`} className="contact-card">
              <div className="cc-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <div>
                <div className="cc-label mono">{t.contact.callUs}</div>
                <div className="cc-value serif">{t.hero.phone}</div>
                <div className="cc-sub">{t.contact.callUsSub}</div>
              </div>
            </a>

            <a
              href="https://maps.google.com/?q=30.077291,31.311699"
              target="_blank"
              rel="noopener"
              className="contact-card"
            >
              <div className="cc-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </div>
              <div>
                <div className="cc-label mono">{t.contact.visitUs}</div>
                <div className="cc-value serif">{t.contact.visitUsSub}</div>
                <div className="cc-sub">{t.contact.mapLink} ↗</div>
              </div>
            </a>
          </div>

          <div className="contact-hours mono">{t.contact.hours}</div>

          <div className="map-frame">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=30.077291,31.311699&z=15&output=embed"
              loading="lazy"
            />
            <div className="map-tint" aria-hidden="true" />
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <label>
            <span className="mono">{t.contact.fName}</span>
            <input required value={form.name} onChange={set("name")} />
          </label>
          <label>
            <span className="mono">{t.contact.fEmail}</span>
            <input type="email" required value={form.email} onChange={set("email")} />
          </label>
          <label>
            <span className="mono">{t.contact.fCompany}</span>
            <input value={form.company} onChange={set("company")} />
          </label>
          <label>
            <span className="mono">{t.contact.fTier}</span>
            <select value={form.tier} onChange={set("tier")}>
              {t.services.tiers.map((tt) => (
                <option key={tt.name}>{tt.name}</option>
              ))}
            </select>
          </label>
          <label className="full">
            <span className="mono">{t.contact.fMessage}</span>
            <textarea rows={5} required value={form.msg} onChange={set("msg")} />
          </label>
          <button type="submit" className="btn btn-primary full">
            {t.contact.send} <Arrow />
          </button>
          <div className={`form-confirm ${sent ? "on" : ""}`}>{t.contact.sent}</div>
        </form>
      </div>
    </section>
  );
}

// ───────── FOOTER ─────────
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="brand">
            <span className="brand-mark">AE</span>
            <span className="brand-name">
              <span>Abdallah&nbsp;Elshall</span>
              <span className="brand-sub">{t.footer.tagline}</span>
            </span>
          </div>
        </div>
        <div className="footer-mid mono">
          <a href={`tel:${t.hero.phone.replace(/\s+/g, "")}`}>{t.hero.phone}</a>
          <span>·</span>
          <a href="https://maps.google.com/?q=30.077291,31.311699" target="_blank" rel="noopener">
            {t.hero.location}
          </a>
        </div>
        <div className="footer-right mono">
          <a href="#">{t.footer.conf}</a>
          <a href="#">{t.footer.mentions}</a>
        </div>
      </div>
      <div className="footer-bar mono">
        © {new Date().getFullYear()} Cabinet Abdallah Elshall · {t.footer.legal}
      </div>
    </footer>
  );
}

// ───────── SectionHead ─────────
function SectionHead({ kicker, title, subtitle, align = "center" }) {
  return (
    <header className={`section-head section-head-${align}`}>
      <Reveal className="kicker mono">
        <span className="kicker-line" />
        {kicker}
        <span className="kicker-line" />
      </Reveal>
      <Reveal delay={80} as="h2" className="section-title serif">
        {title}
      </Reveal>
      {subtitle && (
        <Reveal delay={160} className="section-sub">
          {subtitle}
        </Reveal>
      )}
    </header>
  );
}

Object.assign(window, {
  Nav,
  Hero,
  Services,
  Approach,
  Trust,
  Verbatim,
  Contact,
  Footer,
});
