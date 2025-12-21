import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const smoothScrollTo = (selector) => {
  const target = document.querySelector(selector);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - 80; 
  // ↑ Headerの高さぶんズラす（PC/SPどっちでも安定）

  gsap.to(window, {
    scrollTo: top,
    duration: 1.2,
    ease: "power3.out",
    onComplete: () => {
      ScrollTrigger.refresh(); // ← これが超重要！！
    },
  });
};
