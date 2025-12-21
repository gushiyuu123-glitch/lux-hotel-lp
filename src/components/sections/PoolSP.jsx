// src/components/sections/PoolSP.jsx
import { useState } from "react";

const MODES = [
  {
    id: "day",
    label: "DAY",
    title: "海と空がいちばん澄む、朝のひかり。",
    body: "やわらかな日差しと静かな水面。ゆるやかなチル時間が流れます。",
    img: "/hotel/pool/pool-day.png",
    bg: "from-[#eaf7ff] via-[#f2fbff] to-[#ffffff]",
  },
  {
    id: "sunset",
    label: "SUNSET",
    title: "夕陽が水面を染める、いちばん贅沢な時間。",
    body: "オレンジの光が水面に揺れ、海と空の境界が溶けます。",
    img: "/hotel/pool/pool-main.png",
    bg: "from-[#fff0e1] via-[#ffe5cc] to-[#fff9f4]",
  },
  {
    id: "night",
    label: "NIGHT",
    title: "静かな青に包まれる、ナイトプール。",
    body: "ライトアップされた水面、静かな夜風だけが残ります。",
    img: "/hotel/pool/pool-night.png",
    bg: "from-[#0a1628] via-[#0e1e36] to-[#132745]",
  },
];

export default function PoolSP() {
  const [active, setActive] = useState("sunset");
  const current = MODES.find((m) => m.id === active);

  const labelColor = active === "night" ? "text-white/60" : "text-neutral-500";
  const headingColor = active === "night" ? "text-white" : "text-neutral-900";
  const bodyColor = active === "night" ? "text-white/80" : "text-neutral-700";

  return (
    <section
      className={`
        md:hidden w-full py-[120px]
        bg-gradient-to-b ${current.bg}
        transition-colors duration-[700ms]
      `}
    >
      {/* Heading */}
      <div className="px-6 mb-10">
        <p className={`text-[11px] tracking-[0.32em] mb-4 ${labelColor}`}>
          POOL
        </p>

        <h2
          className={`text-[26px] leading-[1.65] font-light ${headingColor}`}
        >
          海と空がつながる、<br />インフィニティプール。
        </h2>

        <p className={`mt-4 text-[14px] leading-[1.8] ${bodyColor}`}>
          朝・夕・夜で異なる、3つの表情をお楽しみいただけます。
        </p>
      </div>

<div className="px-6 relative">
  <div
    className="
      relative
      w-full aspect-[4/3]
      rounded-[10px] overflow-hidden
      shadow-[0_18px_50px_rgba(0,0,0,0.35)]
    "
  >
    <img
      src={current.img}
      key={current.id}
      className="
        w-full h-full object-cover
        transition-all duration-[900ms]
      "
    />

    {/* ←← ラベルの位置を完全固定（ここがポイント） */}
    <div
      className="
        absolute left-4 top-4
        px-3 py-[5px]
        text-[10px] tracking-[0.26em]
        rounded-full bg-black/45 text-white/85
        backdrop-blur-[10px]
      "
    >
      POOL SIDE
    </div>
  </div>
</div>


      {/* Mode Switch */}
      <div className="px-6 mt-8 flex gap-3 flex-wrap">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`
              px-4 py-[7px] rounded-full text-[11px]
              tracking-[0.22em] uppercase
              transition-all duration-300
              ${
                m.id === active
                  ? "bg-neutral-900 text-white shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
                  : "bg-white/70 text-neutral-600 backdrop-blur-[4px]"
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Mode Text */}
      <div className="px-6 mt-10">
        <h3 className={`text-[20px] font-light mb-3 ${headingColor}`}>
          {current.title}
        </h3>
        <p className={`text-[14px] leading-[1.8] ${bodyColor}`}>
          {current.body}
        </p>
      </div>

      {/* ▼▼ 下段ギャラリー（縦積み・横スクなし） ▼▼ */}
      <div className="mt-14 px-6 space-y-12">
        {[
          {
            label: "MORNING",
            img: "/hotel/pool/pool-day.png",
            txt: "澄んだ朝の光と静かな水面。",
          },
          {
            label: "SUNSET",
            img: "/hotel/pool/pool-sunset.png",
            txt: "夕陽が水面を染めるドラマチックな時間。",
          },
          {
            label: "NIGHT",
            img: "/hotel/pool/pool-night.png",
            txt: "ライトアップされた静かな夜のプール。",
          },
        ].map((g, i) => (
          <figure key={i}>
            <div
              className="
                w-full aspect-[4/3] rounded-[12px] overflow-hidden
                shadow-[0_14px_40px_rgba(0,0,0,0.35)]
              "
            >
              <img
                src={g.img}
                className="w-full h-full object-cover"
                alt={g.label}
              />
            </div>

            <figcaption className="mt-4">
              <p className="text-[11px] tracking-[0.26em] text-neutral-500 mb-1">
                {g.label}
              </p>
              <p className="text-[14px] leading-[1.7] text-neutral-700">
                {g.txt}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
