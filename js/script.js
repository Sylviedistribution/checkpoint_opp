// === GET DOM ELEMENTS ===
var iconRemoveItem = document.getElementsByClassName("fa-minus-circle");
var iconAddItem = document.getElementsByClassName("fa-plus-circle");
var like = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash-alt");
var card = document.getElementsByClassName("card-body-0");

var quantity = document.getElementsByClassName("quantity");
var unitPrice = document.getElementsByClassName("unit-price");
var totalPrice = document.getElementById("total");

var temp;

// === CORE FUNCTIONS ===

// Always recalc the total instead of maintaining a global state (avoids NaN or drift issues)
function recalcTotal() {
  let total = 0;
  for (let i = 0; i < quantity.length; i++) {
    let price = parseFloat(unitPrice[i].textContent) || 0;
    let qte = parseInt(quantity[i].textContent) || 0;
    total += price * qte; // recompute based on DOM state (source of truth)
  }
  totalPrice.textContent = total + " $";
}

// Prevents the user from decreasing below 0 (UX safeguard + visual feedback)
function updateRemoveButton(i) {
  if (parseInt(quantity[i].textContent) === 0) {
    iconRemoveItem[i].style.opacity = "0.5";
    iconRemoveItem[i].disabled = true; // semantic, even if <i> doesn’t really disable
  } else {
    iconRemoveItem[i].style.opacity = "1";
    iconRemoveItem[i].disabled = false;
  }
}

// === INIT STATE ===
// Ensure "-" button reflects initial cart state
for (let i = 0; i < quantity.length; i++) {
  updateRemoveButton(i);
}

// === EVENTS ===

// Decrease quantity
for (let i = 0; i < iconRemoveItem.length; i++) {
  iconRemoveItem[i].onclick = function () {
    let temp = parseInt(quantity[i].textContent);
    if (temp > 0) {
      quantity[i].textContent = temp - 1;
      recalcTotal(); // avoids NaN: always recompute total from DOM
      updateRemoveButton(i); // keep "-" button in sync
    }
  };
}

// Increase quantity
for (let i = 0; i < iconAddItem.length; i++) {
  iconAddItem[i].onclick = function () {
    let temp = parseInt(quantity[i].textContent);
    quantity[i].textContent = temp + 1;
    recalcTotal();
    updateRemoveButton(i); // "-" may now become active
  };
}

// Toggle "like" → simplest way: color feedback (black ↔ red)
for (let i = 0; i < like.length; i++) {
  like[i].onclick = function () {
    if (like[i].style.color === "red") {
      like[i].style.color = "black";
    } else {
      like[i].style.color = "red";
    }
  };
}

// Remove item completely from the cart
for (let i = 0; i < trash.length; i++) {
  trash[i].onclick = function () {
    if (confirm("Do you really want to delete this item?")) {
      card[i].remove(); // remove DOM node = instant visual update
      recalcTotal(); // recompute based on remaining items
    }
  };
}
