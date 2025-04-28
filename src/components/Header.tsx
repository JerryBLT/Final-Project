//implemented by Jerry

import styled from "styled-components";
// library for the cocktail logo
import { FaCocktail } from "react-icons/fa";
import { Link } from "react-router";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  padding: 1vh 1vw;
  background: #ffb347;
  justify-content: space-between;
`;

const Logo = styled.h1`
  color: white;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: calc(4px + 3vw);
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0;
  @media screen and (max-width: 750px) {
    text-align: center;
    justify-content: center;
  }
`;


export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <FaCocktail />
        Cocktail
      </Logo>
    </HeaderContainer>
  );
}
