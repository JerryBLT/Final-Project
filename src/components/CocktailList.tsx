// This component displays a list of cocktails using the CocktailCard component
// Implemented by Caroline
import { useNavigate } from 'react-router-dom';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../interfaces/Cocktail';
import styled from 'styled-components';

// Define the props for the CocktailList component
interface CocktailListProps {
    cocktails: Cocktail[];
}

export default function CocktailList({ cocktails }: CocktailListProps) {
    const navigate = useNavigate();
    // Function to handle the click event on a cocktail card, which navigates to the cocktail detail page
    const handleCocktailClick = (id: string) => {
        navigate(`/cocktail/${id}`);
    };
    return(
        <ListContainer>
            {cocktails.map((cocktail: Cocktail) => (
                <CocktailCard
                    key={cocktail.idDrink}
                    data={cocktail}
                    onClick={handleCocktailClick}
                />
            ))}
        </ListContainer>
    );
}

// Styled component for the list container where cocktail cards are displayed
const ListContainer = styled.div`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: calc(4px + 1.2vw);    
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 6vh;
    padding: 2vh 0;
    min-height: 100vh;
`;
