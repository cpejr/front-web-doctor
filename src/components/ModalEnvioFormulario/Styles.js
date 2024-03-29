import styled from "styled-components";
import { Fontes, Cores } from "../../variaveis";
import { Select } from "antd";

export const ContainerModalCodigo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 2% 20% 2% 20%;

  @media (max-width: 950px) and (min-width: 560px) {
    padding: 2% 10% 2% 10%;
  }
  @media (max-width: 560px) {
    padding: 2% 0% 2% 0%;
  }
`;

export const Titulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 2em;
  color: #0a0e3c;
  margin-top: 2%;
  margin-bottom: 5%;
  @media (max-width: 950px) and (min-width: 560px) {
    font-size: 1.5em;
  }
  @media (max-width: 560px) {
    font-size: 1.2em;
    margin-bottom: 8%;
  }
`;

export const TextoCheckbox = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.2em;
  margin-top: 20%;
  color: ${Cores.azulEscuro};

  @media (max-width: 560px) {
    font-size: 1em;
  }
`;
export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

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
  background-color: ${Cores.cinza[7]};
`;
/*export const Select = styled.select`
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
  }*/

  export const SelectPaciente = styled(Select)`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  height: 46px;
  color: ${(props) => props.color};
  border-color: ${Cores.cinza[7]};
  font-size: 1em;
  width: 100%;
  @media (max-width: 820px) {
    width: 100%;
  }

  & .ant-select-selection-placeholder{
    color: ${Cores.preto};
  };

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
	background-color: ${Cores.cinza[7]};
	border: none;
  padding-top: 9px;
  height: 46px;
  }
  & .ant-select-arrow {
    color: ${Cores.preto};
    height: 15px;
    width: 15px;
	font-size: 11px;
	padding: none;
	transform: rotateX(45deg);
  }
`;