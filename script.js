let currentSlide = 2; // On commence avec le 2ème slide (index 1, car index 0 est la slide fantôme)
const totalSlides = document.querySelectorAll(".slide").length - 1; // On exclut la slide fantôme
const slideBackgroundColors = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#f1c40f",
  "#8e44ad",
]; // Couleurs de fond

// Fonction qui calcule et applique la position des slides
function calculateAndSetSlidePosition() {
  const slides = document.querySelector(".slides");
  const container = document.querySelector(".slider-container");

  // Vérifier si l'écran est de petite taille (mobile)
  const isMobile = window.innerWidth <= 768;

  let slideWidth;
  if (isMobile) {
    slideWidth = container.offsetWidth; // Sur mobile, chaque slide occupe 100% de la largeur
  } else {
    slideWidth = container.offsetWidth / 3; // Sur les grands écrans, 1/3 de la largeur
  }

  // Décalage pour centrer le slide actif
  const offset = isMobile ? 0 : (container.offsetWidth - slideWidth) / 2;
  const translateX = (currentSlide - 1) * slideWidth - offset;

  slides.style.transform = `translateX(-${translateX}px)`;

  // Mise à jour de la couleur de fond selon le slide actif
  const slider = document.querySelector(".slider");
  slider.style.backgroundColor = slideBackgroundColors[currentSlide - 1];
}

// Fonction qui déplace les slides
function moveSlide(step) {
  const container = document.querySelector(".slider-container");

  // Mise à jour de l'index du slide actuel
  currentSlide += step;

  // S'assurer que currentSlide ne va jamais sur la slide fantôme (index 0)
  if (currentSlide < 1) {
    currentSlide = totalSlides; // Si on recule trop, on va au dernier slide réel
  } else if (currentSlide > totalSlides) {
    currentSlide = 1; // Si on dépasse le dernier slide, on revient au premier
  }

  // Appliquer la nouvelle position des slides
  calculateAndSetSlidePosition();

  // Mise à jour des slides pour ajouter une classe active au slide central
  updateActiveSlide();
  updateDots();
}

// Mise à jour des slides pour activer la bonne slide
function updateActiveSlide() {
  const allSlides = document.querySelectorAll(".slide");

  allSlides.forEach((slide, index) => {
    slide.classList.remove("active", "visible");
    if (index === currentSlide - 1) {
      slide.classList.add("active"); // Slide active
    } else if (index === currentSlide - 2 || index === currentSlide) {
      slide.classList.add("visible"); // Slide -1 et +1 visibles
    }
  });

  // Gérer le cas où le premier ou dernier slide est actif, pour la boucle
  if (currentSlide === 1) {
    allSlides[totalSlides].classList.add("visible"); // Dernier slide est le voisin gauche
  }
  if (currentSlide === totalSlides) {
    allSlides[0].classList.add("visible"); // Premier slide est le voisin droit
  }
}

// Création des dots sous le slider
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

// Mise à jour des dots en fonction du slide actif
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

// Aller directement à un slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex; // Met à jour l'index du slide
  moveSlide(0); // Force l'actualisation sans bouger
}

// Initialiser le slider avec le 2ème slide au centre
document.addEventListener("DOMContentLoaded", function () {
  calculateAndSetSlidePosition(); // Calcul initial

  // Mise à jour des slides pour définir celui qui est actif au démarrage
  updateActiveSlide();
  createDots();
});

// Réagir au redimensionnement de la fenêtre pour ajuster les slides
window.addEventListener("resize", function () {
  calculateAndSetSlidePosition(); // Recalculer la position lors du redimensionnement
});
