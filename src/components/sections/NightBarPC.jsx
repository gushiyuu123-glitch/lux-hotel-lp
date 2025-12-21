// src/components/sections/NightBarPC.jsx (Ultra Cool Ver.)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function NightBarPC() {
  const sectionRef = useRef(null);
  const blockRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blockRefs.current.forEach((el, i) => {
        if (!el) return;

        // 入場（深く・静かに）
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power3.out",
            delay: i * 0.28,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );

        // 画像浮遊
        const img = el.querySelector(".float-img");
        if (img) {
          gsap.to(img, {
            y: -14,
            duration: 6 + i * 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // バックの“霧（mist）”演出
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.to(sectionRef.current, {
      backgroundPosition: "100% 100%",
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        hidden md:block
        w-full py-[240px]
        relative overflow-hidden
        text-white
        bg-[url('/hotel/bar/noise-mist.png')] 
        bg-[length:160%_160%]
        bg-[#03040c]
      "
    >
      {/* ----- グラデ層（深海ネオン） ----- */}
      <div className="
        pointer-events-none
        absolute inset-0
        bg-[radial-gradient(circle_at_50%_20%,rgba(0,90,200,0.24),rgba(0,0,0,0)_65%)]
        mix-blend-screen
      " />

      {/* ----- 水平方向のネオンライン ----- */}
      <div className="
        pointer-events-none
        absolute left-0 right-0 top-[12%]
        h-[1px]
        bg-gradient-to-r from-transparent via-[rgba(70,120,255,0.45)] to-transparent
        blur-[1.8px]
      " />

      {/* ----- タイトル ----- */}
      <div className="relative w-[90%] max-w-[1400px] mx-auto px-[12px] mb-[140px]">
        <p className="text-[11px] tracking-[0.38em] text-white/35 mb-5">
          BAR & LOUNGE
        </p>

        <h2 className="
          text-[34px] leading-[1.9] font-light text-white
          tracking-[0.02em]
          drop-shadow-[0_4px_24px_rgba(0,80,200,0.45)]
        ">
          ただの夜じゃない、  
          <br />青と金が静かに混ざる場所。
        </h2>
      </div>

      <div className="relative w-[90%] max-w-[1400px] mx-auto px-[12px]">

        {/* ボケ粒子（6つ） */}
        <div className="pointer-events-none absolute inset-0">
          {[0,1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="
                absolute w-[80px] h-[80px]
                bg-[rgba(70,120,255,0.28)]
                blur-[22px]
                rounded-full opacity-[0.65]
              "
              style={{
                left: `${10 + i * 14}%`,
                top: `${i % 2 === 0 ? 20 : 60}%`,
                animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* ===============================
            Block 01 (画像 → テキスト)
        =============================== */}
        <div
          ref={(el) => (blockRefs.current[0] = el)}
          className="flex items-center gap-[120px] mb-[220px]"
        >
          {/* 手元写真（青金ネオン） */}
          <figure
            className="
              relative w-[48%] aspect-[4/3]
              overflow-hidden rounded-[10px]
              bg-neutral-900 float-img
              shadow-[0_40px_120px_rgba(0,40,120,0.65)]
              group
            "
          >
            {/* ネオン縦ライン */}
            <div className="
              pointer-events-none absolute inset-y-0 left-0 w-[2px]
              bg-gradient-to-b from-[rgba(120,150,255,0)] via-[rgba(120,150,255,0.7)] to-[rgba(120,150,255,0)]
              blur-[1px]
            " />

            {/* 光のベール */}
            <div className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_30%_20%,rgba(255,200,150,0.24),rgba(0,0,0,0)_60%),
                 radial-gradient(circle_at_80%_80%,rgba(70,120,255,0.30),rgba(0,0,0,0)_65%)]
              mix-blend-soft-light
              opacity-90
            " />

            <img
              src="/hotel/bar/bar-hand.png"
              className="
                w-full h-full object-cover
                transition duration-[1400ms]
                group-hover:scale-[1.05]
              "
            />
          </figure>

          {/* テキスト */}
          <div className="w-[48%]">
            <h3 className="text-[26px] leading-[1.7] font-light mb-6">
              金の光がゆっくり落ちていく  
              <br />深い青のカウンター。
            </h3>
            <p className="text-[14px] text-white/75 leading-[1.9]">
              グラスを満たす琥珀の光。  
              ほんの少しの揺れでも、夜が特別になる瞬間。  
              会話も、沈黙さえも美しく見える場所です。
            </p>
          </div>
        </div>

        {/* ===============================
            Block 02 (テキスト → 写真)
        =============================== */}
        <div
          ref={(el) => (blockRefs.current[1] = el)}
          className="flex items-center gap-[120px]"
        >
          {/* テキスト */}
          <div className="w-[48%]">
            <h3 className="text-[26px] leading-[1.7] font-light mb-6">
              海の深さと  
              <br />照明の金が混ざるラウンジ。
            </h3>
            <p className="text-[14px] text-white/75 leading-[1.9]">
              静かにゆれる金色の光。  
              外の海は深い青。  
              ただ“眺める”だけで満たされていく時間です。
            </p>
          </div>

          {/* 窓際ラウンジ写真 */}
          <figure
            className="
              relative w-[48%] aspect-[4/3]
              overflow-hidden rounded-[10px]
              bg-neutral-900 float-img
              shadow-[0_40px_120px_rgba(0,40,120,0.65)]
              group
            "
          >
            <div className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_20%_0%,rgba(255,200,150,0.24),rgba(0,0,0,0)_65%),
                 radial-gradient(circle_at_90%_100%,rgba(80,140,255,0.30),rgba(0,0,0,0)_60%)]
              mix-blend-soft-light opacity-90
            " />

            <img
              src="/hotel/bar/bar-lounge.png"
              className="
                w-full h-full object-cover
                transition duration-[1400ms]
                group-hover:scale-[1.05]
              "
            />
          </figure>
        </div>

      </div>
    </section>
  );
}

/* 追加：浮遊ボケのアニメーション */
const style = document.createElement("style");
style.innerHTML = `
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
}`;
document.head.appendChild(style);
