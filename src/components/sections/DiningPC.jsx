// src/components/sections/DiningPC.jsx
import { useEffect, useRef, useState } from "react";

const GALLERY = [
  {
    id: "dinner",
    label: "DINNER",
    title: "コースディナー",
    note: "メイン料理を中心に、海の幸と季節の野菜をバランスよく。",
    img: "/hotel/dining/dining-steak.png",
  },
  {
    id: "japanese",
    label: "JAPANESE",
    title: "和食・鮨",
    note: "職人が握る鮨と旬の一品。特別な夜にふさわしい一皿を。",
    img: "/hotel/dining/dining-sushi.png",
  },
  {
    id: "breakfast",
    label: "BREAKFAST",
    title: "モーニングブッフェ",
    note: "トロピカルフルーツと焼きたてのパンで、やさしい一日のはじまり。",
    img: "/hotel/dining/dining-breakfast.png",
  },
  {
    id: "dessert",
    label: "DESSERT",
    title: "アフターディナー",
    note: "光を纏ったデザートとコーヒーで、夜の余韻をゆっくりと。",
    img: "/hotel/dining/dining-dessert.png",
  },
];

// メインの1枚（夕暮れテラス）
const MAIN_IMAGE = "/hotel/dining/dining-main.png";

export default function DiningPC() {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // セクションが画面内に入ったら一度だけアニメーションを発火
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
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
        py-[200px]
        bg-gradient-to-b from-[rgba(168,216,234,0.06)] to-white
      "
    >
      <div className="w-[90%] max-w-[1400px] mx-auto">

        {/* =======================================================
            上段：メインカット ＋ テキスト
        ======================================================== */}
        <div
          className={`
            flex gap-16 items-center
            transition-all duration-[900ms] ease-[cubic-bezier(.23,1,.32,1)]
            ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[36px]"
            }
          `}
        >
          {/* 左：メイン画像 */}
          <div className="flex-1">
            <div className="aspect-[16/9] overflow-hidden rounded-[6px] shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
              <img
                src={MAIN_IMAGE}
                alt="海を望むテラスダイニング"
                className="
                  w-full h-full object-cover
                  scale-[1.03]
                  transition-transform duration-[1600ms]
                  will-change-transform
                  hover:scale-[1.06]
                "
              />
            </div>
          </div>

          {/* 右：テキストブロック */}
          <div className="w-[40%]">
            <p className="text-[11px] tracking-[0.28em] text-neutral-500 mb-6">
              DINING
            </p>

            <h2 className="text-[30px] leading-[1.8] font-light text-neutral-900 mb-6">
              海の光を味わう、<br />
              静かなレストラン。
            </h2>

            <p className="text-[15px] leading-[1.9] text-neutral-700 mb-10">
              地元の食材を使った料理を、柔らかな自然光の中でお楽しみいただけます。
              海に寄り添う空間で、特別なひとときを。
            </p>

            <div className="h-[1px] w-[220px] bg-[rgba(168,216,234,0.6)] mb-5" />

            <p className="text-[13px] tracking-[0.16em] text-neutral-500 uppercase">
              seaside course &amp; casual dining
            </p>
          </div>
        </div>

        {/* =======================================================
            下段：料理ギャラリー（4枚）
        ======================================================== */}
        <div className="mt-[120px] grid grid-cols-2 gap-10">
          {GALLERY.map((item, index) => {
            const delay = 200 + index * 110;
            return (
              <article
                key={item.id}
                className={`
                  group
                  flex flex-col gap-4
                  transition-all duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)]
                  ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[22px]"
                  }
                `}
                style={{ transitionDelay: `${delay}ms` }}
              >
       <div className="aspect-[4/3] overflow-hidden rounded-[6px] shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
  <img
    src={item.img}
    alt={item.title}
    className={`
      w-full h-full object-cover
      transition-transform duration-[1200ms]
      group-hover:scale-[1.06] group-hover:brightness-[1.06]

      /* ↓↓↓ ここで寄りすぎ補正 ↓↓↓ */
      ${index === 0 ? "object-[center_40%]" : ""}
      ${index === 1 ? "object-[center_55%]" : ""}
      ${index === 2 ? "object-[center_50%]" : ""}
      ${index === 3 ? "object-[center_45%]" : ""}
    `}
  />
</div>


                <div className="px-1">
                  <p className="text-[11px] tracking-[0.24em] text-neutral-500 mb-1">
                    {item.label}
                  </p>
                  <h3 className="text-[18px] font-light text-neutral-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-neutral-600">
                    {item.note}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
