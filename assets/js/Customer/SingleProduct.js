// *Header scroll
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        var header = document.querySelector(".header");
        if (window.scrollY > 100) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
});



var productImg = document.querySelector(".product-img");
var productTitle = document.querySelector(".product-title");
var productRate = document.querySelector(".stars");
var productPrice = document.querySelector(".price .primary-color");
var discountPercentage = document.querySelector(".price .second-color");
var ratingNum = document.querySelector(".rating span");
var productDiscription = document.querySelector(".product-discription");
var relatedProductRow = document.querySelector(".section-products-row");


var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('productId');


function fetchProductDetails(id) {
    var r = new XMLHttpRequest();
    r.open("GET", `https://dummyjson.com/products/${id}`);
    r.addEventListener("readystatechange", () => {
        if (r.readyState === 4 && r.status == 200) {
            var product = JSON.parse(r.response);

            // Display product details
            productImg.innerHTML = `<img src="${product.images[0]}" alt="" class="productImage">`;
            productTitle.textContent = product.title;
            ratingNum.classList.add('ratingNum');
            ratingNum.textContent = product.rating;
            productPrice.innerHTML = `${product.price}$`;
            // discountPercentage.innerHTML = `${product.discountPercentage}$`
            productDiscription.innerHTML = `<p>${product.description}</p>`;

            // Update stars to match the product rating
            var stars = document.querySelectorAll('.stars .fa-star');
            var roundedRating = Math.round(product.rating);

            stars.forEach(star => {
                var starValue = parseInt(star.getAttribute('data-value'));
                if (starValue <= roundedRating) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });


            fetchRelatedProducts(product.category, id);
        }
    });
    r.send();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProductDetails(productId);
});


function fetchRelatedProducts(category, currentProductId) {
    var r = new XMLHttpRequest();
    r.open("GET", `https://dummyjson.com/products/category/${category}`);
    r.addEventListener("readystatechange", () => {
        if (r.readyState === 4 && r.status == 200) {
            var products = JSON.parse(r.response).products;

            // Filter out the current product
            var relatedProducts = products.filter(product => product.id !== currentProductId);

            // Display related products
            relatedProductRow.innerHTML = '';
            relatedProducts.forEach((product) => {
                relatedProductRow.innerHTML += `
                <div class="related-product-card" data-id="${product.id}">
                    <img src="${product.images[0]}">
                    <div class="related-product-description">
                        <h2>${product.title}</h2>
                        <div class="star">
                            <i class="fa fa-star" data-value="1"></i>
                            <i class="fa fa-star" data-value="2"></i>
                            <i class="fa fa-star" data-value="3"></i>
                            <i class="fa fa-star" data-value="4"></i>
                            <i class="fa fa-star" data-value="5"></i>
                        <span>${product.rating}</span>
                        </div>
                        <h4>${product.price}$</h4>
                    </div>
                    <button onclick="addToCart(${product.id})"><i class="fal fa-shopping-cart cart"></i></button>
                    <button onclick="addToWishList(${product.id})"><i class="fa-regular fa-heart"></i></button>
                </div>
                `;
            });


            // Update stars to match product ratings
            document.querySelectorAll('.related-product-card').forEach((card, index) => {
                var product = relatedProducts[index];
                var roundedRating = Math.round(product.rating);
                var stars = card.querySelectorAll('.fa-star');

                stars.forEach(star => {
                    var starValue = parseInt(star.getAttribute('data-value'));
                    if (starValue <= roundedRating) {
                        star.classList.add('filled');
                    } else {
                        star.classList.remove('filled');
                    }
                });

                // Add click event to redirect to single product page
                card.addEventListener('click', () => {
                    var productId = card.getAttribute('data-id');
                    window.location.href = `SingleProduct.html?productId=${productId}`;
                });
            });
        }
    });
    r.send();
}


//Size Options
document.addEventListener('DOMContentLoaded', () => {
    var sizeOptions = document.querySelectorAll('.product-size ul li a');

    sizeOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault(); 
            sizeOptions.forEach(opt => opt.classList.remove('active-size'));
            option.classList.add('active-size');
        });
    });
});



//Related Products Swipper
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


//* Add to cart
const addToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(id)) cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to the cart");
};


//* Add to Wish List
const addToWishList = (id) => {
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    if (!wishList.includes(id)) wishList.push(id);

    localStorage.setItem("wishList", JSON.stringify(wishList));
    alert("Product added to the Wish List");
};