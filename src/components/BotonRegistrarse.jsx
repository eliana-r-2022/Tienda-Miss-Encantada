import styled from "styled-components";

const BotonRegistrarse = styled.button`
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

function Registro({ text6, onClick }) {
  return (
    <BotonRegistrarse onClick={onClick}>
      {text6}
    </BotonRegistrarse>
  );
}

export default Registro;