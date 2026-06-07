import React, { useState, useEffect } from "react";
import "./PortfolioLoader.css";

export default function PortfolioLoader({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit slide-up at 2.2s, call onComplete after slide finishes (1.1s)
    const exitTimer = setTimeout(() => setExiting(true), 2200);
    const doneTimer = setTimeout(() => onComplete(),     3350);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  return (
    <div className={`pf-curtain${exiting ? " pf-curtain--exit" : ""}`}>
      {/* Brand name */}
      <p className="pf-brand">Atharva Santosh Mavale</p>

      {/* Expanding line */}
      <div className="pf-line-track">
        <div className="pf-line" />
      </div>

      {/* Tagline */}
      <p className="pf-tagline">AI Engineer · Founder · Deakin University</p>
    </div>
  );
}
