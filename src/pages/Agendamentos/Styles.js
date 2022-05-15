import styled from "styled-components";

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
  flex-direction: row;
  justify-content: space-around;
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
  .ant-input {
    background-color: green;
  }
  .ant-btn.ant-btn-default.ant-btn-icon-only.ant-input-search-button {
    background-color: green;
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
  @media (max-width: 450px) {
    margin-top: 2%;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export const FiltroUsuario = styled.div`
  @media (max-width: 480px) {
    margin-top: 2%;
  }
`;
export const FiltroDatas = styled.div`
  @media (max-width: 480px) {
    margin-top: 2%;
  }
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: #151b57; ;
`;
export const DadosUsuario = styled.div`
  color: #151b57;
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
  border-color: black;
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
  width: 18%;
  display: flex;
  justify-content: center;
  color: black;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    width: 25%;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
export const Agendamento = styled.div`
  width: 18%;
  display: flex;
  justify-content: center;
  color: green;
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
export const CódigoPaciente = styled.div`
  width: 18%;
  display: flex;
  justify-content: center;
  color: green;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
export const BotaoNovoAgendamento = styled.div`
  display: flex;
  justify-content: end;
  
`;
