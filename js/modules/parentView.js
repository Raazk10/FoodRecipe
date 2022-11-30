/**
 * Render the received object to the DOM
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
 * @returns {undefined | string} A markup string is returned if render=false
 * @this {Object} View instance
 * @author Raj K Thapa
 * @todo Finish implementation
 */

export default class ParentView {
  _data;

  render(dataitem) {
    this._data = dataitem;
    const htmlMarkup = this._generateHtmlMarkup();
    this._clear();
    this._mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  _clear() {
    this._mainElement.innerHTML = "";
  }

  renderSpinner() {
    const htmlMarkup = `
	<div class="spinner">
	  <svg>
	  <use href="./assets/icons.svg#icon-loader"></use>
	  </svg>
	</div>
 `;
    this._clear();
    this._mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  renderError(message = this._errorMessage) {
    const htmlMarkup = `<div class="error">
  <div>
	 <svg>
		<use href="./assets/icons.svg_icon-alert-triangle"></use>
	 </svg>
  </div>
  <p>${message}</p>
</div>`;
    this._clear();
    this._mainElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
}
