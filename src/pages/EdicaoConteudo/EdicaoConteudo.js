import React from "react";
import { Container } from "./Styles";

function EdicaoConteudo() {
  return (
    <Container>
      <div>
        <p>Selecione a página do aplicativo que deseja editar</p>
        <button>Home</button>
        <button>Sobre mim</button>
        <button>Comentários</button>
        <button>Grupo AIME</button>
        <button>Indicações e Sugestões</button>
      </div>
    </Container>
  );
}

export default EdicaoConteudo;
