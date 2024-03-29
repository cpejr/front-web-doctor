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
    font-size: 15px;
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
  font-size: 1.5em;
  color: #0a0e3c;
  margin-top: 2%;
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin-bottom: 15px;
  margin-top: 15px;
`;
