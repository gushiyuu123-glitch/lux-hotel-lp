// src/components/sections/FacilitiesPC.jsx
import { useEffect, useRef, useState } from "react";

const FACILITIES = [
  {
    id: "pool",
    title: "Infinity Pool",
    text: "海とつながるような開放的なプールで、ゆったりとした時間を。",
    img: "/hotel/facilities/pool.png",
  },
  {
    id: "lounge",
    title: "Ocean Lounge",
    text: "波の音を聞きながらくつろげる静かなラウンジ。",
    img: "/hotel/facilities/lounge.png",
  },
  {
    id: "restaurant",
    title: "Seaside Restaurant",
    text: "地元食材を使った料理を、海を眺めながら楽しめます。",
    img: "/hotel/facilities/restaurant.png",
  },
  {
    id: "spa",
    title: "Relaxation Spa",
    text: "旅の疲れを癒すスパトリートメントをご用意。",
    img: "/hotel/facilities/spa.png",
  },
  {
    id: "terrace",
    title: "Sunset Terrace",
    text: "夕日を眺めながら過ごす特別なひととき。",
    img: "/hotel/facilities/terrace.png",
  },
];

export default function FacilitiesPC() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hidden md:block w-full py-[200px] bg-white"
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">
        {/* Heading */}
        <div
          className={`
            transition-all duration-[900ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}
          `}
        >
          <p className="text-[14px] tracking-[0.22em] text-neutral-500 mb-6">
            FACILITIES
          </p>
          <h2 className="text-[30px] font-light text-neutral-900">
            館内施設のご案内
          </h2>
        </div>

        {/* Horizontal Scroll */}
        <div
          className={`
            flex gap-14 overflow-x-auto no-scrollbar mt-20 pb-6
            scroll-smooth
            transition-opacity duration-[900ms]
            ${visible ? "opacity-100" : "opacity-0"}
          `}
        >
          {FACILITIES.map((f, i) => (
            <div
              key={f.id}
              className="
                min-w-[520px]
                transition-all duration-[700ms]
                hover:scale-[1.02]
              "
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              {/* Image */}
              <div
                className="
                  aspect-[4/3]
                  overflow-hidden rounded-[6px]
                  bg-neutral-200
                  relative group
                "
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-[900ms]
                    group-hover:scale-[1.04]
                  "
                />
              </div>

              {/* Text */}
              <h3 className="text-[22px] font-light mt-5 text-neutral-900">
                {f.title}
              </h3>
              <p className="text-[15px] text-neutral-600 mt-2 leading-[1.8]">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
