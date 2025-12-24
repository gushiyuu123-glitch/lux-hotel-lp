// src/components/layout/Footer.jsx

export default function Footer() {
  return (
    <footer
      className="
        hidden md:block
        w-full
        bg-[#f8f8f8]
        border-t border-[#d2d2d2]/60
        pt-[110px] pb-[120px]
        relative
      "
    >
      {/* ▼ Dior 黄金の縦光 */}
      <div
        className="
          absolute inset-y-0 left-[50%]
          w-[1px]
          bg-gradient-to-b
          from-[rgba(255,214,150,0.22)]
          via-[rgba(255,214,150,0.09)]
          to-transparent
          pointer-events-none
        "
      />

      <div className="w-[90%] max-w-[1400px] mx-auto relative">

        {/* Hotel Name */}
        <p
          className="
            text-[22px]
            tracking-[0.32em]
            text-[#0a0a0a]/90
            font-light
            mb-14
            select-none
          "
        >
          BLUE SHORE HOTEL
        </p>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-16 mb-24">

          {/* Address */}
          <div>
            <p className="text-[12px] tracking-[0.25em] text-[#666] mb-4 select-none">
              ADDRESS
            </p>
            <p className="text-[15px] text-[#222] leading-relaxed">
              1-9-12 Seaside Avenue<br />
              Okinawa, Japan
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[12px] tracking-[0.25em] text-[#666] mb-4 select-none">
              CONTACT
            </p>
            <p className="text-[15px] text-[#222] leading-relaxed">
              +81 98-123-4567<br />
              info@blueshorehotel.com
            </p>
          </div>

          {/* Hours */}
          <div>
            <p className="text-[12px] tracking-[0.25em] text-[#666] mb-4 select-none">
              OPEN HOURS
            </p>
            <p className="text-[15px] text-[#222] leading-relaxed">
              Check-in 15:00 — Check-out 11:00
            </p>
          </div>
        </div>

        {/* Bottom line */}
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
        <div className="flex justify-between items-center">
          <p className="text-[12px] text-neutral-500 tracking-[0.25em] select-none">
            © 2025 BLUE SHORE HOTEL
          </p>

          {/* ▼ GUSHIKEN DESIGN — リンク版 */}
          <a
            href="https://gushikendesign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-[12px]
              tracking-[0.22em]
              text-neutral-600
              hover:text-neutral-900
              transition-all
              select-none
            "
          >
            Designed by GUSHIKEN DESIGN
          </a>
        </div>
      </div>

      {/* ▼ Dior系 黒反射光 */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-[50px]
          bg-gradient-to-t
          from-[rgba(0,0,0,0.12)]
          to-transparent
          pointer-events-none
        "
      />
    </footer>
  );
}
