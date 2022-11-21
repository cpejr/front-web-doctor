import React from "react";
import { ContainerEdicaoComentarios, TituloEdicaoComentario, SubtituloEdicaoComentario, TextAreaComentario, BotaoSalvarAlteracoes, BotaoEditarAlteracoes } from './Styles';

function EdicaoConteudo() {
  return (
    <ContainerEdicaoComentarios>
        <TituloEdicaoComentario>Pagina Comentários</TituloEdicaoComentario>
        <SubtituloEdicaoComentario>Comentários e depoimentos:</SubtituloEdicaoComentario>
        <TextAreaComentario></TextAreaComentario>
        <BotaoSalvarAlteracoes>Salvar Alterações</BotaoSalvarAlteracoes>
        <BotaoEditarAlteracoes>Cancelar Alterações</BotaoEditarAlteracoes>
    </ContainerEdicaoComentarios>
  );
}

export default EdicaoConteudo;