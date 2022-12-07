import ParentView from "./parentView.js";

/**
 *Render the received object to the DOM
 *
 * @this {Object} View instance
 */

class Pagination extends ParentView {
  // query selector
  mainElement = document.querySelector(".pagination");

  /**
   * This method handle the eventlistener
   *
   *
   */
  addPageHandlerClick(handler) {
    this.mainElement.addEventListener("click", function (e) {
      // traverses the element and its parents until it finds a node that matches the specified CSS selector.
      const button = e.target.closest(".button--inline");
      // if there is no button returns immedietly
      if (!button) return;
      // gets current page button
      const goToPage = parseInt(button.dataset.goto);
      console.log(goToPage);
      handler(goToPage);
    });
  }

  /**
   * This method calulates which button to display accordingly when user clicks
   * and how many pages to display
   *
   * @returns {number}
   */
  generateHtmlMarkup() {
    // calculates how many pages are there
    const currentPage = this.data.page;
    const numberOfPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );

    // Page 1, and there are other pages

    if (currentPage === 1 && numberOfPages > 1) {
      // return page 1 and others
      return this.generateMarkupButton("next", currentPage);
    }

    //Last page
    if (currentPage === numberOfPages && numberOfPages > 1) {
      // return last page
      return this.generateMarkupButton("previous", currentPage);
    }
    // Other page
    if (currentPage < numberOfPages) {
      // return other page
      return `${this.generateMarkupButton("previous", currentPage)}
      ${this.generateMarkupButton("next", currentPage)}
      `;
    }
    // Page 1 and if there are NO other pages
    // return only one page
    return "";
  }
  /**
   * This method display the button according to the page we are in
   *
   * @param {string} button
   * @param {number} currentPage
   * @returns {string} htmlMarkupButton
   */
  generateMarkupButton(button, currentPage) {
    return `
    
          <button data-goto="${
            button === "next" ? currentPage + 1 : currentPage - 1
          }"  
                class="button--inline pagination__button--${button}">
                ${
                  button === "next"
                    ? `<span>Page ${currentPage + 1}</span>`
                    : ""
                }
                <svg class="search__icon">
                  <use href="./assets/icons.svg#icon-arrow-${
                    button === "next" ? "right" : "left"
                  }"></use>
                </svg>
                ${
                  button === "previous"
                    ? `<span>Page ${currentPage - 1}</span>`
                    : ""
                }
              
          </button>
          `;
  }
}

export default new Pagination();
