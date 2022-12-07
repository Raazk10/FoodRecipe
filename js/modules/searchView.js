/**
 * Render the received object to the DOM
 * @this {Object} View instance
 */

class searchView {
  /* query selectors */
  searchButton = document.querySelector(".search__button");

  mainElement = document.querySelector(".search");

  /**
   * This method is responsible for getting search query
   *
   * @returns query
   */
  getQuery() {
    const query = this.mainElement.querySelector(".search__field").value;
    this.clearInput();
    return query;
  }

  // clear the search field after searching the item
  clearInput() {
    this.mainElement.querySelector(".search__field").value = "";
  }

  /**
   * This method is responsible for adding eventlistener
   *
   * calls the handler function
   */
  addSearchEventHandler(handler) {
    // this eventlistener works for both click and enter event
    // here cannot directly call handler function
    this.mainElement.addEventListener("submit", function (e) {
      // when submitting form needs to prevent default action
      // because page is going to reload
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
