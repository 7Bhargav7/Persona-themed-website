"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Resume from "./Resume";
import Github from "./Github";
import Socials from "./Socials";
import SideProjects from "./Sideprojects";
import Transition from "./Transition";
import { useIsMobile } from "./useIsMobile";

const TRACKS = [
  "/audio/reloadost-1.mp3",
  "/audio/reloadost-2.mp3",
  "/audio/reloadost-3.mp3",
  "/audio/reloadost-4.mp3",
];
const menuItems = [
  { label: "ABOUT",    screen: "about"    },
  { label: "RESUME",   screen: "resume"   },
  { label: "PROJECTS", screen: "sideproj" },
  { label: "SOCIAL LINKS", screen: "socials"  },
];

type Variant = "panel" | "resume" | "stripes" | "default";

const VARIANT_MAP: Record<string, Variant> = {
  about:    "default",
  menu:     "panel",
  resume:   "default",
  github:   "default",
  socials:  "default",
  sideproj: "default",
};

const triClip = (w: number, h: number) =>
  `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

export default function Menu() {

  const isMobile = useIsMobile();

  const [started, setStarted]             = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [menuVidReady, setMenuVidReady]   = useState(false);

  // Fully preload the menu videos into memory (blob) so playback never buffers/jitters on first run
  const introBlobRef = useRef<string | null>(null);
  const loopBlobRef  = useRef<string | null>(null);
  const [vidsReady, setVidsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [intro, loop] = await Promise.all([
          fetch("/videos/menu-intro.mp4").then(r => r.blob()),
          fetch("/videos/menu.mp4").then(r => r.blob()),
        ]);
        if (cancelled) return;
        introBlobRef.current = URL.createObjectURL(intro);
        loopBlobRef.current  = URL.createObjectURL(loop);
      } catch {
        // fall back to streaming straight from the network paths
      } finally {
        if (!cancelled) setVidsReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);
  const [showMenu, setShowMenu]           = useState(false);
  const [active, setActive]               = useState(0);
  const [animKey, setAnimKey]             = useState(0);
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use a ref for variant so it's always current when Transition mounts
  const variantRef = useRef<Variant>("panel");
  const [transitionVariant, setTransitionVariant] = useState<Variant>("panel");

  const [randomTrack, setRandomTrack] = useState(TRACKS[0]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const track = TRACKS[Math.floor(Math.random() * TRACKS.length)];
    setRandomTrack(track);
    // Must reload the element so it picks up the new src
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const activate = (idx: number) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  /* ---------------- START ---------------- */

  const handleStart = async () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      try { await audioRef.current.play(); } catch {}
    }
  };

  /* ---------------- MENU DELAY ---------------- */

  useEffect(() => {
    if (!started) return;
    if (currentScreen === "menu") {
      setShowMenu(false);
      const timer = setTimeout(() => setShowMenu(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, started]);

  /* ---------------- SFX ---------------- */

  const playNavigationSfx = () => {
    const sfx = new Audio("/sfx/deck_ui_navigation.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  const playSelectSfx = () => {
    const sfx = new Audio("/sfx/selectSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  /* ---------------- TRANSITION ---------------- */

  const transitionTo = (screen: string, skipSelectSfx = false) => {
    if (isTransitioning) return;

    if (!skipSelectSfx) playSelectSfx();

    // Set the variant on the ref AND state synchronously before mounting
    const variant = VARIANT_MAP[screen] ?? "default";
    variantRef.current = variant;
    setTransitionVariant(variant);

    // Small rAF delay ensures the state has flushed before Transition mounts
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    const swapDelay = screen === "menu" ? 580 : 220;
    setTimeout(() => {
      if (screen === "menu") {
        setIntroFinished(false);
        setMenuVidReady(false);
        setShowMenu(false);
        setActive(0);
      }
      setCurrentScreen(screen);
    }, swapDelay);

    const panelHoldExtra = screen === "menu" ? 1500 : 0;
    const unmountDelay = screen === "menu" ? 1200 + panelHoldExtra : 650;
    setTimeout(() => setIsTransitioning(false), unmountDelay);
  };

  const backToMenu = () => {
    const sfx = new Audio("/sfx/closeSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
    transitionTo("menu", true);
  };

  /* ---------------- KEYBOARD ---------------- */

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape" && currentScreen !== "menu") {
        const sfx = new Audio("/sfx/closeSfx.wav");
        sfx.volume = 0.85;
        sfx.play().catch(() => {});
        transitionTo("menu", true);
        return;
      }

      if (currentScreen === "menu") {
        if (e.key === "ArrowDown") {
          playNavigationSfx();
          activate(Math.min(menuItems.length - 1, active + 1));
        }
        if (e.key === "ArrowUp") {
          playNavigationSfx();
          activate(Math.max(0, active - 1));
        }
        if (e.key === "Enter") {
          transitionTo(menuItems[active].screen);
        }
      }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentScreen, isTransitioning, started, active]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <audio ref={audioRef} loop preload="auto">
        <source src={randomTrack} type="audio/mpeg" />
      </audio>

      {/* ── SPLASH ── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onPointerDown={handleStart}
            className="absolute inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
            style={{ background: "#000", touchAction: "manipulation" }}
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontFamily: "Persona", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "#67e8f9", letterSpacing: "0.2em" }}
            >
              PRESS START
            </motion.div>
            <div style={{ marginTop: 16, fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              CLICK OR TAP ANYWHERE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>

          {/* WHITE BACKDROP — fills the space opened up on the left */}
          {currentScreen === "menu" && (
            <div className="absolute inset-0" style={{ background: "#ffffff", zIndex: 0 }} />
          )}

          {/* LOOP VIDEO — always mounted & playing underneath, so the intro→loop handoff has no gap/flash */}
          {currentScreen === "menu" && vidsReady && (
            <video
              autoPlay loop muted playsInline preload="auto"
              src={loopBlobRef.current ?? "/videos/menu.mp4"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: isMobile ? "none" : "translateX(15%)", objectPosition: isMobile ? "22% center" : "center", zIndex: 1 }}
            />
          )}

          {/* INTRO VIDEO — on top; hidden until it can play, then fades OUT when it ends (loop already running behind) */}
          {currentScreen === "menu" && vidsReady && (
            <video
              autoPlay muted playsInline preload="auto"
              src={introBlobRef.current ?? "/videos/menu-intro.mp4"}
              onCanPlayThrough={() => setMenuVidReady(true)}
              onPlaying={() => setMenuVidReady(true)}
              onEnded={() => setIntroFinished(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: isMobile ? "none" : "translateX(15%)",
                objectPosition: isMobile ? "22% center" : "center",
                zIndex: 2,
                opacity: introFinished ? 0 : (menuVidReady ? 1 : 0),
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── MENU ── */}
          {showMenu && currentScreen === "menu" && (
            <>
              {/* ── OVERSIZED VERTICAL "BHARGAV" — far-left graphic element ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={isMobile ? {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "2.5vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 6,
                  pointerEvents: "none",
                  userSelect: "none",
                  overflow: "visible",
                } : {
                  position: "absolute",
                  left: "-1vw",
                  top: 0,
                  height: "100vh",
                  width: "20vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 6,
                  pointerEvents: "none",
                  userSelect: "none",
                  overflow: "visible",
                }}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? "16vw" : "35vh",
                  letterSpacing: isMobile ? "0.02em" : "0",
                  lineHeight: 1,
                  color: "#0a0f1c",
                  whiteSpace: "nowrap",
                  transform: isMobile ? "none" : "rotate(-90deg)",
                }}>
                  BHARGAV
                </span>
              </motion.div>

              {/* ── WALLET / STATUS BOX — top-left HUD ── */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={isMobile ? {
                  position: "absolute",
                  top: "13vh",
                  right: "4vw",
                  zIndex: 25,
                  background: "#ffffff",
                  border: "2px solid #0a0f1c",
                  padding: "2vw 3vw 2.4vw",
                  width: "40vw",
                  pointerEvents: "none",
                } : {
                  position: "absolute",
                  top: "7vh",
                  left: "20vw",
                  zIndex: 25,
                  background: "#ffffff",
                  border: "2px solid #0a0f1c",
                  padding: "0.7vw 1.1vw 0.9vw",
                  width: "15vw",
                  pointerEvents: "none",
                }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "7vw" : "2.6vw", lineHeight: 0.95, color: "#0a0f1c", letterSpacing: "0.02em" }}>
                  ₹0
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "2.6vw" : "0.85vw", letterSpacing: "0.22em", color: "#2a3340", marginTop: 1 }}>
                  CURRENT WALLET
                </div>
                <div style={{ height: 2, background: "#0a0f1c", margin: isMobile ? "1.6vw 0 1.4vw" : "0.6vw 0 0.5vw" }} />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "2.6vw" : "0.85vw", letterSpacing: "0.22em", color: "#2a3340" }}>
                  STATUS
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? "4.4vw" : "1.55vw", letterSpacing: "0.08em", color: "#1f6fb2", lineHeight: 1 }}>
                  SEEKING
                </div>
                {/* corner wedge */}
                <div style={{ position: "absolute", right: 0, bottom: 0, width: 0, height: 0, borderLeft: "14px solid transparent", borderBottom: "14px solid #0a0f1c" }} />
              </motion.div>

              {/* ── RIGHT BLOCK: navigation ── */}
              <div
                style={isMobile ? {
                  position: "absolute",
                  bottom: "6vh",
                  left: "5vw",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pointerEvents: "none",
                } : {
                  position: "absolute",
                  top: "30vh",
                  left: "56vw",
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pointerEvents: "none",
                }}
              >
                {/* NAVIGATION STACK */}
                <nav
                  style={{
                    marginTop: "0",
                    marginLeft: "1vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    transform: "skewX(-9deg)",
                    pointerEvents: "auto",
                  }}
                >
                  {menuItems.map((item, i) => {

                    const isActive = active === i;

                    return (
                      <div
                        key={item.label}
                        onClick={() => { activate(i); transitionTo(item.screen); }}
                        onMouseEnter={() => { activate(i); playNavigationSfx(); }}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          padding: "0.02em 1.5em 0.02em 0.35em",
                          lineHeight: 0.94,
                          marginTop: isActive ? "0.16em" : "0em",
                          marginBottom: isActive ? "0.52em" : "0em",
                          transition: "margin 0.18s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >

                        {/* RED UNDERLAY — sits behind the white panel and peeks out (offset down-right) */}
                        <div style={{
                          position: "absolute",
                          left: "-0.24em",
                          right: "-0.7em",
                          top: "6%",
                          bottom: "-12%",
                          background: "#e8002d",
                          transformOrigin: "left center",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transition: "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
                          zIndex: 0,
                          pointerEvents: "none",
                        }} />

                        {/* WHITE SELECTION PANEL */}
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: "#ffffff",
                          transformOrigin: "left center",
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                          transition: "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
                          zIndex: 1,
                        }} />

                        {/* LABEL */}
                        <span style={{
                          position: "relative",
                          zIndex: 2,
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: isMobile ? "clamp(2rem, 9vw, 3.2rem)" : "clamp(2.6rem, 6.25vw, 7.5rem)",
                          letterSpacing: "0.01em",
                          whiteSpace: "nowrap",
                          userSelect: "none",
                          color: isActive ? "#0a0f1c" : "#48d2ff",
                          transform: isActive ? "scale(1.04)" : "scale(1)",
                          transformOrigin: "left center",
                          transition: "color 0.14s ease, transform 0.16s ease",
                        }}>
                          {item.label}
                        </span>

                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* ── CONTROLS — bottom-right HUD (desktop only) ── */}
              {!isMobile && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 28, right: 36,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 7,
                  fontFamily: "'Bebas Neue', sans-serif",
                  pointerEvents: "none",
                }}
              >
                {[["↑↓", "NAVIGATE"], ["A", "CONFIRM"], ["ESC", "BACK"]].map(([key, label]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, letterSpacing: "0.18em", color: "rgba(220,240,255,0.55)" }}>
                    <span style={{ border: "1px solid rgba(220,240,255,0.4)", padding: "1px 8px", fontSize: 14, minWidth: 30, textAlign: "center" }}>{key}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>}
            </>
          )}

          {/* SCREENS */}
          {currentScreen === "about"   && <About onBack={backToMenu} />}
          {currentScreen === "resume"  && <Resume onBack={backToMenu} />}
          {currentScreen === "github"  && <Github />}
          {currentScreen === "socials"   && <Socials onBack={backToMenu} />}
          {currentScreen === "sideproj"  && <SideProjects onBack={backToMenu} />}

          {/* TRANSITION — key forces remount when variant changes */}
          {isTransitioning && (
            <Transition
              key={transitionVariant}
              variant={transitionVariant}
            />
          )}

        </>
      )}

    </main>
  );
}