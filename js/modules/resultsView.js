import ParentView from "./parentView.js";

class ResultsView extends ParentView {
  _mainElement = document.querySelector(".results");
  _generateHtmlMarkup() {
    return this._data.map(this._generatePreviewMarkup).join("");
  }

  _generatePreviewMarkup(result) {
    return ` <li class="preview">
	 <a class="preview__link "preview__link--active"  
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
