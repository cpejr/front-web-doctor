import styled from 'styled-components';
import { Cores, Fontes } from '../../variaveis';

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: calc (100vh - 100px);
  padding: 1%;
  background-color: ${Cores.branco};
`;

export const Board = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 93%;
  height: 70vh;
  max-height: 512px;
  overflow: auto;
  padding: 8px;
  margin-top: 3%;
  background-color: ${Cores.cinza[9]};
  border-style: solid;
  border-color: ${Cores.preto};
  box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-width: 0.1em;
  border-radius: 3px;
`;

export const Notificacao = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 6.5em;
  padding-left: 2%;
  padding-right: 2%;
  @media (max-width: 560px) {
    flex-direction: column;
    height: 140px;
    margin-bottom: 3em;
  }
`;

export const CaixaTexto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 78%;
  height: 85%;
  padding: 1%;
  background-color: ${Cores.lilas[4]};
  border-style: solid;
  border-color: ${Cores.lilas[3]};
  border-width: 0.2em;
  border-radius: 6px;
  @media (max-width: 950px) and (min-width: 680px) {
    height: 70%;
  }
  @media (max-width: 680px) {
    height: 80%;
  }
  @media (max-width: 560px) {
    width: 90%;
  }
`;

export const TextoNotificacao = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding-top: 1.5%;
  text-align: center;
  width: 100%;
  font-family: ${Fontes.roboto};
  font-size: 0.9em;
  @media (max-width: 950px) {
    font-size: 0.75em;
    padding-top: 2.5%;
  }
  @media (max-width: 680px) {
    font-size: 0.68em;
    padding-top: 3.5%;
  }
`;

export const Texto = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${Cores.cinza[1]};
  font-family: ${Fontes.roboto};
  font-size: 250%;
  @media (max-width: 490px) and (min-width: 300px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 560px) {
    font-size: 190%;
  }
`;

export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  height: 20%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
  }
`;

export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 93%;
  gap: 2%;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
  
`;

export const Botoes = styled.div`
  display: flex;
  font-size: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (min-width: 1081px) {
    flex-direction: row;
    width: 40%;
    justify-content: space-between;
  }
`;
