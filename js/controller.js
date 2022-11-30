import * as model from "./apiCall.js";
import recipeView from "./modules/recipeView.js";
import searchView from "./modules/searchView.js";
import resultsView from "./modules/resultsView.js";
import pagination from "./modules/pagination.js";

export default function Controller() {
  // api call
  async function showRecipe() {
    try {
      const hashId = window.location.hash.slice(1);
      if (!hashId) return;
      recipeView.renderSpinner();

      // 1.load Recipe
      await model.loadRecipe(hashId);

      // 2. Render Recipe
      recipeView.render(model.state.recipe);
    } catch (err) {
      console.log(err);
    }
  }
  async function getSearchRecipe() {
    try {
      resultsView.renderSpinner();
      //1. Get search query
      const query = searchView.getQuery();
      if (!query) return;

      //2. load search results
      await model.loadSearchRecipe(query);

      //3. render results

      resultsView.render(model.getSearchResultPage());

      //4 render pagination button
      pagination.render(model.state.search);
    } catch (err) {
      recipeView.renderError(err.message);
    }
  }
  const recipePagination = function (slidePage) {
    //Render new results
    resultsView.render(model.getSearchResultPage(slidePage));

    // Render new buttons
    pagination.render(model.state.search);
  };
  const init = function () {
    recipeView.addRecipeEventHandler(showRecipe);
    searchView.addSearchEventHandler(getSearchRecipe);
    pagination.addPageHandlerClick(recipePagination);
  };
  init();
}
