# Bhargav's Persona — Project Status

**Last updated:** 2026-06-14 (session 2)
**What it is:** A Persona 3 Reload–themed personal portfolio (personal site, not TraceGI).
**Owner:** Bhargav Kundu

---

## How to run
```powershell
cd C:\Users\Zykan\Documents\bhargav-persona
npm run dev        # → http://localhost:3000
```
Next.js 16 + TypeScript + framer-motion. **Almost the entire design lives in `components/Menu.tsx`.**

> ⚠️ **Always judge the design at 100% browser zoom.** All elements use viewport units (`vw`/`vh`) so they scale together. If something "only looks right" at 80%/125% zoom, the *size value* is wrong — fix the value, don't rely on zoom.

---

## ✅ DONE — Home / main menu screen

Cloned from `mikedimeji/persona-portfolio` (based on `blairxu13/persona3-website`) and heavily reworked to match Bhargav's own Figma design. Current composition (left → right):

| Element | Spec (in `Menu.tsx`) |
|---|---|
| **Character video** | `menu.mp4` / `menu-intro.mp4`, `translateX(15%)` to open white space on the left; white backdrop behind (`zIndex 0`, video `zIndex 1`). |
| **Vertical BHARGAV** | far-left, full height. `font-size: 35vh`, Bebas Neue, `rotate(-90deg)`, color `#0a0f1c`. Container `left:-1vw; width:20vw; height:100vh`. |
| **Wallet HUD** | top-left (right of BHARGAV). `top:7vh; left:20vw; width:15vw`, white box w/ `2px solid #0a0f1c` border + bottom-right corner wedge. Content: `₹0` (2.6vw) / `CURRENT WALLET` (0.85vw) / divider / `STATUS` (0.85vw) / `SEEKING` (1.55vw, blue `#1f6fb2`). All Bebas Neue. |
| **Menu** | right side. Container `top:30vh; left:56vw`. `<nav>` has `transform: skewX(-9deg)` (the lean — applied in CODE because Figma can't skew). Items: Bebas Neue, `font-size: clamp(2.6rem, 6.25vw, 7.5rem)`, `letter-spacing:0.01em`, cyan `#48d2ff`. |
| **Active menu item** | white panel (`scaleX` in) + text turns `#0a0f1c` + **horizontal red bar** `#e8002d` (`top:60%`, `height:10`, `width:112%`, `zIndex:1`) sitting under the text and poking past the right edge. (NOT the diagonal slash — that was rejected.) |
| **Controls** | bottom-right HUD: `↑↓ NAVIGATE / A CONFIRM / ESC BACK`, Bebas Neue, low opacity. |

**Removed by choice:** the big serif `PERSONA` title (dropped 2026-06-13). The word "PERSONA" now appears nowhere; BHARGAV is the hero graphic.

### Colors
- Cyan text `#48d2ff` · white `#ffffff` · red accent `#e8002d` · dark navy `#0a0f1c` · status blue `#1f6fb2`

### Fonts (`app/layout.tsx` + `app/globals.css`)
- **Bebas Neue** (Google) — menu, wallet, BHARGAV, controls. *(only weight: Regular)*
- **Playfair Display** (Google, Black Italic) — was the PERSONA title; currently unused but still loaded.
- **Persona** (`persona.ttf`) — only the "PRESS START" splash.
- **Skip** (`FOT-Skip Std B.otf`) — registered, currently unused (the real P3R UI font, kept for later).

---

## 🎨 Figma — design source of truth
- File: `https://www.figma.com/design/KSl6F92iEob6sGjMn12ZtP/Untitled?node-id=0-1`
- Frame `1:2` ("Slide 16:9 - 1", 1920×1080). Menu is a real text node (`4:5`): Bebas Neue, **150px**, `#48d2ff`, tracking 1.5px, line-height 0.95.
- Connected via the **official Figma MCP connector** (read design straight from the file). Bhargav's account is a **student/View seat** → the local "Dev Mode MCP Server" toggle is unavailable, so use the **cloud connector + frame URL** (works fine).
- Assets also copied to `C:\Users\Zykan\Documents\persona-figma-assets`.

> Note: menu in code is `6.25vw` (~120px), not 150px — deliberately ~80% of Figma because Bhargav views Brave at a zoom where 150px rendered too large. Treat 100% zoom as truth.

---

## ✅ DONE — Resume screen (`components/Resume.tsx`)

Fully wired with **Bhargav's real (security/infrastructure) resume** — all of Michael Oladimeji's data replaced.

**Card order — reordered to lead with the strongest:** EXPERIENCE → SKILLS → PROJECTS → EDUCATION. One-line flip in the `ITEMS` array if we ever want Education-first again.

**Three index-aligned data blocks at the top of the file drive everything** (edit content here, NOT the JSX):
- `ITEMS` — the 4 left-list cards (badge, title, subtitle, rank).
- `SUMMARY_PANELS` — the default right-panel per card (top bar + rows + optional bottom highlight box).
- `EXPANDED_PANELS` — the "FULL DETAIL" view per card (sections of bullets).
- Same order, 4 entries each — keep them in sync.

**Content:**
- **Experience:** TraceGI (flagship, 5 bullets) · Northeast Store (freelance, *sister company of TraceGI*, incl. one creative-overhaul bullet) · MeECL intern (Snort 3 in state power grid).
- **Skills:** Security Ops / Infra & Cloud / Languages & Scripting / AI-Native Development.
- **Projects:** NIDS major project (leads with F1 94.32%) · Azure Sentinel honeypot (200+ alerts).
- **Education:** B.Tech KIIT (CGPA **7.15**) → KV Shillong XII (8.7) → KV Shillong X (7.9) → eJPT (Certified). DETAILS box **removed** — it duplicated the rows.

**Interaction — made mouse-first this session (keyboard still fully works):**
- `FULL DETAIL →` and `← SUMMARY` are now real **clickable buttons** (were faint keyboard hints).
- Footer keyboard cluster (↑↓ / → / ESC) replaced by a single red **`← BACK TO MENU`** button.
- `Resume` now takes an **`onBack` prop**; `Menu.tsx` passes a handler that plays the close-sfx and transitions to the menu (same behavior as ESC). **⭐ This is the pattern to replicate on the other screens** when making them mouse-first.
- Summary panel now **sizes to its content** (`maxHeight: 82vh` + scroll) instead of a forced `74vh` — that forced height was pushing FULL DETAIL down onto BACK TO MENU (the overlap bug). Fixed.

> **Parked decision:** the other 3 cards still have their summary highlight boxes (HIGHLIGHTS / ALSO IN THE KIT / NIDS HIGHLIGHTS), which add info not in the rows. Keep them, or strip for a uniform look? Undecided.

---

## ✅ DONE — SOCIAL LINKS screen (`components/Socials.tsx`) — 2026-06-14

The old CONTACT/Socials screen is now the **SOCIAL LINKS** screen and the menu was consolidated.
- **Menu** (`Menu.tsx`) is now **ABOUT · RESUME · PROJECTS · SOCIAL LINKS** — the standalone **GITHUB** and **CONTACT** items were removed; GitHub is folded in as a row. Renamed `LINKS → SOCIAL LINKS` 2026-06-14 to stay true to Persona typography. `screen "socials"`. `components/Github.tsx` is now **dead/unreferenced** (can delete later).
- **4 rows, real handles:** LinkedIn (`/in/bhargav-kundu-89b788278`, "Bhargav Kundu") · GitHub (`@7Bhargav7`) · Instagram (`@bzekai_7`) · Email (`bhargavkundu9862@gmail.com`). **No YouTube, no Discord** (both declined). Email confirmed = **9862** (not the 5 address).
- **Character shards** = P3R party-banner shards. Pipeline: Bhargav crops/frames each in an editor → exports one **SVG** (`~/Downloads/persona.svg`, embeds the 2048² atlas as base64 + clip geometry — NOT pre-sliced) → Claude rasterizes with **Node + sharp** (run from project dir, abs paths, `density:300`) → `.extract()` bands + `.trim()` (alpha-based) → `public/images/shards/*.png`. Current: `cyan`(MC)→LinkedIn, `yellow`(Aigis)→GitHub, `pink`→Instagram, `red`→Email; `green`+`dog` sliced as spares. Black-sweep banners come from atlas **`T_UI_Camp_06`** (black version); `_07` is the transparent-coloured one.
- **Design (agreed w/ Bhargav, per his "SOCIAL LINKS" concept mockup):** per-link **accent colour** (`#48d2ff` cyan / `#e8c100` gold / `#d63bd6` magenta / `#e8002d` red) drives: the active **glow** (`drop-shadow` on the wrapper so it hugs the parallelogram), the angled **accent underlay strip**, and the **handle** text colour on the active white panel. Labels = **Anton**, **skewX(-9deg)** slant (matches mockup). Brand **logos = inline white SVG** (`LOGO_PATHS` map + `<Logo>`), sitting in the **right corner** of each box, dark on active. **RANK/MAX badges intentionally dropped** (too busy). Old emoji icons + stats block + gray "SHADE" overlay all removed.
- ⚠️ The inlined brand SVG paths are **hand-simplified** (esp. Instagram/GitHub) — swap to exact `simple-icons` paths if Bhargav wants pixel-perfect marks.
- **Parked:** glow intensity + skew angle are easy to tune; Bhargav was reviewing live. LINKS is already mouse-first (click row = open).
- **Shatter shards (added 2026-06-14 s2):** active/hover bar now sprays **floating P3R "shatter" particles** off its right edge — accent-coloured CSS clip-path shards, staggered float/rotate/fade loop, defined in `SHARD_FIELD` + `<Shards>` in `Socials.tsx`. Tune via `SHARD_FIELD` (add entries = denser; `tx/ty` = travel; `dur` = speed; `delay` = stagger). This matched his "HOVER / ACTIVE STATE IDEAS" mockup and is **pitch-perfect** per Bhargav.

## ✅ DONE — BACK TO MENU button on all sub-pages — 2026-06-14 s2

The red **`← BACK TO MENU`** button (Resume's pattern) is now on **About, Social Links, and Side Projects** too. Each takes an **`onBack` prop**; `Menu.tsx` has a shared **`backToMenu`** helper (plays closeSfx + `transitionTo("menu")`) passed to all four sub-screens. Existing keyboard-hint clusters were nudged up so they don't overlap the button. ESC still works everywhere. `Github.tsx` still dead/unwired (no onBack).

## ⏭️ NEXT SESSION — TODO

1. **Wire remaining screens with real info.** Resume ✅ · LINKS ✅. Still showing *original owner's* data:
   - `components/About.tsx` → "Michael Oladimeji, age 26…" + his fun/weird facts. **Bhargav wants to iterate on the design here**, then drop in his real identity. Uses the same shard-bar design as LINKS — likely reuse the new shard/accent/logo system. Also has an **"ENTER TO REVEAL"** affordance that's **illegible + keyboard-only** — Bhargav flagged it: make legible + mouse-interactive.
   - `components/Sideprojects.tsx` → "COMING SOON" splash, no fake data — fine as-is.
   - **Screen mapping (current):** ABOUT→`about`, RESUME→`resume`, PROJECTS→`sideproj`, LINKS→`socials`.
2. **Make the other screens mouse-first** — BACK TO MENU button ✅ (all sub-pages). Still TODO: clickable reveal/controls on About (the ENTER TO REVEAL affordance is still keyboard-only + illegible).
3. **(Optional) font experiment** on the menu.
4. **Deploy** to Vercel (free, GitHub Student Pack). Repo not yet initialized for his own remote.

> ⚙️ **Git:** this is NOT Bhargav's repo — commit **locally only, never push**. Assets are uploaded separately. (Local commits squash everything pending in the working tree.)

**Contact facts** (confirmed 2026-06-14):
Shillong / Bhubaneswar · +91 6009189497 · github.com/7Bhargav7 · linkedin.com/in/bhargav-kundu-89b788278 · Instagram @bzekai_7 · email **`bhargavkundu9862@gmail.com`** ✅ (the resume one — NOT the Claude-profile `5` address). No YouTube.

## Working style reminders (for Claude)
- Iterate **one element at a time, visually** — Bhargav reacts to the live page, not to numbers. Match his Figma precisely (read coords via the Figma MCP connector).
- He wants the finished site; he is **not** trying to learn the full web stack here.
- Aesthetic = **Persona 3 Reload: clean, editorial, minimal** — NOT Persona 5 chaos.
