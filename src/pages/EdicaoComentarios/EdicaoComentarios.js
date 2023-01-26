import React, { useState, useEffect } from "react";
import { Cores } from "../../variaveis";
import {
  BoxComentario,
  MetadeComentario,
  MetadeBotoes,
  ContainerBotoes,
  ContainerComentario,
  PaginaEdicaoComentario,
  BoxComentarioBotao,
  Titulo,
  BotaoAdicionar,
  BotaoExcluir,
  TituloComentariosDepoimentos,
  TodosComentarios,
  Comentario,
  ContainerTodosComentarios
} from './Styles';

import { Modal } from 'antd';

import ModalAdicionarComentario from "../../components/ModalAdicionarComentario";
import ModalExcluirComentario from "../../components/ModalExcluirComentario";

import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


function EdicaoComentarios() {
  const [comentario, setComentario] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAdicionarComentario, setModalAdicionarComentario] = useState(false);
  const [modalExcluirComentario, setModalExcluirComentario] = useState(false);

  const abertoPeloUsuario = false;

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetComentario();
    setComentario(resposta);
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

  /* async function atualizarDados() {
    setCarregando(true);
    await managerService.UpdateComentario(comentario.id, comentario.comentario);
    setCarregando(false);
  } */

  /* function preenchendoDados(e) {
    setComentario((prev) => ({ ...prev, comentario: e.target.value }));
    console.log(e);
  } */

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

  async function adicionandoComentario() {
    setModalAdicionarComentario(true);
  }

  async function excluindoComentario() {
    setModalExcluirComentario(true);
  }

  async function fechandoModalAdicionarComentario() {
    setModalAdicionarComentario(false);
    pegandoDados();
  }

  async function fechandoModalExcluirComentario() {
    setModalExcluirComentario(false);
    pegandoDados();
  }

  return (
    <div>

      <PaginaEdicaoComentario>

        <BoxComentario>

          <Titulo>Página Comentários</Titulo>

          <BoxComentarioBotao>

            <MetadeComentario>
              <ContainerComentario>
                <TituloComentariosDepoimentos>Comentários e Depoimentos:</TituloComentariosDepoimentos>
                <ContainerTodosComentarios>
                  <TodosComentarios>
                    {comentario.map((value) => (
                      <Comentario>"{value.comentario}"</Comentario>
                    ))}
                  </TodosComentarios>
                </ContainerTodosComentarios>
              </ContainerComentario>
            </MetadeComentario>

            <MetadeBotoes>
              <ContainerBotoes>
                <BotaoAdicionar
                  onClick={() => adicionandoComentario()}>
                  Adicionar Comentário
                </BotaoAdicionar>
                <BotaoExcluir
                  onClick={() => excluindoComentario()}>
                  Excluir Comentário
                </BotaoExcluir>
              </ContainerBotoes>
            </MetadeBotoes>

          </BoxComentarioBotao>

        </BoxComentario>

      </PaginaEdicaoComentario>


      <Modal
        visible={modalAdicionarComentario}
        onCancel={() => fechandoModalAdicionarComentario()}
        footer={null}
        width={'70%'}
        centered={true}
      >
        <ModalAdicionarComentario
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAdicionarComentario()}
        />
      </Modal>

      <Modal
        visible={modalExcluirComentario}
        onCancel={() => fechandoModalExcluirComentario()}
        footer={null}
        width={'70%'}
        centered={true}
      >
        <ModalExcluirComentario
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalExcluirComentario()}
        />
      </Modal>

    </div >


  );
}

export default EdicaoComentarios;