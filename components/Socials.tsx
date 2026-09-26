"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

// P3R party-banner shards sliced from T_UI_Camp_07 — one varied colour per link
const CHARS = [
  "/images/shards/cyan.png",   // LinkedIn  — MC blue
  "/images/shards/yellow.png", // GitHub    — Aigis gold
  "/images/shards/pink.png",   // Instagram — magenta
  "/images/shards/red.png",    // Email     — red
];

const ITEMS = [
  {
    id: "linkedin",
    label: "LINKEDIN",
    logo: "linkedin",
    accent: "#48d2ff",
    href: "https://www.linkedin.com/in/bhargav-kundu-89b788278",
    handle: "Bhargav Kundu",
    links: [
      { label: "PROFILE", url: "https://www.linkedin.com/in/bhargav-kundu-89b788278" },
    ],
  },
  {
    id: "github",
    label: "GITHUB",
    logo: "github",
    accent: "#e8c100",
    href: "https://github.com/7Bhargav7",
    handle: "@7Bhargav7",
    links: [
      { label: "PROFILE", url: "https://github.com/7Bhargav7" },
    ],
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    logo: "instagram",
    accent: "#d63bd6",
    href: "https://www.instagram.com/bzekai_7",
    handle: "@bzekai_7",
    links: [
      { label: "PROFILE", url: "https://www.instagram.com/bzekai_7" },
    ],
  },
  {
    id: "email",
    label: "EMAIL",
    logo: "email",
    accent: "#e8002d",
    href: "mailto:bhargavkundu9862@gmail.com",
    handle: "bhargavkundu9862@gmail.com",
    links: [
      { label: "COMPOSE", url: "mailto:bhargavkundu9862@gmail.com" },
    ],
  },
];

// ── BRAND LOGOS (inline white SVG, recolourable via `color`) ───────────────────

const LOGO_PATHS: Record<string, string> = {
  linkedin: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  github: "M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.3.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3z",
  instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.36 2.67.94 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.8.72 1.47 1.38 2.13.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.8-.3 1.47-.72 2.13-1.38.66-.66 1.08-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.8-.72-1.47-1.38-2.13A5.9 5.9 0 0019.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

// Floating P3R "shatter" particles that fly off the right edge of the active bar.
// Each value is in vw so they scale with the bars. tx/ty = drift, r = base rotation.
const SHARD_FIELD = [
  { top: "8%",  w: 0.9,  h: 0.55, tx: 5.2, ty: -2.6, r: 18,  dur: 2.4, delay: 0,    clip: "polygon(0 0, 100% 28%, 62% 100%)" },
  { top: "62%", w: 1.3,  h: 0.8,  tx: 6.4, ty: 2.2,  r: -22, dur: 2.9, delay: 0.35, clip: "polygon(0 18%, 100% 0, 78% 100%)" },
  { top: "30%", w: 0.6,  h: 0.4,  tx: 4.1, ty: -0.6, r: 40,  dur: 2.1, delay: 0.6,  clip: "polygon(0 0, 100% 50%, 0 100%)" },
  { top: "82%", w: 0.75, h: 0.5,  tx: 5.7, ty: 3.4,  r: -10, dur: 3.2, delay: 0.15, clip: "polygon(0 0, 100% 22%, 40% 100%)" },
  { top: "44%", w: 1.0,  h: 0.62, tx: 7.0, ty: 0.4,  r: 30,  dur: 2.6, delay: 0.5,  clip: "polygon(0 30%, 100% 0, 88% 100%)" },
  { top: "18%", w: 0.5,  h: 0.34, tx: 4.6, ty: -1.8, r: -34, dur: 2.0, delay: 0.85, clip: "polygon(0 0, 100% 50%, 30% 100%)" },
];

function Shards({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "44vw",
        width: "10vw",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {SHARD_FIELD.map((s, i) => (
        <div
          key={i}
          className={active ? "sc-shard" : undefined}
          style={{
            position: "absolute",
            top: s.top,
            left: 0,
            width: `${s.w}vw`,
            height: `${s.h}vw`,
            background: accent,
            clipPath: s.clip,
            filter: `drop-shadow(0 0 0.28vw ${accent})`,
            ["--tx" as string]: `${s.tx}vw`,
            ["--ty" as string]: `${s.ty}vw`,
            ["--r" as string]: `${s.r}deg`,
            ["--dur" as string]: `${s.dur}s`,
            ["--delay" as string]: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ id, color, size = "1.94vw" }: { id: string; color: string; size?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size, flexShrink: 0, transition: "fill 0.2s ease, width 0.2s ease, height 0.2s ease" }}>
      <path d={LOGO_PATHS[id]} />
    </svg>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Socials({ onBack }: { onBack?: () => void }) {

  const [active, setActive]           = useState(0);
  const [mounted, setMounted]         = useState(false);
  const [activeLink, setActiveLink]   = useState(0);
  const [focus, setFocus]             = useState<"left" | "right">("left");

  // mailto: must navigate the current document — window.open(_blank) just opens a dead tab
  const openLink = (url: string) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (focus === "left") {

        if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));

        if (e.key === "ArrowRight") {
          setFocus("right");
          setActiveLink(0);
        }

        if (e.key === "Enter") {
          openLink(ITEMS[active].href);
        }

      } else {

        const linkCount = ITEMS[active].links.length;
        if (e.key === "ArrowUp")   setActiveLink(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveLink(i => Math.min(linkCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");

        if (e.key === "Enter") {
          openLink(ITEMS[active].links[activeLink].url);
        }

      }

    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, [active, focus, activeLink]);

  const item = ITEMS[active];

  return (
    <div className="absolute inset-0 overflow-hidden" id="socials-screen">

      {/* BG VIDEO */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/status.enhanced.mp4" type="video/mp4" />
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
          animation: "socials-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/status.enhanced.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        @keyframes socials-entry-reveal {
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
        @keyframes sc-shard-float {
          0%   { opacity: 0; transform: translate(0, 0) rotate(var(--r)) scale(0.6); }
          18%  { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(calc(var(--r) + 55deg)) scale(1); }
        }
        .sc-shard { animation: sc-shard-float var(--dur) ease-out infinite; animation-delay: var(--delay); will-change: transform, opacity; }
        .sc-arrow-left  { animation: sc-arrow-left  0.8s ease-in-out infinite; display: inline-block; }
        .sc-arrow-right { animation: sc-arrow-right 0.8s ease-in-out infinite; display: inline-block; }
        .sc-right-nav-pop { animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .sc-infobar-in { animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── LEFT: BAR LIST ── */}
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
          gap: "0.42vw",
        }}
      >
        {ITEMS.map((it, i) => {

          const isActive = active === i;

          return (
            <div
              key={it.id}
              onClick={() => {
                if (isActive) openLink(it.href);
                else { setActive(i); setFocus("left"); }
              }}
              onMouseEnter={() => setActive(i)}
              style={{
                position: "relative",
                flexShrink: 0,
                pointerEvents: "all",
                cursor: "pointer",
                transform: mounted ? "translateX(0)" : "translateX(-100%)",
                transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, filter 0.25s ease`,
                filter: isActive ? `drop-shadow(0 0 16px ${it.accent}) drop-shadow(0 0 5px ${it.accent})` : "none",
              }}
            >

              {/* ACCENT UNDERLAY — peeks out on active, coloured per link */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "45vw",
                  height: isActive ? "6.24vw" : "4.43vw",
                  background: it.accent,
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 0.69vw) 100%)",
                  transform: "translateY(-0.49vw)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* MAIN BAR */}
              <div
                style={{
                  position: "relative",
                  width: "45vw",
                  height: isActive ? "6.24vw" : "4.43vw",
                  background: "#111",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 0.97vw) 100%, 0 100%)",
                  boxShadow: "0 0.4vw 1.7vw rgba(0,0,0,0.65)",
                  transition: "height 0.3s cubic-bezier(0.22,1,0.36,1)",
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
                    clipPath: isActive
                      ? "polygon(22% 0, 100% 0, calc(100% - 0.97vw) 100%, calc(22% + 9.56vw) 100%)"
                      : "polygon(100% 0, 100% 0, calc(100% - 2.22vw) 100%, calc(100% - 2.22vw) 100%)",
                    transition: "clip-path 0.35s cubic-bezier(0.22,1,0.36,1)",
                    zIndex: 0,
                  }}
                />

                {/* CHARACTER SHARD */}
                <img
                  src={CHARS[i]}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    height: "100%", width: "auto", maxWidth: "15.94vw",
                    objectFit: "cover", objectPosition: "left top",
                    pointerEvents: "none",
                    zIndex: 3,
                    clipPath: "polygon(0 0%, 100% 0%, calc(100% - 1.66vw) 100%, 0% 100%)",
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
                    padding: "0 1.39vw",
                  }}
                >

                  {/* spacer reserving the shard column */}
                  <div style={{ width: "13.86vw", flexShrink: 0 }} />

                  {/* LABEL + HANDLE (slanted, P3R mockup type) */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.14vw" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-anton), sans-serif",
                        fontSize: "2.36vw",
                        letterSpacing: "0.14vw",
                        transform: "skewX(-9deg)",
                        color: isActive ? "#111" : "rgba(255,255,255,0.88)",
                        transition: "color 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      {it.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-bebas-neue), sans-serif",
                        fontSize: "1.04vw",
                        letterSpacing: "0.14vw",
                        fontWeight: 700,
                        transform: "skewX(-9deg)",
                        color: it.accent,
                        maxHeight: isActive ? "1.52vw" : 0,
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      {it.handle}
                    </span>
                  </div>

                  {/* BRAND LOGO — right corner of the box */}
                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center", paddingRight: "1.25vw" }}>
                    <Logo id={it.logo} color={isActive ? "#111" : "#fff"} size={isActive ? "2.22vw" : "1.94vw"} />
                  </div>

                </div>

              </div>

              {/* FLOATING SHATTER SHARDS — fly off the right edge on active */}
              <Shards accent={it.accent} active={isActive} />
            </div>
          );

        })}
      </div>

      {/* ── RIGHT NAV HEADER — platform name leads, LB/RB recede ── */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            top: "5.67vh", right: "3.88vw",
            width: "34vw",
            minWidth: "26vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {/* nav row: ◄ LB · NAME · RB ► — legibility from text outline, no panel */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.52vw", padding: "0.42vw 0.28vw 0.69vw" }}>

            <span
              style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "1.45vw",
                letterSpacing: "0.21vw",
                color: "#fff",
                WebkitTextStroke: "0.07vw rgba(8,10,20,0.9)",
                paintOrder: "stroke fill",
                textShadow: "0 0.07vw 0.28vw rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                gap: "0.49vw",
                userSelect: "none",
              }}
            >
              <span className="sc-arrow-left" style={{ fontSize: "0.97vw" }}>◄</span> LB
            </span>

            <div key={active} className="sc-right-nav-pop" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.49vw" }}>
              <span
                style={{
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "3.05vw",
                  letterSpacing: "0.28vw",
                  lineHeight: 1,
                  transform: "skewX(-9deg)",
                  color: item.accent,
                  WebkitTextStroke: "0.087vw rgba(8,10,20,0.92)",
                  paintOrder: "stroke fill",
                  textShadow: `0 0.07vw 0.42vw rgba(0,0,0,0.85), 0 0 1.39vw ${item.accent}55`,
                  userSelect: "none",
                }}
              >
                {item.label}
              </span>
              {/* accent underline — short, centered */}
              <div
                style={{
                  width: "4.02vw",
                  height: "0.21vw",
                  background: item.accent,
                  boxShadow: `0 0 0.69vw ${item.accent}, 0 0.07vw 0.21vw rgba(0,0,0,0.8)`,
                  transform: "skewX(-9deg)",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "var(--font-bebas-neue), sans-serif",
                fontSize: "1.45vw",
                letterSpacing: "0.21vw",
                color: "#fff",
                WebkitTextStroke: "0.07vw rgba(8,10,20,0.9)",
                paintOrder: "stroke fill",
                textShadow: "0 0.07vw 0.28vw rgba(0,0,0,0.85)",
                display: "flex",
                alignItems: "center",
                gap: "0.49vw",
                userSelect: "none",
              }}
            >
              RB <span className="sc-arrow-right" style={{ fontSize: "0.97vw" }}>►</span>
            </span>
          </div>
        </div>
      )}

      {/* ── RIGHT: ACTION BANNER — leaning, layered Persona shard ── */}
      {mounted && item.links.map((link, i) => {
        const live = focus === "right" && activeLink === i;
        return (
          <div
            key={`${active}-${i}`}
            className="sc-infobar-in"
            onClick={() => {
              setFocus("right");
              setActiveLink(i);
              openLink(link.url);
            }}
            onMouseEnter={() => { setFocus("right"); setActiveLink(i); }}
            onMouseLeave={() => setFocus("left")}
            style={{
              position: "fixed",
              right: "3.88vw",
              top: `${16.26 + i * 8.62}vh`,
              width: "34vw",
              minWidth: "26vw",
              height: "4.02vw",
              pointerEvents: "all",
              cursor: "pointer",
              zIndex: 50,
              animationDelay: `${i * 50}ms`,
              filter: live ? `drop-shadow(0 0 0.97vw ${item.accent}aa)` : "none",
              transition: "filter 0.25s ease",
            }}
          >
            {/* ACCENT SHARD — peeks bottom-right behind the panel */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: item.accent,
                clipPath: "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
                transform: "translate(0.55vw, 0.49vw)",
                opacity: live ? 1 : 0.55,
                transition: "opacity 0.2s ease",
              }}
            />

            {/* MAIN PANEL — sheared parallelogram, leans with the cards */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: live ? "#fafbff" : "rgba(10,15,28,0.82)",
                clipPath: "polygon(1.39vw 0, 100% 0, calc(100% - 1.11vw) 100%, 0 100%)",
                boxShadow: "0 0.42vw 1.52vw rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                transition: "background 0.2s ease",
              }}
            >
              {/* accent edge sliver on the left lean */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "0.35vw", background: item.accent, transform: "skewX(-20deg)", transformOrigin: "top", opacity: 0.9 }} />

              {/* icon chip */}
              <div
                style={{
                  marginLeft: "1.8vw",
                  width: "2.36vw", height: "2.36vw",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.accent,
                  clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
                }}
              >
                <Logo id={item.logo} color="#fff" size="1.39vw" />
              </div>

              {/* action label */}
              <span
                style={{
                  flex: 1,
                  marginLeft: "1.11vw",
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "1.59vw",
                  letterSpacing: "0.14vw",
                  transform: "skewX(-9deg)",
                  color: live ? "#0a0f1c" : "rgba(255,255,255,0.9)",
                  transition: "color 0.2s ease",
                  userSelect: "none",
                }}
              >
                {link.label}
              </span>

              {/* OPEN → */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55vw",
                  paddingRight: "1.8vw",
                  flexShrink: 0,
                  fontFamily: "var(--font-bebas-neue), sans-serif",
                  fontSize: "1.45vw",
                  letterSpacing: "0.14vw",
                  color: live ? item.accent : "rgba(255,255,255,0.55)",
                  transition: "color 0.2s ease",
                  userSelect: "none",
                }}
              >
                OPEN <span className={live ? "sc-arrow-right" : ""} style={{ fontSize: "1.18vw" }}>→</span>
              </span>
            </div>
          </div>
        );
      })}

      {/* FOOTER HINTS */}
      <div
        style={{
          position: "fixed",
          bottom: "9vh", right: "1.94vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.35vw",
          fontFamily: "var(--font-bebas-neue), sans-serif",
          zIndex: 50,
          pointerEvents: "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        {[["↑↓", "SELECT"], ["→", "LINKS"], ["↵", "OPEN"], ["ESC", "BACK"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.55vw", fontSize: "0.9vw", letterSpacing: "0.14vw", color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "0.07vw 0.42vw", fontSize: "0.76vw" }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* BACK TO MENU */}
      <button
        onClick={() => onBack?.()}
        style={{
          position: "fixed", bottom: "2.4vh", right: "1.94vw", zIndex: 60,
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
