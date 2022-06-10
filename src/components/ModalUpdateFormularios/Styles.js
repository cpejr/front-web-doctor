import styled from "styled-components";
import { Cores } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${Cores.cinza[8]} ;
`;

export const CaixaInputs = styled.div`
  display: flex ;
  flex-direction: column;
  align-self: center;
  margin-bottom: 2%;
  width: 40%;
`;