import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroPC() {
  const bgRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const scrollLineRef = useRef(null);

  useEffect(() => {
    // === ① 背景 Blur → Sharp ===
    gsap.fromTo(
      bgRef.current,
      { filter: "blur(8px) brightness(0.92)" },
      {
        filter: "blur(0px) brightness(1)",
        duration: 1.4,
        ease: "power2.out",
      }
    );

    // === ② テキスト Time Fade ===
    gsap.fromTo(
      h1Ref.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.25,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.55,
        ease: "power2.out",
      }
    );

    // === ③ Scroll Line ===
    gsap.fromTo(
      scrollLineRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: 0.9,
        ease: "power2.out",
      }
    );
  }, []);

  // === ③ パララックス（スクロール反応） ===
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.03; // 3〜6px 程度でOK
      bgRef.current.style.transform = `translateY(${y}px) scale(1.03)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hidden md:block relative h-screen w-full overflow-hidden">

      {/* === 背景レイヤー === */}
      <img
        ref={bgRef}
        src="/hotel/hero-pc.png"
        alt="Blue Shore Hotel"
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-[800ms]
        "
      />

      {/* === 光スリット（超薄い光が横に動く） === */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          animate-[moveLight_20s_linear_infinite]
        "
        style={{ mixBlendMode: "soft-light" }}
      />

      {/* === テキスト === */}
      <div className="absolute left-[9%] bottom-[17%] text-white max-w-[600px]">
        <h1
          ref={h1Ref}
          className="
            text-[60px] font-light tracking-[0.07em] leading-[1.15]
            text-neutral-200
          "
        >
          Blue Shore Hotel
        </h1>

        <p
          ref={subRef}
          className="
            mt-4 text-[18px] font-light opacity-95 leading-[1.75]
          "
        >
          光と風がととのう、やさしい時間。
        </p>
      </div>

      {/* === Scroll Indicator（下部） === */}
      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2">
        <div
          ref={scrollLineRef}
          className="
            w-[1px] h-[54px]
            bg-white/40
            animate-[scrollLine_2.8s_ease-in-out_infinite]
          "
        />
      </div>
    </section>
  );
}
