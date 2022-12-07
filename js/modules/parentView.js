/**
 * Render the received object to the DOM
 *
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 *
 * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
 *
 * @this {Object} View instance
 *
 *
 */
export default class ParentView {
  data;

  /**This method gets the data from state object and stores it into this.data
   * which calls the generateHtmlMarkup
   *
   * @param {string} dataitem
   *
   */
  render(dataitem) {
    if (!dataitem || (Array.isArray(dataitem) && dataitem.length === 0))
      return this.renderError();
    this.data = dataitem;
    const htmlMarkup = this.generateHtmlMarkup();
    this.clear();
    // add html to the DOM as a child of the parentElement
    this.mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
  /**
   * This method is responsible for displaying error message in the view
   * if no message is passed then sets the default error message
   * @param {string} message
   */
  renderError(message = this.errorMessage) {
    const htmlMarkup = `<div class="error">
			<div>
			  <svg>
			  <use href="./assets/icons.svg_icon-alert-triangle"></use>
			  </svg>
			</div>
			<p>${message}</p>
	</div>`;
    this.clear();
    // render the html to the page
    this.mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
  /**
   * clears the parent element
   */
  clear() {
    this.mainElement.innerHTML = "";
  }
  /**
   * This method creates the spinner loader before anything is loaded on the screen
   *
   */
  renderSpinner() {
    const htmlMarkup = `
    <div class="spinner">
          <svg>
          <use href="./assets/icons.svg#icon-loader"></use>
          </svg>
    </div>
          `;
    this.clear();
    this.mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
}
