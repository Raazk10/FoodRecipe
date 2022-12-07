import ParentView from "./parentView.js";
/**
 * Render the received object to the DOM
 *
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 *
 * @this {Object} View instance
 */

class ResultsView extends ParentView {
  mainElement = document.querySelector(".results");
  errorMessage = "No recipes found. Please try again!";
  message = "";

  /**
   * here this.data = model.state.search.results
   * map is used here to loop over all the item of recipe
   *
   *
   */
  generateHtmlMarkup() {
    return this.data.map(this.generatePreviewMarkup).join("");
  }

  /**
   *
   * @param {string} result
   *
   */
  generatePreviewMarkup(result) {
    return ` <li class="preview">
					<a class="preview__link"   
					href="#${result.id}">
						<figure class="preview__figure">
						<img src="${result.image}" alt="${result.title}">
						</figure>
						<div class="preview__data">
						<h4 class="preview__title">${result.title}</h4>
						<p class="preview__publisher">${result.publisher}</p>
						
						</div>
					</a>
				</li>`;
  }
}
export default new ResultsView();
