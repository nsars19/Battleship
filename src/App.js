import Board from "./components/Board";
import Ship from "./components/Ship";
import styled from "styled-components";

const ShipWrap = styled.div`
  padding: 30px 0;
  border: 2px solid goldenrod;
  margin-top: 20px;
  width: 400px;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
`;

function App() {
  return (
    <>
      <Board />
      <ShipWrap>
        <Ship length={1} />
        <Ship length={1} />
        <Ship length={1} />
        <Ship length={2} />
        <Ship length={3} />
        <Ship length={4} />
        <Ship length={5} />
      </ShipWrap>
    </>
  )
}

export default App;
