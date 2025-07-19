import styled from "styled-components";

const BotonEliminar = styled.button`
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
function Producto2({text2}) {
  return <BotonEliminar>{text2}</BotonEliminar>;
}

export default Producto2