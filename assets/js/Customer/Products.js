
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
var r = new XMLHttpRequest();

r.open("GET", "https://dummyjson.com/products/");
r.addEventListener("readystatechange", () => {
    if (r.readyState === 4 && r.status == 200) {
        var product = JSON.parse(r.response).products;
        console.log(product);
        for(let i in product){
            productsSection.innerHTML += `
            <div class="product" data-id="${product[i].id}">
                <img src="${product[i].thumbnail}">
                <div class="description">
                    <h5>${product[i].title}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4><span class="price">${product[i].price}$</span></h4>
                </div>
                
                <button onclick="addToCart(${product[i].id})"><i class="fal fa-shopping-cart cart"></i></button>
            </div>
            `;
        }

        var products = document.querySelectorAll('.product');
        products.forEach((product) => {
            product.addEventListener('click', () => {
                var productId = product.getAttribute('data-id');
                window.location.href = `SingleProduct.html?productId=${productId}`;
            });
        });
    }
});
r.send();


// Add to Cart
function addToCart(productId) {
    // var cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    // const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    // const product = products.find(p => p.id === productId);

    // if (product) {
    //     cart.push(product);
    //     localStorage.setItem(CART_KEY, JSON.stringify(cart));
    //     alert('Product added to cart!');
    // }
}

// Filter by Category
function getByCategory(category) {
    productsSection.innerHTML = ""
    r.open("GET", `https://dummyjson.com/products/category/${category}`);
    r.send()
}

// Search Bar
var searchInput = document.querySelector(".search");
function search() {
    var value = searchInput.value;
    productsSection.innerHTML = ""
    r.open("GET", `https://dummyjson.com/products/search?q=${value}`);
    r.send()
}



// r.open("GET", "https://fakestoreapi.com/products");
// r.addEventListener("readystatechange", () => {
//     if (r.readyState === 4 && r.status == 200) {
//         var product = JSON.parse(r.response);
//         console.log(product);
//         for (let i in product) {
//             productsSection.innerHTML += `
//             <div class="product">
//                 <img src="${product[i].image}">
//                 <div class="description">
//                     <h5>${product[i].title}</h5>
//                     <div class="star">
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <i class="fas fa-star"></i>
//                         <span>${product[i].rating.rate}</span>
//                     </div>
//                     <h4>${product[i].price}$</h4>
//                 </div>
//                 <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
//             </div>
//             `
//         }
//     }
// });
// r.send();


// function getByCategory(category) {
//     productsSection.innerHTML = ""
//     r.open("GET", `https://fakestoreapi.com/products/category/${category}`);
//     r.send()
// }

// var searchInput = document.querySelector(".search");
// function search() {
//     var value = searchInput.value;
//     productsSection.innerHTML = ""
//     r.open("GET", `https://fakestoreapi.com/products/search?q=${value}`);
//     r.send()
// }