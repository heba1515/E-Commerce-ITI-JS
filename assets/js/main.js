// *reloader
window.addEventListener("load", () => {
  document.querySelector(".preloader").classList.add("preloader-deactivate");
});

// *Features
document
  .querySelector(".pro-features .get-pro")
  .addEventListener("click", () => {
    document.querySelector(".pro-features").classList.toggle("active");
  });

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

// *window scroll
const toTop = document.querySelector(".backTop");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

//      * Logged User and Log out
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const dashboardLink = document.getElementById("dashboard-link");
const logoutBtn = document.getElementById("logout-btn");

if (loggedInUser) {
  loginLink.style.display = "none";
  registerLink.style.display = "none";

  dashboardLink.style.display = "inline";
  dashboardLink.textContent =
    loggedInUser.role === "admin"
      ? `Hi, ${loggedInUser.username} > Dashboard`
      : `Hi, ${loggedInUser.username} > Dashboard`;
  dashboardLink.href =
    loggedInUser.role === "admin"
      ? "../../admin/adminDashboard.html"
      : "../../Customer/UserDashboard.html";

  logoutBtn.style.display = "inline";
} else {
  dashboardLink.style.display = "none";
  logoutBtn.style.display = "none";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
});

//          * swiper
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
});

function updateSlidePosition() {
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlidePosition();
}, 2500);

//      *Get some products in home
const fetchProducts = async () => {
  const productList = document.getElementById("product-list");

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const featuredProducts = products.slice(0, 4);

    featuredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                  <a href="./ProductId.html?id=${product.id}">
                      <img src="${product.image}" alt="${product.title}" >
                  </a>
                  <h3>${product.description}</h3>
                  <p>${product.price} $</p>
                  <p>${product.rating.rate} rate</p>
                  <button onclick="addToCart(${product.id})">Add to Cart</button>
                  <button onclick="addToWishList(${product.id})">Add to Wish List</button>
              `;

      productList.appendChild(productCard);
    });
  } catch (e) {
    console.log("Error", e);
  }
};

fetchProducts();

//        * Add to cart
const addToCart = (id) => {
  const loggedInUser = localStorage.getItem('loggedInUser'); // جلب اسم المستخدم
  if (!loggedInUser) {
    alert("Please login to add items to the cart.");
    return;
  }

  // جلب السلة الخاصة بالمستخدم الحالي، وإذا لم توجد يتم إنشاء سلة فارغة
  let cart = JSON.parse(localStorage.getItem(`${loggedInUser}-cart`)) || [];

  // إضافة المنتج إذا لم يكن موجودًا بالفعل
  if (!cart.includes(id)) cart.push(id);

  // تخزين السلة الخاصة بالمستخدم في localStorage
  localStorage.setItem(`${loggedInUser}-cart`, JSON.stringify(cart));

  alert("Product added to the cart");
};


//          * Add to Wish List
const addToWishList = (id) => {
  let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
  if (!wishList.includes(id)) wishList.push(id);

  localStorage.setItem("wishList", JSON.stringify(wishList));
  alert("Product added to the Wish List");
};