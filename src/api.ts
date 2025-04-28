// This file contains the API calls to TheCocktailDB


// This function fetches a single cocktail by its ID
export const getCocktailById = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };

//This function fetches all cocktails containing a given ingredient
export const searchByIngredient = async (ingredient: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
}

//This function fetches a single cocktail by its name
export const searchByName = async (name: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
}

//This function fetches a random cocktail
export const getRandomCocktail = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    return data;
}