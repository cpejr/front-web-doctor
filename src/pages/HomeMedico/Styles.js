import styled from "styled-components";

export const ContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: calc ( 100vh - 100px);
  align-items: center;
  justify-content: center;
  padding: 2% 5% 2% 5%;
`;
export const ContainerSuperior = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 2%;
  margin-bottom: 5%;
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
export const ContainerSecretario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  background-color: green;
  border-color: black;
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  border-width: 2px;
  padding: 2%;
  overflow: auto;
  @media (max-width: 1080px) {
    height: 200px;
    margin-bottom: 2%;
  }
  @media (max-width: 480px) {
    height: 250px;
    margin-bottom: 2%;
  }
`;
export const ContainerFormulario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  background-color: green;
  border-color: black;
  border-style: solid;
  border-radius: 3px;
  border-width: 2px;
  padding: 2%;
  overflow: auto;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  @media (max-width: 1080px) {
    height: 200px;
  }
`;
export const Secretarios = styled.div`
  width: 100%;
  height: 150px;
  background-color: #eaebf8;
  padding: 2%;
  border-color: black;
  border-style: solid;
  border-radius: 3px;
  border-width: 2px;
  margin-bottom: 2%;
  @media (max-width: 480px) {
    height: 250px;
  }
`;
export const Dados = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  align-items: center;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const InfoSecretario = styled.div`
  display: flex;
  color: black;
  background-color: #fdf1d1;
  width: 100%;
  height: 40px;
  border-color: black;
  border-style: solid;
  border-radius: 6px;
  border-width: 2px;
  align-items: center;
  padding-left: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2%;
  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;
export const BotoesSecretario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    gap: 2%;
  }
`;

export const Formulario = styled.div`
  border-radius: 6px;
  border-style: solid;
  border-color: #cfd3f8;
  background-color: #dcdff9;
  width: 100%;
  height: 100%;
  margin-bottom: 2%;
  padding: 2%; ;
`;

export const Botoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  gap: 2%;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;
