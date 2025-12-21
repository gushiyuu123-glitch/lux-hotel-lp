// src/components/sections/PoolPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODES = [
  {
    id: "day",
    label: "DAY POOL",
    title: "海と空がいちばん澄む、朝のひかり。",
    body: "やわらかな日差しと静かな水面。読書やチルにぴったりな、ゆるやかな時間が流れます。",
  },
  {
    id: "sunset",
    label: "SUNSET GLOW",
    title: "夕陽が水面を染める、いちばん贅沢な時間。",
    body: "オレンジ色の光が水面に揺れて、空と海の境界が溶けていく。グラスを片手に眺めるだけの時間も、ここではひとつの贅沢です。",
  },
  {
    id: "night",
    label: "NIGHT POOL",
    title: "静かな青に包まれる、ナイトプール。",
    body: "ライトアップされた水面と、遠くに聞こえる波の音。都会の光とは違う、やわらかな夜のきらめきだけが残ります。",
  },
];

// 時間帯別：メイン画像
const MAIN_IMAGES = {
  day: "/hotel/pool/pool-day.png",
  sunset: "/hotel/pool/pool-main.png",
  night: "/hotel/pool/pool-night.png",
};

// 時間帯別：背景グラデ
const BG_GRADIENT = {
  day: "from-[#eaf7ff] via-[#f2fbff] to-[#ffffff]",
  sunset: "from-[#fff0e1] via-[#ffe5cc] to-[#fff9f4]",
  night: "from-[#0a1628] via-[#0e1e36] to-[#132745]",
};

export default function PoolPC() {
  const [activeMode, setActiveMode] = useState("sunset");

  // ← ここに貼る
  const labelColor = (mode) =>
    mode === "night" ? "text-white/60" : "text-neutral-500";

  const headingColor = (mode) =>
    mode === "night" ? "text-white/90" : "text-neutral-900";

  const bodyColor = (mode) =>
    mode === "night" ? "text-white/70" : "text-neutral-700";

  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const textBlockRef = useRef(null);
  const shimmerRef1 = useRef(null);
  const shimmerRef2 = useRef(null);
  const bokehRefs = useRef([]);

  const current = MODES.find((m) => m.id === activeMode) ?? MODES[1];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const base = sectionRef.current;

      // 入場アニメ（メイン画像）
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: base,
            start: "top 75%",
          },
        }
      );

      // 入場アニメ（テキスト）
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: base,
            start: "top 75%",
          },
        }
      );

      // 水面ハイライト：2枚をゆるく上下
      if (shimmerRef1.current) {
        gsap.to(shimmerRef1.current, {
          y: -18,
          opacity: 0.95,
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (shimmerRef2.current) {
        gsap.to(shimmerRef2.current, {
          y: 14,
          opacity: 0.7,
          duration: 5.1,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // 浮遊ボケ（光の粒）
      bokehRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: -20 - i * 6,
          x: i % 2 === 0 ? 10 : -12,
          opacity: 0.85,
          duration: 6 + i * 1.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        hidden md:block
        w-full
        py-[220px]
        bg-gradient-to-b
        ${BG_GRADIENT[activeMode]}
        transition-colors
        duration-[900ms]
      `}
    >
      <div className="relative w-[90%] max-w-[1400px] mx-auto px-[12px]">
        {/* 中央をほんのり明るくするレイヤー */}
        <div
          className="
            pointer-events-none
            absolute -inset-x-[12%] -top-16 bottom-[-80px]
            bg-[radial-gradient(circle_at_20%_10%,rgba(173,213,238,0.24),rgba(255,255,255,0)_55%)]
          "
        />

        {/* 浮遊ボケ（光の粒） */}
        <div className="pointer-events-none absolute inset-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => (bokehRefs.current[i] = el)}
              className="
                absolute
                w-[70px] h-[70px]
          
                blur-[18px]
                bg-[rgba(255,255,255,0.22)]
                opacity-60
              "
              style={
                i === 0
                  ? { left: "8%", top: "18%" }
                  : i === 1
                  ? { right: "4%", top: "40%" }
                  : { left: "18%", bottom: "8%" }
              }
            />
          ))}
        </div>

        {/* メインレイアウト */}
        <div className="relative flex items-center gap-20">
          {/* ========= Left : メインビジュアル ========= */}
          <div
            ref={imageWrapRef}
            className="
              relative
              w-[62%]
              aspect-[16/9]
              rounded-[6px]
              overflow-hidden
              shadow-[0_30px_90px_rgba(10,25,50,0.65)]
              bg-neutral-900
              group
            "
          >
            {/* メイン画像（時間帯で切り替え） */}
            <img
              key={activeMode}
              src={MAIN_IMAGES[activeMode]}
              alt="Infinity pool at Blue Shore Hotel"
              className="
                w-full h-full object-cover
                transition-transform duration-[1600ms]
                ease-[cubic-bezier(.19,1,.22,1)]
                group-hover:scale-[1.04]
              "
            />

            {/* 水面ハイライトレイヤー 1 */}
            <div
              ref={shimmerRef1}
              className="
                pointer-events-none
                absolute inset-0
                opacity-[0.65]
                mix-blend-screen
                bg-[radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.34),rgba(255,255,255,0)_50%),radial-gradient(circle_at_90%_0%,rgba(249,193,120,0.42),rgba(249,193,120,0)_55%)]
              "
            />
            {/* レイヤー 2（色味少し変える） */}
            <div
              ref={shimmerRef2}
              className="
                pointer-events-none
                absolute inset-0
                opacity-[0.45]
                mix-blend-screen
                bg-[radial-gradient(circle_at_10%_0%,rgba(135,196,255,0.26),rgba(135,196,255,0)_50%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.25),rgba(255,255,255,0)_55%)]
              "
            />

            {/* 下辺の“水面ライン” */}
            <div
              className="
                pointer-events-none
                absolute bottom-0 left-0 right-0
                h-[42px]
                bg-gradient-to-t from-[rgba(0,0,0,0.58)] via-[rgba(0,0,0,0.28)] to-transparent
              "
            />

            {/* ラベル（左上） */}
            <div
              className="
                absolute left-7 top-7
                px-3 py-[5px]
                rounded-full
                text-[11px]
                tracking-[0.28em]
                uppercase
                bg-black/45
                text-white/85
                backdrop-blur-[12px]
              "
            >
              POOL SIDE
            </div>
          </div>

          {/* ========= Right : テキストエリア ========= */}
          <div ref={textBlockRef} className="flex-1 max-w-[420px]">
<p className={`text-[11px] tracking-[0.32em] mb-5 ${labelColor(activeMode)}`}>
  POOL
</p>

     <h2 className={`text-[30px] leading-[1.8] font-light mb-5 ${headingColor(activeMode)}`}>
  海と空がつながる、<br />静かなインフィニティプール。
</h2>
           <p className={`text-[14px] leading-relaxed mb-8 ${bodyColor(activeMode)}`}>
              目の前にひろがる海と、ホテルに沿ってのびるインフィニティプール。
              朝・夕・夜、それぞれの時間帯でまったく違う表情を見せてくれます。
            </p>

            {/* モード切替（チップ） */}
            <div className="flex flex-wrap gap-3 mb-6">
              {MODES.map((mode) => {
                const active = mode.id === activeMode;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode.id)}
                    className={`
                      px-4 py-[7px]
                      rounded-full
                      text-[11px] tracking-[0.22em] uppercase
                      transition-[background-color,color,box-shadow,transform]
                      duration-300
                      ${
                        active
                          ? "bg-neutral-900 text-white shadow-[0_12px_26px_rgba(0,0,0,0.35)] translate-y-[-1px]"
                          : "bg-white/80 text-neutral-500 hover:bg-neutral-900 hover:text-white hover:shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
                      }
                    `}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>

            {/* モードごとの文章 */}
            <div className="relative min-h-[96px]">
         <p className={`text-[13px] leading-relaxed ${bodyColor(activeMode)}`}>
  <span className={`block text-[14px] font-light mb-1 ${headingColor(activeMode)}`}>
    {current.title}
  </span>
  {current.body}
</p>
            </div>

            <div className="mt-10 w-full h-[1px] bg-gradient-to-r from-[rgba(133,178,204,0.55)] via-[rgba(240,240,240,0.0)] to-[rgba(247,204,147,0.75)]" />
          </div>
        </div>

        {/* ========= 下段サブギャラリー（3枚） ========= */}
        <div className="mt-[96px] grid grid-cols-3 gap-8">
          {/* Day */}
          <figure
            className="
              group
              flex flex-col gap-3
              transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(.25,.8,.25,1)]
              hover:-translate-y-[6px]
            "
          >
            <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-neutral-900 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
              <img
                src="/hotel/pool/pool-day.png"
                alt="Daytime pool"
                className="
                  w-full h-full object-cover
                  transition-transform duration-[1200ms]
                  group-hover:scale-[1.06]
                "
              />
            </div>
            <figcaption className="px-1">
              <p className="text-[11px] tracking-[0.26em] text-neutral-500 mb-1">
                MORNING
              </p>
              <p className="text-[14px] font-light text-neutral-800">
                まだ人の少ない時間帯に、ゆっくりとひと泳ぎ。
              </p>
            </figcaption>
          </figure>

          {/* Sunset */}
          <figure
            className="
              group
              flex flex-col gap-3
              transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(.25,.8,.25,1)]
              hover:-translate-y-[6px]
            "
          >
            <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-neutral-900 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
              <img
                src="/hotel/pool/pool-sunset.png"
                alt="Sunset pool"
                className="
                  w-full h-full object-cover
                  transition-transform duration-[1200ms]
                  group-hover:scale-[1.06]
                "
              />
            </div>
            <figcaption className="px-1">
             <p className={`text-[11px] tracking-[0.26em] mb-1 ${labelColor(activeMode)}`}>
                SUNSET
              </p>
              <p className="text-[14px] font-light text-neutral-800">
                オレンジの光が水面に落ちていく、一日のクライマックス。
              </p>
            </figcaption>
          </figure>

          {/* Night */}
          <figure
            className="
              group
              flex flex-col gap-3
              transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(.25,.8,.25,1)]
              hover:-translate-y-[6px] 
            "
          >
            <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-neutral-900 shadow-[0_16px_50px_rgba(0,0,0,0.35)] ">
              <img
                src="/hotel/pool/pool-night.png"
                alt="Night pool"
                className="
                  w-full h-full object-cover
                  transition-transform duration-[1200ms]
                  group-hover:scale-[1.06] 
                "
              />
            </div>
            <figcaption className="px-1">
              <p className="text-[11px] tracking-[0.26em] text-neutral-500 mb-1 ">
                NIGHT
              </p>
            <p className={`text-[14px] font-light ${bodyColor(activeMode)}`}>
                ライトアップされた水面とともに、静かな夜風だけが残る時間。
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
