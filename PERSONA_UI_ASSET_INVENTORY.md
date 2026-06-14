# Persona 3 Reload — UI Asset Inventory (for bhargav-persona portfolio)

**Goal:** Catalog every P3R UI asset adaptable for the portfolio. NOT a 1:1 copy — understand Atlus' UI *systems* and harvest reusable parts.
**Started:** 2026-06-14 · **Owner:** Bhargav · **Tool:** FModel

---
## ▶️ RESUME HERE — next-session handoff (2026-06-14)
**Scope (LOCKED):** rebuild the P3R **Social Link list screen** as the portfolio **Socials page** (replaces `components/Socials.tsx`). Arcana style decided = **kanji + English (both)**. This is NOT a full-game sweep — only this one screen's assets.

**Workflow rule (learned the hard way — DO THIS):** **Bhargav drives FModel; Claude only analyzes.** Do NOT let Claude pixel-drive FModel's "New Explorer System" — it's slow and flaky. Bhargav navigates + right-click → *Save Folder's Packages Textures*; Claude reads the exported PNGs from `C:\Users\Zykan\Documents\Output\Exports`.
- ⚠️ Exported P3R UI textures are **white-on-transparent** → they look BLANK on a white preview (that's correct, not broken). Claude must **flatten onto a dark bg** before reading.

**FModel state:** game = `Persona 3 Reload (GAME_UE4_27)`; **Loading Mode = All**; AES key auto-set (`0x92BADFE2…117D2FFEE`). Use `Xrd777/UI/Community` (NOT the gameplay `Xrd777/Community`). Community→`Cmm` in asset names. FModel search is non-recursive → browse the tree, don't search.

**DONE this session:**
- Full `UI/` folder map (45 subfolders) — see "Xrd777/UI subfolders" below.
- **Arcana plates** = `UI/Community/Arcana/Normal/` → 23 white-on-transparent **kanji** name plates (1 per arcana) + `Blur`/`Ef` glow variants. (English versions still TBC in L10N.)
- `T_UI_Community_00–03` located in **`UI/Community/RankUp/`** (NOT Layout) = **1024² BC7 atlases**; `_00` = arcana-name grid. **✅ all 4 exported** to `…/Xrd777/UI/Community/RankUp/`.
- `Layout` = DataTables (layout/ripple timing), NOT images → row panels are **procedural color boxes** (replicate in CSS, like the existing `Menu.tsx` active item).

**NEXT — Bhargav export these folders (right-click → Save Folder's Packages Textures), Claude reads:**
1. `UI/Community/RankUp` — confirm `_01/_02/_03` (MAX badge? rank digits? card-in-hand art?) [already exported — Claude: flatten+read].
2. `UI/Community/Poetry` — the **background** (water-ripple + shards). ⬅ don't forget the bg.
3. `UI/Cutin` — likely the **card-in-hand** per-arcana tarot (swaps per highlighted link).
4. `L10N/en/.../UI/Community` — **English** arcana names + `LIST`/`SOCIAL LINK`/`RANK`/`MAX` + **rank digits**.
5. `UI/Common` — cursor, Ⓐ/Ⓑ prompts, shared overlays/shards, scrollbar.

**Still to locate for this screen:** roman-numeral mini-badges (XIV…), the diagonal SOCIAL LINK watermark, the red selected-edge — should fall out of folders 1/4 above.
---

## Screen → Persona system mapping
| Portfolio screen | Persona system | Primary archive folder(s) |
|---|---|---|
| Homepage | Main menu | `Xrd777/UI/Camp` + `L10N/en/.../Camp` |
| Resume | Status screen | `Xrd777/UI/Status` (TBC) |
| Projects | Quest / Activity | `Xrd777/UI/Quest` or `Request` (TBC) |
| Social Links | Social Link screen | `Xrd777/UI/Community` |
| Contact | Communication hub | `Xrd777/UI/Network` / phone UI (TBC) |

## Archive mental model
- **Two trees:** raw graphics in `P3R/Content/Xrd777/UI/…`; text-baked labels in `P3R/Content/L10N/en/Xrd777/UI/…`. Sweep both.
- **Path convention:** `…/UI/<System>/Root/Texture/T_UI_<System>_NN_texture`. Numbered atlases are sibling pages of ONE screen.
- **Game:** `D:\Games\Persona 3 Reload\P3R` (pakchunk0–5, unencrypted IoStore).
- **Exports land in:** `C:\Users\Zykan\Documents\Output\Exports` (dir structure preserved → Claude can Read them directly).

## Folder/prefix decoder (confirmed via research)
- `Camp` = main menu / pause menu. `Community` (a.k.a. "Commu") = **Social Link**. `Bustup` = **dialogue portraits**. `Arcana` = tarot glyphs. `RankUp` = SL rank-up sequence.
- Prefix `T_` = texture/image asset. `T_UI_<System>_NN_texture` = UI atlas page NN.
- **Text & numbers are pre-rendered textures, not live fonts** (confirmed by Adrian Kowalik's recreation): menu labels = dedicated label textures; the wallet/currency number = **individual digit images**. → Hunt for **digit atlases** and **label atlases** in `Camp` / `L10N/en/.../Camp`.
- English text lives in `L10N/en` (shipped in pakchunk4/5); language-neutral graphics in `Xrd777/UI`.

## Xrd777 master map (observed in FModel tree 2026-06-14)
Top-level under `P3R/Content/Xrd777/`: Activity · AddContent · Battle · Blueprints · Characters · **Community (GAMEPLAY data — not UI)** · CriData · CriDataEn · Dictionary · Effects · Environments · Events · Field · **Font (39 pkgs)** · FX · Help · … **UI** (scrolled below). Also under `Content/`: Astrea, L10N, Localization, Xrd777.
- **`Activity`** → likely the **Quest/Activity** screen = portfolio **Projects** page. Investigate for that screen.
- **GOTCHA — two "Community" folders:** `Xrd777/Community` = SL gameplay data (Bf/Event/Holiday/Present…, no images). `Xrd777/UI/Community` = the UI textures we want. Don't confuse them.
- **NAMING: Community → `Cmm`** in asset names (e.g. `UICmmRankUpDataBaseAsset`). (User's original `T_UI_Community_00–03` guess was the wrong stem.)
- **FModel search is NON-recursive** (current folder's direct contents only) → can't find nested `Root/Texture` assets. **Browse, don't search.**

### `Xrd777/UI/` subfolders (45 total; observed 2026-06-14)
AddContent · BackLog · Battle · **Bustup** (portraits) · **Camp** (main menu → Homepage) · ClearSave · Combine · **Common** (shared atoms: cursors/overlays/nav — every screen) · **Community** (Social Link → Socials) · Configuration · Cutin · DataInheritance · DayChange · Dialog · Facility · Field · GameOver · GenericSelect · Handwriting · KeyHelp · Loading · Mail · MailTitle · Message · MiniMap · Misc · …(~19 more below MiniMap — Status/Quest/etc. still to scroll).
- **Mail / MailTitle / Message** → candidates for the **Contact / Communication hub** page (P3R's SMS/phone UI).
- **Camp** = Homepage · **Community** = Socials · **Common** = shared. Still need: Status (Resume), Quest/Activity (Projects).
Other Xrd777 tops: Kernel · Maps · Movies · MoviesEn · Props · Schedule · Sound · Tutorial.
`Arcana` substructure: `Normal` (clean) / `Blur` (glow) / `Ef` (effect), 23 each.
**Screen map firming up:** Homepage→`UI/Camp` · Socials→`UI/Community` · Projects→`Xrd777/Activity` (+maybe `UI/?`) · shared→`UI/Common`.

## External references (research 2026-06-14)
**Browse these yourself (anti-bot, I can't fetch — but they're the best visual maps):**
- Game UI Database — every P3R screen, categorized: https://www.gameuidatabase.com/gameData.php?id=1884
- The Spriters Resource — community-ripped P3R sheets (UI/menu/HUD): https://www.spriters-resource.com/pc_computer/persona3reload/
- The Cutting Room Floor — unused P3R assets + paths: https://tcrf.net/Persona_3_Reload

**Recreations (closest to our goal — how others rebuilt P3R UI outside the game):**
- Adrian Kowalik (UE5 pause-menu recreation, documents the systems): https://adrian-kowalik.com/projects/persona-3-reload-ui-recreation
- Ultipuk (Godot pause-menu recreation + blog): https://github.com/Ultipuk/persona_3_reload_pause_menu · https://ultipuk.xyz/blog/recreation-of-persona-3-reload-ui/

**Modding / datamining (path references + tooling):**
- Persona Modding Docs (extraction guide, FModel setup): https://animatedswine37.github.io/persona-modding-docs/
- Emily-Mizuki/Femc-Reloaded-Texture-Tweaks (mirrors `Xrd777/UI/Bustup/Textures` paths): https://github.com/Emily-Mizuki/Femc-Reloaded-Texture-Tweaks
- TekkaGB/P3R-Mod-Menu (data-miner toolkit): https://github.com/TekkaGB/P3R-Mod-Menu
- Lyall/P3RFix (render-target/menu fixes): https://github.com/Lyall/P3RFix

## FModel cheat-sheet (RELIABLE method)
- **Bhargav navigates** the left tree to a folder (e.g. `Xrd777 → UI → Community → RankUp`).
- **Export the whole folder:** right-click the folder in the tree → **Save Folder's Packages Textures** → PNGs land in `C:\Users\Zykan\Documents\Output\Exports\…` (structure preserved).
- Tell Claude the folder name; **Claude reads the exported PNGs** (flattening white-on-transparent ones onto dark first).
- Avoid: Claude pixel-driving the New Explorer; the in-app search (non-recursive).

---

## Priority targets (user-defined order)
1. Social Link assets → `Community`
2. Arcana assets → `Community/Arcana`
3. Rank / Max UI → `Community/RankUp`
4. Menu ribbons → `Camp`, `Common`
5. Hover / selection states → `Common`, `Camp`
6. Navigation indicators → `Common`
7. Typography atlases → `L10N/en/*`, `Common/Font`
8. Background overlays → `Common`, `Camp`
9. Character cutout assets → `Camp`, `Community`

---

## 🎯 CHOSEN THEME — Social Link list screen → portfolio Socials page
**Decision (2026-06-14):** the Socials page adopts the P3R **Social Link list** design (replacing the current `Socials.tsx`). Screenshot decomposed below. Same design language as the existing homepage active-item (white panel + text-flip + red right-edge bar), so it slots in cleanly.

**Pakchunk note (FModel 2026-06-14):** chunks **1+2 do NOT contain `Xrd777/UI`** — under `Xrd777` they only hold `CriData` (Criware audio/video) + `Font` (game font asset, 1 pkg — grab for Typography) and a `Localization` strings folder. The `UI/Community` graphics + `L10N/en/.../UI` text live in OTHER chunk(s) (research said L10N text → pakchunk4/5). **→ Use Loading Mode = All; don't hand-pick chunks.** (FModel AES key already set: `0x92BADFE2…117D2FFEE`; auto-fetched.)
**TODO grab:** `Xrd777/Content/Font/` = the actual P3R font asset (Typography).

**`Xrd777/UI/Community` real structure (FModel 2026-06-14):** subfolders → `Arcana` (Normal/Blur/Ef, 23 each), `Layout` (**5 DataTables** — positioning + ripple timing, NOT images), `Parameter` (1, data), `Poetry` (3 sub/7 pkgs — **background ripple**), `PointUp` (7, rank-point feedback), **`RankUp` (6 pkgs = `T_UI_Community_00–03` 1024² atlases + `PLG_`/`SPR_` sprite-sheet defs)** + `UICmmRankUpDataBaseAsset` (data). `_00` atlas = arcana-name grid. ✅ `_00–03` exported.

**Screen asset sources (CORRECTED):**
- **Arcana name plate:** `UI/Community/Arcana/Normal/` (JP, 23 ✅ folder found) + `L10N/en/.../Community/Arcana` (EN — TBC).
- **Atlases (cards / MAX / digits?):** `UI/Community/RankUp/T_UI_Community_00–03` (1024² ✅ exported; `_00`=names, `_01–03` TBC).
- **Background ripple + shards:** `UI/Community/Poetry` (+ `UI/Common` for shards).
- **Card-in-hand tarot (swaps per link):** `UI/Cutin` (TBC).
- **EN labels LIST/SOCIAL LINK/RANK/MAX + digits:** `L10N/en/.../UI/Community` (TBC).
- **Row panels:** procedural color (Layout = DataTables, no texture to extract).
- **Cursor / Ⓐ Ⓑ prompts / scrollbar / shards:** `UI/Common` (TBC).

**Element → category → source:**
| Element | Category | Folder |
|---|---|---|
| LIST header, SOCIAL LINK diagonal watermark | Typography/Ribbons | L10N Community |
| Row panels (3 states) + red selected edge | Selection Panels/Ribbons | Xrd777 Community |
| Tarot badges + roman numerals | Arcana | Community/Arcana |
| RANK + digits, MAX badge | Rank Badges | L10N Community |
| Arcana names + descriptors | Typography | L10N Community |
| Faded protagonist cutout (right, bleeds off) | Character Portrait | render target → use own photo |
| **Card-in-hand (tarot card MC holds)** — SWAPS per highlighted link | Character Portrait / Arcana | per-arcana card-art set (TBC: RankUp atlas `_01–03`? / Cutin?) |
| **Background: blue gradient + water ripple + floating shards** (in-scope, don't skip) | Background Overlays | `Community/Poetry` (ripple) + shards TBC |
| BG gradient + light streaks + pink/blue shards | Background Overlays | Xrd777 Community / Common |
| Left scrollbar, Ⓐ/Ⓑ prompts, guide line | Menu Nav/HUD | Common |

**Portfolio mapping idea:** each real link = an "arcana" row (LinkedIn/GitHub/Instagram/YouTube), arcana name + handle descriptor + a "RANK"/"MAX" on the primary. Needs ~5 arcana icons; grab the full set for flexibility.

## Inventory by category
Format per asset: `path` — resolution — description — **usefulness** (screen) — export status.

### Typography
_— none yet —_

### Arcana
- `Xrd777/UI/Community/Arcana/Normal/T_UI_Community_Arcana_{001–022,024}` — **23 plates**, 290×256, `PF_B8G8R8A8` / `TC_Alpha` / UI group, sRGB off = **white kanji name on transparent alpha, recolorable**. Each = one Major Arcana as JP kanji in 『』 brackets (001 愚者 Fool → 024 世界 World; 015 節制 Temperance, 016 悪魔 Devil, 018 星 Star, 019 月 Moon, 020 太陽 Sun = the links in user's screenshot). **HIGH** (Socials — per-link badge). ⏳ not exported.
- Sibling sets: `Arcana/Blur/` (23, soft glow versions) + `Arcana/Ef/` (23, effect versions) — for hover-glow states. **MED**.
- ⚠️ These are **Japanese**. English name plates ("Temperance"/"Devil"…) expected in `L10N/en/.../Community/Arcana` — TBC.

### Social Link
_— none yet —_

### Menu Navigation
_— none yet —_

### Selection Panels
- Row panels (navy/cyan/white states + red selected edge) are **procedural color boxes** — driven by `Community/Layout` DataTables, no texture to extract. Replicate in CSS (matches existing `Menu.tsx` active-item pattern).

### Ribbons
- `L10N/en/.../Camp/Root/Texture/T_UI_Camp_07_texture` — 512² — angular triangular shard/pennant geometry (doubles as portrait cutout, see below). **HIGH** (Homepage). ✅ exported.

### Rank Badges
- `Xrd777/UI/Community/RankUp/T_UI_Community_{00,01,02,03}_texture` — 1024², BC7, UI group, white-on-transparent. Rank-up-sequence atlas bundle; `_00` = arcana-name grid; `_01–03` = TBC (MAX badge / rank digits / card art?). Bundled w/ `PLG_UI_Community` + `SPR_UI_Community` (sprite defs that slice the atlases). **HIGH** (Socials — MAX/RANK). **✅ all 4 exported** → `…/Community/RankUp/`.

### HUD Elements
_— none yet —_

### Background Overlays
- `Xrd777/UI/Community/Poetry/` (3 sub, 7 pkgs) — the **water-ripple animated background** of the Social Link screen (`DT_UILayout_UIPoetryRipple…EN/JA` DataTables drive timing). Textures TBC. **HIGH** (Socials bg — user flagged "don't forget the background"). ⏳ not exported.
- Floating pink/blue **shards** + top-left diamond → likely `UI/Common`. TBC.

### Transition Effects
_— none yet —_

### Character Portrait Systems
- `L10N/en/.../Camp/Root/Texture/T_UI_Camp_07_texture` — 512² — two columns of party-member portrait shards in signature colors, grey torn-edge masks. **HIGH** (Homepage hero — cut Bhargav's photo into these shapes). ✅ exported.
- `Xrd777/UI/Bustup/Textures/` — (folder, not yet previewed) full-res dialogue-portrait "bustups". **MED** (reference for portrait treatment; the *shapes/framing* are more reusable than the characters). ⏳ to preview.

### Miscellaneous
_— none yet —_

---

## Dig log
| # | Folder inspected | Key finds | Next |
|---|---|---|---|
| 0 | `L10N/en/.../Camp/Root/Texture` (1 file pre-exported) | `T_UI_Camp_07` = portrait shard atlas | Map full `Xrd777/UI/` tree |
| R | Online research (web) | Confirmed naming decoder; found `Xrd777/UI/Bustup`; text/digits are pre-rendered atlases; gathered reference list | Map `Xrd777/UI/` tree in FModel |
| 1 | Social Link list screenshot (user) | Decomposed full screen → CHOSEN THEME for Socials; bg + dynamic card-in-hand added to scope | Browse `Community` subfolders in FModel |
| 2 | FModel drive: `UI/Community/Arcana/Normal` + `RankUp` | Arcana = 23 JP kanji plates; `T_UI_Community_00–03` are in **RankUp** (1024² atlases, `_00`=names) — **✅ exported**; `Layout`=DataTables (panels procedural) | Bhargav exports Poetry / Cutin / L10N-EN; Claude flattens+reads |

## Open questions / TBC for this screen
- `_01/_02/_03` atlas contents — MAX badge? rank digits? card art? (flatten exported PNGs on dark to read).
- **Card-in-hand** per-arcana tarot art → check `UI/Cutin`.
- **English** arcana plates + LIST/SOCIAL LINK/RANK/MAX + rank digits → `L10N/en/.../UI/Community`.
- **Background** ripple textures → `UI/Community/Poetry`; **shards** + roman-numeral mini-badges → `UI/Common`.
- (Later, other screens) Status→Resume, Activity→Projects, Mail/Message→Contact.
