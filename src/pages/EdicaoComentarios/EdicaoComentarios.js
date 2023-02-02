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
  ContainerTodosComentarios,
  TextoIcone
} from './Styles';
import { sleep } from "../../utils/sleep";

import { Modal } from 'antd';
import Button from "../../styles/Button";

import ModalAdicionarComentario from "../../components/ModalAdicionarComentario";
import ModalExcluirComentario from "../../components/ModalExcluirComentario";

import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined, PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
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

  async function fechandoModalSemRecarregar() {
    setModalAdicionarComentario(false);
    setModalExcluirComentario(false);
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
                <TextoIcone>
                  <Button
                    backgroundColor={Cores.lilas[1]}
                    borderColor={Cores.azul}
                    color={Cores.branco}
                    fontWeight='medium'
                    fontSize='1.7em'
                    fontSizeMedia950='1.5em'
                    fontSizeMedia480='1.2em'
                    heightMedia='2em'
                    width='100%'
                    height='50px'
                    gap='1%'
                    boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
                    onClick={() => adicionandoComentario()}>
                    <div>
                      Adicionar Comentário
                    </div>
                    <PlusSquareOutlined style={{ marginRight: "3%"}}/>
                  </Button>
                </TextoIcone>
                <TextoIcone>
                  <Button
                    backgroundColor={Cores.lilas[1]}
                    borderColor={Cores.azul}
                    color={Cores.branco}
                    fontWeight='medium'
                    fontSize='1.7em'
                    fontSizeMedia950='1.5em'
                    fontSizeMedia480='1.2em'
                    heightMedia='2em'
                    width='100%'
                    height='50px'
                    gap='1%'
                    boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
                    onClick={() => excluindoComentario()}
                  >
                    <div>
                      Excluir Comentário
                    </div>
                    <DeleteOutlined style={{ marginLeft: '2%' }}/>
                  </Button>
                </TextoIcone>
              </ContainerBotoes>
            </MetadeBotoes>
          </BoxComentarioBotao>
        </BoxComentario>
      </PaginaEdicaoComentario>


      <Modal
        visible={modalAdicionarComentario}
        onCancel={fechandoModalSemRecarregar}
        footer={null}
        width={'70%'}
        centered={true}
        destroyOnClose
      >
        <ModalAdicionarComentario
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAdicionarComentario()}
        />
      </Modal>
      <Modal
        visible={modalExcluirComentario}
        onCancel={fechandoModalSemRecarregar}
        footer={null}
        width={'70%'}
        centered={true}
        destroyOnClose
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