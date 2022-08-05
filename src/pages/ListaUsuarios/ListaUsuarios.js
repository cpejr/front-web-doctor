import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  const abertoPeloUsuario = true;
  const [contador, setContador] = useState(0);
  const [consultas, setConsultas] = useState([]);
  

  const lowerBusca = busca.toLowerCase();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
    if (contador < 1){
      const resposta = await managerService.GetDadosPessoais();
      if (tipoUsuarioLogado === "MASTER") {
        resposta.forEach((usuario) => {
          if ((usuario.tipo === "PACIENTE") || (usuario.tipo === "SECRETARIA(O)")) {
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
    }
    setContador(contador + 1);
  }

  async function pegandoDadosConsultas() {
    const resposta =
      await managerService.GetDadosConsultasExamesMarcadosGeral();
    setConsultas(resposta.dadosConsultas);

  }

  function comparaData(a, b) {

    var data1 = new Date(a.data_hora);
    var data2 = new Date(b.data_hora);

    if (data1 > data2) {
      return 1;
    }
    else {
      return -1;
    }

  }

  function comparaNomes(a, b) {

    var nome1 = a.nome.toUpperCase();
    var nome2 = b.nome.toUpperCase();

    if (nome1 > nome2) {
      return 1;
    }
    else {
      return -1;
    }
  }

  useEffect(() => {
    pegandoDadosUsuarios();
    pegandoDadosConsultas();
    setandoUltimaConsulta();

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

  async function fechandoModalCodigo(){
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


    async function setandoUltimaConsulta(){
      consultas.sort(comparaData);
      usuariosFiltrados.forEach((usuario) => {
        let dataHora = []
        consultas.forEach((consulta) => {
          if(consulta.id_usuario === usuario.id){ 
            dataHora.push(consulta.data_hora); //funcionando
          }
        })
        usuario.ultimaConsulta = dataHora[dataHora.length];

        for(var i = 0; i < dataHora.length; i++){
          if (new Date(dataHora[i]) > new Date()){
            let aux = dataHora[i - 1];
            usuario.ultimaConsulta = aux;
            return;
          }
        }
        if(dataHora.length != 0 && usuario.ultimaConsulta == undefined){
          let aux = dataHora[dataHora.length - 1];
          console.log(usuario.nome);
          console.log(aux);
          console.log("=-=-=-=-=-=");
          usuario.ultimaConsulta = aux;

        }
      })
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
          {usuarios.sort(comparaNomes).map((value) => (
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
              {value.ultimaConsulta === undefined ? 
                (
                  <UltimaVisita> - </UltimaVisita>
                ) : (
                   <UltimaVisita> 
                        {value.ultimaConsulta.slice(8, 10) + "/" +  value.ultimaConsulta.slice(5, 7) + "/" +  value.ultimaConsulta.slice(0, 4)}
                  </UltimaVisita>
                )
              }

              <CódigoPaciente>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <>{value.codigo}</>
                )}
              </CódigoPaciente>
                {tipoUsuarioLogado === "MASTER"? (
                  <BotaoAdicionar>
                    {value.tipo === "PACIENTE"? (
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
                    ):(
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
        <ModalAdicionarCodigo emailUsuario={email} fechandoModal = {() => fechandoModalCodigo()}/>
      </Modal>
    </div>
  );
}

export default ListaUsuarios;
