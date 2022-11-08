import styled from 'styled-components';
import { Cores, Fontes } from '../../variaveis';
import { Modal as AntdModal } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 98%;
  height: 98%;
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

export const Modal = styled(AntdModal).attrs(() => ({
  footer: null,
}))`
  background-color: black;
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

export const CorpoCaixa = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

export const Titulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: ${Fontes.roboto};
  font-size: 2em;
  color: ${Cores.azulEscuro};
  margin-top: 2%;
  @media (max-width: 950px) and (min-width: 560px) {
    font-size: 1.5em;
  }

  @media (max-width: 800px) {
    margin-bottom: 3%;
  }

  @media (max-width: 560px) {
    font-size: 1.2em;
    margin-bottom: 8%;
  }
`;

export const InfoEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65%;
  height: 530px;
  overflow: auto;

  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-height: 810px) {
    height: 400px;
  }
  @media (max-height: 600px) {
    height: 300px;
  }
`;

export const InfoDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  min-height: 70vh;
  margin-left: 4%;
  margin-right: 4%;
  margin-bottom: 1%;

  @media (max-width: 800px) {
    width: 80%;
    height: auto;
    min-height: auto;
    gap: 10px;
    margin-top:15px;
    margin-bottom: 15px; 
  }
`;

export const NumeroAgendamentos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 3px;
  padding: 10%;
  margin-bottom: 18%;

  text-align: center;
  font-family: ${Fontes.roboto};
  font-size: 1.5em;
  color: ${Cores.azulEscuro};

  @media (max-width: 1100px) and (min-width: 800px) {
    font-size: 1em;
  }
  @media (max-width: 800px) and (min-width: 560px) {
    font-size: 1.2em;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 0px;
  }
  @media (max-width: 560px) {
    font-size: 1em;
  }
`;

export const Agendamento = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  align-self: start;
  width: 94%;
  margin-left: 6%;
  margin-top: 2%;

  @media (max-width: 1100px) {
    flex-direction: column;
    margin-left: 3%;
  }
`;

export const CaixaAgendamento = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 65%;
  height: 40px;
  background-color: ${Cores.lilas[4]};
  border-style: solid;
  border-color: ${Cores.lilas[3]};
  border-width: 0.2em;
  border-radius: 6px;
  margin-top: 5px;

  @media (max-width: 1100px) {
    width: 98%;
    height: 60px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    height: 73px;
  }
`;

export const BotoesEditarExcluir = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  width: 30%;
  height: 100%;

  @media (max-width: 1100px) and (min-width: 560px) {
    width: 98%;
    justify-content: space-between;
    align-items: start;
  }
  @media (max-width: 800px) {
    width: 98%;
  }
`;

export const TextoAgendamentoEspecifico = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
  height: 100%;
  font-family: ${Fontes.roboto};
  font-size: 1em;
  cursor: pointer;
  @media (max-width: 950px) {
    font-size: 0.8em;
  }
`;

export const DiaHorarioAgendamento = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 40%;
  justify-content: center;
  text-align: center;
  font-family: ${Fontes.roboto};
  font-size: 1em;
  font-weight: medium;
  cursor: pointer;

  @media (max-width: 1700px) {
    font-size: 0.8em;
  }
`;

export const BarraEstetica = styled.div`
  display: flex;
  background-color: ${Cores.lilas[3]};
  height: 100%;
  width: 3px;
  border-style: solid;
  border-color: ${Cores.lilas[3]};
  border-width: 0.2em;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const CaixaDataConsulta = styled.div`
  align-items: center;
  justify-content: center;
  width: 40%;
`;

export const CaixaNomeConsulta = styled.div`
  align-items: center;
  justify-content: center;
  width: 30%;
`;

export const CaixaHorarioConsulta = styled.div`
  align-items: center;
  justify-content: center;
  width: 53%;
`;
