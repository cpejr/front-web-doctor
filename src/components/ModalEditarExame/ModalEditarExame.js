import React, { useEffect, useState } from "react";
import { Checkbox, Input, Tooltip, Row, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import {
  Container,
  Caixa,
  InfoEsquerda,
  InfoDireita,
  Usuario,
  Imagem,
  Nome,
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
  ContainerConsultorio,
  TextoDoisSelects,
  ContainerNome,
  TextoTipoAgendamento,
  TipoAgendamento,
  ContainerHorario,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import { apenasNumeros } from "../../utils/masks";
import * as managerService from "../../services/ManagerService/managerService";
import { ContainerDuracaoConsulta } from "../ModalAgendamentoEspecifico/Styles";
import { TiposDeExame } from "../listaTiposDeExames";

function ModalEditarExame(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoUpdate, setCarregandoUpdate] = useState();
  const [exame, setExame] = useState({});
  const [novoExame, setNovoExame] = useState({});
  const [consultorioPorId, setConsultorioPorId] = useState();
  const [data, setData] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [titulo, setTitulo] = useState("");
  const [hora, setHora] = useState("");
  const [hoje, setHoje] = useState("");
  const [camposVazios, setCamposVazios] = useState({
    duracao_em_minutos: false,
    hora: false,
    data: false,
  });
  const [editado, setEditado] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  moment.locale("pt-br");

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  useEffect(() => {
    setandoNomeConsultorioPorId();
    setandoDataEHora();
  }, [exame]);

  useEffect(() => {
    setEditado(false);
    pegandoDadosUsuario();
    setandoValoresExame();
  }, [props]);

  useEffect(() => {
    setandoDiaAtual();
  }, []);

  useEffect(() => {
    setandoDataMinima();
  }, [hoje]);

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    let aux = [];
    res.dadosConsultorios.forEach((consultorio) => {
      if (consultorio.tipo === "EXAME") {
        aux.push(consultorio);
      }
    });
    setConsultorios(aux);
    setCarregandoConsultorios(false);
  }

  async function pegandoDadosUsuario() {
    setCarregando(true);
    setandoCamposVazios();
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  async function setandoValoresExame() {
    setCarregando(true);
    let aux = {
      id: props.exame.id,
      titulo: props.exame.titulo,
      id_consultorio: props.exame.id_consultorio,
      id_exame: props.exame.id_exame,
      id_usuario: props.exame.id_usuario,
      data_hora: props.exame.data_hora,
    };
    setTitulo(props.exame.titulo);
    setExame(aux);
    setCarregando(false);
  }

  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      exame.id_consultorio
    );
    setConsultorioPorId(resposta.nome);
  }

  function setandoDataEHora() {
    let dataString = String(exame.data_hora);
    let dataFormatada = dataString.slice(0, 10);
    setData(dataFormatada);
    const aux = new Date(exame.data_hora);
    let horas = aux.getHours();
    if (horas < 10) {
      horas = `0${horas}`;
    }
    let minutos = aux.getMinutes();
    if (minutos < 10) {
      minutos = `0${minutos}`;
    }
    const tempo_formatado = `${horas}:${minutos}`;
    setHora(tempo_formatado);
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

  function setandoCamposVazios() {
    setCamposVazios({
      duracao_em_minutos: false,
      data: false,
      hora: false,
    });
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${data} ${hora}:00`;
      exame.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }
  async function requisicaoExames() {
    let aux;
    const exames = await managerService.GetDadosExames();
    exames.forEach((exame) => {
      if (exame.titulo === titulo) {
        aux = exame.id;
      }
    });
    exame.id_exame=aux
  }

  async function requisicaoAtualizarExame() {
    await requisicaoExames();
    if (
      camposVazios.duracao_em_minutos === true ||
      camposVazios.hora === true ||
      camposVazios.data === true
    ) {
      setCarregandoUpdate(true);
      toast.warn("Preencha todos os campos corretamente");
      setCarregandoUpdate(false);
      return;
    } else if (editado === false) {
      setCarregandoUpdate(true);
      toast.warn("Edite algum campo");
      setCarregandoUpdate(false);
      return;
    } else {
      setCarregandoUpdate(true);
      formatacaoDataHora();
      delete exame.titulo;
      await managerService.UpdateExame(exame.id, exame);
      console.log("🚀 ~ file: ModalEditarExame.js:219 ~ requisicaoAtualizarExame ~ exame", exame)
      sleep(3000);
      setCarregandoUpdate(false);
      props.fechandoModal();
      return;
    }
  }

  function preenchendoDadosExame(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    if (e.target.name === "hora") {
      setHora(e.target.value);
      setEditado(true);
      return hora;
    } else if (e.target.name === "data") {
      setData(e.target.value);
      setEditado(true);
      return data;
    } else {
      setExame({ ...exame, [name]: value });
      setEditado(true);
      return exame;
    }
  }

  return (
    <Container>
      <Caixa>
        <InfoDireita>
        <Usuario>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            {carregando ? (
              <Spin indicator={antIcon} />
            ) : (
              <Nome>{usuario.nome}</Nome>
            )}
          </Usuario>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <InputData
              placeholder="Selecione uma data"
              value={data}
              id="data"
              type="date"
              onKeyDown={(e) => e.preventDefault()}
              size="large"
              name="data"
              camposVazios={camposVazios.data}
              onChange={(e) => {
                preenchendoDadosExame(e);
              }}
            ></InputData>
            {camposVazios.data ? <Rotulo>Escolha uma data</Rotulo> : <></>}
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <TextoSelecioneUmaData>Selecione um tipo:</TextoSelecioneUmaData>
              <Tooltip
                placement="topLeft"
                title={exame.titulo}
                color={Cores.azul}
              >
                <Select
                  style={{
                    width: "100%",
                    color: "black",
                    borderColor: "black",
                    borderWidth: "1px",
                  }}
                  paddingTop="8px"
                  paddingBottom="8px"
                  size="large"
                  value={exame.titulo}
                  name="titulo"
                  placeholder="Tipo"
                  onChange={(e) => {
                    setTitulo(e.target.value);
                    preenchendoDadosExame(e);
                  }}
                >
                  {TiposDeExame.map((tipo) => (
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
              </Tooltip>
            </TamanhoInput>
            <ContainerConsultorio>
              <TextoDoisSelects>Selecione um consultório:</TextoDoisSelects>
              <Tooltip
                placement="topLeft"
                title={consultorioPorId}
                color={Cores.azul}
              >
                <Select
                  id="id_consultorio"
                  name="id_consultorio"
                  style={{
                    width: "100%",
                    borderColor: "black",
                    borderWidth: "1px",
                    color: "black",
                  }}
                  paddingTop="8px"
                  paddingBottom="8px"
                  value={exame.id_consultorio}
                  size="large"
                  onChange={(e) => {
                    preenchendoDadosExame(e);
                  }}
                >
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
              </Tooltip>
            </ContainerConsultorio>
          </DoisSelect>

          <DoisSelect>
            <ContainerHorario>
              <TextoDoisSelects>Selecione um horário:</TextoDoisSelects>
              <InputHora
                value={hora}
                type="text"
                onKeyDown={(e) => e.preventDefault()}
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Horário"
                name="hora"
                onChange={preenchendoDadosExame}
                style={{ color: "black" }}
                camposVazios={camposVazios.hora}
              />
              {camposVazios.hora ? <Rotulo>Digite um horário</Rotulo> : <></>}
            </ContainerHorario>
          </DoisSelect>

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
            onClick={() => requisicaoAtualizarExame()}
          >
            {carregandoUpdate ? (
              <Spin indicator={antIcon} />
            ) : (
              <div>Editar Agendamento</div>
            )}
          </Button>
        </InfoDireita>
      </Caixa>
    </Container>
  );
}

export default ModalEditarExame;
