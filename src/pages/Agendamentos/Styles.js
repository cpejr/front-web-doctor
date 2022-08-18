import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";
import { Select } from "antd";

export const ContainerListadeUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;
export const TopoPagina = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 920px) {
    width: 100%;
    height: 70%;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const TopoPaginaEsquerda = styled.div`
  display: flex;
  align-items: start;
  flex-direction: row;
  width: 65%;
  justify-content: space-between;

  @media (max-width: 920px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2%;
  }
  @media (max-width: 570px) {
    flex-direction: column;
    justify-content: center;
  }

`;


export const BarraPesquisa = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  @media (max-width: 920px) {
    width: 950px;
    justify-content: start;
  }
  @media (max-width: 840px) {
    width: 750px;
  }
  @media (max-width: 780px) {
    width: 550px;
  }
  @media (max-width: 690px) {
    width: 380px;
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 630px) {
    width: 280px;
  }
  @media (max-width: 570px) {
    width: 100%;
    margin-bottom: 5px;
  }
  
  .ant-input {
    height: 36px;
  }
  .ant-btn.ant-btn-default.ant-btn-icon-only.ant-input-search-button {
    height: 36px;
  }
`;

export const FiltroDatas = styled.div`

  width: 140px;
  display: flex;
  @media (max-width: 920px) {
    width: 240px;
    justify-content: end;
  }

  @media (max-width: 690px) {
    width: 140px;
  }

  @media (max-width: 490px) {
    justify-content: start;
    width: 100%;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};
`;
export const DadosUsuario = styled.div`
  color: ${Cores.azul};
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  padding: 0% 2% 0% 2%;
`;

export const ContainerUsuarios = styled.div`
  padding: 2% 0% 2% 0%;
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
  height: 80px;
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
  justify-content: center;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Imagem = styled.div`
  justify-content: center;
  object-fit: fill;
  width: 10%;
  width: 40px;
  display: flex;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Nome = styled.div`
  width: 18%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :hover {
    overflow: visible;
    cursor: pointer;
  }

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 33%;
  }
  @media (max-width: 500px) {
    width: 50%;
  }
`;
export const Telefone = styled.div`
  width: 18%;
  justify-content: center;
  display: flex;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    width: 33%;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
export const Data = styled.div`
  width: 25%;
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
  width: 18%;
  display: flex;
  justify-content: center;

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
  width: 18%;
  display: flex;
  justify-content: center;
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
  height: 36px;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 15px;
  padding-left: 12%;
  padding-right: 2%;
  
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};
  
`;
export const SelectData = styled(Select)`
  width: 160px;
  height: 36px;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 15px;
  padding-left: 4%;
  padding-right: 2%;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: ${Cores.cinza[8]};
`;
export const Filtros = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2%;
  @media (max-width: 920px) {
    width: 100%;
    justify-content: flex-end;
  }
  @media (max-width: 570px) {
    margin-top: 2%;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 330px) {
    margin-top: 2%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
export const FiltroSelect = styled.div`
  @media (max-width: 570px) {
    margin-top: 2%;
    margin-bottom: 2%;
  }
`;

export const FiltroInput = styled.div`
  @media (max-width: 570px) {
    margin-top: 2%;
    margin-bottom: 2%;
  }
`;

