class searchView {
  /* query selectors */
  searchButton = document.querySelector(".search__button");

  _mainElement = document.querySelector(".search");

  getQuery() {
    return this._mainElement.querySelector(".search__field").value;
  }
  addSearchEventHandler(handler) {
    this._mainElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
