import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from "./globalStyles";
import App from './App';
import styled from "styled-components";

const StyledApp = styled(App)`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <StyledApp />
  </React.StrictMode>,
  document.getElementById('root')
);
