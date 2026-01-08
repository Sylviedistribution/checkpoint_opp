import { Product, ShoppingCart } from "./models.js";

// === GET DOM ELEMENTS ===

// New elements
var modalCard = document.getElementById("modal-card");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("close-modal");
var form = document.querySelector(".card-form");
var listProduct = document.getElementById("list-products");
var totalPrice = document.getElementById("total");

// === CORE FUNCTIONS ===

function closeModal() {
  modalCard.style.display = "none";
  console.log("modal closed");
}

closeModalBtn.addEventListener("click", closeModal);

openModalBtn.addEventListener("click", displayModal);

function displayModal() {
  modalCard.style.display = "block";
  console.log("modal opened");
}

form.addEventListener("submit", addProduct);

//Creation of a global basket
const cart = new ShoppingCart();

// Add product to the cart
function addProduct(event) {
  console.log("Adding product...", event);
  event.preventDefault();

  const form = event.target;
  const name = form.name.value;
  const description = form.description.value;
  const price = form.price.value;
  const img = form.img.files[0];
  const imageUrl = URL.createObjectURL(img);

  const product = new Product(Date.now(), name, description, price, imageUrl);
  console.log("Shopping Cart instance:", product);

  // Ajout au panier global
  cart.addItem(product);

  console.log("Cart items:", cart.displayCartItems());

  closeModal();
  renderCart(); // si tu veux mettre à jour le DOM
}

function renderCart() {
  listProduct.innerHTML = "";
  cart.displayCartItems().forEach((item) => {
    listProduct.innerHTML += `
      <div class="card-body-0" data-id="${item.id}">
        <div class="card" style="width: 18rem">
          <img src="${item.imageUrl}" class="card-img-top" />
          <div class="card-body">
            <h5>${item.name}</h5>
            <p>${item.description}</p>
            <h4 class="unit-price">${item.price} $</h4>

            <div>
              <i class="fas fa-plus-circle"></i>
              <span class="quantity">${item.quantity}</span>
              <i class="fas fa-minus-circle"></i>
            </div>

            <div>
              <i class="fas fa-trash-alt"></i>
              <i class="fas fa-heart" style="color: ${ item.liked ? "red" : "black;"}"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  totalPrice.textContent = cart.getTotalPrice() + " $";
}

listProduct.addEventListener("click", (e) => {
  const card = e.target.closest(".card-body-0");
  if (!card) return;

  const id = Number(card.dataset.id);

  if (e.target.classList.contains("fa-plus-circle")) {
    cart.increaseQuantity(id);
  }

  if (e.target.classList.contains("fa-minus-circle")) {
    cart.decreaseQuantity(id);
  }

  if (e.target.classList.contains("fa-trash-alt")) {
    cart.removeItemById(id);
  }

  if (e.target.classList.contains("fa-heart")) {
    cart.toggleLike(id);
  }

  renderCart(); // 👈 INDISPENSABLE
});
