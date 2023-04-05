import React, { useContext, useEffect, useState } from 'react';
import {
  BarraPesquisaChat,
  ImagemPessoa,
  NomeMensagem,
  BolaAzul,
  MensagemPessoa,
  NomePessoa,
  HeaderBarraLateralChat,
  ListaPessoasChat,
  PessoaChat,
  BarraLateral,
} from './Styles';
import { Cores } from '../../variaveis';
import Button from '../../styles/Button';
import Input from '../../styles/Input';
import ModalNovaConversa from '../../components/ModalNovaConversa';
import { Modal, Spin, Tooltip } from 'antd';
import {
  SearchOutlined,
  PlusCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import * as managerService from '../../services/ManagerService/managerService';
import { ChatContext } from '../../contexts/ChatContext';
import objCopiaProfunda from '../../utils/objCopiaProfunda';
import { redirecionamento, sleep } from "../../utils/sleep";

export default function BarraLateralChat({ carregandoConversas }) {
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    usuarioId,
    conversas,
    setConversas,
    setConversaSelecionada,
    imagemPerfilPadrão,
  } = useContext(ChatContext);

  const cliqueNaConversa = (conversa) => {
    return async (e) => {
      e.preventDefault();

      const index = conversas.findIndex(({ id }) => id === conversa.id);
      const copiaConversas = objCopiaProfunda(conversas);

      const conversaNaLista = copiaConversas[index];

      if (conversaNaLista.mensagensNaoVistas) {
        conversaNaLista.mensagensNaoVistas = 0;
        await managerService.UpdateMensagensVisualizadas(
          usuarioId,
          conversa.id
        );
      }

      setConversaSelecionada(conversaNaLista);
      setConversas(copiaConversas);
    };
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 90, color: Cores.azul }} spin />
  );


  return (
    <>
      <BarraLateral>
        <HeaderBarraLateralChat>
          <BarraPesquisaChat>
            <Input
              placeholder='Pesquisar conversa'
              backgroundColor='transparent'
              borderColor='transparent'
              width='90%'
              height='100%'
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
            />
            <SearchOutlined style={{ fontSize: '20px' }} />
          </BarraPesquisaChat>
          <Tooltip placement='bottom' title='Iniciar nova conversa'>
            <Button
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.azul}
              width='18%'
              widthres='15%'
              height='27%'
              onClick={() => {
                setModalAdicionar(true);
              }}
            >
              <PlusCircleOutlined
                style={{ fontSize: '30px', color: '{Cores.azul}' }}
              />
            </Button>
          </Tooltip>
        </HeaderBarraLateralChat>
        <ListaPessoasChat>
          {carregandoConversas ? (
            <Spin
              indicator={antIcon}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ) : (
            conversas
              ?.filter((c) => {
                return searchTerm
                  ? c.conversaCom.nome
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .includes(searchTerm.toLowerCase())
                  : true;
              })
              .map((c, idx) => (
                <PessoaChat key={idx} onClick={cliqueNaConversa(c)}>
                  <ImagemPessoa>
                    <img
                      src={c.conversaCom.avatar_url || imagemPerfilPadrão}
                      alt='61'
                      border-radius='3px'
                      height='75px'
                      width='81.3px'
                    ></img>
                  </ImagemPessoa>
                  <NomeMensagem>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      {c.tipo === 'EXAME' ? (
                        <NomePessoa>{c.conversaCom.nome} - EXAME</NomePessoa>
                      ) : (
                        <NomePessoa>{c.conversaCom.nome}</NomePessoa>
                      )}
                      <MensagemPessoa naoVisto={c.mensagensNaoVistas}>
                        {c?.ultima_mensagem?.pertenceAoUsuarioAtual && 'Você: '}
                        {c?.ultima_mensagem?.conteudo}
                      </MensagemPessoa>
                    </div>
                    {c.mensagensNaoVistas > 0 && (
                      <BolaAzul>{c.mensagensNaoVistas}</BolaAzul>
                    )}
                  </NomeMensagem>
                </PessoaChat>
              ))
          )}
        </ListaPessoasChat>
      </BarraLateral>
      <Modal
        destroyOnClose={true}
        visible={modalAdicionar}
        onCancel={() => setModalAdicionar(false)}
        footer={null}
        width={'700px'}
        centered={true}
      >
        <ModalNovaConversa setModalAdicionar={setModalAdicionar} />
      </Modal>
    </>
  );
}
