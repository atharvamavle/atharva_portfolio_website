import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

function parseStat(val) {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedStat({ value, label, sub, delay }) {
  const { num, suffix } = parseStat(value);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const duration = 900;
      const steps = 40;
      const interval = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const eased = 1 - Math.pow(1 - step / steps, 3);
        setDisplay(Math.round(eased * num));
        if (step >= steps) clearInterval(timer);
      }, interval);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, num, delay]);

  return (
    <div className="about-stat" ref={ref} style={{ animationDelay: `${delay}ms` }}>
      <div className="about-stat-value">{display}{suffix}</div>
      <div className="about-stat-label">{label}</div>
      <div className="about-stat-sub">{sub}</div>
    </div>
  );
}

const SKILL_CATS = [
  {
    icon: "🧠", label: "AI & Machine Learning", level: "Expert",
    color: "#7c3aed",
    skills: ["PyTorch", "scikit-learn", "YOLO v8", "OpenCV", "Hugging Face", "LangChain", "Claude Opus 4.6", "GPT-4o", "NLTK", "Azure ML SDK v2"],
  },
  {
    icon: "🌐", label: "Full-Stack Development", level: "Advanced",
    color: "#0ea5e9",
    skills: ["React", "TypeScript", "FastAPI", "TanStack Start", "Vite", "Streamlit", "REST APIs", "React Native"],
  },
  {
    icon: "☁️", label: "Cloud & DevOps", level: "Advanced",
    color: "#10b981",
    skills: ["Cloudflare Workers", "Docker", "GitHub Actions", "AWS Lambda", "Render", "Vercel", "Netlify", "Microsoft Azure", "CI/CD"],
  },
  {
    icon: "🗄️", label: "Data & Databases", level: "Advanced",
    color: "#f59e0b",
    skills: ["Supabase (PostgreSQL)", "MySQL", "MongoDB", "Stripe", "Supabase Auth", "Tableau"],
  },
  {
    icon: "🐍", label: "Languages", level: "Expert",
    color: "#a78bfa",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "R"],
  },
  {
    icon: "🤖", label: "Robotics & Embedded", level: "Intermediate",
    color: "#ef4444",
    skills: ["ROS 2 Jazzy", "MoveIt 2", "ROS Bridge", "Teleoperation GUI"],
  },
];

const LEVEL_COLOR = { Expert: "#4ade80", Advanced: "#60a5fa", Intermediate: "#fbbf24" };

const STATS = [
  { value: "1",    label: "Live SaaS Product",   sub: "ClauseCheck AU" },
  { value: "5+",   label: "AI Projects Shipped", sub: "In production" },
  { value: "12th", label: "ARC 2026",            sub: "17 intl. teams" },
  { value: "3+",   label: "Years Building AI",   sub: "2020 – present" },
];

export default function AboutPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="about-page">

        {/* BIO */}
        <div className="about-hero reveal">
          <img
            src={require("../assets/photo.png")}
            style={{width:"160px",height:"200px",borderRadius:"18px",objectFit:"cover",border:"2px solid rgba(255,255,255,0.07)",flexShrink:0}}
            alt="Atharva"
          />
          <div className="about-bio">
            <div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",marginBottom:"10px"}}>
              <h1 style={{margin:0}}>Atharva Santosh Mavale</h1>
              <span className="about-otw-badge">● Open to Work</span>
            </div>
            <p className="about-lead">
              AI/ML engineer, SaaS founder, and robotics competitor — building systems that actually ship and run in production.
            </p>
            <p>
              I founded and solo-shipped <strong style={{color:"var(--pink)"}}>ClauseCheck AU</strong> — a live AI SaaS analysing Australian construction contracts using Claude Opus 4.6, with a full CI/CD pipeline, Stripe payments, Google OAuth, and 4 pricing tiers deployed on Cloudflare Workers.
            </p>
            <p>
              Alongside that, I delivered an Azure ML SDK v2 predictive maintenance pipeline, competed at the 2026 Australian Rover Challenge (12th of 17 international teams), and built DermaGuard AI (PyTorch EfficientNet-B4) for early-stage skin cancer risk screening.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="about-stats-row">
          {STATS.map((s, i) => (
            <AnimatedStat key={s.label} {...s} delay={i * 120} />
          ))}
        </div>

        {/* CARDS */}
        <div className="about-cards">

          <div className="about-card reveal">
            <h3>Experience</h3>
            <div className="exp-item">
              <div className="exp-year">Oct 2025 – Present</div>
              <div className="exp-role">AI Developer (Capstone)</div>
              <div className="exp-org">InnovAIte · Australia</div>
              <ul className="exp-points">
                <li>Tuned a YOLO + OCR pipeline for whiteboard detection by analyzing low-recall failure cases, adjusting confidence thresholds, and planning dataset expansion.</li>
                <li>Prototyped audio feedback module to make detections accessible for end users, enabling integration testing beyond the research phase.</li>
                <li>Hardened a React Native navigation app with safe-exit confirmation, consistent back/forward flows, and TypeScript/runtime bug fixes informed by OSRM routing research.</li>
              </ul>
            </div>
            <div className="exp-item">
              <div className="exp-year">Aug 2025 – Present</div>
              <div className="exp-role">Software Engineer</div>
              <div className="exp-org">Deakin Competitive Robotics · Australia</div>
              <ul className="exp-points">
                <li>Represented Deakin University at the 2026 Australian Rover Challenge (17 teams, 390+ students across 5 countries), placing 12th.</li>
                <li>Completed the rover control GUI by integrating ROS bridge for teleoperation and contributing to autonomous rover and arm navigation using ROS 2 and MoveIt path planning.</li>
              </ul>
            </div>
          </div>

          <div className="about-card reveal delay-1">
            <h3>Education</h3>
            <div className="exp-item">
              <div className="exp-year">2024 – 2026</div>
              <div className="exp-role">Master of Applied AI (Professional)</div>
              <div className="exp-org">Deakin University · Melbourne, Australia</div>
            </div>
            <div className="exp-item">
              <div className="exp-year">2020 – 2023 · CGPA 8.38</div>
              <div className="exp-role">Bachelor of Science in IT</div>
              <div className="exp-org">Pillai College · Mumbai, India</div>
            </div>
            <h3 style={{marginTop:"22px"}}>Hackathon</h3>
            <div className="exp-item">
              <div className="exp-year">Feb 2026</div>
              <div className="exp-role">Sophiie AI Agents Hackathon</div>
              <div className="exp-org">200+ Australian developers · $5K prize</div>
              <ul className="exp-points">
                <li>Built StudyMate AI — an agentic Socratic tutor that adapts explanations to any GitHub repo with 3-level progressive teaching.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* ── SKILLS SECTION ── */}
        <div className="skills-section reveal">
          <div className="skills-section-header">
            <span className="skills-section-kicker">TECHNICAL EXPERTISE</span>
            <h2 className="skills-section-title">Technical Skills</h2>
          </div>
          <div className="skills-cat-grid">
            {SKILL_CATS.map((cat) => (
              <div
                className="skill-cat-card"
                key={cat.label}
                style={{ "--cat-color": cat.color }}
              >
                <div className="skill-cat-head">
                  <span className="skill-cat-icon">{cat.icon}</span>
                  <div>
                    <div className="skill-cat-name">{cat.label}</div>
                    <span
                      className="skill-cat-level"
                      style={{ color: LEVEL_COLOR[cat.level], borderColor: LEVEL_COLOR[cat.level] + "44" }}
                    >{cat.level}</span>
                  </div>
                </div>
                <div className="skill-tags">
                  {cat.skills.map((s, i) => (
                    <span className="skill-tag" key={s} style={{ "--i": i }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="contact-row reveal">
          <a href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer" className="contact-chip">💼 LinkedIn</a>
          <a href="https://github.com/atharvamavle" target="_blank" rel="noreferrer" className="contact-chip">🐙 GitHub</a>
          <a href="mailto:atharvamavale26@gmail.com" className="contact-chip">✉️ atharvamavale26@gmail.com</a>
          <a href="/Atharva-Mavale-Resume.pdf" download className="contact-chip">📄 Download Resume</a>
        </div>

      </div>
    </div>
  );
}
