import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import {
  Container,
  Caixa,
  Titulo,
  CorpoCaixa,
  InfoEsquerda,
  InfoDireita,
  CaixaAgendamento,
  DiaHorarioAgendamento,
  Agendamento,
  TextoAgendamentoEspecifico,
  NumeroAgendamentos,
  BarraEstetica,
  BotoesEditarExcluir,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../ModalAgendamentoEspecifico";
import ModalEditarAgendamentoEspecifico from "../ModalEditarAgendamentoEspecifico";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAgendamento(props) {
  const [consultas, setConsultas] = useState([]);
  const [consultaEspecifica, setConsultaEspecifica] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [modalEditarAgendamento, setModalEditarAgendamento] = useState(false);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [quantidadeAgendamentos, setQuantidadeAgendamentos] = useState();
  const abertoPeloUsuario = true;
  const [carregando, setCarregando] = useState(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: Cores.azul }} spin />
  );

  async function pegandoDados() {
    const respostaConsultas =
      await managerService.GetDadosConsultasExamesMarcados(props.id_usuario);
    setConsultas(respostaConsultas.dadosConsultas);
    setExamesMarcados(respostaConsultas.dadosExamesMarcados);

    let contador = 0;
    contador =
      respostaConsultas.dadosConsultas.length +
      respostaConsultas.dadosExamesMarcados.length;
    setQuantidadeAgendamentos(contador);

    setCarregando(false);
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

  async function editandoAgendamento(consulta) {
    setModalEditarAgendamento(true);
    setConsultaEspecifica(consulta);
  }

  async function fechandoModalEditarAgendamento() {
    setModalEditarAgendamento(false);
    pegandoDados();
  }

  async function excluirConsulta(id) {
    await managerService.DeletarConsulta(id);
  }

  async function excluirExameMarcado(id) {
    await managerService.DeletarExameMarcado(id);
  }

  return (
    <Container>
      <Caixa>
        <Titulo>Agendamentos Marcados:</Titulo>

        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <CorpoCaixa>
            <InfoEsquerda>
              {consultas.map((value) => (
                <Agendamento>
                  <CaixaAgendamento key={value.id}>
                    <DiaHorarioAgendamento>
                      {value.data_hora.slice(8, -14)}/
                      {value.data_hora.slice(5, -17)}/
                      {value.data_hora.slice(0, -20)}
                    </DiaHorarioAgendamento>
                    <BarraEstetica></BarraEstetica>
                    <TextoAgendamentoEspecifico>
                      Consulta
                    </TextoAgendamentoEspecifico>
                    <BarraEstetica></BarraEstetica>
                    <DiaHorarioAgendamento>
                      {value.data_hora.slice(11, -11)}
                      {value.data_hora.slice(13, -8)}
                      {` - `}
                      {value.duracao_em_minutos} min
                    </DiaHorarioAgendamento>
                  </CaixaAgendamento>

                  <BotoesEditarExcluir>
                    <Button
                      width="45%"
                      height="40px"
                      backgroundColor={Cores.cinza[6]}
                      borderColor={Cores.lilas[3]}
                      color={Cores.cinza[2]}
                      fontSize="0.9em"
                      fontWeight="bold"
                      fontSizeMedia="0.8em"
                      fontSizeMedia950="1em"
                      heightMedia560="30px"
                      onClick={() => editandoAgendamento(value)}
                    >
                      EDITAR
                    </Button>
                    <Button
                      width="45%"
                      height="40px"
                      backgroundColor={Cores.branco}
                      borderColor="rgba(255, 0, 0, 0.25)"
                      color={Cores.cinza[1]}
                      fontSize="0.9em"
                      fontWeight="bold"
                      fontSizeMedia="0.8em"
                      fontSizeMedia950="1em"
                      heightMedia560="30px"
                      onClick={() => excluirConsulta(value.id)}
                    >
                      EXCLUIR
                    </Button>
                  </BotoesEditarExcluir>
                </Agendamento>
              ))}
              {examesMarcados.map((value) => (
                <Agendamento>
                  <CaixaAgendamento key={value.id}>
                    <DiaHorarioAgendamento>
                      {value.data_hora.slice(8, -14)}/
                      {value.data_hora.slice(5, -17)}/
                      {value.data_hora.slice(0, -20)}
                    </DiaHorarioAgendamento>
                    <BarraEstetica></BarraEstetica>
                    <TextoAgendamentoEspecifico>
                      {value.titulo}
                    </TextoAgendamentoEspecifico>
                    <BarraEstetica></BarraEstetica>
                    <DiaHorarioAgendamento>
                      {value.data_hora.slice(11, -11)}
                      {value.data_hora.slice(13, -8)}
                    </DiaHorarioAgendamento>
                  </CaixaAgendamento>

                  <BotoesEditarExcluir>
                    <Button
                      width="45%"
                      height="40px"
                      backgroundColor="green"
                      borderColor={Cores.lilas[3]}
                      color={Cores.cinza[1]}
                      fontSize="0.9em"
                      fontWeight="bold"
                      fontSizeMedia="0.8em"
                      fontSizeMedia950="1em"
                      heightMedia560="30px"
                    >
                      EDITAR
                    </Button>
                    <Button
                      width="45%"
                      height="40px"
                      backgroundColor={Cores.branco}
                      borderColor="rgba(255, 0, 0, 0.25)"
                      color={Cores.cinza[1]}
                      fontSize="0.9em"
                      fontWeight="bold"
                      fontSizeMedia="0.8em"
                      fontSizeMedia950="1em"
                      heightMedia560="30px"
                      onClick={() => excluirExameMarcado(value.id)}
                    >
                      EXCLUIR
                    </Button>
                  </BotoesEditarExcluir>
                </Agendamento>
              ))}
            </InfoEsquerda>

            <InfoDireita>
              <NumeroAgendamentos>
                O paciente ja realizou {quantidadeAgendamentos} agendamentos
              </NumeroAgendamentos>
              <Button
                width="100%"
                height="50px"
                backgroundColor={Cores.lilas[2]}
                borderColor={Cores.azul}
                color={Cores.azulEscuro}
                fontSize="1.1em"
                fontWeight="bold"
                fontSizeMedia="0.9em"
                fontSizeMedia950="1.1em"
                onClick={() => marcandoAgendamento()}
              >
                Cadastrar novo agendamento
              </Button>
            </InfoDireita>
          </CorpoCaixa>
        )}
      </Caixa>
      <Modal
        visible={modalAgendamento}
        onCancel={fechandoModal}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={props.email}
          abertoPeloUsuario={abertoPeloUsuario}
        />
      </Modal>

      <Modal
        visible={modalEditarAgendamento}
        onCancel={fechandoModalEditarAgendamento}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalEditarAgendamentoEspecifico
          emailUsuario={props.email}
          consulta={consultaEspecifica}
          fechandoModal={() => fechandoModalEditarAgendamento()}
        />
      </Modal>
    </Container>
  );
}

export default ModalAgendamento;
