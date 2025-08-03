// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("DOMContentLoaded", () => {
//   const servicesSection = document.getElementById("servicesSection");

//   if (
//     servicesSection &&
//     servicesSection.getAttribute("data-is-home-page") === "true"
//   ) {
//     const body = document.body;
//     const rootElement = document.documentElement;
//     const servicesTitle = servicesSection.querySelector("h2");
//     const servicesTitleSpan = servicesSection.querySelector("h2 span");
//     const servicesParagraph = servicesSection.querySelector("p");

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: servicesSection,
//         start: "top 100%",
//         end: "top 75%",
//         scrub: true,
//       },
//     });

//     tl.to(
//       body,
//       {
//         // backgroundColor: "#f2f3f5",
//         backgroundColor: "#fff",
//         ease: "none",
//       },
//       0
//     );

//     tl.to(
//       [servicesTitle, servicesParagraph, servicesTitleSpan],
//       {
//         color: "#000000",
//         ease: "none",
//       },
//       0
//     );

//     tl.to(
//       rootElement,
//       {
//         "--scrollbar-thumb-color": "black",
//         ease: "none",
//       },
//       0
//     );
//   }
// });

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const servicesSection = document.getElementById("servicesSection");

  if (
    servicesSection &&
    servicesSection.getAttribute("data-is-home-page") === "true"
  ) {
    const body = document.body;
    const rootElement = document.documentElement;
    const servicesTitle = servicesSection.querySelector("h2");
    const servicesTitleSpan = servicesSection.querySelector("h2 span");
    const servicesParagraph = servicesSection.querySelector("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesSection,
        start: "top 100%",
        end: "top 75%",
        scrub: true,
      },
    });

    tl.to(
      body,
      {
        backgroundColor: "#fff",
        ease: "none",
      },
      0
    );

    // New animation to change the background of servicesSection
    tl.to(
      servicesSection,
      {
        backgroundColor: "#f2f3f5",
        ease: "none",
      },
      0
    );

    tl.to(
      [servicesTitle, servicesParagraph, servicesTitleSpan],
      {
        color: "#000000",
        ease: "none",
      },
      0
    );

    tl.to(
      rootElement,
      {
        "--scrollbar-thumb-color": "black",
        ease: "none",
      },
      0
    );
  }
});
