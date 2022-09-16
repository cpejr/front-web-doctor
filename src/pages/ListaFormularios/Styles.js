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

export const FiltroEspecificoUrgencia = styled.div``;

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
  align-items: center;;
  //margin-bottom: 2%;

  @media (max-width: 960px) {
    align-items: center;
    /* margin-top: 1.5%;
    align-items: flex-start; */
  }

  @media (max-width: 560px) {
    gap: 2%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
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
  padding: 2% 2% 2% 2%;
  background-color: ${Cores.azulClaro};
`;

export const BotoesVerticalMaster = styled.div`
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

export const BotoesVerticalSecretaria = styled.div`
  width: 10%;
  display: flex;
  min-height: 20vh;
  justify-content: center;

  flex-direction: column;
  @media (max-width: 920px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    width: 87%;
    margin-left: 2.5%;
    margin-top: 2%;
    min-height: 10vh;
  }

  @media (max-width: 560px) {
    display: flex;
    margin-top: 2%;
    width: 85%;
    margin-right: 2.5%;
    align-items: flex-start;
  }
  @media (max-width: 450px) {
    align-items: flex-start;
    margin-top: 2%;
  }
`;
export const BotaoVertical = styled.div`
  @media (min-width: 451px) and (max-width: 920px) {
    width: 30%;
  }

  @media (max-width: 450px) {
    width: 100%;
    margin-top: 2%;
  }
`;

export const TopoPaginaBotao = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1% 0 0 1%;
  @media (max-width: 920px) {
    padding: 1% 2% 0% 2%;
    
  }
  @media (max-width: 560px) {
    padding: 3% 0.5% 0% 0.5%;
  }
`;

export const BotaoFinal = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  height:  60px;
  @media (max-width: 920px) {
   width: 400px;
   justify-content: center;
  }

  @media (max-width: 560px) {
    
    justify-content: center;
  }


  @media (min-width: 560px) and (max-width: 920px) {

    justify-content: center;
    align-items: center;
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
  display: flex;
  justify-content: center;
  font-size: 1.3em;
  color: ${Cores.lilas[1]};
  width: 33%;
  @media (max-width: 780px) {
    font-size: 1.2em;
  }
  @media (max-width: 560px) {
    width: 100%;
  }

`;
export const UrgenciaFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  width: 33%;
  color: ${Cores.lilas[1]};
  @media (max-width: 780px) {
    font-size: 1.2em;
  }
  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const TextoUrgencia = styled.div`
  margin-right: 5px;
`;

export const CaixaTitulo = styled.div`
   width: 33%;
   display: flex;
   justify-content: center;
   align-items: center;

   @media (max-width: 560px) {
    width: 100%;
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
