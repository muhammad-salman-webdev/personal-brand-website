function homeWelcomeAnimation() {
  // Home Page Welcome Animation Sequence using GSAP timeline

  const welcomeAnimationTL = gsap.timeline();

  // Cache DOM elements to animate
  const heroBgVideo = document.getElementById("heroVideo");
  const header = document.getElementById("headerMain");
  const heroTitle = document.getElementById("heroTitle");
  const heroTitleDesc = document.getElementById("heroTitleDesc");
  const heroCtaBtn = document.getElementById("heroCtaBtn");
  const heroBrandsLogoHeading = document.getElementById(
    "heroBrandsLogoHeading"
  );
  const heroBrandsLogoSwiper = document.getElementById("heroBrandsLogoSwiper");

  // Step 1: Animate hero title sliding up with fade-in and easing
  welcomeAnimationTL.from(heroTitle, {
    y: 75,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power1.out",
  });

  // Step 2: Split hero title text into words and characters for detailed animation
  const split = new SplitType(heroTitle, {
    types: ["words", "chars"],
  });

  // Step 3: Animate individual characters of the hero title with staggered entrance and back easing
  welcomeAnimationTL.fromTo(
    split.chars,
    {
      opacity: 0.3,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.99,
      scale: 1,
      stagger: 0.05,
      ease: "back.out(1.7)",
    },
    ">-0.5" // overlap start slightly before previous animation ends for smooth flow
  );

  // Step 4: Fade in the hero background video with easing
  welcomeAnimationTL.from(
    heroBgVideo,
    {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    },
    ">-0.75"
  );

  // Step 5: Fade in the main header for navigation or branding
  welcomeAnimationTL.from(header, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  });

  // Step 6: Fade in the hero title description to complement the main heading
  welcomeAnimationTL.from(heroTitleDesc, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  });

  // Step 7: Fade in the Call To Action button to encourage user interaction
  welcomeAnimationTL.from(heroCtaBtn, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  });

  // Step 8: Fade in the heading for the brand logos section to highlight partners or clients
  welcomeAnimationTL.from(heroBrandsLogoHeading, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  });

  // Step 9: Fade in the brand logos swiper/carousel for dynamic visual presentation
  welcomeAnimationTL.from(heroBrandsLogoSwiper, {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  });
}

// Conditionally run animation if the hero section exists on the page
document.getElementById("heroSection") ? homeWelcomeAnimation() : "";
