// src/components/sections/LobbySP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LobbySP() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const imgRef = useRef(null);

  /* ------------------------------------
     Intersection
  ------------------------------------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.35 }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  /* ------------------------------------
     浮遊アニメ（画像）
  ------------------------------------- */
  useEffect(() => {
    if (!active || !imgRef.current) return;

    gsap.to(imgRef.current, {
      y: -12,
      duration: 6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [active]);

  /* ------------------------------------
     ボケ粒子
  ------------------------------------- */
  const BOKEHS = [
    { left: "12%", top: "24%" },
    { left: "70%", top: "18%" },
    { left: "28%", top: "60%" },
    { left: "78%", top: "58%" },
    { left: "48%", top: "78%" },
  ];

  return (
    <section
      ref={rootRef}
      className="
        block md:hidden
        w-full
        pt-[140px] pb-[160px]
        relative overflow-hidden
        text-white
        bg-[linear-gradient(180deg,#02040a_0%,#060b15_40%,#0b1428_100%)]
      "
    >
      {/* ──────────────────────────────
          ボケ粒子（青ネオン）
      ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {BOKEHS.map((pos, i) => (
          <div
            key={i}
            className="
              absolute w-[70px] h-[70px]
              rounded-full
              bg-[rgba(70,120,255,0.28)]
              blur-[20px]
              opacity-[0.55]
            "
            style={{
              left: pos.left,
              top: pos.top,
              animation: `lobbyFloat ${6 + i * 1.5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ──────────────────────────────
          タイトル
      ────────────────────────────── */}
      <div className="relative w-[90%] mx-auto z-[3]">
        <p
          className={`
            text-[11px] tracking-[0.32em] text-white/40 mb-6
            transition-all duration-[1100ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          LOBBY LOUNGE
        </p>

        <h2
          className={`
            text-[26px] leading-[1.75] font-light mb-14
            drop-shadow-[0_4px_24px_rgba(0,80,200,0.45)]
            tracking-[0.18em]
            transition-all duration-[1250ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          静けさが美しくなる  
          夜のロビーフロア。
        </h2>
      </div>

      {/* ──────────────────────────────
          ロビー画像（メインアート）
      ────────────────────────────── */}
      <div className="relative w-[90%] mx-auto z-[2]">
        <figure
          className={`
            w-full aspect-[4/5]
            rounded-[12px] overflow-hidden
            shadow-[0_30px_100px_rgba(0,40,120,0.55)]
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* 青 × 金 ネオンベール */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_30%_20%,rgba(70,120,255,0.30),rgba(0,0,0,0)_65%),
                 radial-gradient(circle_at_75%_80%,rgba(255,180,110,0.28),rgba(0,0,0,0)_70%)]
              mix-blend-soft-light
              opacity-[0.85]
            "
          />

          <img
            ref={imgRef}
            src="/hotel/lobby/lobby-main.png"
            alt="Hotel lobby"
            className="
              w-full h-full object-cover
              brightness-[1.06]
              transition-all duration-[1400ms]
            "
          />
        </figure>
      </div>

      {/* ──────────────────────────────
          説明文
      ────────────────────────────── */}
      <div className="relative w-[90%] mx-auto z-[3] mt-12 px-1">
        <p
          className={`
            text-[14px] leading-[1.9] text-white/75
            transition-all duration-[1300ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          夜の気配がゆっくりと広がるロビー。  
          深い青の静寂と、照明の金が溶け合う空間で、  
          特別な夜のはじまりを迎えられます。
        </p>
      </div>
    </section>
  );
}

/* ===========================
   浮遊アニメーション Keyframes
=========================== */
const style = document.createElement("style");
style.innerHTML = `
@keyframes lobbyFloat {
  0%   { transform: translateY(0px) translateX(0px); }
  50%  { transform: translateY(-18px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
}`;
document.head.appendChild(style);
