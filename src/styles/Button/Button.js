import styled from "styled-components";

const Button = styled.button`
  /*Posição */
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: center;
  justify-content: center;
  /*Medidas*/
  border-radius: 3px;
  margin-top: 2%;
  height: 50px;
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  /*cor e estilo do botão*/
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  cursor: pointer;
  /*características do texto*/
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: ${(props) => props.fontSize};
  text-decoration: ${(props) => props.textDecoration};
  text-align: center;
  font-weight: ${(props) => props.fontWeight};
  @media(max-width:480px){
    font-size: ${(props) => props.fontSizeMedia};
  }
  @media(max-width:560px){
    width: 100%
  }
`;
export default Button;
