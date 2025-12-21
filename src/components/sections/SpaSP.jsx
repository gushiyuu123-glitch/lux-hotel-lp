// src/components/sections/SpaSP.jsx
import { useEffect, useRef, useState } from "react";

export default function SpaSP() {
  const rootRef = useRef(null);
  const scrollRef = useRef(null); // ← 横スクする要素
  const [active, setActive] = useState(false);
  const autoScrollTimer = useRef(null);
  const isUserInteracting = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.35 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  const MINI = [
    { img: "/hotel/spa/spa_water.png", label: "WATER LIGHT" },
    { img: "/hotel/spa/spa_candle.png", label: "AROMA" },
    { img: "/hotel/spa/spa_towel.png", label: "CALMNESS" },
  ];

  /* ===========================================
     自動スクロール機能
  ============================================ */
  useEffect(() => {
    if (!active) return;

    const el = scrollRef.current;
    if (!el) return;

    const startAutoScroll = () => {
      stopAutoScroll(); // 念のため初期化
      autoScrollTimer.current = setInterval(() => {
        if (isUserInteracting.current) return;

        const maxScroll = el.scrollWidth - el.clientWidth;

        if (el.scrollLeft >= maxScroll - 2) {
          // 端まで行ったら戻る
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 1; // ← 流れる速度（遅めで高級感）
        }
      }, 16); // 約60fps
    };

    const stopAutoScroll = () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
    };

    // ユーザーが触ったら一時停止
    const onTouchStart = () => {
      isUserInteracting.current = true;
      stopAutoScroll();
    };
    const onTouchEnd = () => {
      isUserInteracting.current = false;
      setTimeout(startAutoScroll, 1200); // 触った後少し余韻を置いて再開
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    startAutoScroll(); // 最初に開始

    return () => {
      stopAutoScroll();
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [active]);

  return (
    <section
      ref={rootRef}
      className="
        block md:hidden
        w-full
        pt-[120px] pb-[140px]
        bg-[linear-gradient(180deg,#fff7f0_0%,#ffffff_100%)]
        text-neutral-900
      "
    >
      <div className="w-[90%] mx-auto">

        {/* -------------------------
            メインアート
        -------------------------- */}
        <div
          className={`
            transition-all duration-[1200ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"}
          `}
        >
          <div
            className="
              overflow-hidden rounded-[10px]
              shadow-[0_22px_70px_rgba(0,0,0,0.22)]
            "
          >
            <img
              src="/hotel/spa/spa_main.png"
              className="
                w-full h-full object-cover
                scale-[1.04]
                transition-all duration-[1500ms]
                active:scale-[1.06]
              "
            />
          </div>
        </div>

        {/* -------------------------
            テキスト
        -------------------------- */}
        <div
          className={`
            mt-10 px-1
            transition-all duration-[1100ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"}
          `}
        >
          <p className="text-[11px] tracking-[0.28em] text-neutral-500 mb-4">
            SPA
          </p>

          <h2 className="text-[26px] font-light leading-[1.55] mb-6">
            心までととのう、  
            静かなリラクゼーション。
          </h2>

          <p className="text-[14px] leading-[1.9] text-neutral-700 mb-12">
            暖かな光に包まれるトリートメントルームと、
            水面に反射するやわらかな揺らぎ。  
            心身をゆっくり整える時間が流れます。
          </p>
        </div>

        {/* -------------------------
            ミニギャラリー（自動横スク）
        -------------------------- */}
        <div
          ref={scrollRef}
          className={`
            flex gap-6 overflow-x-auto no-scrollbar
            scroll-smooth snap-x snap-mandatory
            w-[100vw] -ml-[5vw] pr-[5vw]
            transition-opacity duration-[1000ms]
            ${active ? "opacity-100" : "opacity-0"}
          `}
        >
          {MINI.map((item, i) => (
            <div
              key={i}
              className="
                min-w-[68%] snap-start flex flex-col gap-2
              "
            >
              <div
                className="
                  overflow-hidden rounded-[10px]
                  shadow-[0_16px_40px_rgba(0,0,0,0.14)]
                "
              >
                <img
                  src={item.img}
                  className="
                    w-full h-full object-cover
                    transition-all duration-[1000ms]
                  "
                />
              </div>

              <p className="text-[11px] tracking-[0.22em] text-neutral-500 px-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
