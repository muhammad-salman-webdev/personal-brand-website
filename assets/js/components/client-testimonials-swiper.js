function renderClientTestimonialsSwiper() {
  // Initialize Swiper carousel for the "Brands Worked With" section

  const swiper = new Swiper(".client-testimonial-swiper", {
    slidesPerView: 1, // Show as many slides as fit automatically
    // spaceBetween: 30, // Space (in px) between each slide
    loop: true, // Enable infinite looping of slides
    speed: 750, // Scroll speed (in milliseconds) controlling the continuous scroll pace
    // effect: "fade",
    autoplay: {
      delay: 5000, // No delay between slide transitions for smooth continuous scroll
      // disableOnInteraction: false, // Keep autoplay running even after user interaction
    },
    navigation: {
      nextEl: ".client-testimonial-control-buttons button.next",
      prevEl: ".client-testimonial-control-buttons button.prev",
    },
    pagination: {
      el: ".client-testimonial-pagination",
      clickable: true,
    },
    // freeMode: true, // Enable free scrolling mode for momentum-based interaction
    // freeModeMomentum: false, // Disable momentum to maintain constant speed without slowing down
  });
}

// Select the swiper container element for brands logos
const ClientTestimonialsSwiper = document.querySelector(
  ".client-testimonial-swiper"
);

// Conditionally initialize the Swiper only if the container exists on the page
ClientTestimonialsSwiper ? renderClientTestimonialsSwiper() : "";
