import React, { useState, useEffect } from "react";
import { Cores } from "../../variaveis";
import { EdicaoComentariosPagina, ContainerEdicaoComentarios, TituloEdicaoComentario, SubtituloEdicaoComentario, TextAreaComentario, BotaoSalvarAlteracoes, BotaoEditarAlteracoes } from './Styles';
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


function EdicaoComentarios() {
  const [comentario, setComentario] = useState({});
  const [carregando, setCarregando] = useState(false);

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
  }

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetComentario();
    setComentario(resposta[0]);
    setCarregando(false)
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  // function setandoComentario() {
  //   setCarregando(true);
  //   setComentario(comentario);
  //   setCarregando(false);
  // }

  // useEffect(() => {
  //   setandoComentario();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function atualizarDados() {
    setCarregando(true);
    await managerService.UpdateComentario(comentario.id, comentario.comentario);
    setCarregando(false);
  }

  function preenchendoDados(e) {
    setComentario((prev) => ({ ...prev, comentario: e.target.value }));
    console.log(e);
  }

    const antLoadingIcon = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  if (carregando) return (
    <Spin
      indicator={antLoadingIcon}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )

console.log(comentario);

  return (
    <EdicaoComentariosPagina>
    <ContainerEdicaoComentarios>
        <TituloEdicaoComentario>Página Comentários</TituloEdicaoComentario>
        <SubtituloEdicaoComentario>Comentários e depoimentos:</SubtituloEdicaoComentario>
        <TextAreaComentario  
          defaultValue={comentario?.comentario}
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
        >Salvar Alterações</BotaoSalvarAlteracoes>
        <BotaoEditarAlteracoes>Cancelar Alterações</BotaoEditarAlteracoes>
    </ContainerEdicaoComentarios>
    </EdicaoComentariosPagina>
  );
}

export default EdicaoComentarios;