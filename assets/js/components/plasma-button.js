const plasmaButtons = document.querySelectorAll(".c_plasma-button");

if (plasmaButtons.length > 0) {
  plasmaButtons.forEach((button) => {
    // Adding Random Movement Delays
    const randomDelay = (Math.random() * 1.5).toFixed(2);
    button.style.setProperty("--delay", `${randomDelay}s`);

    const circle = button.querySelector(".c_plasma-button-bg-circle");
    if (!circle) return;

    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      circle.style.top = `${y - 20}px`;
      circle.style.left = `${x - 20}px`;
    });
  });
}
