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
  InfoContato,
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
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { Modal } from "antd";
import logoGuilherme from "../../assets/logoGuilherme.png";
import Button from "../../styles/Button";
import { useHistory } from "react-router-dom";
import ModalAgendamento from "../../components/ModalAgendamento/ModalAgendamento";

function PerfilPaciente(props) {
  const history = useHistory();

  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: "#151B57" }} spin />
  );

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(
      props.location.state.email
    );
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setDataNascimento(data.toLocaleDateString());
    setEndereco(resposta.dadosEndereco);
    setCarregando(false);
  }
  async function deletarUsuario() {
    await managerService.DeletarUsuario(usuario.id);
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  async function marcandoAgendamento() {
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
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
                    <Data>{dataNascimento}</Data>
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
                <Botoes>
                  <Botao>
                    <Button
                      backgroundColor="green"
                      color="#0A0E3C"
                      fontWeight="bold"
                      borderColor="#0A0E3C"
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
                      color="#0A0E3C"
                      fontWeight="bold"
                      borderColor="#0A0E3C"
                      height="40px"
                      width="100%"
                      fontSize="1.3em"
                      onClick={() => marcandoAgendamento()}
                    >
                      Agendamentos
                    </Button>
                  </Botao>
                  <Botao>
                    <Button
                      backgroundColor="#A7ADE8"
                      color="#0A0E3C"
                      fontWeight="bold"
                      borderColor="#0A0E3C"
                      height="40px"
                      width="100%"
                      fontSize="1.3em"
                      fontSizeMedia=""
                      onClick={() => deletarUsuario()}
                    >
                      Excluir Paciente
                    </Button>
                  </Botao>
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
              <Formulario>
                <DadosFormulario>
                  <TituloFormulario>Título do Formulário</TituloFormulario>
                  <DataFormulario>xx/xx/2022</DataFormulario>
                  <TipoFormulario>Tipo:</TipoFormulario>
                  <UrgenciaFormulario>
                    <> Urgência: </>
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />
                  </UrgenciaFormulario>
                </DadosFormulario>
                <RespostaPendente>
                  <Resposta>Resposta Pendente</Resposta>
                  <Button
                    backgroundColor="green"
                    color="#0A0E3C"
                    fontWeight="bold"
                    borderColor="#0A0E3C"
                    height="40px"
                    width="25%"
                  >
                    ENVIAR LEMBRETE
                  </Button>
                </RespostaPendente>
              </Formulario>
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
                    color="black"
                    fontSize="1.5em"
                  >
                    Título
                  </TituloReceita>
                  <TituloReceita color="#434B97" fontSize="1.2em">
                    xx/xx/2022
                  </TituloReceita>
                </DadosReceita>
                <BotaoReceita>
                  <Button
                    backgroundColor="green"
                    color="#0A0E3C"
                    fontWeight="bold"
                    borderColor="#0A0E3C"
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
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamento id_usuario={usuario.id} email={usuario.email}/>
      </Modal>
    </div>
  );
}

export default PerfilPaciente;
