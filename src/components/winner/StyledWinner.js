import styled from "styled-components";

const StyledWinner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #eee;
    letter-spacing: 1.3px;
    text-shadow: 1px 1px 2px #222;
    font-size: 2.5em;
    margin-top: 90px;
  }

  button {
    padding: 10px;
    margin-top: 30px;
    width: 180px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.3px;
  }
`;

export default StyledWinner;
