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
  height: 20%;
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
  justify-content: center;
  align-items: center;
  background-color: green;
  margin-left:37%;
  width: 51%;
  height: 20%;
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

export const FooterConversaAberta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top:1%;
  padding-bottom:1%;
  margin-left:37%;
  width: 51%;
  height: 100%;
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