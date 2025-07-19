import styled from "styled-components";

const BotonCerrarSesion = styled.button`
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

function CerrarSesion({ text4, onClick }) {
  return (
    <BotonCerrarSesion onClick={onClick}>
      {text4}
    </BotonCerrarSesion>
  );
}

export default CerrarSesion;
