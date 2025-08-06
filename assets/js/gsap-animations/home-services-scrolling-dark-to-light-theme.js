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
        start: "top 100%", // Start when the top of the section enters the bottom of the viewport
        end: "top 60%", // End when the top of the section is 50% from the top of the viewport
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
