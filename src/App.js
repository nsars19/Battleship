import styled from "styled-components";
import Nav from "./components/Nav";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Nav />
      </Wrapper>
    </>
  )
}

export default App;
