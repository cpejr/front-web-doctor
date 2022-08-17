import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Input, Select, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  TopoPagina,
  ContainerListadeUsuarios,
  Filtros,
  FiltroDatas,
  FiltroUsuario,
  BarraPesquisa,
  BotaoNovoAgendamento,
  BarraEstetica,
  DadosUsuario,
  Titulo,
  ContainerUsuarios,
  Usuario,
  Imagem,
  Nome,
  Telefone,
  Data,
  Agendamento,
  CódigoPaciente,
  TopoPaginaEsquerda,
  TextoData,
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import ModalConsultaMarcada from "../../components/ModalConsultaMarcada";
import { Cores } from "../../variaveis";
import { compararDataAgendamentos } from "../../utils/tratamentoErros";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";

function Agendamentos() {
  const history = useHistory();
  const { Search } = Input;
  const [modalAgendamentoEspecifico, setModalAgendamentoEspecifico] =
    useState(false);
  const [email, setEmail] = useState();
  const [carregando, setCarregando] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [consultaEspecifica, setConsultaEspecifica] = useState([]);
  const [modalConsultaMarcada, setModalConsultaMarcada] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const antIconPagina = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const abertoPeloUsuario = false;

  async function pegandoDados() {
    setCarregandoPagina(true);
    setCarregando(true);
    await sleep(400);
    setConsultas([]);
    setExamesMarcados([]);
    const resposta =
      await managerService.GetDadosConsultasExamesMarcadosGeral();
    setConsultas(resposta.dadosConsultas);
    setExamesMarcados(resposta.dadosExamesMarcados);
    setCarregando(false);
    setCarregandoPagina(false)
  }

  useEffect(() => {
    pegandoDados();
  }, [email]);

  async function marcandoAgendamento(email) {
    setEmail(email);
    setModalAgendamentoEspecifico(true);
  }

  async function fechandoModalAgendamentoEspecifico() {
    setModalAgendamentoEspecifico(false);
    document.location.reload();
  }

  async function abrindoPerfilPaciente(email) {
    history.push({
      pathname: "/web/perfildopaciente",
      state: { email },
    });
  }

  async function fechandoModalConsultaMarcada() {
    setModalConsultaMarcada(false);
    pegandoDados();
    
  }

  async function abreModalConsultaMarcada(consulta) {
    setModalConsultaMarcada(true);
    setConsultaEspecifica(consulta);
  }

  return (
    <div>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <TopoPaginaEsquerda>
            <BarraPesquisa>
              <Search placeholder="BUSCAR" />
            </BarraPesquisa>
            <FiltroDatas>
              <Select
                defaultValue="Todas as datas"
                style={{ color: "green", width: "100%" }}
              ></Select>
            </FiltroDatas>
          </TopoPaginaEsquerda>
          <Button
            marginTop="0px"
            width="30%"
            height="50px"
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azulEscuro}
            color={Cores.azul}
            fontSize="1.8em"
            fontWeight="bold"
            fontSizeMedia950="1em"
            fontSizeMedia1080="1.5em"
            gap="1%"
            widthMedia="100%"
            onClick={() => marcandoAgendamento()}
          >
            Novo Agendamento <PlusCircleOutlined />
          </Button>
        </TopoPagina>
        <BarraEstetica></BarraEstetica>
        <DadosUsuario>
          <Titulo></Titulo>
          <Nome>Nome do Usuário</Nome>
          <Telefone>Telefone</Telefone>
          <Data>Data - Horário</Data>
          <Agendamento>Agendamento</Agendamento>
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
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
              {consultas.sort(compararDataAgendamentos).map((value) => (
                <Usuario key={value.id_usuario}>
                  <Imagem>{value.avatar_url}</Imagem>
                  <Nome>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div onClick={() => abrindoPerfilPaciente(value.email)}>
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
                  <Data>
                    {parseInt(value.data_hora.slice(11, 13)) < 12
                      ? value.data_hora.slice(8, 10) +
                        "/" +
                        value.data_hora.slice(5, 7) +
                        "/" +
                        value.data_hora.slice(0, 4) +
                        " - " +
                        parseInt(value.data_hora.slice(11, 13)) +
                        ":" +
                        value.data_hora.slice(14, 16) +
                        " am"
                      : value.data_hora.slice(8, 10) +
                        "/" +
                        value.data_hora.slice(5, 7) +
                        "/" +
                        value.data_hora.slice(0, 4) +
                        " - " +
                        parseInt(value.data_hora.slice(11, 13) - 12) +
                        ":" +
                        value.data_hora.slice(14, 16) +
                        " pm"}
                  </Data>

                  <Agendamento  onClick={() => abreModalConsultaMarcada(value)}>Consulta</Agendamento>
                  <CódigoPaciente>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.codigo}</div>
                    )}
                  </CódigoPaciente>
                </Usuario>
              ))}
              {examesMarcados.map((value) => (
                <Usuario key={value.id_usuario}>
                  <Imagem>{value.avatar_url}</Imagem>
                  <Nome>
                    {carregando ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div>{value.nome}</div>
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
                  <Data>
                    {value.data_hora.slice(8, 10)}/{value.data_hora.slice(5, 7)}
                    /{value.data_hora.slice(0, 4)} -{" "}
                    {value.data_hora.slice(11, 16)}:
                    {value.data_hora.slice(17, 19)}
                  </Data>

                  <Agendamento>{value.titulo}</Agendamento>
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
          </>
        )}
      </ContainerListadeUsuarios>

      <Modal
        visible={modalAgendamentoEspecifico}
        onCancel={() => fechandoModalAgendamentoEspecifico(false)}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={email}
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAgendamentoEspecifico()}
        />
      </Modal>

      <Modal
        visible={modalConsultaMarcada}
        onCancel={fechandoModalConsultaMarcada}
        footer={null}
        width={"auto"}
        centered={true}
        style={{
          backgroundColor: "black",
        }}
      >
        <ModalConsultaMarcada
          consulta={consultaEspecifica}
          fechandoModal={() => fechandoModalConsultaMarcada()}
        />
      </Modal>
    </div>
  );
}

export default Agendamentos;
