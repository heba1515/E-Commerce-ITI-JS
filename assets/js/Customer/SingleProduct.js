
var productImg = document.querySelector(".product-img");
var productTitle = document.querySelector(".product-title");
var productRate = document.querySelector(".stars");
var productPrice = document.querySelector(".price .primary-color");
var discountPercentage = document.querySelector(".price .second-color");
var ratingNum = document.querySelector(".rating span");
var productDiscription = document.querySelector(".product-discription");
var extraLink = document.querySelector(".extra-link2")
var relatedProductRow = document.querySelector(".section-products-row");

var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get("productId");

// Fetch product details
function fetchProductDetails(id) {
    const cachedProduct = localStorage.getItem(`product_${id}`);
    if (cachedProduct) {
        displayProductDetails(JSON.parse(cachedProduct));
    } else {
        var r = new XMLHttpRequest();
        r.open("GET", `https://dummyjson.com/products/${id}`);
        r.addEventListener("readystatechange", () => {
            if (r.readyState === 4 && r.status === 200) {
                const product = JSON.parse(r.response);
                localStorage.setItem(`product_${id}`, JSON.stringify(product));
                displayProductDetails(product);
            }
        });
        r.send();
    }
}

// Display product details
function displayProductDetails(product) {
    productImg.innerHTML = `<img src="${product.images[0]}" alt="" class="productImage">`;
    productTitle.textContent = product.title;
    ratingNum.classList.add("ratingNum");
    ratingNum.textContent = product.rating;
    productPrice.innerHTML = `${product.price}$`;
    productDiscription.innerHTML = `<p>${product.description}</p>`;

    extraLink.innerHTML = `
    <button class="btn1" onclick="addToCart(${product.id})">
        <i class="fal fa-shopping-cart cart"></i>
        Add to Cart
    </button>
    <button class="btn2" data-wishlist-id="${product.id}" onclick="addToWishList(${product.id})">
        <i class="fa-regular fa-heart"></i>
    </button>
    `;

    // Check if the product is already in the wishlist and update the style
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(product.id)) {
        updateWishlistButtonStyle(product.id, true);
    }

    updateStars(document.querySelector(".stars"), product.rating);

    fetchRelatedProducts(product.category, product.id);
}

// Fetch related products
function fetchRelatedProducts(category, currentProductId) {
    const cachedCategory = localStorage.getItem(`category_${category}`);
    if (cachedCategory) {
        displayRelatedProducts(JSON.parse(cachedCategory), currentProductId);
    } else {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((response) => response.json())
            .then((data) => {
                const products = data.products;
                localStorage.setItem(`category_${category}`, JSON.stringify(products));
                displayRelatedProducts(products, currentProductId);
            })
            .catch((error) => console.error("Error fetching related products:", error));
    }
}

// Display related products
function displayRelatedProducts(products, currentProductId) {
    const relatedProducts = products.filter((product) => product.id !== currentProductId);
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    relatedProductRow.innerHTML = "";
    relatedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "related-product-card";
        productCard.setAttribute("data-id", product.id);

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}">
            <div class="related-product-description">
                <h2>${product.title}</h2>
                <div class="star" data-rating="${product.rating}">
                    <i class="fa fa-star" data-value="1"></i>
                    <i class="fa fa-star" data-value="2"></i>
                    <i class="fa fa-star" data-value="3"></i>
                    <i class="fa fa-star" data-value="4"></i>
                    <i class="fa fa-star" data-value="5"></i>
                    <span>${product.rating.toFixed(1)}</span>
                </div>
                <h4>${product.price}$</h4>
            </div>
            <button onclick="addToCart(${product.id})"><i class="fal fa-shopping-cart cart"></i></button>
            <button data-wishlist-id="${product.id}" onclick="addToWishList(${product.id})"><i class="fa-regular fa-heart"></i></button>
        `;

        relatedProductRow.appendChild(productCard);

        updateStars(productCard.querySelector(".star"), product.rating);

        // Check if the product is already in the wishlist and update the style
        if (wishlist.includes(product.id)) {
            updateWishlistButtonStyle(product.id, true);
        }

        productCard.addEventListener("click", (event) => {
            if (!event.target.closest("button")) {
                window.location.href = `SingleProduct.html?productId=${product.id}`;
            }
        });
    });
}

// Update stars based on the rating
function updateStars(starContainer, rating) {
    const roundedRating = Math.round(rating);
    const stars = starContainer.querySelectorAll(".fa-star");

    stars.forEach((star) => {
        const starValue = parseInt(star.getAttribute("data-value"), 10);
        if (starValue <= roundedRating) {
            star.classList.add("filled");
        } else {
            star.classList.remove("filled");
        }
    });
}

// Activate size options
document.addEventListener("DOMContentLoaded", () => {
    fetchProductDetails(productId);

    const sizeOptions = document.querySelectorAll(".product-size ul li a");
    sizeOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.preventDefault();
            sizeOptions.forEach((opt) => opt.classList.remove("active-size"));
            option.classList.add("active-size");
        });
    });
});




//* Related Products Swipper
let currentIndex = 0;

function moveSlide(direction) {
    const track = document.querySelector('.section-products-row');
    const slides = document.querySelectorAll('.related-product-card');
    const slideWidth = slides[0].offsetWidth + 20;
    const totalSlides = slides.length;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

