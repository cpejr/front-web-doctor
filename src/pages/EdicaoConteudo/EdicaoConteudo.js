import React from "react";
import { Container } from "./Styles";
import { BotaoGenerico } from "./Styles";
import { TituloPaginaEdicao } from "./Styles";

function EdicaoConteudo() {
  return (
    <Container>
        <TituloPaginaEdicao>Selecione a página do aplicativo que deseja editar</TituloPaginaEdicao>
        <BotaoGenerico>Home</BotaoGenerico>
        <BotaoGenerico>Sobre mim</BotaoGenerico>
        <BotaoGenerico>Comentários</BotaoGenerico>
        <BotaoGenerico>Grupo AIME</BotaoGenerico>
        <BotaoGenerico>Indicações e Sugestões</BotaoGenerico>
    </Container>
  );
}

export default EdicaoConteudo;
