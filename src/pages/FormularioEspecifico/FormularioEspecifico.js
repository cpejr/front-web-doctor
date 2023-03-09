import React, { useEffect, useState } from "react";
import {
  LoadingOutlined,
  StarOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Spin, Modal, Input, Form } from "antd";
import ModalFormulario from "../../components/ModalFormulario";
import ModalPerguntaFormulario from "../../components/ModalPerguntaFormulario";
import {
  ColunaDireita,
  ColunaEsquerda,
  ContainerFormularioEspecifico,
  ContainerFormularioCima,
  BarraEstetica,
  BarraPaciente,
  BarraRespostas,
  CamposFormularioCima,
  CamposFormularioCimaUrgencia,
  TextoBarraPaciente,
  ImagemPaciente,
  RotuloBarraDeBuscaOpcoes,
  BarraDePesquisa,
  ContainerBarraDeBuscaOpcoes,
  SelectTipos,
  BarraDireita,
  BarraEsquerda,
  BarraCentro,
  Selects,
  MargemEstetica,
  NomePaciente,
  CentralizandoSpin,
  ContainerInterno,
  FotoPerfil,
  NomePacienteSecretaria,
  NomePacienteMaster,
} from "./Styles";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  SectionType,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  TextWrappingType,
  TextWrappingSide,
  ImageRun
} from "docx";
import formatarData from "../../utils/formatarData";
import logoWord from "./logo.json";
import footerWord from "./footer.json";

function FormularioEspecifico(props) {
  const { Search } = Input;
  const [formularioEspecifico, setFormularioEspecifico] = useState({});
  const [formularioPacientes, setformularioPacientes] = useState([]);
  const [formularioRespostaPendente, setFormularioRespostaPendente] =
    useState(false);
  const [formularioResposta, setFormularioResposta] = useState(false);

  const [modalFormulario, setModalFormulario] = useState(false);
  const [modalPerguntaFormulario, setModalPerguntaFormulario] = useState(false);
  const [titulo, setTitulo] = useState();
  const [idFormularioPaciente, setIdFormularioPaciente] = useState();
  const [contador, setContador] = useState(0);

  const [carregando, setCarregando] = useState(true);
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const [carregandoFormulario, setCarregandoFormulario] = useState(true);
  const idFormularioUrgencia = "046975f7-d7d0-4635-a9d9-25efbe65d7b7";
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(false);
  const [statusSelect, setStatusSelect] = useState("");
  const { Option } = SelectTipos;
  const [busca, setBusca] = useState("");
  const tipoUsuarioLogado = sessionStorage.getItem("@doctorapp-Tipo");
  const [formularios, setFormularios] = useState();
  const [perguntas, setPerguntas] = useState();
  const [perguntasAlterar, setPerguntasAlterar] = useState();
  const [usuario, setUsuario] = useState({});
  const [dataNascimento, setDataNascimento] = useState("");

  const lowerBusca = busca
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  const idFormularioEspecifico = props.location.state.id;

  async function pegandoDadosFormularioEspecifico() {
    const resposta = await managerService.GetFormularioEspecifico(
      idFormularioEspecifico
    );
    setFormularioEspecifico(resposta);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDadosFormularioEspecifico();
  }, [props]);

  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoFormularioPacientes() {
    const respostaFormularios =
      await managerService.GetFormularioPacientesPorFormulario(
        idFormularioEspecifico
      );
    setformularioPacientes(respostaFormularios);
    respostaFormularios.forEach((formulario) => {
      setandoFotoDePerfil(formulario);
    });

    const formularioRespostaPendente = respostaFormularios.filter(
      (item) => item.status === false
    );
    setFormularioRespostaPendente(formularioRespostaPendente);

    const formularioResposta = respostaFormularios.filter(
      (item) => item.status !== false
    );
    setFormularioResposta(formularioResposta);
    await sleep(1000);
    setCarregandoFormulario(false);
    setNotificacaoAtiva(true);
  }

  async function setandoFotoDePerfil(formulario) {
    const chave = formulario.avatar_url;
    if (chave !== null && chave !== "") {
      setCarregandoFoto(true);
      const arquivo = await managerService.GetArquivoPorChave(chave);
      Object.defineProperty(formulario, "fotoDePerfil", {
        value: arquivo,
      });
    } else {
      setCarregandoFoto(false);
      return;
    }
    await sleep(1700);
    setCarregandoFoto(false);
  }

  function abrindoModalFormulario(id, perguntas, titulo) {
    setPerguntas(perguntas);
    setTitulo(titulo);
    setIdFormularioPaciente(id);
    setModalFormulario(true);
  }

  function abrindoModalPerguntaFormulario() {
    setPerguntas(Object.entries(formularioEspecifico.perguntas.properties));
    setTitulo(formularioEspecifico.titulo);
    setModalPerguntaFormulario(true);
  }

  useEffect(() => {
    pegandoFormularioPacientes();
  }, [idFormularioEspecifico]);

  useEffect(() => {
    pegandoDadosFormularioEspecifico();
  }, [idFormularioEspecifico]);

  useEffect(() => {
    setandoFotoDePerfil();
  }, [formularioPacientes]);

  const usuariosFiltrados = formularioPacientes.filter(
    (formularioPacientes) => {
      if (lowerBusca === "" && statusSelect === "") {
        if (idFormularioEspecifico === idFormularioUrgencia) {
          return formularioPacientes.status === true;
        } else {
          return formularioPacientes;
        }
      } else {
        if (statusSelect === "true") {
          return (
            formularioPacientes?.nome
              ?.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(lowerBusca) && formularioPacientes.status === true
          );
        } else if (statusSelect === "false") {
          if (idFormularioEspecifico !== idFormularioUrgencia) {
            return (
              formularioPacientes?.nome
                ?.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(lowerBusca) && formularioPacientes.status === false
            );
          } else return false;
        } else {
          if (idFormularioEspecifico !== idFormularioUrgencia) {
            return formularioPacientes?.nome
              ?.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(lowerBusca);
          } else {
            return (
              formularioPacientes?.nome
                ?.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(lowerBusca) && formularioPacientes.status === true
            );
          }
        }
      }
    }
  );

  function usuariosFiltro(value) {
    setStatusSelect(value);
  }

  async function salvaWord(docxWord) {

    const perguntas = Object.values(docxWord.perguntas.properties);
    const respostas = Object.values(docxWord.respostas);

    //const dataFormatada = formatarData({ data: usuario.data_nascimento, formatacao: "dd/MM/yyyy" });

    let arrayParagrafos = [];

    perguntas.forEach((pergunta, index) => {
      const conteudoPergunta = pergunta.title
      const conteudoResposta = respostas[index];
      arrayParagrafos.push(
        new TextRun({
          text: `Pergunta: ${conteudoPergunta}`,
          break: 1,
          bold: true
        })
      )
      arrayParagrafos.push(
        new TextRun({
          text: `Resposta: ${conteudoResposta}`,
          break: 1,
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
                  width: 350,
                  height: 130
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
              /* new TextRun({
                text: `${dataFormatada}`,
              }), */
            ],
          }),
          new Paragraph({
            children: arrayParagrafos
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: footerWord,
                transformation: {
                  width: 800,
                  height: 100
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
        "Resposta do Formulário " + docxWord.titulo + " referente ao paciente " + docxWord.nome
          .docx)
    })
  }


  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(
      props.location.state.email
    );
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setDataNascimento(data.toLocaleDateString());
  }

  return (
    <div>
      <ContainerFormularioEspecifico>
        {carregandoFormulario ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "49.5%",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            <ContainerFormularioCima>
              <CamposFormularioCima>
                {formularioEspecifico.titulo}
              </CamposFormularioCima>
              <CamposFormularioCima>
                Tipo: {formularioEspecifico.tipo}
              </CamposFormularioCima>
              <CamposFormularioCima>
                Finalidade: {formularioEspecifico.finalidade}
              </CamposFormularioCima>
              <CamposFormularioCimaUrgencia>
                Urgência:{" "}
                {formularioEspecifico.urgencia === 1 ? (
                  <>
                    <StarFilled />
                    <StarOutlined />
                    <StarOutlined />
                  </>
                ) : formularioEspecifico.urgencia === 2 ? (
                  <>
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />
                  </>
                ) : (
                  <>
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </>
                )}
              </CamposFormularioCimaUrgencia>
            </ContainerFormularioCima>

            <ColunaEsquerda>
              <ContainerBarraDeBuscaOpcoes>
                <BarraDePesquisa>
                  <Search
                    placeholder="BUSCAR"
                    style={{ width: "100%" }}
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </BarraDePesquisa>
                <Selects>
                  {idFormularioEspecifico !== idFormularioUrgencia ? (
                    <RotuloBarraDeBuscaOpcoes>
                      <SelectTipos
                        defaultValue=""
                        bordered={false}
                        style={{ width: "auto" }}
                        onChange={(value) => usuariosFiltro(value)}
                      >
                        <Option value="">Todos os Usuários</Option>
                        <Option value="true">Respondido </Option>
                        <Option value="false">Resposta Pendente</Option>
                      </SelectTipos>
                    </RotuloBarraDeBuscaOpcoes>
                  ) : (
                    <></>
                  )}
                </Selects>
              </ContainerBarraDeBuscaOpcoes>

              <BarraEstetica></BarraEstetica>

              {usuariosFiltrados?.map((value) => (
                <BarraPaciente>
                  <BarraEsquerda>
                    {carregandoFormulario ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "49.5%",
                        }}
                      >
                        <Spin indicator={antIcon} />
                      </div>
                    ) : (
                      <div>
                        {value.avatar_url === null ||
                          value.avatar_url === "" ? (
                          <FotoPerfil>
                            {carregandoFoto ? (
                              <div>
                                <Spin size="small" indicator={antIcon} />
                              </div>
                            ) : (
                              <>
                                <UserOutlined style={{ fontSize: "6em" }} />
                              </>
                            )}
                          </FotoPerfil>
                        ) : (
                          <FotoPerfil>
                            {carregandoFoto ? (
                              <div>
                                <Spin size="small" indicator={antIcon} />
                              </div>
                            ) : (
                              <>
                                <img
                                  src={value.fotoDePerfil}
                                  className="fotoPerfil"
                                  alt="fotoPerfil"
                                  height="100%"
                                  width="100%"
                                ></img>
                              </>
                            )}
                          </FotoPerfil>
                        )}
                      </div>
                    )}
                  </BarraEsquerda>
                  <BarraCentro>
                    {tipoUsuarioLogado === "MASTER" || (tipoUsuarioLogado === "SECRETARIA(O)" && formularioEspecifico.visualizacao_secretaria === true) ? (
                      <NomePacienteMaster
                        onClick={() =>
                          abrindoModalFormulario(
                            value.id,
                            value.perguntas,
                            value.titulo
                          )
                        }
                      >
                        {value.nome}
                      </NomePacienteMaster>
                    ) : (
                      <NomePacienteSecretaria>
                        {value.nome}
                      </NomePacienteSecretaria>
                    )}
                  </BarraCentro>
                  {value.status === true ? (
                    <BarraDireita key={value?.id}>
                      <></>
                      {tipoUsuarioLogado === "MASTER" &&
                        <Button
                          backgroundColor={Cores.cinza[7]}
                          width="70%"
                          boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                          borderColor={Cores.azulEscuro}
                          borderRadius="5px"
                          height="40%"
                          color={Cores.preto}
                          fontSize="0.8em"
                          fontSizeMedia950="0.75em"
                          fontWeight="bold"
                          heightMedia560="28px"
                          onClick={() => salvaWord(value, value.nome, value.data_nascimento)}
                        >
                          BAIXAR DOCX
                        </Button>
                      }
                    </BarraDireita>
                  ) : (
                    <BarraDireita>
                      <TextoBarraPaciente
                        fontSize="1em"
                        fontWeight="bold"
                        justifyContent="flex-start"
                      >
                        Resposta Pendente{" "}
                      </TextoBarraPaciente>

                      <Button
                        width="70%"
                        backgroundColor="green"
                        boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                        borderColor={Cores.azulEscuro}
                        borderRadius="5px"
                        height="40%"
                        color={Cores.preto}
                        fontSize="0.8em"
                        fontSizeMedia950="0.75em"
                        fontWeight="bold"
                        heightMedia560="28px"
                      >
                        ENVIAR LEMBRETE
                      </Button>
                    </BarraDireita>
                  )}
                </BarraPaciente>
              ))}
            </ColunaEsquerda>
            <ColunaDireita>
              {idFormularioEspecifico !== idFormularioUrgencia ? (
                <BarraRespostas>
                  {" "}
                  {formularioRespostaPendente.length === 1
                    ? "Aguardando respostas de 1 formulário"
                    : `Aguardando respostas de ${formularioRespostaPendente.length} formulários`}
                </BarraRespostas>
              ) : (
                <></>
              )}


              <BarraRespostas>
                {" "}
                {formularioResposta.length < 2 ? (
                  <>
                    {formularioResposta.length === 1
                      ? "1 formulário já foi respondido"
                      : "Nenhum formulário foi respondido"}
                  </>
                ) : (
                  `${formularioResposta.length} já foram respondidos`
                )}
              </BarraRespostas>
              <MargemEstetica />

              <Button
                backgroundColor={Cores.cinza[7]}
                borderRadius="3px"
                borderWidth="1px"
                borderColor={Cores.azul}
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                color={Cores.azul}
                fontSize="15px"
                height="50px"
                width="60%"
                marginTop="0%"
                marginLeft="0%"
                fontSizeMedia950="0.9em"
                onClick={() => abrindoModalPerguntaFormulario()}
              >
                Visualizar Perguntas
              </Button>
              <Button
                backgroundColor="green"
                borderRadius="3px"
                borderWidth="1px"
                borderColor={Cores.preto}
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                color={Cores.preto}
                fontSize="15px"
                height="50px"
                width="60%"
                marginTop="0%"
                marginLeft="0%"
                fontSizeMedia950="0.9em"
              >
                Gerar documento Word
              </Button>
            </ColunaDireita>
          </>
        )}
      </ContainerFormularioEspecifico>

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

      <Modal
        visible={modalPerguntaFormulario}
        onCancel={() => setModalPerguntaFormulario(false)}
        style={{ minWidth: "250px", maxWidth: "800px" }}
        width={"70%"}
        centered={true}
        footer={null}
      >
        <ModalPerguntaFormulario
          perguntas={perguntas}
          perguntasAlterar={perguntasAlterar}
        />
      </Modal>
    </div>
  );
}

export default FormularioEspecifico;
