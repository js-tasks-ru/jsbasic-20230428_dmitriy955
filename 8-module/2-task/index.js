import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  elem = null;
  productsFiltered = null;
  activeFilters = {
    noNuts: false,
    vegeterianOnly: false,
    maxSpiciness: null,
    category: null,
  };

  constructor(products) {
    this.products = products;
    this.productsFiltered = this.products;
    this.render();
  }

  getTemplate() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `;
  }

  getCards(products) {
    let productsInner = this.elem.querySelector(".products-grid__inner");

    products.map((product) => {
      let card = new ProductCard(product);
      productsInner.append(card.elem);
    });
  }

  updateFilter(filters) {
    this.productsFiltered = this.products;
    const activeFilters = this.activeFilters;

    Object.keys(filters).forEach((key) => {
      activeFilters[key] = filters[key];
    });

    if (activeFilters.noNuts) {
      this.productsFiltered = this.productsFiltered.filter(
        (product) => product.nuts === false || product.nuts === undefined
      );
    }

    if (activeFilters.vegeterianOnly) {
      this.productsFiltered = this.productsFiltered.filter(
        (product) => product.vegeterian === true
      );
    }

    if (activeFilters.maxSpiciness) {
      this.productsFiltered = this.productsFiltered.filter(
        (product) => product.spiciness <= activeFilters.maxSpiciness
      );
    }

    if (activeFilters.category) {
      this.productsFiltered = this.productsFiltered.filter(
        (product) => product.category === activeFilters.category
      );
    }

    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    this.getCards(this.productsFiltered);
  }

  get elem() {
    return this.elem;
  }

  render() {
    this.elem = createElement(this.getTemplate());
    this.getCards(this.products);
  }
}
