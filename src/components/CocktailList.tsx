import { useNavigate } from 'react-router-dom';
import CocktailCard from './CocktailCard';
import { Cocktail } from '../interfaces/Cocktail';
import styled from 'styled-components';

interface CocktailListProps {
    cocktails: Cocktail[];
}

export default function CocktailList({ cocktails }: CocktailListProps) {
    const navigate = useNavigate();
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

const ListContainer = styled.div`
`;
