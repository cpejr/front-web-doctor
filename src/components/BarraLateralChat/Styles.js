import styled from "styled-components";
import { Cores } from "../../variaveis";

export const BarraLateral = styled.div`
  position: fixed;
  border-color: ${Cores.cinza[3]};
  border-top: 0ch;
  border-style: solid;
  padding-top: 2%;
  margin-left: 10%;
  height: 100%;
  width: 27%;
  background-color: white;
  justify-content: center;
  align-items: center;
  min-width:300px;

  @media (max-width: 821px) {
    margin-left: 0%;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding-top: 5%;
  }
`;

export const HeaderBarraLateralChat = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  justify-content: left;
  align-items: flex-start;
  padding-left: 9%;
  margin-bottom: 2%;

  @media (max-width: 830px) and (min-width: 800px) {
    height: 8%;
  }
  `;

export const ListaPessoasChat = styled.div`
height: 75%;
display: block;
align-items: flex-start;
justify-content: flex-start;
overflow-y: scroll;
::-webkit-scrollbar{display:none;}

@media (min-height: 736px)  {
    height: 80%;
  }
`;

export const PessoaChat = styled.button`
display: flex;
padding-left: 7%;
padding-bottom: 10%;
background-color: transparent;
border-color: transparent;
width: 100%;
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

export const BarraPesquisaChat = styled.div`
width: 80%;
height: 52%;
min-height :30px;
max-height :40px;
border-width: 2px;
border-style: solid;
border-color: ${Cores.cinza[3]};
background-color: ${Cores.cinza[5]};
align-items: center;
display: flex;
border-radius: 3px;
padding-right: 2%;
`;
