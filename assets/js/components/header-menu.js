// // Sub Menu Toggle with GSAP Animation Functinality

// const headerSubMenus = document.querySelectorAll(
//   "#headerMain .nav-container nav > ul > li.sub-menu"
// );

// headerSubMenus.forEach((subMenu) => {
//   console.log(subMenu);

//   const trigerer = subMenu.querySelector(".trigerer");

//   const overlay = subMenu.querySelector(".sub-menu-overlay");

//   const subMenuPopup = subMenu.querySelector(".sub-menu-container");
//   const subMenuIcon = subMenuPopup.querySelector(".sub-menu-icon");
//   const subMenuLabel = subMenuPopup.querySelector(".sub-menu-list > div");
//   const subLinks = subMenuPopup.querySelectorAll(".sub-menu-list > ul > li");
// });

// Sub Menu Toggle with GSAP Animation Functionality

const headerSubMenus = document.querySelectorAll(
  "#headerMain .nav-container nav > ul > li.sub-menu"
);

headerSubMenus.forEach((subMenu) => {
  const trigerer = subMenu.querySelector(".trigerer");
  const overlay = subMenu.querySelector(".sub-menu-overlay");
  const subMenuPopup = subMenu.querySelector(".sub-menu-container");
  const subMenuIcon = subMenuPopup.querySelector(".sub-menu-icon");
  const subMenuLabel = subMenuPopup.querySelector(".sub-menu-list > div");
  const subLinks = subMenuPopup.querySelectorAll(".sub-menu-list > ul > li");

  // Initial hidden state for all animated elements
  gsap.set(subMenuPopup, { y: 100, opacity: 0, display: "none" });
  gsap.set(subMenuIcon, { y: 50, opacity: 0 });
  gsap.set(subMenuLabel, { opacity: 0 });
  gsap.set(overlay, { opacity: 0, display: "none" });
  gsap.set(subLinks, { opacity: 0, y: 20 }); // Set initial state for sub-links

  // Define the open animation timeline
  const openSubMenu = () => {
    gsap
      .timeline({
        onStart: () => {
          // Add _active class to the trigerer when opening starts
          trigerer.classList.add("_active");
          // Ensure display is block before animation starts
          gsap.set(subMenuPopup, { display: "block" });
          gsap.set(overlay, { display: "block" });
        },
      })
      .to(
        overlay,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "start"
      )
      .to(
        subMenuPopup,
        {
          opacity: 1,
          y: 0, // Animate from y:100 to y:0
          duration: 0.5,
          ease: "power3.out",
        },
        "start+=0.1"
      )
      .to(
        subMenuIcon,
        {
          opacity: 1,
          y: 0, // Animate from y:50 to y:0
          duration: 0.6,
          ease: "power3.out",
        },
        "start+=0.2"
      )
      .to(
        subMenuLabel,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "start+=0.3"
      )
      .to(
        subLinks,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        },
        "start+=0.4"
      );
  };

  // Define the close animation timeline
  const closeSubMenu = () => {
    gsap
      .timeline({
        onComplete: () => {
          // Remove _active class from the trigerer when closing completes
          trigerer.classList.remove("_active");
          // Hide elements after fade out and reset their initial positions
          gsap.set(subMenuPopup, { display: "none", y: 100 });
          gsap.set(subMenuIcon, { y: 50 });
          gsap.set(subMenuLabel, { opacity: 0 });
          gsap.set(subLinks, { opacity: 0, y: 20 });
          gsap.set(overlay, { display: "none" });
        },
      })
      .to([overlay, subMenuPopup, subMenuIcon, subMenuLabel, subLinks], {
        opacity: 0,
        duration: 0.3, // Fade out duration
        ease: "power2.in",
      });
  };

  trigerer.addEventListener("mouseenter", openSubMenu);
  subMenu.addEventListener("mouseleave", closeSubMenu);
  overlay.addEventListener("mouseenter", closeSubMenu);
});
