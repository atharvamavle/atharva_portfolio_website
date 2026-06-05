import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

const PROJECTS = [
  {
    id: 0,
    cat: "Legal Tech AI · SaaS · Founder & Solo Developer (May 2026)",
    name: "ClauseCheck AU — AI Construction Contract Analyser",
    desc: "Sole founder of a live AI SaaS that analyses Australian construction contracts (AS4000, GC21, ABIC) and flags risky clauses in plain English in under 2 minutes. Async FastAPI + Supabase Realtime pipeline eliminates cold-start timeouts. CI/CD via GitHub Actions with 12 AI eval pytest tests all green; state-specific SoP Act rules for all 8 AU states.",
    tags: ["TanStack Start","TypeScript","FastAPI","Claude Opus 4.6","Supabase","Stripe","Cloudflare Workers","GitHub Actions"],
    emoji: "⚖️", cls: "t5",
    github: "https://github.com/atharvamavle/Contract-Guardian-Australia.git",
    live: "https://tanstack-start-app.clausecheckau.workers.dev/",
  },
  {
    id: 1,
    cat: "Full-Stack Web App · Voice AI (2026 – Present)",
    name: "Fit Track — Voice-First Fitness & Calorie Tracker",
    desc: "Designed an end-to-end system where Alexa logs workouts/meals via AWS Lambda into a Render-hosted backend, with a React dashboard for daily calories and history. Actively maintained open-source project with ~80 clones and ~40 unique cloners over 14 days.",
    tags: ["Alexa","AWS Lambda","Python","REST API","React","Node.js"],
    emoji: "💪", cls: "t1",
    github: "https://github.com/atharvamavle/fittrack-frontend.git",
    githubBackend: "https://github.com/atharvamavle/fittrack-backend.git",
    live: null,
  },
  {
    id: 2,
    cat: "AI / LLM · Hackathon (Feb 2026)",
    name: "StudyMate AI — Agentic Socratic Tutor",
    desc: "Repo-aware AI tutor with 3-level adaptive teaching serving 5+ users; deployed Python REST backend on Render with auto-scaling. Submitted to Sophiie AI Agents Hackathon among 200+ Australian developers for a $5K prize competition.",
    tags: ["FastAPI","Streamlit","GPT-4o-mini","LangChain","Python","Render"],
    emoji: "🎓", cls: "t2",
    github: "https://github.com/atharvamavle/hackathon.git",
    live: "https://atharvamavle-hackathon-uiapp-ps07su.streamlit.app/",
  },
  {
    id: 3,
    cat: "Computer Vision / RAG · Jan 2026",
    name: "Autonomous Mine Safety RAG Copilot",
    desc: "Replaced keyword search with an NLP Q&A system citing 10+ manuals; reduced query time by 75% with a 1,000+ chunk RAG pipeline. Integrating YOLO PPE detection for real-time safety monitoring across 3 camera feeds.",
    tags: ["FastAPI","React","Python","RAG","YOLO","LangChain"],
    emoji: "⛏️", cls: "t3",
    github: "https://github.com/atharvamavle/autonomous-mine-safety-rag.git",
    live: null,
  },
  {
    id: 4,
    cat: "AI in Healthcare · Full-Stack CV",
    name: "DermaGuard AI — Skin Cancer Detector",
    desc: "PyTorch EfficientNet-B4 skin risk assessment platform enabling accessible, early-stage medical screening via the web. Modular full-stack system: React frontend, FastAPI inference API, and deep learning model workflow for Melanoma/BCC/SCC classification.",
    tags: ["React","TypeScript","FastAPI","PyTorch","EfficientNet-B4","Healthcare AI"],
    emoji: "🩺", cls: "t3",
    github: "https://github.com/atharvamavle/ai-skin-cancer-detector.git",
    live: null,
  },
  {
    id: 5,
    cat: "Robotics · Deakin Competitive Robotics (2026)",
    name: "Deakin Rover — ARC 2026",
    desc: "Autonomous rover built for the 2026 Australian Rover Challenge. Completed the rover control GUI by integrating ROS bridge for teleoperation and contributing to autonomous navigation and arm control using ROS 2 and MoveIt. Team placed 12th out of 17 international teams.",
    tags: ["ROS 2","MoveIt","Python","Docker","Next.js","Robotics"],
    emoji: "🚀", cls: "t4",
    github: "https://github.com/atharvamavle/deakin_rover.git",
    live: null,
  },
  {
    id: 6,
    cat: "Full-Stack AI / NLP",
    name: "Project Socrates Developer — AI Socratic Tutor",
    desc: "Full-stack web app with Socratic, question-driven tutoring via GPT-4.1-mini. Custom NLP preprocessing with regex tokenisation and lemmatisation to analyse user input. Backend on Render, frontend on Vercel.",
    tags: ["FastAPI","React","Vite","GPT-4.1-mini","Render","Vercel"],
    emoji: "🤖", cls: "t2",
    github: "https://github.com/atharvamavle/Socrates-Developer-AI.git",
    live: "https://socrates-developer-ai.vercel.app",
  },
  {
    id: 7,
    cat: "Computer Vision",
    name: "Math with Computer Vision",
    desc: "AI tool that recognises hand-drawn equations in the air using OpenCV and gesture recognition. Solves algebra to calculus in real-time — 60% faster than manual input.",
    tags: ["Python","OpenCV","Gesture Recognition","Computer Vision"],
    emoji: "✋", cls: "t4",
    github: "https://github.com/atharvamavle/Maths-WIth-Computer-Vision.git",
    live: null,
  },
];

export default function ProjectsPage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".proj-card");
    const handlers = [];
    cards.forEach(card => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.018)`;
      };
      const onLeave = () => { card.style.transform = ""; };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ card, onMove, onLeave });
    });
    return () => handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  }, []);

  return (
    <div className="page">
      <Navbar />
      <div className="projects-page">
        <div className="page-title">
          <span className="sparkle">✳</span>
          <h1>ALL PROJECTS</h1>
          <span className="sparkle">✳</span>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <div className="proj-card reveal" key={p.id}>
              <div className={`proj-thumb ${p.cls}`}>{p.emoji}</div>
              <div className="proj-info">
                <div className="proj-cat">{p.cat}</div>
                <div className="proj-name">{p.name}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
                <div className="proj-links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                    {p.githubBackend ? "Frontend Repo →" : "GitHub →"}
                  </a>
                  {p.githubBackend && (
                    <a href={p.githubBackend} target="_blank" rel="noreferrer" className="proj-link">
                      Backend Repo →
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="proj-link primary">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
