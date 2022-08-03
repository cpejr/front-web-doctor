import styled from "styled-components";
import { Cores } from "../../variaveis";
const Select = styled.select`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.erro || props.camposVazios){
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
  font-size: 1em;
  margin-top: 2%;
  border-style: solid;
  border-width: ${(props) => props.borderWidth};
  height: 50px;
  padding-left: 2%;
  padding-top: ${(props) => props.paddingTop?? "0px"};
  padding-bottom: ${(props) => props.paddingTop?? "0px"};
  width: ${(props) => props.width};
  @media (max-width: 820px) {
    width: 100%;
  }

  option {
    border-color: ${(props) => props.borderColor};
    color: ${(props) => props.color};
    border-radius: 3px;
    border-style: solid;
    border-width: 0.1em;
    height: 50px;
    padding-left: 2%;
  }

  option[value=""][disabled] {
    display:none;
  }

`;

export default Select;
