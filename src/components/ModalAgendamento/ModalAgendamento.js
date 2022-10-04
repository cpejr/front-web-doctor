import React, { useEffect, useState } from 'react';
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
} from './Styles';
import { Cores } from '../../variaveis';
import Button from '../../styles/Button';
import ModalAgendamentoEspecifico from '../ModalAgendamentoEspecifico';
import ModalEditarAgendamentoEspecifico from '../ModalEditarAgendamentoEspecifico';
import ModalConsultaMarcada from '../ModalConsultaMarcada';
import ModalExameMarcado from '../ModalExameMarcado';
import { compararDataAntiga } from '../../utils/tratamentoErros';
import * as managerService from '../../services/ManagerService/managerService';
import { sleep } from '../../utils/sleep';

function ModalAgendamento(props) {
  const [consultas, setConsultas] = useState([]);
  const [consultaEspecifica, setConsultaEspecifica] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [exameEspecifico, setExameEspecifico] = useState([]);
  const [modalEditarAgendamento, setModalEditarAgendamento] = useState(false);
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
    pegandoDados();
  }

  async function editandoAgendamento(consulta) {
    setModalEditarAgendamento(true);
    setConsultaEspecifica(consulta);
  }

  async function abreModalConsultaMarcada(consulta) {
    setModalConsultaMarcada(true);
    setConsultaEspecifica(consulta);
  }

  async function abreModalExameMarcado(exame) {
    setModalExameVisivel(true);
    setExameEspecifico(exame);
  }

  async function fechandoModalEditarAgendamento() {
    setModalEditarAgendamento(false);
    pegandoDados();
  }

  async function fechandoModalConsultaMarcada() {
    setModalConsultaMarcada(false);
    pegandoDados();
  }

  async function fechandoModalExameMarcado() {
    setModalExameVisivel(false);
    pegandoDados();
  }

  async function excluirConsulta(id) {
    await managerService.DeletarConsulta(id);
    pegandoDados();
  }

  async function excluirExameMarcado(id) {
    await managerService.DeletarExameMarcado(id);
    pegandoDados();
  }

  return (
    <Container>
      <Caixa>
        {tipoAgendamento === 'Consulta' ? (
          <Titulo>Consultas Marcadas:</Titulo>
        ) : (
          <Titulo>Exames Marcados:</Titulo>
        )}

        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <CorpoCaixa>
            <InfoEsquerda>
              {tipoAgendamento === 'Consulta' && (
                <>
                  {consultas.sort(compararDataAntiga).map((value) => (
                    <Agendamento>
                      <CaixaAgendamento key={value.id}>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalConsultaMarcada(value)}
                        >
                          {value.data_hora.slice(8, -14)}/
                          {value.data_hora.slice(5, -17)}/
                          {value.data_hora.slice(0, -20)}
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
                          {value.data_hora.slice(11, -11)}
                          {value.data_hora.slice(13, -8)}
                          {` - `}
                          {value.duracao_em_minutos} min
                        </DiaHorarioAgendamento>
                      </CaixaAgendamento>

                      <BotoesEditarExcluir>
                        <Button
                          width='45%'
                          height='40px'
                          backgroundColor={Cores.cinza[6]}
                          borderColor={Cores.lilas[3]}
                          color={Cores.cinza[2]}
                          fontSize='0.9em'
                          fontWeight='bold'
                          fontSizeMedia='0.8em'
                          fontSizeMedia950='1em'
                          heightMedia560='30px'
                          onClick={() => editandoAgendamento(value)}
                        >
                          EDITAR
                        </Button>
                        <Button
                          width='45%'
                          height='40px'
                          backgroundColor={Cores.branco}
                          borderColor='rgba(255, 0, 0, 0.25)'
                          color={Cores.cinza[1]}
                          fontSize='0.9em'
                          fontWeight='bold'
                          fontSizeMedia='0.8em'
                          fontSizeMedia950='1em'
                          heightMedia560='30px'
                          onClick={() => excluirConsulta(value.id)}
                        >
                          EXCLUIR
                        </Button>
                      </BotoesEditarExcluir>
                    </Agendamento>
                  ))}
                </>
              )}
              {tipoAgendamento === 'Exame' && (
                <>
                  {examesMarcados.sort(compararDataAntiga).map((value) => (
                    <Agendamento>
                      <CaixaAgendamento key={value.id}>
                        <DiaHorarioAgendamento
                          onClick={() => abreModalExameMarcado(value)}
                        >
                          {value.data_hora.slice(8, -14)}/
                          {value.data_hora.slice(5, -17)}/
                          {value.data_hora.slice(0, -20)}
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
                          {value.data_hora.slice(11, -11)}
                          {value.data_hora.slice(13, -8)}
                        </DiaHorarioAgendamento>
                      </CaixaAgendamento>

                      <BotoesEditarExcluir>
                        <Button
                          width='45%'
                          height='40px'
                          backgroundColor='green'
                          borderColor={Cores.lilas[3]}
                          color={Cores.cinza[1]}
                          fontSize='0.9em'
                          fontWeight='bold'
                          fontSizeMedia='0.8em'
                          fontSizeMedia950='1em'
                          heightMedia560='30px'
                        >
                          EDITAR
                        </Button>
                        <Button
                          width='45%'
                          height='40px'
                          backgroundColor={Cores.branco}
                          borderColor='rgba(255, 0, 0, 0.25)'
                          color={Cores.cinza[1]}
                          fontSize='0.9em'
                          fontWeight='bold'
                          fontSizeMedia='0.8em'
                          fontSizeMedia950='1em'
                          heightMedia560='30px'
                          onClick={() => excluirExameMarcado(value.id)}
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
                {tipoAgendamento === 'Consulta' ? (
                  <>
                    {consultas.length === 1 ? (
                      <>O paciente agendou {consultas.length} consulta</>
                    ) : (
                      <>O paciente agendou {examesMarcados.length} consultas</>
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
                width='100%'
                height='50px'
                backgroundColor={Cores.lilas[2]}
                borderColor={Cores.azul}
                color={Cores.azulEscuro}
                fontSize='1.1em'
                fontWeight='bold'
                fontSizeMedia='0.9em'
                fontSizeMedia950='1.1em'
                marginTop='18%'
                marginTopMedia='4%'
                onClick={() => marcandoAgendamento()}
              >
                Cadastrar novo agendamento
              </Button>
            </InfoDireita>
          </CorpoCaixa>
        )}
      </Caixa>
      <Modal
        visible={modalAgendamentoEspecifico}
        onCancel={() => setModalAgendamentoEspecifico(false)}
        width={'70%'}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={props.email}
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAgendamentoEspecifico()}
        />
      </Modal>

      <Modal
        visible={modalEditarAgendamento}
        onCancel={fechandoModalEditarAgendamento}
        width={'70%'}
        centered={true}
      >
        <ModalEditarAgendamentoEspecifico
          emailUsuario={props.email}
          consulta={consultaEspecifica}
          fechandoModal={() => fechandoModalEditarAgendamento()}
        />
      </Modal>

      <Modal
        visible={modalConsultaMarcada}
        onCancel={fechandoModalConsultaMarcada}
        width={'auto'}
        centered={true}
      >
        <ModalConsultaMarcada
          consulta={consultaEspecifica}
          fechandoModal={() => fechandoModalConsultaMarcada()}
        />
      </Modal>

      <Modal
        visible={modalExameVisivel}
        onCancel={fechandoModalExameMarcado}
        width={'auto'}
        centered={true}
      >
        <ModalExameMarcado
          exame={exameEspecifico}
          fechandoModal={() => fechandoModalExameMarcado()}
        />
      </Modal>
    </Container>
  );
}

export default ModalAgendamento;
