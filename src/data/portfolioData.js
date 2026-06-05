// src/data/portfolioData.js

export const portfolioData = {
  personal: {
    name: "Atharva Mavale",
    title: "AI/ML Engineer",
    location: "Highton, Geelong, Australia",
    phone: "0403-912-780",
    email: "atharvamavale26@gmail.com",
    summary:
      "AI/ML engineer and Master of Applied AI student at Deakin University, building production-grade systems across MLOps, full-stack SaaS, and robotics. Founded and solo-shipped ClauseCheck AU — a live AI SaaS analysing Australian construction contracts using Claude Opus 4.6.",
    links: {
      portfolio: "https://atharva-m.netlify.app/",
      linkedin: "https://www.linkedin.com/in/atharva-mavale-70147a1b4",
      github: "https://github.com/atharvamavle",
      resume: "/Atharva-Mavale-Resume.pdf"
    }
  },

  education: [
    {
      degree: "Master of Applied Artificial Intelligence (Professional)",
      institution: "Deakin University, Melbourne",
      years: "2024–2026"
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Pillai College, Mumbai",
      years: "2020–2023",
      grade: "8.38 CGPA"
    }
  ],

  skills: {
    languages: ["Python (advanced)", "SQL", "Java", "R", "JavaScript"],
    aiMl: [
      "PyTorch",
      "OpenCV",
      "LangChain",
      "YOLO",
      "Hugging Face",
      "scikit-learn",
      "NLTK"
    ],
    devops: ["Docker", "Microsoft Azure"],
    databases: ["MySQL", "MongoDB"],
    development: [
      "FastAPI",
      "React",
      "Vite",
      "Streamlit",
      "ROS 2",
      "Git",
      "Agile/SCRUM"
    ],
    dataCloud: ["Tableau", "Render", "Vercel", "Netlify", "REST APIs", "Obsidian"]
  },

  experience: [
    {
      role: "AI Developer (Capstone)",
      company: "InnovAIte, Australia",
      years: "Oct 2025–Present",
      highlights: [
        "Tuned a YOLO + OCR pipeline for whiteboard detection by analyzing low-recall failure cases, adjusting confidence thresholds, and planning dataset expansion.",
        "Prototyped audio feedback module to make detections accessible for end users, enabling integration testing beyond the research phase.",
        "Hardened a React Native navigation app with safe-exit confirmation, consistent back/forward flows, and TypeScript/runtime bug fixes informed by OSRM routing research."
      ],
      tags: ["computer vision", "YOLO", "OCR", "React Native"]
    },
    {
      role: "Software Engineer",
      company: "Deakin Competitive Robotics",
      years: "Aug 2025–Present",
      highlights: [
        "Represented Deakin University at the 2026 Australian Rover Challenge (17 teams, 390+ students across 5 countries), placing 12th while applying teamwork, field problem-solving, and high-pressure debugging skills.",
        "Completed the rover control GUI by integrating ROS bridge for teleoperation and contributing to autonomous rover and arm navigation using ROS 2 and MoveIt path planning."
      ],
      tags: ["robotics", "ROS 2", "navigation", "GUI"]
    }
  ],

  projects: [
    {
      name: "ClauseCheck AU",
      subtitle: "AI SaaS · Founder & Solo Developer",
      stack: ["TanStack Start", "TypeScript", "FastAPI", "Claude Opus 4.6 + Haiku", "Supabase", "Stripe", "Cloudflare Workers", "GitHub Actions"],
      tags: ["legal tech", "saas", "ai", "construction", "full stack", "production", "founder"],
      short:
        "Sole founder of a live AI SaaS that analyses Australian construction contracts (AS4000, GC21, ABIC) and flags risky clauses in plain English in under 2 minutes. 12 AI eval pytest tests all green; state-specific SoP Act rules for all 8 AU states.",
      bestFor: ["FastAPI", "Claude API", "SaaS architecture", "full-stack production", "founder"],
      priority: 11,
      links: {
        live: "https://tanstack-start-app.clausecheckau.workers.dev/",
        github: "https://github.com/atharvamavle/Contract-Guardian-Australia.git"
      }
    },
    {
      name: "Fit Track",
      subtitle: "Voice-First Fitness & Calorie Tracker",
      stack: ["Alexa", "AWS Lambda", "Python", "REST API", "React"],
      tags: ["fitness", "voice ai", "react", "backend", "full stack"],
      short:
        "End-to-end system where Alexa logs workouts/meals via Lambda into a Render-hosted backend with a React dashboard. Open-source with ~80 clones and ~40 unique cloners over 14 days.",
      bestFor: ["React", "full-stack", "API integration", "AWS Lambda"],
      priority: 8,
      links: {
        live: null,
        github: "https://github.com/atharvamavle/fittrack-frontend.git",
        githubBackend: "https://github.com/atharvamavle/fittrack-backend.git"
      }
    },
    {
      name: "StudyMate AI",
      subtitle: "Agentic Socratic Tutor",
      stack: ["FastAPI", "Streamlit", "GPT-4o-mini", "LangChain", "Python", "Render"],
      tags: ["llm", "agentic ai", "edtech", "genai"],
      short:
        "Repo-aware AI tutor with 3-level adaptive teaching serving 5+ users. Submitted to Sophiie AI Agents Hackathon among 200+ Australian developers for a $5K prize.",
      bestFor: ["LLM", "LangChain", "AI tutor", "agentic systems"],
      priority: 9,
      links: {
        live: "https://atharvamavle-hackathon-uiapp-ps07su.streamlit.app/",
        github: "https://github.com/atharvamavle/hackathon.git"
      }
    },
    {
      name: "Mine Safety RAG Copilot",
      subtitle: "Industrial Safety Q&A and Monitoring",
      stack: ["FastAPI", "React", "Python", "RAG", "YOLO", "LangChain"],
      tags: ["rag", "nlp", "computer vision", "safety", "yolo"],
      short:
        "Replaced keyword search with NLP Q&A citing 10+ manuals; reduced query time by 75% with 1,000+ chunk RAG pipeline. Integrating YOLO PPE detection across 3 camera feeds.",
      bestFor: ["RAG", "YOLO", "safety AI", "document QA"],
      priority: 9,
      links: {
        live: null,
        github: "https://github.com/atharvamavle/autonomous-mine-safety-rag.git"
      }
    },
    {
      name: "DermaGuard AI",
      subtitle: "AI Skin Cancer Screening App",
      stack: ["React", "TypeScript", "FastAPI", "PyTorch", "EfficientNet-B4"],
      tags: ["computer vision", "healthtech", "deep learning", "full stack"],
      short:
        "PyTorch Efficient