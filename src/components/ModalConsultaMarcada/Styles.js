import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  width: 100%;
  height: 100%;
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
  margin-top: 15px;
  padding: 5% 0% 5% 0%;
  align-items: center;
  width: 100%;
  height: 90%;
  background-color: ${Cores.branco};
  border: 15px solid ${Cores.cinza[7]};
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

`;

export const Texto = styled.div`

  margin-left: 20%;
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
  font-weight: 600;
  font-size: 1.15em;
  display: flex;
  justify-content: center;
`;

export const TextoDescricao = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  height: 40px;
  font-family: ${Fontes.roboto};
  color: ${Cores.azulEscuro};
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


  @media (max-width: 640px) {
    width: auto;
  }
`;
