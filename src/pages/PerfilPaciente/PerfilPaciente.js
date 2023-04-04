import React, { useState, useEffect, useContext } from "react";
import {
  LoadingOutlined,
  StarOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { ChatContext } from '../../contexts/ChatContext';
import {
  ContainerPerfil,
  Perfil,
  Formularios,
  Receitas,
  PerfilSuperior,
  PerfilInferior,
  FotoPerfil,
  Dados,
  Nome,
  Data,
  PerfilEsquerda,
  PerfilDireita,
  Titulo,
  Botoes,
  Botao,
  Formulario,
  DadosFormulario,
  DadosContato,
  DadosGeo,
  DadosPaciente,
  InfoContato,
  InfoDadosPaciente,
  Receita,
  BotaoReceita,
  DadosReceita,
  TituloFormulario,
  RespostaPendente,
  Resposta,
  TituloReceita,
  TipoFormulario,
  UrgenciaFormulario,
  CaixaBaixarPdf,
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamento from "../../components/ModalAgendamento/ModalAgendamento";
import { Cores } from "../../variaveis";
import AddToast from "../../components/AddToast/AddToast";
import { recebeTipo, usuarioAutenticado } from "../../services/auth";
import ModalExcluirUsuario from "../../components/ModalExcluirUsuario";
import ModalFormulario from "../../components/ModalFormulario";
import { redirecionamento, sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";
import { cep } from "../../utils/masks";
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  ImageRun,
  AlignmentType,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  TextWrappingType,
  TextWrappingSide
} from "docx";
import formatarData from "../../utils/formatarData";
import logoWord from "./logo.json";
import footerWord from "./footer.json";
import { compararDataRecente } from "../../utils/tratamentoErros";
import objCopiaProfunda from '../../utils/objCopiaProfunda';


function PerfilPaciente(props) {
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [modalFormulario, setModalFormulario] = useState(false);
  const [modalDeletarUsuario, setModalDeletarUsuario] = useState(false);
  const [idFormularioPaciente, setIdFormularioPaciente] = useState();
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cuidador, setCuidador] = useState();
  const [telefoneCuidador, setTelefoneCuidador] = useState();
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [respostas, setRespostas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [perguntas, setPerguntas] = useState();
  const [titulo, setTitulo] = useState();
  const [cpf, setCpf] = useState();
  const [codigo, setCodigo] = useState();
  const [convenio, setConvenio] = useState();
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(false);
  const abertoPeloUsuario = true;
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const idFormularioUrgencia = "046975f7-d7d0-4635-a9d9-25efbe65d7b7";
  const [tipoAgendamento, setTipoAgendamento] = useState("");
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState("");
  const emailUsuarioLogado = sessionStorage.getItem("@doctorapp-Email");
  const [formularioEspecifico, setFormularioEspecifico] = useState({});
  
  const [formularios, setFormularios] = useState();
  const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    imagemPerfilPadrão,
  } = useContext(ChatContext);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 25, color: Cores.azulEscuro }} spin />
  );

  const margemBotoes = tipoUsuario ? "0px" : "8%";
  const margemPerfil = tipoUsuario ? "2%" : "20%";

  function formatarCpf(cpf) {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  async function pegandoTipoUsuarioLogado() {
    const resposta = await managerService.GetDadosUsuario(emailUsuarioLogado);
    setTipoUsuarioLogado(resposta.dadosUsuario.tipo);
  }

  async function criarConversa() {
    

    const index = conversas.findIndex(({ id }) => id === conversa.id);
      const copiaConversas = objCopiaProfunda(conversas);

      const conversaNaLista = copiaConversas[index];

      if (conversaNaLista.mensagensNaoVistas) {
        conversaNaLista.mensagensNaoVistas = 0;
        await managerService.UpdateMensagensVisualizadas(
          usuarioId,
          conversa.id
        );
      }

      setConversaSelecionada(conversaNaLista);
      setConversas(copiaConversas);
      history.push("/web/chat")
    }
  }

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(
      props.location.state.email
    );
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(formatarCpf(resposta.dadosUsuario.cpf));
    setCodigo(resposta.dadosUsuario.codigo);
    setDataNascimento(data.toLocaleDateString());
    setEndereco(resposta.dadosEndereco);
    setCuidador(resposta.dadosUsuario.nome_cuidador);
    setTelefoneCuidador(resposta.dadosUsuario.telefone_cuidador);
    setConvenio(resposta.dadosUsuario.convenio);
    setCarregando(false);



    if (resposta.dadosUsuario.tipo === "PACIENTE") {
      setTipoUsuario(true);
    }
  }
  useEffect(() => {
    pegandoDados();
    pegandoTipoUsuarioLogado();
  }, []);

  async function setandoFotoDePerfil() {
    const chave = usuario.avatar_url;
    if (chave === null || chave === "") return;
    setCarregandoFoto(true);
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    setandoFotoDePerfil();
  }, [usuario]);

  async function pegandoListaFormularios() {
    const resposta = await managerService.GetRespostaFormularioIdUsuario(
      usuario.id
    );
    setRespostas(resposta);
    setFormularios(resposta);
  }

  async function pegandoListaReceitas() {
    const resposta = await managerService.GetRespostaReceitasIdUsuario(
      usuario.id
    );
    const receitasFormatadas = resposta
      .sort(compararDataRecente)
      .map(({ data_criacao, ...resto }) => ({
        data_criacao: formatarData({ data: data_criacao, formatacao: "dd/MM/yyyy" }),
        ...resto,
      }));
    setReceitas(receitasFormatadas);
  }

  useEffect(() => {
    pegandoListaFormularios();
    pegandoListaReceitas();
  }, [usuario]);

  async function deletarEnderecoEUsuario() {
    if (usuarioAutenticado() && recebeTipo() === "MASTER") {
      setCarregandoDeletar(true);
      await managerService.DeletarEnderecoEUsuario(usuario.id_endereco);
      setModalDeletarUsuario(false);
      await sleep(3000);
      redirecionamento("/web/listadeusuarios");
      setCarregandoDeletar(false);
    } else {
      toast.error("Usuário não autenticado.");
      await sleep(3000);
      redirecionamento("/login");
    }
  }



  async function setandoTipoExame() {
    setTipoAgendamento("Exame");
    setModalAgendamento(true);

  }

  async function setandoTipoConsulta() {
    setTipoAgendamento("Consulta");
    setModalAgendamento(true);
  }

  async function fechandoModalAgendamento() {
    setModalAgendamento(false);
  }

  function fechandoModalDeletarUsuario() {
    setModalDeletarUsuario(false);
  }

  async function abrindoModalFormulario(id, perguntas, titulo) {
    setPerguntas(perguntas);
    setTitulo(titulo);
    setIdFormularioPaciente(id);
    setModalFormulario(true);
  }

  function estrelaPreenchida(numEstrelasPreenc) {
    if (numEstrelasPreenc !== 0) {
      return (
        <>
          <StarFilled />
          {estrelaPreenchida(numEstrelasPreenc - 1)}
        </>
      );
    } else {
      return;
    }
  }

  function estrelaNaoPreenchida(numNaoPreenchido) {
    if (numNaoPreenchido !== 0) {
      return (
        <>
          <StarOutlined />
          {estrelaNaoPreenchida(numNaoPreenchido - 1)}
        </>
      );
    }
    return;
  }

  function deveMostrarFormularios(id, statusForm) {
    if (id !== idFormularioUrgencia) {
      return true;
    }

    const FORMULARIO_RESPONDIDO = true;

    return statusForm === FORMULARIO_RESPONDIDO;
  }

  async function enviarLembrete(respostaSelecionada) {
    setCarregando(true)
    const Token =
      await managerService.TokenById(respostaSelecionada.id_usuario);
    for (var i = 0; i <= Token.length - 1; i++) {
      const Message = {
        to: Token[i].token_dispositivo.replace("expo/", ''),
        sound: 'default',
        title: 'Doctor App',
        body: "Você tem um novo formulário enviado!",
      };

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        body: JSON.stringify(Message),
      }
      );
    }
    toast.success('Notificação encaminhada para o paciente.');
    await sleep(1000);
    setCarregando(false);
  }

  async function baixarPdf(receitaPdf) {
    const chave = receitaPdf.pdf_url;
    const resposta = await managerService.GetArquivoPorChave(chave);

    const fonteLink = `data:application/pdf;base64,${resposta}`;
    const Linkbaixavel = document.createElement('a');
    const nome = receitaPdf.titulo + ".pdf";

    Linkbaixavel.href = fonteLink;
    Linkbaixavel.download = nome;
    Linkbaixavel.click();
  }

  async function pegandoDadosFormularioEspecifico(id) {
    const formularioEscolhido = await managerService.GetFormularioEspecifico(
      id
    );
    setFormularioEspecifico(formularioEscolhido);
    if (formularioEscolhido.visualizacao_secretaria === true) {
      return true;
    } else {
      return false;
    }
  }

  async function salvaWord(docxWord) {

    const perguntas = Object.values(docxWord.perguntas.properties);
    const respostas = Object.values(docxWord.respostas);

    const dataFormatada = formatarData({ data: usuario.data_nascimento, formatacao: "dd/MM/yyyy" });

    let arrayParagrafos = [];

    perguntas.forEach((pergunta, index) => {
      const conteudoPergunta = pergunta.title
      const conteudoResposta = respostas[index];
      arrayParagrafos.push(
        new TextRun({
          text: `Pergunta: ${conteudoPergunta}`,
          break: 2,
          bold: true
        })
      )
      arrayParagrafos.push(
        new TextRun({
          text: `Resposta: ${conteudoResposta}`,
          break: 1
        })
      )
    });

    const doc = new Document({
      sections: [{
        properties: {
          type: SectionType.CONTINUOUS,
        },
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: logoWord,
                transformation: {
                  width: 600,
                  height: 150
                },
                floating: {
                  horizontalPosition: {
                    relative: HorizontalPositionRelativeFrom.TOP_MARGIN,
                    align: HorizontalPositionAlign.CENTER,
                  },
                  verticalPosition: {
                    relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                    align: VerticalPositionAlign.TOP,
                  },
                  wrap: {
                    type: TextWrappingType.TOP_AND_BOTTOM,
                    side: TextWrappingSide.LARGEST,
                  },
                  margins: {
                    top: 201440,
                    bottom: 201440,
                  },
                }
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `NOME: `,
                bold: true,
              }),
              new TextRun({
                text: `${docxWord.nome}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `DATA DE NASCIMENTO: `,
                bold: true,
              }),
              new TextRun({
                text: `${dataFormatada}`,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${docxWord.titulo}`,
                bold: true,
                size: 28,
                break: 1
              }),
            ],
          }),
          new Paragraph({
            children: arrayParagrafos,
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: footerWord,
                transformation: {
                  width: 800,
                  height: 120
                },
                floating: {
                  horizontalPosition: {
                    relative: HorizontalPositionRelativeFrom.TOP_AND_BOTTOM,
                    align: HorizontalPositionAlign.CENTER,
                  },
                  verticalPosition: {
                    relative: VerticalPositionRelativeFrom.BOTTOM_MARGIN,
                    align: VerticalPositionAlign.BOTTOM,
                  },
                  wrap: {
                    type: TextWrappingType.TOP_AND_BOTTOM,
                    side: TextWrappingSide.LARGEST,
                  },
                  margins: {
                    top: 201440,
                    bottom: 201440,
                  },
                }
              })
            ]
          }),
        ],
      }],
    });

    await Packer.toBlob(doc).then(blob => {
      saveAs(blob,
        "Resposta do Formulário " + docxWord.titulo + " referente ao paciente " + docxWord.nome+ ".docx")
    })
  }

  return (
    <div>
      <ContainerPerfil>
        <Perfil marginBottom={margemPerfil}>
          {carregando ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <PerfilEsquerda>
                <PerfilSuperior>
                  {usuario.avatar_url === null || usuario.avatar_url === "" ? (
                    <FotoPerfil>
                      {carregandoFoto ? (
                        <Spin size="small" indicator={antIcon} />
                      ) : (
                        <>
                          <UserOutlined style={{ fontSize: "6.5em" }} />
                        </>
                      )}
                    </FotoPerfil>
                  ) : (
                    <FotoPerfil>
                      {carregandoFoto ? (
                        <Spin size="small" indicator={antIcon} />
                      ) : (
                        <>
                          <img
                            src={fotoDePerfil}
                            className="foto"
                            alt="fotoPerfil"
                            height="100%"
                            width="100%"
                          ></img>
                        </>
                      )}
                    </FotoPerfil>
                  )}
                  <Dados>
                    <Nome>{usuario.nome}</Nome>
                    <Data> Nascimento: {dataNascimento}</Data>
                  </Dados>
                </PerfilSuperior>
                <PerfilInferior>
                  <Titulo>Endereço</Titulo>
                  <DadosGeo>País: {endereco.pais}</DadosGeo>
                  <DadosGeo>Estado: {endereco.estado}</DadosGeo>
                  <DadosGeo>Bairro: {endereco.bairro}</DadosGeo>
                  <DadosGeo>Cidade: {endereco.cidade}</DadosGeo>
                  <DadosGeo>CEP: {cep(endereco.cep)}</DadosGeo>
                  <DadosGeo>Rua: {endereco.rua}</DadosGeo>
                  <DadosGeo>Número: {endereco.numero}</DadosGeo>
                  <DadosGeo>Complemento: {endereco.complemento}</DadosGeo>
                </PerfilInferior>
              </PerfilEsquerda>
              <PerfilDireita>
                <DadosContato>
                  <Titulo>Contato</Titulo>
                  <InfoContato>
                    Telefone: ({telefone.slice(0, -9)}) {telefone.slice(2, -4)}-
                    {telefone.slice(-4)}
                  </InfoContato>
                  <InfoContato style={{ wordBreak: "break-word" }}>
                    {"E-mail: "}
                    {usuario.email}
                  </InfoContato>
                  {tipoUsuario ? (
                    <>
                      <InfoContato style={{ marginTop: "0.4%" }}>
                        Cuidador: {cuidador}
                      </InfoContato>
                      {telefoneCuidador ? (
                        <InfoContato style={{ marginTop: "0.4%" }}>
                          Telefone do Cuidador: ({telefoneCuidador.slice(0, -9)}
                          ) {telefoneCuidador.slice(2, -4)}-
                          {telefoneCuidador.slice(-4)}
                        </InfoContato>
                      ) : (
                        <InfoContato style={{ marginTop: "0.4%" }}>
                          Telefone do Cuidador:
                        </InfoContato>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </DadosContato>
                <DadosPaciente>
                  <Titulo>Dados</Titulo>
                  <InfoDadosPaciente>CPF: {cpf}</InfoDadosPaciente>
                  {tipoUsuario ? (
                    <>
                      <InfoDadosPaciente>Código: {codigo}</InfoDadosPaciente>
                      <InfoDadosPaciente>
                        Convênio: {convenio}
                      </InfoDadosPaciente>
                    </>
                  ) : (
                    <></>
                  )}
                </DadosPaciente>
                <Botoes marginTop={margemBotoes}>
                  <Botao>
                    <Button
                      backgroundColor="green"
                      color={Cores.azulEscuro}
                      fontWeight="bold"
                      borderColor={Cores.azulEscuro}
                      height="40px"
                      width="100%"
                      fontSize="1.3em"
                      fontSizeMedia480="1em"
                      onClick={() => criarConversa()}
                    >
                      Iniciar Conversa
                    </Button>
                  </Botao>
                  {tipoUsuario ? (
                    <>
                      <Botao>
                        <Button
                          backgroundColor={Cores.lilas[2]}
                          color={Cores.azulEscuro}
                          fontWeight="bold"
                          borderColor={Cores.azulEscuro}
                          height="40px"
                          width="100%"
                          fontSize="1.3em"
                          fontSizeMedia="1em"
                          onClick={() => setandoTipoConsulta()}
                        >
                          Consultas Agendadas
                        </Button>
                      </Botao>
                      <Botao>
                        <Button
                          backgroundColor={Cores.lilas[2]}
                          color={Cores.azulEscuro}
                          fontWeight="bold"
                          borderColor={Cores.azulEscuro}
                          height="40px"
                          width="100%"
                          fontSize="1.3em"
                          fontSizeMedia="1em"
                          onClick={() => setandoTipoExame()}
                        >
                          Exames Agendados
                        </Button>
                      </Botao>
                    </>
                  ) : (
                    <></>
                  )}
                  {recebeTipo() === "MASTER" && (
                    <Botao>
                      <Button
                        backgroundColor={Cores.lilas[2]}
                        color={Cores.azulEscuro}
                        fontWeight="bold"
                        borderColor={Cores.azulEscuro}
                        height="40px"
                        width="100%"
                        fontSize="1.3em"
                        fontSizeMedia480="1em"
                        onClick={() => setModalDeletarUsuario(true)}
                      >
                        Excluir Usuário
                      </Button>
                    </Botao>
                  )}
                </Botoes>
              </PerfilDireita>
            </>
          )}
        </Perfil>
        {tipoUsuario ? (
          <>
            <Formularios>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <>
                  <Titulo>FORMULÁRIOS</Titulo>
                  {respostas?.map((value) => (
                    <>
                      {deveMostrarFormularios(value.id_formulario,value.status) && (
                          <Formulario>
                            <DadosFormulario>
                              {tipoUsuarioLogado === "MASTER" ||
                                value.visualizacao_secretaria === true ? (
                                <TituloFormulario
                                  cursor="pointer"
                                  textDecoration="underline"
                                  onClick={() =>
                                    abrindoModalFormulario(
                                      value.id,
                                      value.perguntas,
                                      value.titulo
                                    )
                                  }
                                >
                                  {value.titulo}
                                </TituloFormulario>
                              ) : (
                                <TituloFormulario
                                  cursor="null"
                                  textDecoration="none"
                                >
                                  {value.titulo}
                                </TituloFormulario>
                              )}

                              <TipoFormulario>Tipo: {value.tipo}</TipoFormulario>
                              <UrgenciaFormulario>
                                <>Urgência: </>
                                {estrelaPreenchida(value.urgencia)}
                                {estrelaNaoPreenchida(3 - value.urgencia)}
                              </UrgenciaFormulario>
                            </DadosFormulario>
                            {value.status === true ? (
                              <CaixaBaixarPdf key={value?.id}>
                                <></>
                                {tipoUsuarioLogado === "MASTER" &&
                                  <Button
                                    backgroundColor={Cores.lilas[2]}
                                    color={Cores.azulEscuro}
                                    fontWeight="bold"
                                    borderColor={Cores.azulEscuro}
                                    height="40px"
                                    width="25%"
                                    onClick={() => salvaWord(value)}
                                  >
                                    BAIXAR DOCX
                                  </Button>
                                }
                              </CaixaBaixarPdf>
                            ) : (
                              <RespostaPendente>
                                <Resposta>Resposta Pendente</Resposta>
                                <Button
                                  backgroundColor={Cores.cinza[7]}
                                  color={Cores.azulEscuro}
                                  fontWeight="bold"
                                  borderColor={Cores.azulEscuro}
                                  height="40px"
                                  width="25%"
                                  onClick={() => enviarLembrete(value)}
                                >
                                  ENVIAR LEMBRETE
                                </Button>
                              </RespostaPendente>
                            )}
                          </Formulario>
                        )}
                    </>
                  ))}
                </>
              )}
            </Formularios>
            <Receitas>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <>
                  <Titulo>RECEITAS</Titulo>
                  {receitas?.map((value) =>
                    <>
                      <Receita>
                        <DadosReceita key={value?.id}>
                          <TituloReceita
                            color={Cores.preto}
                            justifyContent="flex-start"
                          >
                            {value.titulo}
                          </TituloReceita>
                          <TituloReceita
                            color={Cores.lilas[1]}
                            justifyContent="flex-end"
                          >
                            Data: {value.data_criacao}
                          </TituloReceita>
                        </DadosReceita>
                        <BotaoReceita>
                          <Button
                            backgroundColor={Cores.lilas[2]}
                            color={Cores.azulEscuro}
                            fontWeight="bold"
                            borderColor={Cores.azulEscuro}
                            height="40px"
                            width="25%"
                            onClick={() => baixarPdf(value)}
                          >
                            DOWNLOAD
                          </Button>
                        </BotaoReceita>
                      </Receita>
                    </>)}
                </>
              )}
            </Receitas>
          </>
        ) : (
          <></>
        )}
      </ContainerPerfil>
      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModalAgendamento}
        footer={null}
        width={"80%"}
        centered={true}
        destroyOnClose
      >
        <ModalAgendamento
          abertoPeloUsuario={abertoPeloUsuario}
          id_usuario={usuario.id}
          email={usuario.email}
          tipoAgendamento={tipoAgendamento}

        />
      </Modal>
      <Modal
        visible={modalDeletarUsuario}
        onCancel={() => setModalDeletarUsuario(false)}
        style={{ maxWidth: "450px", minWidth: "250px" }}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalExcluirUsuario
          usuario={usuario}
          fecharModal={() => fechandoModalDeletarUsuario()}
        />
      </Modal>
      <Modal
        visible={modalFormulario}
        onCancel={() => setModalFormulario(false)}
        style={{ minWidth: "250px", maxWidth: "800px" }}
        width={"70%"}
        centered={true}
        footer={null}
      >
        <ModalFormulario
          idFormularioPaciente={idFormularioPaciente}
          perguntas={perguntas}
          titulo={titulo}
        />
      </Modal>
      <AddToast />
    </div>
  );
}

export default PerfilPaciente;
