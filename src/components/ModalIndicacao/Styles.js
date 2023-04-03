import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  font-size: 17px;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  max-width: 800px;
  background-color: ${Cores.cinza[9]};
  border: 1px solid ${Cores.cinza[3]};
  padding: 10% 5px;
  overflow: auto;
  gap: 10px;
  margin-top: 25px;
  min-height: 300px;
  @media (max-width: 320px) {
    width: 100%;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const DescricaoInformacoes = styled.p`
  width: 100%;
  max-height: 300px;
  background-color: ${Cores.cinza[9]};
  font-size: 1em;
  font-family: ${Fontes.barlow};
  overflow-y: scroll;
`;

export const TituloInfo = styled.h2`
  font-size: 16px;
  display: flex;
  align-self: center;
  text-align: center;
`;

export const BotoesIndicacao = styled.div`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  gap: 19px;
  margin-top: 30px;
  flex-grow: 0;

  width: 75%;
  border-radius: 4px;
  @media (max-width: 320px) {
    width: 100%;
  }
`;
