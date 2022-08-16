import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  TopoPagina,
  ContainerListadeReceitas,
  Filtros,
  FiltroDatas,
  FiltroReceita,
  BarraPesquisa,
  BarraEstetica,
  DadosReceita,
  Titulo,
  ContainerReceitas,
  Receita,
  Imagem,
  Nome,
  Telefone,
  DataCriacao,
  CódigoPaciente,
  BotaoAdicionar,
  CaixaVazia,
  Botoes,
  BotaoMedico,
  BotaoSecretario,
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import ModalAdicionarCodigo from "../../components/ModalAdicionarCodigo/ModalAdicionarCodigo";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

function AreaReceitas() {
  const history = useHistory();

  const { Option } = Select;
  const { Search } = Input;
  const [receitas, setReceitas] = useState([]);
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

  // const usuariosFiltrados = usuarios.filter((usuario) => {
  //   if (lowerBusca === "" && tipoSelect === "") {
  //     return usuarios;
  //   } else {
  //     return (
  //       (usuario?.nome?.toLowerCase().includes(lowerBusca) ||
  //         usuario?.codigo?.toLowerCase().includes(lowerBusca) ||
  //         usuario?.telefone?.includes(lowerBusca)) &&
  //       usuario?.tipo?.toLowerCase().includes(tipoSelect.toLowerCase())
  //     );
  //   }
  // });

  function secretariosFiltrados(value) {
    setTipoSelect(value);
  }

  async function pegandoDadosReceitas() {
    setCarregandoPagina(true);
    setReceitas([]);
    const resposta = await managerService.GetReceitas();
    if (tipoUsuarioLogado === "MASTER") {
      resposta.forEach((receita) => {
        if (1) {
          setReceitas((receitas) => [...receitas, receita]);
          console.log(receita);
          setCarregando(false);
        }
      });
    }
    // else {
    //   resposta.forEach((usuario) => {
    //     if (usuario.tipo === "PACIENTE") {
    //       setUsuarios((usuarios) => [...usuarios, usuario]);
    //       setCarregando(false);
    //     }
    //   });
    // }
    setCarregandoPagina(false);
  }

  useEffect(() => {
    pegandoDadosReceitas();
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
    pegandoDadosReceitas();
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
      <ContainerListadeReceitas>
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
              <FiltroReceita>
                <Select
                  defaultValue=""
                  style={{ width: 200 }}
                  onChange={(value) => secretariosFiltrados(value)}
                >
                  <Option value="">Todos os Pacientes</Option>
                  <Option value="PACIENTE">Pacientes</Option>
                </Select>
              </FiltroReceita>
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
          <BotaoMedico>
            <Button
              backgroundColor={Cores.cinza[7]}
              color={Cores.azul}
              width="50%"
              display="flex"
              height="50px"
              borderColor={Cores.azul}
              fontSize="1em"
              gap="1%"
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              widthMedia600="100%"
              onClick={() => passandoTipoParaCadastro("PACIENTE")}
            >
              Cadastrar Nova Receita
              <PlusCircleOutlined style={{ color: Cores.azul }} />
            </Button>
          </BotaoMedico>
        </TopoPagina>

        <BarraEstetica></BarraEstetica>
        <DadosReceita>
          <Titulo>Título</Titulo>
          <DataCriacao>Data de Criação</DataCriacao>
          <CódigoPaciente>Nome do Paciente</CódigoPaciente>
          <CaixaVazia></CaixaVazia>
        </DadosReceita>
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
            <ContainerReceitas>
              {receitas.map((value) => (
                <Receita key={value.id}>
                  <Titulo>{value.titulo}</Titulo>
                  <DataCriacao>{value.data_criacao}</DataCriacao>
                  <Nome>{value.nome}</Nome>
                  <BotaoAdicionar>
                    <Button
                      backgroundColor="transparent"
                      borderColor="transparent"
                      color={Cores.preto}
                      fontSize="1em"
                      textDecoration="underline"
                      height="50px"
                      onClick={() => abrindoModalCodigo(value.email)}
                    >
                      Editar Receita
                    </Button>
                  </BotaoAdicionar>
                </Receita>
              ))}
            </ContainerReceitas>
          </>
        )}
      </ContainerListadeReceitas>

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

export default AreaReceitas;
