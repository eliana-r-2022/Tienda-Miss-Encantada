import styled from "styled-components";

const BotonVaciarCarrito = styled.button`
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
function BotonVaciar({ text3, onClick }) {
    return(
    <BotonVaciarCarrito onClick={onClick}>
        {text3}
    </BotonVaciarCarrito>
)}

export default BotonVaciar;