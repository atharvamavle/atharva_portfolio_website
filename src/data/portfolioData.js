// src/data/portfolioData.js

export const portfolioData = {
  personal: {
    name: "Atharva Mavale",
    title: "AI/ML Engineer",
    location: "Highton, Geelong, Australia",
    phone: "0403-912-780",
    email: "atharvamavale26@gmail.com",
    summary:
      "AI/ML engineer and Master of Applied AI student at Deakin University, building production-grade systems across MLOps, full-stack applications, and robotics.",
    links: {
      portfolio: "https://atharva-m.netlify.app/",
      linkedin: "https://www.linkedin.com/in/atharva-mavale-70147a1b4",
      github: "https://github.com/atharvamavle", // TODO: replace
    //   resume: "https://atharva-m.netlify.app/Atharva-Mavale-Resume.pdf"
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
        "Tuned a YOLO + OCR pipeline for whiteboard detection by analyzing low-recall failure cases and adjusting thresholds.",
        "Prototyped audio feedback so detection results are usable for end users, not just research demos.",
        "Hardened a React Native navigation app with safe-exit flows and TypeScript/runtime bug fixes."
      ],
      tags: ["computer vision", "YOLO", "OCR", "React Native"]
    },
    {
      role: "Software Engineer",
      company: "Deakin Competitive Robotics",
      years: "Aug 2025–Present",
      highlights: [
        "Competed in the 2026 Australian Rover Challenge and achieved 12th place among 17 teams.",
        "Completed rover control GUI using ROS bridge for teleoperation.",
        "Contributed to autonomous rover and arm navigation using ROS 2 and MoveIt."
      ],
      tags: ["robotics", "ROS 2", "navigation", "GUI"]
    }
  ],

  projects: [
    {
      name: "Fit Track",
      subtitle: "Voice-first Fitness & Calorie Tracker",
      stack: ["Alexa", "AWS Lambda", "Python", "REST API", "React"],
      tags: ["fitness", "voice ai", "react", "backend", "full stack"],
      short:
        "Voice-first fitness and calorie tracking app with Alexa logging and a React dashboard.",
      bestFor: ["React", "full-stack", "API integration", "AWS Lambda"],
      priority: 8,
      links: {
        live: "https://your-fit-track-live-link.com",
        github: "https://github.com/atharvamavle/fittrack-frontend.git"
      }
    },
    {
      name: "DermaGuard AI",
      subtitle: "AI Skin Cancer Screening App",
      stack: ["React", "FastAPI", "PyTorch", "EfficientNet-B4", "Google Places API"],
      tags: ["computer vision", "healthtech", "deep learning", "full stack"],
      short:
        "Skin cancer screening app with AI image analysis, PDF reports, and clinic discovery.",
      bestFor: ["computer vision", "PyTorch", "medical AI", "FastAPI"],
      priority: 10,
      links: {
        live: "https://your-dermaguard-live-link.com",
        github: "https://github.com/atharvamavle/ai-skin-cancer-detector.git"
      }
    },
    {
      name: "StudyMate AI",
      subtitle: "Agentic Socratic Tutor",
      stack: ["FastAPI", "Streamlit", "GPT-4o-mini", "LangChain"],
      tags: ["llm", "agentic ai", "edtech", "genai"],
      short:
        "Repo-aware AI tutor with 3-level adaptive teaching and a FastAPI backend on Render.",
      bestFor: ["LLM", "LangChain", "AI tutor", "agentic systems"],
      priority: 9,
      links: {
        live: "https://your-studymate-live-link.com",
        github: "https://github.com/atharvamavle/hackathon.git"
      }
    },
    {
      name: "Mine Safety RAG Copilot",
      subtitle: "Industrial Safety Q&A and Monitoring",
      stack: ["FastAPI", "React", "Python", "RAG", "YOLO"],
      tags: ["rag", "nlp", "computer vision", "safety", "yolo"],
      short:
        "Safety assistant combining RAG over manuals with YOLO PPE detection for real-time monitoring.",
      bestFor: ["RAG", "YOLO", "safety AI", "document QA"],
      priority: 9,
      links: {
        live: "https://your-mine-safety-live-link.com",
        github: "https://github.com/atharvamavle/autonomous-mine-safety-rag.git"
      }
    },
    {
      name: "ClauseCheck AU",
      subtitle: "AI-Powered Australian Construction Contract Risk Analyser",
      stack: ["React", "TanStack", "FastAPI", "Claude API", "Supabase", "Stripe", "Cloudflare Workers"],
      tags: ["legal tech", "saas", "ai", "construction", "full stack", "production"],
      short:
        "AI-powered SaaS that analyzes Australian construction contracts (AS 4000, GC21, ABIC) and flags time bars, liquidated damages, SoP Act deadlines, and termination risks in plain English.",
      bestFor: ["FastAPI", "React", "Claude API", "SaaS architecture", "full-stack production"],
      priority: 11,
      links: {
        live: "https://tanstack-start-app.clausecheckau.workers.dev/",
        github: "https://github.com/atharvamavle/Contract-Guardian-Australia.git"
      }
    }
  ],

  certifications: [
    {
      name: "Python Programming",
      provider: "Techgen Institute",
      years: "Sep–Dec 2023",
      summary: "60-hour intensive covering OOP and data structures; built 5 projects."
    },
    {
      name: "After Effects",
      provider: "Frameboxx Vashi",
      years: "Mar–May 2024",
      summary: "40-hour course in motion design and compositing."
    }
  ]
};