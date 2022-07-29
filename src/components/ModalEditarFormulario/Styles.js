import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: ${Cores.cinza[8]} ;
`;

export const PerguntaBotao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-self:center;
  width: 100%;
  margin-bottom: 3%;
`;

export const Pergunta = styled.div`
  font-size: 1.3em;
  font-family: ${Fontes.roboto};
  width: 70%;
  align-self: center;
`;
