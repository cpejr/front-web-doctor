import styled from 'styled-components';
import { Cores } from '../../variaveis';

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
  min-width: 300px;

  @media (max-height: 741px) and (min-height: 739px) {
    height: 740px;
  }

  @media (max-height: 852px) and (min-height: 843px) {
    height: 850px;
    border-bottom: 0ch;
  }

  @media (max-width: 821px) {
    margin-left: 0%;
  }

  @media (max-width: 670px) {
    width: 100%;
    padding-top: 5%;
  }

  @media (max-width: 280px) {
    min-width: 280px;
    width: 280px;
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

  @media (max-width: 640px) {
    justify-content: center;
    padding-left: 5%;
  }

  @media (max-width: 420px) {
    padding-left: 3%;
  }
`;

export const ListaPessoasChat = styled.div`
  height: 80%;
  display: block;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PessoaChat = styled.button`
  display: flex;
  padding-left: 5%;
  padding-bottom: 10%;
  background-color: transparent;
  border-color: transparent;
  width: 95%;

  @media (max-width: 280px) {
    padding-left: 0%;
  }
`;

export const NomeMensagem = styled.div`
  padding-left: 2.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NomePessoa = styled.div`
  /* display: ruby; */
  font-size: 23px;
  font-weight: 500;
  line-height: 29px;
  text-align: left;
  /* margin-top: -1%; */
  max-width: 18ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1289px) {
    max-width: 15ch;
  }
  // colocar @media 1178
`;

export const ImagemPessoa = styled.div`
  width: 81.3px;
  height: 75px;
`;

export const BolaAzul = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 19px;
  width: fit-content;
  text-align: center;
  padding-right: 5.8px;
  padding-left: 5px;
  padding-bottom: 0.5%;
  margin-top: -2%;
  margin-left: 2ch;
  background-color: ${Cores.lilas[1]};
  border-radius: 50px;

  @media (max-width: 1446px) and (min-width: 1361px) {
    margin-left: -1ch;
    margin-top: 5%;
  }

  @media (max-width: 1361px) and (min-width: 1290px) {
    margin-left: -1.5ch;
    margin-top: 5%;
  }

  @media (max-width: 1289px) and (min-width: 1221px) {
    margin-left: 0;
    margin-top: 5%;
  }

  @media (max-width: 1220px) and (min-width: 1203px) {
    margin-left: -5px;
    margin-top: 5%;
  }

  @media (max-width: 1202px) and (min-width: 1163px) {
    margin-left: -15px;
    margin-top: 5%;
  }

  @media (max-width: 1163px) and (min-width: 671px) {
    margin-left: -30px;
    margin-top: 10%;
  }

  @media (max-width: 670px) and (min-width: 575px) {
    margin-left: 25ch;
  }

  @media (max-width: 574px) and (min-width: 465px) {
    margin-left: 4ch;
  }

  @media (max-width: 465px) and (min-width: 380px) {
    margin-left: 3ch;
  }

  @media (max-width: 379px) {
    margin-left: -10px;
    margin-top: 5%;
  }

  @media (max-width: 345px) {
    margin-left: -22px;
    margin-top: 5%;
  }

  @media (max-width: 329px) {
    margin-left: -35px;
    margin-top: 5%;
  }
`;

export const MensagemPessoa = styled.div`
  /* display: ruby; */
  font-size: 25px;
  font-weight: ${(props) => (props.naoVisto > 0 ? 650 : 400)};
  line-height: 29px;
  text-align: left;
  margin-top: 6%;
  max-width: 16ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 670px) and (min-width: 575px) {
    margin-top: 4%;
  }

  @media (max-width: 1330px) {
    max-width: 12ch;
  }

  @media (max-width: 670px) {
    max-width: 15ch;
  }

  @media (max-width: 280px) {
    max-width: 13ch;
  }
`;

export const Pessoa = styled.div`
  display: flex;
`;

export const BarraPesquisaChat = styled.div`
  width: 80%;
  height: 52%;
  min-height: 30px;
  max-height: 40px;
  border-width: 2px;
  border-style: solid;
  border-color: ${Cores.cinza[3]};
  background-color: ${Cores.cinza[5]};
  align-items: center;
  display: flex;
  border-radius: 3px;
  padding-right: 2%;
`;
