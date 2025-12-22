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
      { threshold: 0.3 }
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
      y: -16,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [active]);

  /* ------------------------------------
     ボケ粒子（背景レイヤー）
  ------------------------------------- */
  const BOKEHS = [
    { left: "15%", top: "30%" },
    { left: "75%", top: "25%" },
    { left: "25%", top: "70%" },
    { left: "75%", top: "65%" },
  ];

  return (
    <section
      ref={rootRef}
      className="
        block md:hidden w-full
        pt-[100px] pb-[140px]
        relative overflow-hidden
        text-white
        bg-[linear-gradient(180deg,#02040a_0%,#060b15_45%,#0b1428_100%)]
      "
    >
      {/* ──────────────────────────────
          背景ネオン粒子（大画面用に散らす）
      ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {BOKEHS.map((pos, i) => (
          <div
            key={i}
            className="
              absolute
              w-[90px] h-[90px]
              rounded-full
              bg-[rgba(80,130,255,0.28)]
              blur-[26px] opacity-[0.5]
            "
            style={{
              left: pos.left,
              top: pos.top,
              animation: `lobbyFloat ${7 + i * 1.3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ──────────────────────────────
          タイトル（中央寄せ）
      ────────────────────────────── */}
      <div className="relative w-[88%] mx-auto text-center z-[3] mb-10">
        <p
          className={`
            text-[11px] tracking-[0.32em] text-white/40 mb-4
            transition-all duration-[1100ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          LOBBY LOUNGE
        </p>

        <h2
          className={`
            text-[26px] leading-[1.65] font-light 
            drop-shadow-[0_4px_22px_rgba(20,90,200,0.45)]
            transition-all duration-[1250ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          静けさが美しくなる  
          夜のロビーフロア。
        </h2>
      </div>

      {/* ──────────────────────────────
          ロビー写真（ワイドフル表示）
      ────────────────────────────── */}
      <div className="relative w-full z-[2]">
        <figure
          className={`
            w-full h-[72vh]        /* 画面の7割の高さを使う */
            overflow-hidden
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          {/* 青 × 金ネオンベール（画面いっぱい） */}
          <div
            className="
              absolute inset-0 pointer-events-none
              bg-[radial-gradient(circle_at_30%_20%,rgba(80,130,255,0.28),rgba(0,0,0,0)_65%),
                 radial-gradient(circle_at_75%_80%,rgba(255,190,140,0.25),rgba(0,0,0,0)_70%)]
              mix-blend-soft-light opacity-[0.85]
            "
          />

          <img
            ref={imgRef}
            src="/hotel/lobby/lobby-main.png"
            className="
              w-full h-full object-cover
              brightness-[1.08]
            "
          />
        </figure>
      </div>

      {/* ──────────────────────────────
          説明文（余白大 → 呼吸）
      ────────────────────────────── */}
      <div className="relative w-[88%] mx-auto z-[3] mt-12">
        <p
          className={`
            text-[14px] leading-[1.9] text-white/75
            transition-all duration-[1300ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
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

/* -----------------------------------------
   浮遊アニメ Keyframes
------------------------------------------ */
const style = document.createElement("style");
style.innerHTML = `
@keyframes lobbyFloat {
  0%   { transform: translateY(0) translateX(0); }
  50%  { transform: translateY(-18px) translateX(10px); }
  100% { transform: translateY(0) translateX(0); }
}`;
document.head.appendChild(style);
