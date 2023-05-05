import {
  ArrowLeftOutlined,
  LoadingOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Modal, Spin, Tooltip} from "antd";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { recebeEmail } from "../../services/auth";
import * as managerService from "../../services/ManagerService/managerService";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import checarObjVazio from "../../utils/checarObjVazio";
import moverArray from "../../utils/moverArray";
import objCopiaProfunda from "../../utils/objCopiaProfunda";
import { Cores } from "../../variaveis";
import Mensagem from "../Mensagem/Mensagem";
import ModalEnviarArquivo from "../ModalEnviarArquivo";
import {
  BotaoVoltar,
  Conversa,
  CorpoConversaAberta,
  FooterConversaAberta,
  HeaderConversaAberta,
  MenuConversasTipoExame,
  NomePessoa,ACTI
} from "./Styles";
import {
  apenasNumerosCep,
  cpf,
  telefone,
  endereco,
} from '../../utils/masks';
import { toast } from "react-toastify";
export default function ConversaAberta({ socket }) {
  const [usuarioAtual, setUsuarioAtual] = useState({});
  const [inputMensagemConteudo, setInputMensagemConteudo] = useState("");
  const [carregandoConversa, setCarregandoConversa] = useState(true);
  const [carregandoEnvioMensagem, setCarregandoEnvioMensagem] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  const [
    horarioPermitidoParaEnvioMensagem,
    setHorarioPermitidoParaEnvioMensagem,
  ] = useState(null);

  const mensagemFinalizada =
    "Os seus exames estão disponíveis no PDF acima, clique para abrir.\nEssa conversa foi encerrada Finalizado!\n";
  const mensagemActigrafia = 
    "A actigrafia é um exame não invasivo, realizado por meio de um dispositivo utilizado no pulso durante um período de uma a quatro semanas. Ele tem como objetivo detectar o padrão de vigília e sono. O exame é utilizado principalmente para auxiliar no diagnóstico de insônia e distúrbios de ritmo circadiano. O preço desse exame é: ";
  const mensagemBiologix = 
    "O Exame do Sono Biologix é uma poligrafia noturna utilizada para diagnóstico e acompanhamento do tratamento de ronco e apneia do sono, e permite que profissionais de saúde ofereçam a seus pacientes uma solução simplificada, utilizando apenas um celular e um sensor compacto e sem fios. O preço desse exame é: "
  const mensagemDispositivoIndisponível = 
    "O dispositivo para a realização desse exame está indisponível! Deseja ser comunicado quando houver disponibilidade?";
  const mensagemDispositivoDisponível = 
    "O dispositivo para a realização desse exame está disponível! Deseja realizá-lo?";
  const mensagemResponderFormulárioBiologix = 
    "Por gentileza, responda o formulário BIOLOGIX";
  const mensagemResponderFormulárioActigrafia = 
    "Por gentileza, responda o formulário ACTIGRAFIA";
  const mensagemSolicitarPagamento = 
    "Realize o pagamento pela seguinte chave pix: ";
  
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
  const modalRef = useRef(null);
  const inputMensagemConteudoRef = useRef(null);
  const horaAtual = moment().hours();
  const horarioComercial = horaAtual >= 7 && horaAtual < 21 ? true : false;
  const [modalEnviarArquivo, setModalEnviarArquivo] = useState(false);
  const [pdfFromModal, setPdfFromModal] = useState("");
  const [endereco, setEndereco] = useState({});
  const enderecoCompleto = `${endereco.rua}, ${endereco.numero}, ${endereco.complemento}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.pais}`;
  const mensagemConfirmacaoDeDados = 
  `Esses dados serão usados na entrega e no pagamento. Por favor, confirme se estão todos corretos, caso haja alguma inconsistência ou erro, altere os dados do seu perfil.` +
  `\nNome completo: ${conversaSelecionada.conversaCom.nome}` +
  `\nCPF: ${cpf(conversaSelecionada.conversaCom.cpf)}` +
  `\nTelefone: ${telefone(conversaSelecionada.conversaCom.telefone)}` +
  `\nEndereço: ${(enderecoCompleto)}` +
  ` ${apenasNumerosCep(endereco.cep)}`
  ;
  const mensagemNotificacao = `O exame ${conversaSelecionada.tipo} está disponível`;
  const mensagemConfirmarPagamentoActigrafia = `Instruções para a realização do exame actigrafia: \n`
  + `1.- \n`
  + `2.- \n`
  + `3.- `;
  const mensagemConfirmarPagamentoBiologix = `Instruções para a realização do exame biologix: \n`
  + `1.- \n`
  + `2.- \n`
  + `3.- `;
  const menuBotoes = (
    <Menu>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => confirmarPagamento(conversaSelecionada.conversaCom.id, usuarioId)}
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
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => {
            setModalEnviarArquivo(true);
          }}
        >
          <b>Enviar Arquivo</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => InformaçãoGeral()}
        >
          <b>Informação Geral</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => DispositivoIndisponível()}
        >
          <b>Dispositivo Indisponível</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => DispositivoDisponível()}
        >
          <b>Dispositivo Disponível</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => SolicitarPagamento()}
        >
          <b>Solicitar Pagamento</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => ResponderFormulario()}
        >
          <b>Responder Formulário</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="50px"
          onClick={() => ConfirmacaoDeDados()}
        >
          <b>Confirmação de dados</b>
        </Button>
      </Menu.Item>
    </Menu>
  );
  const TextoA1 = "Olá sou a enfermeira, posso te auxiliar em algo ?"
  const TextoA2 = "Olá sou a enfermeira, posso te auxiliar em algo2 ?"
  const TextoA3 = "Olá sou a enfermeira, posso te auxiliar em algo3 ?"
  const TextoA4 = "Olá sou a enfermeira, posso te auxiliar em algo4 ?"
  const TextoA5 = "Olá sou a enfermeira, posso te auxiliar em algo5 ?"
  const TextoA6 = "Olá sou a enfermeira, posso te auxiliar em algo6 ?"
  const TextoA7 = "Olá sou a enfermeira, posso te auxiliar em algo7 ?"
  const TextoA8 = "Olá sou a enfermeira, posso te auxiliar em algo8 ?"
  const TextoA9 = "Olá sou a enfermeira, posso te auxiliar em algo9 ?"
  const TextoA10 = "Olá sou a enfermeira, posso te auxiliar em algo10 ?"
  const menuMensagens = (
    <Menu>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA1)}
          value = {TextoA1}
        >
            <b >TextoA1</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA2)}
          value = {TextoA2}
        >
            <b >TextoA2</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA3)}
          value = {TextoA3}
        >
            <b >TextoA3</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA4)}
          value = {TextoA4}
        >
            <b >TextoA4</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA5)}
          value = {TextoA5}
        >
            <b >TextoA5</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA6)}
          value = {TextoA6}
        >
            <b >TextoA6</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA7)}
          value = {TextoA7}
        >
            <b >TextoA7</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA8)}
          value = {TextoA8}
        >
            <b >TextoA8</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA9)}
          value = {TextoA9}
        >
            <b >TextoA9</b>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor="transparent"
          borderColor="transparent"
          color={Cores.preto}
          fontSize="1rem"
          height="30px"
          onClick={() => enviaMensagem(null, TextoA10)}
          value = {TextoA10}
        >
            <b >TextoA10</b>
        </Button>
      </Menu.Item>
    </Menu>
  );

  async function fechandoModalEnviarArquivo() {
    setModalEnviarArquivo(false);
  }

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getDadosUsuarioAtual() {
      const resposta = await managerService.GetDadosUsuario(
        recebeEmail()
      );

      if (componenteEstaMontadoRef.current) {
        setUsuarioAtual(resposta.dadosUsuario);
        setTipoUsuario(resposta.dadosUsuario.tipo);
        setEndereco(resposta.dadosEndereco);
        setCarregandoConversa(false);
      }
    }

    getDadosUsuarioAtual();

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  const verificaHorarioPermitidoParaEnvioDeMensagens = () => {
    const verificaHorarioUsuario =
      horarioComercial === false && tipoUsuario !== "MASTER" ? false : true;
    setHorarioPermitidoParaEnvioMensagem(verificaHorarioUsuario);
  };

  useEffect(() => {
    verificaHorarioPermitidoParaEnvioDeMensagens();
  });


  async function confirmarPagamento() {
  if (conversaSelecionada.tipo === "ACTIGRAFIA"){
    await enviaMensagem("nenhuma", mensagemConfirmarPagamentoActigrafia);
  }else if (conversaSelecionada.tipo === "BIOLOGIX"){
    await enviaMensagem("nenhuma", mensagemConfirmarPagamentoBiologix);
  }
      //await managerService.MandandoMensagemConfirmarPagamento(id_usuario);
  }

  async function finalizarChat() {
    await enviaMensagem("nenhuma", mensagemFinalizada);
    await managerService.UpdateConversaFinalizada(conversaSelecionada.id);
    atualizaConversaFinalizada();
  }

  async function InformaçãoGeral() {
    if (conversaSelecionada.tipo === "ACTIGRAFIA"){
      await enviaMensagem("nenhuma", mensagemActigrafia);
    }else if (conversaSelecionada.tipo === "BIOLOGIX"){
      await enviaMensagem("nenhuma", mensagemBiologix);
    }
  }
  async function DispositivoIndisponível() {
    await enviaMensagem("nenhuma", mensagemDispositivoIndisponível);
  }

  async function DispositivoDisponível() {
    await enviaMensagem("nenhuma", mensagemDispositivoDisponível); 
        const Token =        
          await managerService.TokenById(conversaSelecionada.conversaCom.id);
          for(var i = 0; i <= Token.length - 1; i++){
            const Message = {
              to: Token[i].token_dispositivo.replace("expo/", ''),
              sound: 'default',
              title: 'Doctor App', 
              body: mensagemNotificacao,
              
            };
            fetch('https://exp.host/--/api/v2/push/send',{
              method: 'POST',
              body: JSON.stringify(Message),
              }
            );
            }
          }
  
  async function ConfirmacaoDeDados() {
    await enviaMensagem("nenhuma", mensagemConfirmacaoDeDados);
  }

  async function SolicitarPagamento() {
    await enviaMensagem("nenhuma", mensagemSolicitarPagamento);
  }

  async function ResponderFormulario() {
    if (conversaSelecionada.tipo === "ACTIGRAFIA"){
      await enviaMensagem("nenhuma", mensagemResponderFormulárioActigrafia);
    }else if (conversaSelecionada.tipo === "BIOLOGIX"){
      await enviaMensagem("nenhuma", mensagemResponderFormulárioBiologix);
    }
  }
  function atualizaConversaFinalizada() {
    const auxConversa = conversaSelecionada;
    auxConversa.finalizada = true;
    setConversaSelecionada(auxConversa);
  }

  async function getMensagens() {
    if (checarObjVazio(conversaSelecionada) || !usuarioId) return;

    const resposta = await managerService.GetMensagensPorConversaUsuario(
      usuarioId,
      conversaSelecionada.id,
    );
    
    if (componenteEstaMontadoRef.current) setMensagens(resposta);
  }
  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    getMensagens();

    return () => (componenteEstaMontadoRef.current = false);
  }, [conversaSelecionada, usuarioId]);

  useEffect(() => {
    inputMensagemConteudoRef?.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
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

    socket.emit("enviarConversa", {
      novaConversa: conversaParaEnvio,
      receptorId,
    });
  };

  const enviaMensagem = async (media_url, conteudo) => {
    setCarregandoEnvioMensagem(true);
    const dadosParaCriarNovaMensagem = {
      id_conversa: conversaSelecionada.id,
      id_usuario: usuarioId,
      media_url: media_url,
      foi_visualizado: false,
      conteudo: conteudo,
    };

    const { data_cricao, data_atualizacao, ...dados } =
      await managerService.CriandoMensagem(dadosParaCriarNovaMensagem);

    const novaMensagem = {
      ...dados,
      pertenceAoUsuarioAtual: !horarioPermitidoParaEnvioMensagem,
    };

    if (conversaSelecionada.ativada) {
      socket.emit("enviarMensagem", {
        novaMensagem,
        receptorId: conversaSelecionada.conversaCom.id,
      });
    } else {
      enviarConversa(novaMensagem);
    }

    atualizarBarraLateral(novaMensagem);

    setMensagens((mensagensLista) => [...mensagensLista, novaMensagem]);
    getMensagens();
    setInputMensagemConteudo("");
    setCarregandoEnvioMensagem(false);
  };

  const enviarMensagemComInput = async (e) => {
    e.preventDefault();

    if (!inputMensagemConteudo) return;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)]
        .conversaCom;

    let id_remetente = usuarioId;
    let texto = inputMensagemConteudo;
    
    if (!horarioPermitidoParaEnvioMensagem && !conversaSelecionada.finalizada) {
      id_remetente = remetente.id;
      texto =
        "Obrigado pela sua mensagem!\n" +
        "Estarei fora do consultório de 19h até 7h e não poderei responder durante esse período.\n" +
        "Se tiver um assunto urgente favor responder ao formulário de Emergência.";
    }

    if (conversaSelecionada.finalizada) {
      id_remetente = remetente.id;
      texto = mensagemFinalizada;
      setInputMensagemConteudo("");
    }

    if (horarioComercial) {
      setInputMensagemConteudo("");
    }

    enviaMensagem(null, texto);
  };

  // Aqui pega os dados do  modal, vamos por a função de enviar mensagem aqui :)
  async function EnviandoMensagemComArquivo() {
    setPdfFromModal(modalRef.current?.getPDF().file);
    let url = modalRef.current?.getPDF().url;

    const remetente =
      conversas[conversas.findIndex(({ id }) => id === conversaSelecionada.id)]
        .conversaCom;

    let id_remetente = usuarioId;
    let texto = "Arquivo PDF";

    if (!horarioPermitidoParaEnvioMensagem && !conversaSelecionada.finalizada) {
      id_remetente = remetente.id;
      texto =
        "Obrigado pela sua mensagem!\n" +
        "Estarei fora do consultório de 19h até 7h e não poderei responder durante esse período.\n" +
        "Se tiver um assunto urgente favor responder ao formulário de Emergência.";

      url = null;
    }

    if (conversaSelecionada.finalizada) {
      id_remetente = remetente.id;
      texto = mensagemFinalizada;
      url = null;
    }

    enviaMensagem(url, texto);
  }

  const antIconConversa = (
    <LoadingOutlined style={{ fontSize: 130, color: Cores.azul }} spin />
  );

  const antIconEnvioMensagem = (
    <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
  );

  const verificarEnter = (e) => {
    if (e.key === "Enter" && inputMensagemConteudo) {
      enviarMensagemComInput(e);
    }
  };


  return (
    <Conversa>
      <HeaderConversaAberta>
        <BotaoVoltar>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color={Cores.lilas[1]}
            width="10%"
            widthres="15%"
            height="10%"
            marginTop="0%"
            onClick={() => {
              setConversaSelecionada({});
            }}
          >
            <ArrowLeftOutlined
              style={{ fontSize: "30px", color: "{Cores.lilas[1]}" }}
            />
          </Button>
        </BotaoVoltar>
        <img
          src={
            conversaSelecionada?.conversaCom?.avatar_url || imagemPerfilPadrão
          }
          alt="61"
          height="70px"
          width="76px"
        ></img>
        {conversaSelecionada.tipo === "EXAME" ? (
          <NomePessoa>
            {conversaSelecionada?.conversaCom?.nome} - EXAME
          </NomePessoa>
        ) : (
          <NomePessoa>{conversaSelecionada?.conversaCom?.nome}</NomePessoa>
        )}
      </HeaderConversaAberta>
      <CorpoConversaAberta>
        {carregandoConversa ? (
          <Spin
            indicator={antIconConversa}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          mensagens?.map((m, idx) => (
            <Mensagem
              key={idx}
              pertenceAoUsuarioAtual={m.pertenceAoUsuarioAtual}
              conteudo={m.conteudo}
              media_url={m.media_url}
              scrollRef={mensagens?.length - 1 === idx ? scrollRef : null}
              data_criacao={m.data_criacao}
              tipo={m.tipo}
            />
          ))
        )}
      </CorpoConversaAberta>
      <FooterConversaAberta>
        {conversaSelecionada.tipo === "ACTIGRAFIA" || conversaSelecionada.tipo === "BIOLOGIX" ? (
          <MenuConversasTipoExame>
            <Dropdown
              onClick={(e) => e.preventDefault()}
              overlay={menuBotoes}
              placement={"bottom"}
            >
              <PlusOutlined
                style={{ fontSize: "27px", color: "{Cores.lilas[1]}" }}
              />
            </Dropdown>
          </MenuConversasTipoExame>
        ) : (
          <>
          <Tooltip placement="bottom" title="Enviar arquivo">
            <Button
              backgroundColor="transparent"
              borderColor="transparent"
              color={Cores.lilas[1]}
              width="10%"
              widthres="15%"
              height="10%"
              marginTop="0%"
              onClick={() => {
                setModalEnviarArquivo(true);
              }}
            >
              <PaperClipOutlined
                style={{ fontSize: "27px", color: "{Cores.lilas[1]}" }}
              />
            </Button>
          </Tooltip>
            <Dropdown
              backgroundColor="transparent"
              borderColor="transparent"
              color={Cores.lilas[1]}
              width="10%"
              widthres="15%"
              height="10%"
              marginTop="0%"
              overlay={menuMensagens}
              placement={"bottom"}
            >
              <QuestionOutlined 
                style={{ fontSize: "27px", color: "#434b97", margin: "0px 1rem",marginLeft: "0%" }}
              />
            </Dropdown>
          </>
        )}
        <Input
          placeholder="Mensagem"
          backgroundColor="white"
          borderColor={Cores.cinza[3]}
          width="90%"
          height="100%"
          minHeight="45px"
          maxHeight="40px"
          paddingRight="2%"
          onKeyPress={verificarEnter}
          onChange={(e) => setInputMensagemConteudo(e.target.value)}
          value={inputMensagemConteudo}
          ref={inputMensagemConteudoRef}
        />
        {carregandoEnvioMensagem ? (
          <Spin
            indicator={antIconEnvioMensagem}
            style={{
              margin: "0px 1rem",
            }}
          />
        ) : (
          <Tooltip placement="bottom" title="Enviar mensagem">
            <Button
              backgroundColor="transparent"
              borderColor="transparent"
              color={Cores.lilas[1]}
              width="10%"
              widthres="15%"
              height="10%"
              marginTop="0%"
              onClick={enviarMensagemComInput}
            >
              <SendOutlined
                style={{ fontSize: "27px", color: "{Cores.lilas[1]}" }}
              />
            </Button>
          </Tooltip>
        )}
      </FooterConversaAberta>

      <Modal
        visible={modalEnviarArquivo}
        onCancel={fechandoModalEnviarArquivo}
        footer={null}
        width={"50%"}
        centered={true}
        destroyOnClose={true}
        style={{ maxWidth: "450px", minWidth: "250px" }}
      >
        <ModalEnviarArquivo
          fecharModal={() => fechandoModalEnviarArquivo()}
          pegandoDados={() => EnviandoMensagemComArquivo()}
          ref={modalRef}
        />
      </Modal>
    </Conversa>
  );
}