import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

const IconoCarrito = styled(FaShoppingCart)`
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => props.size || "30px"};
  cursor: pointer;
  position: relative;
`;

const ContadorBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: #1a1919ff;
  color: white;
  border-radius: 50%;
  padding: 4px 7px;
  font-size: 10px;
  font-weight: bold;
`;

function CarritoIcono({ cantidad, iconColor, iconSize, onClick }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <IconoCarrito color={iconColor} size={iconSize} onClick={onClick} />
      {cantidad > 0 && <ContadorBadge>{cantidad}</ContadorBadge>}
    </div>
  );
}

export default CarritoIcono;


