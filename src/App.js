import React, { useEffect, useRef, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import ChatWidget from "./components/ChatWidget";
import ParticleBackground from "./components/ParticleBackground";
import PortfolioLoader from "./components/PortfolioLoader";

export default function App() {
  const glowRef = useRef(null);
  const dotRef  = useRef(null);
  const location = useLocation();

  // Show loader once per browser session
  const [showLoader, setShowLoader] = useState(
    () => !sessionStorage.getItem("portfolio-loaded")
  );
  const handleLoaderDone = useCallback(() => {
    sessionStorage.setItem("portfolio-loaded", "1");
    setShowLoader(false);
  }, []);

  // Apply saved theme on first load
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "dark";
    document.body.classList.toggle("light-theme", saved === "light");
  }, []);

  // Neon cursor — halo + dot (mouse-only, skip on touch devices)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const halo = glowRef.current;
    const dot  = dotRef.current;
    if (!halo || !dot) return;
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        halo.style.left = e.clientX + "px";
        halo.style.top  = e.clientY + "px";
        dot.style.left  = e.clientX + "px";
        dot.style.top   = e.clientY + "px";
      });
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  // Global scroll-reveal
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
    const t = setTimeout(attach, 100);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, [location.pathname]);

  return (
    <>
      {/* Main app — renders underneath the loader so the first frame
          is already painted when the loader dissolves */}
      <ParticleBackground />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/projects"     element={<ProjectsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/contact"      element={<ContactPage />} />
      </Routes>
      <ChatWidget />

      {/* Cinematic intro loader — covers everything, fades out when done */}
      {showLoader && <PortfolioLoader onComplete={handleLoaderDone} />}
    </>
  );
}
