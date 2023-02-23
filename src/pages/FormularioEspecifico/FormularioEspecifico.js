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
import { Document, Packer, Paragraph } from "docx";

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
                    <BarraDireita>
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
                          onClick={() => salvaWord()}
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
                onClick={() => salvaWord()}
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
