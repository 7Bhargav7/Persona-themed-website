"use client";

import { useEffect, useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const CHAR = "/images/char1.png";

const ITEM = {
  id: "github",
  label: "GITHUB",
  icon: "🐙",
  barIcon: "/images/icon1.png",
  href: "https://github.com/mikedimeji",
  handle: "@mikedimeji",
  stats: [
    { tag: "REP", value: "—", color: "#6e40c9" },
    { tag: "STR", value: "—", color: "#f1e05a" },
  ],
  links: [
    { label: "GITHUB PROFILE", url: "https://github.com/mikedimeji" },
  ],
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Github() {

  const [mounted, setMounted]       = useState(false);
  const [focused, setFocused]       = useState(false); // right panel focused
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (!focused) {
        if (e.key === "ArrowRight" || e.key === "Enter") {
          setFocused(true);
          setActiveLink(0);
        }
      } else {
        if (e.key === "ArrowLeft")  setFocused(false);
        if (e.key === "Enter")      window.open(ITEM.links[activeLink].url, "_blank");
      }

    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, [focused, activeLink]);

  return (
    <div className="absolute inset-0 overflow-hidden" id="github-screen">

      {/* BG VIDEO */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/equip.mp4" type="video/mp4" />
      </video>

      {/* ENTRY MASK */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9,
          overflow: "hidden",
          background: "#0047FF",
          clipPath: "circle(0 at 50% 50%)",
          animation: "github-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/equip.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        @keyframes github-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .gh-arrow-left  { animation: sc-arrow-left  0.8s ease-in-out infinite; display: inline-block; }
        .gh-arrow-right { animation: sc-arrow-right 0.8s ease-in-out infinite; display: inline-block; }
        .gh-nav-pop     { animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .gh-infobar-in  { animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── SINGLE BAR ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => window.open(ITEM.href, "_blank")}
          onMouseEnter={() => {}}
          style={{
            position: "relative",
            flexShrink: 0,
            pointerEvents: "all",
            cursor: "pointer",
            transform: mounted ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        >

          {/* RED UNDERLAY */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "45vw",
              height: 90,
              background: "#c4001a",
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%)",
              transform: "translateY(-7px)",
              opacity: 1,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* MAIN BAR */}
          <div
            style={{
              position: "relative",
              width: "45vw",
              height: 90,
              background: "#111",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.65)",
              overflow: "hidden",
              zIndex: 1,
            }}
          >

            {/* WHITE FILL */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#fff",
                clipPath: "polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%)",
                zIndex: 0,
              }}
            />

            {/* SHADE */}
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0, left: "73%", width: "6%",
                background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* CHARACTER */}
            <img
              src={CHAR}
              alt=""
              style={{
                position: "absolute",
                top: 0, left: 110,
                height: "100%", width: "auto", maxWidth: 160,
                objectFit: "cover", objectPosition: "top",
                pointerEvents: "none",
                zIndex: 3,
                clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
              }}
            />

            {/* CONTENT */}
            <div
              style={{
                position: "relative",
                zIndex: 4,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >

              {/* ROLE */}
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 50,
                  letterSpacing: -2,
                  color: "#fff",
                  transform: "rotate(-30deg)",
                  userSelect: "none",
                  lineHeight: 1,
                  padding: "0 16px 0 8px",
                  flexShrink: 0,
                }}
              >
                LEADER
              </div>

              {/* LABEL */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22, userSelect: "none" }}>{ITEM.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 28,
                      letterSpacing: 4,
                      color: "#111",
                      userSelect: "none",
                    }}
                  >
                    {ITEM.label}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 14,
                    letterSpacing: 2,
                    color: "rgba(0,0,0,0.45)",
                    userSelect: "none",
                  }}
                >
                  {ITEM.handle}
                </div>
              </div>

              {/* STATS */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 24, flexShrink: 0 }}>
                {ITEM.stats.map(s => (
                  <div key={s.tag} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 9, letterSpacing: 1.5, padding: "1px 4px", border: `1px solid ${s.color}`, color: s.color, lineHeight: 1.4, userSelect: "none" }}>{s.tag}</span>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, fontStyle: "italic", color: "#111", letterSpacing: 1, userSelect: "none" }}>{s.value}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2, width: "100%" }}>
                      <div style={{ height: 3, background: s.color, width: "100%" }} />
                      <div style={{ height: 2, background: "#000", width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT NAV LABEL ── */}
      {mounted && (
        <div
          className="gh-nav-pop"
          style={{
            position: "fixed",
            top: 40, right: 40,
            display: "flex",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          <span className="gh-arrow-left" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#c4001a" }}>◄</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 100, letterSpacing: 3, lineHeight: 1, color: "#fff", WebkitTextStroke: "2px #000", userSelect: "none" }}>LB</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 3, color: "#111", padding: "0 8px", userSelect: "none" }}>GITHUB</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 100, letterSpacing: 3, lineHeight: 1, color: "#fff", WebkitTextStroke: "2px #000", userSelect: "none" }}>RB</span>
          <span className="gh-arrow-right" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#c4001a" }}>►</span>
        </div>
      )}

      {/* ── LINK BAR ── */}
      {mounted && (
        <div
          className="gh-infobar-in"
          onClick={() => { setFocused(true); window.open(ITEM.links[0].url, "_blank"); }}
          onMouseEnter={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          style={{
            position: "fixed",
            right: 0,
            left: "65%",
            top: 155,
            height: 46,
            background: focused ? "#111" : "transparent",
            padding: focused ? "1.5px" : 0,
            borderRadius: focused ? 8 : 0,
            pointerEvents: "all",
            cursor: "pointer",
            zIndex: 50,
            transition: "background 0.15s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: focused ? "#fff" : "transparent",
              borderRadius: focused ? 7 : 0,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {focused && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#c4001a", zIndex: 1 }} />
            )}

            <img
              src={ITEM.barIcon}
              alt=""
              style={{ height: "55%", width: "auto", flexShrink: 0, marginLeft: 14, objectFit: "contain" }}
            />

            <span style={{ flex: 1, fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, color: "#111", padding: "0 14px", userSelect: "none" }}>
              GITHUB PROFILE
            </span>

            <span style={{ height: "70%", background: "#000", display: "flex", alignItems: "center", padding: "0 12px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1, color: "#fff", flexShrink: 0, borderRadius: 6, marginRight: 4, userSelect: "none" }}>
              OPEN
            </span>
          </div>
        </div>
      )}

      {/* FOOTER HINTS */}
      <div
        style={{
          position: "fixed",
          bottom: 20, right: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          fontFamily: "'Bebas Neue', sans-serif",
          zIndex: 50,
          pointerEvents: "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        {[["→", "LINK"], ["↵", "OPEN"], ["ESC", "BACK"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}