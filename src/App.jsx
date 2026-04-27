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
          <a href="https://app.dealsync.me" style={{ padding: m ? "7px 16px" : "9px 22px", borderRadius: 8, background: T.teal, color: T.navy, fontSize: m ? 12 : 13, fontWeight: 600, textDecoration: "none", fontFamily: T.font }}>Get early access</a>
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
          <p style={{ fontSize: m ? 15 : 19, color: T.ghost, lineHeight: 1.65, maxWidth: 620, margin: "0 auto 36px", fontWeight: 300 }}>
            DealSync is the shared deal room where Loan Officers and Realtors track every lead from first conversation to closing day. No more forgotten follow-ups. No more lost referrals. Just one place where both sides see everything.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center", gap: m ? 10 : 14, flexDirection: m ? "column" : "row", alignItems: "center" }}>
            <a href="https://app.dealsync.me" style={{ padding: m ? "12px 28px" : "14px 36px", borderRadius: 10, background: T.teal, color: T.navy, fontSize: m ? 14 : 15, fontWeight: 600, textDecoration: "none", fontFamily: T.font, boxShadow: `0 0 40px ${T.tealGlow}, 0 4px 16px rgba(0,0,0,0.3)`, width: m ? "100%" : "auto", textAlign: "center" }}>
              Get early access — free
            </a>
            <a href="#problem" style={{ padding: m ? "12px 28px" : "14px 36px", borderRadius: 10, background: "transparent", border: `1px solid ${T.borderLight}`, color: T.ghost, fontSize: m ? 14 : 15, fontWeight: 500, textDecoration: "none", fontFamily: T.font, width: m ? "100%" : "auto", textAlign: "center" }}>
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
    { num: "01", label: "Referral", color: T.sky, title: "The lead comes in", desc: "A Realtor refers a buyer. An LO gets a call from a prospect. Instead of scribbling on a notepad or entering it into a CRM the other side can't see — both parties create a shared deal card in seconds.", mockItems: [
      { text: "Lead source: Agent referral — Will Campbell", color: T.sky },
      { text: "First contact: Apr 10, 2026 — phone call", color: T.ghostDim },
      { text: "Buyer timeline: 2-3 months", color: T.ghostDim },
      { text: "Notes: VA eligible, looking at Kapolei/Ewa Beach", color: T.amber },
    ]},
    { num: "02", label: "Nurture", color: T.amber, title: "Nobody gets forgotten", desc: "The buyer isn't ready yet — and that's fine. DealSync keeps the lead visible to both the LO and Realtor. Conversation notes, follow-up reminders, and status updates all live on the shared deal card. When the buyer calls back in 6 weeks, both sides know exactly where they left off.", mockItems: [
      { text: "Follow-up note: Buyer checking on lease expiration date", color: T.amber },
      { text: "LO note: Discussed DTI at 42%, needs to pay off car loan first", color: T.sky },
      { text: "Agent note: Showing them Kapolei listings to keep engagement", color: T.amber },
      { text: "Status: Nurturing — next follow-up May 15", color: T.teal },
    ]},
    { num: "03", label: "Pre-approval", color: T.teal, title: "They're ready — and you're prepared", desc: "When the buyer says 'let's do this,' the LO already has every conversation documented. No starting from scratch. The pre-approval process moves faster because the groundwork was laid during nurture. The Realtor sees the approval in real time — and starts scheduling showings immediately.", mockItems: [
      { text: "Pre-approval: Approved — $725,000", color: T.teal },
      { text: "Loan program: VA Purchase 30yr Fixed", color: T.sky },
      { text: "Rate: 5.875% (not locked yet)", color: T.ghostDim },
      { text: "Agent notified: Showing schedule started", color: T.amber },
    ]},
    { num: "04", label: "Escrow", color: T.teal, title: "Both sides track every milestone", desc: "Under contract to closing day — the LO tracks loan milestones, the Realtor tracks property milestones. Both see the full picture on one card. No more 'What's the status?' texts.", mockItems: [
      { text: "Conditional approval: Mar 25", color: T.sky },
      { text: "Appraisal: $700K — received Mar 22", color: T.sky },
      { text: "Home inspection: Passed", color: T.teal },
      { text: "Clear to Close!", color: T.teal },
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
              <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 16, background: `${T.amber}12`, border: `1px solid ${T.amber}25`, marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.amber }}>Coming soon</span>
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 600, fontFamily: T.display, color: T.white, lineHeight: 1.3, marginBottom: 14 }}>
                Every conversation,<br />captured and shared
              </h2>
              <p style={{ fontSize: 15, color: T.ghostDim, lineHeight: 1.7, marginBottom: 20 }}>
                Imagine this: your LO has a 20-minute phone call with a buyer about their VA eligibility, their debt-to-income concerns, and their 90-day timeline. Instead of that conversation living in the LO's head — it gets captured, summarized, and attached to the deal card where both the LO and Realtor can reference it months later.
              </p>
              <p style={{ fontSize: 15, color: T.ghostDim, lineHeight: 1.7 }}>
                When the buyer calls back in 8 weeks, both partners know exactly what was discussed, what was decided, and what the next steps are. No memory gaps. No starting over. Just seamless continuity.
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

function ValueProps() {
  const m = useIsMobile();
  const props = [
    { icon: "⊕", color: T.teal, title: "Shared from day one", desc: "The moment a lead enters the system, both the LO and Realtor can see it. No waiting until escrow to start collaborating." },
    { icon: "✎", color: T.amber, title: "Conversation notes that stick", desc: "Every phone call, every meeting, every discussion — captured on the deal card where both partners can reference it weeks or months later." },
    { icon: "◷", color: T.sky, title: "Follow-ups that don't slip", desc: "Leads in nurture stay visible. Status updates, next-step reminders, and timeline tracking keep both sides accountable." },
    { icon: "⚡", color: T.teal, title: "Zero learning curve", desc: "If you can read a text message, you can use DealSync. No training. No configuration. No CRM migration required." },
    { icon: "★", color: T.amber, title: "Partner scorecard", desc: "See which partnerships are converting referrals into closings — and which need attention. Data-driven relationship management." },
    { icon: "▤", color: T.ghost, title: "Role-based views", desc: "LOs see loan milestones. Realtors see property milestones. Both see the full picture. Private notes stay private." },
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
  const tiers = [
    { name: "Realtor Partner", price: "Free", period: "forever", color: T.amber, highlight: false, desc: "For Real Estate Agents invited by their LO partners.", features: ["Unlimited shared deals", "Real-time loan status updates", "Activity feed and notifications", "Conversation notes and history", "Mobile app access"] },
    { name: "Solo LO", price: "$49", period: "/month", color: T.teal, highlight: true, desc: "For independent originators who want to convert more referrals into closings.", features: ["Everything in Free", "Unlimited partner invites", "Unlimited active deals", "Partner scorecard and analytics", "Lead nurture tracking", "Priority support", "30-day free trial"] },
    { name: "Mortgage Team", price: "$129", period: "/month", color: T.sky, highlight: false, desc: "For small LO teams who share referral networks.", features: ["Everything in Solo", "Up to 5 LO seats", "Team-level reporting", "Shared partner networks", "Lead routing between LOs"] },
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
            <p style={{ fontSize: 13, color: T.ghostDim }}>Need 10+ seats? <span style={{ color: T.teal, cursor: "pointer" }}>Contact us for Branch pricing</span></p>
          </div>
        </FadeIn>
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
              "I built DealSync because the LO-Realtor relationship is the most important partnership in real estate — and my best Realtor partners and I kept solving the same problem on every file: <span style={{ color: T.teal, fontWeight: 500 }}>keeping each other in the loop.</span> After 25 years of originating in Honolulu, I figured if we need this, every LO-Realtor team does too."
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
      <ConversationIntel />
      <ValueProps />
      <Pricing />
      <FounderSection />
      <Waitlist />
      <Footer />
      <Analytics />
    </div>
  );
}
