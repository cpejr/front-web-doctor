import styled from "styled-components";
import { Fontes, Cores } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20%;
  @media (max-width: 600px) {
    padding: 0 5%;
    font-size: 17px;
  }
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
  @media (max-width:282px) {
      align-items: center;
      justify-content: center;

  }
`;

export const Labels = styled.label`
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.2em;
`;

export const Rotulo = styled.div`
  width: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1em;
  color: ${Cores.vermelho};
`;