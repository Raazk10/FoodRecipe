import * as model from "./apiCall.js";
import recipeView from "./modules/recipeView.js";
import searchView from "./modules/searchView.js";
import resultsView from "./modules/resultsView.js";
import pagination from "./modules/pagination.js";

/**
 * this Controller function handles the event
 *
 */
export default function Controller() {
  /**
   *this function handles the event when user search
   *
   */
  async function controlRecipe() {
    try {
      //  location is basically entire url
      //starts reading the id after hash symbol, slice starts at 1, to all the way to end
      const hashId = window.location.hash.slice(1);

      // this guard clause check, if there is a hashid or not if not return out function early
      if (!hashId) return;
      // render the spinner into the recipeView
      //calls the renderSpinner method from parentView
      recipeView.renderSpinner();

      // 1.load Recipe
      // calls the async loadRecipe function from apicall.js,so await is used here
      // this loadRecipe functions doesn't return anything , so no need to store in variable
      // only gets access to state.recipe
      // recipe is loaded here and stored it into the state object
      await model.loadRecipe(hashId);

      // 2. Render Recipe
      // accessing recipe from apicall.js
      // passing the data model.state.recipe
      //  gets the data from step 1 and passed it to the render method
      recipeView.render(model.state.recipe);
    } catch (err) {
      //recipeView.renderError(err);
      throw err;
    }
  }
  async function getSearchRecipe() {
    try {
      // render the spinner in searchView page before loading result
      resultsView.renderSpinner();
      // Get search query from searchView
      const query = searchView.getQuery();
      // this guard clause check, if there is a query or not if not return out function early
      if (!query) return;

      //2. load search results
      // state.search.query = query
      await model.loadSearchRecipe(query);

      //3. render results
      // after getting search query render results into the search page(model.state.search)

      resultsView.render(model.getSearchResultPage());

      //4 render pagination button
      // here entire search object
      pagination.render(model.state.search);
    } catch (err) {
      throw err;
    }
  }
  /**
   * This method is executes whenever one of the button is clicked
   *
   * @param {number} getPage
   */
  const recipePagination = function (getPage) {
    //Render new results
    // calls the function getSearchResultPage and render the new results and page in resultsView
    // render will overwrite markup that was there previously and puts new content
    // before new html element is inserted parent element is cleared
    resultsView.render(model.getSearchResultPage(getPage));

    // when page is changed to new one
    //  render's new buttons
    pagination.render(model.state.search);
  };

  /**
   *  This is init function for passing controlRecipe,getSearchRecipe and recipePagination
   * function into different views
   *
   *  function is passed into EventHandler when program starts
   */
  function init() {
    recipeView.addRecipeEventHandler(controlRecipe);
    searchView.addSearchEventHandler(getSearchRecipe);
    pagination.addPageHandlerClick(recipePagination);
  }
  // this function starts at the beginning of the program
  init();
}
