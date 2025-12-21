// src/components/sections/ConceptPC.jsx
import { useEffect, useRef, useState } from "react";

export default function ConceptPC() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        hidden md:block
        w-full
        py-[180px]
        bg-gradient-to-b
        from-[rgba(168,216,234,0.12)]
        to-white
      "
    >
      <div
        className={`
          w-[88%] max-w-[1160px] mx-auto
          flex gap-24
          transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"}
        `}
      >
        {/* 左：メインコピー */}
        <div className="flex-1">
          <p className="text-[12px] tracking-[0.32em] text-neutral-500 mb-6">
            BLUE SHORE HOTEL
          </p>

          <h2 className="text-[30px] leading-[1.9] font-light text-neutral-900 mb-4">
            光と風がととのう、やさしい滞在を。
          </h2>

          <p className="text-[17px] leading-[1.9] font-light text-neutral-700 mb-10">
            海に近い静かなロケーションで、日常から少し離れた時間をお過ごしいただけます。
            全室バルコニー付きの客室に加え、レストラン・ラウンジ・プールなど、
            滞在をゆっくりと深めるための施設をご用意しています。
          </p>

          {/* アンダーライン（アニメで伸びる） */}
          <div className="h-[1px] bg-[rgba(168,216,234,0.4)] overflow-hidden">
            <div
              className={`
                h-full bg-[rgba(168,216,234,0.9)]
                transition-all duration-[850ms] delay-200
                ${visible ? "w-[120px]" : "w-0"}
              `}
            />
          </div>
          {/* 線の下に1行の強み */}
<p
  className={`
    mt-20 text-[14px] tracking-wide text-neutral-600
    transition-all duration-[850ms] delay-300
    ${visible ? "opacity-80" : "opacity-0"}
  `}
>
  景観・快適性・静けさを兼ね備えたバランスの良い滞在。
</p>

        </div>

        {/* 右：滞在のポイント（ミニカード） */}
        <div className="w-[280px] pt-10 space-y-8">
          {[
            {
              label: "Seaside Location",
              text: "波の音が届く距離に位置し、朝夕で表情を変える海を客室やテラスから眺められます。",
            },
            {
              label: "Calm Rooms",
              text: "やわらかなブルーと白を基調にした客室は、長く滞在しても疲れない静かなトーンで統一。",
            },
            {
              label: "Quiet Facilities",
              text: "プールサイドやラウンジなど、賑わいよりも落ち着きを優先した共有スペースをご用意しています。",
            },
          ].map((item, idx) => (
            <div
              key={item.label}
              className={`
                border-l border-[rgba(168,216,234,0.6)]
                pl-4
                transition-all duration-[750ms]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[18px]"}
              `}
              style={{ transitionDelay: `${250 + idx * 120}ms` }}
            >
              <p className="text-[12px] tracking-[0.22em] uppercase text-neutral-500 mb-2">
                {item.label}
              </p>
              <p className="text-[14px] leading-[1.9] text-neutral-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
