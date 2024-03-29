import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const ContainerEditarPerfil = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  gap: 2%;
  align-items: center;
  justify-content: center;
  padding: 2% 5% 2% 5%;
  @media (max-width: 930px) {
    justify-content: normal;
    display: flex;
    flex-direction: column;
    
  }
`;
export const ColunaEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 114vh;
  border-color: ${Cores.cinza[3]};
  border-radius: 3px;
  border-style: solid;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  border-width: 2px;
  padding: 2% 4% 2% 4%;
  @media (max-width: 930px) {
    justify-content: space-around;
    height: 50vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  @media (max-width: 670px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 360px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export const ColunaDireita = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 114vh;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  border-width: 2px;
  border-radius: 3px;
  border-color: ${Cores.cinza[3]};
  border-style: solid;
  @media (max-width: 930px) {
    margin-top: 5%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const AlterarDados = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.5em;
`;

export const Preenchimento = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
  margin-bottom: 0px;
  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

export const CaixaInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 0;
  gap: 1%;
  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 560px) {
    padding-left: 4%;
    padding-right: 4%;
  }
`;

export const Titulo = styled.label`
  margin-top: 5%;
  @media (max-width: 930px) {
    margin-top: 5%;
  }
  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

export const CaixaBotao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 2%;
  @media (max-width: 560px) {
    padding-left: 4%;
    padding-right: 4%;
    margin-top: 5%;
  }
`;

export const ImagemPerfil = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12em;
  margin-bottom: 1%;
  .fotoPerfil {
    font-size: 12em;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    margin-bottom: 4%;
    border-radius: 3px;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
    @media (max-width: 930px) {
      font-size: 8em;
      width: 150px;
      height: 150px;
    }
    @media (max-width: 670px) {
      width: 50%;
      height: 80%;
    }
  }
  @media (max-width: 930px) {
      font-size: 8em;
    }
`;

export const CaixaBotoesFoto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  gap: 20px;
  @media (max-width: 930px) {
    margin-top: 10px;
  }
  @media (max-width: 670px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const BlocoSuperior = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  @media (max-width: 930px) {
    height: 100%;
    justify-content: center;
    gap: 2%;
  }
`;
export const BlocoInferior = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: flex-end;
  gap: 10%;
  @media (max-width: 930px) {
    justify-content: center;
    height: 100%;
    display: flex;
    width: 50%;
    gap: 2%;
  }
  @media (max-width: 670px) {
    display: flex;
    height: 8.5vh;
    flex-direction: row;
    width: 100%;
    gap: 2%;
    margin-top: 8%;
  }
`;

export const Rotulo = styled.div`
  width: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1em;
  color: ${Cores.vermelho};
`;

export const RotuloColuna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;