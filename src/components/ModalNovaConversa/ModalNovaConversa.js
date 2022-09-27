import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ContainerModalNovaConversa,
  Titulo,
  Subtitulo,
  TamanhoSelect,
  LocalBotao,
  SelectUsuario,
} from './Styles';
import { useHistory } from 'react-router-dom'
import { Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import _ from "lodash";
import { toast } from "react-toastify";
import { Cores } from '../../variaveis';
import * as managerService from '../../services/ManagerService/managerService';
import Button from '../../styles/Button';
import { ChatContext } from '../../contexts/ChatContext';

const camposVaziosReferencia = {
	id_usuario: false,
};

const estadoIncial = {
	id_usuario: "",
};

function ModalNovaConversa({ setModalAdicionar }) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [camposVazios, setCamposVazios] = useState({});
  const [estado, setEstado] = useState(estadoIncial);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState('');
  const { usuarioId, conversas, setConversas, setConversaSelecionada } =
    useContext(ChatContext);
  const componenteEstaMontadoRef = useRef(null);

  const history = useHistory();

  function preenchendoDados(value) {
    setSelecionaUsuarioId(value)

		if (camposVazios.id_usuario)
			setCamposVazios({ id_usuario: false });

		setEstado({ id_usuario: value });
	}

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

    const camposVaziosAtual = {
			id_usuario: !estado.id_usuario,
		};

		setCamposVazios(camposVaziosAtual);

		if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
			toast.warn("Preencha todos os campos");
			return;
		}

		setCarregando(true);

    const usuarioSelecionadoDados = usuarios.find(
      (usuario) => usuario.id === selecionaUsuarioId
    );
    const dadosParaCriarNovaConversa = {
      id_criador: usuarioId,
      id_receptor: usuarioSelecionadoDados.id,
      ativada: false,
    };
    const { id } = await managerService.CriandoConversa(
      dadosParaCriarNovaConversa,
      {
        mensagemSucesso: "Receita criada com sucesso",
        tempo: 1500,
      }
    );

    const novaConversa = {
      id,
      ativada: false,
      mensagensNaoVistas: 0,
      conversaCom: {
        id: usuarioSelecionadoDados.id,
        nome: usuarioSelecionadoDados.nome,
        avatar_url: usuarioSelecionadoDados.avatar_url,
      },
    };

    setModalAdicionar(false);
    setCarregando(false);
    setSelecionaUsuarioId(null);
    setConversaSelecionada(novaConversa);
    setConversas((conversasLista) => [novaConversa, ...conversasLista]);

  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <ContainerModalNovaConversa>
        <Titulo>Iniciar nova conversa:</Titulo>
        <Subtitulo>Selecione um usuário:</Subtitulo>
        <TamanhoSelect>
          <SelectUsuario
            camposVazios={camposVazios.id_usuario}
            onChange={preenchendoDados}
            value={selecionaUsuarioId}
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
          </SelectUsuario>
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
