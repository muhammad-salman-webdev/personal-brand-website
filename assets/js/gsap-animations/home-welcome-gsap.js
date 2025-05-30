// Home Page Welcome Animation

const welcomeAnimationTL = gsap.timeline();

const heroBgVideo = document.getElementById("heroVideo");
const header = document.getElementById("headerMain");
const heroTitle = document.getElementById("heroTitle");
const heroTitleDesc = document.getElementById("heroTitleDesc");
const heroCtaBtn = document.getElementById("heroCtaBtn");
const heroBrandsLogoHeading = document.getElementById("heroBrandsLogoHeading");
const heroBrandsLogoSwiper = document.getElementById("heroBrandsLogoSwiper");

// Step 1:
welcomeAnimationTL.from(heroTitle, {
  y: 75,
  opacity: 0,
  duration: 1.25,
  delay: 0.5,
  ease: "power1.out",
});

// Step 2:
const split = new SplitType(heroTitle, {
  types: ["words", "chars"],
});

// Step 3:
welcomeAnimationTL.fromTo(
  split.chars,
  {
    opacity: 0.5,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.99,
    scale: 1,
    stagger: 0.05,
    ease: "power1.out",
    ease: "back.out(1.7)",
  },
  ">-0.5" // starts this animation a bit before the previous ends
);

// Step 4:
welcomeAnimationTL.from(
  heroBgVideo,
  {
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
  },
  ">-0.75"
);

// Step 5:
welcomeAnimationTL.from(header, {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
});

// Step 6:
welcomeAnimationTL.from(heroTitleDesc, {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
});

// Step 7:
welcomeAnimationTL.from(heroCtaBtn, {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
});

// Step 8:
welcomeAnimationTL.from(heroBrandsLogoHeading, {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
});

// Step 9:
welcomeAnimationTL.from(heroBrandsLogoSwiper, {
  opacity: 0,
  duration: 0.5,
  ease: "power1.out",
});
