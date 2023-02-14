import React from "react";
import { Corpo, Container, TituloPaginaEdicao, BotaoGenerico } from "./Styles";
import { useHistory } from "react-router-dom";

function EdicaoConteudo() {
  const history = useHistory();
  return (
    <Corpo>
      <Container>
        <TituloPaginaEdicao>
          Selecione a página do aplicativo que deseja editar
        </TituloPaginaEdicao>
        <BotaoGenerico
          onClick={() => {
            history.push("/web/edicaohome");
          }}
        >
          Home
        </BotaoGenerico>
        <BotaoGenerico
        // onClick={() => {
        //   history.push("/web/Home");
        // }}
        >
          Sobre mim
        </BotaoGenerico>
        <BotaoGenerico
        onClick={() => {
          history.push("/web/edicaocomentario");
        }}
        >
          Comentários
        </BotaoGenerico>
        <BotaoGenerico
        // onClick={() => {
        //   history.push("/web/Home");
        // }}
        >
          Grupo AIME
        </BotaoGenerico>
        <BotaoGenerico
        // onClick={() => {
        //   history.push("/web/Home");
        // }}
        >
          Indicações e Sugestões
        </BotaoGenerico>
      </Container>
    </Corpo>
  );
}

export default EdicaoConteudo;
