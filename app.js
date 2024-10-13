let currentIndex = 2; // On commence avec le produit du milieu

function updateProductInfo(index) {
  let dots = document.querySelectorAll(".slider .dots li");
  const products = document.querySelectorAll(".product");

  const activeProduct = products[index];

  const title = document.getElementById("product-title");
  const button = document.getElementById("action-button");
  const background = document.getElementById("background");

  // Mettre à jour le titre et le bouton
  title.textContent = activeProduct.querySelector("h3").textContent;
  button.style.backgroundColor = activeProduct.getAttribute("data-color");
  button.textContent = activeProduct.getAttribute("data-button-text");

  // Mettre à jour la couleur de fond
  const bgColor = activeProduct.getAttribute("data-bg-color");
  background.style.backgroundColor = bgColor;

  // Changer l'image affichée
  const productImage = activeProduct.querySelector("img").src;

  let last_active_dot = document.querySelector(".slider .dots li.active");
  last_active_dot.classList.remove("active");
  dots[index].classList.add("active");
  document.getElementById("product-image").src = productImage;
}

function moveSlide(direction) {
  const products = document.querySelectorAll(".product");
  const totalProducts = products.length;

  // Calculer le nouvel index en fonction de la direction (droite ou gauche)
  currentIndex += direction;

  // Gérer le retour au début ou à la fin du slider
  if (currentIndex < 0) {
    currentIndex = totalProducts - 1; // revenir au dernier produit
  } else if (currentIndex >= totalProducts) {
    currentIndex = 0; // revenir au premier produit
  }

  // Appliquer la translation pour centrer le produit sélectionné
  const slideContainer = document.querySelector(".slide");
  const productWidth = slideContainer.clientWidth / 3; // 3 produits visibles
  const offset = currentIndex * productWidth; // Calculer la translation
  slideContainer.style.transition = "transform 0.5s ease"; // Transition fluide
  slideContainer.style.transform = `translateX(-${offset}px)`; // Appliquer la translation

  // Attendre que la transition soit terminée avant de mettre à jour le produit actif
  setTimeout(() => {
    centerProduct();
  }, 500); // Délai correspondant à la durée de la transition
}

function centerProduct() {
  const products = document.querySelectorAll(".product");

  // Désactiver tous les produits et n'activer que le produit au centre
  products.forEach((product, index) => {
    product.classList.remove("active");
    if (index === currentIndex) {
      product.classList.add("active"); // Ajouter la classe active au produit au centre
    }
  });

  // Mettre à jour les informations du produit actif
  updateProductInfo(currentIndex);
}

// Initialiser avec le produit du milieu
document.addEventListener("DOMContentLoaded", () => {
  centerProduct(); // Centrer et activer le produit du milieu dès le démarrage
});
