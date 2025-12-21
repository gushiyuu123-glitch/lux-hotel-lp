// src/components/layout/HeaderNavPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "../../utils/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

// ------------------------------
// 現在地ハイライト（IntersectionObserver）
// ------------------------------
function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25 } // ← PC もこれが安定
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function HeaderNavPC() {
  const headerRef = useRef(null);
  const underlineRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  // ------------------------------
  // ナビ背景：透明 → 白
  // ------------------------------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();

    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 0.9,
        duration: 1.4,
        ease: "cubic-bezier(.22,1,.36,1)",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
        },
      }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ------------------------------
  // 現在地ハイライト
  // ------------------------------
  const active = useActiveSection([
    "rooms",
    "dining",
    "spa",
    "pool",
    "bar",
    "lobby",
  ]);

  const base = "transition-all duration-500 tracking-[0.18em] text-[13px]";

  const linkClass = (id) =>
    active === id
      ? `
        opacity-100 text-neutral-900 font-light relative
        after:content-[''] after:absolute after:-bottom-1 after:left-0
        after:w-full after:h-[1px] after:bg-neutral-900/50
        after:scale-x-100 after:transition-transform
      `
      : `
        opacity-60 hover:opacity-100
      `;

  return (
    <header
      ref={headerRef}
      className={`
        hidden md:flex fixed top-0 left-0 w-full z-[100]
        px-10 py-6 justify-between items-center
        transition-all duration-[900ms]
        ${
          scrolled
            ? "bg-[rgba(255,255,255,0.75)] backdrop-blur-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent backdrop-blur-[0px]"
        }
      `}
    >
      {/* Logo */}
      <h1
        className={`
          text-[20px] tracking-[0.22em] font-light transition-colors duration-[900ms]
          ${scrolled ? "text-neutral-800" : "text-white"}
        `}
      >
        BLUE SHORE HOTEL
      </h1>

      {/* Navigation */}
      <nav
        className={`
          flex gap-10 transition-colors duration-[900ms]
          ${scrolled ? "text-neutral-700" : "text-white"}
        `}
      >
        <button onClick={() => smoothScrollTo("#rooms")} className={`${base} ${linkClass("rooms")}`}>
          ROOMS
        </button>
        <button onClick={() => smoothScrollTo("#dining")} className={`${base} ${linkClass("dining")}`}>
          DINING
        </button>
        <button onClick={() => smoothScrollTo("#spa")} className={`${base} ${linkClass("spa")}`}>
          SPA
        </button>
        <button onClick={() => smoothScrollTo("#pool")} className={`${base} ${linkClass("pool")}`}>
          POOL
        </button>
        <button onClick={() => smoothScrollTo("#bar")} className={`${base} ${linkClass("bar")}`}>
          BAR
        </button>
        <button onClick={() => smoothScrollTo("#lobby")} className={`${base} ${linkClass("lobby")}`}>
          LOBBY
        </button>
      </nav>

      {/* Underline */}
      <div
        ref={underlineRef}
        className="
          absolute bottom-0 left-0 w-full h-[1px]
          bg-gradient-to-r from-transparent via-neutral-500/40 to-transparent
          origin-left scale-x-0
        "
      />
    </header>
  );
}
