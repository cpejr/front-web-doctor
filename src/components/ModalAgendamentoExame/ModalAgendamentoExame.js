import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Row, Radio } from "antd";
import _, { set } from "lodash";
import {
  Container,
  Caixa,
  InfoDireita,
  DoisSelect,
  TamanhoInput,
  InputHora,
  SelecioneUmaData,
  TextoSelecioneUmaData,
  TextoDoisSelects,
  Rotulo,
  InputConsultorio,
  InputData,
  ContainerHorario,
  InfoEsquerda,
  TipoAgendamento,
  TextoCaixaSelect,
  Usuario,
  Imagem,
  Nome,
  NomePaciente,
  CaixaLoader,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoExame(props) {
  const [consultorios, setConsultorios] = useState([]);
  const [consultorio, setConsultorio] = useState({});
  const [exames, setExames] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoCadastro, setCarregandoCadastro] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoExames, setCarregandoExames] = useState();
   const [idUsuario, setIdUsuario] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [exame, setExame] = useState({});
  const valoresIniciaisExame = {
    hora: "",
    titulo: "",
    nome: "",
  };
  const [dataExame, setDataExame] = useState("");
  const [hora, setHora] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [hoje, setHoje] = useState("");

  moment.locale("pt-br");
  const errors = {};
  const [referenciaInputNulos, setReferenciaInputNulos] = useState({
    hora: false,
    titulo: false,
    nome: false,
    data: false,
  });

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios({ tipo: "EXAME" });
    let aux = [];
    res.dadosConsultorios.forEach((consultorio) => {
      if (consultorio.tipo === "EXAME") {
        aux.push(consultorio);
      }
    });
    setConsultorios(aux);
    setCarregandoConsultorios(false);
  }

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  async function pegandoExames() {
    setCarregandoExames(true);
    const res = await managerService.GetDadosExames();
    setExames(res);
    setCarregandoExames(false);
  }

  useEffect(() => {
    pegandoExames();
  }, []);

  async function validacaoCampos(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    if (name === "data") {
      setDataExame(value);
      if (hora !== "" && hora !== undefined) {
        validacaoHorario(hora, value);
      }

      return dataExame;
    } else if (name === "nome") {
      const consultorioSelecionado = consultorios.find(
        (consultorioAtual) => consultorioAtual.id === value
      );
      setConsultorio(consultorioSelecionado);
      setExame({ ...exame, id_consultorio: value });
    } else {
      setExame({ ...exame, id_exame: value });
      return exame;
    }
  }

  function setandoDiaAtual() {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();

    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }

    setHoje(ano + "-" + mes + "-" + dia);
  }

  function setandoDataMinima() {
    document.getElementById("data").setAttribute("min", hoje);
  }

  useEffect(() => {
    setandoDiaAtual();
  }, []);


  useEffect(() => {
    setandoDataMinima();
  }, [hoje]);

  function setandoHoraAtual() {
    let horario = new Date();
    let horaAtual = horario.getHours();
    let minutos = horario.getMinutes();

    if (horaAtual < 10) {
      horaAtual = "0" + horaAtual;
    }
    if (minutos < 10) {
      minutos = "0" + minutos;
    }

    const horarioAtual = horaAtual + ":" + minutos;
    return horarioAtual;
  }

  function validacaoHorario(horarioExame, dataExame) {
    const horaAtual = setandoHoraAtual();

    if (horarioExame) {
      setCamposVazios({ ...camposVazios, hora: false });
    } else {
      setCamposVazios({ ...camposVazios, hora: true });
    }

    if (hoje === dataExame) {
      if (horarioExame <= horaAtual) {
        setErro({ ...erro, hora: true });
      } else {
        setErro({ ...erro, hora: false });
      }
    } else {
      setErro({ ...erro, hora: false });
    }

    setHora(horarioExame);
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${dataExame} ${hora}:00`;
      exame.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }

  async function requisicaoCriarExame() {
    if (props.usuario) {
      exame.id_usuario = props.usuario.id_usuario;
    } else {
      exame.id_usuario = idUsuario;
    }
    if (!dataExame) errors.data = true;
    if (!hora) errors.hora = true;
    if (!consultorio.nome) errors.nome = true;
    if(!exame.titulo) errors.titulo = true;

    setCamposVazios({ ...camposVazios, ...errors });
    if (dataExame === "" || hora === "") {
      toast.warn("Preencha todos os campos");
    } else {
      if (erro.hora) {
        toast.warn("Preencha todos os campos corretamente");
      } else {
        if (_.isEqual(camposVazios, referenciaInputNulos)) {
          setCarregandoCadastro(true);
          formatacaoDataHora();
          exame.id_usuario = idUsuario;
          await managerService.CriandoExame(exame);
          setCarregandoCadastro(false);
          await sleep(1500);
          props.fechandoModal();
          setExame(valoresIniciaisExame);
          setDataExame("");
          setHora("");
        } else {
          setCarregandoCadastro(true);
          toast.warn("Preencha todos os campos corretamente");
          setCarregandoCadastro(false);
        }
      }
    }
  }

  return (
      <Caixa>
        <InfoEsquerda>
          {props.abertoPeloUsuario === true ? (
            <Usuario>
              <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
              {carregando ? (
                <CaixaLoader>
                  <Spin indicator={antIcon} style={{ color: Cores.azul }} />
                </CaixaLoader>
              ) : (
                <Nome>{props.usuario.nome}</Nome>
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
                    setIdUsuario(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Paciente
                  </option>
                  {props.usuarios.map((usuario) => (
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
            <TextoCaixaSelect>
              Selecione o Tipo de Agendamento:
            </TextoCaixaSelect>
            <Row gutter={60} justify={"space-around"}>
              <Radio.Group
                defaultValue="exame"
                bordered={false}
                onChange={(e) => props.trocarTipo(e.target.value)}
              >
                <Radio value="exame">Exame</Radio>
                <Radio value="consulta">Consulta</Radio>
              </Radio.Group>
            </Row>
          </TipoAgendamento>
        </InfoEsquerda>
        <InfoDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <InputData
              placeholder="Selecione uma data"
              size="large"
              type="date"
              paddingTop="8px"
              paddingBottom="8px"
              onKeyDown={(e) => e.preventDefault()}
              name="data"
              onChange={(e) => validacaoCampos(e)}
              value={dataExame}
              camposVazios={camposVazios.data}
              id="data"
            />
            {camposVazios.data && <Rotulo>Selecione uma data</Rotulo>}
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <TextoSelecioneUmaData>Selecione um tipo:</TextoSelecioneUmaData>
              <Tooltip
                placement="topLeft"
                title={exame?.titulo}
                color={Cores.azul}
              >
                <Select
                  value={exame?.id}
                  style={{
                    width: "100%",
                    color: "black",
                    borderColor: "black",
                    borderWidth: "1px",
                  }}
                  paddingTop="8px"
                  paddingBottom="8px"
                  size="large"
                  name="titulo"
                  id="titulo"
                  placeholder="Tipo"
                  onChange={(e) => {
                    validacaoCampos(e);
                  }}
                  camposVazios={camposVazios.titulo}
                >
                  <option value="" disabled selected>
                    {exame?.titulo}
                    Tipo
                  </option>
                  {exames?.map((exame) => (
                    <>
                      {carregandoExames ? (
                        <Spin indicator={antIcon} />
                      ) : (
                        <option key={exame.id} value={exame.id} color="red">
                          {exame.titulo}
                        </option>
                      )}
                    </>
                  ))}
                </Select>
              </Tooltip>
              {camposVazios.titulo && 
                <Rotulo>Selecione um tipo de exame</Rotulo>
              }
            </TamanhoInput>
            <InputConsultorio>
              <TextoDoisSelects>Selecione um consultório:</TextoDoisSelects>
              <Tooltip
                placement="topLeft"
                title={consultorio?.nome}
                color={Cores.azul}
              >
                <Select
                  value={consultorio?.id}
                  id="nome"
                  name="nome"
                  style={{
                    width: "100%",
                    borderWidth: "1px",
                    borderColor: "black",
                    color: "black",
                  }}
                  paddingTop="8px"
                  paddingBottom="8px"
                  marginBottom="12%"
                  size="large"
                  onChange={(e) => {
                    validacaoCampos(e);
                  }}
                  camposVazios={camposVazios.nome}
                >
                  <option value="" disabled selected>
                    {consultorio.nome}
                    Consultório
                  </option>
                  {consultorios?.map((consultorio) => (
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
              </Tooltip>
              {camposVazios.nome && <Rotulo>Selecione um consultório </Rotulo>}
            </InputConsultorio>
          </DoisSelect>

          <DoisSelect>
            <ContainerHorario>
              <TextoDoisSelects>Selecione um horário:</TextoDoisSelects>
              <InputHora
                value={hora}
                type="time"
                onKeyDown={(e) => e.preventDefault()}
                placeholder="Horário"
                name="hora"
                id="hora"
                onChange={(e) => validacaoHorario(e.target.value, dataExame)}
                camposVazios={camposVazios.hora}
                erro={erro.hora}
              />
              {erro.hora && <Rotulo>Digite um horário válido</Rotulo>}
              {camposVazios.hora && <Rotulo>Digite um horário</Rotulo>}
            </ContainerHorario>
          </DoisSelect>
          <Button
            width="100%"
            height="50px"
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azul}
            color={Cores.azulEscuro}
            fontSize="1.1em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1.1em"
            onClick={() => requisicaoCriarExame()}
          >
            {carregandoCadastro ? (
              <Spin indicator={antIcon} />
            ) : (
              <div>Cadastrar novo agendamento</div>
            )}
          </Button>
        </InfoDireita>
      </Caixa>
  );
}

export default ModalAgendamentoExame;
