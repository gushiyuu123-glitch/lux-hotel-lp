// src/components/sections/ConceptSP.jsx
import { useEffect, useRef, useState } from "react";

export default function ConceptSP() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        md:hidden
        w-full
        py-[120px]
        px-7
        bg-gradient-to-b
        from-[rgba(168,216,234,0.08)]
        to-white
      "
    >
      {/* メインコピー */}
      <div
        className={`
          transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"}
        `}
      >
        <p className="text-[11px] tracking-[0.32em] text-neutral-500 mb-4">
          BLUE SHORE HOTEL
        </p>

        <h2 className="text-[24px] leading-[1.8] font-light text-neutral-900 mb-4">
          光と風がととのう、  
          やさしい滞在を。
        </h2>

        <p className="text-[15px] leading-[1.9] font-light text-neutral-700 mb-10">
          海に近い静かなロケーションで、  
          日常から少し離れた時間をお過ごしいただけます。
          全室バルコニー付きの客室に加え、  
          滞在をゆっくりと深める施設をご用意しています。
        </p>

        {/* 線 */}
        <div className="h-[1px] bg-[rgba(168,216,234,0.35)] overflow-hidden">
          <div
            className={`
              h-full bg-[rgba(168,216,234,0.9)]
              transition-all duration-[850ms]
              ${visible ? "w-[90px]" : "w-0"}
            `}
          />
        </div>

        {/* サブ補足 */}
        <p
          className={`
            mt-12 text-[13px] tracking-wide text-neutral-600
            transition-all duration-[800ms]
            ${visible ? "opacity-80" : "opacity-0"}
          `}
        >
          景観・快適性・静けさを兼ね備えた滞在。
        </p>
      </div>

      {/* カード群 */}
      <div className="mt-16 space-y-10">
        {[
          {
            label: "Seaside Location",
            text: "波の音が届く距離で、朝夕で表情を変える海を客室やテラスから眺められます。",
          },
          {
            label: "Calm Rooms",
            text: "ブルーと白の静かなトーンで統一された客室。長期滞在でも疲れない空間設計。",
          },
          {
            label: "Quiet Facilities",
            text: "賑わいよりも落ち着きを優先した共有スペース。静かな時間を深めるための施設をご用意。",
          },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`
              border-l-[3px] border-[rgba(168,216,234,0.65)]
              pl-4
              transition-all duration-[750ms]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"}
            `}
            style={{ transitionDelay: `${300 + i * 130}ms` }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 mb-2">
              {item.label}
            </p>
            <p className="text-[14px] leading-[1.85] text-neutral-700">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
