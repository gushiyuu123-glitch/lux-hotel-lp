// src/components/sections/CtaMinimalSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CtaMinimalSP() {
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
        duration: 1.1,
        ease: "power2.out",
      }
    ).fromTo(
      btnRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        block md:hidden
        w-full
        py-[120px]
        bg-[#fefefe]       /* 柔らかい白：高級ホテルの白壁トーン */
        text-center
      "
    >
      {/* ===== リードテキスト ===== */}
      <p
        ref={textRef}
        className="
          text-[15px]
          tracking-[0.20em]
          text-[#0b0b0b]/70
          font-light
          mb-10 px-4
          leading-[1.9]
        "
      >
        このホテルでしか味わえない静けさを。
      </p>

      {/* ===== CTA ボタン ===== */}
      <a
        ref={btnRef}
        href="#"
        className="
          inline-block
          px-[38px] py-[14px]
          border border-[#0a0a0a]/22    /* 22% 薄境界線 */
          text-[#0a0a0a]/80
          tracking-[0.26em]
          text-[12px]
          rounded-[4px]
          transition-all duration-500

          active:bg-[#0a0a0a]/90
          active:text-white
          active:border-[#0a0a0a]/90

          /* ゴールドは極薄に */
          active:shadow-[0_0_20px_rgba(255,210,140,0.12)]
        "
      >
        RESERVE YOUR STAY →
      </a>
    </section>
  );
}
