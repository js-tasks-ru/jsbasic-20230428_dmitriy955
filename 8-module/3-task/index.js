export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {return;}
    let cartItem = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({
        product,
        count: 1,
      });
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      );
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, cartItem) => acc + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
