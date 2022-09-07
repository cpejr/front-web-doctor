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
  BotoesMedico,
  BotaoSecretario,
  LogoCarregando,
  ContainerSpin,
  CaixaSpin,
  SelectTipoBusca,
  SearchStyle,
  FiltrosEsquerda
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import ModalAdicionarCodigo from "../../components/ModalAdicionarCodigo/ModalAdicionarCodigo";
import { compararDataAntiga, compararNomes } from "../../utils/tratamentoErros";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

function ListaUsuarios() {
  const history = useHistory();

  const { Option } = Select;
  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [carregandoPagina, setCarregandoPagina] = useState(true);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [emailPaciente, setEmailPaciente] = useState(false);
  const [modalAdicionarCodigo, setModalAdicionarCodigo] = useState(false);
  const [email, setEmail] = useState();
  const [tipoSelect, setTipoSelect] = useState("");
  const [visitaSelect, setVisitaSelect] = useState("");
  const [busca, setBusca] = useState("");
  const abertoPeloUsuario = true;
  const [consultas, setConsultas] = useState([]);

  const [pesquisa, setPesquisa] = useState("");

  const lowerBusca = busca
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40, color: Cores.azulEscuro }} spin />;
  const tipoUsuarioLogado = sessionStorage.getItem("@doctorapp-Tipo");

  const usuariosFiltrados = usuarios.filter((usuario) => 
  {

    if (lowerBusca === "" && tipoSelect === "" && visitaSelect === "") {
      return usuarios;
    }

    if( lowerBusca === "")
    {
      if (tipoSelect !== "" && visitaSelect === "") {
        return(
        usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase())); 
      }
      else if(tipoSelect === "" && visitaSelect !== "")
      {
        return (
        usuario.ultimaConsulta !== undefined 
        );
      }
      else if(tipoSelect !== "" && visitaSelect !== "")
      {
        return (
        usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase()) &&
        usuario.ultimaConsulta !== undefined );
      }
      else{
        return(
        usuario?.nome?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca));
      }
    }
    else
    {
      if (pesquisa === "")
       {
          if (tipoSelect !== "" && visitaSelect === "")
          {
            return(
            usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase()) &&
            usuario?.nome?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca));
          }
          else if(tipoSelect === "" && visitaSelect !== "")
          {
            return(
            usuario.ultimaConsulta !== undefined && 
            usuario?.nome?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca));
          }
          else if(tipoSelect !== "" && visitaSelect !== "")
          {
            return(
            usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase()) &&
            usuario.ultimaConsulta !== undefined && 
            usuario?.nome?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca));
          }
          else{
            return(
            usuario?.nome?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca));
          }
        }
      else
      {
        if (tipoSelect !== "" && visitaSelect === "") {
          return(
          usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase()) &&
          usuario?.codigo?.toLowerCase().normalize("NFD").includes(lowerBusca));
        }
        else if(tipoSelect === "" && visitaSelect !== "")
        {
          return(
          usuario.ultimaConsulta !== undefined && 
          usuario?.codigo?.toLowerCase().normalize("NFD").includes(lowerBusca));
        }
        else if(tipoSelect !== "" && visitaSelect !== "")
        {
          return(
          usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase()) &&
          usuario.ultimaConsulta !== undefined && 
          usuario?.codigo?.toLowerCase().normalize("NFD").includes(lowerBusca));
        }
        else{
          return(
          usuario?.codigo?.toLowerCase().normalize("NFD").includes(lowerBusca));
        }
      }
    }
  });

  function secretariosFiltrados(value) {

    if(value === "SECRETARIA(O)")
    {
      setVisitaSelect("");
    }
    setTipoSelect(value);
  }

  function visitaFiltro(value) {
    setVisitaSelect(value);
  }

  function tipoBarraPesquisa(value) {
    setPesquisa(value);
  }

  async function pegandoDadosUsuarios(consultas) {
    setCarregandoPagina(true);
    setUsuarios([]);
    const resposta = await managerService.GetDadosPessoais();
    if (tipoUsuarioLogado === "MASTER") {
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE" || usuario.tipo === "SECRETARIA(O)") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
          setandoUltimaConsulta(usuario, consultas);
        }
      });
    } else {
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
          setandoUltimaConsulta(usuario, consultas);
        }
      });
    }
    await sleep(700);
    setCarregandoPagina(false);
  }

  async function pegandoDadosConsultas() {
    await managerService.GetDadosConsultasExamesMarcadosGeral().then((res) => {
      setConsultas(res.dadosConsultas);
      pegandoDadosUsuarios(res.dadosConsultas);
    });
  }


  

  useEffect(() => {
    pegandoDadosConsultas();
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
    pegandoDadosUsuarios(consultas);
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

  async function setandoUltimaConsulta(usuario, consultas) {
    if (usuario.tipo === "SECRETARIA(O)") {
      return;
    }
    consultas.sort(compararDataAntiga);
    let dataHora = [];
    consultas.forEach((consulta) => {
      if (consulta.id_usuario === usuario.id) {
        dataHora.push(consulta.data_hora);
      }
    });

    const primeiraConsulta = dataHora[0];
    const hoje = new Date();

    for (var i = 0; i < dataHora.length; i++) {
      if (new Date(primeiraConsulta) > hoje) {
        return;
      }

      if (new Date(dataHora[i]) > hoje) {
        const consultaMaisRecente = dataHora[i - 1];
        Object.defineProperty(usuario, "ultimaConsulta", {
          value: consultaMaisRecente,
        });
        return;
      }
    }

    if (
      dataHora.length !== 0 &&
      usuario.ultimaConsulta === undefined &&
      new Date(primeiraConsulta) < hoje
    ) {
      const consultaMaisRecente = dataHora[dataHora.length - 1];
      usuario.ultimaConsulta = consultaMaisRecente;
    }
  }

  return (
    <div>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <FiltrosEsquerda>
            <SelectTipoBusca
              defaultValue=""
              tipoBusca={pesquisa}
              bordered={false}
              onChange={(value) => tipoBarraPesquisa(value)}
            >
              <Option value="">Pesquisar por nome</Option>
              <Option value="codigo">Pesquisar por código</Option>
            </SelectTipoBusca>
            <BarraPesquisa>
            <SearchStyle
              placeholder="BUSCAR"
              tipoBusca={pesquisa}
              bordered={false}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </BarraPesquisa>
          </FiltrosEsquerda>
          <Filtros>
            {tipoUsuarioLogado === "MASTER" ? (
              <FiltroUsuario>
                <Select
                  defaultValue=""
                  style={{ width: 180 }}
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
            {(tipoUsuarioLogado === "MASTER" &&
            tipoSelect !== "SECRETARIA(O)") || tipoUsuarioLogado === "SECRETARIA(O)"  ? (
              <FiltroDatas>
                <Select
                  defaultValue=""
                  style={{ width: 180 }}
                  onChange={(value) => visitaFiltro(value)}
                >
                  <Option value="">Todas as Datas</Option>
                  <Option value="ultimaConsulta">Últimas Visitas</Option>
                </Select>
              </FiltroDatas>
            ) : (
              <></>
            )}
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
        {carregandoPagina ? (
          <ContainerSpin>
            <CaixaSpin>
              <Spin indicator={antIconPagina} />
            </CaixaSpin>
          </ContainerSpin>
        ) : (
          <>
            <DadosUsuario>
              <Titulo></Titulo>
              <Nome>Nome do Usuário</Nome>
              <Telefone>Telefone</Telefone>
              <UltimaVisita>Última Visita</UltimaVisita>
              <CódigoPaciente>Código do Paciente</CódigoPaciente>
              <CaixaVazia></CaixaVazia>
            </DadosUsuario>
            <ContainerUsuarios>
              {usuariosFiltrados?.sort(compararNomes).map((value) => (
                <Usuario>
                  <Imagem>{value.avatar_url}</Imagem>
                  <Nome>
                    <div
                      onClick={() =>
                        verificandoSecretariaOuPaciente(value.tipo, value.email)
                      }
                    >
                      {value.nome}
                    </div>
                  </Nome>
                  <Telefone>
                    ({value.telefone.slice(0, -9)}){" "}
                    {value.telefone.slice(2, -4)}-{value.telefone.slice(-4)}
                  </Telefone>
                  {value.ultimaConsulta === undefined ? (
                    <UltimaVisita> - </UltimaVisita>
                  ) : (
                    <UltimaVisita>
                      {value.ultimaConsulta.slice(8, 10) +
                        "/" +
                        value.ultimaConsulta.slice(5, 7) +
                        "/" +
                        value.ultimaConsulta.slice(0, 4)}
                    </UltimaVisita>
                  )}

                  <CódigoPaciente>{value.codigo}</CódigoPaciente>
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
