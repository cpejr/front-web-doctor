import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
    border: solid 1px black;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    width: 652px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 119px;
    font-weight: 400;
    @media (max-width: 780px) {
    width: 85%;
  }
`
export const TituloPaginaEdicao = styled.p`
    padding-left: 20%;
    padding-right: 20%;
    font-size: 30px;
    padding-bottom: 18px;
    text-align: center;
    font-family: 'Roboto Condensed', sans-serif;
    @media (max-width: 780px) {
    font-size: 20px;
  }
  @media (max-width: 360px) {
    font-size: 15px;
  }
`
export const BotaoGenerico = styled.button`
    background-color: #CFD3F8;
    font-size: 20px;
    height: 61px;
    width: 76%;
    margin-bottom: 31px;
    border-radius: 6px;
    border: solid 3px #BBC0F4;
    font-family: 'Roboto Condensed', sans-serif;
    @media (max-width: 780px) {
    font-size: 15px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
    height: 40px;
  }
`

