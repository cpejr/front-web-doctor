import React, { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import BarraLateralChat from "../../components/BarraLateralChat";
import ConversaAberta from "../../components/ConversaAberta";
import { ChatContext } from "../../contexts/ChatContext";
import * as managerService from "../../services/ManagerService/managerService";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from "../../utils/moverArray";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import { Container, ContainerMobile, MensagemInicialChat } from "./Styles";

const BACK_END_URL = "http://localhost:3333";

const Chat = () => {
  const [mensagemRecebida, setMensagemRecebida] = useState({});
  const [conversaRecebida, setConversaRecebida] = useState({});
  const [carregandoConversas, setCarregandoConversas] = useState(true);
  const {
    usuarioId,
    conversas,
    setConversas,
    conversaSelecionada,
    setMensagens,
  } = useContext(ChatContext);
  const componenteEstaMontadoRef = useRef(null);
  const socket = useRef(null);

  async function getConversas(componenteEstaMontadoRef) {
    setCarregandoConversas(true);

    await managerService.deletarConversasInativas(usuarioId);
    const resposta = await managerService.GetConversasUsuario(usuarioId);

    if (componenteEstaMontadoRef) {
      setConversas(resposta);
      setCarregandoConversas(false);
    }
  }

  useEffect(() => {
    if (!usuarioId) return;

    componenteEstaMontadoRef.current = true;

    getConversas(componenteEstaMontadoRef.current);

    return () => (componenteEstaMontadoRef.current = false);
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) return;

    socket.current = io(BACK_END_URL);

    socket.current.emit("adicionarUsuario", usuarioId);

    socket.current.on("mensagemRecebida", (novaMensagem) => {
      setMensagemRecebida(novaMensagem);
    });

    socket.current.on("conversaRecebida", (novaConversa) => {
      setConversaRecebida(novaConversa);
    });

    return () => {
      socket.current.off();
      socket.current.close();
    };
  }, [usuarioId]);

  async function atualizarBarraLateralNovaMensagem(novaMensagem) {
    const index = conversas?.findIndex(
      ({ id }) => id === novaMensagem.id_conversa
    );
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    novaMensagem.pertenceAoUsuarioAtual = false;
    if (novaMensagem.id_conversa === conversaSelecionada.id) {
      setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);
      await managerService.UpdateMensagemVisualizada(novaMensagem.id, {
        foi_visualizado: true,
      });
    } else {
      conversaNaLista.mensagensNaoVistas++;
    }

    conversaNaLista.ultima_mensagem = novaMensagem;
    if (componenteEstaMontadoRef.current) {
      setConversas(moverArray(copiaConversas, index, 0));
    }
  }
  useEffect(() => {
    if (checarObjVazio(mensagemRecebida) || !usuarioId) return;

    componenteEstaMontadoRef.current = true;

    atualizarBarraLateralNovaMensagem(mensagemRecebida);
    setMensagemRecebida({});

    return () => (componenteEstaMontadoRef.current = false);
  }, [mensagemRecebida, usuarioId]);

  function atualizarBarraLateralNovaConversa(novaConversa) {
    const index = conversas?.findIndex(
      (conversa) => conversa.id === novaConversa.id
    );

    if (index === -1) {
      return setConversas((conversasLista) => [
        novaConversa,
        ...conversasLista,
      ]);
    }

    const copiaConversas = objCopiaProfunda(conversas);
    copiaConversas[index] = novaConversa;

    setConversas(copiaConversas);
  }
  useEffect(() => {
    if (checarObjVazio(conversaRecebida)) return;

    atualizarBarraLateralNovaConversa(conversaRecebida);
    setConversaRecebida({});
  }, [conversaRecebida, usuarioId]);

  return (
    <>
      <Container>
        <BarraLateralChat carregandoConversas={carregandoConversas} />
        {checarObjVazio(conversaSelecionada) ? (
          <MensagemInicial />
        ) : (
          <ConversaAberta socket={socket.current} />
        )}
      </Container>

      <ContainerMobile>
        {checarObjVazio(conversaSelecionada) ? (
          <BarraLateralChat carregandoConversas={carregandoConversas} />
        ) : (
          <ConversaAberta socket={socket.current} />
        )}
      </ContainerMobile>
    </>
  );
};

const MensagemInicial = () => {
  return (
    <MensagemInicialChat>
      <h3>Bem vindo!</h3>
      <p>Selecione um chat para iniciar uma conversa.</p>
    </MensagemInicialChat>
  );
};

export default Chat;
