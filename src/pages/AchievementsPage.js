import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

function parseVal(v) {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1], 10), suffix: m[2] } : { num: null, suffix: v };
}

function AchStat({ value, label, sub, delay }) {
  const { num, suffix } = parseVal(value);
  const [display, setDisplay] = useState(num !== null ? 0 : value);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (num === null) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  useEffect(() => {
    if (!started || num === null) return;
    const t = setTimeout(() => {
      const steps = 45;
      const interval = 800 / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const eased = 1 - Math.pow(1 - step / steps, 3);
        setDisplay(Math.round(eased * num));
        if (step >= steps) clearInterval(timer);
      }, interval);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(t);
  }, [started, num, delay]);

  return (
    <div className="ach-stat-card" ref={ref} style={{ animationDelay: `${delay}ms` }}>
      <div className="ach-stat-card-value">
        {num !== null ? display + suffix : value}
      </div>
      <div className="ach-stat-card-label">{label}</div>
      <div className="ach-stat-card-sub">{sub}</div>
    </div>
  );
}

const IMAGE_FILES = [
  "antenna_deployed.JPG","base_station_team.png","best_team_culture_award.jpg",
  "carrying_rover.jpg","construction_task.JPG","construction_task_livestream.png",
  "derpy_the_dino.JPG","full_team_photo.JPG","full_team_photo_on_lander.JPG",
  "gui.png","opening_ceremony_left.JPG","opening_ceremony_right.JPG",
  "pavers.png","post_landing_processing_plant.JPG","post_landing_task.jpg",
  "robotic_arm_inaction.png","robotic_arm_in_action_2.png","rover_scrutineering.JPG",
];

const STATS = [
  { label: "Placement",   value: "12th",    sub: "out of 17 teams" },
  { label: "Students",    value: "390+",    sub: "across 5 countries" },
  { label: "Award",       value: "🏆",      sub: "Best Team Culture" },
  { label: "Year",        value: "2026",    sub: "ARC · Adelaide" },
];

const SECTIONS = [
  {
    n: "01", title: "What we built",
    body: "The system architecture combines a ROS 2 Jazzy middleware stack with containerised deployment, a Next.js operator dashboard, joystick teleoperation pipeline, 6-DOF robotic arm kinematics, SocketCAN communication, deployable antenna control, and live multi-camera feeds for field tasks including construction, servicing, and navigation.",
  },
  {
    n: "02", title: "My contribution",
    body: "Completed the rover control GUI by integrating ROS bridge for teleoperation. Contributed to autonomous rover and arm navigation using ROS 2 and MoveIt path planning. Also assisted with software integration testing under field conditions.",
    highlight: true,
  },
  {
    n: "03", title: "What I learned",
    body: "Competition robotics is a brutal teacher of integration discipline. Synchronising software, electrical, and payload systems under deadline pressure sharpened my debugging, communication, and reliability-first engineering mindset.",
  },
];

export default function AchievementsPage() {
  const formatTitle = (f) =>
    f.replace(/\.[^/.]+$/, "").replace(/_/g, " ").trim()
     .replace(/\b\w/g, c => c.toUpperCase())
     .replace(/\bGui\b/g,"GUI");

  const photos = IMAGE_FILES.map((f, i) => ({ id: i, src: `/img/${f}`, caption: formatTitle(f) }));

  return (
    <div className="page">
      <Navbar />
      <div className="achievements-page">

        <div className="page-title reveal">
          <span className="sparkle">✳</span>
          <h1>ACHIEVEMENTS</h1>
          <span className="sparkle">✳</span>
        </div>

        {/* ── HERO ARTICLE ── */}
        <article className="ach-hero reveal">
          <div className="ach-hero-top">
            <span className="ach-hero-tag">FEATURED · COMPETITION BLOG</span>
            <span className="ach-hero-year">ARC 2026</span>
          </div>

          <h2 className="ach-hero-title">
            Building an Autonomous Rover for the<br/>
            <span className="ach-accent">Australian Rover Challenge 2026</span>
          </h2>

          <div className="ach-meta">
            <span>Atharva Mavale</span>
            <span className="dot">·</span>
            <span>Deakin University</span>
            <span className="dot">·</span>
            <span>10 min read</span>
            <span className="dot">·</span>
            <span>ROS 2 · Next.js · Docker</span>
          </div>

          {/* Stats bar — animated */}
          <div className="ach-stats-bar">
            {STATS.map((s, i) => (
              <AchStat key={s.label} {...s} delay={i * 130} />
            ))}
          </div>

          {/* Intro */}
          <p className="ach-intro">
            <strong>Deakin Rover</strong> is Deakin University's student-built, ROS 2 powered
            lunar rover for the <strong>Australian Rover Challenge 2026</strong> — a national
            university robotics competition held in Adelaide. The project delivers a complete
            competition software stack: Jetson Nano onboard ROS 2 system, a ROS bridge communication
            layer, multi-camera streaming, and a web operator dashboard.{" "}
            <a href="https://github.com/atharvamavle/deakin_rover.git" target="_blank" rel="noreferrer">
              View repository ↗
            </a>
          </p>

          {/* Numbered sections */}
          <div className="ach-sections">
            {SECTIONS.map(s => (
              <div className={`ach-section-block${s.highlight ? " ach-section-highlight" : ""}`} key={s.n}>
                <div className="ach-section-num">{s.n}</div>
                <div className="ach-section-content">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Award callout */}
          <div className="ach-award-callout">
            <div className="ach-award-icon">🏆</div>
            <div>
              <div className="ach-award-title">Best Team Culture Award</div>
              <div className="ach-award-sub">Deakin Rover team — Australian Rover Challenge 2026</div>
            </div>
          </div>
        </article>

        {/* ── VIDEO ── */}
        <section className="ach-section reveal">
          <div className="ach-section-head">
            <span className="ach-section-kicker">WATCH</span>
            <h3>Post-Competition Interview</h3>
            <p>A short interview covering the build process, teamwork under pressure, and what we'd do differently next time.</p>
          </div>
          <div className="ach-video-wrap">
            <div className="ach-video-frame">
              <iframe
                src="https://www.youtube.com/embed/w5BgcgU1dxY"
                title="Deakin Competitive Robotics Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="ach-video-side">
              <div className="ach-video-badge">🎥 Team Interview</div>
              <p>Recorded after ARC 2026. We discuss how the rover came together, the integration challenges on competition day, and the culture that earned us the team award.</p>
              <div className="ach-video-tags">
                <span>ARC 2026</span>
                <span>ROS 2</span>
                <span>Deakin Rover</span>
                <span>Best Team Culture</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="ach-section reveal">
          <div className="ach-section-head">
            <span className="ach-section-kicker">GALLERY</span>
            <h3>Team &amp; Build Photos</h3>
            <p>Moments from the lab, the arena, and the celebration that followed.</p>
            <span className="ach-photo-count">{photos.length} photos</span>
          </div>
          <div className="ach-gallery">
            {photos.map(p => (
              <figure className="ach-photo" key={p.id}>
                <div className="ach-photo-thumb">
                  <img src={p.src} alt={p.caption} loading="lazy"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = "/img/best_team_culture_award.jpg"; }}
                  />
                  <div className="ach-photo-overlay">
                    <div className="ach-photo-caption-pill">{p.caption}</div>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
