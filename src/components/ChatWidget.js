// src/components/ChatWidget.js

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";

// Config
const MAX_FREE_MESSAGES = 3;
const RESUME_URL = portfolioData?.personal?.links?.resume || "";

function renderAssistantMessage(text) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const hasResume =
    RESUME_URL &&
    lines.some(
      (line) =>
        line.includes(RESUME_URL) ||
        /resume/i.test(line) ||
        /cv/i.test(line)
    );

  return (
    <>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("GitHub:")) {
          const url = trimmed.replace("GitHub:", "").trim();
          return (
            <div key={index} className="chat-link-row">
              <a href={url} target="_blank" rel="noopener noreferrer" className="chat-link">GitHub</a>
            </div>
          );
        }
        if (trimmed.startsWith("Live:")) {
          const url = trimmed.replace("Live:", "").trim();
          return (
            <div key={index} className="chat-link-row">
              <a href={url} target="_blank" rel="noopener noreferrer" className="chat-link">Live Demo</a>
            </div>
          );
        }
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
          return (
            <div key={index} className="chat-bullet-line">
              <span className="chat-bullet-dot">•</span>
              <span>{trimmed.replace(/^[•-]\s*/, "")}</span>
            </div>
          );
        }
        return <div key={index} className="chat-text-line">{trimmed}</div>;
      })}
      {hasResume && RESUME_URL && (
        <div className="chat-link-row">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="chat-button-link">
            Download Resume (PDF)
          </a>
        </div>
      )}
    </>
  );
}

function renderMessage(message) {
  if (message.role === "assistant") return renderAssistantMessage(message.text);
  return message.text.split("\n").map((line, index) => (
    <div key={index} className="chat-text-line">{line}</div>
  ));
}

// Robot SVG icon
const RobotIcon = () => (
  <svg width="48" height="48" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rHG" x1="6" y1="13" x2="26" y2="33" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f8f8f8"/>
        <stop offset="100%" stopColor="#c8c8cc"/>
      </linearGradient>
      <linearGradient id="rVG" x1="7" y1="18" x2="25" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6dd5f0"/>
        <stop offset="100%" stopColor="#1a7fc4"/>
      </linearGradient>
      <linearGradient id="rBG" x1="9" y1="32" x2="23" y2="41" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3d4f6e"/>
        <stop offset="100%" stopColor="#1e2d45"/>
      </linearGradient>
      <linearGradient id="rBB" x1="24" y1="1" x2="41" y2="13" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8ed45a"/>
        <stop offset="100%" stopColor="#5aaa28"/>
      </linearGradient>
      <filter id="rDS">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="rgba(0,0,0,0.35)"/>
      </filter>
      <filter id="rSS">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.25)"/>
      </filter>
    </defs>
    {/* Chat bubble */}
    <rect x="24" y="1" width="17" height="12" rx="4" fill="url(#rBB)" filter="url(#rDS)"/>
    <circle cx="29" cy="7" r="1.4" fill="#1e4010"/>
    <circle cx="33" cy="7" r="1.4" fill="#1e4010"/>
    <circle cx="37" cy="7" r="1.4" fill="#1e4010"/>
    <path d="M26 13 L24 17 L31 13Z" fill="#5aaa28"/>
    <rect x="26" y="3" width="6" height="2.5" rx="1.2" fill="rgba(255,255,255,0.3)"/>
    {/* Antenna */}
    <rect x="15" y="5" width="2" height="9" rx="1" fill="#b0b0b8"/>
    <circle cx="16" cy="4" r="3" fill="#FFD700" filter="url(#rDS)"/>
    <circle cx="15" cy="3" r="1.1" fill="rgba(255,255,255,0.6)"/>
    {/* Head */}
    <rect x="5" y="14" width="22" height="19" rx="7" fill="url(#rHG)" filter="url(#rDS)"/>
    <rect x="8" y="15.5" width="9" height="4" rx="2" fill="rgba(255,255,255,0.55)"/>
    {/* Visor */}
    <rect x="7.5" y="18.5" width="17" height="10" rx="4" fill="url(#rVG)" filter="url(#rSS)"/>
    <rect x="8.5" y="19.2" width="6" height="2.5" rx="1.2" fill="rgba(255,255,255,0.35)"/>
    {/* Eyes */}
    <circle cx="12.5" cy="23.5" r="2.6" fill="white" opacity="0.95"/>
    <circle cx="19.5" cy="23.5" r="2.6" fill="white" opacity="0.95"/>
    <circle cx="13.1" cy="23" r="1.1" fill="#5bbde0"/>
    <circle cx="20.1" cy="23" r="1.1" fill="#5bbde0"/>
    {/* Ears */}
    <rect x="2" y="19" width="4" height="7" rx="2" fill="#e74c3c" filter="url(#rSS)"/>
    <rect x="26" y="19" width="4" height="7" rx="2" fill="#e74c3c" filter="url(#rSS)"/>
    <rect x="2.8" y="20.5" width="1.5" height="4" rx="0.7" fill="rgba(255,255,255,0.25)"/>
    {/* Neck */}
    <rect x="13" y="33" width="6" height="4" rx="1.5" fill="#9a9aaa"/>
    {/* Body */}
    <rect x="8" y="37" width="16" height="5" rx="3" fill="url(#rBG)" filter="url(#rSS)"/>
    <circle cx="16" cy="39.5" r="2.2" fill="white" opacity="0.9"/>
    <circle cx="16" cy="39.5" r="1" fill="#e0e0e8"/>
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.85)" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const FAB_STYLE = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  outline: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
  boxShadow: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! Ask me anything about Atharva — projects, skills, experience, or personality. You have 3 questions.",
    },
  ]);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const bodyRef = useRef(null);

  // Show nudge 2s after mount, CSS auto-dissolves it at 10s, remove from DOM at 12s
  useEffect(() => {
    const show = setTimeout(() => setShowNudge(true), 2000);
    const hide = setTimeout(() => setShowNudge(false), 12000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (isOpen) setShowNudge(false);
  }, [isOpen]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    if (userMessageCount >= MAX_FREE_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: "user", text },
        { id: `limit-${Date.now() + 1}`, role: "assistant", text: "You've used your 3 questions. Reach Atharva directly via the Contact page." },
      ]);
      setInput("");
      return;
    }

    const userMessage = { id: `user-${Date.now()}`, role: "user", text };
    const assistantId = `assistant-${Date.now() + 1}`;

    setMessages((prev) => [...prev, userMessage, { id: assistantId, role: "assistant", text: "..." }]);
    setInput("");
