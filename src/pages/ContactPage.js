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
             