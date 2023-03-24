import React, { useEffect, useState } from "react";
import { Checkbox, message, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Row, Radio } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import _, { set } from "lodash";
import {
  Container,
  Caixa,
  InfoEsquerda,
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
  InfoDireita,
  Usuario,
  Imagem,
  Nome,
  CaixaLoader,
  NomePaciente,
  TipoAgendamento,
  TextoCaixaSelect,
  CaixaCheckbox,
} from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import { TiposDeConsulta } from "../listaTiposDeConsultas";
import { apenasNumeros, data, dataAgendamentoBack } from "../../utils/masks";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoConsulta(props) {
  const [usuario, setUsuario] = useState({});
  const [clicadoCheckbox, setclicadoCheckbox] = useState(false);
  const [idUsuario, setIdUsuario] = useState({});
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
  const [TipoValido, setTipoValido] = useState("black");
  const [UsuarioValido, setUsuarioValido] = useState("black");
  const [ConsultorioValido, setConsultorioValido] = useState("black");
  const [DataValido, setDataValido] = useState("black");
  const [HoraValido, setHoraValido] = useState("black");
  const [DuracaoValido, setDuracaoValido] = useState("black");

  moment.locale("pt-br");

  async function setandoNomeConsultorioPorId() {
    const resposta = await managerService.GetConsultorioPorId(
      consulta.id_consultorio
    );
    setNomeConsultorioPorId(resposta.nome);
  }

  useEffect(() => {
    setandoNomeConsultorioPorId();
  });

  const errors = {};
  const [referenciaInputNulos, setReferenciaInputNulos] = useState({
    data: false,
    hora: false,
    duracao_em_minutos: false,
    id_consultorio: false,
    tipo: false,
  });

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

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  async function validacaoCampos(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
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

  function setandoMsg(tipo, data_hora, duracao_em_minutos) {
    return("Você tem uma consulta marcada!\nTipo: " + tipo + "\nData e Hora: "+ data_hora.slice(8, 10) + "/" + data_hora.slice(5, 7) + "/" + data_hora.slice(0, 4) + " às " + data_hora.slice(11, 16)+ "\nDuração da consulta: " + duracao_em_minutos + " minutos.");
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
  
  const handleChange = () =>{
    setclicadoCheckbox(!clicadoCheckbox)
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

  function ChecarseValido(){
    let Valido = true;
    if(String(consulta.tipo).length <= 5){setTipoValido("red"); Valido = false;}else{setTipoValido("black")}
    if(String(consulta.id_consultorio).length <= 15){setConsultorioValido("red"); Valido = false;}else{setConsultorioValido("black")}
    if(String(consulta.id_usuario).length <= 15){setUsuarioValido("red"); Valido = false;}else{setUsuarioValido("black")}
    if(dataConsulta.length <= 2){setDataValido("red"); Valido = false;}else{setDataValido("black")}
    if(hora.length <= 2){setHoraValido("red"); Valido = false;}else{setHoraValido("black")}
    if(consulta.duracao_em_minutos === ""){setDuracaoValido("red"); Valido = false;}else{setDuracaoValido("black")}
    return Valido;
  }

  async function requisicaoCriarConsulta() {
    if (props.abertoPeloUsuario) {
      consulta.id_usuario = props.usuario.id;
    } else {
      consulta.id_usuario = idUsuario;
    }
    if(ChecarseValido() === false){toast.error('Complete todos os campos'); return;}
    setCarregandoCadastro(true);
    formatacaoDataHora();
    let msg = setandoMsg(consulta.tipo, consulta.data_hora, consulta.duracao_em_minutos);
    await managerService.CriandoConsulta(consulta);
    if(clicadoCheckbox === true){
      
      const Token = 
        await managerService.TokenById(consulta.id_usuario);
        if(Token.length === 0){
          toast.error('Nenhum celular cadastrado a esse paciente');
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
          toast.success('Notificação encaminhada para o paciente.');
        }
      
    }
    setCarregandoCadastro(false);
    await sleep(1500);
    props.fechandoModal();
    setConsulta(valoresIniciaisConsulta);
    setDataConsulta("");
    setHora("");
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
          <Usuario Valido={UsuarioValido}>
            <NomePaciente>
              <Select
                style={{
                  width: "100%",
                  color: "black",
                  borderColor: "black",
                  borderWidth: "0px",
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
          <TextoCaixaSelect>Selecione o Tipo de Agendamento:</TextoCaixaSelect>

          <Row gutter={60} justify={"space-around"}>
            <Radio.Group
              defaultValue="consulta"
              bordered={false}
              FiltrarInputs={tipoRadio}
              onChange={(e) => props.trocarTipo(e.target.value)}
            >
              <Radio value="exame">Exame</Radio>
              <Radio value="consulta">Consulta</Radio>
            </Radio.Group>
          </Row>
        </TipoAgendamento>
        <TextAreaDescricao
          border={tipoRadio}
          placeholder="Adicione uma descrição"
          rows={4}
          name="descricao"
          value={consulta.descricao}
          onChange={(e) => validacaoCampos(e)}
          style={{
            borderWidth: "1px",
            color: "black",
          }}
        />
      </InfoEsquerda>
      <InfoDireita>
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
            Valido={DataValido}
          />
          {camposVazios.data && <Rotulo>Selecione uma data</Rotulo>}
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
                  borderWidth: "1px",
                  borderColor: TipoValido,
                }}
                marginBottomMedia320="13%"
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
              </Select>
            </Tooltip>
            {camposVazios.tipo && (
              <Rotulo>Selecione um tipo de consulta</Rotulo>
            )}
          </TamanhoInput>
          <InputConsultorio>
            <TextoDoisSelects>Selecione um consultório:</TextoDoisSelects>
            <Tooltip
              placement="topLeft"
              title={nomeConsultorioPorId}
              color={Cores.azul}
            >
              <Select
                value={consulta.id_consultorio}
                id="id_consultorio"
                name="id_consultorio"
                style={{
                  width: "100%",
                  borderWidth: "1px",
                  color: "black",
                  borderColor: ConsultorioValido
                }}
                marginBottomMedia320="-17%"
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
              </Select>
            </Tooltip>
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
              Valido={HoraValido}
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
              Valido={DuracaoValido}
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
        <Checkbox onChange={handleChange}>
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
          fontSizeMedia350="0.9em"
          onClick={() => requisicaoCriarConsulta()}
        >
          {carregandoCadastro ? (
            <Spin indicator={antIcon} />
          ) : (
            <div style={{ margin: "auto", padding: "auto" }}>
              Cadastrar novo agendamento
            </div>
          )}
        </Button>
      </InfoDireita>
    </Caixa>
  );
}

export default ModalAgendamentoConsulta;
