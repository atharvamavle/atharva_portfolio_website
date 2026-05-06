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
          <span className="theme-surface" aria-hidden="true">
            <span className="theme-switch">
              <span className="theme-icon" aria-hidden="true" />
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
}