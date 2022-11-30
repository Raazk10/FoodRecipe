import { API_URL, RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export async function loadRecipe(hashId) {
  try {
    const response = await fetch(`${API_URL}${hashId}`);
    const data = await response.json();

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

export async function loadSearchRecipe(query) {
  try {
    state.search.query = query;
    const searchResult = await fetch(`${API_URL}?search=${query}`);
    const data = await searchResult.json();

    state.search.results = data.data.recipes.map((res) => {
      return {
        id: res.id,
        image: res.image_url,
        publisher: res.publisher,
        title: res.title,
      };
    });
  } catch (err) {
    throw err;
  }
}
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9
  return state.search.results.slice(start, end);
};
