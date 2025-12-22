// src/components/sections/FacilitiesSP.jsx
import { useEffect, useRef, useState } from "react";

const FACILITIES = [
  { id: "pool", title: "Infinity Pool", text: "海とつながるような開放的なプールで、ゆったりとした時間を。", img: "/hotel/facilities/pool.png" },
  { id: "lounge", title: "Ocean Lounge", text: "波の音を聞きながらくつろげる静かなラウンジ。", img: "/hotel/facilities/lounge.png" },
  { id: "restaurant", title: "Seaside Restaurant", text: "地元食材を使った料理を、海を眺めながら楽しめます。", img: "/hotel/facilities/restaurant.png" },
  { id: "spa", title: "Relaxation Spa", text: "旅の疲れを癒すスパトリートメントをご用意。", img: "/hotel/facilities/spa.png" },
  { id: "terrace", title: "Sunset Terrace", text: "夕日を眺めながら過ごす特別なひととき。", img: "/hotel/facilities/terrace.png" },
];

export default function FacilitiesSP() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 無限ループのため幅を計算
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; 
    track.style.setProperty("--slide-width", `${totalWidth}px`);
  }, []);

  // 2セットにして無限ループ
  const items = [...FACILITIES, ...FACILITIES];

  return (
    <section
      ref={sectionRef}
      className="block md:hidden w-full pt-[120px] pb-[120px] bg-white overflow-hidden"
    >
      <div className="w-[90%] mx-auto">

        {/* Heading */}
        <div
          className={`
            transition-all duration-[900ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}
          `}
        >
          <p className="text-[12px] tracking-[0.22em] text-neutral-500 mb-4">
            FACILITIES
          </p>
          <h2 className="text-[24px] font-light text-neutral-900 leading-[1.45]">
            館内施設のご案内
          </h2>
        </div>

        {/* Auto Slide Row */}
        <div
          ref={trackRef}
          className={`
            mt-12 pb-4 flex gap-6 whitespace-nowrap
            ${visible ? "opacity-100" : "opacity-0"}
            transition-opacity duration-[900ms]
            sp-slider-track
          `}
        >
          {items.map((f, i) => (
         <div key={`${f.id}-${i}`} className="inline-block w-[90%] shrink-0">

              <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-neutral-200 relative">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[18px] font-light mt-3 text-neutral-900">
                {f.title}
              </h3>
         <p className="text-[14px] text-neutral-600 mt-1 leading-[1.6] line-clamp-2">
   {f.text}
</p>

            </div>
          ))}
        </div>
      </div>

      {/* --- 無限ループCSS --- */}
      <style>{`
        .sp-slider-track {
          animation: sp-slide-loop 40s linear infinite;
        }
        @keyframes sp-slide-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(var(--slide-width) * -1)); }
        }
      `}</style>
    </section>
  );
}
