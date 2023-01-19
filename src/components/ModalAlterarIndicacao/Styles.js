import styled from "styled-components";
import { Fontes, Cores } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;

  width: 100%;
`;

export const Titulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 2em;
  color: #0a0e3c;
  margin-top: 2%;
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  margin-top: 10px;
`;

export const Labels = styled.label`
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.2em;
`;
