// src/components/sections/HeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const bgRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景：ブラー解除 → くっきり
      gsap.fromTo(
        bgRef.current,
        { filter: "blur(10px) brightness(0.88)", scale: 1.06 },
        {
          filter: "blur(0px) brightness(1)",
          scale: 1.02,
          duration: 1.6,
          ease: "power2.out",
        }
      );

      // メインタイトル
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.25,
          ease: "power2.out",
        }
      );

      // サブテキスト
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // スクロールライン
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.8,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // スクロールで少しだけ動く（軽量パララックス）
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.045;
      bgRef.current.style.transform = `translateY(${y}px) scale(1.05)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="md:hidden relative h-[92vh] w-full overflow-hidden">
      {/* 背景画像 */}
      <img
        ref={bgRef}
        src="/hotel/hero-sp.png"
        alt="Blue Shore Hotel"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          transform scale-[1.05]
        "
      />

      {/* ① 黒ベール（視認性＋ラグジュアリー感） */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.22)]" />

      {/* ② 青＋金のデュアルライト */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_25%_20%,rgba(255,220,160,0.18),rgba(0,0,0,0)_55%),
             radial-gradient(circle_at_85%_85%,rgba(90,150,255,0.22),rgba(0,0,0,0)_60%)]
          mix-blend-soft-light
        "
      />

      {/* テキスト */}
      <div className="absolute left-6 bottom-[108px] text-white max-w-[82%]">
        <h1
          ref={h1Ref}
          className="
            text-[34px]
            font-light
            leading-[1.22]
            tracking-[0.05em]
            drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]
          "
        >
          Blue Shore Hotel
        </h1>

        <p
          ref={subRef}
          className="
            mt-3
            text-[15px]
            opacity-[0.95]
            leading-[1.75]
            font-light
            drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)]
          "
        >
          光と風がととのう、やさしい時間。
        </p>
      </div>

      {/* Scroll Line */}
      <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2">
        <div
          ref={scrollRef}
          className="
            w-[1px] h-[50px]
            bg-white/40
            animate-[scrollLine_2.8s_ease-in-out_infinite]
          "
        />
      </div>
    </section>
  );
}
