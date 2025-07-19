import styled from "styled-components";

const BotonInicioSesion = styled.button`
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

function InicioSesion({ text5, onClick }) {
  return (
    <BotonInicioSesion onClick={onClick}>
      {text5}
    </BotonInicioSesion>
  );
}

export default InicioSesion;