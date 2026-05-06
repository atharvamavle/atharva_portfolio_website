import React from "react";
import Navbar from "../components/Navbar";

const PROJECTS = [
  {
    id: 1,
    cat: "AI / LLM · Hackathon (Feb 2026)",
    name: "StudyMate AI — Socratic Tutor for Code Repos",
    desc: "Agentic, repo-aware Socratic tutor that adapts explanations to any codebase. Supports beginner → advanced knowledge levels with session-based multi-turn conversations. Submitted to Sophiie AI Agents Hackathon ($5,000 prize).",
    tags: ["FastAPI","Streamlit","GPT-4o-mini","LangChain","Python","Render"],
    emoji: "🎓", cls: "t1",
    github: "https://github.com/atharvamavle/hackathon.git",
    live: "https://atharvamavle-hackathon-uiapp-ps07su.streamlit.app/",
  },
  {
    id: 2,
    cat: "Full-Stack AI / NLP",
    name: "Project Socrates Developer — AI Socratic Tutor",
    desc: "Full-stack web app with Socratic, question-driven tutoring via GPT-4.1-mini. Custom NLP preprocessing (regex tokenisation + lemmatisation) to analyse user input. Backend on Render, frontend on Vercel.",
    tags: ["FastAPI","React","Vite","GPT-4.1-mini","Render","Vercel"],
    emoji: "🤖", cls: "t2",
    github: "https://github.com/atharvamavle/Socrates-Developer-AI.git",
    live: "socrates-developer-ai.vercel.app",
  },
  {
    id: 3,
    cat: "Computer Vision / RAG · In Progress",
    name: "Autonomous Mine Safety RAG Copilot",
    desc: "RAG copilot that answers mining maintenance & safety questions with source-linked citations from manuals and standards. End-to-end RAG pipeline: index → retrieve → generate. YOLO PPE detection integration in progress.",
    tags: ["FastAPI","React","Python","RAG","YOLO","LangChain"],
    emoji: "⛏️", cls: "t3",
    github: "https://github.com/atharvamavle/autonomous-mine-safety-rag.git",
    live: null,
  },
  {
    id: 4,
    cat: "Computer Vision",
    name: "Math with Computer Vision",
    desc: "AI tool that recognises hand-drawn equations in the air using OpenCV and gesture recognition. Solves algebra to calculus in real-time — 60% faster than manual input. Foundation for deep learning & gesture-based systems.",
    tags: ["Python","OpenCV","Gesture Recognition","Computer Vision"],
    emoji: "✋", cls: "t4",
    github: "https://github.com/atharvamavle/Maths-WIth-Computer-Vision.git",
    live: null,
  },
  {
    id: 5,
    cat: "Full-Stack Web App",
    name: "FitTrack — Fitness Tracking Platform",
    desc: "Full-stack fitness tracking application with separate frontend and backend services. Users can log workouts, track progress, and visualise fitness goals over time. Built with a modern web stack and split into client/server repos for clean separation of concerns.",
    tags: ["React","Node.js","Express","REST API","Full-Stack"],
    emoji: "💪", cls: "t1",
    github: "https://github.com/atharvamavle/fittrack-frontend.git",
    githubBackend: "https://github.com/atharvamavle/fittrack-backend.git",
    live: null,
  },
  {
    id: 6,
    cat: "Robotics · Deakin Competitive Robotics",
    name: "Deakin Rover",
    desc: "Autonomous rover project developed as part of Deakin's competitive robotics initiative. Combines embedded systems, sensor integration, and control logic to navigate and complete mission tasks. Hands-on robotics engineering across hardware and software.",
    tags: ["Robotics","Embedded","Sensors","Control Systems","Python"],
    emoji: "🤖", cls: "t2",
    github: "https://github.com/atharvamavle/deakin_rover.git",
    live: null,
  },
  {
    id: 7,
    cat: "AI in Healthcare · Full-Stack CV",
    name: "DermaGuard AI — Skin Cancer Detector",
    desc: "Research proof-of-concept web app for early skin lesion risk awareness. Built as a modular full-stack system with React frontend, FastAPI inference API, and deep learning model workflow for Melanoma/BCC/SCC-style classification support.",
    tags: ["React","TypeScript","FastAPI","PyTorch","Computer Vision","Healthcare AI"],
    emoji: "🩺", cls: "t3",
    github: "https://github.com/atharvamavle/ai-skin-cancer-detector.git",
    live: null,
  },
];

export default function ProjectsPage() {
  const priorityOrder = [
    "FitTrack — Fitness Tracking Platform",
    "Deakin Rover",
    "DermaGuard AI — Skin Cancer Detector",
  ];

  const orderedProjects = [...PROJECTS].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.name);
    const bIndex = priorityOrder.indexOf(b.name);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

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
          {orderedProjects.map(p => (
            <div className="proj-card" key={p.id}>
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