import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 40%;
  padding: 3% 2% 2% 2%;
  background-color: ${Cores.cinza[7]};

  @media (max-width: 560px) {
    padding: 0% 0% 0% 0%;
    width: 100%;
  }
  @media (max-width: 1100px) and (min-width: 800px) {
    padding: 0% 0% 0% 0%;
  }
`;


export const Caixa = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 98%;
  margin: 1% 1.5% 1% 1.5%;
  min-height: 80vh;
  background-color: ${Cores.branco};
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 3px;

  @media (max-width: 560px) {
    margin: 0% 0% 0% 0%;
    width: 100%;
  }
  @media (max-width: 1100px) and (min-width: 800px) {
    padding: 0% 0% 0% 0%;
  }
`;

export const CaixaNome = styled.div`
  width: 90%;
  height: 45px;
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

`;

export const Texto = styled.div`
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  font-style: italic;
`;

export const TextoDescricao = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8%;
  height: 40px;
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  font-style: italic;
  font-size: 1.2em;
  
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
  Justify-content: space-between;
  align-items: start;

`;




export const FotoPerfil = styled.div`
  display: flex;
  width: 37px;
  height: 37px;
  object-fit: fill;
  border-radius: 5px;
  justify-content: center;
  margin-right: 20px;


  @media (max-width: 640px) {
    width: auto;
  }
`;
