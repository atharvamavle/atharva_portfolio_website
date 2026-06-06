import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav>
      <NavLink to="/" end className="nav-logo" onClick={close}>
        ATHARVA MAVALE
      </NavLink>
      <button
        className={`nav-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/"         end  className={({isActive}) => isActive ? "active" : ""} onClick={close}>Home</NavLink>
        <NavLink to="/about"         className={({isActive}) => isActive ? "active" : ""} onClick={close}>About</NavLink>
        <NavLink to="/projects"      className={({isActive}) => isActive ? "active" : ""} onClick={close}>Projects</NavLink>
        <NavLink to="/achievements"  className={({isActive}) => isActive ? "active" : ""} onClick={close}>Achievements</NavLink>
        <NavLink to="/contact"       className={({isActive}) => isActive ? "active" : ""} onClick={close}>Contact</NavLink>
        <button
          type="button"
          className={`nav-theme-btn ${theme}`}
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          <span className="theme-icon-wrap" aria-hidden="true">
            {/* Sun (shown in dark mode — click to go light) */}
            <svg className="theme-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            {/* Moon (shown in light mode — click to go dark) */}
            <svg className="theme-moon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}