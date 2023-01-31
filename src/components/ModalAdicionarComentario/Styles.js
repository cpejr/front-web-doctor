import styled from "styled-components";
import { Cores, Fontes } from '../../variaveis';
import { Modal as AntdModal } from 'antd';

export const ContainerModalCodigo = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 2% 20% 2% 20%;

  @media (max-width: 950px) and (min-width: 560px) {
    padding: 2% 10% 2% 10%;
  }
  @media (max-width: 560px) {
    padding: 2% 0% 2% 0%;
  }
`;

export const Titulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 2em;
  color: #0a0e3c;
  margin-top: 2%;
  margin-bottom: 2%;
  @media (max-width: 950px) and (min-width: 560px) {
    font-size: 1.5em;
  }
  @media (max-width: 560px) {
    font-size: 1.2em;
    margin-bottom: 8%;
  }
`;

export const Texto = styled.div`
  display: flex;
  align-items: center;
  justify-content:start;
  text-align: left;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 18px;
  font-weight:700;
  color: #000000;

  @media (max-width: 950px) and (min-width: 560px) {
    font-size: 1.5em;
  }
  @media (max-width: 560px) {
    font-size: 1.2em;
    margin-bottom: 8%;
  }
`;

export const BotaoAdicionar = styled.button`
  height: 50px;
  width: 50%;
  border-radius: 3px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #434B97;
  font-family: 'Barlow', sans-serif;
  font-size: 1.8em;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  color: white;
  border-color: #000000;
  border-width: 3px;
  margin-bottom:3%;
  margin-top: 2%;
  border-style:solid;

  @media (max-width: 500px) {
    font-size: 1.2em;
    height: auto;
  }
`;

export const TextoIcone = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;