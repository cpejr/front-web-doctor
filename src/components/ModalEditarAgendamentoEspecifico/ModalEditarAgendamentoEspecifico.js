import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Input } from "antd";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
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
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Cores } from "../../variaveis";
import moment from "moment";

function ModalEditarAgendamentoEspecifico(props) {
  const { Option } = Select
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);

  const [carregando, setCarregando] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [consulta, setConsulta] = useState({});

  const [consultorioPorId, setConsultorioPorId] = useState();
  
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  moment.locale("pt-br");

  async function pegandoDadosUsuario() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  async function setandoNomeConsultorioPorId(){
    setCarregando(true);
    const resposta = await managerService.GetConsultorioPorId(consulta.id_consultorio);
    setConsultorioPorId(resposta.nome);
    setCarregando(false);
  }

  function setandoDataEHora(){
    setCarregando(true);
    let dataString = String(consulta.data_hora);
    let dataFormatada = dataString.slice(0, 10);
    let horaString = String(consulta.data_hora);
    let horaFormatada = horaString.slice(14, 19);
    setData(dataFormatada);
    setHora(horaFormatada);
    setCarregando(false);
  }

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true)
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false);
  }


  async function setandoValoresConsulta(){
    setCarregando(true);
    setConsulta(props.consulta);
    setCarregando(false);

  }


  useEffect(() => {
    pegandoDadosUsuario();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    pegandoConsultorios();
  }, []);

   useEffect(() => {
    setandoValoresConsulta();
  }, [props]);


  useEffect(() => {
    setandoDataEHora();
  }, [consulta]);

   useEffect(() => {
    setandoNomeConsultorioPorId();
  }, [consulta]); 
  

  async function requisicaoAtualizarConsulta() {
    setCarregando(true);
    consulta.id_usuario = usuario.id;
    console.log(consulta.id_consultorio);
    console.log(consultorioPorId);
    formatacaoDataHora(); 
    await managerService.UpdateConsulta(consulta.id, consulta); 
    setCarregando(false);
  }  

  function formatacaoDataHora() {
    try {
      const dataHora = `${data} ${hora}:00`;
      consulta.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }

  function preenchendoDadosConsulta(e) {
    if (e.target.name === "hora") {
      setHora(e.target.value);
      return hora;
    } else if (e.target.name === "data") {
      setData(e.target.value)
      return data;
    } else {
      setConsulta({ ...consulta, [e.target.name]: e.target.value });
      return consulta;
    }
  }  

  return (
    <Container>
      <Caixa>
        <InfoEsquerda>
          <Usuario>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            {carregando ? (
              <Spin indicator={antIcon} />
            ) : (
              <Nome>{usuario.nome}</Nome>
            )}
          </Usuario>
          <TextAreaDescricao
            placeholder="Adicione uma descrição"
            rows={4}
            name="descricao"
            value={consulta.descricao}
            onChange={preenchendoDadosConsulta}
            style={{
              borderWidth: "1px",
              borderColor: "black",
              color: "black",
            }}
          />
        </InfoEsquerda>
        <InfoDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <Input
              placeholder="Selecione uma data"
              value={data} 
              type="date"
              size="large"
              name="data"
              onChange={(e) => {
                preenchendoDadosConsulta(e);
              }}
              style={{
                borderWidth: "1px",
                borderColor: "black",
                color: "black",
              }}
            ></Input>
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select
                style={{
                  width: "100%",
                  color:"black",
                  borderColor: "black",
                  borderWidth: "1px",
                }}
                size="large"
                name="tipo"
                placeholder="Tipo"
                onChange={(e) => {
                    preenchendoDadosConsulta(e);
                  }}
              >
                <option value="" disabled selected >{consulta.tipo}</option>
                <option value="1">Tipo 1</option>
                <option value="2">Tipo 2</option>
                <option value="3">Tipo 3</option>
              </Select>
            </TamanhoInput>
            <TamanhoInput>
              <Select
                id="id_consultorio"
                name="id_consultorio"
                style={{
                  width: "100%",
                  borderColor: "black",
                  borderWidth: "1px",
                  color:"black"
                }}
                size="large"
                onChange={(e) => {
                  setConsultorioPorId(e.target.value);
                }}
              >
                <option value="" disabled selected >
                    {consultorioPorId} 
                  </option>
                {consultorios.map((consultorio) => (
                  <>
                {carregandoConsultorios ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <option key={consultorio.id} value={consultorio.id} color="red">
                    {consultorio.nome}
                  </option>
                )}
                </>
                ))}
                   
              </Select>
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
                onChange={preenchendoDadosConsulta}
                style={{color:"black"}}
              />
            </TamanhoInput>

            <TamanhoInput>
              <InputDuracao
                value={consulta.duracao_em_minutos}
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={preenchendoDadosConsulta}
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
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azul}
            color={Cores.azulEscuro}
            fontSize="1.1em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1.1em"
            onClick={() => requisicaoAtualizarConsulta()}
          >
            {carregando ? (
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

export default ModalEditarAgendamentoEspecifico;


