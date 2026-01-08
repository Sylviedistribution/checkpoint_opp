var store = [];

// Product
export class Product {
  constructor(id, name, description, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

export class ShoppingCartItem extends Product {
  constructor(product, quantity = 0) {
    super(
      product.id,
      product.name,
      product.description,
      product.price,
      product.imageUrl
    );
    this.quantity = quantity;
    this.liked = false; // 👈 état persistant
  }

  toggleLike() {
    this.liked = !this.liked;
  }

  totalPrice() {
    return this.price * this.quantity;
  }
}

// Panier : contient une liste d'items
export class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add an item
  addItem(product) {
    const item = this.items.find((i) => i.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.items.push(new ShoppingCartItem(product, 1));
    }
  }

  increaseQuantity(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.quantity++;
  }

  decreaseQuantity(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;

    item.quantity--;
    if (item.quantity <= 0) {
      this.items = this.items.filter((i) => i.id !== id);
    }
  }

  removeItemById(id) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  // Total quantities
  getTotalItemQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Total price
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.totalPrice(), 0);
  }

  toggleLike(id) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.toggleLike();
  }

  // Display the basket
  displayCartItems() {
    return this.items;
  }
}
