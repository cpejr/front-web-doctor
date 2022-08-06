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
  margin-top: 2%;
  margin-bottom: 0%;
`;

export const Instrucao = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;