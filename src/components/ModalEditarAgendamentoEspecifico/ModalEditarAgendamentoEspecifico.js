import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { apenasNumeros } from "../../utils/masks";
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
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

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
    setCarregandoUpdate(true);
    consulta.id_usuario = usuario.id;
    formatacaoDataHora();
    await managerService.UpdateConsulta(consulta.id, consulta);
    sleep(3000);
    setCarregandoUpdate(false);
    props.fechandoModal();
  }

  function preenchendoDadosConsulta(e) {
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