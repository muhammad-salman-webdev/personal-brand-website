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
