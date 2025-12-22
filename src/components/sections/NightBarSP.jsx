// NightBarSP — Redesign Luxury Version
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NightBarSP() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);

  // ---- 入場判定 ----
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.35 }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  // ---- 浮遊アニメ ----
  const floatAnim = (el, delay) => {
    gsap.to(el, {
      y: -14,
      duration: 6 + delay,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
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
        block md:hidden w-full 
        pt-[80px] pb-[150px]
        text-white relative overflow-hidden
        bg-[linear-gradient(180deg,#01030a_0%,#050a18_45%,#091226_100%)]
      "
    >

      {/* --------------------------------------------------
          背景：深海の光（固定）
      -------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0">
        {[0,1,2].map((i) => (
          <div
            key={i}
            className="nb-float absolute 
              w-[60px] h-[60px] 
              rounded-full 
              bg-[rgba(80,130,255,0.25)]
              blur-[22px] opacity-[0.55]"
            style={{
              left: `${20 + i * 25}%`,
              top: `${i % 2 === 0 ? "28%" : "62%"}`,
            }}
          />
        ))}
      </div>

      {/* --------------------------------------------------
          HERO（タイトルゾーン）
      -------------------------------------------------- */}
      <div className="relative w-[88%] mx-auto text-center mb-14">
        <p
          className={`
            text-[11px] tracking-[0.32em] text-white/45 mb-3
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
        >
          BAR & LOUNGE
        </p>

        <h2
          className={`
            text-[26px] leading-[1.65] font-light
            drop-shadow-[0_4px_24px_rgba(40,120,255,0.42)]
            transition-all duration-[1400ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}
        >
          深い青に溶けるような、  
          大人の夜を。
        </h2>
      </div>


      {/* --------------------------------------------------
          PHOTO 1
      -------------------------------------------------- */}
      <figure
        className={`
          relative nb-float
          w-[88%] mx-auto aspect-[4/5]
          overflow-hidden rounded-[6px]
          shadow-[0_22px_70px_rgba(0,40,120,0.55)]
          mb-14
          transition-all duration-[1300ms]
          ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* 統一オーバーレイ */}
        <div
          className="
            absolute inset-0 pointer-events-none opacity-[0.9]
            bg-[radial-gradient(circle_at_20%_20%,rgba(255,210,150,0.24),rgba(0,0,0,0)_55%),
               radial-gradient(circle_at_80%_90%,rgba(85,130,255,0.32),rgba(0,0,0,0)_65%)]
            mix-blend-soft-light
          "
        />
        <img
          src="/hotel/bar/bar-hand.png"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* TEXT 1 */}
      <div className="w-[88%] mx-auto mb-[90px]">
        <h3 className="text-[22px] leading-[1.65] font-light mb-4">
          黄金の光が揺れる、  
          深い青のカウンター。
        </h3>
        <p className="text-[14px] leading-[1.85] text-white/75">
          グラスに落ちる琥珀色の光。  
          夜がゆっくりと深まり、  
          見つめるだけで満たされていく時間。
        </p>
      </div>


      {/* --------------------------------------------------
          PHOTO 2
      -------------------------------------------------- */}
      <figure
        className={`
          relative nb-float
          w-[88%] mx-auto aspect-[4/5]
          overflow-hidden rounded-[6px]
          shadow-[0_22px_70px_rgba(0,40,120,0.55)]
          mb-14
          transition-all duration-[1300ms]
          ${active ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-6"}
        `}
      >
        <div
          className="
            absolute inset-0 pointer-events-none opacity-[0.9]
            bg-[radial-gradient(circle_at_20%_0%,rgba(255,200,150,0.25),rgba(0,0,0,0)_60%),
               radial-gradient(circle_at_90%_100%,rgba(80,140,255,0.30),rgba(0,0,0,0)_75%)]
            mix-blend-soft-light
          "
        />
        <img
          src="/hotel/bar/bar-lounge.png"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* TEXT 2 */}
      <div className="w-[88%] mx-auto">
        <h3 className="text-[22px] leading-[1.65] font-light mb-4">
          深い青と金の光が  
          静かに混ざるラウンジ。
        </h3>
        <p className="text-[14px] leading-[1.85] text-white/75">
          海は静かに沈み、  
          室内の光だけがゆらゆらと揺れる。  
          夜そのものが贅沢に変わる場所。
        </p>
      </div>

    </section>
  );
}
