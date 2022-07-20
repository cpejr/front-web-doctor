import React, { useState, useEffect } from "react";
import { Input, Select, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
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
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoEspecifico from "../../components/ModalAgendamentoEspecifico";
import { Cores } from "../../variaveis";
function Agendamentos () {
 
  const { Search } = Input;
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [email, setEmail] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [peloUsuario, setPeloUsuario] = useState(false); // informa que o modal agendamento especifico foi aberto por meio da página de agendamentos

  useEffect(() => {
    pegandoDados();
  }, [email]);

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

              <Agendamento>Consulta</Agendamento>
              <CódigoPaciente>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <div>XXXXXX-XXXXX</div>
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
                  <div>XXXXXX-XXXXX</div>
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
        <ModalAgendamentoEspecifico emailUsuario={email} peloUsuario = {peloUsuario}/> 
      </Modal>
    </div>
  );
}

export default Agendamentos ;
