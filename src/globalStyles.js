import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body,
  * {
    padding: 0;
    margin: 0;
    background-color: #222831;
    box-sizing: border-box;
    font-family: Courier, Arial, Sans-Serif;
  }

  button {
    margin: 10px;
    padding: 7px;
    border: 0 solid transparent;
    border-radius: 2px;
    background-color: #393e46;
    color: #eee;
    letter-spacing: 1.4px;
    transition: all 0.1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
      background-color: #424149;
    }
    &:active {
      background-color: #46454a;
    }
  }

  img {
    height: 32px;
    width: 32px;
    background: transparent;
  }
`;

export default GlobalStyle;
