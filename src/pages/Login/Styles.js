import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 1%;
  background-color: ${Cores.cinza[8]} ;
`;

export const DadosLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const Botoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 40%;
  font-size: 1em;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const BotoesAlternativos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
  @media (max-width: 360px) {
    font-size: 0.8em;
  }
`;
export const Estetica = styled.div`
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  color: ${Cores.azul};
  align-items: center;
  justify-content: space-between;
  gap: 5%;
  font-family: ${Fontes.roboto};
  font-size: 1em;
  width: 40%;
  @media (max-width: 1100px) {
    width: 70%;
  }
`;
export const BarraEstetica = styled.div`
  color: ${Cores.azul};
  background-color: ${Cores.azul};
  height: 1px;
  width: 40%;
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 33%;
  min-width: 120px;
  min-height: 120px;
  .logo{ border-radius: 15px;}
`;

export const Rotulo = styled.div`
  width: 100%;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 1em;
  color: #E00000;
`;