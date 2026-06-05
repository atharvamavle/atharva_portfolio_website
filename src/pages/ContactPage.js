import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="about-page">
        <div className="page-title">
          <span className="sparkle">✳</span>
          <h1>CONTACT</h1>
          <span className="sparkle">✳</span>
        </div>

        <div className="contact-layout">

          {/* LEFT — form */}
          <div className="about-card contact-form-card">
            <h3>Send a Message</h3>

            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <div className="contact-success-title">Message sent!</div>
                <p className="contact-success-sub">I'll get back to you within 24 hours.</p>
                <button className="contact-submit" onClick={() => setStatus("idle")} style={{marginTop:"16px"}}>
                  Send another →
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden><input name="bot-field" /></p>

                <div className="contact-field">
                  <label className="contact-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Job opportunity, Collaboration..."
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell me what you have in mind..."
                    className="contact-input contact-textarea"
                  />
                </div>

                {status === "error" && (
                  <p className="contact-error">Something went wrong. Try emailing directly.</p>
                )}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — info */}
          <div className="contact-info-col">
            <div className="about-card">
              <h3>Reach Me Directly</h3>
              <div className="exp-item">
                <div className="exp-year">Email</div>
                <div className="exp-role">
                  <a href="mailto:atharvamavale26@gmail.com">atharvamavale26@gmail.com</a>
                </div>
              </div>
              <div className="exp-item">
                <div className="exp-year">LinkedIn</div>
                <div className="exp-role">
                  <a href="https://www.linkedin.com/in/atharva-mavale-70147a1b4" target="_blank" rel="noreferrer">
                    atharva-mavale-70147a1b4
                  </a>
                </div>
              </div>
              <div className="exp-item">
                <div className="exp-year">GitHub</div>
                <div className="exp-role">
                  <a href="https://github.com/atharvamavle" target="_blank" rel="noreferrer">
                    github.com/atharvamavle
                  </a>
                </div>
              </div>
              <div className="exp-item">
                <div className="exp-year">Location</div>
                <div className="exp-role">Highton, Geelong, Australia 🇦🇺</div>
              </div>
            </div>

            <div className="about-card contact-avail-card">
              <h3>Availability</h3>
              <div className="avail-dot-row" style={{marginBottom:"10px"}}>
                <span className="avail-dot"></span>
                <span style={{fontSize:"0.88rem",fontWeight:600,color:"#4ade80"}}>Open to opportunities</span>
              </div>
              <p style={{fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>
                Actively seeking AI/ML engineering, full-stack, or software engineering roles in Australia.
                Open to remote and hybrid arrangements.
              </p>
              <a href="/Atharva-Mavale-Resume.pdf" download className="contact-submit" style={{marginTop:"14px",textAlign:"center",textDecoration:"none",display:"block"}}>
                Download Resume →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
