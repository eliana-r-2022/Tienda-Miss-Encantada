import styled from "styled-components";

const BotonCompra = styled.button`
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

function Producto({ text, onClick }) {
  return (
    <BotonCompra onClick={onClick}>
      {text}
    </BotonCompra>
  );
}

export default Producto;

