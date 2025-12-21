// src/components/sections/NightBarSP.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NightBarSP() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.35 }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const floatAnim = (el, delay) => {
    gsap.to(el, {
      y: -10,
      duration: 5 + delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  useEffect(() => {
    if (!active) return;
    const floats = document.querySelectorAll(".nb-float");
    floats.forEach((f, i) => floatAnim(f, i * 0.6));
  }, [active]);

  return (
    <section
      ref={rootRef}
      className="
        block md:hidden
        w-full
        pt-[120px] pb-[160px]
        relative overflow-hidden
        text-white
        bg-[linear-gradient(180deg,#02040a_0%,#060b15_40%,#0a1224_100%)]
      "
    >
      {/* ───────────────────────────────
          ボケ光（海中のネオン粒子）
      ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            className="
              absolute nb-float
              w-[70px] h-[70px]
              rounded-full
              bg-[rgba(70,120,255,0.28)]
              blur-[20px]
              opacity-[0.55]
            "
            style={{
              left: `${15 + i * 20}%`,
              top: `${i % 2 === 0 ? 22 : 60}%`,
            }}
          />
        ))}
      </div>

      <div className="relative w-[90%] mx-auto">

        {/* ─────────────
            見出し
        ───────────── */}
        <p
          className={`
            text-[11px] tracking-[0.32em] text-white/40 mb-5
            transition-all duration-[1100ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          BAR & LOUNGE
        </p>

        <h2
          className={`
            text-[26px] leading-[1.75] font-light mb-14
            drop-shadow-[0_4px_24px_rgba(0,80,200,0.45)]
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          夜がもっと美しくなる、  
          大人だけのバーラウンジ。
        </h2>

        {/* ───────────────────────────────
            写真①（手元）
        ─────────────────────────────── */}
        <figure
          className={`
            relative nb-float
            w-full aspect-[4/5]
            overflow-hidden rounded-[12px]
            shadow-[0_28px_80px_rgba(0,40,120,0.55)]
            mb-10
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* 金 × 青ネオンレイヤー */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_25%_20%,rgba(255,200,150,0.22),rgba(0,0,0,0)_55%),
                 radial-gradient(circle_at_80%_80%,rgba(70,120,255,0.30),rgba(0,0,0,0)_70%)]
              mix-blend-soft-light opacity-90
            "
          />

          <img
            src="/hotel/bar/bar-hand.png"
            className="
              w-full h-full object-cover
              transition duration-[1400ms]
            "
          />
        </figure>

        {/* ─────────────
            テキスト①
        ───────────── */}
        <div className="mb-[80px] px-1">
          <h3 className="text-[22px] leading-[1.7] font-light mb-4">
            黄金の光が揺れる、  
            深い青のカウンター。
          </h3>
          <p className="text-[14px] leading-[1.85] text-white/75">
            グラスに落ちる琥珀色の光。  
            夜がゆっくりと深まり、  
            ただ見つめるだけで満たされていく時間。
          </p>
        </div>

        {/* ───────────────────────────────
            写真②（窓際ラウンジ）
        ─────────────────────────────── */}
        <figure
          className={`
            relative nb-float
            w-full aspect-[4/5]
            overflow-hidden rounded-[12px]
            shadow-[0_28px_80px_rgba(0,40,120,0.55)]
            mb-10
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-6"}
          `}
        >
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_20%_0%,rgba(255,200,150,0.25),rgba(0,0,0,0)_60%),
                 radial-gradient(circle_at_90%_100%,rgba(80,140,255,0.30),rgba(0,0,0,0)_75%)]
              mix-blend-soft-light opacity-90
            "
          />

          <img
            src="/hotel/bar/bar-lounge.png"
            className="
              w-full h-full object-cover
              transition duration-[1400ms]
            "
          />
        </figure>

        {/* ─────────────
            テキスト②
        ───────────── */}
        <div className="px-1">
          <h3 className="text-[22px] leading-[1.7] font-light mb-4">
            深い青と金の光が  
            静かに混ざるラウンジ。
          </h3>
          <p className="text-[14px] leading-[1.85] text-white/75">
            外の海は深く静かに沈み、  
            室内の光だけがゆらゆらと揺れる。  
            ここでは夜そのものが贅沢になります。
          </p>
        </div>
      </div>
    </section>
  );
}
