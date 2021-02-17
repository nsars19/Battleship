import Board from "./components/board/Board";
import Ship from "./components/ship/Ship";
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
        <Ship length={1} id={1} />
        <Ship length={1} id={2} />
        <Ship length={1} id={3} />
        <Ship length={2} id={4} />
        <Ship length={3} id={5} />
        <Ship length={4} id={6} />
        <Ship length={5} id={7} />
      </ShipWrap>
    </>
  )
}

export default App;
