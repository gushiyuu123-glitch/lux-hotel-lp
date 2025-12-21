// src/components/sections/SpaPC.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SpaPC() {
  const rootRef = useRef(null);
  const mainImgRef = useRef(null);
  const textRef = useRef(null);
  const miniRefs = useRef([]);

  const [active, setActive] = useState(false);

  // Intersection：セクションに入ったら発火
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(true);
        });
      },
      { threshold: 0.4 }
    );

    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP Animation（光の立ち上がり＋アートフェード）
  useEffect(() => {
    if (!active) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.4 },
    });

    // メイン画像（ゆっくり光る）
    tl.fromTo(
      mainImgRef.current,
      { opacity: 0, scale: 1.04, filter: "blur(6px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2.2,
      }
    );

    // テキスト
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0 },
      "-=1.2"
    );

    // ミニアート（ゆっくり1つずつ点灯）
    miniRefs.current.forEach((el, i) => {
      tl.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
        },
        "-=1.05" + i * 0.12
      );
    });
  }, [active]);

  return (
    <section
      ref={rootRef}
      className="
        hidden md:block
        w-full 
        py-[200px]
        bg-[linear-gradient(180deg,#fff7f0_0%,#fff_100%)]
        text-neutral-900
      "
    >
      <div className="w-[90%] max-w-[1380px] mx-auto flex gap-28 items-center">
        
        {/* ======================================
            左：メインアート（Aesop / Dior 構図）
        ======================================= */}
        <div className="w-[52%]">
          <div
            ref={mainImgRef}
            className="overflow-hidden rounded-[6px] shadow-[0_28px_90px_rgba(0,0,0,0.25)]"
          >
            <img
              src="/hotel/spa/spa_main.png"
              alt="Spa treatment room"
              className="
                w-full h-full object-cover
                transition-all duration-[1400ms]
              "
            />
          </div>
        </div>

        {/* ======================================
            右：テキスト＋ミニギャラリー
        ======================================= */}
        <div ref={textRef} className="w-[40%]">
          <p className="text-[12px] tracking-[0.28em] text-neutral-500 mb-4">
            SPA
          </p>

          <h2 className="text-[36px] font-light leading-[1.45] mb-6">
            心までととのう、  
            <br />
            静かなリラクゼーション。
          </h2>

          <p className="text-[15px] leading-[1.9] text-neutral-600 mb-12 max-w-[440px]">
            暖かな光に包まれるトリートメントルームと、  
            水面に反射する揺らぎの光。  
            心身をゆっくり整えるための、やさしい時間が流れます。
          </p>

          {/* ===== Mini Gallery（3枚 – Dior/Aesopの物撮り） ===== */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { img: "/hotel/spa/spa_water.png", label: "WATER LIGHT" },
              { img: "/hotel/spa/spa_candle.png", label: "AROMA" },
              { img: "/hotel/spa/spa_towel.png", label: "CALMNESS" },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (miniRefs.current[i] = el)}
                className="flex flex-col gap-2"
              >
                <div
                  className="
                    overflow-hidden 
                   rounded-[6px]
                    shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                    group
                  "
                >
                  <img
                    src={item.img}
                    className="
                      w-full h-full object-cover
                      transition-all duration-[1000ms]
                      group-hover:scale-[1.05] 
                      group-hover:brightness-[1.05]
                    "
                  />
                </div>
                <p className="text-[11px] tracking-[0.22em] text-neutral-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
