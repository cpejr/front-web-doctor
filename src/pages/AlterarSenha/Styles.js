import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Conteudo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1%;
  background-color: ${Cores.branco};
`;

export const TituloInput = styled.div`
   font-family: ${Fontes.barlow};
   color: ${Cores.azul};
   font-size: 15px;
  
`;

export const Caixa = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 70%;
  padding: 2% 5%;
  margin-top: 7%;
  background-color: ${Cores.branco};
  border-style: solid;
  border-radius: 4px;
  border-color: ${Cores.cinza[3]};
  @media (max-width: 560px) {
    flex-direction: column;
    width: 80%;
  }
`;
export const Titulo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 2em;
  @media (max-width: 950px) {
    font-size: 1.5em;
  }
`;
export const InputVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
  margin: 4% 0%;
  width: 65%;
  height: 100%;
  font-size: 1em;
  gap: 25px;
  @media (max-width: 850px) {
    flex-direction: column;
    width: 80%;
  }
`;
export const BotoesMesmaLinha = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: end;
  width: 55%;
  margin-bottom: 4%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: column-reverse;
    height: 130px;
    width: 80%;
  }
  @media (min-width: 561px) and (max-width: 690px) {
    font-size: 0.75em;
  }
  @media (min-width: 690px) and (max-width: 780px) {
    font-size: 0.9em;
  }
`;

export const Rotulo = styled.div`
  width: 100%;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1em;
  color: ${Cores.vermelho};
`;
