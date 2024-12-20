let productCache = {}; // Cache to store product data

// Function to get current user
const getLoggedInUser = () => {
  return localStorage.getItem("loggedInUser"); // Return the logged-in user
};

// Function to display cart data
const displayCart = async () => {
  const cartBody = document.getElementById("cart-table-body");
  const totalPrice = document.getElementById("total-price");
  const loggedInUser = getLoggedInUser(); // Get the logged-in user
  if (!loggedInUser) {
    // alert("Please login to view your cart.");

    cartBody.innerHTML = `<p style="text-align:center; font-size: 40px; color: #ffba00; margin-top: 100px;"><i class="fa-solid fa-triangle-exclamation"></i> Please login to view your cart!</p>`;
    return;
  }

  // Retrieve cart and quantities for the logged-in user
  let cart = JSON.parse(localStorage.getItem(`${loggedInUser}-cart`)) || [];
  let quantities =
    JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
  let total = 0;

  cartBody.innerHTML = "";

  for (let index = 0; index < cart.length; index++) {
    const id = cart[index];

    // Check if product is already in the cache
    if (!productCache[id]) {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        productCache[id] = product; // Store product in cache
      } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        continue;
      }
    }

    const product = productCache[id];
    if (!quantities[id]) {
      quantities[id] = 1;
    }

    const subtotal = product.price * quantities[id];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-weight: 600">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-image"
        />
      </td>
      <td>${product.title}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>
        <div class="quantity-controls">
          <input
            type="number"
            min="1"
            value="${quantities[id]}"
            id="quantity-${id}"
            onchange="updateQuantity(${id}, this.value, ${product.price})"
          />
          <div class="increaseBtn">
            <button onclick="decreaseQuantity(${id}, ${product.price})">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button onclick="increaseQuantity(${id}, ${product.price})">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td>$<span id="subtotal-${id}">${subtotal.toFixed(2)}</span></td>
      <td>
        <span class="remove-button" onclick="removeProduct(${id})">
          <i class="fa-solid fa-x"></i>
        </span>
      </td>
    `;
    cartBody.appendChild(row);

    total += subtotal;
  }

  totalPrice.innerText = `${total.toFixed(2)} EG`;
  localStorage.setItem(
    `${loggedInUser}-quantities`,
    JSON.stringify(quantities)
  );
};

// Increase quantity and update subtotal
const increaseQuantity = (id, price) => {
  const loggedInUser = getLoggedInUser();
  let quantities =
    JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
  quantities[id] = (quantities[id] || 1) + 1;
  localStorage.setItem(
    `${loggedInUser}-quantities`,
    JSON.stringify(quantities)
  );

  // Update quantity input and subtotal directly
  document.getElementById(`quantity-${id}`).value = quantities[id];
  document.getElementById(`subtotal-${id}`).innerText = (
    quantities[id] * price
  ).toFixed(2);

  // Update total price
  updateTotalPrice();
};

// Decrease quantity and update subtotal
const decreaseQuantity = (id, price) => {
  const loggedInUser = getLoggedInUser();
  let quantities =
    JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
  if (quantities[id] > 1) {
    quantities[id] -= 1;
    localStorage.setItem(
      `${loggedInUser}-quantities`,
      JSON.stringify(quantities)
    );

    // Update quantity input and subtotal directly
    document.getElementById(`quantity-${id}`).value = quantities[id];
    document.getElementById(`subtotal-${id}`).innerText = (
      quantities[id] * price
    ).toFixed(2);

    // Update total price
    updateTotalPrice();
  }
};

// Update total price after quantity change
const updateTotalPrice = () => {
  const loggedInUser = getLoggedInUser();
  let quantities =
    JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
  let cart = JSON.parse(localStorage.getItem(`${loggedInUser}-cart`)) || [];
  let total = 0;

  for (let id of cart) {
    const product = productCache[id];
    if (product) {
      total += product.price * quantities[id];
    }
  }

  document.getElementById("total-price").innerText = `${total.toFixed(2)} EG`;
};

// Update product quantity based on manual input
const updateQuantity = (id, quantity, price) => {
  const loggedInUser = getLoggedInUser();
  let quantities =
    JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
  quantities[id] = parseInt(quantity);
  localStorage.setItem(
    `${loggedInUser}-quantities`,
    JSON.stringify(quantities)
  );

  // Update subtotal directly
  document.getElementById(`subtotal-${id}`).innerText = (
    quantities[id] * price
  ).toFixed(2);

  // Update total price
  updateTotalPrice();
};

// Remove product from the cart
const removeProduct = (id) => {
  const loggedInUser = getLoggedInUser();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let cart = JSON.parse(localStorage.getItem(`${loggedInUser}-cart`)) || [];
      cart = cart.filter((item) => item !== id);
      localStorage.setItem(`${loggedInUser}-cart`, JSON.stringify(cart));

      let quantities =
        JSON.parse(localStorage.getItem(`${loggedInUser}-quantities`)) || {};
      delete quantities[id];
      localStorage.setItem(
        `${loggedInUser}-quantities`,
        JSON.stringify(quantities)
      );

      displayCart(); // Refresh cart view

      Swal.fire({
        title: "Deleted!",
        text: "Product has been removed from the cart.",
        icon: "success",
      });
    }
  });
};

// Initial call to display cart when the page loads
displayCart();
