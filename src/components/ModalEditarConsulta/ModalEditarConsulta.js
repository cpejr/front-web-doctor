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
  ContainerDuracaoConsulta,
  ContainerNotificar,
  ContainerBotaoCheckbox,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import { apenasNumeros } from "../../utils/masks";
import * as managerService from "../../services/ManagerService/managerService";
import { TiposDeConsulta } from "../listaTiposDeConsultas";

function ModalEditarConsulta(props) {
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoUpdate, setCarregandoUpdate] = useState();
  const [consulta, setConsulta] = useState({});
  const [consultorioPorId, setConsultorioPorId] = useState();
  const [data, setData] = useState("");
  const [tipoRadio, setTipoRadio] = useState("");
  const [hora, setHora] = useState("");
  const [hoje, setHoje] = useState("");
  const [clicadoCheckbox, setclicadoCheckbox] = useState(false);
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
  }, [consulta]);

  useEffect(() => {
    setandoDataEHora();
  }, [consulta.dataHora]);

  useEffect(() => {
    setEditado(false);
    pegandoDadosUsuario();
    setandoValoresConsulta();
  }, [props]);

  useEffect(() => {
    setandoDiaAtual();
  }, []);

  useEffect(() => {
    setandoDataMinima();
  }, [hoje]);

  const handleChange = () =>{
    setclicadoCheckbox(!clicadoCheckbox)
  }

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    let aux = [];
    res.dadosConsultorios.forEach((consultorio) => {
      if (consultorio.tipo === "CONSULTA") {
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

  async function setandoValoresConsulta() {
    setCarregando(true);
    setConsulta(props.consulta);
    setCarregando(false);
  }

  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      consulta.id_consultorio
    );
    setConsultorioPorId(resposta.nome);
  }

  function setandoDataEHora() {
    let dataString = String(consulta.data_hora);
    let dataFormatada = dataString.slice(0, 10);
    setData(dataFormatada);
    const aux = new Date(consulta.data_hora);
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

  function inputsFiltrados(value) {
    setTipoRadio(value);
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${data} ${hora}:00`;
      consulta.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }

  async function requisicaoAtualizarConsulta() {
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
      consulta.id_usuario = usuario.id;
      if(clicadoCheckbox === true){
        
        let msg = "Sua consulta teve seus dados alterados";
        const Token =
          await managerService.TokenById(consulta.id_usuario);
          if(Token.length === 0){
            toast.error('Nenhum celular cadastrado a esse paciente');
          }else{
            toast.success('Notificação encaminhada para o paciente.');
          }
          for(var i = 0; i <= Token.length - 1; i++){
            const Message = {
              to: Token[i].token_dispositivo.replace("expo/", ''),
              sound: 'default',
              title: 'Doctor App', 
              body: msg,
              
            };
            fetch('https://exp.host/--/api/v2/push/send',{
                method: 'POST',
                body: JSON.stringify(Message),
             }
            );
            
      }}
      formatacaoDataHora();
      await managerService.UpdateConsulta(consulta.id, consulta);
      setCarregandoUpdate(false);
      props.fechandoModal();
      return;
    }
  }

  function preenchendoDadosConsulta(e) {
    const { value, name } = e.target;

    if (value !== consulta.descricao) {
      if (value) {
        setCamposVazios({ ...camposVazios, [name]: false });
      } else {
        setCamposVazios({ ...camposVazios, [name]: true });
      }
    }

    if (e.target.name === "hora") {
      setHora(e.target.value);
      setEditado(true);
      return hora;
    } else if (e.target.name === "data") {
      setData(e.target.value);
      setEditado(true);
      return data;
    } else if (e.target.name === "duracao_em_minutos") {
      setConsulta({
        ...consulta,
        [e.target.name]: apenasNumeros(e.target.value),
      });
      setEditado(true);
      return consulta;
    } else {
      setConsulta({ ...consulta, [name]: value });
      setEditado(true);
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
            border={tipoRadio}
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
        </InfoEsquerda>
        <InfoDireita>
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
                preenchendoDadosConsulta(e);
              }}
            ></InputData>
            {camposVazios.data ? <Rotulo>Escolha uma data</Rotulo> : <></>}
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <TextoSelecioneUmaData>Selecione um tipo:</TextoSelecioneUmaData>
              <Tooltip
                placement="topLeft"
                title={consulta.tipo}
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
                  value={consulta.tipo}
                  name="tipo"
                  placeholder="Tipo"
                  onChange={(e) => {
                    preenchendoDadosConsulta(e);
                  }}
                >
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
                  value={consulta.id_consultorio}
                  size="large"
                  onChange={(e) => {
                    preenchendoDadosConsulta(e);
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
                onChange={preenchendoDadosConsulta}
                style={{ color: "black" }}
                camposVazios={camposVazios.hora}
              />
              {camposVazios.hora ? <Rotulo>Digite um horário</Rotulo> : <></>}
            </ContainerHorario>

            <ContainerDuracaoConsulta>
              <TextoDoisSelects>Selecione uma duração:</TextoDoisSelects>
              <InputDuracao
                value={consulta.duracao_em_minutos}
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={preenchendoDadosConsulta}
                suffix="min"
                camposVazios={camposVazios.duracao_em_minutos}
              />
              {camposVazios.duracao_em_minutos ? (
                <Rotulo>Digite uma duração</Rotulo>
              ) : (
                <></>
              )}
            </ContainerDuracaoConsulta>
          </DoisSelect>

          <ContainerBotaoCheckbox>
            <ContainerNotificar>
            <Checkbox onChange={handleChange}>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
            </Checkbox>
            </ContainerNotificar>

            <Button
              width="100%"
              height="50px"
              backgroundColor={Cores.lilas[2]}
              borderColor={Cores.azul}
              color={Cores.azulEscuro}
              fontSize="0.7em"
              fontSizeMedia950="0.65em"
              fontSizeMedia480="0.60em"
              fontWeight="bold"
              onClick={() => requisicaoAtualizarConsulta()}
            >
              {carregandoUpdate ? (
                <Spin indicator={antIcon} />
              ) : (
                <div>Editar Agendamento</div>
              )}
            </Button>
          </ContainerBotaoCheckbox>
        </InfoDireita>
      </Caixa>
    </Container>
  );
}

export default ModalEditarConsulta;
