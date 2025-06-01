/**
 * Initializes scroll-triggered and hover animations for the Projects section.
 * Uses GSAP with ScrollTrigger plugin for smooth entrance animations
 * and interactive hover effects on individual project cards.
 */
function animateProjectsSection() {
  // Select main heading and description elements in the projects section
  const projectsHeading = document.getElementById("projectsHeading");
  const projectsTitleDesc = document.getElementById("projectsTitleDesc");

  // Select all project cards inside the container
  const projectCards = document.querySelectorAll(
    "#projectsContainer > a.project-box-container"
  );

  // Animate the projects section heading on scroll into view
  gsap.from(projectsHeading, {
    scrollTrigger: {
      trigger: projectsHeading,
      start: "top 80%", // animation starts when heading reaches 80% from top of viewport
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  // Animate the projects section description on scroll into view
  gsap.from(projectsTitleDesc, {
    scrollTrigger: {
      trigger: projectsTitleDesc,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  // Iterate over each project card to set up animations
  projectCards.forEach((card, index) => {
    // Cache commonly animated child elements inside the card
    const image = card.querySelector(".project-img img");
    const tags = card.querySelectorAll(".project-tags > .project-tag");
    const name = card.querySelector(".project-name h3");
    const techs = card.querySelector(".project-name .projects-techs");
    const arrow1 = card.querySelector(".project-details .arrow-icon i.arrow-1");
    const arrow2 = card.querySelector(".project-details .arrow-icon i.arrow-2");
    const lightEffect = card.querySelector(".light-effect");
    const label = card.querySelector(".floating-label");

    // Create a GSAP timeline for scroll-triggered entrance animation on this card
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
    });

    // Define sequential animation steps for the card's entrance
    tl.from(card, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        image,
        {
          scale: 2,
          duration: 1,
          ease: "power2.out",
        },
        ">-1" // overlap with previous animation by 1 second
      )
      .from(
        tags,
        {
          opacity: 0,
          y: 20,
          duration: 0.75,
          stagger: 0.15, // stagger tag animations for nice cascading effect
          ease: "power2.out",
        },
        ">-0.3"
      )
      .from(
        name,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        ">-0.5"
      )
      .from(
        techs,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        ">-0.3"
      )
      .from(
        arrow1,
        {
          x: -40,
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        ">-0.3"
      );

    // Create a paused timeline for hover animations on this card
    const hoverTL = gsap.timeline({
      paused: true,
      defaults: { ease: "none", duration: 0.3 },
    });

    // Define hover animations: scale image, move light effect and arrows
    hoverTL.to(image, { scale: 1.2 }, 0);
    hoverTL.to(
      lightEffect,
      {
        x: "100%",
        y: "100%",
      },
      0.1
    );
    hoverTL.to(
      arrow1,
      {
        x: 40,
        y: -40,
      },
      0.2
    );
    hoverTL.fromTo(arrow2, { x: -40, y: 40 }, { x: 0, y: 0 }, 0.2);

    // Variables to control hover event activation and floating label animation
    let hoverEventsEnabled = false;
    let shouldAnimateFloatingLabel = true;

    // Enable hover animations only after scroll animation completes
    tl.eventCallback("onComplete", () => {
      hoverEventsEnabled = true;
    });

    // Mouse enter triggers hover animation and floating label show
    card.addEventListener("mouseenter", () => {
      if (!hoverEventsEnabled) return;

      hoverTL.timeScale(1);
      hoverTL.play();

      gsap.fromTo(
        label,
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        }
      );
    });

    // Mouse move updates floating label position relative to cursor within the card
    card.addEventListener("mousemove", (e) => {
      if (!hoverEventsEnabled) return;

      // Animate floating label once on first move after entering hover state
      if (shouldAnimateFloatingLabel) {
        gsap.fromTo(
          label,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
          }
        );

        shouldAnimateFloatingLabel = false;
      }

      // Calculate cursor position inside card's padded content area
      const cardRect = card.getBoundingClientRect();
      const labelWidth = label.offsetWidth;
      const labelHeight = label.offsetHeight;

      const style = window.getComputedStyle(card);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);
      const paddingTop = parseFloat(style.paddingTop);
      const paddingBottom = parseFloat(style.paddingBottom);

      let x = e.clientX - cardRect.left - paddingLeft;
      let y = e.clientY - cardRect.top - paddingTop;

      // Center label on cursor and clamp to stay inside padded bounds
      let labelX = x - labelWidth / 2;
      let labelY = y - labelHeight / 2;

      const maxX = cardRect.width - paddingLeft - paddingRight - labelWidth;
      const maxY = cardRect.height - paddingTop - paddingBottom - labelHeight;

      labelX = Math.max(0, Math.min(labelX, maxX));
      labelY = Math.max(0, Math.min(labelY, maxY));

      // Animate label movement smoothly to new position
      gsap.to(label, {
        x: labelX,
        y: labelY,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Mouse leave reverses hover animation and hides floating label
    card.addEventListener("mouseleave", () => {
      if (!hoverEventsEnabled) return;

      hoverTL.reverse();

      gsap.to(label, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      });
    });
  });
}

// Run animation initialization only if projects section exists on page
document.getElementById("projectsSection") ? animateProjectsSection() : "";
