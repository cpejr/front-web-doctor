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
  margin-bottom: 2%;
  width: 100%;
  height: 100%;

`;

export const BoxComentarioBotao = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 2%;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MetadeComentario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 2%;
  box-shadow: 10px;

`;

export const MetadeBotoes = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 2%;

  vertical-align: middle;
  margin-left: 50px;

  @media (max-width: 800px) {
    margin-left: 0px;
  }
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
  margin-bottom: 5%;
  width: 100%;
  height: 10%;

  @media (max-width: 1100px) {
    margin-bottom:10%;
  }

  @media (max-width: 800px) {
    margin-bottom:2%;
  }
`;

export const ContainerTodosComentarios = styled.div`
  width: 100%;
  height: 50%;
  max-height: 512px;
  overflow: auto;
  background-color: white;
`;

export const TodosComentarios = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  @media (max-width: 800px) {
    align-items: center;
  }
`;

export const Comentario = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 3%;
  margin-bottom: 2%;
  font-size: 16px;
  font-family: 'Barlow', sans-serif;
  font-weight: 550;
  line-height: 22px;
  text-align: center;
`;

export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: white;
  padding: 20%;

  @media (max-width: 900px) {
    width:100%;
  }

  @media (max-width: 800px) {
    padding: 10%;
  }
`;

export const BotaoAdicionar = styled.button`
  height: 200px;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #434B97;
  font-family: 'Barlow', sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  color: white;
  border-color: #000000;
  border-width: 3px;
  margin-top: 5%;
  margin-bottom:3%;
  border-style:solid;

  @media (max-width: 800px) {
    height: 80px;
    font-size: 25px;
  }

  @media (max-width: 500px) {
    height: 80px;
    font-size: 20px;
  }

`;
export const BotaoExcluir = styled.button`
  height: 200px;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #434B97;
  font-family: 'Barlow', sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0em;
  color: white;
  border-color: #000000;
  border-width: 3px;
  margin-top: 5%;
  margin-bottom:3%;
  border-style:solid;

  @media (max-width: 800px) {
    height: 80px;
    font-size: 25px;
  }

  @media (max-width: 500px) {
    height: 80px;
    font-size: 20px;
  }
`;