import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;
  padding-bottom: 5%;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${Cores.cinza[8]};
`;

export const CaixaInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 1%;
  width: 40%;

  @media (max-width: 850px) {
    width: 60%;
  }

  @media (max-width: 420px) {
    width: 80%;
  }
`;

export const Formulario = styled.div`
  display: block;
  max-width: 100%;
`;

export const CriarFormularioTitulo = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2.1em;
  font-family:${Fontes.barlow};
  color: ${Cores.azulEscuro};
  margin-bottom: 2%;

  @media (max-width: 820px) {
    font-size: 1.8em;
  }

  @media (max-width: 970px) and (min-width: 820px) {
    font-size: 2em;
  }

  @media (max-width: 820px) and (min-width: 560px) {
    font-size: 1.7em;
  }

  @media (max-width: 560px) {
    font-size: 1.6em;
  }

  @media (max-width: 340px) {
    justify-content: center;
  }
`;

export const TitulosInput = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  justify-content: start;
  margin-top: 2%;
  margin-bottom: 0%;
`;

export const TextoInstrucao = styled.text`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azul};
  text-align: center;
  width: 40%;
  margin-bottom: 0%;

  @media (max-width: 850px) {
    width: 60%;
  }

  @media (max-width: 420px) {
    width: 80%;
  }
`;

export const Instrucao = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;