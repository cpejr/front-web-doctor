import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _, { set } from "lodash";
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
  ContainerDuracaoConsulta,
  SelecioneUmaData,
  TextoSelecioneUmaData,
  TextAreaDescricao,
  TextoDoisSelects,
  Rotulo,
  InputConsultorio,
  InputData,
  NomePaciente,
  ContainerHorario,
  InfoEsquerda,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { TiposDeConsulta } from "../listaTiposDeConsultas";
import { apenasNumeros, data, dataAgendamentoBack } from "../../utils/masks";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoEspecifico(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [nomeConsultorioPorId, setNomeConsultorioPorId] = useState();
  const [carregandoCadastro, setCarregandoCadastro] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [dataConsulta, setDataConsulta] = useState("");
  const [hora, setHora] = useState("");
  const [erro, setErro] = useState(false);
  const [testarCampos, setTestarCampos] = useState();
  const [hoje, setHoje] = useState("");

  moment.locale("pt-br");

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

  const [camposVazios, setCamposVazios] = useState({
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  });

  const [camposPreenchidos, setCamposPreenchidos] = useState({
    data: "",
    hora: "",
    duracao_em_minutos: "",
    id_consultorio: "",
    tipo: "",
  });


  const [referenciaInputNulos, setReferenciaInputNulos] = useState({
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  });


  async function pegandoPacientes() {
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        setUsuarios((usuarios) => [...usuarios, usuario]);
      }
    });
  }

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false);
  }

  async function pegandoDadosUsuario() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      consulta.id_consultorio
    );
    setNomeConsultorioPorId(resposta.nome);
  }

  function verificandoIdUsuario() {
    if (props.abertoPeloUsuario === false) {
      setReferenciaInputNulos({ ...referenciaInputNulos, id_usuario: false });
    } else {
      setConsulta({ ...consulta, id_usuario: usuario.id });
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


  useEffect(() => {
    pegandoPacientes();
    setandoDiaAtual();
    pegandoConsultorios();
  }, []);

  useEffect(() => {
    setandoNomeConsultorioPorId();
  },);


  useEffect(() => {
    verificandoIdUsuario();
  }, [usuario]);


  useEffect(() => {
    pegandoDadosUsuario();
  }, [props]);

  useEffect(() => {
    setandoDataMinima();
  }, [hoje]);


  function setandoCamposNulos(){
    Object.entries(camposPreenchidos).forEach(([key, value]) => {
      if(!value) return setCamposVazios(camposVazios => ({...camposVazios, [key]: true}))
      setCamposVazios(camposVazios => ({...camposVazios, [key]: false}))
    })
  }



  async function preenchendoCampos(e) {
    const { value, name } = e.target;

    if (name === "data") {
      camposPreenchidos.data = value;
      setDataConsulta(value);
      if (hora !== "" && hora !== undefined) {
        validacaoHorario(hora, value);
      }

    } else if (name === "duracao_em_minutos") {
      camposPreenchidos[name] = apenasNumeros(value);
      setConsulta({
        ...consulta,
        [name]: apenasNumeros(value),
      });
    } else {
      camposPreenchidos[name] = value;
      setConsulta({ ...consulta, [name]: value });
    }

    
      if (camposPreenchidos[name] === ""  ) { 
            camposVazios[name]= true;  
      }
      else{ 
            camposVazios[name]=false;
      }

  }

  async function validacaoHorario(horarioConsulta, dataConsulta) {
    const horaAtual = setandoHoraAtual();


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
    camposPreenchidos.hora = horarioConsulta;

    if (camposPreenchidos.hora === ""  ) { 
      camposVazios.hora = true;  
    }
    else{ 
      camposVazios.hora = false;
    }
    
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
     
    setandoCamposNulos();


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
                    preenchendoCampos(e);
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
            onChange={(e) => preenchendoCampos(e)}
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
              onChange={(e) => preenchendoCampos(e)}
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
                  preenchendoCampos(e);
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
                  preenchendoCampos(e);
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
                onChange={preenchendoCampos}
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

export default ModalAgendamentoEspecifico;
