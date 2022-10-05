import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import {
  Caixa,
  CaixaInformações,
  CaixaNome,
  Container,
  FotoPerfil,
  Texto,
  TextoDescricao,
  TextoInformacoes,
} from './Styles';
import logoGuilherme from '../../assets/logoGuilherme.png';
import { Cores } from '../../variaveis';
import { sleep } from '../../utils/sleep';
import * as managerService from '../../services/ManagerService/managerService';

function ModalExameMarcado(props) {
  const [exame, setExame] = useState({});
  const [carregando, setCarregando] = useState();
  const [dataHora, setDataHora] = useState('');
  const [dataEnvio, setDataEnvio] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [consultorio, setConsultorio] = useState('');
  const [comparaDescricao, setComparaDescricao] = useState(false);
  const [estaDisponivel, setEstaDisponivel] = useState();
  const [estaAtrasado, setEstaAtrasado] = useState();
  const [dispositivo, setDispositivo] = useState('');
  const idUsuario = props.exame.id_usuario;
  const [usuario, setUsuario] = useState({});
  const [fotoDePerfil, setFotoDePerfil] = useState('');
  const [carregandoFoto, setCarregandoFoto] = useState(true);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: Cores.azul }} spin />
  );

  useEffect(() => {
    console.log(props.email);
  }, [props]);

  async function setandoValoresExame() {
    setCarregando(true);
    await sleep(1500);
    setExame(props.exame);
    setDataHora(String(props.exame.data_hora));
    setDataEnvio(String(props.exame.data_envio));
    setDataDevolucao(String(props.exame.data_devolucao));
    setDataPagamento(String(props.exame.data_pagamento));

    if (props.exame.esta_disponivel) setEstaDisponivel('Sim');
    else setEstaDisponivel('Não');

    if (props.exame.esta_atrasado) setEstaAtrasado('Sim');
    else setEstaAtrasado('Não');

    const resposta = await managerService.GetConsultorioPorId(
      props.exame.id_consultorio
    );

    const res = await managerService.dispostivoById(props.exame.id_dispositivo);

    setConsultorio(resposta.nome);
    setDispositivo(res[0].titulo);

    setCarregando(false);

    if (props.exame.descricao !== null) setComparaDescricao(true);
    else setComparaDescricao(false);
  }

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(props.email);
    const data = new Date(resposta.dadosUsuario.data_nascimento);
    setUsuario(resposta.dadosUsuario);
  }

  async function setandoFotoDePerfil() {
    const chave = usuario.avatar_url;
    if (chave === null || chave === '') return;
    setCarregandoFoto(true);
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    pegandoDados();
    setandoValoresExame();
    setandoFotoDePerfil();
  }, [props]);

  const margemBottomDescricao = comparaDescricao ? '8%' : '0%';
  const margemTopDescricao = comparaDescricao ? '10%' : '0%';

  const margemTopInformacoes = comparaDescricao ? '0%' : '8%';
  const margemBottomInformacoes = comparaDescricao ? '0%' : '2%';

  return (
    <Container>
      {carregando ? (
        <div
          style={{
            display: 'flex',
            height: '30px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <Caixa>
          <CaixaNome>
            <FotoPerfil>
              <img
                src={fotoDePerfil}
                className='foto'
                alt='logoGuilherme'
              ></img>
            </FotoPerfil>
            <Texto>{exame.nome}</Texto>
          </CaixaNome>

          <TextoDescricao
            marginTop={margemTopDescricao}
            marginBottom={margemBottomDescricao}
          >
            {exame.descricao}
          </TextoDescricao>

          <CaixaInformações
            marginTop={margemTopInformacoes}
            marginBottom={margemBottomInformacoes}
          >
            <TextoInformacoes>
              <b>Título: </b>
              {exame.titulo}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Consultório: </b> {consultorio}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Dispositivo: </b> {dispositivo}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Data de envio: </b> {dataEnvio.slice(8, 10)}/
              {dataEnvio.slice(5, 7)}/{dataEnvio.slice(0, 4)}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Data de devolução: </b> {dataDevolucao.slice(8, 10)}/
              {dataDevolucao.slice(5, 7)}/{dataDevolucao.slice(0, 4)}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Data de pagamento: </b> {dataPagamento.slice(8, 10)}/
              {dataPagamento.slice(5, 7)}/{dataPagamento.slice(0, 4)}
            </TextoInformacoes>
            {/*  <TextoInformacoes>
              <b>Data: </b> {dataHora.slice(8, 10)}/{dataHora.slice(5, 7)}/{dataHora.slice(0, 4)}
            </TextoInformacoes> */}
            {/*   <TextoInformacoes>
              <b>Horário: </b> {parseInt(dataHora.slice(11, 13)) < 12 ? (
                parseInt(dataHora.slice(11, 13)) + ":" + dataHora.slice(14, 16) + " am"
              ) : (
                parseInt(dataHora.slice(11, 13) - 12) + ":" + dataHora.slice(14, 16) + " pm")}
            </TextoInformacoes> */}

            <TextoInformacoes>
              <b>Está disponível: </b> {estaDisponivel}
            </TextoInformacoes>
          </CaixaInformações>
        </Caixa>
      )}
    </Container>
  );
}

export default ModalExameMarcado;
