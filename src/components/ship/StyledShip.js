import styled from "styled-components";

const StyledShip = styled.div`
  height: ${(props) => 40 * parseInt(props.length)}px;
  width: 40px;
  background: #222;
`;

export default StyledShip;
