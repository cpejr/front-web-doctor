import styled from "styled-components";
import { Cores } from "../../variaveis";

export const BarraLateral = styled.div`
  position: fixed;
  border-color: ${Cores.cinza[9]};
  border-top: 0ch;
  border-style: groove;
  padding-top: 2%;
  margin-left: 10%;
  height: 100%;
  width: 27%;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const HeaderBarraLateralChat = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  justify-content: left;
  align-items: flex-start;
  padding-left: 9%;
  margin-bottom: 2%;
  `;

export const ListaPessoasChat = styled.div`
height: 600px;
display: block;
align-items: flex-start;
justify-content: flex-start;
overflow-y: scroll;
::-webkit-scrollbar{display:none;}
`;

export const PessoaChat = styled.div`
display: flex;
padding-left: 7%;
padding-bottom: 10%;
`;

export const NomeMensagem = styled.div`
padding-left: 2.5%;
`;

export const NomePessoa = styled.div`
display: flex;
font-size: 25px;
font-weight: 500;
line-height: 29px;
text-align: left;
margin-top: -4%;
`;

export const MensagemPessoa = styled.div`
display: flex;
font-size: 25px;
font-weight: 400;
line-height: 29px;
text-align: left;
margin-top: 14%;
`;


export const Pessoa = styled.div`
display: flex;
`;
