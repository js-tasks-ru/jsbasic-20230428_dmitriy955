import createElement from '../../assets/lib/create-element.js';


export default class Carousel {

  leftButton = null;
  rightButton = null;
  counter = 0;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  geTemplate() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${Number(slide.price).toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
          `).join("\n")}
        </div>
      </div>
  `;
  }

  prev = () => {
    this.counter--;
    this.elem.querySelector('.carousel__inner').style.transform = `translateX(-${this.counter * this.elem.querySelector('.carousel__slide').offsetWidth}px)`;

    if (this.counter === 0) {
      this.leftButton.style.display = "none";
    }
    this.rightButton.style.display = "";
  }

  next = () => {
    this.counter++;
    this.elem.querySelector(".carousel__inner").style.transform = `translateX(-${this.counter * this.elem.querySelector('.carousel__slide').offsetWidth}px)`;

    if (this.counter === (this.slides.length - 1)) {
      this.rightButton.style.display = "none";
    }
    this.leftButton.style.display = "";
  }

  add = (e) => {
    this.elem.dispatchEvent(new CustomEvent("product-add", {
      detail: e.target.closest(".carousel__slide").dataset.id,
      bubbles: true
    }));
  }

  render() {
    const element = createElement(this.geTemplate());

    this.leftButton = element.querySelector(".carousel__arrow_left");
    this.rightButton = element.querySelector(".carousel__arrow_right");

    this.leftButton.addEventListener("click", this.prev);
    this.rightButton.addEventListener("click", this.next);

    this.leftButton.style.display = "none";

    let addProductButtons = element.querySelectorAll(".carousel__button");
    for (let button of Array.from(addProductButtons)) {
      button.addEventListener("click", this.add);
    }

    return element;
  }
}
