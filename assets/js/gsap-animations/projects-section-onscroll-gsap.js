const projectsHeading = document.getElementById("projectsHeading");
const projectsTitleDesc = document.getElementById("projectsTitleDesc");
const projectCards = document.querySelectorAll(
  "#projectsContainer > a.project-box-container"
);

gsap.from(projectsHeading, {
  scrollTrigger: {
    trigger: projectsHeading,
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
});

gsap.from(projectsTitleDesc, {
  scrollTrigger: {
    trigger: projectsTitleDesc,
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
});

// Select all project cards

gsap.from(projectCards, {
  scrollTrigger: {
    trigger: projectCards,
    start: "top 80%",
  },
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.5,
});

projectCards.forEach((card) => {
  const tags = card.querySelectorAll(".project-tags > .project-tag");
  // Animate each child when its parent card enters view
  gsap.from(tags, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.25,
    ease: "power2.out",
  });
});
