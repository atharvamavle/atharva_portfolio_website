import React, { useEffect, useRef, useState } from "react";

function buildReply(prompt) {
  const normalized = prompt.trim().toLowerCase();

  if (normalized.includes("contact") || normalized.includes("email")) {
    return "You can reach Atharva from the Contact page, including LinkedIn and email details.";
  }

  if (normalized.includes("project")) {
    return "The Projects page highlights recent builds with stack details and quick links.";
  }

  if (normalized.includes("about") || normalized.includes("experience")) {
    return "The About page covers background, skills, and experience snapshots.";
  }

  return "Thanks for your message! I can help you explore the portfolio sections such as About, Projects, Achievements, and Contact.";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! Ask anything about Atharva's portfolio.",
    },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    const assistantId = `assistant-${Date.now() + 1}`;
    const fullReply = buildReply(text);

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", text: "" },
    ]);
    setInput("");
    setIsStreaming(true);

    let index = 0;
    const interval = window.setInterval(() => {
      index += 2;
      const partial = fullReply.slice(0, index);

      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantId ? { ...msg, text: partial } : msg))
      );

      if (index >= fullReply.length) {
        window.clearInterval(interval);
        setIsStreaming(false);
      }
    }, 28);
  };

  return (
    <div className="chat-widget-root">
      <button
        className={`chat-fab ${isOpen ? "chat-fab-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat panel" : "Open chat panel"}
      >
        <span className="chat-fab-icon" aria-hidden="true">🤖</span>
      </button>

      {isOpen && (
        <div className="chat-panel-overlay">
          <section className="chat-panel" aria-live="polite">
            <header className="chat-panel-header">
              <div>
                <strong>Portfolio Assistant</strong>
                <p>Ask anything about this site or Atharva's work.</p>
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
                  {message.text || (message.role === "assistant" ? "..." : "")}
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
                placeholder="Type your message..."
                aria-label="Chat message"
              />
              <button type="button" onClick={sendMessage} disabled={isStreaming}>
                Send
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
