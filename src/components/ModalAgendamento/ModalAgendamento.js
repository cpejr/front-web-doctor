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
  DiaAgendamento,
  HorarioAgendamento,
  Agendamento,
  TextoAgendamentoEspecifico,
  NumeroAgendamentos,
  BarraEstetica,
  BotoesEditarExcluir,
} from "./Styles";
import ModalAgendamentoEspecifico from "../ModalAgendamentoEspecifico";
import * as managerService from "../../services/ManagerService/managerService";
// import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";

function ModalAgendamento(props) {
  //   const { TextArea } = Input;
  //   const { Option } = Select;
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [exame, setExame] = useState([]);
  const [modalAgendamento, setModalAgendamento] = useState(false);
  //   const [carregando, setCarregando] = useState();
  //   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoDados() {
    const respostaConsultas = await managerService.GetDadosConsultas(
      props.id_usuario
    );
    const respostaExames = await managerService.GetDadosExamesMarcados(
      props.id_usuario
    );

    console.log(respostaExames);
    setConsultas(respostaConsultas);
    setExamesMarcados(respostaExames);
  }

  async function pegandoNomeExames(id_exame) {
    const respostaExame = await managerService.GetDadosExame(id_exame);
    setExame(respostaExame[0].titulo);
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

        <CorpoCaixa>
          <InfoEsquerda>
            {consultas.map((value) => (
              <Agendamento>
                <CaixaAgendamento key={value.id}>
                  <DiaAgendamento>
                    {value.data_hora.slice(8, -14)}/
                    {value.data_hora.slice(5, -17)}/
                    {value.data_hora.slice(0, -20)}
                  </DiaAgendamento>
                  <BarraEstetica></BarraEstetica>
                  <TextoAgendamentoEspecifico>
                    Consulta
                  </TextoAgendamentoEspecifico>
                  <BarraEstetica></BarraEstetica>
                  <HorarioAgendamento>
                    {value.data_hora.slice(11, -11)}
                    {value.data_hora.slice(13, -8)}
                  </HorarioAgendamento>
                </CaixaAgendamento>

                <BotoesEditarExcluir>
                  <Button
                    width="45%"
                    height="40px"
                    backgroundColor="#EFEFEF"
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
          </InfoEsquerda>

          <InfoDireita>
            <NumeroAgendamentos>
              O paciente ja realizou 10 agendamentos
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
