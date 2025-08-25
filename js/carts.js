function updateBadge() {
  const badge = document.querySelector("header .shopping-cart .badge");
  if (!badge) return; // لو الصفحة ملهاش بادچ

  const cart = JSON.parse(localStorage.getItem("Product-in-cart")) ?? [];
  const totalQuantity = cart.reduce((sum, it) => sum + it.selectedNumber, 0);

  badge.textContent = totalQuantity;
}

// استدعاء أول ما الصفحة تفتح
document.addEventListener("DOMContentLoaded", updateBadge);

// ================== Cart System ==================
const totalPrice = document.querySelector(
  "main .products-in-cart .total-price"
);
let productLocalStorage = localStorage.getItem("Product-in-cart");
const productSelected = document.querySelector(".products-in-cart .row");

let productsInCart = productLocalStorage ? JSON.parse(productLocalStorage) : [];

if (productsInCart.length > 0) {
  drawCartProducts(productsInCart);
}

function drawCartProducts(products) {
  let cards = products.map((item) => {
    const priceNum = item.price.split(" ")[1];

    let price = parseInt(priceNum) * item.selectedNumber;
    return `
    <div class="col" data-id="${item.id}">
      <div class="card card-outlined mb-3">
        <div class="row g-0 h-100">
          <div class="col-lg-4 image">
            <img
              src="${item.url}"
              alt="${item.alt}"
            />
          </div>
          <div class="col-lg-8">
            <div class="card-body text-center text-lg-start">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-category fs-4">${item.category}</p>
              <p class="card-price fs-4">Price: ${price + "$"}</p>
              <div class="card-actions d-flex flex-column flex-lg-row gap-3 justify-content-lg-between">
                <div class="left-side">
                  <button type="button" class="btn btn-outline-secondary decrease">-</button>
                  <span class="mx-2 fs-5">${item.selectedNumber}</span>
                  <button type="button" class="btn btn-outline-secondary increase">+</button>
                </div>
                <div class="right-side">
                  <button type="button" class="btn btn-danger remove">Remove from Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  });

  productSelected.innerHTML = cards.join("");

  document.querySelectorAll(".col").forEach((col) => {
    const id = parseInt(col.getAttribute("data-id"));
    col
      .querySelector(".increase")
      .addEventListener("click", () => updateQuantity(id, 1));
    col
      .querySelector(".decrease")
      .addEventListener("click", () => updateQuantity(id, -1));
    col
      .querySelector(".remove")
      .addEventListener("click", () => removeProduct(id));
  });

  calculateTotal();
}

function updateQuantity(id, change) {
  let product = productsInCart.find((p) => p.id === id);
  if (product) {
    product.selectedNumber += change;
    if (product.selectedNumber <= 0) {
      productsInCart = productsInCart.filter((p) => p.id !== id);
    }
    saveAndRedraw();
  }
}

function removeProduct(id) {
  productsInCart = productsInCart.filter((p) => p.id !== id);
  saveAndRedraw();
}

function saveAndRedraw() {
  localStorage.setItem("Product-in-cart", JSON.stringify(productsInCart));
  drawCartProducts(productsInCart);
  updateBadge();
}

function calculateTotal() {
  let total = productsInCart.reduce((sum, item) => {
    let priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + priceNum * item.selectedNumber;
  }, 0);

  if (totalPrice) {
    totalPrice.textContent = `Total Price: ${total}$`;
  }
}

// ================== favorites System ==================
let favoritesLocalStorage = localStorage.getItem("favorites");
const favoritesContainer = document.querySelector(
  ".favorite .container .content"
);

let favorites = favoritesLocalStorage ? JSON.parse(favoritesLocalStorage) : [];

if (favorites.length > 0) {
  drawfavoriteProducts(favorites);
}

function drawfavoriteProducts(products) {
  let cards = products.map((item) => {
    return `
      <div class="card card-outlined text-center overflow-hidden" data-id="${item.id}">
        <img src="${item.url}" height="70%" alt="${item.alt}" />
        <div class="card-body">
          <h5 class="card-title product-name">${item.title}</h5>
          <p class="card-text product-category">${item.category}</p>
          <div class="card-action">
            <i class="fa-solid fa-heart favorite-icon text-danger"></i>
          </div>
          <!-- /card-action --> 
        </div>
        <!-- /card-body --> 
      </div>
      <!-- /card --> 
      `;
  });

  favoritesContainer.innerHTML = cards.join("");

  document.querySelectorAll(".favorite .card").forEach((card) => {
    const id = parseInt(card.getAttribute("data-id"));
    card
      .querySelector(".favorite-icon")
      .addEventListener("click", () => removeFromfavorites(id));
  });
}

function addTofavorites(product) {
  if (!favorites.some((p) => p.id === product.id)) {
    favorites.push(product);
    saveAndRedrawfavorites();
  }
}

function removeFromfavorites(id) {
  favorites = favorites.filter((p) => p.id !== id);
  saveAndRedrawfavorites();
}

function saveAndRedrawfavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  drawfavoriteProducts(favorites);
}
