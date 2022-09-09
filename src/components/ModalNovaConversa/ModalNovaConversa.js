import React, { useContext, useEffect, useState } from 'react';
import {
  ContainerModalNovaConversa,
  Titulo,
  Subtitulo,
  TamanhoSelect,
  LocalBotao,
} from './Styles';
import { Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Cores } from '../../variaveis';
import * as managerService from '../../services/ManagerService/managerService';
import Button from '../../styles/Button';
import { ChatContext } from '../../contexts/ChatContext';

function ModalNovaConversa({ setModalAdicionar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState('');
  const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    componenteEstaMontadoRef,
  } = useContext(ChatContext);

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function pegandoPacientes() {
      setCarregando(true);

      const dados = await managerService.GetDadosPessoais();
      const conversasUsuariosIds = conversas.map(
        ({ conversaCom }) => conversaCom.id
      );

      const usuarios = dados.filter(
        (usuario) =>
          !conversasUsuariosIds.includes(usuario.id) && usuario.id !== usuarioId
      );

      if (componenteEstaMontadoRef.current) {
        setUsuarios(usuarios);
        setCarregando(false);
      }
    }

    pegandoPacientes();

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversas]);

  async function criarNovarConversa(e) {
    if (!selecionaUsuarioId) return;

    e.preventDefault();

    setCarregando(true);

    const usuarioSelecionadoDados = usuarios.find(
      (usuario) => usuario.id === selecionaUsuarioId
    );
    const dadosParaCriarNovaConversa = {
      id_criador: usuarioId,
      id_receptor: usuarioSelecionadoDados.id,
      ativada: false,
    };
    const dadosNovaConversa = await managerService.CriandoConversa(
      dadosParaCriarNovaConversa
    );

    const novaConversa = {
      id: dadosNovaConversa.id,
      ativada: dadosNovaConversa.ativada,
      mensagensNaoVistas: 0,
      conversaCom: {
        id: usuarioSelecionadoDados.id,
        nome: usuarioSelecionadoDados.nome,
        avatar_url: usuarioSelecionadoDados.avatar_url,
      },
    };

    setConversaSelecionada(novaConversa);
    setCarregando(false);
    setModalAdicionar(false);
    setSelecionaUsuarioId(null);
    setConversas((conversasLista) => [novaConversa, ...conversasLista]);
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <ContainerModalNovaConversa>
        <Titulo>Iniciar nova conversa:</Titulo>
        <Subtitulo>Selecione um usuário:</Subtitulo>
        <TamanhoSelect>
          <Select
            onChange={(value) => setSelecionaUsuarioId(value)}
            value={selecionaUsuarioId}
            style={{
              width: '100%',
              color: 'black',
              borderColor: 'black',
              borderWidth: '0px',
              marginBottom: '0.5em',
              paddingLeft: '2.5em',
            }}
            size='large'
            name='id_usuario'
            placeholder='Nome do usuário'
          >
            <Select.Option value='' disabled selected>
              Nome do usuário
            </Select.Option>
            {usuarios.map((usuario, idx) => (
              <Select.Option key={idx} value={usuario.id} color='red'>
                {usuario.nome}
              </Select.Option>
            ))}
          </Select>
        </TamanhoSelect>
        <LocalBotao>
          <Button
            height='45px'
            width='100%'
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontSize='1em'
            fontSizeMedia1080='0.8em'
            fontSizeMedia950='0.1em'
            onClick={criarNovarConversa}
          >
            {carregando ? <Spin indicator={antIcon} /> : 'CONFIRMAR'}
          </Button>
        </LocalBotao>
      </ContainerModalNovaConversa>
    </>
  );
}

export default ModalNovaConversa;
