import React, { useEffect, useRef } from "react";

const PARTICLE_COUNT = 55;
const SHAPE_COUNT = 18;
const CONNECTION_DIST = 130;
const MOUSE_REPEL_DIST = 100;
const SPEED = 0.38;

// Draw hollow geometric shapes
function drawShape(ctx, type, x, y, size, angle, alpha, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.9;
  ctx.beginPath();

  if (type === "triangle") {
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      const px = Math.cos(a) * size, py = Math.sin(a) * size;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else if (type === "diamond") {
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.6, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.6, 0);
    ctx.closePath();
  } else if (type === "hexagon") {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const px = Math.cos(a) * size, py = Math.sin(a) * size;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  } else if (type === "square") {
    ctx.rect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4);
  } else if (type === "plus") {
    const t = size * 0.28;
    ctx.moveTo(-t, -size); ctx.lineTo(t, -size);
    ctx.lineTo(t, -t); ctx.lineTo(size, -t);
    ctx.lineTo(size, t); ctx.lineTo(t, t);
    ctx.lineTo(t, size); ctx.lineTo(-t, size);
    ctx.lineTo(-t, t); ctx.lineTo(-size, t);
    ctx.lineTo(-size, -t); ctx.lineTo(-t, -t);
    ctx.closePath();
  }

  ctx.stroke();
  ctx.restore();
}

const SHAPE_TYPES = ["triangle", "diamond", "hexagon", "square", "plus"];
const COLORS_DARK = ["rgba(167,139,250,", "rgba(124,58,237,", "rgba(196,181,253,", "rgba(139,92,246,"];
const COLORS_LIGHT = ["rgba(124,58,237,", "rgba(109,40,217,", "rgba(167,139,250,", "rgba(91,33,182,"];

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const mouse = { x: -9999, y: -9999 };

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse repulsion (desktop)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () =>  { mouse.x = -9999; mouse.y = -9999; };
    if (!isTouch) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
    }

    // Touch repulsion (mobile)
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { mouse.x = -9999; mouse.y = -9999; };
    if (isTouch) {
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    }

    // Particles (dots)
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.6 + 0.7,
    }));

    // Geometric shapes
    const shapes = Array.from({ length: SHAPE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED * 0.55,
      vy: (Math.random() - 0.5) * SPEED * 0.55,
      size: Math.random() * 9 + 6,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      colorIdx: Math.floor(Math.random() * COLORS_DARK.length),
    }));

    const isDark = () => !document.body.classList.contains("light-theme");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();
      const COLORS = dark ? COLORS_DARK : COLORS_LIGHT;
      const dotColor = dark ? "rgba(167,139,250,0.85)" : "rgba(109,40,217,0.7)";
      const lineColor = dark ? "rgba(167,139,250," : "rgba(91,33,182,";

      // ── Update & draw particles ──
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST * 0.012;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.995; p.vy *= 0.995;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > SPEED * 2) { p.vx *= (SPEED * 2) / speed; p.vy *= (SPEED * 2) / speed; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.shadowColor = dark ? "rgba(167,139,250,0.9)" : "rgba(109,40,217,0.7)";
        ctx.shadowBlur = dark ? 10 : 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Update & draw shapes ──
      for (const s of shapes) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_DIST * 1.3 && dist > 0) {
          const force = (MOUSE_REPEL_DIST * 1.3 - dist) / (MOUSE_REPEL_DIST * 1.3) * 0.008;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
        s.vx *= 0.993; s.vy *= 0.993;
        s.x += s.vx; s.y += s.vy;
        s.angle += s.rotSpeed;
        if (s.x < -30) s.x = canvas.width + 30;
        if (s.x > canvas.width + 30) s.x = -30;
        if (s.y < -30) s.y = canvas.height + 30;
        if (s.y > canvas.height + 30) s.y = -30;

        const shapeAlpha = dark ? 0.5 : 0.45;
        ctx.shadowColor = dark ? "rgba(167,139,250,0.8)" : "rgba(109,40,217,0.6)";
        ctx.shadowBlur = dark ? 12 : 8;
        drawShape(ctx, s.type, s.x, s.y, s.size, s.angle, shapeAlpha, COLORS[s.colorIdx] + "1)");
        ctx.shadowBlur = 0;
      }

      // ── Particle connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * (dark ? 0.6 : 0.55);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 0.7;
            ctx.shadowColor = dark ? "rgba(167,139,250,0.5)" : "rgba(109,40,217,0.4)";
            ctx.shadowBlur = dark ? 6 : 4;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Mouse connections
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < CONNECTION_DIST * 1.5) {
          const alpha = (1 - md / (CONNECTION_DIST * 1.5)) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── Shape-to-particle connections (short range only) ──
      for (const s of shapes) {
        for (const p of particles) {
          const dx = s.x - p.x;
          const dy = s.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 75) {
            const alpha = (1 - d / 75) * 0.18;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (!isTouch) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      } else {
        window.removeEventListener("touchmove", onTouch);
        window.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
      aria-hidden="true"
    />
  );
}
