import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  HeaderConversaAberta,
  Conversa,
  NomePessoa,
  BotaoVoltar,
  CorpoConversaAberta,
  FooterConversaAberta,
  MenuConversasTipoExame,
} from './Styles';
import Mensagem from '../Mensagem/Mensagem';
import { Cores } from '../../variaveis';
import Button from '../../styles/Button';
import Input from '../../styles/Input';
import { ChatContext } from '../../contexts/ChatContext';
import * as managerService from '../../services/ManagerService/managerService';
import checarObjVazio from '../../utils/checarObjVazio';
import moverArray from '../../utils/moverArray';
import { Spin, Tooltip, Menu, Dropdown } from 'antd';
import {
  ArrowLeftOutlined,
  PaperClipOutlined,
  SendOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { recebeEmail } from '../../services/auth';
import objCopiaProfunda from '../../utils/objCopiaProfunda';
import moment from "moment";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";

moment.locale("pt-br");

export default function ConversaAberta({ socket }) {
  const [usuarioAtual, setUsuarioAtual] = useState({});
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState('');
  const [carregandoConversa, setCarregandoConversa] = useState(true);
  const [carregandoEnvioMensagem, setCarregandoEnvioMensagem] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(false);

  const {
    usuarioId,
    conversaSelecionada,
    setConversaSelecionada,
    imagemPerfilPadrão,
    conversas,
    setConversas,
    mensagens,
    setMensagens,
  } = useContext(ChatContext);
  const componenteEstaMontadoRef = useRef(null);
  const scrollRef = useRef(null);
  const inputMensagemConteudoRef = useRef(null);



  const menuBotoes = (
    <Menu>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => enviarFormularioPaciente()}
        >
          <b>Enviar Formulário Actigrafia</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => confirmarPagamento()}
        >
          <b>Confirmar Pagamento</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => finalizarChat()}
        >
          <b>Finalizar Chat</b>
        </Button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getDadosUsuarioAtual() {
      const { dadosUsuario } = await managerService.GetDadosUsuario(
        recebeEmail()
      );

      if (componenteEstaMontadoRef.current) {
        setUsuarioAtual(dadosUsuario);
        setTipoUsuario(dadosUsuario.tipo);
        setCarregandoConversa(false);
      }
    }

    getDadosUsuarioAtual();

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  async function enviarFormularioPaciente() {
    await managerService.EnviandoFormularioPaciente(
      false,
      true,
      "d98bf5e0-73e0-4d59-9c00-a7d79a1174b0",
      conversaSelecionada.conversaCom.id
    )
  }

  async function confirmarPagamento() {
    managerService.confirmarPagamentoExame(conversaSelecionada.conversaCom.id, usuarioId);
  }

  async function finalizarChat() {
    await managerService.UpdateConversaFinalizada(conversaSelecionada.id)
    atualizaConversaFinalizada();
  }

  function atualizaConversaFinalizada() {
    const auxConversa = conversaSelecionada;
    auxConversa.finalizada = true;
    setConversaSelecionada(auxConversa);
  }


  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getMensagens() {
      if (checarObjVazio(conversaSelecionada) || !usuarioId) return;

      const resposta = await managerService.GetMensagensPorConversaUsuario(
        usuarioId,
        conversaSelecionada.id
      );
      if (componenteEstaMontadoRef.current) setMensagens(resposta);
    }

    getMensagens();

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversaSelecionada, usuarioId]);

  useEffect(() => {
    inputMensagemConteudoRef?.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const atualizarBarraLateral = (novaMensagem) => {
    const id_conversa = novaMensagem.id_conversa;

    const index = conversas.findIndex(({ id }) => id === id_conversa);
    const copiaConversas = objCopiaProfunda(conversas);
    const conversaNaLista = copiaConversas[index];

    conversaNaLista.ultima_mensagem = novaMensagem;

    setConversas(moverArray(copiaConversas, index, 0));
  };

  const enviarConversa = async (ultima_mensagem) => {
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

    if (!inputMensagemConteudo) return;

    const horaAtual = moment().hours();
    const horarioComercial = (horaAtual >= 7 && horaAtual < 19) ? true : false;
    const verificaHorarioUsuario = !horarioComercial && (tipoUsuario !== "MASTER");
    const remetente = conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)].conversaCom;

    let id_remetente = usuarioId;
    let texto = inputMensagemConteudo;

    if (verificaHorarioUsuario) {   
      id_remetente = remetente.id;
      texto = "Obrigado pela sua mensagem!\n" +
        "Estarei fora do consultório de 19h até 7h e não poderei responder durante esse período.\n" +
        "Se tiver um assunto urgente favor responder ao formulário de Emergência."
    }

    if (conversaSelecionada.finalizada) {
      id_remetente = remetente.id;
      texto = "CHAT FINALIZADO.\n" +
        "Seus resultados podem ser visualizados no arquivo enviado no Chat”.\n"
      setInputMensagemConteudo('');
    }

    setCarregandoEnvioMensagem(true);
    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: id_remetente,
      media_url: 'nenhuma', // Futuramente permitir a opção de mandar mídias
      foi_visualizado: false,
      conteudo: texto,
    };

    if (horarioComercial) {
      setInputMensagemConteudo('')

    };



    const { data_cricao, data_atualizacao, media_url, ...dados } =
      await managerService.CriandoMensagem(dadosParaCriarNovaMensagem);

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: !verificaHorarioUsuario,
    };

    if (conversaSelecionada.ativada) {
      socket.emit('enviarMensagem', {
        novaMensagem,
        receptorId: conversaSelecionada.conversaCom.id,
      });
    } else {
      enviarConversa(novaMensagem);
    }

    atualizarBarraLateral(novaMensagem);

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);

    setCarregandoEnvioMensagem(false);
  };

  const antIconConversa = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  const antIconEnvioMensagem = (
    <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
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
        {conversaSelecionada.tipo === 'EXAME' ? (
          <NomePessoa>{conversaSelecionada?.conversaCom?.nome} - EXAME</NomePessoa>
        ) : (
          <NomePessoa>{conversaSelecionada?.conversaCom?.nome}</NomePessoa>
        )}
      </HeaderConversaAberta>
      <CorpoConversaAberta>
        {carregandoConversa ? (
          <Spin
            indicator={antIconConversa}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : (
          mensagens?.map((m, idx) => (
            <Mensagem
              key={idx}
              pertenceAoUsuarioAtual={m.pertenceAoUsuarioAtual}
              conteudo={m.conteudo}
              scrollRef={mensagens?.length - 1 === idx ? scrollRef : null}
              data_criacao={m.data_criacao}
            />
          ))
        )}
      </CorpoConversaAberta>
      <FooterConversaAberta>
        {conversaSelecionada.tipo === 'EXAME' ? (
          <MenuConversasTipoExame>
            <Dropdown
              onClick={(e) => e.preventDefault()}
              overlay={menuBotoes}
              placement={"bottom"}
            >
              <PlusOutlined
                style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}
              />
            </Dropdown>
          </MenuConversasTipoExame>
        ) : (
          <Button
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.lilas[1]}
            width='10%'
            widthres='15%'
            height='10%'
            marginTop='0%'
            onClick={() => { }}
          >
            <PaperClipOutlined
              style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}
            />
          </Button>
        )}

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
        />
        {carregandoEnvioMensagem ? (
          <Spin
            indicator={antIconEnvioMensagem}
            style={{
              margin: '0px 1rem',
            }}
          />
        ) : (
          <Tooltip placement='bottom' title='Enviar mensagem'>
            <Button
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.lilas[1]}
              width='10%'
              widthres='15%'
              height='10%'
              marginTop='0%'
              onClick={enviarMensagem}
            >
              <SendOutlined
                style={{ fontSize: '27px', color: '{Cores.lilas[1]}' }}
              />
            </Button>
          </Tooltip>
        )}
      </FooterConversaAberta>
    </Conversa>
  );
}
