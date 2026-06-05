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
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf);