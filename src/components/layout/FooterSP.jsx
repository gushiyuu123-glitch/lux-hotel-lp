// src/components/layout/FooterSP.jsx

export default function FooterSP() {
  return (
    <footer
      className="
        block md:hidden
        w-full
        bg-[#f8f8f8]           /* 柔白：ホテルロビーの白壁 */
        border-t border-[#d2d2d2]/60
        pt-[80px] pb-[90px]
        relative
      "
    >
      {/* ▼ ゴールド縦光（SP用に薄く） */}
      <div
        className="
          absolute inset-y-0 left-[50%]
          w-[1px]
          bg-gradient-to-b
          from-[rgba(255,214,150,0.18)]
          via-[rgba(255,214,150,0.07)]
          to-transparent
          pointer-events-none
        "
      />

      <div className="w-[90%] mx-auto relative">

        {/* Hotel Name */}
        <p
          className="
            text-[20px]
            tracking-[0.30em]
            text-[#0a0a0a]/90
            font-light
            mb-12
            text-center
            select-none
          "
        >
          BLUE SHORE HOTEL
        </p>

        {/* ADDRESS */}
        <div className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.25em] text-[#666] mb-3">
            ADDRESS
          </p>
          <p className="text-[14px] text-[#222] leading-relaxed">
            1-9-12 Seaside Avenue<br />
            Okinawa, Japan
          </p>
        </div>

        {/* CONTACT */}
        <div className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.25em] text-[#666] mb-3">
            CONTACT
          </p>
          <p className="text-[14px] text-[#222] leading-relaxed">
            +81 98-123-4567<br />
            info@blueshorehotel.com
          </p>
        </div>

        {/* HOURS */}
        <div className="mb-14 text-center">
          <p className="text-[11px] tracking-[0.25em] text-[#666] mb-3">
            OPEN HOURS
          </p>
          <p className="text-[14px] text-[#222] leading-relaxed">
            Check-in 15:00 — Check-out 11:00
          </p>
        </div>

        {/* Line */}
        <div
          className="
            h-[1px]
            w-full
            bg-gradient-to-r
            from-transparent
            via-[#bfbfbf]
            to-transparent
            mb-6
          "
        />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[11px] text-neutral-500 tracking-[0.25em]">
            © 2025 BLUE SHORE HOTEL
          </p>

          <p className="text-[11px] text-neutral-600 tracking-[0.22em]">
            Designed by GUSHIKEN DESIGN
          </p>
        </div>
      </div>

      {/* ▼ 下部の黒反射光（上品さだけ残す） */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-[42px]
          bg-gradient-to-t
          from-[rgba(0,0,0,0.10)]
          to-transparent
          pointer-events-none
        "
      />
    </footer>
  );
}
