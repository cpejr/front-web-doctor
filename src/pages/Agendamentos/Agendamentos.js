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
} from "./Styles";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function Agendamentos() {
  const history = useHistory();
  const { Search } = Input;
  const [usuarios, setUsuarios] = useState([]);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [email, setEmail] = useState();
  const [codigo, setCodigo] = useState();
  const [carregando, setCarregando] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const abertoPeloUsuario = false;

  async function marcandoAgendamento(email) {
    setEmail(email);
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
  }

  async function pegandoDados() {
    const respostaConsultas =
      await managerService.GetDadosConsultasExamesMarcados();
    setConsultas(respostaConsultas.dadosConsultas);
    setExamesMarcados(respostaConsultas.dadosExamesMarcados);

    setCarregando(false);
  }

  async function abrindoPerfilPaciente(email) {
    
    history.push({
      pathname: "/web/perfildopaciente",
      state: { email },
    });
  }

  useEffect(() => {
    pegandoDados();
  }, [email]);

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
          <Data>Data</Data>
          <Agendamento>Agendamento</Agendamento>
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
        </DadosUsuario>
        <ContainerUsuarios>
          {consultas.map((value) => (
            <Usuario key={value.id_usuario}>
              <Imagem>{value.avatar_url}</Imagem>
              <Nome>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div
                    onClick={() =>
                    abrindoPerfilPaciente(value.email)
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
              <Data>
                {value.data_hora.slice(8, 10)}/{value.data_hora.slice(5, 7)}/
                {value.data_hora.slice(0, 4)} - {value.data_hora.slice(11, 16)}:
                {value.data_hora.slice(17, 19)}
              </Data>

              <Agendamento>Consulta</Agendamento>
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
                {value.data_hora.slice(8, 10)}/{value.data_hora.slice(5, 7)}/
                {value.data_hora.slice(0, 4)} - {value.data_hora.slice(11, 16)}:
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
        <BotaoNovoAgendamento>
          <Button
            width="48%"
            height="50px"
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azulEscuro}
            color={Cores.azul}
            fontSize="1.8em"
            fontWeight="bold"
            fontSizeMedia950="1em"
            fontSizeMedia1080="1.5em"
            gap="1%"
            onClick={() => marcandoAgendamento()}
          >
            Novo Agendamento <PlusCircleOutlined />
          </Button>
        </BotaoNovoAgendamento>
      </ContainerListadeUsuarios>

      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={email}
          abertoPeloUsuario={abertoPeloUsuario}
        />
      </Modal>
    </div>
  );
}

export default Agendamentos;
