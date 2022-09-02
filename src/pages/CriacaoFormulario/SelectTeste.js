import styled from "styled-components";
import { Cores } from "../../variaveis";

export const SelectContainer = styled.div`
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
  border-radius: 3px;
  border-style: solid;
  border-width: ${(props) => props.borderWidth};
  width: ${(props) => props.width};
  height: 50px;
  display:flex;
  align-items: center;
  padding-right: 12px;
  background-color: ${Cores.cinza[7]};
`;
export const Select = styled.select`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  height: 46px;
  color: ${(props) => props.color};
  border-color: ${Cores.cinza[7]};
  font-size: 1em;
  margin-top: ${(props) => props.marginTop?? "2%"};
  margin-bottom: ${(props) => props.marginBottom?? "0px"};
  padding-left: 2%;
  padding-top: ${(props) => props.paddingTop?? "0px"};
  padding-bottom: ${(props) => props.paddingTop?? "0px"};
  width: 100%;
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

