import styled from "styled-components";
import { Cores } from "../../variaveis";
import { Select } from "antd";

export const TopoPagina = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const BarraPesquisa = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 920px) {
    width: 70%;
  }

  @media (max-width: 590px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Botoes = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-around;
  gap: 10px;

  @media (max-width: 550px) {
    flex-direction: column;
  }

  @media (max-width: 920px) {
    justify-content: space-between;
  }
`;

export const FiltroPaciente = styled(Select)`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 2%;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const BotaoAdicionar = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 920px) {
    justify-content: flex-end;
    width: 100%;
  }
`;

export const ContainerListadeReceitas = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 25px 5% 2% 5%;
`;

export const BarraEstetica = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};

  @media (max-width: 940px) {
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

export const DadosReceita = styled.div`
  color: ${Cores.azul};
  justify-content: space-around;
  display: flex;
  margin-bottom: 15px;
  flex-direction: row;
  @media (max-width: 500px) {
    justify-content: space-between;
  }
`;

export const ContainerReceitas = styled.div`
  padding: 0% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Receita = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  column-gap: 10px;
  width: 100%;
  height: 90px;
  padding: 0% 1% 0% 1%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
  @media (max-width: 600px) {
    padding: 0% 2% 0% 2%;
  }
`;

export const Titulo = styled.div`
  width: 36%;
  justify-content: center;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    overflow: visible;
    cursor: pointer;
  }

  @media (max-width: 880px) {
    width: 40%;
  }
  @media (max-width: 700px) {
    width: 45%;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

export const NomePaciente = styled.div`
  width: 18%;
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    overflow: visible;
    cursor: pointer;
  }

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 33%;
  }
  @media (max-width: 500px) {
    width: 50%;
    justify-content: flex-start;
  }
`;

export const DataCriacao = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

export const BotaoDeletar = styled.div`
  width: 18%;
  display: flex;
  justify-content: center;
  color: green;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
`;
