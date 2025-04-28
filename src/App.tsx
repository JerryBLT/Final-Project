import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CocktailCard from './components/CocktailCard';
import CocktailDetail from './components/CocktailDetail';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

// hi guys, i was using the routes below for testing purposes, feel free to change them
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div> home page placeholder </div>}/>
                <Route path="/cocktail/:idDrink" element={<CocktailDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
