import styled from "styled-components";

const BotonEnviar = styled.button`
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

function Enviar({ text7, onClick }) {
  return (
    <BotonEnviar onClick={onClick}>
      {text7}
    </BotonEnviar>
  );
}

export default Enviar;