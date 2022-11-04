import React, { useState, useContext, useEffect, useRef } from 'react';
import BarraLateralChat from '../../components/BarraLateralChat';
import ConversaAberta from '../../components/ConversaAberta';
import { ChatContext } from '../../contexts/ChatContext';
import checarObjVazio from '../../utils/checarObjVazio';
import { Container, MensagemInicialChat, ContainerMobile } from './Styles';
import * as managerService from '../../services/ManagerService/managerService';
import io from 'socket.io-client';
import objCopiaProfunda from '../../utils/objCopiaProfunda';
import moverArray from '../../utils/moverArray';
import moment from "moment";

const BACK_END_URL = 'http://localhost:3333';

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

  useEffect(() => {
    if (!usuarioId) return;

    componenteEstaMontadoRef.current = true;

    async function getConversas() {
      setCarregandoConversas(true);

      await managerService.deletarConversasInativas(usuarioId);
      const resposta = await managerService.GetConversasUsuario(usuarioId);

      if (componenteEstaMontadoRef.current) {
        setConversas(resposta);
        setCarregandoConversas(false);
      }
    }

    getConversas();

    return () => (componenteEstaMontadoRef.current = false);
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) return;

    socket.current = io(BACK_END_URL);

    socket.current.emit('adicionarUsuario', usuarioId);

    socket.current.on('mensagemRecebida', (novaMensagem) => {
      setMensagemRecebida(novaMensagem);
    });

    socket.current.on('conversaRecebida', (novaConversa) => {
      setConversaRecebida(novaConversa);
    });

    return () => {
      socket.current.off();
      socket.current.close();
    };
  }, [usuarioId]);

  useEffect(() => {
    if (checarObjVazio(mensagemRecebida) || !usuarioId) return;

    componenteEstaMontadoRef.current = true;

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

    // const horaAtual = moment().hours();
    // const horarioComercial = (horaAtual >= 7 && horaAtual < 19) ? true : false;
      conversaNaLista.ultima_mensagem = novaMensagem;
      if (componenteEstaMontadoRef.current) {
        // if (!horarioComercial)
        setConversas(moverArray(copiaConversas, index, 0));
        // if (horarioComercial){
        // setConversas(moverArray(copiaConversas, index, 0));
        }
      }
    

    atualizarBarraLateralNovaMensagem(mensagemRecebida);
    setMensagemRecebida({});

    return () => (componenteEstaMontadoRef.current = false);
  }, [mensagemRecebida, usuarioId]);

  useEffect(() => {
    if (checarObjVazio(conversaRecebida)) return;

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
