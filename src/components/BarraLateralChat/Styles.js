import styled from "styled-components";
import { Cores } from "../../variaveis";

export const BarraLateral = styled.div`
  position: absolute;
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

  @media (max-height: 741px) and (min-height: 739px) {
      height:740px;
  }

  @media (max-height: 852px) and (min-height: 843px) {
    height:850px;
    border-bottom: 0ch;
  }

  @media (max-width: 821px) {
    margin-left: 0%;
  }

  @media (max-width: 670px) {
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
height: 80%;
display: block;
align-items: flex-start;
justify-content: flex-start;
overflow-y: scroll;
::-webkit-scrollbar{display:none;}

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
display: ruby;
font-size: 25px;
font-weight: 500;
line-height: 29px;
text-align: left;
margin-top: -1%;
max-width: 15.5ch;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

export const ImagemPessoa = styled.div`
width:81.3px;
height:75px;
`;

export const BolaAzul = styled.div`
display: flex;
margin-top: -2%;
margin-left:30ch;
height: 13px;
width: 13px;
background-color: ${Cores.lilas[1]};
border-radius: 7px;

@media (max-width: 1385px){
    margin-left: 28ch;
  }

  @media (max-width: 1300px) and (min-width: 1211px){
    margin-left: 25ch;
  }

  @media (max-width: 1212px) and (min-width: 669px){
    margin-left: 21ch;
  }

  @media (max-width: 670px) and (min-width: 575px) {
    margin-left: 55ch;
  }

  @media (max-width: 574px) and (min-width: 465px) {
    margin-left: 40ch;
  }

  @media (max-width: 465px) and (min-width: 414px) {
    margin-left: 34ch;
  }
`;

export const MensagemPessoa = styled.div`
display: ruby;
font-size: 25px;
font-weight: 400;
line-height: 29px;
text-align: left;
margin-top: 6%;
max-width: 16ch;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

@media (max-width: 670px) and (min-width: 575px){
  margin-top: 4%;
}

@media (max-width: 1277px) {
  max-width: 12ch;
  }

@media (max-width: 670px) {
max-width: 15ch;
}
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
