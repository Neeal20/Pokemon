const app = {
  removePlaceHolder: function () {
    const getInputName = document.getElementById("name");

    getInputName.addEventListener("click", () => {
      getInputName.textContent = "";
    });
  },

  init: function () {
    app.removePlaceHolder();
  }
};

app.init();
