import React, { useState, useEffect } from "react";
import {
  LoadingOutlined,
  StarOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { Modal } from "antd";
import { toast } from "react-toastify";
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
  TextoUrgencia,
  CaixaBaixarPdf,
  BaixarPdf,
} from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";
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
import { Document, Packer, Paragraph } from "docx";

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
  const [booleanoFormulario, setbooleanFormulario] = useState();
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );
  const antIconModal = (
    <LoadingOutlined style={{ fontSize: 15, color: Cores.azul }} spin />
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
  }

  useEffect(() => {
    pegandoListaFormularios();
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

  async function salvaWord() {
    const formularioPacienteEspecifico = {
      "id": "4c57cc30-33c1-4b48-9302-735dcb55e127",
      "respostas": {
        "newInput1": "não"
      },
      "midia_url": null,
      "word": null,
      "status": true,
      "notificacao_ativa": false,
      "id_usuario": "c40b324c-481a-4ede-93e6-9a011ec12287",
      "id_formulario": "062956f0-870b-4aa4-a6a4-6b68fcd838a7",
      "data_criacao": "2022-11-11T12:02:39.219Z",
      "data_atualizacao": "2022-11-11T12:07:17.015Z",
      "email": "adrianuspaciente@gmail.com",
      "nome": "Adrianus Paciente",
      "avatar_url": null,
      "titulo": "form que sera respondido",
      "urgencia": 2,
      "tipo": "oi",
      "perguntas": {
        "type": "object",
        "properties": {
          "newInput1": {
            "title": "devo responder o formulario?",
            "type": "string"
          }
        },
        "dependencies": {},
        "required": []
      }
    }

    const perguntas = Object.values(formularioPacienteEspecifico.perguntas.properties);
    const respostas = Object.values(formularioPacienteEspecifico.respostas);

    let arrayParagrafos = [];

    perguntas.forEach((pergunta, index) => {
      const conteudoPergunta = pergunta.title
      const conteudoResposta = respostas[index];
      arrayParagrafos.push(
        new Paragraph(`Pergunta: ${conteudoPergunta}`)
      )
      arrayParagrafos.push(
        new Paragraph(`Resposta: ${conteudoResposta}`)
      )
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: arrayParagrafos
        },
      ],
    });

    await Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'formulario.docx')
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
                      fontSizeMedia="1em"
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
                        fontSizeMedia="1em"
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
                      {deveMostrarFormularios(
                        value.id_formulario,
                        value.status
                      ) && (
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
                              <CaixaBaixarPdf>
                                <Button
                                  backgroundColor={Cores.lilas[2]}
                                  color={Cores.azulEscuro}
                                  fontWeight="bold"
                                  borderColor={Cores.azulEscuro}
                                  height="40px"
                                  width="25%"
                                  onClick={() => salvaWord()}
                                >
                                  BAIXAR DOCX
                                </Button>
                              </CaixaBaixarPdf>
                            ) : (
                              <RespostaPendente>
                                <Resposta>Resposta Pendente</Resposta>
                                <Button
                                  backgroundColor="green"
                                  color={Cores.azulEscuro}
                                  fontWeight="bold"
                                  borderColor={Cores.azulEscuro}
                                  height="40px"
                                  width="25%"
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
                  <Receita>
                    <DadosReceita>
                      <TituloReceita
                        textDecoration="underline"
                        color={Cores.preto}
                        fontSize="1.5em"
                      >
                        Título
                      </TituloReceita>
                      <TituloReceita color={Cores.lilas[1]} fontSize="1.2em">
                        xx/xx/2022
                      </TituloReceita>
                    </DadosReceita>
                    <BotaoReceita>
                      <Button
                        backgroundColor="green"
                        color={Cores.azulEscuro}
                        fontWeight="bold"
                        borderColor={Cores.azulEscuro}
                        height="40px"
                        width="25%"
                      >
                        DOWNLOAD
                      </Button>
                    </BotaoReceita>
                  </Receita>
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
