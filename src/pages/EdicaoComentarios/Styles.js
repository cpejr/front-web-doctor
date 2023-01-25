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
  height: 100%;
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
  width: 100%;
  height: 600px;
  padding: 2%;
  background-color: blue;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const MetadeComentario = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2%;
  background-color: brown;
`;

export const MetadeBotoes = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2%;
  background-color: yellow;
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
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  padding: 2%;
  width: 100%;
  height: 20%;
`;

export const TodosComentarios = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 2%;
`;

export const Comentario = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
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

export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20%;
`;

export const BotaoAdicionar = styled.button`
  height: 60px;
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

`;
export const BotaoExcluir = styled.button`
  height: 60px;
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
`;