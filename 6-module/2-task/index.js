export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }
  getTemplate() {
    return `
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">${'€' + this.product.price.toFixed(2)}</span>
      </div >
      <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div >`;
  }

  add = () => {
    let productAddEvent = new CustomEvent('product-add', {
      bubbles: true,
      detail: this.product.id,
    });

    this.elem.dispatchEvent(productAddEvent);
  }

  render() {
    const elem = document.createElement("div");
    elem.innerHTML = this.getTemplate();

    let addButton = elem.querySelector('.card__button');
    addButton.addEventListener("click", this.add);

    return elem;
  }
}
