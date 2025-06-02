function renderBrandsWorkWithSwiper() {
  // Initialize Swiper carousel for the "Brands Worked With" section

  const swiper = new Swiper(".brands-worked-with-swiper", {
    slidesPerView: "auto", // Show as many slides as fit automatically
    spaceBetween: 40, // Space (in px) between each slide
    loop: true, // Enable infinite looping of slides
    speed: 3000, // Scroll speed (in milliseconds) controlling the continuous scroll pace
    autoplay: {
      delay: 0, // No delay between slide transitions for smooth continuous scroll
      disableOnInteraction: false, // Keep autoplay running even after user interaction
    },
    freeMode: true, // Enable free scrolling mode for momentum-based interaction
    freeModeMomentum: false, // Disable momentum to maintain constant speed without slowing down
  });
}

// Select the swiper container element for brands logos
const brandsLogoSwiper = document.querySelector(".brands-worked-with-swiper");

// Conditionally initialize the Swiper only if the container exists on the page
brandsLogoSwiper ? renderBrandsWorkWithSwiper() : "";
