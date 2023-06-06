import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  getTemplate () {
    return `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        </div>
      </div>
    `;
  }

  dispatchSliderChangeEvent = (val) => {
    const e = new CustomEvent("slider-change", {
      detail: val,
      bubbles: true,
    });
    this.elem.dispatchEvent(e);
  };

  slideChangeEvent() {
    const steps = this.elem.querySelectorAll(".slider__steps span");

    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    this.elem.addEventListener("click", ({ clientX }) => {
      let { width, left } = this.elem.getBoundingClientRect();
      let offset = clientX - left;
      let leftRelative = offset / width;
      let parts = this.steps - 1;
      let nearValue = Math.round(leftRelative * parts);

      steps.forEach((step) => {
        step.classList.remove("slider__step-active");
      });

      steps[nearValue].classList.add("slider__step-active");
      let percents = (nearValue / parts) * 100;
      sliderThumb.style.left = `${percents}%`;
      sliderProgress.style.width = `${percents}%`;
      sliderValue.textContent = nearValue;
      this.dispatchSliderChangeEvent(nearValue);
    });
  }

  get elem () {
    return this.elem;
  }

  render() {
    this.elem = createElement(this.getTemplate());
    const sliderSteps = this.elem.querySelector(".slider__steps");
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement("span");
      sliderSteps.append(span);
      if (i === 0) {span.classList.add("slider__step-active");}
    }

    this.slideChangeEvent();
  }
}
