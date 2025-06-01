// Select all elements with the class "c_plasma-button"
const plasmaButtons = document.querySelectorAll(".c_plasma-button");

// Proceed only if there are plasma button elements on the page
if (plasmaButtons.length > 0) {
  plasmaButtons.forEach((button) => {
    // Generate and assign a random animation delay (0 to 1.5 seconds) for each button
    const randomDelay = (Math.random() * 1.5).toFixed(2);
    button.style.setProperty("--delay", `${randomDelay}s`);

    // Select the background circle element inside the button responsible for the plasma effect
    const circle = button.querySelector(".c_plasma-button-bg-circle");
    if (!circle) return; // Exit if circle element not found

    // Attach mousemove event listener to update the circle position based on cursor location
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      // Calculate cursor position relative to the button’s top-left corner
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update circle’s position, offset by 20px to center it around the cursor
      circle.style.top = `${y - 20}px`;
      circle.style.left = `${x - 20}px`;
    });
  });
}
