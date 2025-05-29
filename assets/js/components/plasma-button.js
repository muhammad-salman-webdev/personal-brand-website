const plasmaButtons = document.querySelectorAll(".c_plasma-button");

if (plasmaButtons.length > 0) {
  plasmaButtons.forEach((button) => {
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
