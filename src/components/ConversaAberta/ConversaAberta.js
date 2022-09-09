import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  HeaderConversaAberta,
  Conversa,
  NomePessoa,
  BotaoVoltar,
  CorpoConversaAberta,
  FooterConversaAberta,
} from './Styles';
import Mensagem from '../Mensagem/Mensagem';
import { Cores } from '../../variaveis';
import Button from '../../styles/Button';
import Input from '../../styles/Input';
import { ChatContext } from '../../contexts/ChatContext';
import * as managerService from '../../services/ManagerService/managerService';
import checarObjVazio from '../../utils/checarObjVazio';
import moverArray from '../../utils/moverArray';
import { Spin } from 'antd';
import {
  ArrowLeftOutlined,
  PaperClipOutlined,
  SendOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { recebeEmail } from '../../services/auth';
import objCopiaProfunda from '../../utils/objCopiaProfunda';

export default function ConversaAberta({ socket }) {
  const [usuarioAtual, setUsuarioAtual] = useState({});
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState('');
  const [carregando, setCarregando] = useState(true);
  const {
    usuarioId,
    conversaSelecionada,
    setConversaSelecionada,
    imagemPerfilPadrão,
    conversas,
    setConversas,
    mensagens,
    setMensagens,
    componenteEstaMontadoRef,
  } = useContext(ChatContext);
  const scrollRef = useRef(null);
  const inputMensagemConteudoRef = useRef(null);

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getDadosUsuarioAtual() {
      const { dadosUsuario } = await managerService.GetDadosUsuario(
        recebeEmail()
      );

      if (componenteEstaMontadoRef.current) {
        setUsuarioAtual(dadosUsuario);
        setCarregando(false);
      }
    }

    getDadosUsuarioAtual();

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getMensagens() {
      if (checarObjVazio(conversaSelecionada)) return;

      const resposta = await managerService.GetMensagensPorConversaUsuario(
        usuarioId,
        conversaSelecionada.id
      );
      if (componenteEstaMontadoRef.current) setMensagens(resposta);
    }

    getMensagens();

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversaSelecionada]);

  useEffect(() => {
    inputMensagemConteudoRef?.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  const atualizarBarraLateral = (novaMensagem) => {
    const id_conversa = novaMensagem.id_conversa;

    const index = conversas.findIndex(({ id }) => id === id_conversa);
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    conversaNaLista.ultima_mensagem = novaMensagem;

    setConversas(moverArray(copiaConversas, index, 0));
  };
  const enviarConversa = async () => {
    const index = conversas.findIndex(
      ({ id }) => id === conversaSelecionada.id
    );
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    conversaNaLista.ativada = true;

    setConversaSelecionada(conversaNaLista);
    setConversas(copiaConversas);

    await managerService.UpdateConversaAtiva(conversaSelecionada.id);

    const {
      id,
      ultima_mensagem,
      conversaCom: { id: receptorId },
    } = copiaConversas[index];

    const conversaParaEnvio = {
      id,
      ativada: true,
      mensagensNaoVistas: 1,
      ultima_mensagem: {
        ...ultima_mensagem,
        pertenceAoUsuarioAtual: false,
      },
      conversaCom: {
        id: usuarioAtual?.id,
        nome: usuarioAtual?.nome,
        avatar_url: usuarioAtual?.avatar_url,
      },
    };

    socket.emit('enviarConversa', {
      novaConversa: conversaParaEnvio,
      receptorId,
    });
  };
  const enviarMensagem = async (e) => {
    e.preventDefault();

    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: usuarioId,
      media_url: 'nenhuma', // Futuramente permitir a opção de mandar mídias
      foi_visualizado: false,
      conteudo: inputMensagemConteudo,
    };
    const { data_cricao, data_atualizacao, media_url, ...dados } =
      await managerService.CriandoMensagem(dadosParaCriarNovaMensagem);

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: true,
    };

    if (conversaSelecionada.ativada) {
      socket.emit('enviarMensagem', {
        novaMensagem,
        receptorId: conversaSelecionada.conversaCom.id,
      });
    } else {
      enviarConversa();
    }

    atualizarBarraLateral(novaMensagem);
    setInputMensagemConteudo('');

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  const verificarEnter = (e) => {
    if (e.key === 'Enter' && inputMensagemConteudo) {
      enviarMensagem(e);
    }
  };

  return (
    <Conversa>
      <HeaderConversaAberta>
        <BotaoVoltar>
          <Button
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.lilas[1]}
            width='10%'
            widthres='15%'
            height='10%'
            marginTop='0%'
            onClick={() => {
              setConversaSelecionada({});
            }}
          >
            <ArrowLeftOutlined
              style={{ fontSize: '30px', color: '{Cores.lilas[1]}' }}
            />
          </Button>
        </BotaoVoltar>
        <img
          src={
            conversaSelecionada?.conversaCom?.avatar_url || imagemPerfilPadrão
          }
          alt='61'
          height='70px'
          width='76px'
        ></img>
        <NomePessoa>{conversaSelecionada?.conversaCom?.nome}</NomePessoa>
      </HeaderConversaAberta>
      <CorpoConversaAberta ref={scrollRef}>
        {carregando ? (
          <Spin
            indicator={antIcon}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : (
          <>
            {mensagens?.map((m, idx) => (
              <Mensagem
                key={idx}
                pertenceAoUsuarioAtual={m.pertenceAoUsuarioAtual}
                conteudo={m.conteudo}
                data_criacao={m.data_criacao}
              />
            ))}
            <div ref={scrollRef}></div>
          </>
        )}
      </CorpoConversaAberta>
      <FooterConversaAberta>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.lilas[1]}
          width='10%'
          widthres='15%'
          height='10%'
          marginTop='0%'
          onClick={() => {}}
        >
          <PaperClipOutlined
            style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}
          />
        </Button>
        <Input
          placeholder='Mensagem'
          backgroundColor='white'
          borderColor={Cores.cinza[3]}
          width='90%'
          height='100%'
          minHeight='45px'
          maxHeight='40px'
          paddingRight='2%'
          onKeyPress={verificarEnter}
          onChange={(e) => setInputMensagemConteudo(e.target.value)}
          value={inputMensagemConteudo}
          ref={inputMensagemConteudoRef}
          disabled={checarObjVazio(conversaSelecionada)}
        />
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.lilas[1]}
          width='10%'
          widthres='15%'
          height='10%'
          marginTop='0%'
          onClick={enviarMensagem}
          disabled={
            checarObjVazio(conversaSelecionada) || !inputMensagemConteudo
          }
        >
          <SendOutlined
            style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}
          />
        </Button>
      </FooterConversaAberta>
    </Conversa>
  );
}
