import styled from "styled-components";
import { Cores } from "../../variaveis";

const Input = styled.input`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.erro || props.camposVazios || props.emailJaExiste){
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  color: ${(props) => props.color};
  border-radius: 3px;
  font-size: ${(props) => props.fontSize};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom?? "0px"};
  border-style: solid;
  height: 50px;
  padding-left: 2%;
  box-shadow: ${(props) => props.boxShadow};
  border-width: ${(props) => props.borderWidth};
  padding-right: ${(props) => props.paddingRight ?? "0px"};
  width: ${(props) => props.width};
  @media (max-width: 820px) {
    width: 100%;
  }
`;

export default Input;
