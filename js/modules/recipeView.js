import ParentView from "./parentView.js";

class RecipeView extends ParentView {
  _mainElement = document.querySelector(".recipe");

  addRecipeEventHandler(handler) {
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  _generateHtmlMarkup() {
    return ` 
				<figure class="recipe__figure">
				<img src="${this._data.image}" alt="${this._data.title}" 
			class="recipe__image" />
				<h1 class="recipe__title">
				<span>${this._data.title}</span>
				</h1>
			</figure>

	 <div class="recipe__details">
			<div class="recipe__info">
			<svg class="recipe__info-icon">
				<use href="./assets/icons.svg#icon-clock"></use>
			</svg>
			<span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
			<span class="recipe__info-text">minutes</span>
			</div>
			<div class="recipe__info">
			<svg class="recipe__info-icon">
				<use href="./assets/icons.svg#icon-users"></use>
			</svg>
			<span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
			<span class="recipe__info-text">servings</span>

			<div class="recipe__info-buttons">
				<button class="button--tiny button--increase-servings">
					<svg>
					<use href="./assets/icons.svg#icon-minus-circle"></use>
					</svg>
				</button>
				<button class="button--tiny button--increase-servings">
					<svg>
					<use href="./assets/icons.svg#icon-plus-circle"></use>
					</svg>
				</button>
			</div>
		</div>

			<div class="recipe__user-generated">
			<svg>
				<use href="./assets/icons.svg#icon-user"></use>
			</svg>
			</div>
			<button class="button--round">
			<svg class="">
				<use href="./assets/icons.svg#icon-bookmark-fill"></use>
			</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<h2 class="heading--2">Recipe ingredients</h2>
			<ul class="recipe__ingredient-list">
			${this._data.ingredients.map(this._generateIngredientHtmlMarkup).join("")}
			</div>
		

		<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
			This recipe was carefully designed and tested by
			<span class="recipe__publisher">${this._data.publisher}</span>. Please check out
			directions at their website.
			</p>
			<a class="button--small recipe__button" href="${this._data.sourceUrl}"
			target="_blank">
			<span>Directions</span>
			<svg class="search__icon">
				<use href="./assets/icons.svg#icon-arrow-right"></use>
			</svg>
			</a>
		</div>
	 
	 
	 
`;
  }

  _generateIngredientHtmlMarkup(ingr) {
    return `
<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="./assets/icons.svg#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${ingr.quantity ? ingr.quantity : ""}</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ingr.unit}</span>
    ${ingr.description}
    </div>
`;
  }
}

export default new RecipeView();
