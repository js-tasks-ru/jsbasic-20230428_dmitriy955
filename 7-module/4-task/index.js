import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  elem = null;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  getTemplate() {
    return `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress" style="width: 0;"></div>
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

  slideChangeEvent = () => {
    const steps = this.elem.querySelectorAll(".slider__steps span");

    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    sliderThumb.addEventListener("pointerdown", this.onDown);

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
  };

  onUp = () => {
    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    let valuePercents = (100 / (this.steps - 1)) * sliderValue.textContent;

    sliderThumb.style.left = `${valuePercents}%`;
    sliderProgress.style.width = `${valuePercents}%`;

    this.dispatchSliderChangeEvent(+sliderValue.textContent);

    document.removeEventListener("pointermove", this.onMove);
    this.elem.classList.remove("slider_dragging");
  };

  onMove = ({ clientX }) => {
    const steps = this.elem.querySelectorAll(".slider__steps > span");

    let { width, left } = this.elem.getBoundingClientRect();
    let sliderThumb = this.elem.querySelector(".slider__thumb");
    let sliderProgress = this.elem.querySelector(".slider__progress");
    let sliderValue = this.elem.querySelector(".slider__value");

    let offset = clientX - left;
    let leftRelative = offset / width;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    sliderThumb.style.left = `${leftPercents}%`;
    sliderProgress.style.width = `${leftPercents}%`;
    let parts = this.steps - 1;
    let nearValue = leftRelative * parts;
    let value = Math.round(nearValue);
    sliderValue.textContent = value;
    steps.forEach((step) => {
      step.classList.remove("slider__step-active");
    });
    steps[value].classList.add("slider__step-active");
  };

  onDown = (e) => {
    e.preventDefault();
    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onMove);
    document.addEventListener("pointerup", this.onUp, { once: true });
  };

  get elem() {
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
