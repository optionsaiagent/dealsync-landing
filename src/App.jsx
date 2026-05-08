import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

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

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const m = useIsMobile();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: m ? "12px 0" : "16px 0", transition: "all 0.3s", background: scrolled ? "rgba(11,29,46,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: m ? "0 16px" : "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontSize: m ? 18 : 22, fontWeight: 600, fontFamily: T.display, color: T.teal }}>Deal</span>
          <span style={{ fontSize: m ? 18 : 22, fontWeight: 300, color: T.white }}>Sync</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: m ? 12 : 28 }}>
          {!m && <>
            <a href="#problem" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font }}>The problem</a>
            <a href="#how-it-works" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font }}>How it works</a>
            <a href="#pricing" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font }}>Pricing</a>
          </>}
          <a href="https://app.dealsync.me" style={{ fontSize: 13, color: T.ghostDim, textDecoration: "none", fontFamily: T.font }}>Log in</a>
          <a href="https://app.dealsync.me" style={{ padding: m ? "7px 16px" : "9px 22px", borderRadius: 8, background: T.teal, color: T.navy, fontSize: m ? 12 : 13, fontWeight: 600, textDecoration: "none", fontFamily: T.font }}>Start free trial</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const m = useIsMobile();
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: m ? "120px 20px 60px" : "160px 32px 100px", textAlign: "center" }}>
      <GlowOrb top="-200px" left="10%" size={m ? 300 : 600} color={T.teal} opacity={0.05} />
      <GlowOrb top="100px" left="70%" size={m ? 250 : 500} color={T.sky} opacity={0.03} />
      <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: T.surface, border: `1px solid ${T.tealBorder}`, marginBottom: m ? 20 : 28 }}>
            <span style={{ fontSize: m ? 11 : 12, color: T.teal, fontWeight: 500, letterSpacing: 0.5 }}>Built by a 25-year LO for LOs and Realtors</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 style={{ fontSize: m ? 32 : 54, fontWeight: 700, fontFamily: T.display, color: T.white, lineHeight: 1.1, marginBottom: m ? 16 : 20, letterSpacing: -1 }}>
            Every referral deserves{m ? " " : <br />}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: T.teal }}>a deal room, not a dead end</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: m ? 15 : 19, color: T.ghost, lineHeight: 1.65, maxWidth: 640, margin: "0 auto 36px", fontWeight: 300 }}>
            DealSync is the shared deal room where Loan Officers and Realtors track every lead from first conversation to closing day. AI captures your calls, drafts your follow-ups, and shares a live status page with your borrower — so nothing slips and you close more.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: m ? 10 : 14, flexDirection: m ? "column" : "row", alignItems: "center" }}>
            <a href="https://app.dealsync.me" style={{ padding: m ? "12px 28px" : "14px 36px", borderRadius: 10, background: T.teal, color: T.navy, fontSize: m ? 14 : 15, fontWeight: 600, textDecoration: "none", fontFamily: T.font, boxShadow: `0 0 40px ${T.tealGlow}, 0 4px 16px rgba(0,0,0,0.3)`, width: m ? "100%" : "auto", textAlign: "center" }}>
              Start your 30-day free trial
            </a>
            <a href="#how-it-works" style={{ padding: m ? "12px 28px" : "14px 36px", borderRadius: 10, background: "transparent", border: `1px solid ${T.borderLight}`, color: T.ghost, fontSize: m ? 14 : 15, fontWeight: 500, textDecoration: "none", fontFamily: T.font, width: m ? "100%" : "auto", textAlign: "center" }}>
              See how it works
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.5}>
          <p style={{ fontSize: 12, color: T.ghostDim, marginTop: 20 }}>No credit card required · Free for Realtors, always</p>
        </FadeIn>
      </div>
    </section>
  );
}

function PainPoints() {
  const m = useIsMobile();
  const pains = [
    { icon: "?", color: T.coral, title: "The referral black hole", desc: "A Realtor refers a buyer to an LO. They have a great phone call. But the buyer isn't ready to apply yet. Three weeks later, nobody remembers what was discussed — and the lead goes cold." },
    { icon: "↻", color: T.amber, title: "Follow-ups fall through the cracks", desc: "That buyer who said 'call me in 60 days'? Without a shared system, it's a sticky note on a monitor. By the time someone follows up, the buyer already talked to another lender." },
    { icon: "✕", color: T.coral, title: "Conversations disappear", desc: "The LO had a detailed call about the buyer's DTI concerns, their VA eligibility, their timeline. None of it was captured where the Realtor can see it. So the Realtor is flying blind." },
    { icon: "◷", color: T.amber, title: "Status checks never end", desc: "Once a deal is in escrow, it's 'What's the status on the Smith file?' every week — by text, by call, by email. Neither side has a single place to look." },
  ];

  return (
    <section id="problem" style={{ padding: m ? "60px 20px" : "80px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.coral, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The problem</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>
              You're not losing deals at closing.{m ? " " : <br />}
              <span style={{ color: T.ghost, fontWeight: 400 }}>You're losing them at "I'm not ready yet."</span>
            </h2>
            <p style={{ fontSize: m ? 14 : 15, color: T.ghostDim, marginTop: 16, maxWidth: 640, margin: "16px auto 0", lineHeight: 1.6 }}>
              Most LO-Realtor tools focus on the escrow phase. But the biggest leakage in your pipeline happens before a buyer ever fills out an application — in the weeks and months between first contact and "I'm ready to move forward."
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
          {pains.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ padding: "28px 24px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.border}`, height: "100%" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 16, background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>{p.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: T.white, marginBottom: 8, fontFamily: T.display }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: T.ghostDim, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversionImpact() {
  const m = useIsMobile();
  const stats = [
    { value: "80%", label: "of mortgage leads require nurturing before making a decision", source: "Mortgage Bankers Association", color: T.coral },
    { value: "70%", label: "of homebuyers only interview one agent before deciding to work with them", source: "National Association of Realtors", color: T.teal },
    { value: "5+", label: "follow-up contacts needed to close — yet 44% of agents stop after one", source: "National Sales Executive Association / Inman", color: T.amber },
  ];

  return (
    <section style={{ padding: m ? "40px 20px" : "60px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ padding: m ? "24px 20px" : "36px 40px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}` }}>
            <div style={{ textAlign: "center", marginBottom: m ? 20 : 32 }}>
              <h2 style={{ fontSize: m ? 20 : 26, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 8 }}>The follow-up gap is where deals die</h2>
              <p style={{ fontSize: m ? 13 : 14, color: T.ghostDim, lineHeight: 1.6 }}>When LOs and Realtors don't have shared visibility, leads slip through the cracks between "interested" and "ready."</p>
            </div>
            <div style={{ display: "flex", gap: m ? 12 : 24, flexDirection: m ? "column" : "row" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: "20px 16px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 36, fontWeight: 700, fontFamily: T.display, color: s.color, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.ghostDim, lineHeight: 1.5, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: T.ghostDim, opacity: 0.6, fontStyle: "italic" }}>— {s.source}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FullJourney() {
  const m = useIsMobile();
  const stages = [
    { num: "01", label: "Referral", color: T.sky, title: "Capture the lead in seconds", desc: "Get a referral from your Realtor partner — or a phone call from a buyer. Click + New deal, or paste your call transcript and let DealSync's AI extract every detail into a shared deal card. Both sides see it instantly.", mockItems: [
      { text: "Lead source: Agent referral — Will Campbell", color: T.sky },
      { text: "Imported from Plaud transcript · Apr 10", color: T.ghostDim },
      { text: "AI extracted: VA eligible · Kapolei/Ewa · 2–3 mo timeline", color: T.amber },
      { text: "Stage: Nurture · Next follow-up: May 15", color: T.teal },
    ]},
    { num: "02", label: "Nurture", color: T.amber, title: "Nobody gets forgotten", desc: "The buyer isn't ready yet — and that's fine. DealSync's daily 7am follow-up digest emails you every overdue lead, and the AI Coach reads your notes and drafts the exact message to send. No more sticky-note follow-ups.", mockItems: [
      { text: "✦ Coach: Ghosting after 3 attempts — switch to text", color: T.coral },
      { text: "Daily digest sent: 4 leads need follow-up today", color: T.amber },
      { text: "Realtor note: Showing Kapolei listings to keep engagement", color: T.sky },
      { text: "Status: Nurturing · LO follow-up scheduled May 15", color: T.teal },
    ]},
    { num: "03", label: "Pre-approval", color: T.teal, title: "They're ready — and you're prepared", desc: "When the buyer says \"let's do this,\" every conversation is already documented. Pre-approval moves faster because the groundwork was laid during nurture. Generate a Borrower Portal link with one click — your client sees a live status page on their phone.", mockItems: [
      { text: "Pre-approved: $725,000 · VA 30yr Fixed", color: T.teal },
      { text: "Pre-approval rate: 5.875% (not locked)", color: T.sky },
      { text: "Borrower portal: Sent · Viewed 12 min ago ●", color: T.amber },
      { text: "Realtor notified: Showings can begin", color: T.teal },
    ]},
    { num: "04", label: "Under contract → Close", color: T.teal, title: "Track every contract deadline", desc: "Loan contingency deadline, appraisal-at-value, conditional loan approval, clear-to-close. DealSync tracks all of it on one card with role-aware visibility. The borrower sees a beautiful status page. The Realtor stops asking \"any update?\" Everyone wins.", mockItems: [
      { text: "Contract accepted: Apr 22", color: T.sky },
      { text: "Loan contingency due: May 12 · 4 days", color: T.amber },
      { text: "Appraisal: $735K (at value ✓)", color: T.teal },
      { text: "Clear to close · Signing scheduled May 19", color: T.teal },
    ]},
  ];

  return (
    <section id="how-it-works" style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="0" left="-10%" size={m ? 250 : 500} color={T.teal} opacity={0.03} />
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 64 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The full journey</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>From first conversation{m ? " " : <br />}to closing day</h2>
            <p style={{ fontSize: m ? 14 : 15, color: T.ghostDim, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.6 }}>DealSync doesn't start at escrow. It starts the moment a lead enters your world — and stays with them until they get their keys.</p>
          </div>
        </FadeIn>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: m ? 32 : 56, flexWrap: m ? "wrap" : "nowrap" }}>
          {stages.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ padding: m ? "6px 14px" : "8px 20px", borderRadius: 20, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: m ? 10 : 11, fontWeight: 600, color: s.color }}>{s.num}</span>
                  <span style={{ fontSize: m ? 11 : 12, fontWeight: 500, color: s.color }}>{s.label}</span>
                </div>
                {i < stages.length - 1 && !m && <div style={{ width: 24, height: 1, background: T.border }} />}
              </div>
            </FadeIn>
          ))}
        </div>
        {stages.map((stage, i) => (
          <FadeIn key={i} delay={0.1}>
            <div style={{ display: "flex", gap: m ? 20 : 48, alignItems: "flex-start", marginBottom: m ? 36 : 56, flexDirection: m ? "column" : (i % 2 === 1 ? "row-reverse" : "row") }}>
              <div style={{ flex: 1, paddingTop: m ? 0 : 12 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: 16, background: `${stage.color}12`, border: `1px solid ${stage.color}25`, marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: stage.color }}>{stage.num}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: stage.color }}>{stage.label}</span>
                </div>
                <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12 }}>{stage.title}</h3>
                <p style={{ fontSize: m ? 14 : 15, color: T.ghostDim, lineHeight: 1.7 }}>{stage.desc}</p>
              </div>
              <div style={{ flex: 1, width: m ? "100%" : "auto" }}>
                <div style={{ borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}`, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(135deg, ${T.navyMid}, ${T.navyLight})` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: T.display }}>Michael & Angela Torres</div>
                        <div style={{ fontSize: 11, color: T.ghostDim }}>Kapolei, HI · VA Purchase</div>
                      </div>
                      <div style={{ padding: "3px 10px", borderRadius: 12, background: `${stage.color}18`, border: `1px solid ${stage.color}30`, fontSize: 11, color: stage.color, fontWeight: 500 }}>{stage.label}</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    {stage.mockItems.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: j < stage.mockItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: item.color === T.ghostDim ? T.ghost : item.color }}>{item.text}</span>
                      </div>
                    ))}
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

function ConversationIntel() {
  const m = useIsMobile();
  return (
    <section style={{ padding: m ? "60px 20px" : "80px 32px", position: "relative" }}>
      <GlowOrb top="-50px" left="60%" size={m ? 200 : 400} color={T.amber} opacity={0.03} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: m ? 24 : 40, alignItems: "center", flexDirection: m ? "column" : "row" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 16, background: `${T.teal}12`, border: `1px solid ${T.tealBorder}`, marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.teal }}>Live now</span>
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.3, marginBottom: 14 }}>
                Every conversation,<br />captured by AI
              </h2>
              <p style={{ fontSize: 15, color: T.ghostDim, lineHeight: 1.7, marginBottom: 20 }}>
                You had a 20-minute call with a buyer about VA eligibility, DTI concerns, and a July timeline. Instead of that conversation living in your head, paste the transcript from <strong style={{ color: T.amber }}>Plaud, Otter, voice memo, or your own notes</strong> into DealSync. AI extracts the borrower's info, action items, concerns, and timeline into a fresh deal card in 10 seconds.
              </p>
              <p style={{ fontSize: 15, color: T.ghostDim, lineHeight: 1.7 }}>
                When that buyer calls back in 8 weeks, both you and your Realtor partner see exactly what was discussed and what the next steps are. No memory gaps. No starting over.
              </p>
            </div>
            <div style={{ flex: 0.85 }}>
              <div style={{ borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}`, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${T.amber}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.amber }}>◷</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: T.white }}>Call summary — Apr 10, 2026</div>
                    <div style={{ fontSize: 10, color: T.ghostDim }}>Jay Miller with Michael Torres · 18 min</div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  {[
                    { label: "VA eligibility", text: "Confirmed — COE available. 10 years active duty Army." },
                    { label: "Timeline", text: "Lease expires July 31. Wants to close by mid-July." },
                    { label: "Budget concern", text: "DTI at 44% with car loan. Payoff in May brings it to 38%." },
                    { label: "Next steps", text: "Follow up May 15 after car payoff. Send VA benefit overview." },
                    { label: "Property interest", text: "Kapolei/Ewa Beach. SFR preferred. $800K-$900K range." },
                  ].map((item, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, color: T.amber, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: T.ghost, lineHeight: 1.5 }}>{item.text}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 16px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: T.ghostDim }}>Visible to: LO and Realtor</span>
                  <span style={{ fontSize: 10, color: T.teal }}>Attached to deal card</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function AICoach() {
  const m = useIsMobile();
  return (
    <section style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="0" left="-10%" size={m ? 250 : 500} color={T.teal} opacity={0.04} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The AI advantage</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>
              Your AI sales coach,{m ? " " : <br />}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: T.teal }}>on every deal</span>
            </h2>
            <p style={{ fontSize: m ? 14 : 16, color: T.ghostDim, marginTop: 16, maxWidth: 660, margin: "16px auto 0", lineHeight: 1.65 }}>
              Click <strong style={{ color: T.teal }}>Coach me</strong> on any deal. DealSync reads your notes, classifies the lead's engagement, and drafts the exact message to send — copy, paste, send. Stop wondering what to say. Start closing.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: m ? 20 : 48, alignItems: "center", flexDirection: m ? "column" : "row" }}>
          {/* Left side: feature breakdown */}
          <div style={{ flex: 1 }}>
            {[
              { color: T.coral, label: "Ghosting", desc: "3 follow-ups, no response. Coach drafts a low-pressure exit-ramp message." },
              { color: T.amber, label: "Hesitant", desc: "Borrower expressed concerns. Coach addresses the specific blocker first." },
              { color: T.teal, label: "Engaged", desc: "Active dialogue. Coach drafts the next direct ask — apply, send docs, lock rate." },
              { color: T.sky, label: "Cold lead", desc: "Pre-approved 60+ days ago, gone quiet. Coach pivots to value-first re-engagement." },
              { color: T.ghostDim, label: "New", desc: "First contact captured. Coach opens dialogue with a qualifying question." },
            ].map((row, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ flexShrink: 0, padding: "3px 10px", borderRadius: 10, background: `${row.color}22`, border: `1px solid ${row.color}55`, fontSize: 10, fontWeight: 700, color: row.color, letterSpacing: 0.5, textTransform: "uppercase", minWidth: 80, textAlign: "center" }}>{row.label}</div>
                  <div style={{ fontSize: m ? 13 : 14, color: T.ghost, lineHeight: 1.55 }}>{row.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          {/* Right side: mocked Coach modal */}
          <div style={{ flex: 1, width: m ? "100%" : "auto" }}>
            <FadeIn delay={0.2}>
              <div style={{ borderRadius: 14, background: T.navyLight, border: `1px solid ${T.tealBorder}`, overflow: "hidden", boxShadow: `0 0 60px ${T.tealGlow}` }}>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(135deg, ${T.surface}, ${T.navyLight})` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.teal, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>✦ AI Coach</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.white, fontFamily: T.display }}>Next move on Nolan Benton</div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    <span style={{ padding: "3px 10px", borderRadius: 10, background: `${T.coral}22`, border: `1px solid ${T.coral}55`, fontSize: 10, fontWeight: 700, color: T.coral, letterSpacing: 0.5, textTransform: "uppercase" }}>High urgency</span>
                    <span style={{ padding: "3px 10px", borderRadius: 10, background: `${T.coral}22`, border: `1px solid ${T.coral}55`, fontSize: 10, fontWeight: 700, color: T.coral, letterSpacing: 0.5, textTransform: "uppercase" }}>Ghosting</span>
                  </div>
                  <div style={{ fontSize: 10, color: T.ghostDim, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Where this deal is</div>
                  <div style={{ fontSize: 13, color: T.ghost, lineHeight: 1.55, marginBottom: 14 }}>You've sent 2 emails since April 22. No response. Will mentioned Nolan was ready to talk about VA financing — but the silence on direct outreach suggests timing isn't right yet.</div>
                  <div style={{ padding: "12px 14px", borderRadius: 8, background: `${T.teal}10`, border: `1px solid ${T.tealBorder}`, marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: T.teal, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Recommended next move</div>
                    <div style={{ fontSize: 13, color: T.white, fontWeight: 500, lineHeight: 1.55 }}>Switch to text. Acknowledge the silence and offer an explicit exit ramp. If still no response in 3–5 days, move to long-term nurture.</div>
                  </div>
                  <div style={{ fontSize: 10, color: T.amber, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Draft message</div>
                  <div style={{ padding: "10px 12px", borderRadius: 8, background: T.surface, border: `1px solid ${T.amber}30`, fontSize: 12, color: T.ghost, lineHeight: 1.55, fontFamily: T.font }}>
                    Hi Nolan — Will mentioned you may be looking at VA financing. I sent an email last week but wanted to reach out directly. If the timing isn't right yet, no worries at all — just let me know and I'll circle back later this year.
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <span style={{ padding: "5px 12px", borderRadius: 5, background: T.teal, color: T.navy, fontSize: 11, fontWeight: 700, fontFamily: T.font }}>Copy to clipboard</span>
                    <span style={{ padding: "5px 12px", borderRadius: 5, border: `1px solid ${T.border}`, color: T.ghostDim, fontSize: 11, fontFamily: T.font }}>Save as note</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: m ? 32 : 48, fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>
            <strong style={{ color: T.teal }}>Plus:</strong> a Monday morning briefing email with the top 3 deals that need your move this week — AI-drafted, ready to send.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BorrowerPortalShowcase() {
  const m = useIsMobile();
  return (
    <section style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="-100px" left="60%" size={m ? 250 : 500} color={T.amber} opacity={0.03} />
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.amber, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Borrower portal</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>
              Stop answering "any update?"{m ? " " : <br />}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: T.amber }}>your borrower self-serves</span>
            </h2>
            <p style={{ fontSize: m ? 14 : 16, color: T.ghostDim, marginTop: 16, maxWidth: 660, margin: "16px auto 0", lineHeight: 1.65 }}>
              One click generates a beautiful status page for the borrower. Send the link by text or email. They watch their loan progress in real time — appraisal at value, conditional approval, clear to close, funded. The LO and Realtor each get back hours every week.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: m ? 20 : 40, alignItems: "center", flexDirection: m ? "column" : "row" }}>
            {/* Mock portal preview */}
            <div style={{ flex: 1, width: m ? "100%" : "auto" }}>
              <div style={{ borderRadius: 14, background: "#F7F8FA", border: `1px solid #E5E9F0`, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
                <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #E5E9F0" }}>
                  <div style={{ fontSize: 10, color: "#5C6B7A", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>Your loan progress</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#0B1D2E", fontFamily: T.display }}>Hi Sarah,</div>
                  <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 14, background: "rgba(0,168,139,0.1)", border: "1px solid rgba(0,168,139,0.3)", marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: "#00A88B", fontWeight: 600 }}>Conditionally Approved</span>
                  </div>
                </div>
                <div style={{ padding: "18px 22px", borderBottom: "1px solid #E5E9F0" }}>
                  <div style={{ fontSize: 10, color: "#5C6B7A", letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Where you are</div>
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                    <div style={{ position: "absolute", top: 11, left: "8%", right: "8%", height: 2, background: "#E5E9F0" }} />
                    <div style={{ position: "absolute", top: 11, left: "8%", height: 2, background: "#00A88B", width: "50%" }} />
                    {["Pre-Approved", "Under Contract", "Appraisal In", "CLA", "Clear to Close", "Funded"].map((label, i) => {
                      const reached = i <= 3;
                      return (
                        <div key={i} style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 2 }}>
                          <div style={{ width: 22, height: 22, margin: "0 auto", borderRadius: "50%", background: reached ? "#00A88B" : "#FFFFFF", border: `2px solid ${reached ? "#00A88B" : "#E5E9F0"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
                            {reached ? "✓" : ""}
                          </div>
                          <div style={{ fontSize: 9, color: reached ? "#0B1D2E" : "#5C6B7A", marginTop: 6, fontWeight: reached ? 600 : 400, lineHeight: 1.2 }}>{label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ padding: "16px 22px", background: "rgba(0,168,139,0.06)", borderBottom: "1px solid #E5E9F0" }}>
                  <div style={{ fontSize: 10, color: "#00A88B", letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>What's next</div>
                  <div style={{ fontSize: 13, color: "#0B1D2E", lineHeight: 1.55 }}>Your loan has conditional approval. We're working through final conditions to clear you for closing.</div>
                </div>
                <div style={{ padding: "14px 22px", background: "rgba(5,150,105,0.08)" }}>
                  <div style={{ fontSize: 10, color: "#059669", letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Appraisal</div>
                  <div style={{ fontSize: 12, color: "#0B1D2E" }}>✓ Received Apr 24 — $735,000 (at contract value)</div>
                </div>
              </div>
            </div>
            {/* Right: bullets */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: `${T.amber}18`, border: `1px solid ${T.amber}40`, display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, fontSize: 14, fontWeight: 700 }}>★</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 4, fontFamily: T.display }}>One click. One link.</div>
                    <div style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>LOs generate the link from any deal. Realtors share it with their buyer in seconds.</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: `${T.amber}18`, border: `1px solid ${T.amber}40`, display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, fontSize: 14, fontWeight: 700 }}>◐</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 4, fontFamily: T.display }}>Live status, plain English</div>
                    <div style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>Status pill, milestone timeline, key dates, and a "what's next" sentence. Borrower-friendly language — no jargon, no LO-internal numbers.</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: `${T.amber}18`, border: `1px solid ${T.amber}40`, display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, fontSize: 14, fontWeight: 700 }}>$</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 4, fontFamily: T.display }}>Appraisal-at-value alerts</div>
                    <div style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>Smart display compares appraised value to contract price. Borrower sees green when at value, an honest warning when below — no surprise calls.</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: `${T.amber}18`, border: `1px solid ${T.amber}40`, display: "flex", alignItems: "center", justifyContent: "center", color: T.amber, fontSize: 14, fontWeight: 700 }}>●</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.white, marginBottom: 4, fontFamily: T.display }}>You see when they look</div>
                    <div style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.6 }}>"Viewed 12 min ago" engagement signal in your dashboard. Know exactly when your borrower is paying attention.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function DailyLoop() {
  const m = useIsMobile();
  const panels = [
    { time: "7:00 AM", title: "Daily follow-up digest", color: T.amber, body: "Coffee in hand, you scan a single email: every overdue follow-up + every lead due today. No more sticky notes, no more spreadsheet hunts." },
    { time: "Throughout the day", title: "Coach me", color: T.teal, body: "Click on any deal that's stuck. AI reads your notes, classifies the engagement, and drafts the message. Copy, paste, send. 30 seconds vs 10 minutes." },
    { time: "Sunday night", title: "Monday briefing email", color: T.sky, body: "Your week ahead: 3 deals with AI-drafted next moves, plus the pipeline summary. Hit the ground running Monday morning." },
  ];
  return (
    <section style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative", background: T.navyLight }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The daily loop</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2 }}>
              Why LOs open DealSync{m ? " " : <br />}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: T.teal }}>every single day</span>
            </h2>
            <p style={{ fontSize: m ? 14 : 16, color: T.ghostDim, marginTop: 16, maxWidth: 580, margin: "16px auto 0", lineHeight: 1.65 }}>
              DealSync isn't another login that gets ignored. It pushes the right things to you at the right time — so opening the app actually moves your pipeline forward.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {panels.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 14, background: T.surface, border: `1px solid ${p.color}30`, height: "100%" }}>
                <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 10, background: `${p.color}18`, border: `1px solid ${p.color}40`, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, color: p.color, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{p.time}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: T.white, marginBottom: 10, fontFamily: T.display }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: T.ghostDim, lineHeight: 1.65 }}>{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForRealtors() {
  const m = useIsMobile();
  return (
    <section style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="-50px" left="20%" size={m ? 250 : 500} color={T.amber} opacity={0.04} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ padding: m ? "32px 24px" : "48px 48px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.amber}30` }}>
            <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 16, background: `${T.amber}15`, border: `1px solid ${T.amber}40`, marginBottom: 18 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.amber, letterSpacing: 0.5, textTransform: "uppercase" }}>For Realtors</span>
            </div>
            <h2 style={{ fontSize: m ? 24 : 32, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2, marginBottom: 14 }}>
              Your LO partner's tool.{m ? " " : <br />}
              <span style={{ color: T.amber }}>Free, forever, for you.</span>
            </h2>
            <p style={{ fontSize: m ? 14 : 16, color: T.ghost, lineHeight: 1.65, marginBottom: 28 }}>
              When your LO partner invites you to DealSync, you get a real-time view into every deal you've referred them. No more "any update?" texts. No more wondering where things stand. And one feature that turns you into the most-organized agent your buyer's ever worked with: <strong style={{ color: T.amber }}>send your buyer a live status link.</strong>
            </p>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 14 }}>
              {[
                { title: "What's next on every deal", desc: "Each deal card shows a plain-English next milestone with a date — exactly what you can tell your buyer." },
                { title: "Real-time status updates", desc: "Bell icon shows every change from your LO partner. Email notifications fire on the big milestones." },
                { title: "Stalled-deal detection", desc: "When a deal hasn't moved in a week, you see it instantly — so you can poke your LO before your buyer asks." },
                { title: "Send your buyer a status link", desc: "Generate a beautiful live-status page with one click. Your buyer self-serves their questions." },
              ].map((b, i) => (
                <div key={i} style={{ padding: "16px 18px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.white, marginBottom: 4 }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: T.ghostDim, lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, fontSize: 12, color: T.ghostDim, fontStyle: "italic" }}>
              Realtor accounts are 100% free. Always. Your LO partner's subscription covers your seat.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ValueProps() {
  const m = useIsMobile();
  const props = [
    { icon: "✦", color: T.teal, title: "AI Coach on every deal", desc: "Click \"Coach me\" and AI reads your notes, classifies the engagement state, and drafts the message to send. Plus a Monday briefing email with the week's top moves." },
    { icon: "✎", color: T.amber, title: "Conversation import", desc: "Paste a transcript from Plaud, Otter, or your own call notes. AI extracts the borrower's info, timeline, concerns, and action items into a fresh deal card in 10 seconds." },
    { icon: "★", color: T.amber, title: "Borrower portal you share with one tap", desc: "Generate a live status page for your borrower. They self-serve their questions. You stop answering \"any update?\" texts." },
    { icon: "◷", color: T.sky, title: "Daily 7am follow-up digest", desc: "Every morning, an email lands with every overdue follow-up plus today's leads. Cold leads stop slipping through cracks." },
    { icon: "↑", color: T.teal, title: "Bulk lead import", desc: "Migrating from a spreadsheet? Paste your existing leads, AI parses the columns and imports them in one shot. 80 leads in 5 minutes." },
    { icon: "▤", color: T.ghost, title: "Role-based views", desc: "LOs see loan milestones. Realtors see property milestones. Both see what they need. Private notes stay private." },
  ];

  return (
    <section style={{ padding: m ? "60px 20px" : "80px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Why DealSync</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white }}>Not a CRM replacement.{m ? " " : <br />}The layer between them.</h2>
            <p style={{ fontSize: m ? 14 : 15, color: T.ghostDim, maxWidth: 560, margin: "12px auto 0", lineHeight: 1.6 }}>Your LO has a CRM. Your Realtor has a CRM. What's missing is the shared space between them — from first referral to closing day.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {props.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ padding: "28px 24px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
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
  const m = useIsMobile();
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [branchForm, setBranchForm] = useState({ name: "", email: "", phone: "", company: "", lo_count: "", notes: "" });
  const [branchSubmitting, setBranchSubmitting] = useState(false);
  const [branchSuccess, setBranchSuccess] = useState(false);
  const [branchError, setBranchError] = useState(null);

  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    if (!branchForm.name || !branchForm.email) { setBranchError("Name and email are required"); return; }
    setBranchSubmitting(true);
    setBranchError(null);
    try {
      const API = process.env.REACT_APP_API_URL || "https://dealsync-api-production.up.railway.app";
      const res = await fetch(`${API}/api/auth/branch-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branchForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setBranchSuccess(true);
    } catch (err) {
      setBranchError(err.message);
    } finally {
      setBranchSubmitting(false);
    }
  };

  const soloFeatures = ["Everything in Free", "Unlimited partner invites", "Unlimited active deals", "Partner scorecard and analytics", "Lead nurture tracking", "Priority support", "30-day free trial"];
  const tiers = [
    { name: "Realtor Partner", price: "Free", period: "forever", color: T.amber, highlight: false, desc: "For Real Estate Agents invited by their LO partners.", features: ["Unlimited shared deals", "Real-time loan status updates", "Activity feed and notifications", "Conversation notes and history", "Mobile app access"] },
    { name: "Solo LO", price: "$49", period: "/month", color: T.teal, highlight: false, desc: "For independent originators who want to convert more referrals into closings.", features: soloFeatures },
    { name: "Solo LO Annual", price: "$499", period: "/year", color: T.teal, highlight: true, badge: "Save $89", desc: "Same Solo LO plan, billed yearly. Save $89 vs paying monthly.", features: soloFeatures },
  ];

  return (
    <section id="pricing" style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="-100px" left="50%" size={m ? 300 : 600} color={T.teal} opacity={0.03} />
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 56 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12 }}>Less than the cost of{m ? " " : <br />}one lost referral</h2>
            <p style={{ fontSize: 15, color: T.ghostDim }}>LOs pay. Realtors are always free.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: 16, alignItems: "start" }}>
          {tiers.map((tier, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ padding: "32px 28px", borderRadius: 14, background: tier.highlight ? `linear-gradient(160deg, ${T.navyMid}, ${T.navyLight})` : T.navyLight, border: `1px solid ${tier.highlight ? T.tealBorder : T.border}`, position: "relative", overflow: "hidden" }}>
                {tier.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.teal}, ${T.tealDim})` }} />}
                {tier.badge && <div style={{ position: "absolute", top: 14, right: 14, padding: "3px 8px", borderRadius: 12, background: `${T.teal}22`, border: `1px solid ${T.tealBorder}`, color: T.teal, fontSize: 10, fontWeight: 600, letterSpacing: 0.3 }}>{tier.badge}</div>}
                <div style={{ fontSize: 13, fontWeight: 600, color: tier.color, marginBottom: 4, letterSpacing: 0.3 }}>{tier.name}</div>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 42, fontWeight: 700, fontFamily: T.display, color: T.white }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: T.ghostDim, marginLeft: 2 }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.5, marginBottom: 24, minHeight: 40 }}>{tier.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 13, color: T.ghost }}>
                      <span style={{ color: tier.color, fontSize: 11, flexShrink: 0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href={tier.price === "Free" ? "#waitlist" : "https://app.dealsync.me"} style={{ display: "block", textAlign: "center", padding: "12px 0", borderRadius: 8, textDecoration: "none", fontFamily: T.font, fontSize: 13, fontWeight: 600, background: tier.highlight ? T.teal : "transparent", color: tier.highlight ? T.navy : T.teal, border: tier.highlight ? "none" : `1px solid ${T.tealBorder}` }}>
                  {tier.price === "Free" ? "Join when invited" : "Start free trial"}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <p style={{ fontSize: 13, color: T.ghostDim }}>Need 5+ seats? <span onClick={() => setShowBranchForm(true)} style={{ color: T.teal, cursor: "pointer", textDecoration: "underline" }}>Contact us for Branch pricing</span></p>
          </div>
        </FadeIn>

        {/* Branch Pricing Inquiry Modal */}
        {showBranchForm && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
            <div style={{ width: m ? "100%" : 460, maxHeight: "90vh", overflowY: "auto", padding: 32, borderRadius: 16, background: T.navyLight, border: `1px solid ${T.borderLight}`, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
              {branchSuccess ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${T.teal}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, color: T.teal }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#F0F4F8", marginBottom: 8 }}>Thank you!</div>
                  <div style={{ fontSize: 14, color: T.ghostDim, marginBottom: 20, lineHeight: 1.6 }}>We've received your inquiry and will be in touch within 24 hours to discuss Branch pricing for your team.</div>
                  <button onClick={() => { setShowBranchForm(false); setBranchSuccess(false); setBranchForm({ name: "", email: "", phone: "", company: "", lo_count: "", notes: "" }); }} style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: T.teal, color: "#0B1D2E", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Close</button>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: "#F0F4F8", marginBottom: 4 }}>Branch Pricing Inquiry</div>
                    <div style={{ fontSize: 13, color: T.ghostDim, lineHeight: 1.5 }}>Tell us about your branch and we'll create a custom plan that fits your team's needs.</div>
                  </div>
                  <form onSubmit={handleBranchSubmit}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Name *</div>
                        <input value={branchForm.name} onChange={e => setBranchForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Email *</div>
                        <input type="email" value={branchForm.email} onChange={e => setBranchForm(f => ({ ...f, email: e.target.value }))} placeholder="you@company.com" required style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Phone</div>
                        <input value={branchForm.phone} onChange={e => setBranchForm(f => ({ ...f, phone: e.target.value }))} placeholder="808-555-1234" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Company</div>
                        <input value={branchForm.company} onChange={e => setBranchForm(f => ({ ...f, company: e.target.value }))} placeholder="Your mortgage company" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Number of Loan Officers</div>
                      <select value={branchForm.lo_count} onChange={e => setBranchForm(f => ({ ...f, lo_count: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box" }}>
                        <option value="">Select team size...</option>
                        <option value="5-10">5–10 LOs</option>
                        <option value="11-25">11–25 LOs</option>
                        <option value="26-50">26–50 LOs</option>
                        <option value="51-100">51–100 LOs</option>
                        <option value="100+">100+ LOs</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, color: T.ghostDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Additional notes</div>
                      <textarea value={branchForm.notes} onChange={e => setBranchForm(f => ({ ...f, notes: e.target.value }))} placeholder="Tell us about your team's needs, current tools, or any questions..." rows={3} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "#1A3550", color: "#F0F4F8", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                    </div>
                    {branchError && <div style={{ fontSize: 12, color: "#FF6B6B", marginBottom: 12, padding: "8px 12px", borderRadius: 6, background: "rgba(255,107,107,0.1)" }}>{branchError}</div>}
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="button" onClick={() => { setShowBranchForm(false); setBranchError(null); }} style={{ flex: 1, padding: "12px 0", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: "transparent", color: T.ghostDim, fontSize: 14, cursor: "pointer" }}>Cancel</button>
                      <button type="submit" disabled={branchSubmitting} style={{ flex: 1, padding: "12px 0", borderRadius: 8, border: "none", background: branchSubmitting ? T.ghostDim : T.teal, color: "#0B1D2E", fontSize: 14, fontWeight: 600, cursor: branchSubmitting ? "default" : "pointer" }}>{branchSubmitting ? "Submitting..." : "Submit inquiry"}</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FounderSection() {
  const m = useIsMobile();
  return (
    <section style={{ padding: m ? "60px 20px" : "80px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ padding: m ? "28px 20px" : "40px 36px", borderRadius: 14, background: T.navyLight, border: `1px solid ${T.borderLight}`, position: "relative" }}>
            <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 1, background: `linear-gradient(90deg, transparent, ${T.tealBorder}, transparent)` }} />
            <div style={{ fontSize: m ? 16 : 22, fontFamily: T.font, fontWeight: 400, color: T.ghost, lineHeight: 1.7, marginBottom: 24 }}>
              "I built DealSync because the LO-Realtor relationship is the most important partnership in real estate — and the hardest one to keep in sync. Every deal lives across too many places: my CRM, the agent's CRM, our texts, our voicemails. After 25 years originating loans in Honolulu, I knew the LOs and Realtors who close the most deals together need <span style={{ color: T.teal, fontWeight: 500 }}>one shared workspace where nothing slips between sides.</span> That's what DealSync is."
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

function FAQ() {
  const m = useIsMobile();
  const [open, setOpen] = useState(0);
  const items = [
    {
      q: "Will this replace my CRM?",
      a: "No. DealSync is the layer between your CRM and your Realtor partner's CRM — the place where the LO–Realtor collaboration actually happens. Keep your existing tools. DealSync makes them work together.",
    },
    {
      q: "What if my Realtor partner doesn't sign up?",
      a: "Realtors are completely free, forever, and the invite is one click. Most LOs onboard their top 3–5 partners within the first week. If a partner won't sign up, you can still use DealSync solo — but you lose the shared-visibility benefit, which is the point.",
    },
    {
      q: "How long does setup take?",
      a: "Five minutes. Sign up, paste your existing lead list (DealSync's AI parses any spreadsheet format), copy your partner-invite link to your top Realtors. Done. No CRM migration, no configuration, no training.",
    },
    {
      q: "What about my borrower's privacy?",
      a: "Borrower data is stored in encrypted Supabase Postgres with role-based visibility — Realtors see only what's marked visible to them, private notes stay private, the borrower portal only shows borrower-friendly information (no LO-internal pricing). Standard SOC-equivalent practices.",
    },
    {
      q: "Does the AI cost extra?",
      a: "No — every AI feature (Coach me, conversation import, bulk lead import, weekly briefing) is included in your subscription. Cached results mean repeat clicks on the same deal don't cost anything extra.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel from inside the app, no questions, no forms, no \"win-back\" emails. Annual subscriptions can be canceled too — you keep access until the end of the period.",
    },
  ];

  return (
    <section style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: m ? 36 : 48 }}>
            <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white }}>Questions LOs always ask</h2>
          </div>
        </FadeIn>
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.05}>
            <div style={{ borderBottom: `1px solid ${T.border}`, padding: "18px 0" }}>
              <div onClick={() => setOpen(open === i ? -1 : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}>
                <h3 style={{ fontSize: m ? 15 : 17, fontWeight: 600, color: T.white, fontFamily: T.display, paddingRight: 16 }}>{item.q}</h3>
                <span style={{ fontSize: 16, color: T.teal, transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</span>
              </div>
              {open === i && (
                <p style={{ fontSize: m ? 14 : 15, color: T.ghostDim, lineHeight: 1.7, marginTop: 12, paddingRight: 32 }}>{item.a}</p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  const m = useIsMobile();
  return (
    <section id="get-started" style={{ padding: m ? "60px 20px 80px" : "100px 32px 120px", position: "relative" }}>
      <GlowOrb top="-100px" left="30%" size={m ? 250 : 600} color={T.teal} opacity={0.05} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: m ? 28 : 42, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.2, marginBottom: 16, letterSpacing: -0.5 }}>
            Stop losing referrals.{m ? " " : <br />}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: T.teal }}>Start closing them.</span>
          </h2>
          <p style={{ fontSize: m ? 15 : 17, color: T.ghost, lineHeight: 1.6, marginBottom: 36, maxWidth: 540, margin: "0 auto 36px", fontWeight: 300 }}>
            30 days free. Unlimited deals and partner Realtors during your trial. No credit card required to start.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: m ? 10 : 14, flexDirection: m ? "column" : "row", alignItems: "center", marginBottom: 16 }}>
            <a href="https://app.dealsync.me" style={{ padding: m ? "14px 32px" : "16px 40px", borderRadius: 10, background: T.teal, color: T.navy, fontSize: m ? 15 : 16, fontWeight: 700, textDecoration: "none", fontFamily: T.font, boxShadow: `0 0 50px ${T.tealGlow}, 0 6px 20px rgba(0,0,0,0.3)`, width: m ? "100%" : "auto", textAlign: "center", letterSpacing: 0.3 }}>
              Start your 30-day free trial
            </a>
            <a href="#pricing" style={{ padding: m ? "14px 32px" : "16px 40px", borderRadius: 10, background: "transparent", border: `1px solid ${T.borderLight}`, color: T.ghost, fontSize: m ? 15 : 16, fontWeight: 500, textDecoration: "none", fontFamily: T.font, width: m ? "100%" : "auto", textAlign: "center" }}>
              See pricing
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p style={{ fontSize: 12, color: T.ghostDim, marginTop: 18 }}>
            Built by a 25-year LO in Honolulu · Trusted by LOs at CMG Home Loans · Free for Realtors, always
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Waitlist() {
  const m = useIsMobile();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("lo");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://nkjfluakvaatkcygwkhj.supabase.co/rest/v1/waitlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": "sb_publishable_XHDlAicw8iGxk5obabpNmw_Dt4layfq",
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({ email: email.toLowerCase(), first_name: firstName, last_name: lastName, role }),
        }
      );
      if (res.status === 409 || res.status === 400) {
        setSubmitted(true);
      } else if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" style={{ padding: m ? "60px 20px" : "100px 32px", position: "relative" }}>
      <GlowOrb top="-100px" left="30%" size={m ? 250 : 500} color={T.teal} opacity={0.04} />
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, color: T.teal, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Early access</p>
          <h2 style={{ fontSize: m ? 26 : 36, fontWeight: 600, fontFamily: T.display, color: T.white, marginBottom: 12 }}>Be first in the deal room</h2>
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
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required style={{
                    flex: 1, padding: "14px 16px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: T.surface, color: T.white, fontSize: 15, fontFamily: T.font, outline: "none", boxSizing: "border-box",
                  }} />
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required style={{
                    flex: 1, padding: "14px 16px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: T.surface, color: T.white, fontSize: 15, fontFamily: T.font, outline: "none", boxSizing: "border-box",
                  }} />
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required style={{
                  width: "100%", padding: "14px 16px", borderRadius: 8, border: `1px solid ${T.borderLight}`, background: T.surface, color: T.white, fontSize: 15, fontFamily: T.font, outline: "none", boxSizing: "border-box", marginBottom: 12,
                }} />
                {error && <div style={{ fontSize: 12, color: T.coral, marginBottom: 12, padding: "8px 12px", borderRadius: 6, background: "rgba(255,107,107,0.10)" }}>{error}</div>}
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
  const m = useIsMobile();
  return (
    <footer style={{ padding: m ? "30px 20px" : "40px 32px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: m ? "column" : "row", gap: m ? 8 : 0 }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 600, fontFamily: T.display, color: T.teal }}>Deal</span>
          <span style={{ fontSize: 16, fontWeight: 300, color: T.ghost }}>Sync</span>
          {!m && <span style={{ fontSize: 12, color: T.ghostDim, marginLeft: 16 }}>The collaborative deal room for LOs and Realtors</span>}
        </div>
        <div style={{ fontSize: 12, color: T.ghostDim }}>
         © 2026 DealSync.me · Built in Honolulu, HI · <a href="/privacy.html" style={{ color: T.ghostDim, textDecoration: "none" }}>Privacy</a> · <a href="/terms.html" style={{ color: T.ghostDim, textDecoration: "none" }}>Terms</a> · <a href="mailto:support@dealsync.me" style={{ color: T.teal, textDecoration: "none" }}>support@dealsync.me</a>
        </div>
      </div>
    </footer>
  );
}

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
        @media (max-width: 768px) {
          input, select, textarea { font-size: 16px !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <PainPoints />
      <ConversionImpact />
      <FullJourney />
      <AICoach />
      <BorrowerPortalShowcase />
      <ConversationIntel />
      <DailyLoop />
      <ForRealtors />
      <ValueProps />
      <Pricing />
      <FounderSection />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Analytics />
    </div>
  );
}
