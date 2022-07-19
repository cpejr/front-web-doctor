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
  TextAreaDescricao,
  Rotulo,
  RotuloColuna,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Cores } from "../../variaveis";
import moment from "moment";

import { apenasNumeros } from "../../utils/masks";
import { toast } from "react-toastify";
import _ from "lodash";

function ModalAgendamentoEspecifico(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
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
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [duracaoEmMinutos, setDuracaoEmMinutos] = useState("");
  // const [selectValue, setSelectValue] = useState("");

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);

  moment.locale("pt-br");

  const errors = {};
  const referenciaInputNulos = {
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  };

  async function validacaoData (e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setData(value);
  }

  async function validacaoHora(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setHora(value);
  }

  async function validacaoDuracao(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setConsulta({ ...consulta, [name]: apenasNumeros(value) });
  }

  async function validacaoConsultorio(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setConsulta({ ...consulta, [name]: value });
  }

  async function validacaoTipo(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    setConsulta({ ...consulta, [name]: value });
  }

  async function pegandoDadosUsuario() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true)
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false)
  }

  useEffect(() => {
    pegandoDadosUsuario();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  async function requisicaoCriarConsulta() {
    if (!data) errors.data = true;
    if (!hora) errors.hora = true;
    if (!consulta.duracao_em_minutos) errors.duracao_em_minutos= true;
    if (!consulta.id_consultorio) errors.id_consultorio = true;
    if (!consulta.tipo) errors.tipo = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, referenciaInputNulos)) {
      setCarregandoCadastro(true);
      formatacaoDataHora();
      consulta.id_usuario = usuario.id;
      await managerService.CriandoColsulta(consulta);
      setCarregandoCadastro(false);
    } else {
      setCarregandoCadastro(true);
      toast.warn("Preencha todos os campos");
      setCarregandoCadastro(false);
    }
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
        </InfoEsquerdaEDireita>
        <InfoEsquerdaEDireita>
          <SelecioneUmaData>
            <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
            <Input
              placeholder="Selecione uma data"
              type="date"
              size="large"
              name="data"
              onChange={validacaoData}
              style={{
                borderWidth: "1px",
                borderColor: "black",
                color: "black",
              }}
              value={data}
              camposVazios={camposVazios.data}
            />
            {camposVazios.data && (
                <Rotulo>Digite uma data</Rotulo>
              )} 
          </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select
                style={{
                  width: "100%",
                  color:"black",
                  borderWidth: "1px",
                }}
                size="large"
                name="tipo"
                placeholder="Tipo"
                onChange={(e) => {
                  validacaoTipo(e);
                }}
                value={consulta.tipo}
                camposVazios={camposVazios.tipo}
              >
                <option value="" disabled selected >Tipo</option>
                <option value="1">Tipo 1</option>
                <option value="2">Tipo 2</option>
                <option value="3">Tipo 3</option>
              </Select>
              {camposVazios.tipo && (
                <Rotulo>Selecione um tipo de consulta</Rotulo>
              )}
            </TamanhoInput>
            <TamanhoInput>
              <Select
                id="id_consultorio"
                name="id_consultorio"
                style={{
                  width: "100%",
                  borderWidth: "1px",
                  color:"black"
                }}
                size="large"
                onChange={(e) => {
                  validacaoConsultorio(e);
                }}
                value={consulta.id_consultorio}
                camposVazios={camposVazios.id_consultorio}
                            
              >
                <option value="" disabled selected >
                    Consultório
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
              {camposVazios.id_consultorio && (
                <Rotulo>Selecione um consultório</Rotulo>
              )}
            </TamanhoInput>
          </DoisSelect>

          <DoisSelect>
            <TamanhoInput>
              <InputHora
                type="text"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => (e.target.type = "text")}
                placeholder="Horário"
                name="hora"
                onChange={(e) => {
                  validacaoHora(e);
                }}
                style={{color:"black"}}

              />
              {camposVazios.hora && (
                <Rotulo>Digite um horário</Rotulo>
              )} 
            </TamanhoInput>

            <TamanhoInput>
              <InputDuracao
                value={consulta.duracao_em_minutos}
                placeholder="Duração"
                name="duracao_em_minutos"
                onChange={validacaoDuracao}
                suffix="min"
                camposVazios={camposVazios.duracao_em_minutos}
              />
              {camposVazios.duracao_em_minutos && (
                <Rotulo>Digite uma duração</Rotulo>
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
