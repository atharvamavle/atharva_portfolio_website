import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("portfolio-theme") || "dark"
  );
  const glowRef = useRef(null);
  const location = useLocation();

  // Theme
  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Cursor glow
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.left = e.clientX + "px";
        el.style.top  = e.clientY + "px";
      });
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  // Global scroll-reveal — picks up every .reveal element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    const attach = () =>
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));

    attach();
    // Re-attach after route changes give React time to render
    const t = setTimeout(attach, 100);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, [location.pathname]);

  const toggleTheme = () => setTheme(c => c === "light" ? "dark" : "light");

  return (
    <>
      {/* Cursor glow overlay */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/projects"    element={<ProjectsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact"     element={<ContactPage />} />
      </Routes>
      <ChatWidget />
    </>
  );
}
