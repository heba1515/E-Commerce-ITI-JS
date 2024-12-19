const displayCart = async () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPrice = document.getElementById("total-price");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartContainer.innerHTML = "";

  for (let id of cart) {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      const cartItem = document.createElement("div");
      cartItem.className = "product-card";
      cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price.toFixed(2)} $</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
      cartContainer.appendChild(cartItem);
      total += product.price;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
    }
  }

  totalPrice.innerText = `Total: ${total.toFixed(2)} $`;
};

// Remove an item from the cart
const removeFromCart = (Pid) => {
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
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((id) => id !== Pid);
      localStorage.setItem("cart", JSON.stringify(cart));

      displayCart();

      Swal.fire({
        title: "Deleted!",
        text: "Product has been removed from the cart.",
        icon: "success",
      });
    }
  });
};

displayCart();
