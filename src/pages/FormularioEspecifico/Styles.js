import styled from "styled-components";
import { Select } from "antd";
import { Cores, Fontes } from "../../variaveis";

export const ColunaDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 100%;

  padding: 2% 4% 2% 4%;

  

  @media (max-width: 760px) and (min-height: 500px) {
    display: flex;
    justify-content: center;
    height: 50%;
    width: 98%;
    margin-top: 5%;
    
  }

  @media (max-width: 520px) {
    font-size: 1em;
  }
`;

export const ColunaEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100vh;

  padding: 2% 4% 2% 4%;

  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    height: 10%;
    width: 89%;
    padding: 0px;
    
  }
`;

export const ContainerFormularioEspecifico = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  gap: 2%;
  justify-content: center;
  padding: 2% 5% 2% 5%;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ContainerFormularioCima = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  width: 89%;
  height: 7%;
  
  margin-bottom: 3%;

  @media (max-width: 690px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
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
  height: 18%;
  width: 100%;
  border-color: ${Cores.azul};
  border-style: solid;
  border-width: 3px;
  padding: 1.5% 3% 1.5% 3%;
  //Conteudo dentro
  display: flex;
  flex-direction: row;

  @media (max-width: 510px) {
    flex-direction: column;
    height: 100%;
  }

  @media (max-width: 350px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const BarraDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 38%;
  text-align: center;

  @media (max-width: 510px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 
  }
`;

export const BarraEsquerda = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;

  @media (max-width: 510px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
  }
`;

export const BarraCentro = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: 32%;
  height: 80px;
  margin-top: 1.5%;

  @media (max-width: 510px) {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 40px;

  }

  @media (min-width: 761px) and (max-width: 1200px) {
    margin-left: 12%;
  }
`;

export const MargemEstetica = styled.div`
  height: 300%;

  @media (max-width: 760px) {
    height: 20%;
  }
`;

export const TextoBarraPaciente = styled.text`
  font-size: ${(props) => props.fontSize};
  color: ${Cores.preto};
  font-weight: ${(props) => props.fontWeight};
  justify-content: ${(props) => props.justifyContent};

  @media (max-width: 350px) {
    font-size: 0.9em;
  }
`;

export const ImagemPaciente = styled.img`
  align-items: center;
  justify-content: start;

  display: flex;
  align-items: center;

  @media (max-width: 510px) {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    
  }

  @media (min-width: 761px) {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    
  }

  @media (max-width: 430px) {
      width: 200px;
      height: 200px;
      
    }

    @media (max-width: 290px) {
      width: 150px;
      height: 150px;
      margin-top: 5%;

    }


  .fotoPerfil {
    border-radius: 3px;

    
  }
`;

export const Selects = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;


  @media (max-width: 850px) {
    flex-direction: column;
    height: 15vh;
  }
`;

export const BarraRespostas = styled.div`
  margin: 0% 0% 5% 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${Cores.cinza[9]};
  border-color: ${Cores.cinza[2]};
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  height: 50px;
  width: 100%;
  color: ${Cores.azul};

  @media (max-width: 300px) {
    font-size: 0.8em;
  }
`;

export const CamposFormularioCima = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border-color: ${Cores.cinza[3]};
  border-style: solid;
  border-width: 2px;
  font-size: 1.1em;
  font-weight: bold;
  height: 10vh;
  width: 24%;
  gap: 2%;
  padding: 2%;

  @media (min-width: 940) and (max-width: 970px) {
    font-size: 0.8em;
  }

  @media (min-width: 690px) and (max-width: 940px) {
    font-size: 0.78em;
  }

  @media (max-width: 690px) {
    width: 100%;
    height: 11vh;
    font-size: 0.9em;
    margin-bottom: 2%;
  }
`;

export const RotuloBarraDeBuscaOpcoes = styled.div`
  @media (max-width: 480px) {
    margin-top: 2%;
  }
`;

export const SelectTipos = styled(Select)`
  color: ${Cores.azul};
  font-weight: bold;
  font-size: 0.9em;

  .ant-select-arrow {
    color: ${Cores.azul};
  }

  @media (max-width: 760px) {
    margin-top: 50%;
  }
 
  
`;

export const ContainerBarraDeBuscaOpcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 5%;
  font-family: ${Fontes.roboto};
  text-decoration: underline;
  align-items: flex-start;

  @media (max-width: 760px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
 
`;

export const BarraDePesquisa = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
`;