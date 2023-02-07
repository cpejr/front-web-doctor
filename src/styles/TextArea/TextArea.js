import styled from 'styled-components';
import { Cores } from '../../variaveis';

const TextArea = styled.textarea`
  resize: none;
  background-color: ${(props) => props.backgroundColor};
  text-align: ${(props) => props.textAlign ?? 'left'};
  color: ${(props) => props.color};
  border-radius: 3px;
  font-size: ${(props) => props.fontSize};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom ?? '0px'};
  border-style: solid;
  line-break: ${(props) => props.lineBreak};
  padding-left: ${(props) => props.paddingLeft ?? '2%'};
  padding-right: ${(props) => props.paddingRight ?? '0px'};
  box-shadow: ${(props) => props.boxShadow};
  border-width: ${(props) => props.borderWidth};
  padding-right: ${(props) => props.paddingRight ?? '0px'};
  padding-bottom: ${(props) => props.paddingBottom};
  height: ${(props) => props.height ?? '50px'};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  width: ${(props) => props.width};
  background-image: ${(props) => props.backgroundImage};
  text-align: ${(props) => props.textAlign ?? 'left'};
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
  line-height: ${(props) => props.lineHeight};
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
  padding-top: ${(props) => props.paddingTop ?? '2%'};
  box-shadow: ${(props) => props.boxShadow};
  border-width: ${(props) => props.borderWidth};
  padding-right: ${(props) => props.paddingRight ?? '0px'};
  padding-bottom: ${(props) => props.paddingBottom};
  width: ${(props) => props.width};
  outline: ${(props) => props.outline};

  @media (max-width: 281px) {
    width: 80%;
  }

  @media (max-width: 950px) {
    font-size: ${(props) => props.fontSizeMedia950};
  }
`;

export default TextArea;
  @media (max-width: 820px) {
    width: 100%;
  }
