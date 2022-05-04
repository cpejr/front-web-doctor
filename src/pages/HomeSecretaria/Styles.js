import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: calc (100vh - 100px);
  padding: 1%;
  background-color: #ffffff;
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
  background-color: #7aff77; //#ffffff
  border-style: solid;
  border-color: #000000;
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
  height: 6em;
  padding-left: 2%;
  padding-right: 2%;
  @media (max-width: 560px) {
    flex-direction: column;
    height: 20em;
    margin-bottom: 3em;
  }
`;
export const CaixaTexto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 78%;
  height: 80%;
  padding: 1%;
  background-color: #cfd3f8;
  border-style: solid;
  border-color: #bbc0f4;
  border-width: 0.2em;
  border-radius: 6px;
  @media (max-width: 950px) and (min-width: 560px) {
    height: 60%;
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
  text-align: center;
  width: 100%;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1em;
  @media (max-width: 950px) {
    font-size: 0.8em;
  }
  @media (max-width: 560px) {
    font-size: 0.7em;
  }
`;

export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  alig-items: center;
  width: 20%;
  height: 20%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
  }
`;
export const BotaoCanto = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 93%;
  height: 80%;
`;
export const IconeAdicionar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 2%;
`;
