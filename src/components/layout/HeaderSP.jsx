// src/components/layout/HeaderSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeaderSP() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

useEffect(() => {
  const header = headerRef.current;

  gsap.fromTo(
    header,
    {
      background: "rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
    },
    {
      background: "rgba(0,0,0,0.48)",
      backdropFilter: "blur(12px)",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "body",      // ← Header から変更
        start: "top -20",     // ← 安定ゾーン
        toggleActions: "play none none reverse",
      },
    }
  );
}, []);


// メニュー開閉アニメ
useEffect(() => {
  const menu = menuRef.current;
if (open) {
  gsap.fromTo(
    menu,
    { opacity: 0, pointerEvents: "none" },
    {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.6,
      ease: "power3.out",
    }
  );
} else {
  gsap.to(menu, {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.4,
    ease: "power2.inOut",
  });
}

}, [open]);

  return (
 <header
  ref={headerRef}
  className="
    md:hidden
    fixed top-0 left-0 w-full z-[999]
    translate-y-0
    flex justify-between items-center
    px-6 py-4
    text-white
    transition-all
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
    w-screen h-screen    /* ← fixed のズレ対策最強 */
    max-w-none           /* ← DevTools の viewport 制限防止 */
    bg-[rgba(0,0,0,0.78)]
    backdrop-blur-[14px]
    flex flex-col items-center justify-center
    gap-10 text-[18px] tracking-[0.25em]
    opacity-0 pointer-events-none
  "
>


        {/* ゴールド＋青のデュアルライト */}
        <div className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_20%_20%,rgba(255,205,120,0.20),rgba(0,0,0,0)_60%),
             radial-gradient(circle_at_80%_80%,rgba(100,140,255,0.18),rgba(0,0,0,0)_65%)]
          mix-blend-screen
        " />

        <a className="hover:opacity-70" href="#rooms">ROOMS</a>
        <a className="hover:opacity-70" href="#dining">DINING</a>
        <a className="hover:opacity-70" href="#spa">SPA</a>
        <a className="hover:opacity-70" href="#pool">POOL</a>
        <a className="hover:opacity-70" href="#bar">BAR</a>
        <a className="hover:opacity-70" href="#lobby">LOBBY</a>
      </nav>
    </header>
  );
}
