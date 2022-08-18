import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
  Botoes,
  BotoesMedico,
  BotaoSecretario,
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import ModalAdicionarCodigo from "../../components/ModalAdicionarCodigo/ModalAdicionarCodigo";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";


function ListaUsuarios() {
  const history = useHistory();

  const { Option } = Select;
  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [emailPaciente, setEmailPaciente] = useState(false);
  const [modalAdicionarCodigo, setModalAdicionarCodigo] = useState(false);
  const [email, setEmail] = useState();
  const [tipoSelect, setTipoSelect] = useState("");
  const [busca, setBusca] = useState("");
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const abertoPeloUsuario = true;

  const lowerBusca = busca.toLowerCase();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const tipoUsuarioLogado = sessionStorage.getItem("@doctorapp-Tipo");

  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (lowerBusca === "" && tipoSelect === "") {
      return usuarios;
    } else {
      return (
        (usuario?.nome?.toLowerCase().includes(lowerBusca) ||
          usuario?.codigo?.toLowerCase().includes(lowerBusca) ||
          usuario?.telefone?.includes(lowerBusca)) &&
        usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase())
      );
    }
  });

  function secretariosFiltrados(value) {
    setTipoSelect(value);
  }

  async function pegandoDadosUsuarios() {
    setCarregandoPagina(true);
    setUsuarios([]);
    const resposta = await managerService.GetDadosPessoais();
    if (tipoUsuarioLogado === "MASTER") {
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE" || usuario.tipo === "SECRETARIA(O)") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
          setCarregando(false);
        }
      });
    } else {
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
          setCarregando(false);
        }
      });
    }
    setCarregandoPagina(false);
  }

  useEffect(() => {
    pegandoDadosUsuarios();
  }, []);

  async function marcandoAgendamento(emailPaciente) {
    setEmailPaciente(emailPaciente);
    setModalAgendamento(true);
  }

  async function fechandoModalAgendamentoEspecifico() {
    setModalAgendamento(false);
  }

  async function abrindoModalCodigo(email) {
    setEmail(email);
    setModalAdicionarCodigo(true);
  }

  async function fechandoModalCodigo() {
    setModalAdicionarCodigo(false);
    pegandoDadosUsuarios();
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

  function passandoTipoParaCadastro(tipo) {
    history.push({
      pathname: "/cadastro",
      state: { tipo },
    });
  }

  return (
    <div>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <BarraPesquisa>
            <Search
              placeholder="BUSCAR"
              style={{ width: 400 }}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </BarraPesquisa>
          <Filtros>
            {tipoUsuarioLogado === "MASTER" ? (
              <FiltroUsuario>
                <Select
                  defaultValue=""
                  style={{ width: 200 }}
                  onChange={(value) => secretariosFiltrados(value)}
                >
                  <Option value="">Todos os Usuários</Option>
                  <Option value="PACIENTE">Pacientes</Option>
                  <Option value="SECRETARIA(O)">Secretárias(os)</Option>
                </Select>
              </FiltroUsuario>
            ) : (
              <></>
            )}
            <FiltroDatas>
              <Select
                defaultValue="Todas as datas"
                style={{ width: 200 }}
              ></Select>
            </FiltroDatas>
          </Filtros>
        </TopoPagina>
        {tipoUsuarioLogado === "MASTER" ? (
          <BotoesMedico>
            <Button
              backgroundColor={Cores.cinza[7]}
              color={Cores.azul}
              width="45%"
              height="50px"
              borderColor={Cores.azul}
              fontSize="1em"
              gap="1%"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              widthMedia600="100%"
              onClick={() => passandoTipoParaCadastro("PACIENTE")}
            >
              Cadastrar Novo Paciente
              <PlusCircleOutlined style={{ color: Cores.azul }} />
            </Button>

            <Button
              backgroundColor={Cores.cinza[7]}
              color={Cores.azul}
              width="45%"
              height="50px"
              borderColor={Cores.azul}
              fontSize="1em"
              gap="1%"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              widthMedia600="100%"
              onClick={() => passandoTipoParaCadastro("SECRETARIA(O)")}
            >
              Cadastrar nova(o) Secretária(o)
              <PlusCircleOutlined style={{ color: Cores.azul }} />
            </Button>
          </BotoesMedico>
        ) : (
          <BotaoSecretario>
            <Button
              backgroundColor={Cores.cinza[7]}
              color={Cores.azul}
              width="100%"
              height="50px"
              borderColor={Cores.azul}
              fontSize="1em"
              gap="1%"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              onClick={() => passandoTipoParaCadastro("PACIENTE")}
            >
              Cadastrar Novo Paciente
              <PlusCircleOutlined style={{ color: Cores.azul }} />
            </Button>
          </BotaoSecretario>
        )}
        <BarraEstetica></BarraEstetica>
        <DadosUsuario>
          <Titulo></Titulo>
          <Nome>Nome do Usuário</Nome>
          <Telefone>Telefone</Telefone>
          <UltimaVisita>Última Visita</UltimaVisita>
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
          <CaixaVazia></CaixaVazia>
        </DadosUsuario>
        {carregandoPagina ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "47.5%",
            }}
          >
            <Spin indicator={antIconPagina} />
          </div>
        ) : (
          <>
            <ContainerUsuarios>
              {usuariosFiltrados?.map((value) => (
                <Usuario key={value.id}>
                  <Imagem>{value.avatar_url}</Imagem>
                  <Nome>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div
                        onClick={() =>
                          verificandoSecretariaOuPaciente(
                            value.tipo,
                            value.email
                          )
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
                      {value.tipo === "PACIENTE" ? (
                        <Button
                          backgroundColor="transparent"
                          borderColor="transparent"
                          color={Cores.preto}
                          fontSize="1em"
                          textDecoration="underline"
                          height="50px"
                          onClick={() => abrindoModalCodigo(value.email)}
                        >
                          Editar Código
                        </Button>
                      ) : (
                        <></>
                      )}
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
          </>
        )}
      </ContainerListadeUsuarios>

      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModalAgendamentoEspecifico}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={emailPaciente}
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAgendamentoEspecifico()}
        />
      </Modal>

      <Modal
        visible={modalAdicionarCodigo}
        onCancel={fechandoModalCodigo}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAdicionarCodigo
          emailUsuario={email}
          fechandoModal={() => fechandoModalCodigo()}
        />
      </Modal>
    </div>
  );
}

export default ListaUsuarios;
