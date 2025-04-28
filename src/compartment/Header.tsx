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

const Nav = styled.nav`
  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 2vw;
  list-style: none;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 750px) {
    flex-direction: row;
    background-color: white;
    width: 100%;
    justify-content: center;
  }
`;

const NavItem = styled.li`
  margin: 4vh auto;
  @media screen and (max-width: 750px) {
    font-size: calc(1.5px + 1.5vw);
    margin: 1% 1%;
  }
`;

const NavLink = styled(Link)`
  color: #3e2723;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s;

  &:hover {
    color: #d35400;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <FaCocktail />
        Cocktail
      </Logo>
      {/* <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/favorites">Favorites</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about">About</NavLink>
          </NavItem>
        </NavList>
      </Nav> */}
    </HeaderContainer>
  );
}
