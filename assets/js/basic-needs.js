"use strict";

// Hide the preloader element once the entire page has fully loaded
window.onload = () => {
  document.getElementById("preloader").style.display = "none";
};

// Import custom web components and modules for enhanced UI and animations

// Header Interative Animations
import "./components/header-menu.js";

// Custom button component with plasma effect
import "./components/plasma-button.js";

// Swiper carousel for displaying brands logos worked with
import "./components/worked-brands-logo-swiper.js";

// // GSAP animation module for the home page welcome section
// import "./gsap-animations/home-welcome-gsap.js";

// // GSAP scroll-triggered animations for the projects section
// import "./gsap-animations/projects-section-onscroll-gsap.js";
