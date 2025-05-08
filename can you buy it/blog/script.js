// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get references to interactive elements
    const searchInput = document.getElementById("searchInput");
    const viewAllButton = document.getElementById("viewAllButton");
    const navItems = document.querySelectorAll(".nav-item");
  
    // Search functionality
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      // Here you would typically implement the search logic
      console.log("Searching for:", searchTerm);
    });
  
    // View All Posts button click handler
    viewAllButton.addEventListener("click", function () {
      // Here you would typically implement the view all posts logic
      console.log("View all posts clicked");
    });
  
    // Navigation item click handlers
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Remove active class from all items
        navItems.forEach((navItem) =>
          navItem.classList.remove("nav-item-active"),
        );
        // Add active class to clicked item
        this.classList.add("nav-item-active");
      });
    });
  
    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchInput.blur();
      }
    });
  
    // Add focus styles for accessibility
    const interactiveElements = document.querySelectorAll("a, button, input");
    interactiveElements.forEach((element) => {
      element.addEventListener("focus", function () {
        this.style.outline = "2px solid #4b6bfb";
      });
      element.addEventListener("blur", function () {
        this.style.outline = "none";
      });
    });
  });
  