import React, { useEffect, useState } from "react";
import { Row, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import {
  Container,
  Caixa,
  InfoEsquerda,
  Usuario,
  Imagem,
  Nome,
  TextoTipoAgendamento,
  TipoAgendamento,
} from "./Styles";
import Select from "../../styles/Select";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { sleep } from "../../utils/sleep";
import { apenasNumeros } from "../../utils/masks";
import * as managerService from "../../services/ManagerService/managerService";
import ModalEditarConsulta from "../ModalEditarConsulta";
import ModalEditarExame from "../ModalEditarExame";

function ModalEditarAgendamentoEspecifico(props) {
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [consultorios, setConsultorios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [carregandoUpdate, setCarregandoUpdate] = useState();
  const [consulta, setConsulta] = useState({});
  const [novaConsulta, setNovaConsulta] = useState({});
  const [consultorioPorId, setConsultorioPorId] = useState();
  const [data, setData] = useState("");
  const [tipoRadio, setTipoRadio] = useState("");
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
  }, [consulta]);

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

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
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
    let horaString = String(consulta.data_hora);
    let horaFormatada = horaString.slice(14, 19);
    setData(dataFormatada);
    setHora(horaFormatada);
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
      formatacaoDataHora();
      await managerService.UpdateConsulta(consulta.id, consulta);
      sleep(3000);
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


          <TipoAgendamento>
            <TextoTipoAgendamento>
              Selecione o Tipo de Agendamento:
            </TextoTipoAgendamento>
            <Row gutter={60} justify={"space-around"}>
            <Radio.Group 
            defaultValue=""
            bordered={false}
            FiltrarInputs={tipoRadio}
            onChange={(e) => inputsFiltrados(e.target.value)}
            >
              <Radio value="">Exame</Radio>
              <Radio value="filtrado">Consulta</Radio>
            </Radio.Group>
            </Row>
          </TipoAgendamento>
          {tipoRadio === "" ? (
                <ModalEditarConsulta></ModalEditarConsulta>
              ) : (
                <ModalEditarExame></ModalEditarExame>
              )}

        </InfoEsquerda>

      </Caixa>
    </Container>
  );
}

export default ModalEditarAgendamentoEspecifico;
