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

const SKILLS = [
  { name: "Python / AI-ML (PyTorch, scikit-learn, YOLO, OpenCV)", pct: 94 },
  { name: "LLM & Agents (LangChain, Claude API, GPT-4, Hugging Face)", pct: 88 },
  { name: "Full-Stack (FastAPI, React, TypeScript, TanStack, Vite)", pct: 86 },
  { name: "SaaS & Production (Supabase, Stripe, Cloudflare Workers, GitHub Actions)", pct: 83 },
  { name: "DevOps & Cloud (Azure ML SDK v2, Docker, AWS Lambda, Render)", pct: 81 },
  { name: "Robotics (ROS 2, MoveIt, Teleoperation GUI)", pct: 80 },
];

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

          <div className="about-card skills-card reveal">
            <h3>Technical Skills</h3>
            {SKILLS.map(s => (
              <div className="skill-row" key={s.name}>
                <div className="skill-top"><span>{s.name}</span><span>{s.pct}%</span></div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: s.pct + "%" }} />
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
