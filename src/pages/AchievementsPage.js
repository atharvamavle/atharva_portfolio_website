import React from "react";
import Navbar from "../components/Navbar";

const IMAGE_FILES = [
  "antenna_deployed.JPG",
  "base_station_team.png",
  "best_team_culture_award.jpg",
  "carrying_rover.jpg",
  "construction_task.JPG",
  "construction_task_livestream.png",
  "derpy_the_dino.JPG",
  "full_team_photo.JPG",
  "full_team_photo_on_lander.JPG",
  "gui.png",
  "opening_ceremony_left.JPG",
  "opening_ceremony_right.JPG",
  "pavers.png",
  "post_landing_processing_plant.JPG",
  "post_landing_task.jpg",
  "robotic_arm_inaction.png",
  "robotic_arm_in_action_2.png",
  "rover_scrutineering.JPG",
];

const HIGHLIGHTS = [
  { label: "Competition", value: "Australian Rover Challenge 2026" },
  { label: "Role", value: "Software Team · Deakin Rover" },
  { label: "Stack", value: "ROS 2 Jazzy + Next.js + Docker" },
  { label: "Year", value: "2026" },
];

export default function AchievementsPage() {
  const formatImageTitle = (fileName) =>
    fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\bGui\b/g, "GUI")
      .replace(/\bJpg\b/g, "JPG")
      .replace(/\bPng\b/g, "PNG")
      .replace(/\bSvg\b/g, "SVG");

  const teamPhotos = IMAGE_FILES.map((fileName, index) => ({
    id: index + 1,
    src: `/img/${fileName}`,
    caption: formatImageTitle(fileName),
  }));

  return (
    <div className="page">
      <Navbar />
      <div className="achievements-page">

        <div className="page-title">
          <span className="sparkle">✳</span>
          <h1>ACHIEVEMENTS</h1>
          <span className="sparkle">✳</span>
        </div>

        {/* HERO BLOG */}
        <article className="ach-hero">
          <div className="ach-hero-tag">FEATURED · COMPETITION BLOG</div>
          <h2 className="ach-hero-title">
            Building an Autonomous Robot for the<br/>
            <span className="ach-accent">Deakin Competitive Robotics Challenge</span>
          </h2>
          <div className="ach-meta">
            <span>Atharva Mavale</span>
            <span className="dot">·</span>
            <span>Deakin University</span>
            <span className="dot">·</span>
            <span>10 min read</span>
          </div>

          <div className="ach-highlights">
            {HIGHLIGHTS.map(h => (
              <div className="ach-stat" key={h.label}>
                <div className="ach-stat-label">{h.label}</div>
                <div className="ach-stat-value">{h.value}</div>
              </div>
            ))}
          </div>

          <div className="ach-blog">
            <p>
              <strong>Deakin Rover</strong> is Deakin University&apos;s student-built, ROS 2 powered
              lunar rover for the <strong>Australian Rover Challenge 2026</strong>. The project delivers
              a complete competition software stack: Jetson Nano onboard ROS 2 system, a ROS bridge based
              communication layer, multi-camera streaming, and a web operator dashboard. The official project
              repository is available at{" "}
              <a href="https://github.com/atharvamavle/deakin_rover.git" target="_blank" rel="noreferrer">
                github.com/atharvamavle/deakin_rover
              </a>.
            </p>
            <h3>What we built</h3>
            <p>
              The system architecture combines a ROS 2 Jazzy middleware stack with containerised deployment,
              a Next.js operator dashboard, joystick teleoperation pipeline, 6-DOF robotic arm kinematics,
              SocketCAN communication, deployable antenna control, and live camera feeds for operations in
              field tasks such as construction, servicing, and navigation.
            </p>
            <h3>What I learned</h3>
            <p>
              Competition robotics is a brutal teacher of integration discipline. Synchronising software,
              electrical, and payload systems under deadline pressure sharpened my debugging, communication,
              and reliability-first engineering mindset.
            </p>
            <h3>The result</h3>
            <p>
              Team Deakin completed ARC 2026 with a working end-to-end rover platform and received the
              <strong> Best Team Culture</strong> award. My contribution: <strong>Completed the rover
              control GUI by integrating ROS bridge for teleoperation and contributed to autonomous rover
              and arm navigation using ROS 2 and MoveIt path planning.</strong>
            </p>
          </div>
        </article>

        {/* INTERVIEW VIDEO */}
        <section className="ach-section">
          <div className="ach-section-head">
            <span className="ach-section-kicker">WATCH</span>
            <h3>Post-Competition Interview</h3>
            <p>A short interview about the build, the team, and what we&apos;d do differently next time.</p>
          </div>
          <div className="ach-video-frame">
            <iframe
              src="https://www.youtube.com/embed/w5BgcgU1dxY"
              title="Deakin Competitive Robotics Interview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* TEAM PHOTOS */}
        <section className="ach-section">
          <div className="ach-section-head">
            <span className="ach-section-kicker">GALLERY</span>
            <h3>Team &amp; Build Photos</h3>
            <p>Moments from the lab, the arena, and the celebration that followed.</p>
          </div>
          <div className="ach-gallery">
            {teamPhotos.map(p => (
              <figure className="ach-photo" key={p.id}>
                <div className="ach-photo-thumb">
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/img/best_team_culture_award.png";
                    }}
                  />
                </div>
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
