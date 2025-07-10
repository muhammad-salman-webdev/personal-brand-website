// ===========================================================================
// GLOBAL CONSTANTS
// ===========================================================================
const BREAKPOINT = 1024; // Define your mobile/desktop breakpoint (<= 1024px is mobile)

// ===========================================================================
// MAIN RESPONSIVE MENU (SIDEBAR) ELEMENTS
// ===========================================================================
const menuBtn = document.querySelector(
  "#headerMain .resp-menu-toggle-btn input"
);
const respMenu = document.querySelector("#headerMain .nav-container");
const mobileMenuOverlay = document.querySelector(
  "#headerMain .resp-menu-overlay"
);

// ===========================================================================
// SUB-MENU ELEMENTS (COLLECT ALL SUB-MENUS)
// ===========================================================================
const headerSubMenus = document.querySelectorAll(
  "#headerMain .nav-container nav > ul > li.sub-menu"
);

// ===========================================================================
// LIQUID BALL ELEMENTS & ANIMATION SETUP (Declared globally for access)
// ===========================================================================
const gradientBackground = document.querySelector(
  ".gradient-background-single"
);
let liquidBall1; // Will be assigned in DOMContentLoaded
let liquidBall2; // Will be assigned in DOMContentLoaded
let ball1Timeline; // Store timeline reference for control
let ball2Timeline; // Store timeline reference for control

const ballSize = 200; // Ball dimensions as requested (200px by 200px)
const ballRadius = ballSize / 2; // Half the ball's width/height (100px)

// Define a set of color palettes
const colorPalettes = [
  { c1: "#FF7EB9", c2: "#B347AF", gradX: "35%", gradY: "65%" }, // Bright Pink to Purple
  { c1: "#8AFF8A", c2: "#4CAF50", gradX: "60%", gradY: "40%" }, // Lime Green to Dark Green
  { c1: "#FFFF8A", c2: "#FFC107", gradX: "20%", gradY: "80%" }, // Bright Yellow to Amber
  { c1: "#8AE2FF", c2: "#47A9FF", gradX: "75%", gradY: "25%" }, // Sky Blue to Deeper Blue
  { c1: "#FF986E", c2: "#FF5722", gradX: "50%", gradY: "50%" }, // Coral to Orange
];

let currentPaletteIndex1 = 0; // Initial palette for ball 1
let currentPaletteIndex2 = 1; // Initial palette for ball 2

/**
 * Selects a random gradient palette index different from the given excludeIndex.
 */
function getRandomPaletteIndex(excludeIndex) {
  let newIndex = excludeIndex;
  while (newIndex === excludeIndex) {
    newIndex = Math.floor(Math.random() * colorPalettes.length);
  }
  return newIndex;
}

/**
 * Calculates the coordinates for the four corners of the container,
 * adjusted so the ball's center places its edge at the desired "50% showing" point.
 */
function getCornerCoordinates(containerWidth, containerHeight, ballHalfSize) {
  return {
    topLeft: { x: -ballHalfSize, y: -ballHalfSize },
    topRight: { x: containerWidth - ballHalfSize, y: -ballHalfSize },
    bottomRight: {
      x: containerWidth - ballHalfSize,
      y: containerHeight - ballHalfSize,
    },
    bottomLeft: { x: -ballHalfSize, y: containerHeight - ballHalfSize },
  };
}

/**
 * Animates a single liquid ball along the specified border path.
 * Returns the GSAP timeline created.
 */
function animateSingleLiquidBall(
  ballElement,
  initialDelay = 0,
  initialPaletteIndex
) {
  // Only proceed if the gradient background element exists and is currently visible
  // We check getComputedStyle.display and actual dimensions
  if (
    !gradientBackground ||
    getComputedStyle(gradientBackground).display === "none" ||
    gradientBackground.offsetWidth === 0 ||
    gradientBackground.offsetHeight === 0
  ) {
    // console.warn("Gradient background is not visible or has zero dimensions. Skipping ball animation setup.");
    return null; // Return null if animation cannot be set up
  }

  const containerWidth = gradientBackground.offsetWidth;
  const containerHeight = gradientBackground.offsetHeight;
  const corners = getCornerCoordinates(
    containerWidth,
    containerHeight,
    ballRadius
  );

  // Initialize ball's position and appearance
  gsap.set(ballElement, {
    x: corners.topLeft.x, // Start at top-left corner
    y: corners.topLeft.y,
    opacity: 0.7,
    scale: 1,
    filter: `blur(80px)`,
    "--color1": colorPalettes[initialPaletteIndex].c1,
    "--color2": colorPalettes[initialPaletteIndex].c2,
    "--gradient-pos-x": colorPalettes[initialPaletteIndex].gradX,
    "--gradient-pos-y": colorPalettes[initialPaletteIndex].gradY,
  });

  let currentBallPaletteIndex = initialPaletteIndex;

  const tl = gsap.timeline({
    repeat: -1, // Loop indefinitely
    delay: initialDelay,
    onUpdate: function () {
      // Optional: for subtle effects during movement
      gsap.to(ballElement, {
        filter: `blur(${gsap.utils.mapRange(0, 1, 70, 90, tl.progress())}px)`,
        duration: 0.1,
      });
    },
  });

  const animationDuration = 3; // Duration for each segment of the path

  // Function to get a new random palette and update the ball's current index
  function updatePalette() {
    const nextPaletteIndex = getRandomPaletteIndex(currentBallPaletteIndex);
    currentBallPaletteIndex = nextPaletteIndex;
    const nextPalette = colorPalettes[nextPaletteIndex];
    return {
      "--color1": nextPalette.c1,
      "--color2": nextPalette.c2,
      "--gradient-pos-x": nextPalette.gradX,
      "--gradient-pos-y": nextPalette.gradY,
    };
  }

  // 1. Move from Top-Left to Top-Right
  tl.to(ballElement, {
    x: corners.topRight.x,
    y: corners.topRight.y,
    duration: animationDuration,
    ease: "power2.inOut",
    ...updatePalette(), // Apply new random palette for this segment
  });

  // 2. Move from Top-Right to Bottom-Right
  tl.to(ballElement, {
    x: corners.bottomRight.x,
    y: corners.bottomRight.y,
    duration: animationDuration,
    ease: "power2.inOut",
    ...updatePalette(),
  });

  // 3. Move from Bottom-Right to Bottom-Left
  tl.to(ballElement, {
    x: corners.bottomLeft.x,
    y: corners.bottomLeft.y,
    duration: animationDuration,
    ease: "power2.inOut",
    ...updatePalette(),
  });

  // 4. Move from Bottom-Left to Top-Left
  tl.to(ballElement, {
    x: corners.topLeft.x,
    y: corners.topLeft.y,
    duration: animationDuration,
    ease: "power2.inOut",
    ...updatePalette(),
  });

  return tl; // Return the created timeline
}

/**
 * Function to set up or restart animations for both balls.
 * This should be called when the container is visible and has correct dimensions.
 */
function initializeBallAnimations() {
  // Kill any existing timelines to prevent multiple animations running concurrently
  if (ball1Timeline) ball1Timeline.kill();
  if (ball2Timeline) ball2Timeline.kill();

  const totalPathDuration = 6; // 4 segments * 3 seconds/segment

  // Start animations and store their timelines
  // `animateSingleLiquidBall` might return null if the container is hidden
  ball1Timeline = animateSingleLiquidBall(liquidBall1, 0, currentPaletteIndex1);
  ball2Timeline = animateSingleLiquidBall(
    liquidBall2,
    totalPathDuration / 2,
    currentPaletteIndex2
  );
}

/**
 * Stops and clears ball animations.
 */
function stopBallAnimations() {
  if (ball1Timeline) {
    ball1Timeline.kill();
    ball1Timeline = null;
  }
  if (ball2Timeline) {
    ball2Timeline.kill();
    ball2Timeline = null;
  }
}

// ===========================================================================
// MAIN RESPONSIVE MENU (SIDEBAR) FUNCTIONS
// ===========================================================================

// Initial GSAP setup for main menu (hidden states)
gsap.set(respMenu, { xPercent: -100, display: "none" });
gsap.set(mobileMenuOverlay, { autoAlpha: 0, display: "none" });

/**
 * Opens the main responsive sidebar menu with GSAP animations.
 * Only runs if the screen width is within the mobile breakpoint.
 */
function openSidebar() {
  if (window.innerWidth <= BREAKPOINT) {
    // Add no-scroll class to body and html
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll"); // Targeting html element

    const openTl = gsap.timeline({
      onStart: () => {
        respMenu.style.display = "block"; // Or 'flex'/'grid' as appropriate for your menu
        mobileMenuOverlay.style.display = "block";
        // Ensure the gradient background is visible before starting animations
        if (gradientBackground) {
          gradientBackground.style.display = "block"; // Make sure it's visible for dimension calculation
        }
      },
      onComplete: () => {
        // --- Call this AFTER the sidebar is fully open and visible ---
        initializeBallAnimations(); // Now safe to call as dimensions are correct
      },
    });

    openTl.to(
      mobileMenuOverlay,
      {
        autoAlpha: 1,
        duration: 0.4, // Smooth opening for overlay
      },
      0
    );

    openTl.to(
      respMenu,
      {
        xPercent: 0,
        duration: 0.5, // Slightly longer duration for smooth opening
        ease: "power2.out",
      },
      0
    );
  }
}

/**
 * Closes the main responsive sidebar menu with GSAP animations.
 * Handles state reset for both mobile and desktop.
 */
function closeSidebar() {
  // Always uncheck the menu button regardless of breakpoint,
  // to keep the internal state consistent.
  menuBtn.checked = false;

  if (window.innerWidth <= BREAKPOINT) {
    const closeTl = gsap.timeline({
      onStart: () => {
        // --- Stop ball animations immediately when closing ---
        stopBallAnimations();
      },
      onComplete: () => {
        respMenu.style.display = "none";
        mobileMenuOverlay.style.display = "none";
        // Hide the gradient background as well
        if (gradientBackground) {
          gradientBackground.style.display = "none";
        }
        // Remove no-scroll class from body and html after animation completes
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
      },
    });

    closeTl.to(
      respMenu,
      {
        xPercent: -100,
        duration: 0.35, // Faster closing animation
        ease: "power2.in",
      },
      0
    );

    closeTl.to(
      mobileMenuOverlay,
      {
        autoAlpha: 0,
        duration: 0.25, // Even faster closing for overlay
      },
      0.05
    );
  } else {
    // If closing triggered above breakpoint (e.g., resize while open),
    // ensure elements are shown/reset for desktop
    respMenu.style.display = ""; // Reset to default (usually 'block' or 'flex' via CSS)
    gsap.set(respMenu, { xPercent: 0, clearProps: "all" }); // Clear GSAP transforms
    mobileMenuOverlay.style.display = "none"; // Overlay usually hidden on desktop
    gsap.set(mobileMenuOverlay, { autoAlpha: 0, clearProps: "all" });

    // Ensure no-scroll class is removed if for some reason it was applied on desktop
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");

    // --- Stop ball animations if transitioning to desktop and they were active ---
    stopBallAnimations();
    // Ensure gradient background is hidden if it's only for mobile sidebar
    if (gradientBackground) {
      gradientBackground.style.display = "none";
    }
  }
}

// ===========================================================================
// SUB-MENU TOGGLE FUNCTIONALITY (DESKTOP HOVER, MOBILE CLICK)
// ===========================================================================

/**
 * Manages the toggle behavior for sub-menus based on screen width.
 * This function is called on initial load and on window resize.
 */
function subMenuToggleHandler() {
  headerSubMenus.forEach((subMenu) => {
    const trigerer = subMenu.querySelector(".trigerer");
    const overlay = subMenu.querySelector(".sub-menu-overlay"); // If you use an overlay per sub-menu
    const subMenuPopup = subMenu.querySelector(".sub-menu-container");
    const subMenuIcon = subMenuPopup
      ? subMenuPopup.querySelector(".sub-menu-icon")
      : null;
    const subMenuLabel = subMenuPopup
      ? subMenuPopup.querySelector(".sub-menu-list > div")
      : null;
    const subLinks = subMenuPopup
      ? subMenuPopup.querySelectorAll(".sub-menu-list > ul > li")
      : [];

    // Safety check: if essential elements are missing, skip this subMenu
    if (!trigerer || !subMenuPopup) {
      console.warn(
        "Skipping a sub-menu due to missing 'trigerer' or 'sub-menu-container'. Check your HTML structure.",
        subMenu
      );
      return;
    }

    const isMobile = window.innerWidth <= BREAKPOINT;
    // Get current active state before removing listeners/clearing props
    const wasActive = trigerer.classList.contains("_active");

    // --- Cleanup: Remove ALL previous event listeners to prevent duplicates ---
    if (trigerer) {
      trigerer.removeEventListener("mouseenter", subMenu.__openDesktopSubMenu);
      trigerer.removeEventListener("click", subMenu.__toggleMobileSubMenu);
    }
    if (subMenu) {
      // Use subMenu as the parent for mouseleave on desktop
      subMenu.removeEventListener("mouseleave", subMenu.__closeDesktopSubMenu);
    }
    if (overlay) {
      overlay.removeEventListener("mouseenter", subMenu.__closeDesktopSubMenu);
    }
    // Remove click listeners on subLinks for mobile (if they were previously added)
    if (subMenuPopup && subMenu.__mobileSubLinkClickAttached) {
      subMenuPopup.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("click", subMenu.__mobileSubLinkClick);
      });
      subMenu.__mobileSubLinkClickAttached = false; // Reset flag
    }

    // --- Cleanup: Clear all GSAP-applied inline styles and active classes ---
    // IMPORTANT: We only clear props if it WAS NOT active,
    // or if we are transitioning to desktop where CSS will manage it.
    if (!wasActive || window.innerWidth > BREAKPOINT) {
      gsap.set(
        [subMenuPopup, subMenuIcon, subMenuLabel, overlay, ...subLinks],
        {
          clearProps: "all",
        }
      );
      trigerer.classList.remove("_active");
    } else {
      // If it was active and we're staying mobile, just ensure active class
      trigerer.classList.add("_active");
    }

    if (isMobile) {
      // --- MOBILE SUB-MENU LOGIC (CLICK) ---

      // Set initial state for mobile. If it was active, ensure it stays visible
      if (wasActive) {
        gsap.set(subMenuPopup, {
          height: "auto",
          opacity: 1,
          display: "block",
        });
        // Ensure overlay is correctly set if it's part of your mobile sub-menu design
        if (overlay) {
          gsap.set(overlay, { opacity: 1, display: "block" });
        }
        trigerer.classList.add("_active");
      } else {
        gsap.set(subMenuPopup, { height: 0, opacity: 0, display: "none" });
        if (overlay) {
          gsap.set(overlay, { opacity: 0, display: "none" });
        }
      }

      const toggleMobileSubMenu = () => {
        if (trigerer.classList.contains("_active")) {
          // Close the mobile submenu
          gsap
            .timeline({
              onComplete: () => {
                gsap.set(subMenuPopup, { display: "none", opacity: 0 }); // Hide after animation
                if (overlay) {
                  gsap.set(overlay, { opacity: 0, display: "none" });
                }
                trigerer.classList.remove("_active");
              },
            })
            .to(subMenuPopup, {
              height: 0,
              opacity: 0, // Fade out while collapsing
              duration: 0.3,
              ease: "power2.in",
            })
            .to(overlay, { autoAlpha: 0, duration: 0.2 }, 0); // Fade overlay out with sub-menu
        } else {
          // Open the mobile submenu
          gsap
            .timeline({
              onStart: () => {
                // Temporarily set height to auto to calculate its natural size
                gsap.set(subMenuPopup, {
                  display: "block",
                  opacity: 0,
                  height: "auto",
                });
                // Reset height to 0 for animation start (GSAP will handle from 0 to "auto")
                gsap.set(subMenuPopup, { height: 0 });
                if (overlay) {
                  gsap.set(overlay, { display: "block", opacity: 0 });
                }
                trigerer.classList.add("_active");
              },
            })
            .to(subMenuPopup, {
              height: "auto", // Animate to auto height
              opacity: 1, // Fade in while expanding
              duration: 0.4,
              ease: "power2.out",
            })
            .to(overlay, { autoAlpha: 1, duration: 0.3 }, 0); // Fade overlay in with sub-menu
        }
      };

      // Store function reference for removal
      subMenu.__toggleMobileSubMenu = toggleMobileSubMenu;
      trigerer.addEventListener("click", subMenu.__toggleMobileSubMenu);

      // Optional: Close mobile submenu if a link inside is clicked
      // This click listener is only for links *within* the sub-menu popup itself,
      // not for the main nav links.
      const mobileSubLinkClickHandler = (e) => {
        // Here, we specifically want the sub-menu to collapse if a link inside it is clicked.
        // It does NOT close the main sidebar from here; the main sidebar closing
        // is handled by the global 'respMenu.querySelectorAll("a")' listener.
        if (trigerer.classList.contains("_active")) {
          toggleMobileSubMenu(); // Collapse the current sub-menu
        }
      };
      // Attach this handler only once
      if (!subMenu.__mobileSubLinkClickAttached) {
        subMenu.__mobileSubLinkClick = mobileSubLinkClickHandler; // Store reference
        subLinks.forEach((link) => {
          link.addEventListener("click", subMenu.__mobileSubLinkClick);
        });
        subMenu.__mobileSubLinkClickAttached = true; // Set flag
      }
    } else {
      // --- DESKTOP SUB-MENU LOGIC (HOVER) ---

      // For desktop, sub-menus should generally be hidden by default
      // and only appear on hover, so we can always force their initial hidden state
      // (as their visibility will be managed by desktop CSS, not JS active class)
      gsap.set(subMenuPopup, { y: 100, opacity: 0, display: "none" });
      gsap.set(subMenuIcon, { y: 50, opacity: 0 });
      gsap.set(subMenuLabel, { opacity: 0 });
      if (overlay) {
        // Ensure overlay exists before setting
        gsap.set(overlay, { opacity: 0, display: "none" });
      }
      gsap.set(subLinks, { opacity: 0, y: 20 });
      // On desktop, the _active class on trigerer should usually be removed
      trigerer.classList.remove("_active");

      const openDesktopSubMenu = () => {
        if (!subMenuPopup || !trigerer) return;
        gsap
          .timeline({
            onStart: () => {
              trigerer.classList.add("_active");
              gsap.set(subMenuPopup, { display: "block" });
              if (overlay) {
                gsap.set(overlay, { display: "block" });
              }
            },
          })
          .to(
            overlay,
            { opacity: 1, duration: 0.3, ease: "power2.out" },
            "start"
          )
          .to(
            subMenuPopup,
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "start+=0.1"
          )
          .to(
            subMenuIcon,
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "start+=0.2"
          )
          .to(
            subMenuLabel,
            { opacity: 1, duration: 0.4, ease: "power2.out" },
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

      const closeDesktopSubMenu = () => {
        if (!subMenuPopup || !trigerer) return;
        gsap
          .timeline({
            onComplete: () => {
              trigerer.classList.remove("_active");
              // Reset all properties to their initial hidden states
              gsap.set(subMenuPopup, { display: "none", y: 100, opacity: 0 });
              gsap.set(subMenuIcon, { y: 50, opacity: 0 });
              gsap.set(subMenuLabel, { opacity: 0 });
              gsap.set(subLinks, { opacity: 0, y: 20 });
              if (overlay) {
                gsap.set(overlay, { display: "none", opacity: 0 });
              }
            },
          })
          .to([overlay, subMenuPopup, subMenuIcon, subMenuLabel, ...subLinks], {
            // Use spread for subLinks
            opacity: 0, // Fade out all elements
            duration: 0.3,
            ease: "power2.in",
          });
      };

      // Store function references for proper removal later
      subMenu.__openDesktopSubMenu = openDesktopSubMenu;
      subMenu.__closeDesktopSubMenu = closeDesktopSubMenu;

      trigerer.addEventListener("mouseenter", subMenu.__openDesktopSubMenu);
      subMenu.addEventListener("mouseleave", subMenu.__closeDesktopSubMenu); // Listen on the parent li for mouseleave
      if (overlay) {
        // Ensure overlay exists before adding listener
        overlay.addEventListener("mouseenter", subMenu.__closeDesktopSubMenu); // Listen on the sub-menu overlay for mouseenter to close
      }
    }
  });
}

// ===========================================================================
// GLOBAL RESPONSIVE LAYOUT HANDLER
// ===========================================================================

/**
 * Handles the main responsive layout changes for both sidebar and sub-menus.
 * This is the central function called on initial load and window resize.
 */
function handleResponsiveLayout() {
  if (window.innerWidth > BREAKPOINT) {
    // --- Desktop View Reset for Main Menu ---
    respMenu.style.display = ""; // Clear any JS-set display:none
    gsap.set(respMenu, { xPercent: 0, clearProps: "all" }); // Reset GSAP transforms & properties
    respMenu.style.position = ""; // Reset position if JS added it

    mobileMenuOverlay.style.display = "none"; // Hide overlay on desktop
    gsap.set(mobileMenuOverlay, { autoAlpha: 0, clearProps: "all" });

    menuBtn.checked = false; // Ensure checkbox is unchecked
    // menuBtn.disabled = true; // Uncomment if you want to disable the main toggle button on desktop

    // --- Stop ball animations if switching to desktop ---
    stopBallAnimations();
    // Ensure gradient background is hidden if it's only for mobile sidebar
    if (gradientBackground) {
      gradientBackground.style.display = "none";
    }
  } else {
    // --- Mobile View Setup for Main Menu ---
    // If window resizes from desktop to mobile, ensure mobile initial state is set
    if (!menuBtn.checked) {
      // Menu is closed on mobile, so ensure elements are hidden and no animation
      respMenu.style.display = "none";
      gsap.set(respMenu, { xPercent: -100 });
      mobileMenuOverlay.style.display = "none";
      gsap.set(mobileMenuOverlay, { autoAlpha: 0 });
      if (gradientBackground) {
        gradientBackground.style.display = "none";
      }
      stopBallAnimations(); // Ensure animations are stopped if menu is closed
    } else {
      // Menu is OPEN on mobile
      if (gradientBackground) {
        gradientBackground.style.display = "block"; // Ensure it's visible
        initializeBallAnimations(); // Re-initialize animations if menu is open
      }
    }
    // menuBtn.disabled = false; // Uncomment if you enabled disabling it above
  }

  // Always run the subMenuToggleHandler to re-evaluate and apply
  // desktop/mobile specific sub-menu behaviors and event listeners
  subMenuToggleHandler();
}

// ===========================================================================
// INITIALIZATION & EVENT LISTENERS
// ===========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Check if gradientBackground element exists at startup, and create balls once
  if (gradientBackground) {
    liquidBall1 = document.createElement("div");
    liquidBall1.classList.add("liquid-ball");
    gradientBackground.appendChild(liquidBall1);

    liquidBall2 = document.createElement("div");
    liquidBall2.classList.add("liquid-ball");
    gradientBackground.appendChild(liquidBall2);

    // Initial state: hide the gradient background (it will be shown when sidebar opens)
    gradientBackground.style.display = "none";
  } else {
    console.warn(
      "'.gradient-background-single' element not found. Liquid glass animation will not run."
    );
  }

  // 1. Initial call to set up the layout based on current screen size
  handleResponsiveLayout();

  // 2. Listen for window resize events to adjust layout and behaviors
  window.addEventListener("resize", handleResponsiveLayout);

  // 3. Main Menu Toggle (Sidebar) Event Listener
  menuBtn.addEventListener("change", () => {
    if (menuBtn.checked) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });

  // 4. Close Main Menu when clicking on the overlay
  mobileMenuOverlay.addEventListener("click", () => {
    if (menuBtn.checked) {
      // Only call closeSidebar if the menu is currently open
      closeSidebar();
    }
  });

  // 5. Close Main Menu when any link inside it (including sub-menu links) is clicked,
  // but NOT when the sub-menu 'trigerer' itself is clicked.
  respMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const isSubMenuTrigger = link.classList.contains("trigerer");

      if (!isSubMenuTrigger && menuBtn.checked) {
        closeSidebar();
      }
    });
  });
});
