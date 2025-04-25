// This file contains the API calls to TheCocktailDB


// This function fetches a single cocktail by its ID
export const getCocktailById = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };