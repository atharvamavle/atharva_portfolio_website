import React from "react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="about-page">
        <div className="page-title">
          <span className="sparkle">✳</span>
          <h1>CONTACT</h1>
          <span className="sparkle">✳</span>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <h3>Let&apos;s Connect</h3>
            <div className="exp-item">
              <div className="exp-role">LinkedIn</div>
              <div className="exp-org">
                <a href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer">
                  linkedin.com/in/atharva-mavale-70147a1b4
                </a>
              </div>
            </div>
            <div className="exp-item">
              <div className="exp-role">GitHub</div>
              <div className="exp-org">
                <a href="https://github.com/atharvamavle" target="_blank" rel="noreferrer">
                  github.com/atharvamavle
                </a>
              </div>
            </div>
          </div>

          <div className="about-card">
            <h3>Email</h3>
            <div className="exp-item">
              <div className="exp-role">Primary Email (Gmail)</div>
              <div className="exp-org">
                <a href="mailto:atharvamavale26@gmail.com">atharvamavale26@gmail.com</a>
              </div>
            </div>
            <div className="exp-item">
              <div className="exp-role">Open in Gmail</div>
              <div className="exp-org">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=atharvamavale26@gmail.com" target="_blank" rel="noreferrer">
                  Compose email in Gmail
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-row">
          <a className="contact-chip" href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="contact-chip" href="https://github.com/atharvamavle" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="contact-chip" href="mailto:atharvamavale26@gmail.com">
            Email
          </a>
          <a className="contact-chip" href="/Atharva-Mavale-Resume.pdf" download="Atharva-Mavale-Resume.pdf">
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
