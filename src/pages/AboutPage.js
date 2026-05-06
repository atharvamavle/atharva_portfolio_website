import React from "react";
import Navbar from "../components/Navbar";

const SKILLS = [
  { name: "Python / AI-ML (PyTorch, scikit-learn, YOLO, OpenCV)", pct: 94 },
  { name: "LLM / NLP (LangChain, Hugging Face, NLTK)", pct: 86 },
  { name: "Full-Stack (FastAPI, React, Vite, Streamlit)", pct: 84 },
  { name: "Cloud & DevOps (Azure ML SDK v2, Docker, AWS Lambda)", pct: 82 },
  { name: "Data & Databases (SQL, MySQL, MongoDB, Tableau)", pct: 79 },
  { name: "Robotics (ROS 2, MoveIt, Teleoperation GUI)", pct: 80 },
];

export default function AboutPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="about-page">

        {/* bio */}
        <div className="about-hero">
          <img src={require("../assets/photo.png")} style={{width:"160px",height:"200px",borderRadius:"18px",objectFit:"cover",border:"2px solid rgba(255,255,255,0.07)"}} alt="Atharva" />
          <div className="about-bio">
            <h1>Atharva Santosh Mavale</h1>
            <p>
              AI/ML engineer and Master of Applied AI student at Deakin University,
              building production-grade systems across MLOps, full-stack applications,
              and robotics. I have delivered an Azure ML SDK v2 predictive maintenance
              pipeline with custom feature engineering and managed online endpoint
              deployment for real-time inference, and built DermaGuard AI (PyTorch
              EfficientNet-B4) for accessible early-stage skin cancer risk awareness.
              I am also developing Fit Track, a FastAPI + React platform with Alexa
              (AWS Lambda) integration, extending it with AI-driven nutrition parsing
              and habit insights.
            </p>
          </div>
        </div>

        {/* experience + education */}
        <div className="about-cards">

          <div className="about-card">
            <h3>Experience</h3>
            <div className="exp-item">
              <div className="exp-year">Oct 2025 – Present</div>
              <div className="exp-role">AI Developer (Capstone)</div>
              <div className="exp-org">InnovAIte · Australia</div>
              <ul className="exp-points">
                <li>
                  Tuned a YOLO + OCR pipeline for whiteboard detection by analyzing low-recall failure cases,
                  adjusting confidence thresholds, and planning dataset expansion.
                </li>
                <li>
                  Prototyped audio feedback so detections are usable for end users and began integration testing
                  beyond research-only prototypes.
                </li>
                <li>
                  Hardened a React Native navigation app with safe-exit confirmation, consistent back/forward
                  flows, and TypeScript/runtime bug fixes informed by OSRM routing research.
                </li>
              </ul>
            </div>
            <div className="exp-item">
              <div className="exp-year">Aug 2025 – Present</div>
              <div className="exp-role">Software Engineer</div>
              <div className="exp-org">Deakin Competitive Robotics · Australia</div>
              <ul className="exp-points">
                <li>
                  Competed in the 2026 Australian Rover Challenge against 17 university teams and 390+ students
                  from Australia, Poland, Kazakhstan, Indonesia, and India; achieved a 12th-place team finish.
                </li>
                <li>
                  Completed the rover control GUI by integrating ROS bridge for teleoperation and contributed to
                  autonomous rover and arm navigation using ROS 2 and MoveIt path planning.
                </li>
              </ul>
            </div>
          </div>

          <div className="about-card">
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
          </div>

          <div className="about-card">
            <h3>Hackathon</h3>
            <div className="exp-item">
              <div className="exp-year">2026</div>
              <div className="exp-role">Sophiie AI Agents Hackathon</div>
              <div className="exp-org">AI-powered Questioning Coding Tutor</div>
              <ul className="exp-points">
                <li>
                  Developed an AI-powered tutoring assistant that helps students understand code — especially intimidating GitHub repositories — by asking the right questions, offering progressive hints, and guiding learning step-by-step.
                </li>
              </ul>
            </div>
          </div>

          {/* skills */}
          <div className="about-card skills-card">
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

        {/* contact */}
        <div className="contact-row">
          <a href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer" className="contact-chip">
            💼 LinkedIn
          </a>
          <a href="https://github.com/atharvamavle" target="_blank" rel="noreferrer" className="contact-chip">
            🐙 GitHub
          </a>
          <a href="mailto:atharvamavale26@gmail.com" className="contact-chip">
            ✉️ atharvamavale26@gmail.com
          </a>
          <a href="tel:0403912780" className="contact-chip">
            📞 0403-912-780
          </a>
        </div>

      </div>
    </div>
  );
}