document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcon = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile");

  // טיפול בלחיצה על כפתור הממבורגר ועל התפריט הניווט
  hamburgerIcon.addEventListener("click", toggleMenu);
  mobileMenu.addEventListener("click", toggleMenu);

  function toggleMenu() {
    // נבדוק אם התפריט הניווט כרגע נראה
    const isMenuDisplayed = !mobileMenu.classList.contains("d-none");

    // שינוי תצוגת התפריט הניווט בהתאם
    if (isMenuDisplayed) {
      mobileMenu.classList.add("d-none"); // הסתרה של התפריט
    } else {
      mobileMenu.classList.remove("d-none"); // הצגת התפריט
    }
  }
});