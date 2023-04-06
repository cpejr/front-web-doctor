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
  TextoIcone,
  IconeLixeira,
  TextoBotoes
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
    if (modalAdicionarComentario === true) {
      setModalAdicionarComentario(false);
    }
    if (modalExcluirComentario === true) {
      setModalExcluirComentario(false);
    }
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
                      <Comentario>
                        "{value.comentario}"
                      </Comentario>
                    ))}
                  </TodosComentarios>
                </ContainerTodosComentarios>
              </ContainerComentario>
            </MetadeComentario>
            <MetadeBotoes>
              <ContainerBotoes>
                <TextoIcone>
                  <Button
                    backgroundColor={Cores.azulEscuro}
                    borderColor="transparent"
                    color={Cores.branco}
                    fontWeight='medium'
                    fontSize='1.6em'
                    fontSizeMedia1080='1.5em'
                    fontSizeMedia480='1.2em'
                    fontSizeMedia350='0.2em'
                    heightMedia='1.5em'
                    width='100%'
                    height='50px'
                    gap='1%'
                    marginBottom="2%"
                    boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
                    onClick={() => adicionandoComentario()}>
                    <TextoIcone>
                      <TextoBotoes>
                        Adicionar Comentário
                      </TextoBotoes>
                      <PlusSquareOutlined style={{ width: "10%" }} />
                    </TextoIcone>
                  </Button>
                </TextoIcone>
                <TextoIcone>
                  <Button
                    backgroundColor= '#f8d6cf'
                    borderColor= 'red'
                    color={Cores.preto}
                    fontWeight='medium'
                    fontSize='1.6em'
                    fontSizeMedia1080='1.5em'
                    fontSizeMedia480='1.2em'
                    fontSizeMedia350='0.8em'
                    heightMedia='1.5em'
                    width='100%'
                    height='50px'
                    gap='1%'
                    marginBottom="2%"
                    boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
                    onClick={() => excluindoComentario()}
                  >
                    <TextoIcone>
                      <TextoBotoes>
                        Excluir Comentário
                      </TextoBotoes>
                      <DeleteOutlined style={{ width: "10%" }} />
                    </TextoIcone>
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