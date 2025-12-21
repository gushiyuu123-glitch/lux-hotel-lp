// src/App.jsx

import HeroPC from "./components/sections/HeroPC";
import HeroSP from "./components/sections/HeroSP";

import ConceptPC from "./components/sections/ConceptPC";
import ConceptSP from "./components/sections/ConceptSP";

import RoomsPC from "./components/sections/RoomsPC";
import RoomsSP from "./components/sections/RoomsSP";

import FacilitiesPC from "./components/sections/FacilitiesPC";
import FacilitiesSP from "./components/sections/FacilitiesSP";

import DiningPC from "./components/sections/DiningPC";
import DiningSP from "./components/sections/DiningSP";

import SpaPC from "./components/sections/SpaPC";
import SpaSP from "./components/sections/SpaSP";

import PoolPC from "./components/sections/PoolPC";
import PoolSP from "./components/sections/PoolSP";

import NightBarPC from "./components/sections/NightBarPC";
import NightBarSP from "./components/sections/NightBarSP";

import LobbyPC from "./components/sections/LobbyPC";
import LobbySP from "./components/sections/LobbySP";

import CtaMinimalPC from "./components/sections/CtaMinimalPC";
import CtaMinimalSP from "./components/sections/CtaMinimalSP";

import Footer from "./components/layout/Footer";
import FooterSP from "./components/layout/FooterSP";

import HeaderNavPC from "./components/layout/HeaderNavPC";
import HeaderSP from "./components/layout/HeaderSP";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white text-neutral-900">

      {/* ======================= HEADER ======================= */}
      <div className="hidden md:block">
        <HeaderNavPC />
      </div>
      <div className="block md:hidden">
        <HeaderSP />
      </div>

      {/* ======================= HERO ======================= */}
      <div className="hidden md:block">
        <HeroPC />
      </div>
      <div className="block md:hidden">
        <HeroSP />
      </div>

      {/* ======================= CONCEPT ======================= */}
      <section id="concept">
        <div className="hidden md:block">
          <ConceptPC />
        </div>
        <div className="block md:hidden">
          <ConceptSP />
        </div>
      </section>

      {/* ======================= ROOMS ======================= */}
      <section id="rooms">
        <div className="hidden md:block">
          <RoomsPC />
        </div>
        <div className="block md:hidden">
          <RoomsSP />
        </div>
      </section>

      {/* ======================= FACILITIES ======================= */}
      <section id="facilities">
        <div className="hidden md:block">
          <FacilitiesPC />
        </div>
        <div className="block md:hidden">
          <FacilitiesSP />
        </div>
      </section>

      {/* ======================= DINING ======================= */}
      <section id="dining">
        <div className="hidden md:block">
          <DiningPC />
        </div>
        <div className="block md:hidden">
          <DiningSP />
        </div>
      </section>

      {/* ======================= SPA ======================= */}
      <section id="spa">
        <div className="hidden md:block">
          <SpaPC />
        </div>
        <div className="block md:hidden">
          <SpaSP />
        </div>
      </section>

      {/* ======================= POOL ======================= */}
      <section id="pool">
        <div className="hidden md:block">
          <PoolPC />
        </div>
        <div className="block md:hidden">
          <PoolSP />
        </div>
      </section>

      {/* ======================= BAR ======================= */}
      <section id="bar">
        <div className="hidden md:block">
          <NightBarPC />
        </div>
        <div className="block md:hidden">
          <NightBarSP />
        </div>
      </section>

      {/* ======================= LOBBY ======================= */}
      <section id="lobby">
        <div className="hidden md:block">
          <LobbyPC />
        </div>
        <div className="block md:hidden">
          <LobbySP />
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section id="reserve">
        <div className="hidden md:block">
          <CtaMinimalPC />
        </div>
        <div className="block md:hidden">
          <CtaMinimalSP />
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}
      <Footer />
      <div className="block md:hidden">
        <FooterSP />
      </div>

    </div>
  );
}
