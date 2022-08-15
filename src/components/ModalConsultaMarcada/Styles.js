import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  width: 22vw;
  height: 100%;
  background-color: ${Cores.cinza[7]};

  @media (max-width: 1101px) {
    width: 26vw;
  }
  @media (max-width: 830px) {
    width: 30vw;
  }
  @media (max-width: 670px) {
    width: 45vw;
  }

  @media (max-width: 400px) {
    width: 50vw;
    height: auto;
  }
`;

export const Caixa = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  padding: 5% 0% 5% 0%;
  align-items: center;
  width: 100%;
  height: 90%;
  background-color: ${Cores.branco};
  border: 15px solid ${Cores.cinza[7]};
  border-radius: 3px;

  @media (max-width: 1100px) and (min-width: 830px) {
    padding: 0% 0% 0% 0%;
  }
  @media (max-width: 670px) {
    width: 45vw;
  }
  @media (max-width: 400px) {
    width: 50vw;
    border: 5px solid ${Cores.cinza[7]};
    padding: 0% 0% 0% 0%;
    justify-content: center;
  }
`;

export const CaixaNome = styled.div`
  width: 90%;
  height: 20%;
  background-color: ${Cores.cinza[7]};
  display: flex;
  justify-content: start;
  box-shadow: 5px 5px 8px 0px rgba(0, 0, 0, 0.2);
  padding-left: 10px;
  align-items: center;
  border: 1px solid #000000;
  border-color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  @media (max-width: 1101px) {
      margin-top: 5%;
  }
  @media (max-width: 700px) {
      height: 65px;
  }
  @media (max-width: 400px) {

      justify-content: center;
      align-items: center;
  }
  
`;

export const Texto = styled.div`

  margin-left: 20%;
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  font-weight: 600;
  font-size: 1.15em;
  display: flex;
  justify-content: center;

  @media (max-width: 710px) {
    font-size: 1.1em;
    margin-left: 15%;
  }
  @media (max-width: 580px) {
    font-size: 1em;
    margin-left: 8%;
  }
  @media (max-width: 400px) {
    font-size: 0.85em;
    margin-left: 7%;
  }
`;

export const TextoDescricao = styled.div`
  display: flex;
  justify-content: center;
  font-style: italic;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
  height: auto
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  font-size: 1.15em;

  @media (max-width: 1200px) {
    font-size: 1.1em;
    width: 80%;
    
    
  }


  @media (max-width: 710px) {
    font-size: 1.05em;
    width: 90%;
    
  } 

  @media (max-width: 400px) {
    font-size: 1em;
    width: 90%;
  }

  
`;


export const TextoInformacoes = styled.div`
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: start;
`;

export const CaixaInformações = styled.div`
  width: 80%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  @media (max-width: 1101px) {
    margin-bottom: 5%;
  }
  @media (max-width: 710px) {
    height: 80px;
    width: 90%;
    justify-content: space-between;
  }
`;




export const FotoPerfil = styled.div`
  display: flex;
  width: 37px;
  height: 37px;
  object-fit: fill;
  border-radius: 5px;
  justify-content: center;


  @media (max-width: 640px) {
    width: auto;
  }
`;
