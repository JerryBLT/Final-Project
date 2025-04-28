import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Cocktail } from './interfaces/Cocktail';
import CocktailDetail from './components/CocktailDetail';
import CocktailList from './components/CocktailList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

// hi guys, i was using the routes below for testing purposes, feel free to change them
function App() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const handleResults = (result: any) => {
        if (result && Array.isArray(result)) {
          // If already an array, just use it
          setCocktails(result);
        } else if (result && Array.isArray(result.drinks)) {
          // If it's an object with drinks array inside, extract drinks
          setCocktails(result.drinks);
        } else {
          // If no results, set empty
          setCocktails([]);
        }
    };
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element= {<div>
                    <SearchBar onResults = {handleResults} />
                    <CocktailList cocktails={cocktails} />
                </div>} />
                <Route path="/cocktail/:idDrink" element={<CocktailDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
