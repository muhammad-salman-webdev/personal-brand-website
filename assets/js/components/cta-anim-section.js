// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("DOMContentLoaded", () => {
//   // Select the section by its ID
//   const ctaAnimSection = document.getElementById("ctaAnimSection");

//   // Check if the section exists before running the animation code
//   if (ctaAnimSection) {
//     // Select the necessary child elements
//     const bg = ctaAnimSection.querySelector(".cta-anim-bg");
//     const title = ctaAnimSection.querySelector(".cta-anim-title");
//     const desc = ctaAnimSection.querySelector(".cta-anim-desc p");

//     // Create the timeline for the animation
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ctaAnimSection, // Use the section ID as the trigger
//         pin: true,
//         scrub: true,
//         start: "top top",
//         end: "+=1500", // Increased scroll distance to make the animation slower
//       },
//     });

//     // --- Animation 1: Scaling and Border-Radius ---
//     tl.to(bg, {
//       scale: 1,
//       borderRadius: 0,
//       ease: "power2.inOut",
//     });

//     // --- Animation 2: Color Transition ---
//     tl.to(
//       bg,
//       {
//         background: "transparent",
//       },
//       ">"
//     );

//     tl.to(
//       [title, desc],
//       {
//         color: "black",
//       },
//       "<"
//     );
//   }
// });

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("DOMContentLoaded", () => {
//   // Select the section by its ID
//   const ctaAnimSection = document.getElementById("ctaAnimSection");

//   // Check if the section exists before running the animation code
//   if (ctaAnimSection) {
//     // Select the necessary child elements
//     const bg = ctaAnimSection.querySelector(".cta-anim-bg");
//     const title = ctaAnimSection.querySelector(".cta-anim-title");
//     const desc = ctaAnimSection.querySelector(".cta-anim-desc p");

//     // --- Animation 1: Scaling and Border-Radius (happens while scrolling from 30% to 0%) ---
//     gsap.to(bg, {
//       scale: 1,
//       borderRadius: 0,
//       ease: "power2.inOut",
//       scrollTrigger: {
//         trigger: ctaAnimSection,
//         scrub: true,
//         // Start the scaling when the top of the section is 30% from the top of the viewport
//         start: "top 30%",
//         // End the scaling when the top of the section is at the top of the viewport
//         end: "bottom 80%",
//       },
//     });

//     // --- Animation 2: Pinning and Color Transition (happens after the section is pinned) ---
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ctaAnimSection,
//         pin: true,
//         scrub: true,
//         // Start pinning when the top of the section is at the top of the viewport
//         start: "top top",
//         end: "+=700", // The pin lasts for this scroll distance
//       },
//     });

//     tl.to(
//       bg,
//       {
//         background: "transparent",
//       },
//       ">"
//     );

//     tl.to(
//       [title, desc],
//       {
//         color: "black",
//       },
//       "<"
//     );
//   }
// });

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Select the section by its ID
  const ctaAnimSection = document.getElementById("ctaAnimSection");

  // Check if the section exists before running the animation code
  if (ctaAnimSection) {
    // Select the necessary child elements
    const bg = ctaAnimSection.querySelector(".cta-anim-bg");
    const title = ctaAnimSection.querySelector(".cta-anim-title");
    const desc = ctaAnimSection.querySelector(".cta-anim-desc p");

    // --- Animation 1: Scaling and Border-Radius ---
    // This animation runs as the element scrolls from 30% from the top to the top of the viewport.
    gsap.to(bg, {
      scale: 1,
      borderRadius: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ctaAnimSection,
        scrub: true,
        // The scaling begins when the top of the section is 30% from the top of the viewport.
        start: "top 40%",
        // The scaling ends right as the top of the section hits the top of the viewport.
        end: "top top",
      },
    });

    // --- Animation 2: Pinning and Color Transition ---
    // This timeline starts exactly where the previous animation ends.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaAnimSection,
        pin: true,
        scrub: true,
        // The pinning and this timeline begin when the top of the section reaches the top of the viewport.
        start: "top top",
        end: "+=650", // The pin lasts for this scroll distance.
      },
    });

    // We can add the background color transition to the timeline.
    // The previous animation (scaling) already finished by this point.
    tl.to(
      bg,
      {
        background: "transparent",
      },
      "<" // Start this animation immediately when the timeline begins
    );

    // This makes sure the color of the text changes in perfect sync with the background change.
    tl.to(
      [title, desc],
      {
        color: "black",
      },
      "<"
    );
  }
});
