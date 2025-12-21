// src/components/sections/DiningSP.jsx
import { useEffect, useRef, useState } from "react";

const GALLERY = [
  {
    id: "dinner",
    label: "DINNER",
    title: "コースディナー",
    note: "海の幸と季節の野菜を贅沢に味わう特別なディナー。",
    img: "/hotel/dining/dining-steak.png",
    pos: "object-[center_40%]",
  },
  {
    id: "japanese",
    label: "JAPANESE",
    title: "和食・鮨",
    note: "旬を味わう一貫と季節の一皿を、静かな空間で。",
    img: "/hotel/dining/dining-sushi.png",
    pos: "object-[center_55%]",
  },
  {
    id: "breakfast",
    label: "BREAKFAST",
    title: "モーニングブッフェ",
    note: "焼きたてのパンとフルーツで、爽やかな朝を。",
    img: "/hotel/dining/dining-breakfast.png",
    pos: "object-[center_50%]",
  },
  {
    id: "dessert",
    label: "DESSERT",
    title: "アフターディナー",
    note: "優しい甘さで夜の余韻をゆっくりと。",
    img: "/hotel/dining/dining-dessert.png",
    pos: "object-[center_45%]",
  },
];

const MAIN_IMAGE = "/hotel/dining/dining-main.png";

export default function DiningSP() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.3 }
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
        bg-gradient-to-b from-[rgba(168,216,234,0.06)] to-white
      "
    >
      <div className="w-[90%] mx-auto">

        {/* ---------------------------------------------
            上段：メイン画像
        ---------------------------------------------- */}
        <div
          className={`
            transition-all duration-[900ms]
            ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[28px]"}
          `}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-[10px] shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
            <img
              src={MAIN_IMAGE}
              alt="夕暮れレストラン"
              className="
                w-full h-full object-cover
                scale-[1.03] transition-transform duration-[1600ms]
                active:scale-[1.06]
              "
            />
          </div>

          {/* Text Block */}
          <div className="mt-8 px-1">
            <p className="text-[11px] tracking-[0.28em] text-neutral-500 mb-4">
              DINING
            </p>

            <h2 className="text-[24px] leading-[1.7] font-light text-neutral-900 mb-5">
              海の光を味わう、<br />
              静かなレストラン。
            </h2>

            <p className="text-[14px] leading-[1.85] text-neutral-700 mb-10">
              地元の食材を使った料理を、柔らかな自然光の中でお楽しみいただけます。
              海に寄り添う空間で、特別なひとときを。
            </p>

            <div className="h-[1px] w-[160px] bg-[rgba(168,216,234,0.55)] mb-4" />
            <p className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
              seaside course & casual dining
            </p>
          </div>
        </div>

        {/* ---------------------------------------------
            下段：ギャラリー（横スクロール）
        ---------------------------------------------- */}
        <div
          className={`
            mt-16
    flex gap-8 
    overflow-x-auto no-scrollbar
    scroll-smooth snap-x snap-mandatory
    w-[100vw] 
    -ml-[5vw] 
    pr-[5vw]
    transition-opacity duration-[900ms]
            ${active ? "opacity-100" : "opacity-0"}
          `}
        >
          {GALLERY.map((item, i) => (
            <div
              key={item.id}
              className="
                min-w-[80%] snap-start
                transition-transform duration-[700ms]
                active:scale-[0.98]
              "
              style={{ transitionDelay: `${180 + i * 120}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden rounded-[10px] shadow-[0_14px_50px_rgba(0,0,0,0.22)]">
                <img
                  src={item.img}
                  alt={item.title}
                  className={`
                    w-full h-full object-cover
                    transition-transform duration-[1200ms]
                    active:scale-[1.05]
                    ${item.pos}
                  `}
                />
              </div>

              {/* Text */}
              <div className="mt-4 px-1">
                <p className="text-[11px] tracking-[0.22em] text-neutral-500 mb-1">
                  {item.label}
                </p>
                <h3 className="text-[18px] font-light text-neutral-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
