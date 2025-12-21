// src/components/layout/HeaderSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ------------------------------
// 現在地ハイライト（SP専用）
// ------------------------------
function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { threshold: 0.25 } // ← SP専用（PCより早め）
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ------------------------------
// スムーススクロール（PC版と統合）
// ------------------------------
const smoothScrollTo = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;

  const offset = 70; // SPヘッダー高さ調整

  gsap.to(window, {
    scrollTo: el.offsetTop - offset,
    duration: 1.1,
    ease: "power3.out",
    onComplete: () => ScrollTrigger.refresh(),
  });
};

export default function HeaderSP() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  // ------------------------------
  // Header 背景：透明 → 黒ぼかし
  // ------------------------------
  useEffect(() => {
    const header = headerRef.current;

    gsap.fromTo(
      header,
      { background: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" },
      {
        background: "rgba(0,0,0,0.48)",
        backdropFilter: "blur(12px)",
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "body",
          start: "top -20",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // ------------------------------
  // Menu open/close アニメ
  // ------------------------------
  useEffect(() => {
    const menu = menuRef.current;

    if (open) {
      gsap.fromTo(
        menu,
        { opacity: 0, pointerEvents: "none" },
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.55,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.45,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  // ------------------------------
  // Active section
  // ------------------------------
  const active = useActiveSection([
    "rooms",
    "dining",
    "spa",
    "pool",
    "bar",
    "lobby",
  ]);

  const base =
    "transition-all duration-500 tracking-[0.25em] text-[18px]";

  const linkClass = (id) =>
    active === id
      ? `
        text-[rgba(255,215,150,1)]
        drop-shadow-[0_0_8px_rgba(255,215,150,0.45)]
      `
      : `
        text-white opacity-80
      `;

  // ------------------------------
  // スクロール（閉じて → スムーススクロール）
  // ------------------------------
  const goTo = (id) => {
    setOpen(false);

    setTimeout(() => {
      smoothScrollTo(id);
    }, 250);
  };

  return (
    <header
      ref={headerRef}
      className="
        md:hidden
        fixed top-0 left-0 w-full z-[999]
        flex justify-between items-center
        px-6 py-4
        text-white
      "
    >
      {/* Logo */}
      <h1 className="text-[18px] tracking-[0.25em] font-light">
        BLUE SHORE
      </h1>

      {/* Hamburger */}
      <button
        className="relative z-[1000]"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`
            w-6 h-[2px] bg-white mb-[6px] transition-all duration-300
            ${open ? "rotate-45 translate-y-[6px]" : ""}
          `}
        />
        <div
          className={`
            w-6 h-[2px] bg-white transition-all duration-300
            ${open ? "-rotate-45 -translate-y-[6px]" : ""}
          `}
        />
      </button>

      {/* Menu Overlay */}
      <nav
        ref={menuRef}
        className="
          fixed inset-0
          w-screen h-screen
          bg-[rgba(0,0,0,0.78)]
          backdrop-blur-[14px]
          flex flex-col items-center justify-center
          gap-10
          opacity-0 pointer-events-none
        "
      >
        {/* GOLD × BLUE ライト */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(circle_at_20%_20%,rgba(255,205,120,0.20),transparent_60%),
               radial-gradient(circle_at_80%_80%,rgba(100,140,255,0.18),transparent_65%)]
            mix-blend-screen
          "
        />

        {/* Links */}
        <button onClick={() => goTo("#rooms")} className={`${base} ${linkClass("rooms")}`}>
          ROOMS
        </button>
        <button onClick={() => goTo("#dining")} className={`${base} ${linkClass("dining")}`}>
          DINING
        </button>
        <button onClick={() => goTo("#spa")} className={`${base} ${linkClass("spa")}`}>
          SPA
        </button>
        <button onClick={() => goTo("#pool")} className={`${base} ${linkClass("pool")}`}>
          POOL
        </button>
        <button onClick={() => goTo("#bar")} className={`${base} ${linkClass("bar")}`}>
          BAR
        </button>
        <button onClick={() => goTo("#lobby")} className={`${base} ${linkClass("lobby")}`}>
          LOBBY
        </button>
      </nav>
    </header>
  );
}
