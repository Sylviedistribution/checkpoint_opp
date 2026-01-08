# 🛒Shopping Cart – JavaScript OOP & DOM
## 📌 Project Overview

This project is a Shopping Cart application built with vanilla JavaScript using an Object-Oriented Programming (OOP) approach.
It recreates a classic shopping cart system previously implemented with basic JavaScript and DOM manipulation, but this time using classes, inheritance, and encapsulation.

The application allows users to:

-Add products dynamically

-Increase or decrease product quantities

-Remove products from the cart

-Like products (persistent state)

-Automatically calculate the total price

🎯 Learning Objectives

This project was developed to practice and demonstrate:

-JavaScript Object-Oriented Programming

-Class creation and inheritance

-Separation between business logic and DOM manipulation

-Event delegation

-Dynamic DOM rendering

🧱 Project Structure
```js
/js
 ├── script.js        // DOM manipulation & event handling
 ├── models.js        // OOP business logic (Product, Cart, Items)
/style
 └── style.css
index.html
```

## 🧩 Object-Oriented Design

### 1️⃣ Product Class

Represents a product with basic properties.
```js
class Product {
  id
  name
  description
  price
  imageUrl
}
```

### 2️⃣ ShoppingCartItem Class

Represents an item inside the cart.
It inherits from Product and adds cart-specific behavior.
```js
class ShoppingCartItem extends Product {
  quantity
  liked
  totalPrice()
  toggleLike()
}
```
### 3️⃣ ShoppingCart Class

Manages the list of items and all cart operations.

Available methods:

-addItem(product)

-increaseQuantity(id)

-decreaseQuantity(id)

-removeItemById(id)

-getTotalItemQuantity()

-getTotalPrice()

-toggleLike(id)

-displayCartItems()

⚙️ Features

➕ Add products via modal form

🔼 Increase quantity

🔽 Decrease quantity

🗑 Remove product from cart

❤️ Like / Unlike products (state preserved)

💰 Real-time total price calculation

📦 Cart automatically updates after each action

🖥️ Technologies Used

-JavaScript (ES6+)

-HTML5

-CSS3

-Bootstrap 5

-Font Awesome

No frameworks or libraries were used for the logic — pure JavaScript only.

▶️ How to Run the Project

Clone the repository

Open index.html in a browser
(recommended: use Live Server in VS Code)

✅ Requirements Coverage

✔ Create a Product class
✔ Create a ShoppingCartItem class with quantity
✔ Add method to calculate item total price
✔ Create a ShoppingCart class with a list of items
✔ Add, remove, display items
✔ Calculate total quantity and total price
✔ Test object behavior through UI interactions

All requirements have been successfully implemented.

## 📌 Notes

The business logic is fully handled by JavaScript classes.

The DOM is updated dynamically after each cart action.

The project follows clean and scalable OOP principles.

👤 Author

Sylvestre IBOMBO GAKOSSO