import styled from 'styled-components';
import { Cores } from '../../variaveis';

const Input = styled.input`
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
  text-align: ${(props) => props.textAlign ?? 'left'};
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if (props.erro || props.camposVazios) {
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
  margin-bottom: ${(props) => props.marginBottom ?? '0px'};
  border-style: solid;
  line-break: ${(props) => props.lineBreak};
  height: ${(props) => props.height ?? '50px'};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  padding-left: ${(props) => props.paddingLeft ?? '2%'};
  box-shadow: ${(props) => props.boxShadow};
  border-width: ${(props) => props.borderWidth};
  padding-right: ${(props) => props.paddingRight ?? '0px'};
  padding-bottom: ${(props) => props.paddingBottom};
  width: ${(props) => props.width};
  @media (max-width: 820px) {
    width: 100%;
  }
  @media (max-width: 281px) {
    width: 80%;
  }
`;

export default Input;
