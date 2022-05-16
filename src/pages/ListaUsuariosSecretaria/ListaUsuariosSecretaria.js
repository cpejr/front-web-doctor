import React, { useState, useEffect } from "react";
import { Input, Select, Modal } from "antd";
import { useHistory } from "react-router-dom";
import {
  TopoPagina,
  ContainerListadeUsuarios,
  Filtros,
  FiltroDatas,
  FiltroUsuario,
  BarraPesquisa,
  BarraEstetica,
  DadosUsuario,
  Titulo,
  ContainerUsuarios,
  Usuario,
  Imagem,
  Nome,
  Telefone,
  UltimaVisita,
  Agendamento,
  CódigoPaciente,
} from "./Styles";
import Button from "../../styles/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";

function ListaUsuariosSecretaria() {
  const history = useHistory();

  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [email, setEmail] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    pegandoDados();
  }, [email]);

  async function pegandoDados() {
    const resposta = await managerService.GetDadosPessoais();
    setUsuarios(resposta);
    setCarregando(false);
  }

  async function marcandoAgendamento(email) {
    setEmail(email);
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
  }

  async function verificandoSecretariaOuPaciente(tipo, email){
    if(tipo === "SECRETARIA"){
      history.push({
        pathname: "/web/perfil",
        state: {email},
      })
    } else {
      history.push({
        pathname: "/web/perfildopaciente",
        state: {email},
      })
    }
  }

  return (
    <div>
    <ContainerListadeUsuarios>
      <TopoPagina>
        <BarraPesquisa>
          <Search placeholder="BUSCAR" style={{ width: 400 }} />
        </BarraPesquisa>
        <Filtros>
          <FiltroUsuario>
            <Select
              defaultValue="Todos os Usuários"
              style={{ color: "green", width: 200 }}
            ></Select>
          </FiltroUsuario>
          <FiltroDatas>
            <Select
              defaultValue="Todas as datas"
              style={{ color: "green", width: 200 }}
            ></Select>
          </FiltroDatas>
        </Filtros>
      </TopoPagina>
      <BarraEstetica></BarraEstetica>
      <DadosUsuario>
        <Titulo></Titulo>
        <Nome>Nome do Usuário</Nome>
        <Telefone>Telefone</Telefone>
        <UltimaVisita>Última Visita</UltimaVisita>
        <Agendamento>Agendamento</Agendamento>
        <CódigoPaciente>Código do Paciente</CódigoPaciente>
      </DadosUsuario>
      <ContainerUsuarios>
        {usuarios.map((value) => (
          <Usuario key={value.id}>
            <Imagem>{value.avatar_url}</Imagem>
            <Nome>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <div onClick={() => verificandoSecretariaOuPaciente(value.tipo, value.email)}>{value.nome}</div>
              )}
            </Nome>
            <Telefone>
              {carregando ? (
                <Spin indicator={antIcon} />
              ) : (
                <>
                  ({value.telefone.slice(0, -9)}) {value.telefone.slice(2, -4)}-
                  {value.telefone.slice(-4)}
                </>
              )}
            </Telefone>
            <UltimaVisita>21/04/2022</UltimaVisita>

              <Agendamento>
                <Button
                  backgroundColor="transparent"
                  borderColor="transparent"
                  color="green"
                  fontSize="1em"
                  textDecoration="underline"
                  height="50px"
                  onClick={() => marcandoAgendamento(value.email)}
                >
                  Marcar Agendamento
                </Button>
              </Agendamento>
              <CódigoPaciente>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div>{value.codigo}</div>
                )}
              </CódigoPaciente>
            </Usuario>
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
        <ModalAgendamentoEspecifico emailUsuario={email} />
      </Modal>
    </div>
  );
}

export default ListaUsuariosSecretaria;