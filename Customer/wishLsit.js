// Display the wishlist
const displayWishList = async () => {
  const wishContainer = document.getElementById("wish-container");
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];

  wishContainer.innerHTML = "";

  for (let id of wishList) {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      const wishItem = document.createElement("div");
      wishItem.className = "product-card";
      wishItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price.toFixed(2)} $</p>
            <button class="remove" onclick="removeFromWishList(${
              product.id
            })">Remove</button>
        `;
      wishContainer.appendChild(wishItem);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
    }
  }
};

// Remove an item from the wishlist
const removeFromWishList = (Pid) => {
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  wishList = wishList.filter((id) => id !== Pid);
  localStorage.setItem("wishList", JSON.stringify(wishList));

  displayWishList();
  alert("Product removed from the wishlist");
};

displayWishList();
