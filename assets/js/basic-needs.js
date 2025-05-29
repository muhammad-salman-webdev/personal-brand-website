"use strict";

import "./components/plasma-button.js";

const swiper = new Swiper(".brands-worked-with-swiper", {
  slidesPerView: "auto",
  spaceBetween: 40,
  loop: true,
  speed: 3000, // Controls how fast it scrolls
  autoplay: {
    delay: 0, // No delay between transitions
    disableOnInteraction: false,
  },
  freeMode: true,
  freeModeMomentum: false, // Prevents momentum slowing
});

const video = document.getElementById("heroVideo");
// video.playbackRate = 0.4;
