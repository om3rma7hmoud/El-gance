const links = document.querySelector("header nav .links");
const loginInfo = document.querySelector("header nav .login-info");
const username = document.querySelector("header nav .login-info .user-name");

if (localStorage.getItem("first-name")) {
  links.remove();
  loginInfo.style.display = "flex";
  username.innerHTML = `Hello, ${localStorage.getItem("first-name")}`;
}

const logout = document.querySelector("header nav .login-info .logout");
logout.addEventListener("click", function () {
  const agree = confirm("Are you sure you want to log out?");
  if (agree) {
    localStorage.clear();
    setTimeout(() => {
      location = "login.html";
    }, 1500);
  }
});

const allProducts = document.querySelector(".products .row");

let thisId = 1;
let products = [
  {
    id: thisId++,
    title: "Golden Watch",
    price: "Price: 400$",
    category: "Category: Watches",
    url: "./imgs/golden-watch.jpg",
    alt: "golden watch",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Silver Necklace",
    price: "Price: 150$",
    category: "Category: Necklace",
    url: "./imgs/silver-necklace.jpg",
    alt: "silver necklace",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Golden Earrings",
    price: "Price: 200$",
    category: "Category: Bracelet",
    url: "./imgs/golden-earrings.jpg",
    alt: "golden earrings",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Black Watch",
    price: "Price: 350$",
    category: "Category: Watches",
    url: "./imgs/black-watch.jpg",
    alt: "black watch",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Silver Set Rings",
    price: "Price: 580$",
    category: "Category: Rings",
    url: "./imgs/silver-set-rings.jpg",
    alt: "silver set rings",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Silver Watch",
    price: "Price: 150$",
    category: "Category: Watches",
    url: "./imgs/silver-watch.jpg",
    alt: "silver watch",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Black Bracelet",
    price: "Price: 100$",
    category: "Category: Bracelet",
    url: "./imgs/black-bracelet.jpg",
    alt: "Black bracelet",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Silver bracelet",
    price: "Price: 100$",
    category: "Category: Bracelet",
    url: "./imgs/woman-bracelet.jpg",
    alt: "silver bracelet",
    selectedNumber: 0,
  },
  {
    id: thisId++,
    title: "Golden Set Bracelet",
    price: "Price: 300$",
    category: "Category: Bracelet",
    url: "./imgs/golden-set-bracelet.jpg",
    alt: "golden bracelet",
    selectedNumber: 0,
  },
];

///////////////////////////////////////////////////////////////////////////////////
// Search system
const searchSelect = document.querySelector(".search select"); //  (name / category)
const searchInput = document.querySelector(".search input[type='text']");

// Function to render products
function renderProducts(list) {
  let productsMap = list.map((item) => {
    return `
    <div class="col">
      <div class="card overflow-hidden">
        <img
          src=${item.url}
          class="card-img-top"
          height="250"
          alt=${item.alt}
        />
        <div class="card-body">
          <h5 class="card-title product-name">${item.title}</h5>
          <p class="card-text product-price">${item.price}</p>
          <p class="card-text product-category">${item.category}</p>
          <div class="card-action">
            <button
              type="button"
              onClick="addToCart(${item.id})"
              class="btn btn-primary add-item me-2"
              data-id=${item.id}
            >
              Add to Cart
            </button>
            <button class="btn btn-danger remove-item me-2" data-id=${item.id}>
              Remove from cart
            </button>
            <i class="fa-solid fa-heart favorite"></i>
          </div>
        </div>
      </div>
    </div>`;
  });
  allProducts.innerHTML = productsMap.join("");
}

// استدعاء الفلترة عند الكتابة
searchInput.addEventListener("input", filterProducts);
searchSelect.addEventListener("change", filterProducts);

function filterProducts() {
  const type = searchSelect.value; // product-name OR category
  const text = searchInput.value.toLowerCase().trim();

  let filtered = products.filter((p) => {
    if (type === "product-name") {
      return p.title.toLowerCase().includes(text);
    } else if (type === "category") {
      return p.category.toLowerCase().includes(text);
    }
  });

  renderProducts(filtered);
}
///////////////////////////////////////////////////////////////////////////////////

/* Products To Show at The Page */
let productsMap = products.map((item) => {
  return `
  <div class="col">
    <div class="card overflow-hidden" data-id="${item.id}">
    <img
    src=${item.url}
    class="card-img-top"
    height="250"
    alt=${item.alt}
    />
      <div class="card-body">
        <h5 class="card-title product-name">${item.title}</h5>
        <p class="card-text product-price">${item.price}</p>
        <p class="card-text product-category">${item.category}</p>
      <div class="card-action">
        <button
        type="button"
        onClick="addToCart(${item.id})"
        class="btn btn-primary add-item me-2 "
        data-id=${item.id}
        >
        Add to Cart
        </button>
        <button class="btn btn-danger remove-item me-2" data-id=${item.id}>
          Remove from cart
        </button>
        <i class="fa-solid fa-heart favorite" ></i>
        </div>
      <!-- /card-action -->
      </div>
      <!-- /card-body -->
    </div>
    <!-- /card -->
  </div>
  <!-- /col -->
  `;
});
allProducts.innerHTML = productsMap.join("");
/*=== Products To Show at The Page ===*/

/////////////////////////////////////////////////////////////////////////////////////////////
/* Renders and functions of adding to the cart */
const cartProductDiv = document.querySelector(
  "header nav .login-info .cart-products div .card .card-body"
);

const badge = document.querySelector(".badge");

let addedItem = JSON.parse(localStorage.getItem("Product-in-cart")) ?? [];

function renderCart() {
  cartProductDiv.innerHTML = "";
  addedItem.forEach((item) => {
    const [firstWord, secondWord] = item.title.split(" ");
    const [priceWord, priceNum] = item.price.split(" ");

    let totalPrice = Number(item.selectedNumber) * parseInt(priceNum);

    cartProductDiv.innerHTML += `
    <div
    class="product d-flex gap-4 flex-column flex-md-row my-3 text-center text-md-start bg-secondary-subtle p-3"
    data-id="${item.id}"
    >
    <div class="left-side">
    <div class="product-title mb-3 fs-4 fw-semibold">
    ${firstWord}<br class="d-none d-md-block" /> ${secondWord}
    </div>
          <div class="quantity">
            <button type="button" class="btn btn-outline-secondary decrease">-</button>
            <span class="mx-2">${item.selectedNumber}</span>
            <button type="button" class="btn btn-outline-secondary increase">+</button>
            </div>
            </div>
            <div class="right-side price fs-5">
            ${priceWord}<br class="d-none d-md-block" /> ${totalPrice + "$"}
            </div>
            </div>`;
  });

  const totalQuantity = addedItem.reduce(
    (sum, it) => sum + it.selectedNumber,
    0
  );
  badge.innerHTML = totalQuantity;

  // Attach events for + and -
  document.querySelectorAll(".product").forEach((prod) => {
    const id = parseInt(prod.getAttribute("data-id"));
    prod
      .querySelector(".increase")
      .addEventListener("click", () => updateQuantity(id, 1));
    prod
      .querySelector(".decrease")
      .addEventListener("click", () => updateQuantity(id, -1));
  });
}

function updateQuantity(id, change) {
  const item = addedItem.find((p) => p.id === id);
  if (item) {
    item.selectedNumber += change; // Increase and Decreade by one
    if (item.selectedNumber == 0) {
      addedItem = addedItem.filter((p) => p.id !== id);
    }
    localStorage.setItem("Product-in-cart", JSON.stringify(addedItem));
    renderCart();
  }
}

function updateCartButtonsDisplay() {
  products.forEach((product) => {
    const addBtn = document.querySelector(`.add-item[data-id="${product.id}"]`);
    const removeBtn = document.querySelector(
      `.remove-item[data-id="${product.id}"]`
    );
    const inCart = addedItem.some((item) => item.id === product.id);
    if (addBtn && removeBtn) {
      if (inCart) {
        addBtn.style.display = "none";
        removeBtn.style.display = "inline";
      } else {
        addBtn.style.display = "inline";
        removeBtn.style.display = "none";
      }
    }
  });
}

// Call this after every cart change and after rendering products
renderCart();
updateCartButtonsDisplay();

function addToCart(id) {
  if (!localStorage.getItem("first-name")) {
    location = "login.html";
    return;
  }
  const choosenItem = products.find((item) => item.id === id);
  const exist = addedItem.find((p) => p.id === id);

  animation(id);

  if (exist) {
    exist.selectedNumber++;
  } else {
    choosenItem.selectedNumber = 1;
    addedItem.push({ ...choosenItem });
  }
  localStorage.setItem("Product-in-cart", JSON.stringify(addedItem));
  renderCart();
  updateCartButtonsDisplay();
}

// Add this after rendering products to attach remove event listeners
document.querySelectorAll(".remove-item").forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = parseInt(btn.getAttribute("data-id"));
    animation(id);
    // Remove from addedItem
    addedItem = addedItem.filter((item) => item.id !== id);
    localStorage.setItem("Product-in-cart", JSON.stringify(addedItem));
    renderCart();
    updateCartButtonsDisplay();
    // Toggle buttons
    const addButton = document.querySelector(
      `.products .card button.add-item[data-id="${id}"]`
    );
    btn.style.display = "none";
    if (addButton) addButton.style.display = "inline";
  });
});

renderCart();

/*=== Renders and functions of adding to the cart ===*/
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

const favButtons = document.querySelectorAll(".favorite");
let favItems = JSON.parse(localStorage.getItem("favorites")) ?? [];

// Set initial color and attach event listeners ONCE
favButtons.forEach((btn, index) => {
  const product = products[index];
  if (favItems.some((p) => p.id === product.id)) {
    btn.style.color = "red";
  } else {
    btn.style.color = "black";
  }
  btn.addEventListener("click", () => {
    const exist = favItems.find((p) => p.id === product.id);
    animation(product.id);
    if (!exist) {
      favItems.push(product);
      btn.style.color = "red";
    } else {
      favItems = favItems.filter((p) => p.id !== product.id);
      btn.style.color = "black";
    }
    localStorage.setItem("favorites", JSON.stringify(favItems));
  });
});

///////////////////////////////////////////////////////////////////////////////////

/* Open and Close the cart */
const shoppingCartIcon = document.querySelector(
  "header nav .login-info .shopping-cart-action"
);

const cartProducts = document.querySelector(
  "header nav .login-info .cart-products"
);

shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
  if (cartProductDiv.innerHTML != "") {
    if (cartProducts.style.display == "block") {
      cartProducts.style.display = "none";
    } else {
      cartProducts.style.display = "block";
    }
  }
}
/*=== Open and Close the cart ===*/

function animation(id) {
  const cartDiv = document.querySelector(`.col .card[data-id="${id}"]`);
  cartDiv.style.animation = "none";
  cartDiv.offsetHeight;
  cartDiv.style.setProperty("animation", "click 0.1s 1 linear");
}
