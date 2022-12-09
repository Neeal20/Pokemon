const app = {
  removePlaceHolder: function () {
    const getInputName = document.getElementById("name");

    getInputName.addEventListener("click", () => {
      getInputName.textContent = "";
    });
  },

  openHamburgerRemoveLogo() {
    const navToggler = document.querySelector(".navbar-toggler");
    console.log(navToggler);

    const logo = document.querySelector(".container__principal--logo");
    console.log(logo);

    navToggler.addEventListener("click", () => {
      if (!navToggler.classList.contains("collapsed")) {
        logo.style.display = "none";
      }
    });

  },


  init: function () {
    app.openHamburgerRemoveLogo();
    app.removePlaceHolder();
  }
};

app.init();
