import React, { useEffect, useState } from "react";
import Button from "../../styles/Button";
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
import { LoadingOutlined } from "@ant-design/icons";
import ModalAgendamentoEspecifico from "../ModalAgendamentoEspecifico";
import * as managerService from "../../services/ManagerService/managerService";
import { Modal, Spin } from "antd";

function ModalAgendamento(props) {
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [quantidadeAgendamentos, setQuantidadeAgendamentos] = useState();

  const [carregando, setCarregando] = useState(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: "#151B57" }} spin />
  );

  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoDados() {
    const respostaConsultas = await managerService.GetDadosConsultasExamesMarcados(
      props.id_usuario
    );
    setConsultas(respostaConsultas.dadosConsultas);
    setExamesMarcados(respostaConsultas.dadosExamesMarcados);

    let contador = 0;
    contador = respostaConsultas.dadosConsultas.length + respostaConsultas.dadosExamesMarcados.length;
    setQuantidadeAgendamentos(contador);

    setCarregando(false);
  }

  async function marcandoAgendamento() {
    setModalAgendamento(true);
  }

  async function fechandoModal() {
    setModalAgendamento(false);
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
                  </DiaHorarioAgendamento>
                </CaixaAgendamento>

                <BotoesEditarExcluir>
                  <Button
                    width="45%"
                    height="40px"
                    backgroundColor="green"
                    borderColor="#BBC0F4"
                    color="#8D8D8D"
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
                    backgroundColor="#FFFFFF"
                    borderColor="rgba(255, 0, 0, 0.25)"
                    color="#8D8D8D"
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
                    borderColor="#BBC0F4"
                    color="#8D8D8D"
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
                    backgroundColor="#FFFFFF"
                    borderColor="rgba(255, 0, 0, 0.25)"
                    color="#8D8D8D"
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
              backgroundColor="#A7ADE8"
              borderColor="#151B57"
              color="#0A0E3C"
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
        <ModalAgendamentoEspecifico emailUsuario={props.email} />
      </Modal>
    </Container>
  );
}

export default ModalAgendamento;