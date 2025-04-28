// This file contains the API calls to TheCocktailDB
import { Cocktail } from "./Cocktail";

// This function fetches a single cocktail by its ID
export const getCocktailById = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };

// src/interfaces/api.ts
export const searchByIngredient = async (q: string): Promise<Cocktail[]> => {
    const res   = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${q}`
    );
    const { drinks } = await res.json();
    return drinks ?? [];        // ←  always an array
};

export const searchByName = async (q: string): Promise<Cocktail[]> => {
    const res   = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${q}`
    );
    const { drinks } = await res.json();
    return drinks ?? [];
};


//This function fetches a random cocktail
export const getRandomCocktail = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    return data;
}