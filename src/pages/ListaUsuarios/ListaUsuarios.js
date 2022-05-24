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
  DadosUsuario,
  Titulo,
  ContainerUsuarios,
  Usuario,
  Imagem,
  Nome,
  Telefone,
  UltimaVisita,
  CódigoPaciente,
  BotaoAdicionar,
  CaixaVazia,
} from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";

function ListaUsuarios() {
  const history = useHistory();

  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState([]);
  const [tipoUsuarioLista, setTipoUsuarioLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [emailPaciente, setEmailPaciente] = useState(false);

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
    const resposta = await managerService.GetDadosPessoais();
    console.log(tipoUsuarioLogado);
    if (tipoUsuarioLogado === "MASTER") {
      setUsuarios(resposta);
      setCarregando(false);
    } else {
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE") {
          usuarios.push(usuario);
        }
      });
      setCarregando(false);
    }
  }

  async function marcandoAgendamento(emailPaciente) {
    setEmailPaciente(emailPaciente);
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
  }

  function testagem() {
    console.log(usuarios);
  }
  async function verificandoSecretariaOuPaciente(tipo, email) {
    if (tipo === "SECRETARIA") {
      history.push({
        pathname: "/web/perfil",
        state: { email },
      });
    } else {
      history.push({
        pathname: "/web/perfildopaciente",
        state: { email },
      });
    }
  }

  return (
    <div>
      <button onClick={testagem}>Teste</button>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <BarraPesquisa>
            <Search placeholder="BUSCAR" style={{ width: 400 }} />
          </BarraPesquisa>
          <Filtros>
            {tipoUsuarioLogado === "MASTER" ? (
              <FiltroUsuario>
                <Select
                  defaultValue="Todos os Usuários"
                  style={{ color: "green", width: 200 }}
                ></Select>
              </FiltroUsuario>
            ) : (
              <></>
            )}
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
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
          <CaixaVazia></CaixaVazia>
        </DadosUsuario>
        <ContainerUsuarios>
          {usuarios?.map((value) => (
            <Usuario key={value.id}>
              <Imagem>{value.avatar_url}</Imagem>
              <Nome>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div
                    onClick={() =>
                      verificandoSecretariaOuPaciente(value.tipo, value.email)
                    }
                  >
                    {value.nome}
                  </div>
                )}
              </Nome>
              <Telefone>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <>
                    ({value.telefone.slice(0, -9)}){" "}
                    {value.telefone.slice(2, -4)}-{value.telefone.slice(-4)}
                  </>
                )}
              </Telefone>
              <UltimaVisita>21/04/2022</UltimaVisita>

              <CódigoPaciente>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <>{value.codigo}</>
                )}
              </CódigoPaciente>

              {tipoUsuarioLogado === "MASTER" ? (
                <BotaoAdicionar>
                  <Button
                    backgroundColor="transparent"
                    borderColor="transparent"
                    color="green"
                    fontSize="1em"
                    textDecoration="underline"
                    height="50px"
                  >
                    Adicionar Código
                  </Button>
                </BotaoAdicionar>
              ) : (
                <BotaoAdicionar>
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
                </BotaoAdicionar>
              )}
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
        <ModalAgendamentoEspecifico emailUsuario={emailPaciente} />
      </Modal>
    </div>
  );
}

export default ListaUsuarios;
