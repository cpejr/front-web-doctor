import React, { useContext, useEffect, useState } from "react";
import { ContainerModalNovaConversa , Titulo, Subtitulo, XFechar,  TamanhoSelect, LocalBotao } from "./Styles";
import { Select, Spin } from "antd";
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import Button from "../../styles/Button";
import { ChatContext } from "../../contexts/ChatContext";
import checarObjVazio from "../../utils/checarObjVazio";

function ModalNovaConversa({ setModalAdicionar }) {
  const { usuarioId, conversas, setConversas, setConversaSelecionada } = useContext(ChatContext)
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState("")
  
  async function pegandoPacientes() {
    setCarregando(true);
    const dados = await managerService.GetDadosPessoais();
    const usuarios = dados.filter((usuario) => usuario.tipo === "PACIENTE")

    setUsuarios(usuarios)
    setCarregando(false)
  }

  async function criarNovarConversa() {
    if (!selecionaUsuarioId) return

    const existeConversa = conversas.find(({ conversaCom }) => conversaCom.id === selecionaUsuarioId)

    if (!!existeConversa) {
      setConversaSelecionada(existeConversa)
      setModalAdicionar(false)
      return
    }

    const usuarioSelecionadoDados = usuarios.find((usuario) => usuario.id === selecionaUsuarioId)
    const dadosParaCriarNovaConversa = {
      id_criador: usuarioId,
      id_receptor: usuarioSelecionadoDados.id,
      ativada: false
    }
    const dadosNovaConversa = await managerService.CriandoConversa(dadosParaCriarNovaConversa)

    const novaConversa = {
      id: dadosNovaConversa.id,
      ativada: dadosNovaConversa.ativada,
      mensagensNaoVistas: 0,
      conversaCom: {
        id: usuarioSelecionadoDados.id,
        nome: usuarioSelecionadoDados.nome,
        avatar_url: usuarioSelecionadoDados.avatar_url
      }
    }

    setConversas((conversasLista) => [novaConversa, ...conversasLista])
    setConversaSelecionada(novaConversa)
    setModalAdicionar(false)
  }

  useEffect(() => {
    pegandoPacientes();
  }, []);

  return (
    <>
      <ContainerModalNovaConversa>
        <Titulo>Iniciar nova conversa:</Titulo>
        <Subtitulo>Selecione um usuário:</Subtitulo>
        <TamanhoSelect>
          <Select
            onChange={(value) => setSelecionaUsuarioId(value)}
            style={{
              width: "100%",
              color: "black",
              borderColor: "black",
              borderWidth: "0px",
              marginBottom: "0.5em",
              paddingLeft: "2.5em",
            }}
            size="large"
            name="id_usuario"
            placeholder="Nome do usuário"
          >
            <Select.Option value="" disabled selected>
              Nome do usuário
            </Select.Option>
            {usuarios.map((usuario) => (
              <Select.Option key={usuario.id} value={usuario.id} color="red">
                {usuario.nome}
              </Select.Option>
            ))}
          </Select>
        </TamanhoSelect>
        <LocalBotao>
          <Button
            height="45px"
            width="100%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontSize="1em"
            fontSizeMedia1080="0.8em"
            fontSizeMedia950="0.1em"
            onClick={criarNovarConversa}
          >CONFIRMAR
            {/* {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"} */}
          </Button>
        </LocalBotao>
      </ContainerModalNovaConversa>
    </>
  );
}

export default ModalNovaConversa;