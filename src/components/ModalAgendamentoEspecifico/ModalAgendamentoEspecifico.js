import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { sleep } from "../../utils/sleep";
import {
  Container,
  Caixa,
  InfoEsquerdaEDireita,
  Usuario,
  Imagem,
  Nome,
  TipoAgendamento,
  TextoTipoAgendamento,
  TextoCheckbox,
  DoisSelect,
  TamanhoInput,
  InputHora,
  InputDuracao,
  SelecioneUmaData,
  TextoSelecioneUmaData,
  TextAreaDescricao,
  Rotulo,
  InputData,
  NomePaciente,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { TiposDeConsulta } from "./TiposDeConsulta";
import { apenasNumeros, data, dataAgendamentoBack } from "../../utils/masks";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoEspecifico(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoCadastro, setCarregandoCadastro] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [consulta, setConsulta] = useState({
    data_hora: "",
    duracao_em_minutos: "",
    descricao: "",
    avaliacao: "",
    id_usuario: "",
    id_consultorio: "",
    tipo: "",
  });
  const [dataConsulta, setDataConsulta] = useState("");
  const [dataConsultaBack, setDataConsultaBack] = useState("");
  const [hora, setHora] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [erroDataBack, setErroDataBack] = useState(false);

  moment.locale("pt-br");

  async function pegandoPacientes() {
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        setUsuarios((usuarios) => [...usuarios, usuario]);
      }
    });
  const errors = {};
  const referenciaInputNulos = {
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  };

  }

  useEffect(() => {
    pegandoPacientes();
  }, []);

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true)
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false)
  }

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  async function pegandoDadosUsuario() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDadosUsuario();
  }, [props]);

  async function validacaoCampos(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }
    if (consulta.duracao_em_minutos === "") {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    if (e.target.name === "hora") {
      setHora(e.target.value);
      return hora;
    } else if (e.target.name === "duracao_em_minutos") {
      setConsulta({
        ...consulta,
        [e.target.name]: apenasNumeros(e.target.value),
      });
      return consulta;
    } else {
      setConsulta({ ...consulta, [e.target.name]: e.target.value });
      return consulta;
    }
  }

  function foramatarDataConsultaFront(value) {
    const aux = apenasNumeros(value);

    setDataConsulta(data(aux));
  }
  function foramatarDataConsultaBack(data) {
    setDataConsultaBack(dataAgendamentoBack(data));
  }

  async function validacaoData(e) {
    const { value, name } = e;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    }
    if (value.toString().length < 10) {
      setErro({ ...erro, [name]: true });
      setErroDataBack(false);
    } else if (dataAgendamentoBack(value) === "Data Invalida") {
      setErro({ ...erro, [name]: true });
      setErroDataBack(true);
    } else {
      setErro({ ...erro, [name]: false });
    }
    if (value.toString().length === 0) {
      setErro({ ...erro, [name]: false });
    }
    foramatarDataConsultaFront(value);
    foramatarDataConsultaBack(value);
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${dataConsultaBack} ${hora}:00`;
      consulta.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }

  async function requisicaoCriarConsulta() {
    if (!dataConsulta) errors.data = true;
    if (!hora) errors.hora = true;
    if (!consulta.duracao_em_minutos) errors.duracao_em_minutos = true;
    if (!consulta.id_consultorio) errors.id_consultorio = true;
    if (!consulta.tipo) errors.tipo = true;

    setCamposVazios({ ...camposVazios, ...errors });
    if (consulta.duracao_em_minutos === "" || dataConsulta === "") {
      toast.warn("Preencha todos os campos");
    } else {
      if (erro.data) {
        toast.warn("Preencha todos os campos corretamente");
      } else {
        if (_.isEqual(camposVazios, referenciaInputNulos)) {
          setCarregandoCadastro(true);
          formatacaoDataHora();
          consulta.id_usuario = usuario.id;
          await managerService.CriandoConsulta(consulta);
          setCarregandoCadastro(false);
        } else {
          setCarregandoCadastro(true);
          toast.warn("Preencha todos os campos corretamente");
          setCarregandoCadastro(false);
        }
      }
    }
  }

  function preenchendoDadosConsulta(e) {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
    return consulta;
  }

  return (
    <Container>
      <Caixa>
        <InfoEsquerdaEDireita>
          {props.abertoPeloUsuario === true ? (
            <Usuario>
              <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <Nome>{usuario.nome}</Nome>
              )}
            </Usuario>
          ) : (
            <Usuario>
              <NomePaciente>
                <Select
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
                  placeholder="Selecione um paciente"
                  onChange={(e) => {
                    preenchendoDadosConsulta(e);
                  }}
                >
                  <option value="" disabled selected>
                    Paciente
                  </option>

                  {usuarios.map((usuario) => (
                    <>
                      {carregando ? (
                        <Spin indicator={antIcon} />
                      ) : (
                        <option key={usuario.id} value={usuario.id} color="red">
                          {usuario.nome}
                        </option>
                      )}
                    </>
                  ))}
                </Select>
              </NomePaciente>
            </Usuario>
          )}

          <TipoAgendamento>
            <TextoTipoAgendamento>
              Selecione o Tipo de Agendamento:
            </TextoTipoAgendamento>
            <Row gutter={60} justify={"space-around"}>
              <Col>
                <Checkbox>
                  <TextoCheckbox>Exame</TextoCheckbox>
                </Checkbox>
              </Col>
              <Col>
                <Checkbox>
                  <TextoCheckbox>Consulta</TextoCheckbox>
                </Checkbox>
              </Col>
            </Row>
          </TipoAgendamento>
          <TextAreaDescricao
            placeholder="Adicione uma descrição"
            rows={4}
            name="descricao"
            value={consulta.descricao}
            onChange={preenchendoDadosConsulta}
            style={{
              borderWidth: "1px",
              borderColor: Cores.azul,
              color: "black",
            }}
          />
        </InfoEsquerdaEDireita>
        <InfoEsquerdaEDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <InputData
              placeholder="Selecione uma data"
              size="large"
              name="data"
              onChange={(e) => validacaoData(e.target)}
              value={dataConsulta}
              camposVazios={camposVazios.data}
              erro={erro.data}
            />
            {erro.data && (
              <>
                {erroDataBack ? (
                  <Rotulo>Digite uma data válida.</Rotulo>
                ) : (
                  <Rotulo>Digite uma data no formato xx/xx/xxxx</Rotulo>
                )}
              </>
            )}
            {camposVazios.data && <Rotulo>Digite uma data</Rotulo>}
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select
                value={consulta.tipo}
                style={{
                  width: "100%",
                  color: "black",
                  borderWidth: "1px",
                }}
                paddingTop="8px"
                paddingBottom="8px"
                size="large"
                name="tipo"
                placeholder="Tipo"
                onChange={(e) => {
                  validacaoCampos(e);
                }}
                value={consulta.tipo}
                camposVazios={camposVazios.tipo}
              >
                <option value="" disabled selected>
                  Tipo
                </option>
                {TiposDeConsulta.map((tipo) => (
                  <>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <option key={tipo} value={tipo} color="red">
                        {tipo}
                      </option>
                    )}
                  </>
                ))}
              </Select>
              {camposVazios.tipo && (
                <Rotulo>Selecione um tipo de consulta</Rotulo>
              )}
            </TamanhoInput>
            <TamanhoInput>
              <Select
                value={consulta.id_consultorio}
                id="id_consultorio"
                name="id_consultorio"
                style={{
                  width: "100%",
                  borderWidth: "1px",
                  color: "black",
                }}
                paddingTop="8px"
                paddingBottom="8px"
                size="large"
                onChange={(e) => {
                  validacaoCampos(e);
                }}
                value={consulta.id_consultorio}
                camposVazios={camposVazios.id_consultorio}
              >
                <option value="" disabled selected>
                  Consultório
                </option>
                {consultorios.map((consultorio) => (
                  <>
                    {carregandoConsultorios ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <option
                        key={consultorio.id}
                        value={consultorio.id}
                        color="red"
                      >
                        {consultorio.nome}
                      </option>
                    )}
                  </>
                ))}
              </Select>
              {camposVazios.id_consultorio && (
                <Rotulo>Selecione um consultório</Rotulo>
              )}
            </TamanhoInput>
          </DoisSelect>

          <DoisSelect>
            <TamanhoInput>
              <InputHora
                value={hora}
                type="text"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Horário"
                name="hora"
                onChange={validacaoCampos}
                value={hora}
                camposVazios={camposVazios.hora}
              />
              {camposVazios.hora && <Rotulo>Digite um horário</Rotulo>}
            </TamanhoInput>

            <TamanhoInput>
              <InputDuracao
                value={consulta.duracao_em_minutos}
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={validacaoCampos}
                suffix="min"
                camposVazios={camposVazios.duracao_em_minutos}
                erro={erro.duracao_em_minutos}
              />
              {camposVazios.duracao_em_minutos ? (
                <Rotulo>Digite uma duração</Rotulo>
              ) : (
                <>
                  {erro.duracao_em_minutos ? (
                    <Rotulo>Digite uma duração</Rotulo>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </TamanhoInput>
          </DoisSelect>
          <Checkbox>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>

          <Button
            width="80%"
            height="50px"
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azul}
            color={Cores.azulEscuro}
            fontSize="1.1em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1.1em"
            onClick={() => requisicaoCriarConsulta()}
          >
            {carregandoCadastro ? (
              <Spin indicator={antIcon} />
            ) : (
              <div>Cadastrar novo agendamento</div>
            )}
          </Button>
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
