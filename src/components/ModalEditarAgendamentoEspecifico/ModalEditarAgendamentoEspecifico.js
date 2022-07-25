import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { apenasNumeros } from "../../utils/masks";
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
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

let data = new Date();
let dia = data.getDate();
let mes = data.getMonth() + 1;
let ano = data.getFullYear();




function ModalEditarAgendamentoEspecifico(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoUpdate, setCarregandoUpdate] = useState();
  const [consulta, setConsulta] = useState({});
  const [consultorioPorId, setConsultorioPorId] = useState();
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [hoje, setHoje] = useState("");
  const [camposVazios, setCamposVazios] = useState({
    duracao_em_minutos: false,
    hora: false,
    data: false,
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  moment.locale("pt-br");

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

  async function setandoValoresConsulta() {
    setCarregando(true);
    setConsulta(props.consulta);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDadosUsuario();
    setandoValoresConsulta();
  }, [props]);

  useEffect(() => {
    setandoDiaAtual();
  }, []);

  useEffect(() => {
    setandoDataMinima();
  }, [hoje]);

  useEffect(() => {
    setandoCamposVazios();
  }, []);

  useEffect(() => {
    console.log(camposVazios);
  }, [camposVazios]);



  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      consulta.id_consultorio
    );
    setConsultorioPorId(resposta.nome);
  }

  function setandoDataEHora() {
    let dataString = String(consulta.data_hora);
    let dataFormatada = dataString.slice(0, 10);
    let horaString = String(consulta.data_hora);
    let horaFormatada = horaString.slice(14, 19);
    setData(dataFormatada);
    setHora(horaFormatada);
  }

  function setandoDiaAtual() {
    if (dia < 10){
      dia = "0" + dia;
    }
    if (mes < 10){
      mes = "0" + mes;
    }

    setHoje(ano + "-" + mes + "-" + dia);
    
  }

  function setandoDataMinima(){
    document.getElementById("data").setAttribute("min", hoje);
  }

  function setandoCamposVazios(){
    camposVazios.duracao_em_minutos = false;
    camposVazios.data = false;
    camposVazios.hora = false;
  }

  useEffect(() => {
    setandoNomeConsultorioPorId();
    setandoDataEHora();
  }, [consulta]);

  function formatacaoDataHora() {
    try {
      const dataHora = `${data} ${hora}:00`;
      consulta.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }

  async function requisicaoAtualizarConsulta() {
    console.log(hoje);
    if (
      camposVazios.duracao_em_minutos === true ||
      camposVazios.hora === true ||
      camposVazios.data === true
    ) {
      console.log(camposVazios);
      setCarregandoUpdate(true);
      toast.warn("Preencha todos os campos corretamente");
      setCarregandoUpdate(false);
      return
    } else {
      setCarregandoUpdate(true);
      consulta.id_usuario = usuario.id;
      formatacaoDataHora();
      await managerService.UpdateConsulta(consulta.id, consulta);
      sleep(3000);
      setCarregandoUpdate(false);
      props.fechandoModal();
      return
    }
  }

  function preenchendoDadosConsulta(e) {

    const { value, name } = e.target;

    if (value != consulta.descricao) {
      if (value) {
        setCamposVazios({ ...camposVazios, [name]: false });
      }
      else {
        setCamposVazios({ ...camposVazios, [name]: true });
      }
    }

    if (e.target.name === "hora") {
      setHora(e.target.value);
      return hora;
    } else if (e.target.name === "data") {
      setData(e.target.value);
      return data;
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
              id = "data"
              type="date"
              onKeyDown={(e) => e.preventDefault()}
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
            {camposVazios.data ? (
              <Rotulo>Escolha uma data</Rotulo>
            ) : (
              <></>
            )}
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select
                style={{
                  width: "100%",
                  color: "black",
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
                <option value="" disabled selected>
                  {consulta.tipo}
                </option>
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
                  color: "black",
                }}
                size="large"
                onChange={(e) => {
                  preenchendoDadosConsulta(e);
                }}
              >
                <option value="" disabled selected>
                  {consultorioPorId}
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
                style={{ color: "black" }}
              />
              {camposVazios.hora ? (
                <Rotulo>Digite um horário</Rotulo>
              ) : (
                <></>
              )}
            </TamanhoInput>

            <TamanhoInput>
              <InputDuracao
                value={consulta.duracao_em_minutos}
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={preenchendoDadosConsulta}
                suffix="min"
              />
              {camposVazios.duracao_em_minutos ? (
                <Rotulo>Digite uma duração</Rotulo>
              ) : (
                <></>
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
            onClick={() => requisicaoAtualizarConsulta()}
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

export default ModalEditarAgendamentoEspecifico;
