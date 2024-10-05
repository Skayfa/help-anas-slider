let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");
let subImg1 = document.querySelectorAll(".slider .subImg1");
let subImg2 = document.querySelectorAll(".slider .subImg2");

let lengthItems = items.length - 1;
let active = 0;

const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];

next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};

prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};

function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  let last_active_dot = document.querySelector(".slider .dots li.active");
  let last_active_subImg1 = document.querySelector(".slider .subImg1.active");
  let last_active_subImg2 = document.querySelector(".slider .subImg2.active");

  last_active_dot.classList.remove("active");
  last_active_subImg1.classList.remove("active");
  last_active_subImg2.classList.remove("active");

  dots[active].classList.add("active");
  subImg1[active].classList.add("active");
  subImg2[active].classList.add("active");

  // items colors change
  items[active].style.backgroundColor = colors[active];
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});

window.onresize = function (event) {
  reloadSlider();
};
