import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerModalNovaConversa = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  height: 100%;
  min-width:200px;
`;

export const Titulo = styled.div`
  display: flex;
  font-size: 2em;
  font-weight:bold;
  margin-bottom:7%;
  margin-top:3%;

  @media (max-width: 360px) {
    font-size: 1.5em;
  }
`;

export const Subtitulo = styled.div`
  display: flex;
  align-self:flex-start;
  margin-left:16%;
  font-size: 1.3em;
  font-weight:bold;

  @media (max-width: 410px) {
    align-self:center;
    margin-left:0%;
  }

  @media (max-width: 360px) {
    font-size: 1.1em;
  }
`;

export const TamanhoSelect = styled.div`
  display: flex;
  align-items:center;
  width:80%;
  margin-bottom:25%;

  @media (max-width: 410px) {
    margin-right:10%;
  }
`;

export const LocalBotao = styled.div`
  display: flex;
  align-self:flex-end;
  justify-self:flex-end;
  height:45px;
  width:20%;
  min-width:80px;
`;


