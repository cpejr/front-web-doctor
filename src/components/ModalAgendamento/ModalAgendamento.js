import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
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
  Modal,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import ModalAgendamentoEspecifico from "../ModalAgendamentoEspecifico";
import ModalConsultaMarcada from "../ModalConsultaMarcada";
import ModalExameMarcado from "../ModalExameMarcado";
import { compararDataAntiga } from "../../utils/tratamentoErros";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";
import formatarData from "../../utils/formatarData";
import ModalEditarConsulta from "../ModalEditarConsulta";
import ModalEditarExame from "../ModalEditarExame";

function ModalAgendamento(props) {
  const [consultas, setConsultas] = useState([]);
  const [consultaEspecifica, setConsultaEspecifica] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [exameEspecifico, setExameEspecifico] = useState([]);
  const [modalEditarConsulta, setModalEditarConsulta] = useState(false);
  const [modalEditarExame, setModalEditarExame] = useState(false);
  const [modalConsultaMarcada, setModalConsultaMarcada] = useState(false);
  const [modalExameVisivel, setModalExameVisivel] = useState(false);
  const [modalAgendamentoEspecifico, setModalAgendamentoEspecifico] =
    useState(false);
  const [quantidadeAgendamentos, setQuantidadeAgendamentos] = useState();
  const abertoPeloUsuario = true;
  const [tipoAgendamento, setTipoAgendamento] = useState(props.tipoAgendamento);
  const [carregando, setCarregando] = useState(true);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 45, color: Cores.azul }} spin />
  );

  async function pegandoDados() {
    setCarregando(true);
    setConsultas([]);
    setExamesMarcados([])
    await sleep(400);
    setExamesMarcados([]);
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
    setModalAgendamentoEspecifico(true);
  }

  async function fechandoModalAgendamentoEspecifico() {
    setModalAgendamentoEspecifico(false);
    pegandoDados()
  }

  async function editandoAgendamento(agendamento, tipo) {
    if (tipo === "consulta") {
      setModalEditarConsulta(true);
      setConsultaEspecifica(agendamento);
    } else if (tipo === "exame") {
      setModalEditarExame(true);
      setExameEspecifico(agendamento);
    }
  }

  async function abreModalConsultaMarcada(consulta) {
    setModalConsultaMarcada(true);
    setConsultaEspecifica(consulta);
  }

  async function abreModalExameMarcado(exame) {
    setModalExameVisivel(true);
    setExameEspecifico(exame);
  }

  async function fechandoModalEditarAgendamento(tipo) {
    if (tipo === "consulta") {
      setModalEditarConsulta(false);
    } else if (tipo === "exame") {
      setModalEditarExame(false);
    }
    pegandoDados()
  }

  async function fechandoModalConsultaMarcada() {
    setModalConsultaMarcada(false);
  }

  async function fechandoModalExameMarcado() {
    setModalExameVisivel(false);
    pegandoDados();
  }

  async function excluirConsulta(id, consulta) {
    await managerService.DeletarConsulta(id);
    const Token =
      await managerService.TokenById(consulta);
    for (var i = 0; i <= Token.length - 1; i++) {
      const Message = {
        to: Token[i].token_dispositivo.replace("expo/", ''),
        sound: 'default',
        title: 'Doctor App',
        body: 'Sua consulta foi desmarcada!',

      };
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        body: JSON.stringify(Message),
      }
      );
    }
    pegandoDados();
  }

  async function excluirExameMarcado(exame) {
    await managerService.DeletarExameMarcado(exame.id);
    const Token =
    await managerService.TokenById(exame.id_usuario);
    for (var i = 0; i <= Token.length - 1; i++) {
      const Message = {
        to: Token[i].token_dispositivo.replace("expo/", ''),
        sound: 'default',
        title: 'Doctor App',
        body: 'Seu exame foi desmarcado!',

      };
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        body: JSON.stringify(Message),
      }
      );
    }
    pegandoDados();
  }

  return (
    <Container>
      <Caixa>
        {tipoAgendamento === "Consulta" ? (
          <Titulo>Consultas Marcadas:</Titulo>
        ) : (
          <Titulo>Exames Marcados:</Titulo>
        )}

        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <CorpoCaixa>
            <InfoEsquerda>
              {tipoAgendamento === "Consulta" && (
                <>
                  {consultas.sort(compararDataAntiga).map((value) => (
                    <Agendamento>
                      <CaixaAgendamento key={value.id}>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalConsultaMarcada(value)}
                        >
                          {formatarData({
                            data: value.data_hora,
                            formatacao: "dd/MM/yyyy",
                          })}
                        </DiaHorarioAgendamento>
                        <BarraEstetica></BarraEstetica>
                        <TextoAgendamentoEspecifico
                          onClick={() => abreModalConsultaMarcada(value)}
                        >
                          Consulta
                        </TextoAgendamentoEspecifico>
                        <BarraEstetica></BarraEstetica>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalConsultaMarcada(value)}
                        >
                          {formatarData({
                            data: value.data_hora,
                            formatacao: "HH:mm",
                          })}
                          {` - `}
                          {value.duracao_em_minutos} min
                        </DiaHorarioAgendamento>
                      </CaixaAgendamento>

                      <BotoesEditarExcluir>
                        <Button
                          width="48%"
                          height="40px"
                          backgroundColor={Cores.cinza[6]}
                          borderColor={Cores.lilas[3]}
                          color={Cores.cinza[2]}
                          fontSize="0.9em"
                          fontWeight="bold"
                          fontSizeMedia="0.8em"
                          fontSizeMedia950="1em"
                          heightMedia560="30px"
                          onClick={() => editandoAgendamento(value, "consulta")}
                        >
                          EDITAR
                        </Button>
                        <Button
                          width="48%"
                          height="40px"
                          backgroundColor={Cores.branco}
                          borderColor="rgba(255, 0, 0, 0.25)"
                          color={Cores.cinza[1]}
                          fontSize='0.9em'
                          fontWeight='bold'
                          fontSizeMedia='0.8em'
                          fontSizeMedia950='1em'
                          heightMedia560='30px'
                          onClick={() => excluirConsulta(value.id, value.id_usuario)}
                        >
                          EXCLUIR
                        </Button>
                      </BotoesEditarExcluir>
                    </Agendamento>
                  ))}
                </>
              )}
              {tipoAgendamento === "Exame" && (
                <>
                  {examesMarcados.sort(compararDataAntiga).map((value) => (
                    <Agendamento>
                      <CaixaAgendamento key={value.id}>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalExameMarcado(value)}
                        >
                          {formatarData({
                            data: value.data_hora,
                            formatacao: "dd/MM/yyyy",
                          })}
                        </DiaHorarioAgendamento>
                        <BarraEstetica></BarraEstetica>
                        <TextoAgendamentoEspecifico
                          onClick={() => abreModalExameMarcado(value)}
                        >
                          {value.titulo}
                        </TextoAgendamentoEspecifico>
                        <BarraEstetica></BarraEstetica>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalExameMarcado(value)}
                        >
                          {formatarData({
                            data: value.data_hora,
                            formatacao: "HH:mm",
                          })}
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
                          onClick={() => editandoAgendamento(value, "exame")}
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
                          onClick={() => excluirExameMarcado(value)}
                        >
                          EXCLUIR
                        </Button>
                      </BotoesEditarExcluir>
                    </Agendamento>
                  ))}
                </>
              )}
            </InfoEsquerda>

            <InfoDireita>
              <NumeroAgendamentos>
                {tipoAgendamento === "Consulta" ? (
                  <>
                    {consultas.length === 1 ? (
                      <>O paciente agendou {consultas.length} consulta</>
                    ) : (
                      <>O paciente agendou {consultas.length} consultas</>
                    )}
                  </>
                ) : (
                  <>
                    {examesMarcados.length === 1 ? (
                      <>O paciente agendou {examesMarcados.length} exame</>
                    ) : (
                      <>O paciente agendou {examesMarcados.length} exames</>
                    )}
                  </>
                )}
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
                heightMedia560="73px"
                marginTop="18%"
                marginTopMedia="4%"
                onClick={() => marcandoAgendamento()}
              >
                Cadastrar novo agendamento
              </Button>
            </InfoDireita>
          </CorpoCaixa>
        )}
      </Caixa>
      <Modal
        destroyOnClose
        visible={modalAgendamentoEspecifico}
        onCancel={() => setModalAgendamentoEspecifico(false)}
        width={"70%"}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={props.email}
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAgendamentoEspecifico()}
        />
      </Modal>

      <Modal
        destroyOnClose
        visible={modalEditarConsulta}
        onCancel={() => fechandoModalEditarAgendamento("consulta")}
        width={"70%"}
        centered={true}
      >
        <ModalEditarConsulta
          emailUsuario={props.email}
          consulta={consultaEspecifica}
          fechandoModal={() => fechandoModalEditarAgendamento("consulta")}
        />
      </Modal>
      <Modal
        destroyOnClose
        visible={modalEditarExame}
        onCancel={() => fechandoModalEditarAgendamento("exame")}
        width={"70%"}
        centered={true}
      >
        <ModalEditarExame
          emailUsuario={props.email}
          exame={exameEspecifico}
          fechandoModal={() => fechandoModalEditarAgendamento("exame")}
        />
      </Modal>

      <Modal
        visible={modalConsultaMarcada}
        onCancel={fechandoModalConsultaMarcada}
        width={"auto"}
        centered={true}
      >
        <ModalConsultaMarcada
          consulta={consultaEspecifica}
          email={props.email}
          fechandoModal={() => fechandoModalConsultaMarcada()}
        />
      </Modal>

      <Modal
        visible={modalExameVisivel}
        onCancel={fechandoModalExameMarcado}
        width={"auto"}
        centered={true}
      >
        <ModalExameMarcado
          exame={exameEspecifico}
          email={props.email}
          fechandoModal={() => fechandoModalExameMarcado()}
        />
      </Modal>
    </Container>
  );
}

export default ModalAgendamento;
