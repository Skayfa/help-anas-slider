let currentSlide = 2; // On commence avec le 2ème slide (index 1, car index 0 est la slide fantôme)
const totalSlides = document.querySelectorAll(".slide").length - 1; // On exclut la slide fantôme
const slideBackgroundColors = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#f1c40f",
  "#8e44ad",
]; // Couleurs de fond// Couleurs de fond, ajustées pour exclure la fantôme

function moveSlide(step) {
  const slides = document.querySelector(".slides");
  const container = document.querySelector(".slider-container");
  const slideWidth = container.offsetWidth / 3; // Divise la largeur du conteneur par 3 pour chaque slide

  // Mise à jour de l'index du slide actuel
  currentSlide += step;
  console.log("curr", currentSlide);

  // S'assurer que currentSlide ne va jamais sur la slide fantôme (index 0)
  if (currentSlide < 1) {
    currentSlide = totalSlides; // Si on recule trop, on va au dernier slide réel
  } else if (currentSlide > totalSlides) {
    currentSlide = 1; // Si on dépasse le dernier slide, on revient au premier
  }
  console.log("curr2", currentSlide);

  // Décalage pour centrer le slide actif
  const offset = (container.offsetWidth - slideWidth) / 2;
  const translateX = currentSlide * slideWidth - offset;

  slides.style.transform = `translateX(-${translateX}px)`;

  // Changement de la couleur de fond en fonction du slide central
  const slider = document.querySelector(".slider");
  slider.style.backgroundColor = slideBackgroundColors[currentSlide - 1]; // Ajuster l'index des couleurs

  // Mise à jour des slides pour ajouter une classe active au slide central
  updateActiveSlide();
  updateDots();
}

function updateActiveSlide() {
  const allSlides = document.querySelectorAll(".slide");

  allSlides.forEach((slide, index) => {
    slide.classList.remove("active", "visible");
    if (index === currentSlide) {
      slide.classList.add("active"); // Slide active
    } else if (index === currentSlide - 1 || index === currentSlide + 1) {
      slide.classList.add("visible"); // Slide -1 et +1 visibles
    }
  });

  // Gérer le cas où le premier ou dernier slide est actif, pour la boucle
  if (currentSlide === 1) {
    allSlides[totalSlides].classList.add("visible"); // Dernier slide est le voisin gauche
  }
  if (currentSlide === totalSlides) {
    allSlides[1].classList.add("visible"); // Premier slide est le voisin droit
  }
}

function createDots() {
  const dotsContainer = document.querySelector(".slider-dots");

  for (let i = 1; i <= totalSlides; i++) {
    // On exclut la slide fantôme ici
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-slide", i); // Associer chaque dot à un slide
    dot.addEventListener("click", function () {
      goToSlide(i); // Aller directement à ce slide
    });
    dotsContainer.appendChild(dot);
  }
  updateDots(); // Met à jour le dot actif au démarrage
}

function updateDots() {
  const dots = document.querySelectorAll(".slider-dots .dot");

  dots.forEach((dot, index) => {
    if (index + 1 === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex; // Met à jour l'index du slide
  moveSlide(0); // Force l'actualisation sans bouger
}

// Initialiser le slider avec le 2ème slide au centre
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const container = document.querySelector(".slider-container");
  const slideWidth = container.offsetWidth / 3; // Divise la largeur du conteneur par 3

  // Décalage pour centrer le 2ème slide
  const offset = (container.offsetWidth - slideWidth) / 2;
  const translateX = currentSlide * slideWidth - offset;

  slides.style.transform = `translateX(-${translateX}px)`;

  // Appliquer la couleur de fond du 2ème slide
  const slider = document.querySelector(".slider");
  slider.style.backgroundColor = slideBackgroundColors[currentSlide - 1];

  // Mise à jour des slides pour définir celui qui est actif au démarrage
  updateActiveSlide();
  createDots();
});
