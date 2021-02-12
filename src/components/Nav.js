import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: ${props => props.primary ? "red" : "#559"};
  width: 90%;
  border: 2px solid #abc;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  & ul { 
    width: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 768px) {
    background-color: rebeccapurple;
  }
`;

const Nav = (props) => {
  return (
    <StyledNav primary={false}>
      <ul>
        <li>Home</li>
        <li>Shop</li>
        <li>About</li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
