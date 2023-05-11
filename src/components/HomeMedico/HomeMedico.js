import React, { useEffect, useState } from 'react';
import Button from '../../styles/Button';
import { useHistory } from 'react-router-dom';
import {
  Body,
  Board,
  Notificacao,
  TextoNotificacao,
  CaixaTexto,
  Texto,
  BotoesColuna,
  ContainerBotoes,
  Botoes,
} from './Styles';
import { Spin } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Cores } from '../../variaveis';
import { sleep } from '../../utils/sleep';
import * as managerService from '../../services/ManagerService/managerService';

function HomeMedico() {
  const history = useHistory();
  const [carregando, setCarregando] = useState(true);
  const [notificacaoFormularioAtivo, setNotificacaoFormularioAtivo] = useState(
    []
  );

  function passandoTipoParaCadastro(tipo) {
    history.push({
      pathname: '/cadastro',
      state: { tipo },
    });
  }

  useEffect(() => {
    PegaFormulariosPaciente();
  }, []);

  async function PegaFormulariosPaciente() {
    setCarregando(true);
    const notificacao = await managerService.GetTodosFormulariosPacientes();
    setCarregando(false);

    const verificaNotificacaoAtiva = notificacao.filter(
      (item) => item.notificacao_ativa
    );

    setNotificacaoFormularioAtivo(verificaNotificacaoAtiva);
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

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  async function apagaNotificacaoFormulario(idFormularioPaciente) {
    setCarregando(true);
    await managerService.UpdateNotificacaoAtivaFormulario(
      idFormularioPaciente,
      false
    );
    setNotificacaoFormularioAtivo([]);
    PegaFormulariosPaciente();
    await sleep(1000);
    setCarregando(false);
  }

  async function pegaPerfilUsuario(email) {
    history.push({
      pathname: '/web/perfildopaciente',
      state: { email },
    });
  }

  return (
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
            {notificacaoFormularioAtivo.length !== 0 ? (
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
            ) : (
              <Texto> Ainda não há notificações!</Texto>
            )}
          </>
        )}
      </Board>
      <ContainerBotoes>
        <Botoes>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width='100%'
            height='50px'
            borderColor={Cores.azul}
            fontSize='1em'
            gap='1%'
            boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
            onClick={() => passandoTipoParaCadastro('PACIENTE')}
          >
            Cadastrar Novo Paciente
            <PlusCircleOutlined style={{ color: Cores.azul }} />
          </Button>
          </Botoes>
          <Botoes>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width='100%'
            height='50px'
            borderColor={Cores.azul}
            fontSize='1em'
            gap='1%'
            boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
            onClick={() => passandoTipoParaCadastro('SECRETARIA(O)')}
          >
            Cadastrar nova(o) Secretária(o)
            <PlusCircleOutlined style={{ color: Cores.azul }} />
          </Button>
        </Botoes>
        <Botoes>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width='100%'
            height='50px'
            borderColor={Cores.azul}
            fontSize='1em'
            gap='1%'
            boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
            onClick={() => history.push('/web/edicaoconteudo')}
          >
            Editar Conteúdo do Aplicativo
          </Button>
        </Botoes>
      </ContainerBotoes>
    </Body>
  );
}
export default HomeMedico;
