import { API_URL, RES_PER_PAGE } from "./config.js";

/**
 * state object which contains all the recipe data
 * from here controller grabs and take the recipe out of here using export and import feature.
 */
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
/**
 * This function is responsible for fetching the recipe data from api
 * will not return anything all it do is, changes the state object
 *
 *
 * @param {number} hashId //ids of differnet recipe which it gets from controller
 */
export async function loadRecipe(hashId) {
  try {
    // fetch the recipe from the api
    const response = await fetch(`${API_URL}${hashId}`);

    // if the response is ok gets the bodyJSON data from the response object and assigns to data variable
    const data = await response.json();
    console.log(data);

    // reformatting the object from server and stores it into the state object
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
}

/**
 * Returns a list of recipe for a specific search query
 *
 * @param {string} query
 * @return object
 */
export async function loadSearchRecipe(query) {
  try {
    state.search.query = query;
    const searchResult = await fetch(`${API_URL}?search=${query}`);
    const data = await searchResult.json();
    console.log(data);
    // array of all the object stored in new object
    state.search.results = data.data.recipes.map((res) => {
      return {
        id: res.id,
        image: res.image_url,
        publisher: res.publisher,
        title: res.title,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
}
/**
 * This function returns only the specified number of results per page
 * here only loads 10 results per page at the start
 *
 * @param {number} page
 * @returns {number}  return parts of the slice from 0-9 based on the page
 */
export const getSearchResultPage = function (page = state.search.page) {
  // specify which page we are in and gets updated to the new value
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9
  console.log(start, end);
  return state.search.results.slice(start, end);
};
