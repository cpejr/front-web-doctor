import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import {
  TopoPagina,
  ContainerListadeUsuarios,
  Filtros,
  FiltroDatas,
  FiltroUsuario,
  BarraPesquisa,
  BarraEstetica,
  ContainerUsuarios,
  Resposta,
  RespostaPendente,
  UrgenciaFormulario,
  TipoFormulario,
  TituloFormulario,
  Formulario,
  DadosFormulario,
  BotoesVertical,
  ContainerFormularioEspecifico,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import ModalAdicionarCodigo from "../../components/ModalAdicionarCodigo/ModalAdicionarCodigo";

function ListaFormularios() {
  const history = useHistory();

  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [emailPaciente, setEmailPaciente] = useState(false);
  const [modalAdicionarCodigo, setModalAdicionarCodigo] = useState(false);
  const [email, setEmail] = useState();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const emailLogado = sessionStorage.getItem("@doctorapp-Email");

  async function pegandoTipoUsuarioLogado() {
    const resposta = await managerService.GetDadosUsuario(emailLogado);
    setTipoUsuarioLogado(resposta.dadosUsuario.tipo);
  }

  useEffect(() => {
    pegandoDadosUsuarios();
  }, [tipoUsuarioLogado]);

  useEffect(() => {
    pegandoTipoUsuarioLogado();
  }, []);

  async function pegandoDadosUsuarios() {
    const resposta = await managerService.GetFormularios();
    
      setUsuarios(resposta);
     
  }

  async function marcandoAgendamento(emailPaciente) {
    setEmailPaciente(emailPaciente);
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
  }

  async function abrindoModalCodigo(email) {
    setEmail(email);
    setModalAdicionarCodigo(true);
  }

  async function fechandoModalCodigo() {
    setModalAdicionarCodigo(false);
  }

  return (
    <div>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <BarraPesquisa>
            <Search placeholder="BUSCAR" style={{ width: 400 }} />
          </BarraPesquisa>
          <Filtros>
            <FiltroDatas>
              <Select
                defaultValue="Tipos"
                style={{ color: "green", width: 200 }}
              ></Select>
            </FiltroDatas>
            <FiltroUsuario>
              <Select
                defaultValue="Finalidades"
                style={{ color: "green", width: 200 }}
              ></Select>
            </FiltroUsuario>
            <FiltroDatas>
              <Select
                defaultValue="Urgências"
                style={{ color: "green", width: 200 }}
              ></Select>
            </FiltroDatas>
          </Filtros>
        </TopoPagina>
        <BarraEstetica/>
        <ContainerUsuarios>
          {usuarios?.map((value) => (
            <ContainerFormularioEspecifico>
            <Formulario>
            <DadosFormulario>
              <TituloFormulario>{value.titulo}</TituloFormulario>
              <TipoFormulario>Tipo: {value.tipo}</TipoFormulario>
              <UrgenciaFormulario>
                <> Urgência: </>
                <StarFilled />
                <StarFilled />
                <StarOutlined />
              </UrgenciaFormulario>
            </DadosFormulario>
            <RespostaPendente>
              <Resposta>Resposta Pendente</Resposta>
            </RespostaPendente>
              </Formulario>
            <BotoesVertical>
            <Button
                backgroundColor="green"
                color={Cores.azulEscuro}
                fontWeight="bold"
                borderColor={Cores.azulEscuro}
                height="37px"
                width="90%"
              >
                ENVIAR LEMBRETE
              </Button>
              <Button
                backgroundColor={Cores.azulEscuro}
                color={Cores.azulEscuro}
                fontWeight="bold"
                borderColor={Cores.azulEscuro}
                height="37px"
                width="90%"
              >
                ENVIAR LEMBRETE
              </Button>
              <Button
                backgroundColor="green"
                color={Cores.azulEscuro}
                fontWeight="bold"
                borderColor={Cores.azulEscuro}
                height="37px"
                width="90%"
              >
                ENVIAR LEMBRETE
              </Button>
              </BotoesVertical>
              </ContainerFormularioEspecifico>
          ))}
        </ContainerUsuarios>
      </ContainerListadeUsuarios>

      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico emailUsuario={emailPaciente} />
      </Modal>

      <Modal
        visible={modalAdicionarCodigo}
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAdicionarCodigo emailUsuario={email} />
      </Modal>
    </div>
  );
}

export default ListaFormularios;
