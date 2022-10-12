import React, { useEffect, useState } from 'react';
import { Cores } from '../../variaveis';
import { useHistory } from 'react-router-dom';
import Button from '../../styles/Button';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as managerService from '../../services/ManagerService/managerService';
import {
  Body,
  Board,
  Notificacao,
  TextoNotificacao,
  CaixaTexto,
  BotoesColuna,
  BotaoCanto,
  IconeAdicionar,
} from './Styles';

function HomeSecretaria() {
  const history = useHistory();

  function passandoTipoParaCadastro(tipo) {
    history.push({
      pathname: '/cadastro',
      state: { tipo },
    });
  }

  const [carregando, setCarregando] = useState(true);
  const [formularioPaciente, setFormularioPaciente] = useState([]);
  const [notificacaoFormularioAtivo, setNotificacaoFormularioAtivo] = useState(
    []
  );

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  useEffect(() => {
    PegaFormulariosPaciente();
  }, []);

  async function PegaFormulariosPaciente() {
    setCarregando(true);
    const notificacao = await managerService.GetTodosFormulariosPacientes();
    setFormularioPaciente(notificacao);
    setCarregando(false);
    const verificaNotificacaoAtiva = notificacao.filter(
      (item) => item.notificacao_ativa === true
    );
    setNotificacaoFormularioAtivo(verificaNotificacaoAtiva);
  }

  async function apagaNotificacaoFormulario(idFormularioPaciente) {
    setCarregando(true);
    await managerService.UpdateNotificacaoAtivaFormulario(
      idFormularioPaciente,
      false
    );
    PegaFormulariosPaciente();
    setCarregando(false);
  }

  async function pegaPerfilUsuario(email) {
    history.push({
      pathname: '/web/perfildopaciente',
      state: { email },
    });
  }

  const ordenaFormularios = (a, b) => {
    var data1 = new Date(a.data_criacao);
    var data2 = new Date(b.data_criacao);

    if (data1 < data2) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div>
      <Body>
        <Board>
          {carregando ? (
            <div
              style={{
                position: 'absolute',
                top: '45%',
                left: '49%',
              }}
            >
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <>
              {notificacaoFormularioAtivo
                ?.sort(ordenaFormularios)
                .map((value) => (
                  <Notificacao>
                    <CaixaTexto>
                      <h3>
                        <TextoNotificacao>
                          Formulário: {value.titulo} respondido por:{' '}
                          {value.nome}
                        </TextoNotificacao>
                      </h3>
                    </CaixaTexto>
                    <BotoesColuna>
                      <Button
                        width='100%'
                        height='50px'
                        backgroundColor={Cores.lilas[1]}
                        borderColor={Cores.azul}
                        color={Cores.branco}
                        fontSize='1.5em'
                        fontWeight='medium'
                        fontSizeMedia='0.8em'
                        fontSizeMedia950='1em'
                        heightMedia='2em'
                        onClick={() => pegaPerfilUsuario(value.email)}
                      >
                        VISUALIZAR
                      </Button>
                      <Button
                        width='100%'
                        height='50px'
                        backgroundColor={Cores.cinza[7]}
                        borderColor={Cores.azul}
                        color={Cores.preto}
                        fontSize='1.5em'
                        fontWeight='medium'
                        fontSizeMedia='0.8em'
                        fontSizeMedia950='1em'
                        heightMedia='2em'
                        onClick={() => apagaNotificacaoFormulario(value.id)}
                      >
                        OK
                      </Button>
                    </BotoesColuna>
                  </Notificacao>
                ))}
            </>
          )}
        </Board>
        <BotaoCanto>
          <Button
            width='50%'
            height='50px'
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            justify-content='flex-end'
            color={Cores.azul}
            fontSize='1.5em'
            fontWeight='medium'
            fontSizeMedia='1em'
            fontSizeMedia950='1.2em'
            boxShadow='0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            onClick={() => passandoTipoParaCadastro('PACIENTE')}
          >
            Cadastrar Novo Paciente
            <IconeAdicionar>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill={Cores.azul}
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
              </svg>
            </IconeAdicionar>
          </Button>
        </BotaoCanto>
      </Body>
    </div>
  );
}

export default HomeSecretaria;
