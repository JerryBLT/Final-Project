import { Cocktail } from "./Cocktail";

const BASE = "https://www.thecocktaildb.com/api/json/v1/1";

async function fetchList(url: string): Promise<Cocktail[]> {
    try {
        const res = await fetch(url);
        const { drinks } = await res.json();

        return Array.isArray(drinks) ? drinks : [];
    } catch (err) {
        console.error("CocktailDB error:", err);
        return [];
    }
}

export const searchByIngredient = (q: string) =>
    fetchList(`${BASE}/filter.php?i=${encodeURIComponent(q)}`);

export const searchByName = (q: string) =>
    fetchList(`${BASE}/search.php?s=${encodeURIComponent(q)}`);

export const getCocktailById = async (
    id: string,
): Promise<Cocktail | null> =>
    (await fetchList(`${BASE}/lookup.php?i=${id}`))[0] ?? null;

export const getRandomCocktail = async (): Promise<Cocktail | null> =>
    (await fetchList(`${BASE}/random.php`))[0] ?? null;