import styled from 'styled-components';

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #747bff;
    height: 10vh;
    align-items: center;
    align-self: center;
    margin: auto;
`

export default function() {
    return (
        <>
            <SearchBar>
                <h1>Hello</h1>
            </SearchBar>
        </>
    );
}