import { gsap } from "gsap";

function initMenu() {

  const button = document.querySelector(
    "[data-menu-toggle]"
  );

  const panel = document.querySelector(
    "[data-menu-panel]"
  );

  if (!button || !panel) return;

  let abierto = false;

  const tl = gsap.timeline({
    paused: true
  });

  tl.to(panel, {
    y: 0,
    duration: 3,
    ease: "power2.out"
  });

  button.addEventListener("click", () => {

    abierto = !abierto;

    if (abierto)
      tl.play();
    else
      tl.reverse();

  });

}

document.addEventListener(
  "astro:page-load",
  initMenu
);