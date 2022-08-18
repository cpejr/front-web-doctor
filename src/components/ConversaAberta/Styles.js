import styled from "styled-components";
import { Cores } from "../../variaveis";

export const Conversa = styled.div`
  display: flex;
  flex-direction:column;
  width: 51%;
  height: 100%;
  margin-left:37%;

  // ajuste altura
  @media (max-height: 859px) and (min-height: 715px) {
      height: 88%;
  }

  @media (max-height: 1030px) and (min-height: 860px) {
      height: 90%;
  }

  @media (max-height: 1180px) and (min-height: 1030px) {
      height: 92%;
  }
  //
  //ajuste largura
  @media (max-width: 1053px) and (min-width: 1003px) {
    margin-left: 38.5%;
  }

  @media (max-width: 1003px) and (min-width: 960px) {
    margin-left: 40%;
  }

  @media (max-width: 960px) and (min-width: 920px) {
    margin-left: 41.4%;
  }

  @media (max-width: 919px) and (min-width: 885px) {
    margin-left: 43%;
  }

  @media (max-width: 885px) and (min-width: 846px) {
    margin-left: 44%;
  }

  @media (max-width: 846px) and (min-width: 821px) {
    margin-left: 45.5%;
  }

  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }

  @media (max-width: 790px) and (min-width: 760px) {
    width:62%;
    margin-left: 38%;
  }

  @media (max-width: 760px) and (min-width: 730px) {
    width:61%;
    margin-left: 39.5%;
  }

  @media (max-width: 730px) and (min-width: 705px) {
    width:60%;
    margin-left: 41%;
  }

  @media (max-width: 705px) and (min-width: 680px) {
    width:59%;
    margin-left: 43%;
  }

  @media (max-width: 680px) and (min-width: 600px) {
    width:58%;
    margin-left: 44%;
  }
  //

  @media (max-width: 670px) {
    width:100%;
    margin-left: 0%;
  }
  `;


export const HeaderConversaAberta = styled.div`
  display: flex;
  padding: 1%;
  padding-left: 1.6%;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 17%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;
`;

export const BotaoVoltar = styled.div`
  padding-left: 5%;


  @media (min-width: 671px) {
    display: none;
  }
`;

export const NomePessoa = styled.div`
  display: flex;
  padding-left: 2%;
  font-size: 30px;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0em;
  text-align: left;
  color: ${Cores.lilas[1]};
`;

export const CorpoConversaAberta = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Cores.amarelo};
  width: 100%;
  height: 70%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;
  border-top: 0ch;
  border-bottom: 0ch;
  justify-content:flex-end;

`;

export const MensagemRecebida = styled.div`
  display: block;
  align-items: center;
  padding: 1.5%;
  max-width: 80%;
  width: fit-content;
  height: fit-content;
  word-wrap: break-word;
  background-color: white;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  border-radius: 5px;
  margin-top:0%;
  margin:2%;
  align-self:flex-start;
`;

export const MensagemEnviada = styled.div`
  display: block;
  align-items: center;
  padding: 1.5%;
  max-width: 80%;
  word-wrap: break-word;
  width: fit-content;
  height: fit-content;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  border-radius: 5px;
  background-color: ${Cores.lilas[4]};
  align-self:flex-end;
  margin:2%;
  margin-top:0%;
`;

export const DataHoraMensagem = styled.div`
  color: black;
  align-self: flex-end;
  justify-self: right;
  width: 100%;
  font-size: 10px;
  font-weight: 400;
  line-height: 18px;
  text-align: right;
`;

export const FooterConversaAberta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top:1%;
  padding-bottom:1%;
  width: 100%;
  height: 15%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;

`;