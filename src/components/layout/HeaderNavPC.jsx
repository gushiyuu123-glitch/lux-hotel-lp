// src/components/layout/HeaderNavPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeaderNavPC() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const underlineRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;

    const onScroll = () => {
      const s = window.scrollY > 60;
      setScrolled(s);
    };
    window.addEventListener("scroll", onScroll);

    // 初回適用
    onScroll();

    // 下線アニメーション
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 0.9,
        duration: 1.4,
        ease: "cubic-bezier(.22,1,.36,1)",
        scrollTrigger: {
          trigger: header,
          start: "top top",
        },
      }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        hidden md:flex
        fixed top-0 left-0 w-full z-[100]
        px-10 py-6
        items-center justify-between
        transition-all duration-[900ms]
        ${scrolled
          ? "bg-[rgba(0,0,0,0.06)] backdrop-blur-[12px]"
          : "bg-transparent backdrop-blur-[0px]"
        }
      `}
    >
      {/* LOGO */}
      <h1
        ref={logoRef}
        className={`
          text-[20px] tracking-[0.22em] font-light transition-colors duration-[900ms]
          ${scrolled ? "text-neutral-800" : "text-white"}
        `}
      >
        BLUE SHORE HOTEL
      </h1>

      {/* Nav links */}
      <nav
        className={`
          flex gap-10 text-[13px] tracking-[0.18em] transition-colors duration-[900ms]
          ${scrolled ? "text-neutral-700" : "text-white"}
        `}
      >
        <a href="#rooms" className="hover:opacity-70 transition">ROOMS</a>
        <a href="#dining" className="hover:opacity-70 transition">DINING</a>
        <a href="#spa" className="hover:opacity-70 transition">SPA</a>
        <a href="#pool" className="hover:opacity-70 transition">POOL</a>
        <a href="#bar" className="hover:opacity-70 transition">BAR</a>
      </nav>

      {/* UNDERLINE */}
      <div
        ref={underlineRef}
        className="
          absolute bottom-0 left-0 w-full h-[1px]
          bg-gradient-to-r from-transparent via-neutral-500/40 to-transparent
          origin-left
          scale-x-0
        "
      />
    </header>
  );
}
