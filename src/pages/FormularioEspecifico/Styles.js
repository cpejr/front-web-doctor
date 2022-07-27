import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const ColunaDireita = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100vh;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  border-width: 2px;
  border-radius: 3px;
  border-color: ${Cores.cinza[3]};
  border-style: solid;
  padding: 2% 4% 2% 4%;

  @media (max-width: 720px) and (min-height: 500px)  {
    display: flex;
    justify-content: center;
    height: 50%;
    width: 80%;
    margin-top: 5%;
  }

`;

export const ColunaEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100vh;
  border-color: ${Cores.cinza[3]};
  border-radius: 3px;
  border-style: solid;
  border-width: 2px;
  padding: 2% 4% 2% 4%;
  
  @media (max-width: 720px) {
    display: flex;
    justify-content: center;
    height: 50%;
    width: 80%;
  }

`;

export const ContainerFormularioEspecifico = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  gap: 2%;
  justify-content: center;
  padding: 2% 5% 2% 5%;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
`;

export const ContainerFormularioCima = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  height: 7vh;
  margin-bottom: 5%;
  
  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 5%;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 5px;
  width: 100%;
  background-color: ${Cores.azul};
`;

export const BarraPaciente = styled.div`
//Estetica:
  background-color: ${Cores.cinza[9]};
  margin-top: 5%;
  margin-bottom: 1%;
  height: 15vh;
  width: 100%;
  border-color: ${Cores.azul};
  border-style: solid;
  border-width: 3px;
  padding: 1.5% 3% 1.5% 3%;
//Conteudo dentro
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media (max-width: 350px)  {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

`;

export const TextoBarraPaciente = styled.div`

  font-size: ${(props) => props.fontSize};
  color: ${Cores.preto};
  font-weight: ${(props) => props.fontWeight};
  justify-content: ${(props) => props.justifyContent};
  align-content: flex-start;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 350px) {
    font-size: 0.9em;
  }
`;

export const ImagemPaciente = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  
  .fotoPerfil {
    border-radius: 3px;
    border-radius: 3px;

    @media (max-width: 350px) {
      width: 25%;
      height: 100%;
      margin-top:3%
    }
  }
`;

export const BarraRespostas = styled.div`

    margin: 2% 0% 5% 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Cores.cinza[9]};
    border-color: ${Cores.cinza[2]};
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    font-size: 1.2em;
    font-weight: bold;
    height: 6vh;
    width: 100%;
    gap: 2%;
    color: ${Cores.azulEscuro};
`;
  

export const RotuloFormularioCima = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-color: ${Cores.cinza[2]};
    border-style: solid;
    border-width: 2px;
    font-size: 1em;
    height: 6vh;
    width: 10%;
    gap: 2%;

`;

export const RotuloBarraDeBuscaOpcoes = styled.button`

    display: flex;
    flex-direction: row;
    border-style: solid;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    font-size: 1.2em;
    height: 6vh;
    width: 15%;
    flex-grow: 0;
    gap: 2%;
    cursor: pointer;
    background-color: ${Cores.branco};
`;

export const ContainerBarraDeBuscaOpcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  font-family: ${Fontes.roboto};
  text-decoration: underline;
  
  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 5%;
  }
`;

export const BarraDePesquisa = styled.div`
  width: 40%;
  height: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-width: 2px;
  border-style: solid;

`;
