import ParentView from "./parentView.js";

class Pagination extends ParentView {
  _mainElement = document.querySelector(".pagination");

  addPageHandlerClick(handler) {
    this._mainElement.addEventListener("click", function (e) {
      const button = e.target.closest(".button--inline");
      if (!button) return;
      const slidePage = +button.dataset.goto;
      handler(slidePage);
    });
  }

  _generateHtmlMarkup() {
    const currentPage = this._data.page;
    const numberPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages

    if (currentPage === 1 && numberPages > 1) {
      return this._generateMarkupButton("next", currentPage);
    }

    //Last page
    if (currentPage === numberPages && numberPages > 1) {
      return this._generateMarkupButton("previous", currentPage);
    }
    // Other page
    if (currentPage < numberPages) {
      return `${this._generateMarkupButton("previous", currentPage)}
      ${this._generateMarkupButton("next", currentPage)}
      `;
    }
    // Page 1 and if there are NO other pages
    return "";
  }
  _generateMarkupButton(button, currentPage) {
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
