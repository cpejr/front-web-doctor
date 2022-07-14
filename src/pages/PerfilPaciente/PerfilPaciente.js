import React, { useState, useEffect } from "react";
import {
  ContainerPerfil,
  Perfil,
  Formularios,
  Receitas,
  PerfilSuperior,
  PerfilInferior,
  FotoPerfil,
  Dados,
  Nome,
  Data,
  PerfilEsquerda,
  PerfilDireita,
  Titulo,
  Botoes,
  Botao,
  Formulario,
  DadosFormulario,
  DadosContato,
  DadosGeo,
  DadosPaciente,
  InfoContato,
  InfoDadosPaciente,
  Receita,
  BotaoReceita,
  DadosReceita,
  TituloFormulario,
  RespostaPendente,
  Resposta,
  TituloReceita,
  DataFormulario,
  TipoFormulario,
  UrgenciaFormulario,
  ContainerModalExcluir,
  ConteudoModalExcluir,
  ContainerFooterModalExcluir,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { Modal } from "antd";
import logoGuilherme from "../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import { useHistory } from "react-router-dom";
import ModalAgendamento from "../../components/ModalAgendamento/ModalAgendamento";
import { Cores } from "../../variaveis";
import AddToast from "../../components/AddToast/AddToast";
import { recebeTipo, usuarioAutenticado } from "../../services/auth";
import { toast } from "react-toastify";
import ModalExcluirUsuario from "../../components/ModalExcluirUsuario";
import { redirecionamento, sleep } from "../../utils/sleep";
import ModalFormulario from "../../components/ModalFormulario";

function PerfilPaciente(props) {
  const history = useHistory();

  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [modalFormulario, setModalFormulario] = useState(false);
  const [modalDeletarUsuario, setModalDeletarUsuario] = useState(false);
  const [idFormularioPaciente, setIdFormularioPaciente] = useState();
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [respostas, setRespostas] = useState([]);
  const [perguntas, setPerguntas] = useState();
  const [titulo, setTitulo] = useState();
  const [cpf, setCpf] = useState();
  const [codigo, setCodigo] = useState();
  const [carregandoDeletar, setCarregandoDeletar] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );
  const antIconModal = (
    <LoadingOutlined style={{ fontSize: 15, color: Cores.azul }} spin />
  );

  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(
      props.location.state.email
    );
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(formatarCpf(resposta.dadosUsuario.cpf));
    setCodigo(resposta.dadosUsuario.codigo);
    setDataNascimento(data.toLocaleDateString());
    setEndereco(resposta.dadosEndereco);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoListaFormularios();
  }, [usuario]);

  async function pegandoListaFormularios() {
    const resposta = await managerService.GetRespostaFormularioIdUsuario(
      usuario.id
    );
    setRespostas(resposta);
  }

  async function deletarUsuario() {
    if (usuarioAutenticado() && recebeTipo() === "MASTER") {
      setCarregandoDeletar(true);
      await managerService.DeletarUsuario(usuario.id);
      setModalDeletarUsuario(false);
      await sleep(3000);
      redirecionamento("/web/listadeusuarios");
      setCarregandoDeletar(false);
    } else {
      toast.error("Usuário não autenticado.");
      await sleep(3000);
      redirecionamento("/login");
    }
  }

  async function marcandoAgendamento() {
    setModalAgendamento(true);
  }

  async function fechandoModalAgendamento() {
    setModalAgendamento(false);
  }

  function fechandoModalDeletarUsuario() {
    setModalDeletarUsuario(false);
  }

  async function abrindoModalFormulario(id, perguntas, titulo) {
    setPerguntas(perguntas);
    setTitulo(titulo);
    setIdFormularioPaciente(id);
    setModalFormulario(true);
  }

  function formatarCpf(cpf) {
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
 }

  return (
    <div>
      <ContainerPerfil>
        <Perfil>
          {carregando ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <PerfilEsquerda>
                <PerfilSuperior>
                  <FotoPerfil>
                    <img
                      src={logoGuilherme}
                      className="foto"
                      alt="logoGuilherme"
                    ></img>
                  </FotoPerfil>
                  <Dados>
                    <Nome>{usuario.nome}</Nome>
                    <Data> Data de Nasc.: {dataNascimento}</Data>
                  </Dados>
                </PerfilSuperior>
                <PerfilInferior>
                  <Titulo>Endereço</Titulo>
                  <DadosGeo>País: {endereco.pais}</DadosGeo>
                  <DadosGeo>Estado: {endereco.estado}</DadosGeo>
                  <DadosGeo>Cidade: {endereco.cidade}</DadosGeo>
                  <DadosGeo>CEP: {endereco.cep}</DadosGeo>
                  <DadosGeo>Rua: {endereco.rua}</DadosGeo>
                  <DadosGeo>Número: {endereco.numero}</DadosGeo>
                  <DadosGeo>Complemento: {endereco.complemento}</DadosGeo>
                </PerfilInferior>
              </PerfilEsquerda>
              <PerfilDireita>
                <DadosContato>
                  <Titulo>Contato</Titulo>
                  <InfoContato>
                    ({telefone.slice(0, -9)}) {telefone.slice(2, -4)}-
                    {telefone.slice(-4)}
                  </InfoContato>
                  <InfoContato textDecoration="underline">
                      {usuario.email}
                  </InfoContato>
                </DadosContato>
                <DadosPaciente>
                  <Titulo>Dados</Titulo>
                  <InfoDadosPaciente>
                    CPF: {cpf}
                  </InfoDadosPaciente>
                  <InfoDadosPaciente>Código: {usuario.codigo}</InfoDadosPaciente>
                </DadosPaciente>
                <Botoes>
                  <Botao>
                    <Button
                      backgroundColor="green"
                      color={Cores.azulEscuro}
                      fontWeight="bold"
                      borderColor={Cores.azulEscuro}
                      height="40px"
                      width="100%"
                      fontSize="1.3em"
                    >
                      Iniciar Conversa
                    </Button>
                  </Botao>
                  <Botao>
                    <Button
                      backgroundColor="green"
                      color={Cores.azulEscuro}
                      fontWeight="bold"
                      borderColor={Cores.azulEscuro}
                      height="40px"
                      width="100%"
                      fontSize="1.3em"
                      onClick={() => marcandoAgendamento()}
                    >
                      Agendamentos
                    </Button>
                  </Botao>
                  {recebeTipo() === "MASTER" && (
                    <Botao>
                      <Button
                        backgroundColor={Cores.lilas[2]}
                        color={Cores.azulEscuro}
                        fontWeight="bold"
                        borderColor={Cores.azulEscuro}
                        height="40px"
                        width="100%"
                        fontSize="1.3em"
                        fontSizeMedia=""
                        onClick={() => setModalDeletarUsuario(true)}
                      >
                        Excluir Usuário
                      </Button>
                    </Botao>
                  )}
                </Botoes>
              </PerfilDireita>
            </>
          )}
        </Perfil>
        <Formularios>
          {carregando ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <Titulo>FORMULÁRIOS</Titulo>
              {respostas?.map((value) => (
                <Formulario>
                  <DadosFormulario>
                    <TituloFormulario
                      onClick={() =>
                        abrindoModalFormulario(
                          value.id,
                          value.perguntas,
                          value.titulo
                        )
                      }
                    >
                      {value.titulo}
                    </TituloFormulario>
                    <TipoFormulario>Tipo: {value.tipo}</TipoFormulario>
                    <UrgenciaFormulario>
                      <>Urgência: </>
                      {value.urgencia === 1 ? (
                        <>
                          <StarOutlined />
                          <StarOutlined />
                          <StarFilled />
                        </>
                      ) : value.urgencia === 2 ? (
                        <>
                          <StarOutlined />
                          <StarFilled />
                          <StarFilled />
                        </>
                      ) : (
                        <>
                          <StarFilled />
                          <StarFilled />
                          <StarFilled />
                        </>
                      )}
                    </UrgenciaFormulario>
                  </DadosFormulario>
                  {value.status === true ? (
                    <></>
                  ) : (
                    <RespostaPendente>
                      <Resposta>Resposta Pendente</Resposta>
                      <Button
                        backgroundColor="green"
                        color={Cores.azulEscuro}
                        fontWeight="bold"
                        borderColor={Cores.azulEscuro}
                        height="40px"
                        width="25%"
                      >
                        ENVIAR LEMBRETE
                      </Button>
                    </RespostaPendente>
                  )}
                </Formulario>
              ))}
            </>
          )}
        </Formularios>
        <Receitas>
          {carregando ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <Titulo>RECEITAS</Titulo>
              <Receita>
                <DadosReceita>
                  <TituloReceita
                    textDecoration="underline"
                    color={Cores.preto}
                    fontSize="1.5em"
                  >
                    Título
                  </TituloReceita>
                  <TituloReceita color={Cores.lilas[1]} fontSize="1.2em">
                    xx/xx/2022
                  </TituloReceita>
                </DadosReceita>
                <BotaoReceita>
                  <Button
                    backgroundColor="green"
                    color={Cores.azulEscuro}
                    fontWeight="bold"
                    borderColor={Cores.azulEscuro}
                    height="40px"
                    width="25%"
                  >
                    DOWNLOAD
                  </Button>
                </BotaoReceita>
              </Receita>
            </>
          )}
        </Receitas>
      </ContainerPerfil>

      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModalAgendamento}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamento id_usuario={usuario.id} email={usuario.email} />
      </Modal>

      <Modal
        visible={modalDeletarUsuario}
        onCancel={() => setModalDeletarUsuario(false)}
        style={{ maxWidth: "450px", minWidth: "250px" }}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalExcluirUsuario
          usuario={usuario}
          fecharModal={() => fechandoModalDeletarUsuario()}
        />
      </Modal>

      <Modal
        visible={modalFormulario}
        onCancel={() => setModalFormulario(false)}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalFormulario
          idFormularioPaciente={idFormularioPaciente}
          perguntas={perguntas}
          titulo={titulo}
        />
      </Modal>

      <AddToast />
    </div>
  );
}

export default PerfilPaciente;
