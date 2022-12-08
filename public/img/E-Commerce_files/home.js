const displayHomePage = {
  // Home Page création
  productDisplay: async (product) => {
    fetch(`http://localhost:5500/products`)
      .then((res) => res.json())
      .then((productsData) => {
        document.querySelector(".pro__container").innerHTML = productsData.map(
          (product) =>
            `<div class="pro__container--product">
            <a href="product?id=${product._id}">
              <img src="${product.img}" alt="chemise"></img>
            </a>
            <div class="pro__description">
              <span>${product.brand}</span>
              <h5>${product.name}</h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h4>${product.price}</h4>
            </div>
            <a href="#">
              <i class="fa-regular fa-heart heart"></i>
            </a>
          </div>`
        )
          .join("");
      });
  },

  onScrollNavDisplay: function () {
    const body = document.body;
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        body.classList.remove("scroll-up");
      }
      // Si le scroll actuelle est = 0 et est suéprieur a la dernière valeur de scroll et que le body ne contient pas la classe "scroll down"
      if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
        //  If it's true, we remove the scroll up to add this scroll down
      }
      // We now want to add the reverse effect, (mean to see the navBar again by scrolling up)
      if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
      }
      lastScroll = currentScroll;
    });
  },

  hamburgerMenuMobile: function () {
    const bar = document.getElementById("bar");
    const navBar = document.getElementById("nav__list");
    const close = document.getElementById("close");
    if (bar) {
      bar.addEventListener("click", () => {
        navBar.classList.add("active");
      });
    }

    if (close) {
      close.addEventListener("click", () => {
        navBar.classList.remove("active");
      });
    }
  },

  showCartMenu: function() {
    const openPanelButton = document.getElementById("open__panel");
    const closePanelButton = document.getElementById("close__panel");
    const cartPanel = document.querySelector(".cart__panel");
    openPanelButton.addEventListener("click", () => {
      cartPanel.classList.add("open");
      openPanelButton.classList.add("hide");
    });
    closePanelButton.addEventListener("click", () => {
      cartPanel.classList.remove("open");
      openPanelButton.classList.remove("hide");
    });
  },

  init:function () {
    displayHomePage.productDisplay();
    displayHomePage.onScrollNavDisplay();
    displayHomePage.hamburgerMenuMobile();
    displayHomePage.showCartMenu();
  }
};
displayHomePage.init();

const cart = [];
const numberOfItems = localStorage.length;

function cartContent () {
  window.addEventListener("load", () => {
    ItemsFromStore();
    EachProductToCart();
  });
}

function changeCartIcon() {
  const cartLogoCounter = document.getElementById("cart__logo--counter");
  if (localStorage.length === 0) {
    cartLogoCounter.style.display = "none";
  }
  cartLogoCounter.textContent = localStorage.length;
}

function deleteAllItems() {
  const deleteAllItem = document.getElementById("empty__cart");
  const cartLogoCounter = document.getElementById("cart__logo--counter");
  deleteAllItem.addEventListener("click", () => {
    const numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++) {
      const item = localStorage.getItem(localStorage.key(i));
      const itemObject = JSON.parse(item);
      window.localStorage.clear(itemObject);

      const container = document.querySelector('.cart__content');
      const child = document.querySelector('.cart__products');
      container.removeChild(child);
      deleteAllItem.style.display = "none";
      cartLogoCounter.style.display = "none";
    }
  });
}

function ItemsFromStore () {
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function EachProductToCart() {
  cart.forEach((item) => {
    const createDiv = document.createElement("div");
    const cartProducts = document.querySelector(".cart__products");
    const createElementName = document.createElement("h4");
    const createElementPrice = document.createElement("input");
    const createElementImg = document.createElement('img');
    const createElementQuantity = document.createElement("span");
    const createElementIcon = document.createElement("img");
    const createButtonDelete = document.createElement('button');

    createDiv.classList.add("cart__product");
    createDiv.dataset.id = item.id;
    createElementImg.src = item.imgUrl;
    createElementImg.alt = "chemise";
    createElementImg.classList.add("cart__product--img");
    createElementName.textContent = item.name + " :" + " " + parseInt(item.price,10) * parseInt(item.quantity,10) + ".00€";
    createElementName.classList.add("cart__product--name");
    createElementPrice.classList.add("cart__product--price");
    createElementPrice.type = "text";
    createElementQuantity.classList.add("product__quantity");
    createElementQuantity.id = item.id;
    createElementQuantity.textContent = item.quantity;
    createElementQuantity.value = item.quantity;
    createElementIcon.src = "../../img/x.svg";
    createElementIcon.classList.add("product__delete");
    createButtonDelete.classList.add('button__delete');
    createButtonDelete.dataset.id = item.id;


    cartProducts.appendChild(createDiv);
    createDiv.appendChild(createElementImg);
    createDiv.appendChild(createElementName);
    createDiv.appendChild(createElementQuantity);
    createDiv.appendChild(createButtonDelete);
    createButtonDelete.appendChild(createElementIcon);
  });
}

deleteAllItems();
cartContent();
changeCartIcon();

