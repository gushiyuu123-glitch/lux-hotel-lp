// src/components/sections/RoomsPC.jsx
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

export default function RoomsPC() {
  const [activeId, setActiveId] = useState(ROOMS[0].id);
  const refs = useRef({});

  // スクロールでアクティブ切替
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
    const el = refs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="hidden md:block w-full py-[200px] bg-[#f7fbff]">
      <div className="w-[90%] max-w-[1400px] mx-auto flex gap-20">

        {/* === Left Nav === */}
        <aside className="w-[160px] pt-4">
          <p className="text-[12px] tracking-[0.26em] text-neutral-500 mb-8">
            ROOMS
          </p>

          <div className="flex flex-col gap-6">
            {ROOMS.map((r) => {
              const active = activeId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => scrollToRoom(r.id)}
                  className="flex items-center gap-4 text-left group"
                >
                  <span
                    className={`
                      h-[1px] transition-all duration-[600ms]
                      ${active ? "w-[36px] bg-neutral-800" : "w-[18px] bg-neutral-400 group-hover:bg-neutral-500"}
                    `}
                  />
                  <span
                    className={`
                      text-[12px] tracking-[0.22em] uppercase transition-all duration-500
                      ${active ? "text-neutral-900" : "text-neutral-400"}
                    `}
                  >
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* === Main Rooms === */}
        <div className="flex-1 flex flex-col gap-[240px]">

          {ROOMS.map((r, i) => {
            const active = activeId === r.id;

            return (
              <section
                key={r.id}
                data-room-id={r.id}
                ref={(el) => (refs.current[r.id] = el)}
                className={`
                  transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)]
                  ${active ? "opacity-100 translate-y-0" : "opacity-60 translate-y-[20px]"}
                `}
              >
                <div className={`w-[78%] ${i % 2 === 0 ? "ml-0" : "ml-auto"}`}>
                  
                  {/* Image */}
                  <div
                    className={`
                      aspect-[16/10] overflow-hidden rounded-[6px]
                      transition-all duration-[900ms]
                      ${
                        active
                          ? "scale-[1.03] brightness-[1.06]"
                          : "scale-[0.97] brightness-[0.94]"
                      }
                    `}
                  >
                    <img
                      src={r.img}
                      alt={r.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className={`mt-6 ${i % 2 === 0 ? "" : "text-right"}`}>
                    <h3 className="text-[26px] font-light text-neutral-900">
                      {r.title}
                    </h3>
                    <p className="text-[15px] text-neutral-600 mt-1">{r.meta}</p>
                    <p className="text-[14px] text-neutral-500 mt-1">{r.cap}</p>
                  </div>

                  {/* === ボタンを “最後の部屋の直下” にのみ表示 === */}
                  {i === ROOMS.length - 1 && (
                    <div className="w-full flex justify-center mt-16">
                      <button
                        className="
                          px-8 py-3
                          text-[14px] tracking-[0.12em]
                          border border-neutral-300
                          text-neutral-600
                          rounded-20px
                          transition-all duration-300
                          hover:bg-neutral-100 hover:border-neutral-400 hover:text-neutral-700
                          shadow-sm hover:shadow-md
                        "
                      >
                        他の客室を見る →
                      </button>
                    </div>
                  )}

                </div>
              </section>
            );
          })}

        </div>
      </div>
    </section>
  );
}
