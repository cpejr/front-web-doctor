import styled from "styled-components";
import { Cores } from "../../variaveis";

export const Conversa = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
`;


export const HeaderConversaAberta = styled.div`
  display: flex;
  padding: 1%;
  padding-left: 1.6%;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  margin-left:37%;
  width: 51%;
  height: 17%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;

  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }
  @media (max-width: 670px) and (min-width: 601px) {
    padding-left:10%;
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
  background-color: #FDF1D1;
  margin-left:37%;
  width: 51%;
  height: 70%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;
  border-top: 0ch;
  border-bottom: 0ch;
  justify-content:flex-end;

  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }
  @media (max-width: 670px) and (min-width: 601px) {
    padding-left:10%;
  }
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
  background-color: #CFD3F8;
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
  margin-left:37%;
  width: 51%;
  height: 15%;
  border-style:solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;

  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }
  @media (max-width: 670px) and (min-width: 601px) {
    padding-left:10%;
  }
`;