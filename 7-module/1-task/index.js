import createElement from '../../assets/lib/create-element.js';


export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  getTemplate() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories
      .map(
        (categorie) =>
          `<a href="#" class="ribbon__item ribbon__item_active" data-id=${categorie.id}>${categorie.name}</a>`
      )
      .join("")}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `;
  }

  itemClick = (target) => {
    const itemEvent = new CustomEvent("ribbon-select", {
      detail: target.dataset.id,
      bubbles: true,
    });

    this.elem.dispatchEvent(itemEvent);
  };

  render() {
    const elem = createElement(this.getTemplate());
    const rightButton = elem.querySelector(".ribbon__arrow_right");
    const leftButton = elem.querySelector(".ribbon__arrow_left");
    const ribbonInner = elem.querySelector(".ribbon__inner");
    let offset = 350;

    leftButton.classList.remove("ribbon__arrow_visible");
    rightButton.classList.add("ribbon__arrow_visible");

    rightButton.addEventListener("click", () => {
      ribbonInner.scrollBy(offset, 0);
    });

    leftButton.addEventListener("click", () => {
      ribbonInner.scrollBy(-offset, 0);
    });

    ribbonInner.addEventListener("scroll", () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        leftButton.classList.remove("ribbon__arrow_visible");
      } else {
        leftButton.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight === 0) {
        rightButton.classList.remove("ribbon__arrow_visible");
      } else {
        rightButton.classList.add("ribbon__arrow_visible");
      }
    });

    const ribbonItems = ribbonInner.querySelectorAll(".ribbon__item");
    ribbonItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        let target = e.target;
        e.preventDefault();

        ribbonItems.forEach((item) => {
          item.classList.remove("ribbon__item_active");
        });

        target.classList.add("ribbon__item_active");
        this.itemClick(target);
      });
    });

    return elem;
  }
}
