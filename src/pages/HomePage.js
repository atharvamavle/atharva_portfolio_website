import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MQ = [
  "FOUNDER · CLAUSECHECK AU",
  "AI/ML ENGINEER",
  "OPEN TO WORK",
  "DEAKIN COMPETITIVE ROBOTICS",
  "COMPUTER VISION",
  "LLM AGENTS · MLOPS",
  "FULL-STACK SAAS",
  "SOLVING HEALTHCARE WITH AI",
  "ROS 2 · ROBOTICS",
  "12TH PLACE · ARC 2026",
];

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div className="page">
      <Navbar />
      <div className="bento-page">

        {/* marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...MQ, ...MQ].map((t, i) => (
              <span key={i}>{i % 2 === 0 ? <strong>{t}</strong> : t} &nbsp;✦&nbsp; </span>
            ))}
          </div>
        </div>

        <div className="bento-grid">

          {/* HERO */}
          <div className="card bento-hero reveal" onClick={() => nav("/about")}>
            <div className="hero-inner">
              <img src={require("../assets/photo.png")} style={{width:"160px",height:"200px",borderRadius:"18px",objectFit:"cover",border:"2px solid rgba(255,255,255,0.07)"}} alt="Atharva" />
              <div>
                <div className="hero-label">AI Engineer · Founder · Deakin University</div>
                <h1 className="hero-name">
                  <span className="hero-word"><span className="hero-word-inner">ATHARVA</span></span>{" "}
                  <span className="hero-word"><span className="hero-word-inner" style={{animationDelay:"0.18s"}}>SANTOSH</span></span>{" "}
                  <span className="hero-word"><span className="hero-word-inner" style={{animationDelay:"0.31s"}}>MAVALE.</span></span>
                </h1>
                <p className="hero-desc">
                  Founder of <strong style={{color:"var(--pink)"}}>ClauseCheck AU</strong> — a live AI SaaS. Master of Applied AI student at Deakin, building production-grade systems across LLMs, computer vision, and robotics. Based in Geelong, Australia 🇦🇺
                </p>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"10px"}}>
                  <span className="hero-badge">⚖️ ClauseCheck AU</span>
                  <span className="hero-badge">🏆 ARC 2026 · 12th</span>
                  <span className="hero-badge">🤖 ROS 2</span>
                </div>
                <span className="arrow-pill" style={{marginTop:"14px"}}>View Profile →</span>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="card bento-creds reveal delay-1" onClick={() => nav("/achievements")}>
            <div className="s-label">MY ACHIEVEMENTS</div>
            <div className="sig">𝒜𝓂</div>
            <div className="c-title">Achievements</div>
            <div className="c-sub">Deakin Robotics · Team · Interview</div>
          </div>

          {/* CLAUSECHECK AU */}
          <div className="card bento-clausecheck reveal delay-2" onClick={e => { e.stopPropagation(); window.open("https://tanstack-start-app.clausecheckau.workers.dev/","_blank"); }}>
            <div className="cc-kicker">⚖️ LIVE AI SAAS · FOUNDER</div>
            <div className="cc-name">ClauseCheck AU</div>
            <p className="cc-desc">Analyses Australian construction contracts (AS4000, GC21, ABIC) and flags risky clauses in plain English — in under 2 minutes.</p>
            <div className="cc-stack">
              {["Claude Opus 4.6","FastAPI","Supabase","Stripe","Cloudflare"].map(t => (
                <span key={t} className="cc-tag">{t}</span>
              ))}
            </div>
            <a href="https://tanstack-start-app.clausecheckau.workers.dev/" target="_blank" rel="noreferrer" className="cc-live-btn" onClick={e => e.stopPropagation()}>
              View Live Product ↗
            </a>
          </div>

          {/* RESUME */}
          <div className="card bento-resume reveal delay-3" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px"}}>
            <div className="resume-icon">📄</div>
            <a href="/Atharva-Mavale-Resume.pdf" download="Atharva-Mavale-Resume.pdf" className="resume-btn" onClick={e => e.stopPropagation()}>
              Download My Resume <span>→</span>
            </a>
          </div>

          {/* PROJECTS */}
          <div className="card bento-projects reveal delay-2" onClick={() => nav("/projects")}>
            <div className="s-label">Showcase</div>
            <div style={{fontSize:"2rem",margin:"10px 0"}}>🗂️</div>
            <div className="c-title">Projects</div>
            <div className="c-sub">View all my work →</div>
          </div>

          {/* AVAILABLE FOR WORK */}
          <div className="card bento-collab reveal delay-1" onClick={() => nav("/contact")}>
            <div className="avail-dot-row">
              <span className="avail-dot"></span>
              <span className="avail-status">Available for Work</span>
            </div>
            <div className="collab-text" style={{marginTop:"10px"}}>Open to <em>AI/ML</em> &amp;<br/>Full-Stack roles.</div>
            <div className="avail-tags">
              <span className="avail-tag">📍 Australia</span>
              <span className="avail-tag">🌐 Remote / Hybrid</span>
              <span className="avail-tag">⏱️ Immediate</span>
            </div>
            <span className="arrow-pill" style={{marginTop:"14px"}}>Get in touch →</span>
          </div>

          {/* PROFILES */}
          <div className="card bento-profiles reveal delay-2">
            <div className="icon-row">
              <a href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer" className="icon-btn" onClick={e => e.stopPropagation()} title="LinkedIn">in</a>
              <a href="https://github.com/atharvamavle" target="_blank" rel="noreferrer" className="icon-btn" onClick={e => e.stopPropagation()} title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.907-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="mailto:atharvamavale26@gmail.com" className="icon-btn" onClick={e => e.stopPropagation()} title="Email">✉</a>
            </div>
            <div className="s-label">Stay With Me</div>
            <div className="c-title">Profiles</div>
          </div>

        </div>
      </div>
    </div>
  );
}
