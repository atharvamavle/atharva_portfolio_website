// src/components/ChatWidget.jsx

import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "../data/portfolioData";

// Config
const MAX_FREE_MESSAGES = 5;
const RESUME_URL = portfolioData?.personal?.links?.resume || "";

// Renders assistant message with bullets, links, and resume button
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

        // GitHub: URL
        if (trimmed.startsWith("GitHub:")) {
          const url = trimmed.replace("GitHub:", "").trim();
          return (
            <div key={index} className="chat-link-row">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-link"
              >
                GitHub
              </a>
            </div>
          );
        }

        // Live: URL
        if (trimmed.startsWith("Live:")) {
          const url = trimmed.replace("Live:", "").trim();
          return (
            <div key={index} className="chat-link-row">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-link"
              >
                Live Demo
              </a>
            </div>
          );
        }

        // Bullets starting with • or -
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
          return (
            <div key={index} className="chat-bullet-line">
              <span className="chat-bullet-dot">•</span>
              <span>{trimmed.replace(/^[•-]\s*/, "")}</span>
            </div>
          );
        }

        // Fallback: plain text line
        return (
          <div key={index} className="chat-text-line">
            {trimmed}
          </div>
        );
      })}

      {hasResume && RESUME_URL && (
        <div className="chat-link-row">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-button-link"
          >
            Download Resume (PDF)
          </a>
        </div>
      )}
    </>
  );
}

// Generic message renderer
function renderMessage(message) {
  if (message.role === "assistant") {
    return renderAssistantMessage(message.text);
  }

  // User messages: plain text with simple line breaks
  return message.text.split("\n").map((line, index) => (
    <div key={index} className="chat-text-line">
      {line}
    </div>
  ));
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text:
        "Hi! You can ask up to 5 questions about Atharva's projects, skills, experience, or links (resume, GitHub).",
    },
  ]);
  const [userMessageCount, setUserMessageCount] = useState(0);

  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Enforce 5-message limit (per browser session)
    if (userMessageCount >= MAX_FREE_MESSAGES) {
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          text,
        },
        {
          id: `limit-${Date.now() + 1}`,
          role: "assistant",
          text:
            "This browser has used the 5 free questions. To continue, please reload later or contact Atharva directly (see Contact section).",
        },
      ]);
      setInput("");
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    const assistantId = `assistant-${Date.now() + 1}`;

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", text: "..." },
    ]);

    setInput("");
    setIsLoading(true);
    setUserMessageCount((count) => count + 1);

    try {
      const history = messages
        .filter((msg) => msg.role === "user" || msg.role === "assistant")
        .map((msg) => ({
          role: msg.role,
          content: msg.text,
        }));

      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();

      const replyText =
        res.ok && typeof data.reply === "string"
          ? data.reply
          : data.error || "Sorry, something went wrong.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, text: replyText } : msg
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, text: "Network error. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-root">
      <button
        className={`chat-fab ${isOpen ? "chat-fab-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat panel" : "Open chat panel"}
      >
        <span className="chat-fab-icon" aria-hidden="true">
          🤖
        </span>
      </button>

      {isOpen && (
        <div className="chat-panel-overlay">
          <section className="chat-panel" aria-live="polite">
            <header className="chat-panel-header">
              <div>
                <strong>Portfolio Assistant</strong>
                <p>Ask about projects, skills, experience, or links.</p>
              </div>
              <button
                type="button"
                className="chat-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="chat-panel-body" ref={bodyRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-bubble ${
                    message.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-assistant"
                  }`}
                >
                  {renderMessage(message)}
                </div>
              ))}
            </div>

            <div className="chat-panel-input">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Ask e.g. 'Summarise Atharva’s experience in 3 bullets'"
                aria-label="Chat message"
                maxLength={700}
              />
              <button type="button" onClick={sendMessage} disabled={isLoading}>
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}