
// **fixed sidebar
var fixed = document.getElementById("sidebar");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 265) {
        fixed.classList.add("fixed");
    } else {
        fixed.classList.remove("fixed");
    }
});


var productsSection = document.getElementById("product-container");
var localStorageKey = "productsData";

// Function to fetch and store products in local storage
function fetchAllProducts() {
    var r = new XMLHttpRequest();
    r.open("GET", "https://dummyjson.com/products/");
    r.addEventListener("readystatechange", () => {
        if (r.readyState === 4 && r.status == 200) {
            var products = JSON.parse(r.response).products;

            localStorage.setItem(localStorageKey, JSON.stringify(products));
            displayAllProducts(products);
        }
    });
    r.send();
}

// Display products
function displayAllProducts(products) {
    productsSection.innerHTML = "";
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    products.forEach((product) => {
        const productsCard = document.createElement("div");
        productsCard.className = "product";
        productsCard.setAttribute("data-id", product.id);
        productsCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="description">
                <h5>${product.title}</h5>
                <div class="star" data-rating="${product.rating}">
                    <i class="fa fa-star" data-value="1"></i>
                    <i class="fa fa-star" data-value="2"></i>
                    <i class="fa fa-star" data-value="3"></i>
                    <i class="fa fa-star" data-value="4"></i>
                    <i class="fa fa-star" data-value="5"></i>
                    <span>${product.rating}</span>
                </div>
                <h4>${product.price}$</h4>
            </div>
            <button class="cart-button"><i class="fal fa-shopping-cart cart"></i></button>
            <button class="wishlist-button" data-wishlist-id="${product.id}"><i class="fa-regular fa-heart"></i></button>
        `;

        // redirect to SingleProduct page
        productsCard.addEventListener("click", () => {
            var productId = productsCard.getAttribute("data-id");
            window.location.href = `SingleProduct.html?productId=${productId}`;
        });

        // Prevent card click when clicking the "Add to Cart" button
        const cartButton = productsCard.querySelector(".cart-button");
        cartButton.addEventListener("click", (event) => {
            event.stopPropagation();
            addToCart(product.id);
        });

        // Prevent card click when clicking the "Add to Wishlist" button
        const wishlistButton = productsCard.querySelector(".wishlist-button");
        wishlistButton.addEventListener("click", (event) => {
            event.stopPropagation(); 
            addToWishList(product.id);
        });

        productsSection.appendChild(productsCard);

        // Check if the product is already in the wishlist and update the style
        if (wishlist.includes(product.id)) {
            updateWishlistButtonStyle(product.id, true);
        }
    });

    // Update the stars for each product
    updateProductStars();
}

// Update product stars based on ratings
function updateProductStars() {
    var starContainers = document.querySelectorAll(".star");
    starContainers.forEach((container) => {
        const rating = parseFloat(container.getAttribute("data-rating"));
        const stars = container.querySelectorAll(".fa-star");

        stars.forEach((star) => {
            if (parseFloat(star.getAttribute("data-value")) <= rating) {
                star.classList.add("active-star");
            } else {
                star.classList.remove("active-star");
            }
        });
    });
}

// Initialize the page with products
function initProducts() {
    var storedProducts = localStorage.getItem(localStorageKey);
    if (storedProducts) {
        var products = JSON.parse(storedProducts);
        displayAllProducts(products);
    } else {
        fetchAllProducts();
    }
}

// Filter products by category
function getByCategory(category) {
    var r = new XMLHttpRequest();
    r.open("GET", `https://dummyjson.com/products/category/${category}`);
    r.addEventListener("readystatechange", () => {
        if (r.readyState === 4 && r.status == 200) {
            var products = JSON.parse(r.response).products;

            localStorage.setItem(localStorageKey, JSON.stringify(products));
            displayAllProducts(products);
        }
    });
    r.send();
}

// Search products
var searchInput = document.querySelector(".search");
function search() {
    var value = searchInput.value;
    var r = new XMLHttpRequest();
    r.open("GET", `https://dummyjson.com/products/search?q=${value}`);
    r.addEventListener("readystatechange", () => {
        if (r.readyState === 4 && r.status == 200) {
            var products = JSON.parse(r.response).products;

            localStorage.setItem(localStorageKey, JSON.stringify(products));
            displayAllProducts(products);
        }
    });
    r.send();
}

// Initialize products on page load
document.addEventListener("DOMContentLoaded", () => {
    initProducts();
});