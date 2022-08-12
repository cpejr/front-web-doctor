import styled from "styled-components";
import { Cores } from "../../variaveis";

export const ContainerListadeFormularios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;

export const TopoPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  @media (min-width: 1200px) and (max-width: 1400px) {
    justify-content: center;
    margin-left: 1%;
  }
  @media (min-width: 1090px) and (max-width: 1199px) {
    justify-content: center;
    margin-left: 3%;
  }
  @media (min-width: 921px) and (max-width: 1089px) {
    justify-content: center;
    margin-left: 4%;
  }
  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
  }
`;
export const BarraPesquisa = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
`;
export const Filtros = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;

  @media (max-width: 920px) {
    margin-top: 2%;
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 480px) {
    margin-top: 2%;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const FiltroEspecificoUrgencia = styled.div`

`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};
`;

export const ContainerFormulario = styled.div`
  padding: 2% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const DadosFormulario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 2%;

  @media (max-width: 560px) {
    gap: 2%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
export const Formulario = styled.div`
  width: 85%;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: ${Cores.azul};
  border-width: 3px;
  border-radius: 3px;
  justify-content: center;
  padding: 0% 2% 2% 2%;
  background-color: ${Cores.azulClaro};
`;

export const BotoesVertical = styled.div`
  width: 10%;
  display: flex;
  min-height: 20vh;
  justify-content: space-between;
  flex-direction: column;
  @media (max-width: 920px) {
    display: flex;
    flex-direction: row;
    width: 87%;
    margin-left: 2.5%;
    //justify-content: space-between;
  }

  @media (max-width: 560px) {
    display: flex;
    flex-direction: row;
    width: 85%;
    margin-right: 2.5%;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const BotaoVertical = styled.div`

@media (min-width: 451px) and (max-width: 920px){
    width: 30%;
  }

@media (max-width: 450px) {
    width: 100%;
    margin-top: 2%;
  }
`;


export const BotaoFinal = styled.div`
  width: 98%;
  display: flex;
  min-height: 20vh;
  justify-content: end;
  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 560px) {
    margin: 0% 10% 0% 10%;
    width: 80%;
  }
`;

export const ContainerFormularioEspecifico = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 2% 0% 2% 0%;
  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
  }
  @media (max-width: 450px) {
    margin: 5% 0% 5% 0%;
  }
`;

export const TituloFormulario = styled.div`
  font-size: 1.5em;
  text-decoration: underline;
  color: ${Cores.preto};

  @media (max-width: 780px) {
    font-size: 1.3em;
  }
  @media (max-width: 560px) {
    font-size: 1.4em;
  }
`;
export const TipoFormulario = styled.div`
  font-size: 1.2em;
  color: ${Cores.lilas[1]};
`;
export const UrgenciaFormulario = styled.div`
  font-size: 1.2em;
  color: ${Cores.lilas[1]};
  @media (max-width: 780px) {
    font-size: 1.3em;
  }
`;

export const Resposta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  font-size: 1.3em;
  width: 100%;
  @media (max-width: 560px) {
    align-items: center;
  }
`;
export const RespostaPendente = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;
