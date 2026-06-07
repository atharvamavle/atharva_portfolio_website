/**
 * PortfolioLoader  —  "Neural Convergence"
 *
 * A glowing point births a network of intelligent connections.
 * Pulses travel through nodes. The camera drifts forward.
 * Everything converges into a single bright point.
 * The point bursts into a portal that reveals the portfolio.
 *
 * Aesthetic: OpenAI × Apple × Tesla.
 * No swords. No bouncing text. No RGB. Pure engineering.
 */
import React, { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   NETWORK TOPOLOGY
   All (x, y) are offsets from screen center in a 700-unit space.
   scale = min(screenW, screenH) / 700 maps them to real pixels.
═══════════════════════════════════════════════════════════════ */
const NODES = [
  /* core */
  { x:    0, y:    0, r: 4.5, type: "core" },
  /* inner hubs */
  { x: -108, y:  -56, r: 3.2, type: "hub"  },
  { x:   74, y: -102, r: 3.2, type: "hub"  },
  { x:  138, y:   18, r: 3.2, type: "hub"  },
  { x:   66, y:  110, r: 3.2, type: "hub"  },
  { x:  -90, y:   96, r: 3.2, type: "hub"  },
  /* mid ring */
  { x: -188, y:  -96, r: 2.2, type: "node" },
  { x:  -40, y: -182, r: 2.2, type: "node" },
  { x:  150, y: -166, r: 2.2, type: "node" },
  { x:  216, y:  -48, r: 2.2, type: "node" },
  { x:  200, y:  130, r: 2.2, type: "node" },
  { x:   74, y:  206, r: 2.2, type: "node" },
  { x: -136, y:  192, r: 2.2, type: "node" },
  { x: -238, y:   80, r: 2.2, type: "node" },
  { x: -206, y:  -42, r: 2.2, type: "node" },
  /* outer leaves */
  { x: -268, y: -196, r: 1.6, type: "leaf" },
  { x:   52, y: -262, r: 1.6, type: "leaf" },
  { x:  270, y: -196, r: 1.6, type: "leaf" },
  { x:  296, y:   86, r: 1.6, type: "leaf" },
  { x:  226, y:  236, r: 1.6, type: "leaf" },
  { x: -190, y:  256, r: 1.6, type: "leaf" },
  { x: -298, y:  150, r: 1.6, type: "leaf" },
  { x: -284, y: -150, r: 1.6, type: "leaf" },
];

/* [fromIdx, toIdx, revealAfterSeconds_from_forming_start] */
const EDGES = [
  /* core → hubs */
  [0,1,0.00],[0,2,0.08],[0,3,0.15],[0,4,0.22],[0,5,0.28],
  /* hub pentagon */
  [1,2,0.34],[2,3,0.40],[3,4,0.46],[4,5,0.52],[5,1,0.58],
  /* hubs → mid */
  [1,6,0.44],[1,7,0.52],[2,7,0.58],[2,8,0.64],[3,8,0.70],
  [3,9,0.78],[3,10,0.86],[4,10,0.92],[4,11,0.98],[5,11,1.04],
  [5,12,1.10],[5,13,1.16],[1,14,1.06],
  /* mid cross-ring */
  [6,7,1.14],[8,9,1.20],[10,11,1.26],[12,13,1.32],[14,6,1.38],
  /* mid → leaves */
  [6,15,1.28],[7,16,1.36],[8,17,1.44],[9,18,1.52],[10,19,1.58],
  [11,20,1.64],[12,20,1.70],[13,21,1.76],[14,22,1.82],[6,22,1.88],
  /* outer ring fragments */
  [15,22,1.92],[16,17,1.98],[17,18,2.04],[19,20,2.10],[20,21,2.16],
  /* long-range (neural feel) */
  [0,9,1.58],[0,11,1.62],[2,10,1.72],
];

/* ═══════════════════════════════════════════════════════════════
   PHASE BOUNDARIES  (milliseconds from start)
═══════════════════════════════════════════════════════════════ */
const T_FORMING    =  180;   /* genesis → forming               */
const T_ACTIVE     = 2720;   /* forming complete, pulses active  */
const T_CONVERGING = 3380;   /* start pulling nodes to center    */
const T_PORTAL     = 4020;   /* convergence done, portal expands */
const T_EXIT       = 4740;   /* portal fills screen, CSS fade    */
const T_DONE       = 5100;   /* unmount                          */

/* ═══════════════════════════════════════════════════════════════
   EASING
═══════════════════════════════════════════════════════════════ */
const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
const easeOutQuart   = t => 1 - Math.pow(1-t, 4);
const easeOutCubic   = t => 1 - Math.pow(1-t, 3);

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function PortfolioLoader({ onComplete }) {
  const canvasRef     = useRef(null);
  const doneRef       = useRef(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const [exiting, setExiting] = useState(false);
  const [gone,    setGone]    = useState(false);

  /* ── Phase timers for React state ── */
  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true),  T_EXIT);
    const t2 = setTimeout(() => {
      doneRef.current = true;
      setGone(true);
      onCompleteRef.current?.();
    }, T_DONE);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* DPR-aware setup — sharp on retina + fills the full viewport */
    const dpr  = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.width        = cssW * dpr;
    canvas.height       = cssH * dpr;
    canvas.style.width  = cssW + "px";
    canvas.style.height = cssH + "px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr); /* all drawing in CSS pixels */

    /* Use CSS dimensions for layout math */
    const W  = cssW;
    const H  = cssH;
    const cx = W / 2;
    const cy = H / 2;

    /* Scale so the mid-ring nodes reach the screen edges.
       /430 is ~1.78× at 768 px height — outer leaves will extend
       slightly off-screen which looks intentional (infinite network). */
    const sc = Math.min(W, H) / 430;

    /* ── Mutable animation state (no React re-renders) ── */
    const nodeLit   = new Array(NODES.length).fill(false);
    nodeLit[0]      = true; /* core is always lit */
    const pulses    = [];   /* { edgeIdx, t0, dur } */
    const lastPulse = {};   /* edgeIdx → timestamp of last spawn */
    let   allLit    = false;
    let   raf, t0   = null;

    /* ── Draw one frame ── */
    const frame = (ts) => {
      if (doneRef.current) return;
      if (!t0) t0 = ts;
      const E = ts - t0; /* elapsed ms */

      ctx.clearRect(0, 0, W, H);

      /* ── Phase flags ── */
      const inGenesis    = E < T_FORMING;
      const inForming    = E >= T_FORMING    && E < T_ACTIVE;
      const inActive     = E >= T_ACTIVE     && E < T_CONVERGING;
      const inConverging = E >= T_CONVERGING && E < T_PORTAL;
      const inPortal     = E >= T_PORTAL     && E < T_EXIT;

      /* All nodes lit once active phase begins */
      if (inActive && !allLit) {
        nodeLit.fill(true);
        allLit = true;
      }

      /* ── Camera zoom (subtle forward drift) ── */
      let zoom = 1.0;
      if (inForming) {
        zoom = 1.0 + easeInOutCubic((E - T_FORMING) / (T_ACTIVE - T_FORMING)) * 0.09;
      } else if (inActive) {
        zoom = 1.09;
      } else if (inConverging) {
        zoom = 1.09 - easeInOutCubic((E - T_CONVERGING) / (T_PORTAL - T_CONVERGING)) * 0.09;
      }

      /* ── Convergence progress (0→1) ── */
      let convP = 0;
      if (inConverging) convP = easeInOutCubic((E - T_CONVERGING) / (T_PORTAL - T_CONVERGING));
      else if (inPortal) convP = 1.0;

      /* ── Solid black background ── */
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      /* ── Everything drawn in a zoomed, centered coordinate system ── */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);

      /* ────────────────────────────────────────────
         GENESIS  —  single glowing point
      ──────────────────────────────────────────── */
      if (inGenesis) {
        const gA = easeOutCubic(E / T_FORMING);
        const coreG = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
        coreG.addColorStop(0,   `rgba(255,255,255,${gA * 0.95})`);
        coreG.addColorStop(0.3, `rgba(180,200,255,${gA * 0.45})`);
        coreG.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = coreG;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, 3.5 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${gA})`;
        ctx.fill();

        ctx.restore();
        raf = requestAnimationFrame(frame);
        return;
      }

      /* ────────────────────────────────────────────
         EDGES
      ──────────────────────────────────────────── */
      const formingSec = (E - T_FORMING) / 1000; /* seconds into forming */

      if (convP < 1.0) {
        EDGES.forEach(([fi, ti, revealAt], ei) => {
          /* Reveal timing */
          let edgeP = 1.0;
          if (inForming) {
            edgeP = Math.min((formingSec - revealAt) / 0.26, 1.0);
            if (edgeP <= 0) return;
          }

          const fn = NODES[fi];
          const tn = NODES[ti];

          /* Apply convergence: endpoints move toward (0,0) */
          const fx = fn.x * sc * (1 - convP);
          const fy = fn.y * sc * (1 - convP);
          const tx = fn.x * sc * (1 - convP) + (tn.x - fn.x) * sc * edgeP * (1 - convP);
          const ty = fn.y * sc * (1 - convP) + (tn.y - fn.y) * sc * edgeP * (1 - convP);

          const bothLit = nodeLit[fi] && nodeLit[ti];
          const baseA   = 0.18 + (bothLit ? 0.14 : 0);
          const lineA   = baseA * (1 - convP);

          ctx.save();
          ctx.globalAlpha = lineA;
          const lg = ctx.createLinearGradient(fx, fy, tx, ty);
          lg.addColorStop(0, "#5a7898");
          lg.addColorStop(1, "#8aaecc");
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 0.65;
          ctx.stroke();
          ctx.restore();

          /* Light up "to" node when edge completes */
          if (edgeP >= 1.0 && !nodeLit[ti]) nodeLit[ti] = true;

          /* Spawn pulse on completed edges */
          if (edgeP >= 1.0 && (inForming || inActive)) {
            if (!lastPulse[ei] || E - lastPulse[ei] > lastPulse[ei + "_gap"]) {
              lastPulse[ei] = E;
              lastPulse[ei + "_gap"] = 900 + Math.random() * 1100;
              pulses.push({ ei, t0: E, dur: 340 + Math.random() * 220 });
            }
          }
        });
      }

      /* ────────────────────────────────────────────
         PULSES  —  data travelling through edges
      ──────────────────────────────────────────── */
      if (!inConverging && !inPortal) {
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p  = pulses[i];
          const pp = (E - p.t0) / p.dur;
          if (pp > 1.0) { pulses.splice(i, 1); continue; }
          if (pp < 0)   continue;

          const [fi, ti] = EDGES[p.ei];
          const fn = NODES[fi];
          const tn = NODES[ti];
          const px = (fn.x + (tn.x - fn.x) * pp) * sc;
          const py = (fn.y + (tn.y - fn.y) * pp) * sc;

          /* Tail (short trailing fade) */
          const tailLen = 0.12;
          const tailP   = Math.max(0, pp - tailLen);
          const tailX   = (fn.x + (tn.x - fn.x) * tailP) * sc;
          const tailY   = (fn.y + (tn.y - fn.y) * tailP) * sc;
          const tailFade = pp < tailLen ? pp / tailLen : 1.0;

          ctx.save();
          const tailG = ctx.createLinearGradient(tailX, tailY, px, py);
          tailG.addColorStop(0, "rgba(120,170,230,0)");
          tailG.addColorStop(1, `rgba(180,215,255,${tailFade * 0.55})`);
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = tailG;
          ctx.lineWidth = 1.1;
          ctx.stroke();
          ctx.restore();

          /* Pulse head glow */
          ctx.save();
          const headG = ctx.createRadialGradient(px, py, 0, px, py, 5 * sc);
          headG.addColorStop(0,   "rgba(220,235,255,0.92)");
          headG.addColorStop(0.4, "rgba(140,185,240,0.40)");
          headG.addColorStop(1,   "rgba(80,130,210,0)");
          ctx.fillStyle = headG;
          ctx.beginPath();
          ctx.arc(px, py, 5 * sc, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      /* ────────────────────────────────────────────
         NODES
      ──────────────────────────────────────────── */
      if (convP < 1.0) {
        NODES.forEach((n, idx) => {
          const lit    = nodeLit[idx];
          const isCore = n.type === "core";
          const isHub  = n.type === "hub";
          const nx     = n.x * sc * (1 - convP);
          const ny     = n.y * sc * (1 - convP);
          const nr     = n.r * sc;
          const nodeA  = Math.max(0, 1 - convP * 1.3);

          /* Core breathing pulse during active phase */
          const breathe = inActive
            ? 1 + 0.18 * Math.sin((E - T_ACTIVE) * 0.0078)
            : 1.0;

          ctx.save();
          ctx.globalAlpha = nodeA;

          /* Outer glow (lit nodes and core) */
          if (lit || isCore) {
            const glowR = nr * (isCore ? 5.5 * breathe : isHub ? 3.2 : 2.5);
            const glow  = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
            glow.addColorStop(0,   isCore ? "rgba(255,255,255,0.55)" : "rgba(180,210,255,0.35)");
            glow.addColorStop(0.4, isCore ? "rgba(160,190,255,0.18)" : "rgba(120,165,230,0.12)");
            glow.addColorStop(1,   "rgba(0,0,0,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
            ctx.fill();
          }

          /* Node dot */
          ctx.beginPath();
          ctx.arc(nx, ny, nr * (isCore ? 1.2 * breathe : 1), 0, Math.PI * 2);
          ctx.fillStyle = lit
            ? (isCore ? "#ffffff" : "rgba(210,228,255,0.92)")
            : "rgba(65,90,120,0.55)";
          ctx.fill();

          /* Subtle ring for hubs/core */
          if ((isCore || isHub) && lit) {
            ctx.beginPath();
            ctx.arc(nx, ny, nr * (isCore ? 3.2 * breathe : 2.4), 0, Math.PI * 2);
            ctx.strokeStyle = isCore
              ? `rgba(180,205,255,${0.22 * breathe})`
              : "rgba(130,170,220,0.15)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          ctx.restore();
        });
      }

      ctx.restore(); /* end zoom context */

      /* ────────────────────────────────────────────
         CONVERGENCE FLASH  +  PORTAL
      ──────────────────────────────────────────── */
      if (inPortal) {
        const pProg = easeOutQuart((E - T_PORTAL) / (T_EXIT - T_PORTAL));
        const maxR  = Math.hypot(W / 2, H / 2) * 1.12;
        const pR    = pProg * maxR;

        /* 1 — Brief central burst at portal birth (first 180ms) */
        const burstP = Math.min((E - T_PORTAL) / 180, 1);
        const burstA = burstP < 0.5 ? burstP * 2 : (1 - burstP) * 2;
        if (burstA > 0) {
          const bG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
          bG.addColorStop(0,   `rgba(255,255,255,${burstA * 0.92})`);
          bG.addColorStop(0.5, `rgba(200,220,255,${burstA * 0.4})`);
          bG.addColorStop(1,   "rgba(0,0,0,0)");
          ctx.fillStyle = bG;
          ctx.beginPath();
          ctx.arc(cx, cy, 100, 0, Math.PI * 2);
          ctx.fill();
        }

        /* 2 — Glowing ring at portal edge */
        if (pR > 0) {
          const ringG = ctx.createRadialGradient(cx, cy, pR * 0.85, cx, cy, pR * 1.04);
          ringG.addColorStop(0,   "rgba(100,150,255,0)");
          ringG.addColorStop(0.5, `rgba(180,210,255,${(1 - pProg) * 0.45})`);
          ringG.addColorStop(0.8, `rgba(220,235,255,${(1 - pProg) * 0.65})`);
          ringG.addColorStop(1,   "rgba(255,255,255,0)");
          ctx.fillStyle = ringG;
          ctx.beginPath();
          ctx.arc(cx, cy, pR * 1.04, 0, Math.PI * 2);
          ctx.fill();
        }

        /* 3 — Destination-out: punch transparent hole through black background */
        if (pR > 0) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";
          const cutG = ctx.createRadialGradient(cx, cy, 0, cx, cy, pR);
          cutG.addColorStop(0,    "rgba(0,0,0,1)");
          cutG.addColorStop(0.82, "rgba(0,0,0,1)");
          cutG.addColorStop(1,    "rgba(0,0,0,0)");
          ctx.fillStyle = cutG;
          ctx.beginPath();
          ctx.arc(cx, cy, pR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      /* ── convergence bright-point before portal ── */
      if (inConverging && convP > 0.55) {
        const brightA = easeOutCubic((convP - 0.55) / 0.45) * 0.7;
        const bG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        bG.addColorStop(0,   `rgba(255,255,255,${brightA})`);
        bG.addColorStop(0.4, `rgba(180,210,255,${brightA * 0.4})`);
        bG.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = bG;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); };
  }, []); /* eslint-disable-line */

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: exiting ? 0 : 1,
        transition: exiting
          ? `opacity ${(T_DONE - T_EXIT) / 1000}s cubic-bezier(0.4,0,0.2,1)`
          : "none",
        /* pointer-events off: lets homepage render fully under the loader */
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, display: "block" }}
      />
    </div>
  );
}
