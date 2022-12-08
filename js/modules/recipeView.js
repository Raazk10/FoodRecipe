import ParentView from "./parentView.js";
/**
 * Render the received object to the DOM
 *
 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
 * @this {Object} View instance
 */

class RecipeView extends ParentView {
  mainElement = document.querySelector(".recipe");
  /**
   * this method  listens for events(addeventListener)
   *
   * loop over the array of  differnet event
   *
   * array contain haschange and load event
   *
   * calls the function handler as soon as event happens
   * @param {function} handler
   */
  addRecipeEventHandler(handler) {
    // 1st iteration haschange and 2nd iteration load
    ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
  }

  /**
   * this method returns the html markuUp for the recipeView
   *
   *
   */
  generateHtmlMarkup() {
    return ` 
				<figure class="recipe__figure">
				<img src="${this.data.image}" alt="${this.data.title}" 
			class="recipe__image" />
				<h1 class="recipe__title">
				<span>${this.data.title}</span>
				</h1>
			</figure>

	 <div class="recipe__details">
			<div class="recipe__info">
			<svg class="recipe__info-icon">
				<use href="./assets/icons.svg#icon-clock"></use>
			</svg>
			<span class="recipe__info-data recipe__info-data--minutes">${
        this.data.cookingTime
      }</span>
			<span class="recipe__info-text">minutes</span>
			</div>
			<div class="recipe__info">
			<svg class="recipe__info-icon">
				<use href="./assets/icons.svg#icon-users"></use>
			</svg>
			<span class="recipe__info-data recipe__info-data--people">${
        this.data.servings
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
			
			${this.data.ingredients.map(this.generateIngredientHtmlMarkup).join("")} 
			</div>
		

		<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
			This recipe was carefully designed and tested by
			<span class="recipe__publisher">${this.data.publisher}</span>. Please check out
			directions at their website.
			</p>
			<a class="button--small recipe__button" href="${this.data.sourceUrl}"
			target="_blank">
			<span>Directions</span>
			<svg class="search__icon">
				<use href="./assets/icons.svg#icon-arrow-right"></use>
			</svg>
			</a>
		</div>
	 
	 
	 
`;
  }
  /**
   * This function will give the ingredients number
   *
   * @param {number} ingr // recieves the ingredient
   * @returns htmlmarkup
   */
  generateIngredientHtmlMarkup(ingr) {
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
