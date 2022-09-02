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
  background-color: green;
  color: ${Cores.azulEscuro};

  @media (max-width: 560px) {
    font-size: 1em;
  }
`;

export const SelectUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2% 0% 2% 0%;
  justify-content: space-between;
`;

export const StyleSelect = styled(Select)`
  width:100%;
  font-size: 1em;
  color:black;
  
  .ant-select-selection {
  background-color: green;
}

`;