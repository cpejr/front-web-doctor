import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerModalFormulario = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 2% 7% 2% 7%;

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
  color: ${Cores.preto};
  margin-top: 2%;
  @media (max-width: 950px) and (min-width: 560px) {
    font-size: 1.5em;
  }
  @media (max-width: 560px) {
    font-size: 1.2em;
    margin-bottom: 8%;
  }
`;