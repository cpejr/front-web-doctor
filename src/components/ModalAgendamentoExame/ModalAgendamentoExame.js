import React, { useEffect, useState } from "react";
import { Tooltip,Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { toast } from "react-toastify";
import { Row, Radio } from "antd";
import _ from "lodash";
import {
  Caixa,
  InfoDireita,
  DoisSelect,
  TamanhoInput,
  InputHora,
  SelecioneUmaData,
  TextoSelecioneUmaData,
  TextoDoisSelects,
  Rotulo,
  InputData,
  ContainerHorario,
  InfoEsquerda,
  TipoAgendamento,
  TextoCaixaSelect,
  Usuario,
  Imagem,
  Nome,
  NomePaciente,
  CaixaLoader,
  OpcoesAgendamento,
  TextoCheckbox,
} from "./Styles";
import Select from "../../styles/Select";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamentoExame(props) {
  const [consultorios, setConsultorios] = useState([]);
  const [consultorio, setConsultorio] = useState({});
  const [exames, setExames] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoCadastro, setCarregandoCadastro] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoExames, setCarregandoExames] = useState();
  const [idUsuario, setIdUsuario] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [exame, setExame] = useState({});
  const valoresIniciaisExame = {
    hora: "",
    titulo: "",
    nome: "",
  };
  const [dataExame, setDataExame] = useState("");
  const [hora, setHora] = useState("");
  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [hoje, setHoje] = useState("");
  const [clicadoCheckbox, setclicadoCheckbox] = useState(false);
  const [TipoValido, setTipoValido] = useState(true);
  const [UsuarioValido, setUsuarioValido] = useState(true);
  const [ConsultorioValido, setConsultorioValido] = useState(true);
  const [DataValido, setDataValido] = useState(true);
  const [HoraValido, setHoraValido] = useState(true);
  const [TipoValidoCor, setTipoValidocor] = useState("black");
  const [ConsultorioValidoCor, setConsultorioValidocor] = useState("black");

  moment.locale("pt-br");
  const errors = {};
  const [referenciaInputNulos, setReferenciaInputNulos] = useState({
    hora: false,
    titulo: false,
    nome: false,
    data: false,
  });

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios({ tipo: "EXAME" });
    let aux = [];
    res.dadosConsultorios.forEach((consultorio) => {
      if (consultorio.tipo === "EXAME") {
        aux.push(consultorio);
      }
    });
    setConsultorios(aux);
    setCarregandoConsultorios(false);
  }

  useEffect(() => {
    pegandoConsultorios();
  }, []);


  async function pegandoExames() {
    setCarregandoExames(true);
    const res = await managerService.GetDadosExames();
    setExames(res);
    setCarregandoExames(false);
  }

  useEffect(() => {
    pegandoExames();
  }, []);

  async function validacaoCampos(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    if (name === "data") {
      setDataExame(value);
      if (hora !== "" && hora !== undefined) {
        validacaoHorario(hora, value);
      }

      return dataExame;
    } else if (name === "nome") {
      const consultorioSelecionado = consultorios.find(
        (consultorioAtual) => consultorioAtual.id === value
      );
      setConsultorio(consultorioSelecionado);
      setExame({ ...exame, id_consultorio: value });
    } else {
      setExame({ ...exame, id_exame: value });
      return exame;
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

  const handleChange = () =>{
    setclicadoCheckbox(!clicadoCheckbox)
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

  function validacaoHorario(horarioExame, dataExame) {
    const horaAtual = setandoHoraAtual();

    if (horarioExame) {
      setCamposVazios({ ...camposVazios, hora: false });
    } else {
      setCamposVazios({ ...camposVazios, hora: true });
    }

    if (hoje === dataExame) {
      if (horarioExame <= horaAtual) {
        setErro({ ...erro, hora: true });
      } else {
        setErro({ ...erro, hora: false });
      }
    } else {
      setErro({ ...erro, hora: false });
    }

    setHora(horarioExame);
  }

  function formatacaoDataHora() {
    try {
      const dataHora = `${dataExame} ${hora}:00`;
      exame.data_hora = dataHora;
    } catch {
      alert("DataHora inválida.");
    }
  }
  
  async function setandoMsg(tipo, data_hora) {
    const examemarcado = await managerService.GetDadosExame(tipo)
    return("Você tem um exame marcado!\nTipo: " + examemarcado[0].titulo + "\nData e Hora: "+ data_hora.slice(8, 10) + "/" + data_hora.slice(5, 7) + "/" + data_hora.slice(0, 4) + " às " + data_hora.slice(11, 16));
  }

  function checarSeValido(){
    let Valido = true;
    if(String(exame.id_exame).length <= 10){
      setTipoValido(false); 
      setTipoValidocor("red") 
      Valido = false;
    }else{
      setTipoValido(true)
      setTipoValidocor("black")
    }
    if(String(exame.id_consultorio).length <= 10){
      setConsultorioValido(false); 
      setConsultorioValidocor("red")
      Valido = false;
    }else{
      setConsultorioValido(true)
      setConsultorioValidocor("black")
    }
    if(String(exame.id_usuario).length <= 15){
      setUsuarioValido(false); 
      Valido = false;
    }else{
      setUsuarioValido(true)
    }
    if(dataExame.length <= 2){
      setDataValido(false); 
      Valido = false;
    }else{
      setDataValido(true)
    }
    if(hora.length <= 2){
      setHoraValido(false); 
      Valido = false;
    }else{
      setHoraValido(true)
    }
    return Valido;
  }

  async function requisicaoCriarExame() {
    if (props.abertoPeloUsuario) {
      exame.id_usuario = props.usuario.id;
    } else {
      exame.id_usuario = idUsuario;
    }
    formatacaoDataHora();
    if(checarSeValido() === false){toast.error('Preencha todos os campos'); return;}
    setCarregandoCadastro(true);
    await managerService.CriandoExame(exame);
    let msg = await setandoMsg(exame.id_exame, exame.data_hora);
    if(clicadoCheckbox === true){
      
      const Token = 
        await managerService.TokenById(exame.id_usuario);
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
          
        }
        
    }
    setCarregandoCadastro(false);
    await sleep(1500);
    props.fechandoModal();
    setExame(valoresIniciaisExame);
    setDataExame("");
    setHora("");
  }

  return (
    <Caixa>
      <InfoEsquerda>
        {props.abertoPeloUsuario === true ? (
          <Usuario Valido={true}>
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
          <div>
          <Usuario Valido={UsuarioValido}>
            <NomePaciente>
              <Select
                style={{
                  width: "100%",
                  color: "black",
                  borderColor: "black",
                  borderWidth: "0px",
                  marginBottom: "0.5em",
                }}
                size="large"
                name="id_usuario"
                placeholder="Selecione um paciente"
                onChange={(e) => {
                  setIdUsuario(e.target.value);
                  setUsuarioValido(true)
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
          {UsuarioValido === false && <Rotulo>Selecione um paciente</Rotulo>}</div>
        )}
        <TipoAgendamento>
          <TextoCaixaSelect>Selecione o Tipo de Agendamento:</TextoCaixaSelect>
          <OpcoesAgendamento>
            <Row gutter={60} justify={"space-around"} >
              <Radio.Group
                defaultValue="exame"
                bordered={false}
                s
                onChange={(e) => {
                  props.trocarTipo(e.target.value);
                }}
              >
                <Radio value="exame">Exame</Radio>
                <Radio value="consulta">Consulta</Radio>
              </Radio.Group>
            </Row>
          </OpcoesAgendamento>
        </TipoAgendamento>
      </InfoEsquerda>
      <InfoDireita>
        <SelecioneUmaData>
          <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
          <InputData
            placeholder="Selecione uma data"
            size="large"
            type="date"
            paddingTop="8px"
            paddingBottom="8px"
            onKeyDown={(e) => e.preventDefault()}
            name="data"
            onChange={(e) => {
              validacaoCampos(e)
              setDataValido(true)}}
            value={dataExame}
            camposVazios={camposVazios.data}
            id="data"
            Valido={DataValido}
          />
          {DataValido === false && <Rotulo>Selecione uma data</Rotulo>}
        </SelecioneUmaData>
        <DoisSelect>
          <TamanhoInput>
            <TextoSelecioneUmaData>Selecione um tipo:</TextoSelecioneUmaData>
            <Tooltip
              placement="topLeft"
              title={exame?.titulo}
              color={Cores.azul}
            >
              <Select
                value={exame?.id}
                style={{
                  width: "100%",
                  color: "black",
                  borderColor: TipoValidoCor,
                  borderWidth: "1px",
                }}
                paddingTop="8px"
                size="large"
                name="titulo"
                id="titulo"
                placeholder="Tipo"
                onChange={(e) => {
                  validacaoCampos(e);
                  setTipoValido(true)
                  setTipoValidocor("black")
                }}
                camposVazios={camposVazios.titulo}
              >
                <option value="" disabled selected>
                  {exame?.titulo}
                  Tipo
                </option>
                {exames?.map((exame) => (
                  <>
                    {carregandoExames ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <option key={exame.id} value={exame.id} color="red">
                        {exame.titulo}
                      </option>
                    )}
                  </>
                ))}
              </Select>
            </Tooltip>
            {TipoValido === false && <Rotulo>Selecione um tipo de exame</Rotulo>}
          </TamanhoInput>
          <TamanhoInput>
            <TextoSelecioneUmaData>
              Selecione um consultório:
            </TextoSelecioneUmaData>
            <Tooltip
              placement="topLeft"
              title={consultorio?.nome}
              color={Cores.azul}
            >
              <Select
                value={consultorio?.id}
                id="nome"
                name="nome"
                style={{
                  width: "100%",
                  borderWidth: "1px",
                  borderColor: ConsultorioValidoCor,
                  color: "black",
                }}
                paddingTop="8px"
                size="large"
                onChange={(e) => {
                  validacaoCampos(e);
                  setConsultorioValido(true)
                  setConsultorioValidocor("black")
                }}
                camposVazios={camposVazios.nome}
              >
                <option value="" disabled selected>
                  {consultorio.nome}
                  Consultório
                </option>
                {consultorios?.map((consultorio) => (
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
            {ConsultorioValido === false  && <Rotulo>Selecione um consultório </Rotulo>}
          </TamanhoInput>
        </DoisSelect>
        <ContainerHorario>
          <TextoDoisSelects>Selecione um horário:</TextoDoisSelects>
          <InputHora
            value={hora}
            type="time"
            onKeyDown={(e) => e.preventDefault()}
            placeholder="Horário"
            name="hora"
            id="hora"
            onChange={(e) => {
              validacaoHorario(e.target.value, dataExame)
              setHoraValido(true)}}
            camposVazios={camposVazios.hora}
            erro={erro.hora}
            Valido={HoraValido}
          />
          {erro.hora && <Rotulo>Digite um horário válido</Rotulo>}
          {HoraValido === false && <Rotulo>Digite um horário</Rotulo>}
        </ContainerHorario>
        <Checkbox onChange={handleChange}>
          <TextoCheckbox>Notificar paciente</TextoCheckbox>
        </Checkbox>
        <Button
          width="80%"
          height="50px"
          marginTop="15%"
          marginTopMedia400="20%"
          backgroundColor={Cores.lilas[2]}
          borderColor={Cores.azul}
          color={Cores.azulEscuro}
          fontSize="1.1em"
          fontWeight="bold"
          fontSizeMedia="0.9em"
          fontSizeMedia950="1.1em"
          fontSizeMedia350="0.9em"
          onClick={() => requisicaoCriarExame()}
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

export default ModalAgendamentoExame;
