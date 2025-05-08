document.addEventListener("DOMContentLoaded", () => {
  const companyBoxes = document.querySelectorAll(".section.trusted .company-box");
  const visibleCount = 6; // Number of boxes to show at a time

  function showRandomBoxes() {
    // Hide all boxes
    companyBoxes.forEach(box => box.classList.remove("visible"));

    // Select random boxes to show
    const randomIndexes = [];
    while (randomIndexes.length < visibleCount) {
      const randomIndex = Math.floor(Math.random() * companyBoxes.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Show selected boxes with animation
    randomIndexes.forEach(index => {
      companyBoxes[index].classList.add("visible");
    });
  }

  // Initial display
  showRandomBoxes();

  // Cycle through boxes every 3 seconds
  setInterval(showRandomBoxes, 3000);
});