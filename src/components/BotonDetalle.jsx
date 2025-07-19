import styled from "styled-components";

const BotonDetalle = styled.button`
  background-color: #f0907bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e97d9cff;
  }
`;
function Producto1({text1}) {
  return <BotonDetalle>{text1}</BotonDetalle>;
}

export default Producto1