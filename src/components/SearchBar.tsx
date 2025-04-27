import styled from 'styled-components';

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #a3a5ff;
    height: 10vh;
    align-items: center;
    align-self: center;
    margin: auto;
    border-radius: 15px;
    width: 30vw;
`

const DrinkSearch = styled.input`
    
`


export default function() {
    return (
        <>
            <SearchBar>
                <button>Search By Drink Name</button>
                <DrinkSearch
                    type="text"
                    id="my-text-input"
                    value="Enter Your Search"
                />
            </SearchBar>
        </>
    );
}