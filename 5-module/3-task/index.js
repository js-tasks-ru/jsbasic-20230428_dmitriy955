function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');
  let rightButton = document.querySelector('.carousel__arrow_right');
  let leftButton = document.querySelector('.carousel__arrow_left');

  let carouselWidth = carousel.offsetWidth;
  let maxSlides = 4;
  let counter = 0;

  leftButton.style.display = "none";

  rightButton.addEventListener("click", () => {
    counter++;
    carousel.style.transform = `translateX(-${counter * carouselWidth}px)`;
    leftButton.style.display = "";
    if (counter === maxSlides - 1) {
      rightButton.style.display = "none";
    }
  });

  leftButton.addEventListener("click", () => {
    counter--;
    carousel.style.transform = `translateX(-${counter * carouselWidth}px)`;
    rightButton.style.display = "";
    if (counter === 0) {
      leftButton.style.display = "none";
    }
  });
}
