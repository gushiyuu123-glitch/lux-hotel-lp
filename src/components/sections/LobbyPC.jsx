// src/components/sections/LobbyPC.jsx (Ultra Cool Ver.)
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LobbyPC() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ----------------------------------------
         ① メイン画像：フェード＋ズームイン
      ---------------------------------------- */
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.06, y: 70, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.4,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      /* ----------------------------------------
         ② タイトル：光が集まって形成される演出
      ---------------------------------------- */
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, letterSpacing: "0.05em", filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.38em",
          filter: "blur(0px)",
          duration: 2.6,
          ease: "expo.out",
          delay: 0.2,
        }
      );

      /* ----------------------------------------
         ③ 超低速シネマティックズーム
      ---------------------------------------- */
      gsap.to(imgRef.current, {
        scale: 1.12,
        duration: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 背景の霧レイヤーをゆっくり動かす
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.to(sectionRef.current, {
      backgroundPosition: "120% 120%",
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
        relative w-full overflow-hidden
        bg-[url('/hotel/lobby/mist-noise.png')]
        bg-[length:180%_180%]
        bg-[#02040a]
      "
    >
      {/* -------------- 青のネオン影 ---------------- */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[1]
          bg-[radial-gradient(circle_at_50%_20%,rgba(70,120,255,0.22),rgba(0,0,0,0)_65%)]
        "
      />

      {/* -------------- 金のネオン影 ---------------- */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[1]
          bg-[radial-gradient(circle_at_20%_80%,rgba(255,180,90,0.22),rgba(0,0,0,0)_75%)]
        "
      />

      {/* -------------- 左縦ネオンライン ---------------- */}
      <div
        className="
          pointer-events-none absolute top-0 bottom-0 left-[6%] w-[3px] z-[2]
          bg-gradient-to-b
          from-[rgba(120,150,255,0)]
          via-[rgba(120,150,255,0.7)]
          to-[rgba(120,150,255,0)]
          blur-[2px]
        "
      />

      {/* -------------- 右縦ネオンライン ---------------- */}
      <div
        className="
          pointer-events-none absolute top-0 bottom-0 right-[8%] w-[2px] z-[2]
          bg-gradient-to-b
          from-[rgba(255,190,120,0)]
          via-[rgba(255,190,120,0.6)]
          to-[rgba(255,190,120,0)]
          blur-[1.5px]
        "
      />

      {/* -------------- 上の遠くの光の帯 ---------------- */}
      <div
        className="
          absolute top-0 left-0 right-0 h-[120px] z-[3]
          bg-gradient-to-b from-white/10 to-transparent
          blur-[40px] opacity-[0.3]
        "
      />

      {/* -------------- 下の金光 ---------------- */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-[160px] z-[3]
          bg-gradient-to-t from-[rgba(255,220,150,0.20)] to-transparent
          blur-[55px]
        "
      />

      <div className="relative w-full h-[90vh]">
        {/* メイン画像 */}
        <img
          ref={imgRef}
          src="/hotel/lobby/lobby-main.png"
          alt="Luxury hotel lobby"
          className="
            absolute inset-0 w-full h-full
            object-cover object-center
            brightness-[1.07]
            z-[2]
          "
        />

        {/* タイトル */}
        <div
          className="
            absolute inset-0 z-[4]
            flex items-center justify-center
            pointer-events-none
          "
        >
          <h2
            ref={titleRef}
            className="
              text-[44px] font-light text-white/95
              tracking-[0.38em] text-center
              drop-shadow-[0_0_45px_rgba(0,0,0,0.95)]
              backdrop-blur-[2px]
            "
          >
            THE&nbsp;&nbsp;LOBBY&nbsp;&nbsp;LOUNGE
          </h2>
        </div>
      </div>
    </section>
  );
}
