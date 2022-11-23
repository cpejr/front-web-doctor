import React, { useEffect, useState } from "react";
import { Checkbox, Tooltip} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _, { set } from "lodash";
import {
  Container,
  Caixa,
  InfoEsquerdaEDireita,
  TextoCheckbox,
  DoisSelect,
  TamanhoInput,
  InputHora,
  InputDuracao,
  ContainerDuracaoConsulta,
  SelecioneUmaData,
  TextoSelecioneUmaData,
  TextAreaDescricao,
  TextoDoisSelects,
  Rotulo,
  InputConsultorio,
  InputData,
  ContainerHorario,
  InfoEsquerda,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import { TiposDeConsulta } from "../listaTiposDeConsultas";
import { apenasNumeros, data, dataAgendamentoBack } from "../../utils/masks";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoConsulta(props) {
  const [usuario, setUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [nomeConsultorioPorId, setNomeConsultorioPorId] = useState();
  const [carregandoCadastro, setCarregandoCadastro] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [tipoRadio, setTipoRadio] = useState("");
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
  const valoresIniciaisConsulta = {
    data_hora: "",
    duracao_em_minutos: "",
    descricao: "",
    avaliacao: "",
    id_usuario: "",
    id_consultorio: "",
    tipo: "",
  };
  const [dataConsulta, setDataConsulta] = useState("");
  const [hora, setHora] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [hoje, setHoje] = useState("");
  
  

  moment.locale("pt-br");

  async function pegandoPacientes() {
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        setUsuarios((usuarios) => [...usuarios, usuario]);
      }
    });
  }

  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      consulta.id_consultorio
    );
    setNomeConsultorioPorId(resposta.nome);
  }

  useEffect(() => {
    pegandoPacientes();
  }, []);

  useEffect(() => {
    setandoNomeConsultorioPorId();
  },);

  

  const errors = {};
  const [referenciaInputNulos, setReferenciaInputNulos] = useState({
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  });

  function verificandoIdUsuario() {
    if (props.abertoPeloUsuario === false) {
      setReferenciaInputNulos({ ...referenciaInputNulos, id_usuario: false });
    } else {
      setConsulta({ ...consulta, id_usuario: usuario.id });
    }
  }


  useEffect(() => {
    verificandoIdUsuario();
  }, [usuario]);

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false);
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

    if (name !== "descricao") {
      if (value) {
        setCamposVazios({ ...camposVazios, [name]: false });
      } else {
        setCamposVazios({ ...camposVazios, [name]: true });
      }
    }
    if (consulta.duracao_em_minutos === "") {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    if (e.target.name === "data") {
      setDataConsulta(e.target.value);
      if (hora !== "" && hora !== undefined) {
        validacaoHorario(hora, e.target.value);
      }

      return dataConsulta;
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

  function validacaoHorario(horarioConsulta, dataConsulta) {
    const horaAtual = setandoHoraAtual();

    if (horarioConsulta) {
      setCamposVazios({ ...camposVazios, hora: false });
    } else {
      setCamposVazios({ ...camposVazios, hora: true });
    }

    if (hoje === dataConsulta) {
      if (horarioConsulta <= horaAtual) {
        setErro({ ...erro, hora: true });
      } else {
        setErro({ ...erro, hora: false });
      }
    } else {
      setErro({ ...erro, hora: false });
    }

    setHora(horarioConsulta);
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${dataConsulta} ${hora}:00`;
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
    if (!consulta.id_usuario) errors.id_usuario = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (
      consulta.duracao_em_minutos === "" ||
      dataConsulta === "" ||
      hora === ""
    ) {
      toast.warn("Preencha todos os campos");
    } else {
      if (erro.hora) {
        toast.warn("Preencha todos os campos corretamente");
      } else {
        if (_.isEqual(camposVazios, referenciaInputNulos)) {
          setCarregandoCadastro(true);
          formatacaoDataHora();
          await managerService.CriandoConsulta(consulta);
          setCarregandoCadastro(false);
          await sleep(1500);
          props.fechandoModal();
          setConsulta(valoresIniciaisConsulta);
          setDataConsulta("");
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
    <Container>
      <Caixa>
        <InfoEsquerda>
                <TextAreaDescricao
                border={tipoRadio}
                placeholder="Adicione uma descrição"
                rows={4}
                name="descricao"
                value={consulta.descricao}
                onChange={(e) => validacaoCampos(e)}
                style={{
                  borderWidth: "1px",
                  borderColor: Cores.azul,
                  color: "black",
                }}
              />
        </InfoEsquerda>
        <InfoEsquerdaEDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <InputData
              placeholder="Selecione uma data"
              size="large"
              type="date"
              onKeyDown={(e) => e.preventDefault()}
              name="data"
              onChange={(e) => validacaoCampos(e)}
              value={dataConsulta}
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
                title={consulta.tipo} 
                color = {Cores.azul}>
              <Select
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
              </Select></Tooltip>
              {camposVazios.tipo && (
                <Rotulo>Selecione um tipo de consulta</Rotulo>
              )}
            </TamanhoInput>
            <InputConsultorio>
            <TextoDoisSelects>Selecione um consultório:</TextoDoisSelects>
            <Tooltip 
                placement="topLeft" 
                title =  {nomeConsultorioPorId}
                color = {Cores.azul}>
              <Select
                value={consulta.id_consultorio}
                id="id_consultorio"
                name="id_consultorio"
                style={{
                  width: "100%",
                  borderWidth: "1px",
                  borderColor: "black",
                  color: "black",
                }}
                paddingTop="8px"
                paddingBottom="8px"
                size="large"
                onChange={(e) => {
                  validacaoCampos(e);
                }}
                camposVazios={camposVazios.id_consultorio}
              >
                <option value="" disabled selected>
                  {nomeConsultorioPorId}
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
              </Select></Tooltip>
              {camposVazios.id_consultorio && (
                <Rotulo>Selecione um consultório</Rotulo>
              )}
              
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
                onChange={(e) => validacaoHorario(e.target.value, dataConsulta)}
                camposVazios={camposVazios.hora}
                erro={erro.hora}
              />
              {erro.hora && <Rotulo>Digite um horário válido</Rotulo>}
              {camposVazios.hora && <Rotulo>Digite um horário</Rotulo>}
            </ContainerHorario>
                <ContainerDuracaoConsulta>
            <TextoDoisSelects>Selecione uma duração:</TextoDoisSelects>
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
            </ContainerDuracaoConsulta>    
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

export default ModalAgendamentoConsulta;