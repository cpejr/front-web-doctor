import React, { useEffect, useState } from "react";
import { Row, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  Container,
  Caixa,
  Usuario,
  Imagem,
  Nome,
  TipoAgendamento,
  TextoTipoAgendamento,
  InputDuracao,
  CaixaSelect,
  TextoCaixaSelect,
  TextAreaDescricao,
  Rotulo,
  InputData,
  NomePaciente,
  InfoEsquerda,
  TextoCheckbox,
  InputHora,
  CaixaLoader,
  InfoEsquerdaEDireita,
} from "./Styles";
import Select from "../../styles/Select";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { TiposDeConsulta } from "../listaTiposDeConsultas";
import { apenasNumeros } from "../../utils/masks";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoConsulta from "../ModalAgendamentoConsulta";
import ModalAgendamentoExame from "../ModalAgendamentoExame";
import Button from "../../styles/Button";
import { Checkbox, Tooltip } from "antd";

function ModalAgendamentoEspecifico(props) {
  const [usuario, setUsuario] = useState({});
  const [idUsuario, setIdUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState();
  const [tipoRadio, setTipoRadio] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function pegandoPacientes() {
    setCarregando(true);
    if (props.abertoPeloUsuario) {
      const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
      setUsuario(resposta.dadosUsuario);
    } else {
      const resposta = await managerService.GetDadosPessoais();
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
        }
      });
    }
    setCarregando(false);
  }

  useEffect(() => {
    pegandoPacientes();
  }, [props]);

  return (
    <Container>
      <Caixa>
        <InfoEsquerda></InfoEsquerda>
        <InfoEsquerdaEDireita>
          {tipoRadio === "exame" ? (
            <ModalAgendamentoExame
              abertoPeloUsuario={props.abertoPeloUsuario}
              usuario={usuario}
              usuarios={usuarios}
              fechandoModal={() => props.fechandoModal()}
              trocarTipo={(e) => setTipoRadio(e)}
            />
          ) : (
            <ModalAgendamentoConsulta
              abertoPeloUsuario={props.abertoPeloUsuario}
              usuario={usuario}
              usuarios={usuarios}
              fechandoModal={() => props.fechandoModal()}
              trocarTipo={(e) => setTipoRadio(e)}
            />
          )}
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
