import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  getTemplate() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `;
  }
  open() {
    const body = document.querySelector("body");
    body.classList.add("is-modal-open");
    body.append(this.elem);
  }

  close() {
    document.querySelector("body").classList.remove("is-modal-open");
    this.elem.remove();
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(node);
  }

  render() {
    const elem = createElement(this.getTemplate());
    const modalCloseButton = elem.querySelector(".modal__close");

    modalCloseButton.addEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.code === "Escape") {
          this.close();
        }
      },
      { once: true }
    );

    return elem;
  }
}
