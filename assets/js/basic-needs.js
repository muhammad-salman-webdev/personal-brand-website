"use strict";

// Hide the preloader element once the entire page has fully loaded
window.onload = () => {
  document.getElementById("preloader").style.display = "none";
};

// Import custom web components and modules for enhanced UI and animations

// GSAP animation module for the home page welcome section
// import "./gsap-animations/home-welcome-gsap.js";

// Header Interative Animations
import "./components/header-menu.js";

// Custom button component with plasma effect
import "./components/plasma-button.js";

// Swiper carousel for displaying brands logos worked with
import "./components/worked-brands-logo-swiper.js";

// Swiper for client Testimonials
import "./components/client-testimonials-swiper.js";

// GSAP scroll-triggered animations for the projects section
import "./gsap-animations/projects-section-onscroll-gsap.js";

// GSAP Changing dark to light theme by scrolling through Home Page Services Section
import "./gsap-animations/home-services-scrolling-dark-to-light-theme.js";

// ---------------
// ---------------
// ---------------
// ---------------
import "./components/cta-anim-section.js";
