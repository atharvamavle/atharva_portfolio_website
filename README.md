<<<<<<< Updated upstream
<<<<<<< Updated upstream
# Atharva Mavale — Portfolio v2.0

> Production-grade personal portfolio built with React 18, featuring an AI-powered chat assistant, site-wide scroll animations, 3D card interactions, and a working contact form — deployed on Netlify.

**Live:** [atharva-m.netlify.app](https://atharva-m.netlify.app)

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 · React Router DOM v6 |
| Styling | CSS3 · CSS Variables · Grid · Flexbox |
| AI Chat | OpenAI GPT-4.1-mini via Netlify Function |
| Forms | Netlify Forms (zero-backend) |
| Deployment | Netlify (CI/CD on push) |
| Version Control | Git · GitHub |

---

## Features

### AI Chat Assistant (Luffy Bot)
- Floating 3D SVG robot button — no browser default styling, pure SVG
- Nudge popup appears after 2s, dissolves with CSS animation after 10s
- 3-question limit per session with live countdown in header
- Answers questions about projects, skills, experience, and **personality**
- Strict scope enforcement: refuses off-topic questions
- System prompt powered by `portfolioData.js` — single source of truth
- Netlify serverless function at `/.netlify/functions/chat`

### Animations
- **Cursor glow** — soft purple radial gradient follows the mouse via `requestAnimationFrame`
- **Scroll reveal** — `IntersectionObserver` in `App.js` adds `.is-visible` to all `.reveal` elements; staggered delays via `.delay-1/2/3/4`
- **3D card tilt** — `mousemove` listener on every project card; perspective-based `rotateX/Y` up to 10°
- **Count-up stats** — `IntersectionObserver` + `setInterval` with ease-out cubic on the About page stat bar
- **Shimmer headings** — moving gradient animation on all page titles
- **Floating orbs** — two blurred `::before`/`::after` orbs drift in the background
- **Marquee ticker** — infinite scroll with pause-on-hover; bold words shimmer with gradient
- Respects `prefers-reduced-motion`

### Pages

| Page | Key Features |
|---|---|
| **Home** | Bento grid · ClauseCheck AU featured card · Available for Work with pulsing dot · Resume download |
| **About** | Animated stats bar (count-up) · Open to Work badge · Skill bars with staggered fill |
| **Projects** | 3D tilt on hover · Scroll-reveal stagger · Live + GitHub links |
| **Achievements** | Robotics competition blog · YouTube embed · Photo gallery |
| **Contact** | Working Netlify Form · Success/error states · Availability card |

### Design System
- **Theme:** Dark (`#080808`) + Light (`#f5f5f7`) with one toggle, persisted via `localStorage`
- **Accent:** Purple `#7c3aed` (dark) / `#6d28d9` (light)
- **Radius:** `20px` globally via `--radius`
- **Transitions:** `0.28s cubic-bezier(0.4,0,0.2,1)` globally
- **Shadows:** Three tiers — `--shadow-sm`, `--shadow-md`, `--shadow-glow`

---

## Project Structure

```
src/
├── App.js                    # Theme state · cursor glow · global scroll reveal observer
├── index.js                  # React DOM entry · BrowserRouter
├── index.css                 # ~1,500 lines: variables, components, animations
├── components/
│   ├── Navbar.js             # Fixed nav · hamburger · theme toggle
│   └── ChatWidget.js         # Robot FAB · nudge popup · chat panel · 3-question limit
├── pages/
│   ├── HomePage.js           # Bento grid · marquee · 7 bento cards
│   ├── AboutPage.js          # Animated stats · count-up · skill bars · OTW badge
│   ├── ProjectsPage.js       # 8 projects · 3D tilt · scroll reveal stagger
│   ├── AchievementsPage.js   # Rover blog · video embed · 18-photo gallery
│   └── ContactPage.js        # Netlify Form · availability card
├── data/
│   └── portfolioData.js      # Single source of truth for chat AI + all content
└── assets/
    └── photo.png

netlify/
└── functions/
    └── chat.js               # Serverless OpenAI function (GPT-4.1-mini)

public/
├── index.html
├── Atharva-Mavale-Resume.pdf
└── img/                      # Rover competition photos (18 images)
```

---

## CSS Architecture

```css
:root {
  --bg:          #080808;
  --card:        #111111;
  --text:        #efefef;
  --muted:       #6b6b6b;
  --pink:        #7c3aed;        /* accent — named pink for legacy reasons */
  --pink-glow:   rgba(124,58,237,0.28);
  --radius:      20px;
  --transition:  0.28s cubic-bezier(0.4,0,0.2,1);
  --shadow-glow: 0 0 40px var(--pink-glow), 0 12px 36px rgba(0,0,0,0.6);
}
```

### Scroll Reveal Pattern
```js
// App.js — re-runs on every route change via useLocation
const observer = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
  }), { threshold: 0.12 }
);
document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
```

### 3D Tilt Pattern
```js
// ProjectsPage.js
card.addEventListener("mousemove", e => {
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = (e.clientX - left) / width  - 0.5;
  const y = (e.clientY - top)  / height - 0.5;
  card.style.transform =
    `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px) scale(1.018)`;
});
```

---

## AI Chat — Data Flow

```
User message
    ↓
ChatWidget.js  →  POST /.netlify/functions/chat
                        ↓
                  chat.js (Netlify Function)
                        ↓
                  portfolioData.js injected as system context
                        ↓
                  OpenAI GPT-4.1-mini
                        ↓
                  Strict scope: portfolio-only answers
                        ↓
                  Formatted reply (bullets · links · personality)
```

**Environment variable required:**
```
OPENAI_API_KEY=sk-...
```
Set in: Netlify dashboard → Site settings → Environment variables.

---

## Local Development

```bash
git clone https://github.com/atharvamavle/atharva-portfolio
cd atharva-portfolio
npm install
npm start          # → http://localhost:3000
```

> The chat widget calls `/.netlify/functions/chat` — this needs Netlify CLI for local testing:
> ```bash
> npm install -g netlify-cli
> netlify dev        # → http://localhost:8888  (functions included)
> ```

---

## Deployment

```bash
npm run build
netlify deploy --prod --dir=build
```

Or push to `main` — Netlify auto-deploys via the connected GitHub repo.

---

## Contact

**Atharva Santosh Mavale** — AI/ML Engineer & Founder
📧 [atharvamavale26@gmail.com](mailto:atharvamavale26@gmail.com)
💼 [linkedin.com/in/atharva-mavale-70147a1b4](https://www.linkedin.com/in/atharva-mavale-70147a1b4)
🐙 [github.com/atharvamavle](https://github.com/atharvamavle)
🌐 [atharva-m.netlify.app](https://atharva-m.netlify.app)
=======
=======
>>>>>>> Stashed changes
# Atharva Mavale — Portfolio v2.0

> Production-grade personal portfolio built with React 18, featuring an AI-powered chat assistant, site-wide scroll animations, 3D card interactions, and a working contact form — deployed on Netlify.

**Live:** [atharva-m.netlify.app](https://atharva-m.netlify.app)

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 · React Router DOM v6 |
| Styling | CSS3 · CSS Variables · Grid · Flexbox |
| AI Chat | OpenAI GPT-4.1-mini via Netlify Function |
| Forms | Netlify Forms (zero-backend) |
| Deployment | Netlify (CI/CD on push) |
| Version Control | Git · GitHub |

---

## Features

### AI Chat Assistant (Luffy Bot)
- Floating 3D SVG robot button — no browser default styling, pure SVG
- Nudge popup appears after 2s, dissolves with CSS animation after 10s
- 3-question limit per session with live countdown in header
- Answers questions about projects, skills, experience, and **personality**
- Strict scope enforcement: refuses off-topic questions
- System prompt powered by `portfolioData.js` — single source of truth
- Netlify serverless function at `/.netlify/functions/chat`

### Animations
- **Cursor glow** — soft purple radial gradient follows the mouse via `requestAnimationFrame`
- **Scroll reveal** — `IntersectionObserver` in `App.js` adds `.is-visible` to all `.reveal` elements; staggered delays via `.delay-1/2/3/4`
- **3D card tilt** — `mousemove` listener on every project card; perspective-based `rotateX/Y` up to 10°
- **Count-up stats** — `IntersectionObserver` + `setInterval` with ease-out cubic on the About page stat bar
- **Shimmer headings** — moving gradient animation on all page titles
- **Floating orbs** — two blurred `::before`/`::after` orbs drift in the background
- **Marquee ticker** — infinite scroll with pause-on-hover; bold words shimmer with gradient
- Respects `prefers-reduced-motion`

### Pages

| Page | Key Features |
|---|---|
| **Home** | Bento grid · ClauseCheck AU featured card · Available for Work with pulsing dot · Resume download |
| **About** | Animated stats bar (count-up) · Open to Work badge · Skill bars with staggered fill |
| **Projects** | 3D tilt on hover · Scroll-reveal stagger · Live + GitHub links |
| **Achievements** | Robotics competition blog · YouTube embed · Photo gallery |
| **Contact** | Working Netlify Form · Success/error states · Availability card |

### Design System
- **Theme:** Dark (`#080808`) + Light (`#f5f5f7`) with one toggle, persisted via `localStorage`
- **Accent:** Purple `#7c3aed` (dark) / `#6d28d9` (light)
- **Radius:** `20px` globally via `--radius`
- **Transitions:** `0.28s cubic-bezier(0.4,0,0.2,1)` globally
- **Shadows:** Three tiers — `--shadow-sm`, `--shadow-md`, `--shadow-glow`

---

## Project Structure

```
src/
├── App.js                    # Theme state · cursor glow · global scroll reveal observer
├── index.js                  # React DOM entry · BrowserRouter
├── index.css                 # ~1,500 lines: variables, components, animations
├── components/
│   ├── Navbar.js             # Fixed nav · hamburger · theme toggle
│   └── ChatWidget.js         # Robot FAB · nudge popup · chat panel · 3-question limit
├── pages/
│   ├── HomePage.js           # Bento grid · marquee · 7 bento cards
│   ├── AboutPage.js          # Animated stats · count-up · skill bars · OTW badge
│   ├── ProjectsPage.js       # 8 projects · 3D tilt · scroll reveal stagger
│   ├── AchievementsPage.js   # Rover blog · video embed · 18-photo gallery
│   └── ContactPage.js        # Netlify Form · availability card
├── data/
│   └── portfolioData.js      # Single source of truth for chat AI + all content
└── assets/
    └── photo.png

netlify/
└── functions/
    └── chat.js               # Serverless OpenAI function (GPT-4.1-mini)

public/
├── index.html
├── Atharva-Mavale-Resume.pdf
└── img/                      # Rover competition photos (18 images)
```

---

## CSS Architecture

```css
:root {
  --bg:          #080808;
  --card:        #111111;
  --text:        #efefef;
  --muted:       #6b6b6b;
  --pink:        #7c3aed;        /* accent — named pink for legacy reasons */
  --pink-glow:   rgba(124,58,237,0.28);
  --radius:      20px;
  --transition:  0.28s cubic-bezier(0.4,0,0.2,1);
  --shadow-glow: 0 0 40px var(--pink-glow), 0 12px 36px rgba(0,0,0,0.6);
}
```

### Scroll Reveal Pattern
```js
// App.js — re-runs on every route change via useLocation
const observer = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
  }), { threshold: 0.12 }
);
document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
```

### 3D Tilt Pattern
```js
// ProjectsPage.js
card.addEventListener("mousemove", e => {
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = (e.clientX - left) / width  - 0.5;
  const y = (e.clientY - top)  / height - 0.5;
  card.style.transform =
    `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px) scale(1.018)`;
});
```

---

## AI Chat — Data Flow

```
User message
    ↓
ChatWidget.js  →  POST /.netlify/functions/chat
                        ↓
                  chat.js (Netlify Function)
                        ↓
                  portfolioData.js injected as system context
                        ↓
                  OpenAI GPT-4.1-mini
                        ↓
                  Strict scope: portfolio-only answers
                        ↓
                  Formatted reply (bullets · links · personality)
```

**Environment variable required:**
```
OPENAI_API_KEY=sk-...
```
Set in: Netlify dashboard → Site settings → Environment variables.

---

## Local Development

```bash
git clone https://github.com/atharvamavle/atharva-portfolio
cd atharva-portfolio
npm install
npm start          # → http://localhost:3000
```

> The chat widget calls `/.netlify/functions/chat` — this needs Netlify CLI for local testing:
> ```bash
> npm install -g netlify-cli
> netlify dev        # → http://localhost:8888  (functions included)
> ```

---

## Deployment

```bash
npm run build
netlify deploy --prod --dir=build
```

Or push to `main` — Netlify auto-deploys via the connected GitHub repo.

---

## Contact

**Atharva Santosh Mavale** — AI/ML Engineer & Founder
📧 [atharvamavale26@gmail.com](mailto:atharvamavale26@gmail.com)
💼 [linkedin.com/in/atharva-mavale-70147a1b4](https://www.linkedin.com/in/atharva-mavale-70147a1b4)
🐙 [github.com/atharvamavle](https://github.com/atharvamavle)
🌐 [atharva-m.netlify.app](https://atharva-m.netlify.app)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
