import React from "react";
import { Container } from "./Styles";
import { BotaoGenerico } from "./Styles";
import { BotaoSemLinkagem } from "./Styles";
import { TituloPaginaEdicao } from "./Styles";
import { Corpo } from "./Styles";
import { useHistory } from 'react-router-dom';

function EdicaoConteudo() {
  const history = useHistory();
  return (
    <Corpo>
      <Container>
          <TituloPaginaEdicao>Selecione a página do aplicativo que deseja editar</TituloPaginaEdicao>

          <BotaoGenerico
          onClick={() => {
            history.push('/web/Home');
          }}
          >Home</BotaoGenerico>

          <BotaoSemLinkagem
          /*</Container>onClick={() => {
            history.push('/web/Home');
          }}*/
          >Sobre mim</BotaoSemLinkagem>

          <BotaoSemLinkagem
          /*onClick={() => {
            history.push('/web/Home');
          }}*/
          >Comentários</BotaoSemLinkagem>

          <BotaoSemLinkagem
          /*onClick={() => {
            history.push('/web/Home');
          }}*/
          >Grupo AIME</BotaoSemLinkagem>

          <BotaoSemLinkagem
          /*onClick={() => {
            history.push('/web/Home');
          }}*/
          >Indicações e Sugestões</BotaoSemLinkagem>

      </Container>
    </Corpo>
  );
}

export default EdicaoConteudo;
