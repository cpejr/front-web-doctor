import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 1%;
  background-color: #FFFFFF ;
`;
export const Board = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 93%;
  height: 93%;
  padding: 3%;
  margin-top: 3%;
  background-color: #ffffff ;
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
`;
export const CaixaTexto = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 79%;
  height: 80%;
  padding: 1%;
  background-color: #CFD3F8;
  border-style: solid;
  border-color: #BBC0F4;
  border-width: 0.2em;
  border-radius: 6px;
`;
export const TextoNotificacao = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  font-family: 'Roboto Condensed', sans-serif;
`;

export const BotoesColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  alig-items: end;
  width: 20%;
  height: 80%;
  font-size: 1em;
  @media (max-width: 560px) {
    flex-direction: column;
  }
`;
export const BotaoCanto = styled.div`
  display: flex;
  justify-content: right;
  alig-items: center;
  width: 93%;
  height: 80%;
`;
export const IconeAdicionar = styled.div`
display: flex;
  justify-content: center;
  alig-items: center;
  padding-left: 2%;
`;