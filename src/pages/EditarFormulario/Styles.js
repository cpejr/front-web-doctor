import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${Cores.cinza[8]};
`;

export const CaixaInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 2%;
  width: 40%;

  @media (max-width: 850px) {
    width: 60%;
  }

  @media (max-width: 420px) {
    width: 80%;
  }
`;

export const EditarFormularioTitulo = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-size: 2.1em;
  font-family: ${Fontes.barlow};
  color: ${Cores.azulEscuro};
  margin-top: 10%;

  @media (max-width: 820px) {
    font-size: 1.8em;
  }

  @media (max-width: 970px) and (min-width: 820px) {
    font-size: 1.9em;
  }

  @media (max-width: 820px) and (min-width: 560px) {
    font-size: 1.7em;
  }

  @media (max-width: 560px) {
    font-size: 1.5em;
  }

  @media (max-width: 340px) {
    justify-content: center;
  }
`;

export const Titulo = styled.div`
  color: ${Cores.azulEscuro};
`;

export const TextoOrientacao = styled.div`
  color: ${Cores.azulEscuro};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 400;
`;

export const ContainerAdicionarPergunta = styled.div`
  border: solid;
  border-color: ${Cores.azul};
  border-width: 2px;
  border-style: solid;
  padding: 2%;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  
`;

export const TituloContainer = styled.div`
  font-size: 1.2em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  margin-bottom: 3%;
`;
