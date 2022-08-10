import styled from "styled-components";
import { Select } from "antd";
import { Cores, Fontes } from "../../variaveis";

export const ColunaDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 100%;

  padding: 2% 4% 2% 4%;

  @media (max-width: 760px) and (min-width: 500px) {
    display: flex;
    justify-content: center;
    height: 50%;
    width: 98%;
    margin-top: 5%;
  }

  @media (max-width: 520px) {
    font-size: 1em;
    display: flex;
    justify-content: center;
    height: 50%;
    width: 98%;
    margin-top: 5%;
  }
`;

export const ColunaEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100vh;

  padding: 2% 4% 2% 4%;

  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    height: 10%;
    width: 89%;
    padding: 0px;
    align-items: center;
  }
`;

export const ContainerFormularioEspecifico = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  gap: 2%;
  justify-content: center;
  padding: 2% 5% 2% 5%;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ContainerFormularioCima = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  width: 89%;
  height: 7%;

  margin-bottom: 3%;

  @media (max-width: 690px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 5px;
  width: 100%;
  background-color: ${Cores.azul};
`;

export const BarraPaciente = styled.div`
  //Estetica:
  background-color: ${Cores.cinza[9]};
  margin-top: 5%;
  margin-bottom: 1%;
  height: 155px;
  width: 100%;
  border-color: ${Cores.azul};
  border-style: solid;
  border-width: 3px;
  padding: 1.5% 3% 1.5% 3%;
  //Conteudo dentro
  display: flex;
  flex-direction: row;

  @media (max-width: 761px) and (min-width: 511px) {
    height: 120px;
  }

  @media (max-width: 510px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;
  }

  @media (max-width: 350px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const BarraDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 38%;
  text-align: center;

  @media (max-width: 510px) {
    width: 80%;
    display: flex;
    justify-content: center;
  }
`;

export const BarraEsquerda = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;

  @media (max-width: 510px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
  }
`;

export const BarraCentro = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  width: 32%;
  height: 80px;
  margin-top: 1.5%;

  @media (max-width: 510px) {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 10%;
    margin-top: 5%;
    font-size: 1.15em;
    text-align: center;
  }

  @media (min-width: 761px) and (max-width: 1200px) {
    margin-left: 12%;
  }
`;

export const MargemEstetica = styled.div`
  height: 300%;

  @media (max-width: 760px) {
    height: 20%;
  }
`;

export const TextoBarraPaciente = styled.text`
  font-size: ${(props) => props.fontSize};
  color: ${Cores.preto};
  font-weight: ${(props) => props.fontWeight};
  justify-content: ${(props) => props.justifyContent};

  @media (max-width: 350px) {
    font-size: 0.9em;
  }
`;

export const ImagemPaciente = styled.img`
  align-items: center;
  justify-content: start;

  display: flex;
  align-items: center;

  @media (max-width: 510px) and (max-width: 730px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 761px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 730px) and (max-width: 761px) {
    width: 95px;
    height: 95px;
  }

  @media (max-width: 510px) and (min-width: 291px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 290px) {
    width: 150px;
    height: 150px;
    margin-top: 5%;
  }

  .fotoPerfil {
    border-radius: 3px;
  }
`;

export const Selects = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;

  @media (max-width: 450px) {
    margin-left: 0px;
  }
`;

export const BarraRespostas = styled.div`
  margin: 0% 0% 5% 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${Cores.cinza[9]};
  border-color: ${Cores.cinza[2]};
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  height: 50px;
  width: 100%;
  color: ${Cores.azul};

  @media (max-width: 300px) {
    font-size: 0.8em;
  }
`;

export const CamposFormularioCima = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
  border-color: ${Cores.cinza[3]};
  border-style: solid;
  border-width: 2px;
  font-size: 1.1em;
  font-weight: bold;
  height: 50px;
  width: 24%;
  overflow: auto;
  text-align: center;


  padding: 12.5px 12px 7px 12px;

  ::-webkit-scrollbar {
    width: 0px;
  }

  @media (min-width: 940) and (max-width: 970px) {
    font-size: 0.8em;
  }

  @media (min-width: 690px) and (max-width: 940px) {
    font-size: 0.78em;
  }

  @media (max-width: 690px) {
    width: 100%;
    height: 60px;
    font-size: 0.9em;
    margin-bottom: 2%;
    padding: 18px 15px 18px 15px;
  }
`;


export const CamposFormularioCimaUrgencia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border-color: ${Cores.cinza[3]};
  border-style: solid;
  border-width: 2px;
  font-size: 1.1em;
  font-weight: bold;
  height: 50px;
  width: 24%;
  gap: 2%;
  /* padding-left: 2%;
  padding-right: 2%; */

  @media (min-width: 940) and (max-width: 970px) {
    font-size: 0.8em;
  }

  @media (min-width: 690px) and (max-width: 940px) {
    font-size: 0.78em;
  }

  @media (max-width: 690px) {
    width: 100%;
    height: 60px;
    font-size: 0.9em;
    margin-bottom: 2%;
  }
`;

export const RotuloBarraDeBuscaOpcoes = styled.div`
  @media (max-width: 450px) {
    margin-top: 2%;
  }
`;

export const SelectTipos = styled(Select)`
  color: ${Cores.azul};
  font-weight: bold;
  font-size: 0.9em;
  background-color: green;

  .ant-select-arrow {
    color: ${Cores.azul};
  }
`;

export const ContainerBarraDeBuscaOpcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 5%;
  font-family: ${Fontes.roboto};
  text-decoration: underline;
  align-items: flex-start;

  @media (max-width: 760px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 450px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 20%;
  }
`;

export const BarraDePesquisa = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ant-input:placeholder-shown {
    background-color: green;
  }

  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
`;

export const NomePaciente = styled.div`
  font-size: 1.1em;
  padding-top: 0.4%;
  font-family: ${Fontes.roboto};
  font-weight: 400;
  text-decoration: underline;
  color: ${Cores.preto};
  display: flex;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 780px) {
    font-size: 1.2em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  @media (max-width: 560px) {
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
