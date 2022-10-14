import styled from 'styled-components';
import { Cores, Fontes } from '../../variaveis';
import { Select } from 'antd';

export const ContainerListadeUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 25px 5% 2% 5%;
`;

export const TopoPagina = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  
  @media (max-width: 940px) {
    width: 100%;
    height: 70%;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
`;

export const TopoPaginaCima = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
  margin-bottom: 25px;

  @media (max-width: 940px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
   
  }
`;

export const BarraPesquisaComUmSelect = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 940px) {
    width: 80%;
  }

  .ant-input {
    height: 32px;
  }
  .ant-btn.ant-btn-default.ant-btn-icon-only.ant-input-search-button {
    height: 32px;
  }
`;

export const BarraPesquisaComDoisSelects = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 940px) {
    width: 100%;
  }

  .ant-input {
    height: 32px;
  }
  .ant-btn.ant-btn-default.ant-btn-icon-only.ant-input-search-button {
    height: 32px;
  }
`;

export const Filtros = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: 940px) {
    width: 100%;
    gap: 10px;

  }
  @media (max-width: 448px) {
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const SelectConsultorio = styled(Select)`
  width: 400px;
  color: ${Cores.preto};
  padding-right: 2%;
  height: 32px;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};

  @media (max-width: 940px) {
    width: 80%;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};

  
`;
export const DadosUsuario = styled.div`
  color: ${Cores.azul};
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  padding: 0% 2% 0% 2%;
`;

export const ContainerUsuarios = styled.div`
  padding: 0% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0% 1% 0% 1%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
`;

export const Titulo = styled.div`
  display: flex;
  width: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Imagem = styled.div`
  justify-content: center;
  align-items: center;
  object-fit: fill;
  width: 60px;
  height: 60px;
  display: flex;
  margin-right: 1%;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Nome = styled.div`
  width: 18%;
  white-space: normal;
  margin-left: 2%;
  // text-align: center;

  @media (max-width: 880px) {
    width: 18%;
    padding-left: 5px;
  }
  @media (max-width: 700px) {
    width: 20%;
  }
  @media (max-width: 600px) {
    width: 33%;
    padding-left: 10px;
  }
  @media (max-width: 500px) {
    width: 50%;
    padding-left: 10px;
  }
`;
export const Telefone = styled.div`
  width: 18%;
  justify-content: center;
  display: flex;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Data = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;

  @media (max-width: 880px) {
    width: 30%;
  }
  @media (max-width: 700px) {
    width: 30%;
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

export const Agendamento = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 27%;
  }
  @media (max-width: 600px) {
    width: 33%;
  }
  @media (max-width: 500px) {
    width: 50%;
  }
`;

export const CódigoPaciente = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  text-align: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 770px) {
    display: none;
  }
`;

export const BotaoNovoAgendamento = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 40px;
`;

export const InputData = styled.input`
  width: 160px;

  height: 32px;
  color: ${Cores.preto};
  padding-left: 4%;
  padding-right: 2%;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};

  @media (max-width: 940px) {
    width: 50%;
  }

  @media (max-width: 448px) {
    width: 80%;
  }
`;
export const SelectData = styled(Select)`
  width: 160px;
  color: ${Cores.preto};
  padding-right: 2%;
  height: 32px;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};

  @media (max-width: 940px) {
    width: ${(props) => {
      let tamanho;
      if (props.FiltrarData === '') {
        tamanho = '100%';
      } else {
        tamanho = '50%';
      }

      return tamanho;
    }};
  }

  @media (max-width: 448px) {
    width: 80%;
  }
`;

export const SelectTipoAgendamento = styled(Select)`
  width: 160px;
  color: ${Cores.preto};
  padding-right: 2%;
  height: 32px;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};

  @media (max-width: 940px) {
    width: 80%;
  }

  @media (max-width: 448px) {
    width: 80%;
  }
`;

export const FiltroInput = styled.div``;
