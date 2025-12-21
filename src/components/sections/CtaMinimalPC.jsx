// src/components/sections/CtaMinimalPC.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CtaMinimalPC() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }
    ).fromTo(
      btnRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        hidden md:block
        w-full
        py-[160px]
        bg-[#fefefe]        /* 真っ白ではなく1段柔らかい白 */
        text-center
      "
    >
      {/* ───────────────
          リードテキスト
      ─────────────── */}
      <p
        ref={textRef}
        className="
          text-[17px]
          tracking-[0.20em]
          text-[#0b0b0b]/70
          font-light
          mb-10
        "
      >
        このホテルでしか味わえない静けさを。
      </p>

      {/* ───────────────
          CTA ボタン（黒すぎない静黒）
      ─────────────── */}
      <a
        ref={btnRef}
        href="#"
        className="
          inline-block
          px-[46px] py-[13px]
          border border-[#0a0a0a]/22     /* 22%の薄い境界線 */
          text-[#0a0a0a]/80
          tracking-[0.26em]
          text-[13px]
          rounded-[4px]
          transition-all duration-500

          hover:bg-[#0a0a0a]/90
          hover:text-white
          hover:border-[#0a0a0a]/90

          /* ゴールド光はほんのりだけ */
          hover:shadow-[0_0_24px_rgba(255,210,140,0.14)]
        "
      >
        RESERVE YOUR STAY →
      </a>
    </section>
  );
}
