//Implemented by Mauricio

import styled from 'styled-components';
import {useState} from "react";
import {searchByName, searchByIngredient} from '../interfaces/api'
import {Cocktail} from '../interfaces/Cocktail'

const SearchBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    //background-color: #ffb347;
    height: 10vh;
    align-items: center;
    align-self: center;
    margin: 5vh auto auto auto;
    border-radius: 15px;
    width: 20vw;
`

const StyledButton = styled.button<{$active: boolean}>`
    background-color: ${props => (props.$active ? '#d6d6d6' : '#fff')};
    border: none;
    border-radius: 5px;
    margin: 0;
    height: 3vh;
    width: 10vw;
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;   
    gap: 3px;
    margin: 2vh 0 0 0;
    
`;

const DrinkSearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2vh 0 0 0;
    justify-content: center;
    gap: 1vh;
`

const DrinkSearch = styled.input`
    border-radius: 5px;
    border: none;
    height: 100%;
    width: 100%;
`;

const SubmitButton = styled.button`
    border: none;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    margin: auto 0 auto auto;
    background-color: white;
`


//Takes a useState function as parameter so it can return the results of the search to the parent and be displayed in the other component
export default function SearchBar({ onResults }: { onResults: (d: Cocktail[]) => void }) {
    //Keeps track of whether the user wants to search by ingredient or by cocktail name
    const [searchType, setSearchType] = useState('ingredient');

    const [value, setValue] = useState('');

    const handleClick = async () => {
        if (!value.trim()) {
            return;
        }
        else {const drinks =
            searchType === 'ingredient'
                ? await searchByIngredient(value)
                : await searchByName(value);
            console.log("fetching", searchType, value); console.log("RESULTS:", drinks);
        onResults(drinks);}
    }

    return (
        <>
            <SearchBarWrapper>
                <ButtonWrapper>
                    <StyledButton $active={searchType==='drink'} onClick={() => setSearchType('drink')}>Cocktail</StyledButton>
                    <StyledButton $active={searchType==='ingredient'} onClick={() => setSearchType('ingredient')}>Ingredient</StyledButton>
                </ButtonWrapper>
                <DrinkSearchWrapper>
                    <DrinkSearch  placeholder={searchType === 'ingredient' ? 'Enter An Ingredient' : 'Enter A Drink Name'} onChange={e => setValue(e.target.value)} />
                    <SubmitButton disabled={!value.trim()} onClick={() => handleClick()}>Search</SubmitButton>
                </DrinkSearchWrapper>
            </SearchBarWrapper>
        </>
    );
}
