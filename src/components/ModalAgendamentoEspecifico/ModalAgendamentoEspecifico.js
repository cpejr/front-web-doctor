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
    setCarregando(false)
  }

  useEffect(() => {
    pegandoPacientes();
  }, [props]);

  function inputsFiltrados(value) {
    setTipoRadio(value);
  }

  return (
    <Container>
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
                <Nome>{usuario.nome}</Nome>
              )}
            </Usuario>
          ) : (
            <Usuario>
              <NomePaciente>
                <Select
                  style={{
                    width: "100%",
                    color: "black",
                    borderColor: "black",
                    borderWidth: "0px",
                    marginBottom: "0.5em",
                    paddingLeft: "2.5em",
                  }}
                  size="large"
                  name="id_usuario"
                  placeholder="Selecione um paciente"
                  onChange={(e) => {
                    setUsuario(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Paciente
                  </option>
                  {usuarios.map((usuario) => (
                    <>
                      {carregando ? (
                        <Spin indicator={antIcon} />
                      ) : (
                        <option key={usuario.id} value={usuario} color="red">
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
            <TextoCaixaSelect>
              Selecione o Tipo de Agendamento:
            </TextoCaixaSelect>
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
        </InfoEsquerda>
        <InfoEsquerdaEDireita>
          {tipoRadio === "" ? (
            <ModalAgendamentoExame
              abertoPeloUsuario={props.abertoPeloUsuario}
              usuario={usuario}
            />
          ) : (
            <ModalAgendamentoConsulta />
          )}
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
