import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Corpo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
export const Container = styled.div`
    border: solid 1px black;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    width: 652px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 7%;
    margin-bottom: 7%;
    font-weight: 400;

    @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
   }
    @media (max-width: 780px) {
    width: 85%;
    }
   @media (max-width: 360px) {
    height: 450px;
   }
`
export const TituloPaginaEdicao = styled.p`
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 18px;
    padding-bottom: 18px;
    font-size: 30px;
    text-align: center;
    font-family: 'Roboto Condensed', sans-serif;
    
    @media (max-width: 479px) {
      font-size: 27px;
  }
    @media (max-width: 780px) {
    padding-left: 10%;
    padding-right: 10%;
    }
    @media (max-width: 431px) {
      font-size: 25px;
    }
    @media (max-width: 400px) {
      font-size: 22px;
    }
    @media (max-width: 360px) {
      font-size: 18px;
      padding-top: 0px;
    }
`
export const BotaoGenerico = styled.button`
    background-color: #CFD3F8;
    font-size: 20px;
    height: 10%;
    width: 76%;
    margin-bottom: 4%;
    border-radius: 6px;
    border: solid 3px #BBC0F4;
    font-family: 'Roboto Condensed', sans-serif;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`
export const BotaoSemLinkagem = styled.button`
    background-color: green;
    font-size: 20px;
    height: 10%;
    width: 76%;
    margin-bottom: 4%;
    border-radius: 6px;
    border: solid 3px #BBC0F4;
    font-family: 'Roboto Condensed', sans-serif;
    
    @media (max-width: 600px) {
    margin-bottom: 5%;
  }
    @media (max-width: 425px) {
    font-size: 18px;
  }
    @media (max-width: 360px) {
    font-size: 14px;
  }
`

