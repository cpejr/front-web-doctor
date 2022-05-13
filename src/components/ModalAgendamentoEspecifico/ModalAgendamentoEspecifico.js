import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Input } from "antd";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
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
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from 'moment'


function ModalAgendamentoEspecifico(props) {

  const { TextArea } = Input;
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [ consulta, setConsulta ] = useState({
    data_hora:"",
    duracao_em_minutos:"",
    descricao:"",
    avaliacao:"",
    id_usuario:"",
    id_consultorio:"03d4ccd8-1518-417a-8c36-80eaecbbc884"
  });
  const [ data, setData ] = useState("");
  const [ hora, setHora ] = useState("");
  const [ duracaoEmMinutos, setDuracaoEmMinutos ] = useState("");
  // const [selectValue, setSelectValue] = useState("");
  moment.locale('pt-br');

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);

  }

  async function pegandoConsultorios(){
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    console.log(res.dadosConsultorios)
  }

  useEffect(() => {
    pegandoDados();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    pegandoConsultorios()
  }, [])

  async function requisicaoCriarConsulta() {
    console.log(consulta)
    await managerService.CriandoColsulta(consulta);
  }

  function formatacaoData() {
    try {
      const dataFormatada = new Date(data)
      formatacaoDataHora(dataFormatada.toLocaleDateString())
      // console.log(`${data} ${hora}`)
    } catch {
      alert("Data inválida.");
    }
  }

  function formatacaoDataHora(dataFormatada) {
    try {
      const dataHora = `${dataFormatada} ${hora}:00`
      consulta.data_hora = dataHora
    } catch {
      alert("DataHora inválida.");
    }
  }

  function formatacaoDuracao() {
    try {
      const duracaoFormatada = moment.duration(moment(`${duracaoEmMinutos}:00`, 'HH:mm:ss').format("HH:mm")).asMinutes()
      consulta.duracao_em_minutos = duracaoFormatada
    } catch {
      alert("DataHora inválida.");
    }
  }

  function testagem () {
    console.log(consulta)
  }

  function testagemDois () {
    formatacaoData()
    formatacaoDuracao()
    consulta.id_usuario = usuario.id
  }

  function preenchendoDadosInput(e) {
    if (e.target.name === "hora") {
      setHora(e.target.value)
      return hora
    } else
    if (e.target.name === "data") {
      setData(e.target.value)
      return data
    } if (e.target.name === "duracao_em_minutos") {
      setDuracaoEmMinutos(e.target.value)
      return duracaoEmMinutos
  } else {
    setConsulta({ ...consulta, [e.target.name]: e.target.value });
      return consulta
  }
  
}

  function preenchendoDadosConsulta(value, e) {
    console.log(e)
      
  }

  return (
    <Container>
      <Caixa>
        <InfoEsquerdaEDireita>
          <Usuario>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            {carregando ? (
              <Spin indicator={antIcon} />
            ) : (
              <Nome>{usuario.nome}</Nome>
            )}
          </Usuario>
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
          <TextArea placeholder="Adicione uma descrição" rows={4}></TextArea>
        </InfoEsquerdaEDireita>
        <InfoEsquerdaEDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <Input
              placeholder="Selecione uma data"
              type="date"
              size="large"
              name="data"
              onChange={(e) => {preenchendoDadosInput(e)}}
            ></Input>
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select style={{ width: "100%" }} size="large" placeholder="Tipo">
                <option value="1">Tipo 1</option>
                <option value="2">Tipo 2</option>
                <option value="3">Tipo 3</option>
              </Select>
            </TamanhoInput>
            <TamanhoInput>
               <Select
                id="id_consultorio"
                name="id_consultorio"
                style={{ width: "100%" }}
                size="large"
                placeholder="Consultório"
                onChange={(e) => {preenchendoDadosInput(e)}}
              >
                {consultorios.map((consultorio) => (
                  <option key={consultorio.id} value={consultorio.id}>
                    {consultorio.nome}
                  </option>
                ))}
              </Select> 
            </TamanhoInput>
          </DoisSelect>
          
          <button onClick={testagemDois}>
            TESTAGEM 2
          </button>

          <button onClick={testagem}>
            TESTAGEM
          </button>
          <DoisSelect>

            <TamanhoInput>
              <InputHora
                type="text"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Horário"
                name="hora"
                onChange={preenchendoDadosInput}
              />
            </TamanhoInput>

            <TamanhoInput>
              <InputDuracao
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={preenchendoDadosInput}
                suffix="min"
              />
            </TamanhoInput>
          </DoisSelect>
          <Checkbox>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>
          <Button
            width="80%"
            height="50px"
            backgroundColor="green"
            // backgroundColor="#A7ADE8" -estatico
            borderColor="#151B57"
            color="#0A0E3C"
            fontSize="1.1em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1.1em"
            onClick={() => requisicaoCriarConsulta()}
          >
            Cadastrar novo agendamento
          </Button>
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
