import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerListadeReceitas = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;
export const TopoPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
  }
`;
export const BarraPesquisa = styled.div`
  width: 50%;
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
`;
export const Filtros = styled.div`
  width: 50%;
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;
  @media (max-width: 920px) {
    margin-top: 2%;
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 450px) {
    margin-top: 2%;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export const FiltroReceita = styled.div`
  @media (max-width: 480px) {
    margin-top: 2%;
  }
`;

export const FiltroDatas = styled.div`
  @media (max-width: 480px) {
    margin-top: 2%;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};
`;
export const DadosReceita = styled.div`
  color: ${Cores.azul};
  justify-content: space-around;
  display: flex;
  flex-direction: row;
`;

export const ContainerReceitas = styled.div`
  padding: 2% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Receita = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0% 1% 0% 1%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
`;

export const z = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  @media (max-width: 880px) {
    display: none;
  }
`;

export const Titulo = styled.div`
  width: 18%;
  justify-content: center;

  white-space: nowrap;
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
  }
`;

export const Imagem = styled.div`
  justify-content: center;
  object-fit: fill;
  width: 10%;
  width: 40px;
  display: flex;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Nome = styled.div`
  width: 18%;
  display:flex;
  justify-content: center;

  white-space: nowrap;
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
  }
`;
export const Telefone = styled.div`
  width: 18%;
  justify-content: center;
  display: flex;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
export const DataCriacao = styled.div`
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
  @media (max-width: 600px) {
    display: none;
  }
`;
export const BotaoAdicionar = styled.div`
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
  @media (max-width: 600px) {
    width: 33%;
  }
  @media (max-width: 500px) {
    width: 50%;
  }
`;

export const CódigoPaciente = styled.div`
  width: 18%;
  display: flex;
  justify-content: center;
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
    display: none;
  }
`;
export const CaixaVazia = styled.div`
  width: 18%;

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
  }
`;

export const BotaoMedico = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: center;

  @media (max-width: 920px) {
    width: 100%
  }
`;


export const BotaoSecretario = styled.div`
  position: relative;
  left: 25%;
  width: 50%;
  margin-top: 1%;

  @media (max-width: 920px) {
    left: 0%;
    width: 100%
  }
`;
