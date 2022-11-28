import React, { useState, useEffect } from "react";
import { Cores } from "../../variaveis";
import { EdicaoComentariosPagina, ContainerEdicaoComentarios, TituloEdicaoComentario, SubtituloEdicaoComentario, TextAreaComentario, BotaoSalvarAlteracoes, BotaoEditarAlteracoes } from './Styles';
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


function EdicaoComentarios(props) {
  const [comentario, setComentario] = useState({});
  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
  }

  async function pegandoDados() {
    const resposta = await managerService.GetComentario();
    setComentario(resposta[0]);
  }
  

  useEffect(() => {
    pegandoDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);


  function setandoComentario() {
    setCarregando(true);
    setComentario(comentario);
    setCarregando(false);
  }

  useEffect(() => {
    setandoComentario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function atualizarDados() {
    setCarregando(true);
      await managerService.UpdateComentario(comentario.id, comentario.comentario);
    props.fechandoModal();
  }

  function preenchendoDados(e) {
    setComentario(e.target.value);
    console.log(e);
  }



  return (
    <EdicaoComentariosPagina>
    <ContainerEdicaoComentarios>
        <TituloEdicaoComentario>Página Comentários</TituloEdicaoComentario>
        <SubtituloEdicaoComentario>Comentários e depoimentos:</SubtituloEdicaoComentario>
        <TextAreaComentario
          value={comentario.comentario}
          name="comentario"
          style={{
            borderWidth: "1px",
            borderColor: Cores.azul,
            color: "black",
            minHeight: "100px",
          }}
          onKeyPress={verificandoEnter}
          onChange={preenchendoDados}
          ></TextAreaComentario>
        <BotaoSalvarAlteracoes
        onClick={() => atualizarDados()}
        >{carregando ? <Spin indicator={antIcon} /> : "Salvar Alterações"}</BotaoSalvarAlteracoes>
        <BotaoEditarAlteracoes>Cancelar Alterações</BotaoEditarAlteracoes>
    </ContainerEdicaoComentarios>
    </EdicaoComentariosPagina>
  );
}

export default EdicaoComentarios;