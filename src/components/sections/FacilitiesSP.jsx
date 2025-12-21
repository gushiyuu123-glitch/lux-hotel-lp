// src/components/sections/FacilitiesSP.jsx
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

export default function FacilitiesSP() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
      className="
        block md:hidden
        w-full
        pt-[120px] pb-[120px]
        bg-white
      "
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

        {/* HORIZONTAL SCROLL */}
        <div
          className={`
            flex gap-6 overflow-x-auto no-scrollbar mt-12 pb-4
            scroll-smooth snap-x snap-mandatory
            transition-opacity duration-[900ms]
            ${visible ? "opacity-100" : "opacity-0"}
          `}
        >
          {FACILITIES.map((f, i) => (
            <div
              key={f.id}
              className="
                min-w-[78%] 
                snap-start 
                transition-all duration-[700ms]
                active:scale-[0.98]
              "
              style={{ transitionDelay: `${120 + i * 100}ms` }}
            >
              {/* Image */}
              <div
                className="
                  aspect-[4/3]
                  overflow-hidden rounded-[10px]
                  bg-neutral-200 relative
                "
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-[1000ms]
                    active:scale-[1.03]
                  "
                />
              </div>

              {/* Text */}
              <h3 className="text-[18px] font-light mt-3 text-neutral-900">
                {f.title}
              </h3>
              <p className="text-[14px] text-neutral-600 mt-1 leading-[1.7]">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
