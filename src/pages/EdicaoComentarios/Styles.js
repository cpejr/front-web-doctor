import styled from 'styled-components';
import { Cores } from "../../variaveis";


export const PaginaEdicaoComentario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 25px 5% 2% 5%;
`;

export const BoxComentario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 2%;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
`;

export const Titulo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Barlow', sans-serif;
  font-size: 35px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  width: 100%;
  height: 30%;

`;

export const BoxComentarioBotao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 70%;
  padding: 2%;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MetadeComentario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2%;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const MetadeBotoes = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 10% 2% 10% 2%;
  vertical-align: middle;

`;

export const ContainerComentario = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const TituloComentariosDepoimentos = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Barlow', sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  padding: 2%;
  width: 100%;
  height: 10%;

  @media (max-width: 800px) {
    margin-bottom:2%;
  }
`;

export const ContainerTodosComentarios = styled.div`
  width: 100%;
  height: 50%;
  max-height: 600px;
  overflow: auto;
  background-color: white;
`;

export const TodosComentarios = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 800px) {
    align-items: center;
  }
`;

export const Comentario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 3%;
  font-size: 16px;
  font-family: 'Barlow', sans-serif;
  font-weight: 550;
  line-height: 22px;
  text-align: center;
  white-space: pre-wrap;
`;

export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50%;
  background-color: white;
  padding: 10%;
  row-gap: 10%;
  margin-left: 10%;

  @media (max-width: 1000px) {
    margin-left: 0%;
  }

  @media (max-width: 800px) {
    padding: 10%;
  }
`;

export const TextoIcone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2%;
  width: 100%;
`;

export const TextoBotoes = styled.div`
  width: 220px;
  display: flex;
  justify-content: flex-start;
`;