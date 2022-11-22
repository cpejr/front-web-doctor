import React from "react";
import { Cores } from "../../variaveis";
import { EdicaoComentariosPagina, ContainerEdicaoComentarios, TituloEdicaoComentario, SubtituloEdicaoComentario, TextAreaComentario, BotaoSalvarAlteracoes, BotaoEditarAlteracoes } from './Styles';

function EdicaoComentarios() {
  return (
    <EdicaoComentariosPagina>
    <ContainerEdicaoComentarios>
        <TituloEdicaoComentario>Página Comentários</TituloEdicaoComentario>
        <SubtituloEdicaoComentario>Comentários e depoimentos:</SubtituloEdicaoComentario>
        <TextAreaComentario
          rows={4}
          name="comentario"
          style={{
            borderWidth: "1px",
            borderColor: Cores.azul,
            color: "black",
          }}></TextAreaComentario>
        <BotaoSalvarAlteracoes>Salvar Alterações</BotaoSalvarAlteracoes>
        <BotaoEditarAlteracoes>Cancelar Alterações</BotaoEditarAlteracoes>
    </ContainerEdicaoComentarios>
    </EdicaoComentariosPagina>
  );
}

export default EdicaoComentarios;