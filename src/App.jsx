import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');`;

const T = {
  navy: "#0B1D2E", navyLight: "#132B42", navyMid: "#1A3652", slate: "#243B53",
  teal: "#00D4AA", tealDim: "#00B894", tealGlow: "rgba(0,212,170,0.12)", tealBorder: "rgba(0,212,170,0.25)",
  amber: "#F0A830", coral: "#FF6B6B", sky: "#5BA4E6",
  white: "#F0F4F8", ghost: "rgba(240,244,248,0.6)", ghostDim: "rgba(240,244,248,0.35)",
  border: "rgba(240,244,248,0.08)", borderLight: "rgba(240,244,248,0.14)",
  surface: "rgba(255,255,255,0.03)", surfaceHover: "rgba(255,255,255,0.06)",
  font: "'DM Sans', sans-serif", display: "'Fraunces', serif",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GlowOrb({ top, left, size = 400, color = T.teal, opacity = 0.04 }) {
  return <div style={{ position: "absolute", top, left, width: size, height: size, borderRadius: "50%", background: color, opacity, filter: `blur(${size/3}px)`, pointerEvents: "none" }} />;
}

// ─── Sections ───

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 0", transition: "all 0.3s", background: scrolled ? "rgba(11,29,46,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 600, fontFamily: T.display, color: T.teal }}>Deal</span>
          <span style={{ fontSize: 22, fontWeight: 300, color: T.white }}>Sync</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#how-it-works" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font, transition: "color 0.2s" }}>How it works</a>
          <a href="#pricing" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font }}>Pricing</a>
          <a href="#waitlist" style={{ padding: "9px 22px", borderRadius: 8, background: T.teal, color: T.navy, fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: T.font }}>Get early access</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "160px 32px 100px", textAlign: "center" }}>
      <GlowOrb top="-200px" left="10%" size={600} color={T.teal} opacity={0.05} />
      <GlowOrb top="100px" left="70%" size={500} color={T.sky} opacity={0.03} />

      <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: T.surface, border: `1px solid ${T.tealBorder}`, marginBottom: 28 }}>
            <span style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 0.5 }}>Built by a 25-year LO for LOs and Realtors</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{ fontSize: 56, fontWeight: 700, fontFamily: T.display, color: T.white, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
            Stop texting<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: T.teal }}>"What's the status?"</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: 19, color: T.ghost, lineHeight: 1.65, maxWidth: 580, margin: "0 auto 36px", fontWeight: 300 }}>
            DealSync is the shared deal room where Loan Officers and Realtors track deals together. One card. Two views. Zero guesswork.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <a href="#waitlist" style={{ padding: "14px 36px", borderRadius: 10, background: T.teal, color: T.navy, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: T.font, boxShadow: `0 0 40px ${T.tealGlow}, 0 4px 16px rgba(0,0,0,0.3)`, transition: "transform 0.2s" }}>
              Get early access — free
            </a>
            <a href="#how-it-works" style={{ padding: "14px 36px", borderRadius: 10, background: "transparent", border: `1px solid ${T.borderLight}`, color: T.ghost, fontSize: 15, fontWeight: 500, textDecoration: "none", fontFamily: T.font }}>
              See how it works
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p style={{ fontSize: 12, color: T.ghostDim, marginTop: 20 }}>Free for Realtors. Always.</p>
        </FadeIn>
      </div>
    </section>
  );
}

function PainPoints() {
  const pains = [
    { icon: "?", color: T.coral, title: "The black hole", desc: "A Realtor refers a buyer. The LO enters them into their CRM. The Realtor enters them into theirs. Neither system talks to the other." },
    { icon: "↻", color: T.amber, title: "Endless status checks", desc: '"Did the appraisal come in?" "Is the rate locked?" "When is CTC?" — the same questions, every deal, every week, via text.' },
    { icon: "✕", color: T.coral, title: "Dropped balls", desc: "A missed update leads to a missed deadline. The client gets frustrated. The referral relationship takes a hit." },
  ];

  return (
    <section style={{ padding: "80px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, color: T.coral, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The problem</p>
            <h2 style={{ fontSize: 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>Your CRM doesn't know<br />your partner exists</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {pains.map((p, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ padding: "32px 28px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.border}`, height: "100%" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 20, background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: T.white, marginBottom: 10, fontFamily: T.display }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: T.ghostDim, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01", title: "LO creates a deal", desc: "Enter the borrower, property, and loan details. It takes 30 seconds.",
      loView: ["Pre-approval: Approved", "Rate: 5.875% locked", "Appraisal: $700K received", "Conditional approval: Mar 25"],
      reView: null,
    },
    {
      num: "02", title: "Invite your Realtor", desc: "One click sends them an invite. They join for free — instantly see the deal card with real-time loan status.",
      loView: null,
      reView: ["Sales price: $685,000", "Under contract: Mar 5", "Home inspection: Passed", "Final walkthrough: Apr 10"],
    },
    {
      num: "03", title: "Both sides update. Both sides see.", desc: "The LO updates loan milestones. The Realtor updates property milestones. The activity feed logs everything automatically.",
      loView: ["Clear to Close!", "Wire instructions sent", "Closing confirmed Apr 15"],
      reView: ["Final walkthrough scheduled", "Closing date confirmed", "Keys ready for handoff"],
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: "100px 32px", position: "relative" }}>
      <GlowOrb top="0" left="-10%" size={500} color={T.teal} opacity={0.03} />
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontSize: 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>One deal card.<br />Two perspectives.</h2>
          </div>
        </FadeIn>

        {steps.map((step, i) => (
          <FadeIn key={i} delay={0.1}>
            <div style={{ display: "flex", gap: 48, alignItems: "flex-start", marginBottom: 64, flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}>
              {/* Text */}
              <div style={{ flex: 1, paddingTop: 20 }}>
                <span style={{ fontSize: 48, fontWeight: 700, fontFamily: T.display, color: T.teal, opacity: 0.2, lineHeight: 1 }}>{step.num}</span>
                <h3 style={{ fontSize: 26, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12, marginTop: -8 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: T.ghostDim, lineHeight: 1.65 }}>{step.desc}</p>
              </div>

              {/* Mini card mockup */}
              <div style={{ flex: 1 }}>
                <div style={{ borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}`, overflow: "hidden" }}>
                  {/* Card header */}
                  <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(135deg, ${T.navyMid}, ${T.navyLight})` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: T.white, fontFamily: T.display }}>David & Lisa Nakamura</div>
                        <div style={{ fontSize: 11, color: T.ghostDim }}>1545 Ala Wai Blvd #402, Honolulu</div>
                      </div>
                      <div style={{ padding: "4px 12px", borderRadius: 16, background: `${T.teal}18`, border: `1px solid ${T.teal}30`, fontSize: 12, color: T.teal, fontWeight: 500 }}>$685,000</div>
                    </div>
                  </div>

                  {/* Card body — show the relevant view */}
                  <div style={{ padding: "16px 20px" }}>
                    {(step.loView || step.reView) && (
                      <div style={{ display: "flex", gap: 16 }}>
                        {step.loView && (
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 9, color: T.sky, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>LO view</div>
                            {step.loView.map((item, j) => (
                              <div key={j} style={{ fontSize: 12, color: T.ghost, padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>{item}</div>
                            ))}
                          </div>
                        )}
                        {step.reView && (
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 9, color: T.amber, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Realtor view</div>
                            {step.reView.map((item, j) => (
                              <div key={j} style={{ fontSize: 12, color: T.ghost, padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>{item}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {step.num === "03" && (
                      <div>
                        <div style={{ fontSize: 9, color: T.ghostDim, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Activity feed</div>
                        {[
                          { icon: "★", color: T.teal, text: "Clear to Close!", who: "Jay Miller", time: "2h ago" },
                          { icon: "↑", color: T.sky, text: "Final walkthrough scheduled", who: "Will Campbell", time: "4h ago" },
                          { icon: "✎", color: T.amber, text: "Wire instructions sent to borrower", who: "Jay Miller", time: "Yesterday" },
                        ].map((a, j) => (
                          <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 0", borderBottom: j < 2 ? `1px solid ${T.border}` : "none" }}>
                            <div style={{ width: 22, height: 22, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, background: `${a.color}18`, color: a.color, flexShrink: 0, marginTop: 1 }}>{a.icon}</div>
                            <div>
                              <div style={{ fontSize: 12, color: T.white }}>{a.text}</div>
                              <div style={{ fontSize: 10, color: T.ghostDim }}>{a.who} · {a.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    { icon: "⚡", color: T.teal, title: "Zero learning curve", desc: "If you can read a text message, you can use DealSync. No training needed. No configuration required." },
    { icon: "⊕", color: T.sky, title: "Invite-to-join growth", desc: "LOs invite their Realtors. Realtors invite their other LOs. The network grows itself." },
    { icon: "◷", color: T.amber, title: "Real-time activity feed", desc: "Every update is logged automatically. No more asking. No more wondering. Just open the deal card." },
    { icon: "▤", color: T.ghost, title: "Role-based views", desc: "Each side sees exactly what they need. LOs see loan milestones. Realtors see property milestones. Both see the big picture." },
    { icon: "★", color: T.teal, title: "Partner scorecard", desc: "See which partnerships are closing deals and which need attention. Data-driven relationship management." },
    { icon: "✎", color: T.amber, title: "Private & shared notes", desc: "Keep internal notes private or share updates with your partner. You control the visibility." },
  ];

  return (
    <section style={{ padding: "80px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Why DealSync</p>
            <h2 style={{ fontSize: 36, fontWeight: 600, fontFamily: T.display, color: T.white }}>Not a CRM replacement.<br />The layer between them.</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {props.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, transition: "border-color 0.2s" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 16, background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>{p.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Realtor Partner", price: "Free", period: "forever", color: T.amber, highlight: false,
      desc: "For Real Estate Agents invited by their LO partners.",
      features: ["Unlimited shared deals", "Real-time loan status updates", "Activity feed & notifications", "Mobile app access", "Add notes & updates"],
    },
    {
      name: "Solo LO", price: "$49", period: "/month", color: T.teal, highlight: true,
      desc: "For independent originators who want to strengthen every Realtor relationship.",
      features: ["Everything in Free", "Unlimited partner invites", "Unlimited active deals", "Partner scorecard & analytics", "Priority support", "14-day free trial"],
    },
    {
      name: "Mortgage Team", price: "$129", period: "/month", color: T.sky, highlight: false,
      desc: "For small LO teams who share Realtor networks.",
      features: ["Everything in Solo", "Up to 5 LO seats", "Team-level reporting", "Shared partner networks", "Lead routing between LOs"],
    },
  ];

  return (
    <section id="pricing" style={{ padding: "100px 32px", position: "relative" }}>
      <GlowOrb top="-100px" left="50%" size={600} color={T.teal} opacity={0.03} />
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: 36, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12 }}>Less than the cost of<br />taking a Realtor to lunch</h2>
            <p style={{ fontSize: 15, color: T.ghostDim }}>LOs pay. Realtors are always free.</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {tiers.map((tier, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "32px 28px", borderRadius: 14,
                background: tier.highlight ? `linear-gradient(160deg, ${T.navyMid}, ${T.navyLight})` : T.navyLight,
                border: `1px solid ${tier.highlight ? T.tealBorder : T.border}`,
                position: "relative", overflow: "hidden",
              }}>
                {tier.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.teal}, ${T.tealDim})` }} />}

                <div style={{ fontSize: 13, fontWeight: 600, color: tier.color, marginBottom: 4, letterSpacing: 0.3 }}>{tier.name}</div>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 42, fontWeight: 700, fontFamily: T.display, color: T.white }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: T.ghostDim, marginLeft: 2 }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.5, marginBottom: 24, minHeight: 40 }}>{tier.desc}</p>

                <div style={{ marginBottom: 24 }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 13, color: T.ghost }}>
                      <span style={{ color: tier.color, fontSize: 11, flexShrink: 0 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <a href="#waitlist" style={{
                  display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, textDecoration: "none", fontFamily: T.font, fontSize: 13, fontWeight: 600,
                  background: tier.highlight ? T.teal : "transparent",
                  color: tier.highlight ? T.navy : T.teal,
                  border: tier.highlight ? "none" : `1px solid ${T.tealBorder}`,
                }}>
                  {tier.price === "Free" ? "Join when invited" : "Start free trial"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontSize: 13, color: T.ghostDim }}>Need 10+ seats? <span style={{ color: T.teal, cursor: "pointer" }}>Contact us for Branch pricing</span></p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ padding: "40px 36px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}`, position: "relative" }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 1, background: `linear-gradient(90deg, transparent, ${T.tealBorder}, transparent)` }} />
            <div style={{ fontSize: 28, fontFamily: T.display, fontWeight: 300, fontStyle: "italic", color: T.ghost, lineHeight: 1.5, marginBottom: 24 }}>
              "I built DealSync because I was tired of the same text every week from my Realtor partners: <span style={{ color: T.teal, fontWeight: 400 }}>What's the status on the Smith file?</span> Now they just check the app."
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, ${T.navyMid}, ${T.slate})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: T.teal, border: `1px solid ${T.border}` }}>JM</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.white }}>Jay Miller</div>
                <div style={{ fontSize: 12, color: T.ghostDim }}>Sales Manager & Mortgage Loan Consultant · NMLS# 657301</div>
                <div style={{ fontSize: 12, color: T.ghostDim }}>25 years in the mortgage industry · Honolulu, HI</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("lo");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // In production, POST to your waitlist endpoint or Mailchimp
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="waitlist" style={{ padding: "100px 32px", position: "relative" }}>
      <GlowOrb top="-100px" left="30%" size={500} color={T.teal} opacity={0.04} />
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Early access</p>
          <h2 style={{ fontSize: 36, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12 }}>Be first in the deal room</h2>
          <p style={{ fontSize: 15, color: T.ghostDim, marginBottom: 36, lineHeight: 1.6 }}>We're onboarding LOs and Realtors in Honolulu first, then expanding nationwide. Join the waitlist and we'll reach out when it's your turn.</p>
        </FadeIn>

        <FadeIn delay={0.15}>
          {submitted ? (
            <div style={{ padding: "36px 28px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.tealBorder}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>★</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: T.teal, marginBottom: 8, fontFamily: T.display }}>You're on the list</div>
              <div style={{ fontSize: 14, color: T.ghostDim }}>We'll be in touch soon. Aloha!</div>
            </div>
          ) : (
            <div style={{ padding: "32px 28px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}` }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {["lo", "realtor"].map(r => (
                    <button key={r} type="button" onClick={() => setRole(r)} style={{
                      flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: T.font, cursor: "pointer", transition: "all 0.2s",
                      background: role === r ? T.surface : "transparent",
                      border: `1px solid ${role === r ? T.tealBorder : T.border}`,
                      color: role === r ? T.teal : T.ghostDim,
                    }}>
                      {r === "lo" ? "I'm a Loan Officer" : "I'm a Realtor"}
                    </button>
                  ))}
                </div>

                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required style={{
                  width: "100%", padding: "14px 16px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: T.surface, color: T.white, fontSize: 15, fontFamily: T.font, outline: "none", boxSizing: "border-box", marginBottom: 12,
                }} />

                <button type="submit" disabled={loading} style={{
                  width: "100%", padding: "14px 0", borderRadius: 8, border: "none", background: T.teal, color: T.navy, fontSize: 15, fontWeight: 600, cursor: loading ? "default" : "pointer", fontFamily: T.font,
                  boxShadow: `0 0 40px ${T.tealGlow}`,
                }}>
                  {loading ? "Joining..." : "Join the waitlist"}
                </button>

                <p style={{ fontSize: 11, color: T.ghostDim, marginTop: 12 }}>No spam. No credit card. Just early access.</p>
              </form>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "40px 32px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 600, fontFamily: T.display, color: T.teal }}>Deal</span>
          <span style={{ fontSize: 16, fontWeight: 300, color: T.ghost }}>Sync</span>
          <span style={{ fontSize: 12, color: T.ghostDim, marginLeft: 16 }}>The collaborative deal room for LOs and Realtors</span>
        </div>
        <div style={{ fontSize: 12, color: T.ghostDim }}>
          © 2026 DealSync.me · Built in Honolulu, HI
        </div>
      </div>
    </footer>
  );
}


// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════

export default function LandingPage() {
  return (
    <div style={{ fontFamily: T.font, background: T.navy, color: T.white, minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{FONTS}{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: ${T.ghostDim}; }
        a:hover { opacity: 0.9; }
      `}</style>

      <Nav />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ValueProps />
      <Pricing />
      <FounderSection />
      <Waitlist />
      <Footer />
    </div>
  );
}
