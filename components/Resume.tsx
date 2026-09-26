"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const ITEMS = [
  { id: "i",   badge: "I",   title: "EXPERIENCE",  subtitle: "Production Ops & Security",  rank: 9 },
  { id: "ii",  badge: "II",  title: "SKILLS",      subtitle: "Security / Infra / Code",    rank: 7 },
  { id: "iii", badge: "III", title: "PROJECTS",    subtitle: "Security Engineering",       rank: 6 },
  { id: "iv",  badge: "IV",  title: "EDUCATION",   subtitle: "Degree & Certifications",    rank: 5 },
];

// Summary shown in right panel by default
const SUMMARY_PANELS = [
  {
    index: "01", title: "EXPERIENCE LOG", progress: "3",
    rows: [
      { index: "01", title: "Infra & Security Engineer — TraceGI",          status: "Current" },
      { index: "02", title: "Infra & Security Consultant — Northeast Store", status: "Current" },
      { index: "03", title: "Project Intern — MeECL (State Power Grid)",     status: "2025"    },
    ],
    bottom: { title: "HIGHLIGHTS", bullets: [
      "- Operate live platform app.tracegi.com · VPS hardening verified in prod",
      "- Incident-driven Cloudflare audit · custom Workers for bot mitigation",
      "- Snort 3 IDS deployed in state power-distribution infrastructure",
    ]},
  },
  {
    index: "02", title: "SKILL TREE", progress: "MAX",
    rows: [
      { index: "SEC", title: "Snort 3 · MS Sentinel SIEM · Incident Response", status: "Expert"  },
      { index: "INF", title: "Linux · Docker · Nginx · Cloudflare · Postgres",  status: "Strong"  },
      { index: "LNG", title: "Python · Bash · PowerShell · SQL",                status: "Working" },
      { index: "AI",  title: "Agentic Dev (Claude Code) · Docs-as-State",       status: "Native"  },
    ],
    bottom: { title: "ALSO IN THE KIT", bullets: [
      "- TLS · UFW · Fail2Ban · RBAC / auth · REST APIs · Sentry observability",
      "- Nmap · Wireshark · Metasploit · OWASP Top 10 · MITRE ATT&CK · NIST CSF",
      "- Microsoft Azure · Git · GitHub-as-source-of-truth deploys",
    ]},
  },
  {
    index: "03", title: "PROJECT LOG", progress: "2",
    rows: [
      { index: "01", title: "Network Intrusion Detection System — Major Project", status: "In Dev" },
      { index: "02", title: "Azure Sentinel SIEM Honeypot",                        status: "2024"   },
    ],
    bottom: { title: "NIDS HIGHLIGHTS", bullets: [
      "- Preprocessing pipeline over 2.5M+ CICIDS2017 flows (72 features)",
      "- Multi-modal autoencoder (RLSTM / xLSTM) → Random Forest classifier",
      "- 94.32% F1 on a held-out test split",
    ]},
  },
  {
    index: "04", title: "EDUCATION LOG", progress: "'26",
    rows: [
      { index: "01", title: "B.Tech CSE — KIIT-DU, Bhubaneswar",   status: "7.15"      },
      { index: "02", title: "Kendriya Vidyalaya, Shillong (XII)",  status: "8.7"       },
      { index: "03", title: "Kendriya Vidyalaya, Shillong (X)",    status: "7.9"       },
      { index: "04", title: "eJPT — Junior Penetration Tester",    status: "Certified" },
    ],
    bottom: { title: "", bullets: [] as string[] },
  },
];

// Full expanded detail per card — shown when Enter/→ pressed
const EXPANDED_PANELS = [
  {
    title: "EXPERIENCE — FULL DETAIL",
    sections: [
      {
        heading: "Infrastructure & Security Engineer — TraceGI",
        date: "2026 – Present · Two-person team",
        bullets: [
          "Operate a live production platform (app.tracegi.com) — farmer/cooperative onboarding, QR-based public product provenance, and an ESP32/RFID IoT weighment-ingestion pipeline — preparing it for its first pilot customer",
          "Hardened the production VPS and verified each control live: UFW + Fail2Ban, TLS, security headers, Docker network isolation, least-privilege PostgreSQL roles",
          "Closed an open registration endpoint with authentication + role-based access control; verified in production (unauth → 401, non-admin → 403); ran a broader auth review covering credential flows and cryptographic signing",
          "Stood up error monitoring (Sentry, frontend + backend) and idempotent, self-healing DB migrations with a GitHub-as-source-of-truth deployment workflow",
          "Built an agentic AI delivery system (Claude Code): persistent sprint/state/decision docs auto-synced via git hooks keep agent context current; every production change is human-verified before deploy",
        ],
      },
      {
        heading: "Infrastructure & Security Consultant — Northeast Store",
        date: "2026 – Present · Freelance · sister company of TraceGI",
        bullets: [
          "Engaged after a live security incident to audit the full Cloudflare and origin posture: WAF configuration, DNS records, and edge security",
          "Designed custom Cloudflare Workers for bot mitigation, checkout protection, and real-time threat alerting",
          "Identified and remediated DNS misconfigurations, tightening domain and mail security",
          "Separately delivered a storefront-wide creative overhaul — banner and ad-campaign assets — extending the engagement to the client's full digital presence",
        ],
      },
      {
        heading: "Project Intern — Meghalaya Energy Corporation Ltd. (MeECL)",
        date: "May – Jun 2025 · Shillong",
        bullets: [
          "Deployed Snort 3 IDS/IPS in the production network of state-level power-distribution infrastructure",
          "Authored 6 custom detection rules targeting ICMP reconnaissance, HTTP attacks, and brute-force attempts",
          "Administered Linux servers (dependency management, configuration hardening, service optimization) and authored the deployment guide and rollout roadmap adopted for future maintenance",
        ],
      },
    ],
  },
  {
    title: "SKILLS — FULL DETAIL",
    sections: [
      {
        heading: "SECURITY OPERATIONS",
        date: "",
        bullets: [
          "Snort 3 (IDS/IPS) · Microsoft (Azure) Sentinel SIEM · incident response & alert triage",
          "Nmap · Wireshark · Metasploit · OWASP Top 10 · MITRE ATT&CK · NIST CSF",
        ],
      },
      {
        heading: "INFRASTRUCTURE & CLOUD",
        date: "",
        bullets: [
          "Linux administration · Docker · Nginx · PostgreSQL · Cloudflare (WAF, Workers, DNS)",
          "TLS · UFW · Fail2Ban · Microsoft Azure · Git · Sentry (observability)",
        ],
      },
      {
        heading: "LANGUAGES & SCRIPTING",
        date: "",
        bullets: ["Python · Bash · PowerShell · SQL"],
      },
      {
        heading: "AI-NATIVE DEVELOPMENT",
        date: "",
        bullets: [
          "Agentic coding workflows (Claude Code) — spec-driven delegation, docs-as-state context management, human-reviewed production gates",
        ],
      },
    ],
  },
  {
    title: "PROJECTS — FULL DETAIL",
    sections: [
      {
        heading: "Network Intrusion Detection System",
        date: "Jan 2026 – Present · B.Tech Major Project",
        bullets: [
          "Engineered a preprocessing pipeline over CICIDS2017 (2.5M+ flow records, 72 features) handling severe class imbalance via stratified sampling, class weighting, and z-score normalization",
          "Designed a multi-modal autoencoder (parallel RLSTM/xLSTM encoder streams, shared 30-dim bottleneck) separating static and dynamic flow features for DoS, DDoS, brute-force, and infiltration detection",
          "Achieved 94.32% F1 (97.89% accuracy) feeding compressed embeddings into a Random Forest classifier on a held-out test split",
        ],
      },
      {
        heading: "Azure Sentinel SIEM Honeypot",
        date: "Nov – Dec 2024",
        bullets: [
          "Exposed a deliberately vulnerable Azure VM; triaged 200+ real-world brute-force alerts in Microsoft Sentinel, correlating telemetry with geolocation threat intelligence",
          "Automated log ingestion, alert aggregation, and access monitoring with PowerShell in a simulated SOC workflow",
        ],
      },
    ],
  },
  {
    title: "EDUCATION — FULL DETAIL",
    sections: [
      {
        heading: "B.Tech, Computer Science & Engineering — KIIT-DU",
        date: "2022 – 2026 · Bhubaneswar",
        bullets: [
          "CGPA 7.15",
          "Final-year major project: ML-based Network Intrusion Detection System (see Projects)",
        ],
      },
      {
        heading: "Kendriya Vidyalaya, Shillong",
        date: "2019 – 2022",
        bullets: [
          "Intermediate (Class XII): 8.7",
          "Matriculation (Class X): 7.9",
        ],
      },
      {
        heading: "CERTIFICATIONS",
        date: "",
        bullets: [
          "eJPT — eLearnSecurity Junior Penetration Tester (Oct 2025)",
        ],
      },
    ],
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────────────────────

const panelBg    = "linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)";
const panelClip  = "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)";
const rowClip    = "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)";

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Resume({ onBack }: { onBack?: () => void }) {

  const [active, setActive]     = useState(0);
  const [mounted, setMounted]   = useState(false);
  const [expanded, setExpanded] = useState(false); // Enter/→ shows full detail

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")    { setActive(i => Math.max(0, i - 1)); setExpanded(false); }
      if (e.key === "ArrowDown")  { setActive(i => Math.min(ITEMS.length - 1, i + 1)); setExpanded(false); }
      if (e.key === "ArrowRight" || e.key === "Enter") setExpanded(true);
      if (e.key === "ArrowLeft")  setExpanded(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, []);

  const summary  = SUMMARY_PANELS[active];
  const detail   = EXPANDED_PANELS[active];

  return (
    <div className="absolute inset-0 overflow-hidden" id="resume-screen">

      {/* BG VIDEO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/skills.mp4" type="video/mp4" />
      </video>

      {/* ENTRY MASK */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 9, overflow: "hidden",
        background: "#0047FF",
        clipPath: "circle(0 at 50% 50%)",
        animation: "resume-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        pointerEvents: "none",
      }}>
        <video autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/videos/skills.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
      `}</style>

      {/* ── CARD LIST ── */}
      <div style={{
        position: "absolute", top: "9vh", left: "2.8vw",
        width: "min(47vw, 720px)", display: "flex", flexDirection: "column", gap: 10,
        zIndex: 10, transform: "scale(0.9)", transformOrigin: "top left",
      }}>

        <div style={{
          fontFamily: "var(--font-anton), sans-serif", fontSize: 92, lineHeight: 0.9,
          color: "#f6fbff", letterSpacing: 2, margin: "0 0 6px 12px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>LIST</div>

        {ITEMS.map((item, index) => {
          const isActive = active === index;
          return (
            <div
              key={item.id}
              onMouseEnter={() => { setActive(index); setExpanded(false); }}
              onClick={() => { setActive(index); setExpanded(v => index === active ? !v : false); }}
              style={{
                position: "relative", cursor: "pointer",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-48px)",
                transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms`,
              }}
            >
              <div style={{
                position: "relative", height: 112,
                background: isActive ? "#ffffff" : "#10185f",
                clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
                boxShadow: isActive ? "10px 8px 0 #d63232" : "0 8px 0 rgba(5,13,59,0.85)",
                transform: isActive ? "translateX(6px)" : "translateX(0)",
                transition: "transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
                overflow: "visible",
              }}>
                {/* BADGE */}
                <div style={{
                  position: "absolute", top: 10, left: -10, width: 56, height: 70,
                  background: isActive ? "#000" : "#0b113d",
                  border: `3px solid ${isActive ? "#000" : "#9cf7ff"}`,
                  clipPath: "polygon(14% 0, 100% 0, 84% 100%, 0 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: "rotate(-8deg)", boxShadow: "0 4px 0 rgba(0,0,0,0.28)", zIndex: 2,
                }}>
                  <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 36, color: "#d2fdff", letterSpacing: 1, transform: "rotate(8deg)", display: "block" }}>{item.badge}</span>
                </div>
                {/* INNER */}
                <div style={{ position: "absolute", inset: 0, padding: "14px 22px 14px 62px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", zIndex: 1 }}>
                  <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 56, lineHeight: 0.9, letterSpacing: 1, color: isActive ? "#000" : "#a5f6ff", transition: "color 0.22s ease" }}>{item.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2, flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 28, letterSpacing: 2, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>RANK</div>
                    <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 70, lineHeight: 0.82, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>{item.rank}</div>
                  </div>
                </div>
                {/* SUBTITLE */}
                <div style={{
                  position: "absolute", left: 64, right: 14, bottom: 12, height: 34,
                  background: isActive ? "#000" : "#85f4ff",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                  display: "flex", alignItems: "center", padding: "0 18px", zIndex: 1,
                }}>
                  <span style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 28, lineHeight: 1, letterSpacing: 1, color: isActive ? "#fff" : "#041238" }}>{item.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* ── RIGHT PANEL ── */}
      <AnimatePresence mode="wait">
        {!expanded ? (

          // ── SUMMARY VIEW ──
          <motion.div
            key={`summary-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", maxHeight: "82vh", overflowY: "auto", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "grid", gridTemplateColumns: "70px 1fr auto",
              alignItems: "center", gap: 14, minHeight: 92, padding: "0 18px",
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 46, lineHeight: 1 }}>{summary.index}</div>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 42, lineHeight: 0.92, letterSpacing: 1 }}>{summary.title}</div>
              <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 42, letterSpacing: 2 }}>{summary.progress}</div>
            </div>

            {/* ROWS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {summary.rows.map(row => (
                <div key={row.index} style={{
                  display: "grid", gridTemplateColumns: "50px 1fr auto",
                  alignItems: "center", gap: 14, minHeight: 56, padding: "0 14px",
                  background: "rgba(8,18,72,0.96)", clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 22, letterSpacing: 1, color: "#94f4ff" }}>{row.index}</div>
                  <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 22, lineHeight: 1.1, color: "#f2fcff" }}>{row.title}</div>
                  <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 18, color: "#06133b", background: "#8df6ff", padding: "5px 10px", clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)", whiteSpace: "nowrap" }}>{row.status}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            {summary.bottom.bullets.length > 0 && (
              <div style={{ marginTop: 22, padding: 18, background: "rgba(5,13,57,0.97)", clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}>
                <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 30, letterSpacing: 2, color: "#91f5ff", marginBottom: 14 }}>{summary.bottom.title}</div>
                {summary.bottom.bullets.map((b, i) => (
                  <div key={i} style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 19, lineHeight: 1.2, color: "#edfaff", marginBottom: 8 }}>{b}</div>
                ))}
              </div>
            )}

            {/* EXPAND BUTTON */}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setExpanded(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 20, letterSpacing: 2,
                  color: "#06133b", background: "#8df6ff", border: "none", cursor: "pointer",
                  padding: "9px 18px",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                  boxShadow: "5px 5px 0 rgba(255,94,136,0.85)",
                }}
              >
                <span style={{ lineHeight: 1 }}>FULL DETAIL</span>
                <span style={{ fontSize: 22, lineHeight: 1 }}>→</span>
              </button>
            </div>

          </motion.div>

        ) : (

          // ── EXPANDED VIEW ──
          <motion.div
            key={`expanded-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", maxHeight: "82vh", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
              overflowY: "auto",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              minHeight: 72, padding: "0 18px", marginBottom: 0,
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 32, lineHeight: 1, letterSpacing: 1 }}>{detail.title}</div>
              <button onClick={() => setExpanded(false)} style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 17, letterSpacing: 2, color: "#08153f", background: "transparent", border: "2px solid #08153f", borderRadius: 4, padding: "5px 12px", cursor: "pointer" }}>← SUMMARY</button>
            </div>

            {/* SECTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
              {detail.sections.map((section, si) => (
                <div key={si} style={{
                  padding: 16, background: "rgba(8,18,72,0.96)",
                  clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  {/* SECTION HEADING */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div style={{ fontFamily: "var(--font-anton), sans-serif", fontSize: 22, color: "#8df6ff", letterSpacing: 1 }}>{section.heading}</div>
                    {section.date && (
                      <div style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 14, color: "rgba(133,244,255,0.5)", letterSpacing: 1, flexShrink: 0, marginLeft: 8 }}>{section.date}</div>
                    )}
                  </div>
                  {/* BULLETS */}
                  {section.bullets.map((b, bi) => (
                    <div key={bi} style={{
                      fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 300,
                      fontSize: 13, lineHeight: 1.5, color: "#cde8ff",
                      marginBottom: 6, paddingLeft: 12,
                      borderLeft: "2px solid rgba(133,244,255,0.25)",
                    }}>{b}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* COLLAPSE BUTTON */}
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setExpanded(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 20, letterSpacing: 2,
                  color: "#8df6ff", background: "transparent",
                  border: "2px solid rgba(141,246,255,0.65)", borderRadius: 4, cursor: "pointer",
                  padding: "8px 18px",
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>←</span>
                <span style={{ lineHeight: 1 }}>SUMMARY</span>
              </button>
            </div>

          </motion.div>

        )}
      </AnimatePresence>

      {/* BACK TO MENU */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "absolute", bottom: 20, right: 28, zIndex: 20,
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: 20, letterSpacing: 2,
          color: "#fff", background: "#c4001a", border: "none", cursor: "pointer",
          padding: "10px 18px",
          clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%)",
          boxShadow: "0 4px 0 rgba(0,0,0,0.45)",
          opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.6s",
        }}
      >
        <span style={{ fontSize: 22, lineHeight: 1 }}>←</span>
        <span style={{ lineHeight: 1 }}>BACK TO MENU</span>
      </button>

    </div>
  );
}
