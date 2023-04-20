import styled from 'styled-components';
import { Cores } from '../../variaveis';

export const Conversa = styled.div`
  display: flex;
  flex-direction: column;
  width: 51%;
  height: 100%;
  margin-left: 37%;

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
  @media (max-width: 1060px) and (min-width: 1035px) {
    margin-left: 38.2%;
  }

  @media (max-width: 1034px) and (min-width: 1004px) {
    margin-left: 39%;
  }

  @media (max-width: 1003px) and (min-width: 974px) {
    margin-left: 40%;
  }

  @media (max-width: 973px) and (min-width: 959px) {
    margin-left: 40.8%;
  }

  @media (max-width: 960px) and (min-width: 940px) {
    margin-left: 41.4%;
  }

  @media (max-width: 941px) and (min-width: 920px) {
    margin-left: 41.9%;
  }

  @media (max-width: 919px) and (min-width: 901px) {
    margin-left: 42.7%;
  }

  @media (max-width: 900px) and (min-width: 883px) {
    margin-left: 43.3%;
  }

  @media (max-width: 882px) and (min-width: 866px) {
    margin-left: 44%;
  }

  @media (max-width: 865px) and (min-width: 851px) {
    margin-left: 44.7%;
  }

  @media (max-width: 850px) and (min-width: 836px) {
    margin-left: 45.3%;
  }

  @media (max-width: 835px) and (min-width: 822px) {
    margin-left: 46%;
  }

  @media (max-width: 821px) {
    margin-left: 36.6%;
    width: 63.6%;
  }

  @media (max-width: 790px) and (min-width: 773px) {
    width: 62%;
    margin-left: 38%;
  }

  @media (max-width: 772px) and (min-width: 756px) {
    width: 61.2%;
    margin-left: 38.9%;
  }

  @media (max-width: 755px) and (min-width: 740px) {
    width: 60.3%;
    margin-left: 39.8%;
  }

  @media (max-width: 739px) and (min-width: 725px) {
    width: 59.5%;
    margin-left: 40.6%;
  }

  @media (max-width: 725px) and (min-width: 711px) {
    width: 58.7%;
    margin-left: 41.4%;
  }

  @media (max-width: 710px) and (min-width: 697px) {
    width: 59.5%;
    margin-left: 42.3%;
  }

  @media (max-width: 696px) and (min-width: 685px) {
    width: 59.5%;
    margin-left: 43.1%;
  }

  @media (max-width: 684px) and (min-width: 600px) {
    width: 59.5%;
    margin-left: 43.9%;
  }
  //

  @media (max-width: 670px) {
    width: 100%;
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
  border-style: solid;
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
  padding-right: 80px;
`;

export const CorpoConversaAberta = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${Cores.amarelo};
  width: 100%;
  height: 70%;
  border-style: solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;
  border-top: 0ch;
  border-bottom: 0ch;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const FooterConversaAberta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top: 1%;
  padding-bottom: 1%;
  width: 100%;
  height: 15%;
  border-style: solid;
  border-color: ${Cores.cinza[3]};
  border-left: 0ch;
`;

export const MenuConversasTipoExame = styled.div`
  display:flex;
  justify-content:center;
  margin-bottom: 1%;
  width: 10%;
  height: 20%;
  background-color: transparent;
`;
