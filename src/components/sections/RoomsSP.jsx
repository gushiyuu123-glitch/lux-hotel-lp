// src/components/sections/RoomsSP.jsx
import { useEffect, useRef, useState } from "react";

const ROOMS = [
  {
    id: "standard",
    label: "Standard",
    title: "海側スタンダードルーム",
    meta: "24㎡ / バルコニー付き",
    cap: "2名まで宿泊可",
    img: "/hotel/rooms/room01111.png",
  },
  {
    id: "deluxe",
    label: "Deluxe",
    title: "デラックスオーシャンビュー",
    meta: "32㎡ / 海全面パノラマ",
    cap: "3名まで宿泊可",
    img: "/hotel/rooms/room0111.png",
  },
  {
    id: "suite",
    label: "Suite",
    title: "プレミアムスイート",
    meta: "52㎡ / リビング付き",
    cap: "4名まで宿泊可",
    img: "/hotel/rooms/room011.png",
  },
];

export default function RoomsSP() {
  const [activeId, setActiveId] = useState(ROOMS[0].id);
  const refs = useRef({});

  // スクロール連動アクティブ
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.dataset.roomId);
          }
        });
      },
      { threshold: 0.55 }
    );

    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToRoom = (id) => {
    refs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="md:hidden w-full py-[100px] bg-[#f9fcff]">

      {/* ＝＝＝ 上部ナビ（水平スクロール） ＝＝＝ */}
      <div className="px-6 mb-12">
        <p className="text-[11px] tracking-[0.3em] text-neutral-500 mb-4">
          ROOMS
        </p>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {ROOMS.map((r) => {
            const active = activeId === r.id;
            return (
              <button
                key={r.id}
                onClick={() => scrollToRoom(r.id)}
                className="flex flex-col items-center"
              >
                {/* アンダーライン */}
                <span
                  className={`
                    h-[2px] mb-1 transition-all duration-500
                    ${active ? "w-8 bg-neutral-900" : "w-4 bg-neutral-400"}
                  `}
                />
                <span
                  className={`
                    text-[11px] tracking-[0.22em] uppercase transition-all duration-500
                    ${active ? "text-neutral-900" : "text-neutral-400"}
                  `}
                >
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ＝＝＝ メインルーム群 ＝＝＝ */}
      <div className="flex flex-col gap-[160px]">
        {ROOMS.map((r, i) => {
          const active = activeId === r.id;

          return (
            <div
              key={r.id}
              data-room-id={r.id}
              ref={(el) => (refs.current[r.id] = el)}
              className={`
                transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]
                ${active ? "opacity-100 translate-y-0" : "opacity-70 translate-y-[16px]"}
              `}
            >
              {/* Image */}
              <div
                className={`
                  mx-auto w-[88%] aspect-[5/4] overflow-hidden rounded-[6px]
                  transition-all duration-[1000ms]
                  ${active ? "scale-[1.03] brightness-[1.06]" : "scale-[0.96] brightness-[0.92]"}
                `}
              >
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="px-7 mt-6">
                <h3 className="text-[22px] font-light text-neutral-900">
                  {r.title}
                </h3>
                <p className="text-[14px] text-neutral-600 mt-1">{r.meta}</p>
                <p className="text-[13px] text-neutral-500 mt-1">{r.cap}</p>
              </div>

              {/* CTA：最後だけ */}
              {i === ROOMS.length - 1 && (
                <div className="w-full flex justify-center mt-14">
                  <button
                    className="
                      px-8 py-3
                      text-[13px] tracking-[0.12em]
                      border border-neutral-300
                      text-neutral-600
                      rounded-[22px]
                      transition-all duration-300
                      hover:bg-neutral-100 hover:border-neutral-400 hover:text-neutral-700
                    "
                  >
                    他の客室を見る →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
