import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  TopoPagina,
  ContainerListadeUsuarios,
  SetarFiltros,
  Filtros,
  BarraPesquisaComUmSelect,
  BarraPesquisaComDoisSelects,
  FiltrosDeData,
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
  TopoPaginaEsquerda,
  TextoData,
  InputData,
  FiltroSelect,
  FiltroInput,
  SelectData,
  SelectConsultorio,
  TopoPaginaCima,
  SelectTipoAgendamento,
} from './Styles';
import Button from '../../styles/Button';
import ModalAgendamentoEspecifico from '../../components/ModalAgendamentoEspecifico';
import ModalConsultaMarcada from '../../components/ModalConsultaMarcada';
import ModalExameMarcado from '../../components/ModalExameMarcado/ModalExameMarcado';
import { Cores } from '../../variaveis';
import { compararDataAntiga } from '../../utils/tratamentoErros';
import * as managerService from '../../services/ManagerService/managerService';
import { sleep } from '../../utils/sleep';
import formatarData from '../../utils/formatarData';

function Agendamentos(props) {
  const history = useHistory();
  const { Search } = Input;
  const [modalAgendamentoEspecifico, setModalAgendamentoEspecifico] =
    useState(false);
  const [modalExameMarcado, setModalExameMarcado] = useState(false);
  const [exameEspecifico, setExameEspecifico] = useState([]);
  const { Option } = Select;
  const [email, setEmail] = useState();
  const [carregando, setCarregando] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [busca, setBusca] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [tipoSelect, setTipoSelect] = useState('');
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const lowerBusca = busca
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const [consultaEspecifica, setConsultaEspecifica] = useState([]);
  const [carregandoConsultorios, setCarregandoConsultorios] = useState();
  const [consultorios, setConsultorios] = useState([]);
  const [modalConsultaMarcada, setModalConsultaMarcada] = useState(false);
  const [consultorioSelect, setConsultorioSelect] = useState('');
  const [tipoAgendamento, setTipoAgendamento] = useState('');
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const antIconPagina = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const abertoPeloUsuario = false;

  const agendamentosFiltrados = consultas.filter((consultas) => {
    if (
      lowerBusca === '' &&
      tipoSelect === '' &&
      consultorioSelect === '' &&
      tipoAgendamento === ''
    ) {
      return consultas;
    } else {
      if (lowerBusca !== '' && tipoAgendamento === '') {
        if (
          tipoSelect !== '' &&
          consultorioSelect === '' &&
          tipoAgendamento === ''
        ) {
          return (
            consultas?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) && setandoData(consultas)
          );
        } else if (
          tipoSelect === '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === ''
        ) {
          return (
            consultas?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) &&
            consultas.id_consultorio === consultorioSelect
          );
        } else if (
          tipoSelect !== '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === ''
        ) {
          return (
            consultas?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) &&
            consultas.id_consultorio === consultorioSelect &&
            setandoData(consultas)
          );
        } else {
          return consultas?.nome
            ?.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(lowerBusca);
        }
      } else {
        if (
          tipoSelect !== '' &&
          consultorioSelect === '' &&
          tipoAgendamento === ''
        ) {
          return setandoData(consultas);
        } else if (
          tipoSelect === '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === ''
        ) {
          return consultas.id_consultorio === consultorioSelect;
        } else if (
          tipoSelect !== '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === ''
        ) {
          return (
            consultas.id_consultorio === consultorioSelect &&
            setandoData(consultas)
          );
        }
      }
    }
  });

  const examesFiltrados = examesMarcados.filter((examesMarcados) => {
    if (
      lowerBusca === '' &&
      tipoSelect === '' &&
      consultorioSelect === '' &&
      tipoAgendamento === 'exames'
    ) {
      return examesMarcados;
    } else {
      if (lowerBusca !== '' && tipoAgendamento === 'exames') {
        if (
          tipoSelect !== '' &&
          consultorioSelect === '' &&
          tipoAgendamento === 'exames'
        ) {
          return (
            examesMarcados?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) && setandoData(examesMarcados)
          );
        } else if (
          tipoSelect === '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === 'exames'
        ) {
          return (
            examesMarcados?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) &&
            examesMarcados.id_consultorio === consultorioSelect
          );
        } else if (
          tipoSelect !== '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === 'exames'
        ) {
          return (
            examesMarcados?.nome
              ?.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .includes(lowerBusca) &&
            examesMarcados.id_consultorio === consultorioSelect &&
            setandoData(examesMarcados)
          );
        } else {
          return examesMarcados?.nome
            ?.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(lowerBusca);
        }
      } else {
        if (
          tipoSelect !== '' &&
          consultorioSelect === '' &&
          tipoAgendamento === 'exames'
        ) {
          return setandoData(examesMarcados);
        } else if (
          tipoSelect === '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === 'exames'
        ) {
          return examesMarcados.id_consultorio === consultorioSelect;
        } else if (
          tipoSelect !== '' &&
          consultorioSelect !== '' &&
          tipoAgendamento === 'exames'
        ) {
          return (
            examesMarcados.id_consultorio === consultorioSelect &&
            setandoData(examesMarcados)
          );
        }
      }
    }
  });

  function setandoData(value) {
    let dataString = String(value.data_hora);
    let dataFormatada = dataString.slice(0, 10);
    if (dataFormatada === dataInput) {
      return value;
    }
  }

  useEffect(() => {
    pegandoConsultorios();
  }, []);

  function dataFiltrada(value) {
    setTipoSelect(value);
  }

  function consultorioFiltrado(value) {
    setConsultorioSelect(value);
  }

  function filtrandoTipoAgendamento(value) {
    setTipoAgendamento(value);
  }

  async function pegandoConsultorios() {
    setCarregandoConsultorios(true);
    const res = await managerService.GetDadosConsultorios();
    setConsultorios(res.dadosConsultorios);
    setCarregandoConsultorios(false);
  }

  async function pegandoDados() {
    setCarregandoPagina(true);
    setCarregando(true);
    await sleep(400);
    setConsultas([]);
    setExamesMarcados([]);
    const resposta =
      await managerService.GetDadosConsultasExamesMarcadosGeral();
    setConsultas(resposta.dadosConsultas);
    setExamesMarcados(resposta.dadosExamesMarcados);
    setandoFotoDePerfil(resposta.dadosExamesMarcados);
    setCarregando(false);
    setCarregandoPagina(false);
  }

  useEffect(() => {
    pegandoDados();
  }, [email]);

  async function marcandoAgendamento(email) {
    setEmail(email);
    setModalAgendamentoEspecifico(true);
  }

  async function fechandoModalAgendamentoEspecifico() {
    setModalAgendamentoEspecifico(false);
    pegandoDados();
  }

  async function abrindoPerfilPaciente(email) {
    history.push({
      pathname: '/web/perfildopaciente',
      state: { email },
    });
  }

  async function fechandoModalConsultaMarcada() {
    setModalConsultaMarcada(false);
    pegandoDados();
  }

  async function abreModalConsultaMarcada(consulta) {
    setModalConsultaMarcada(true);
    setConsultaEspecifica(consulta);
  }

  async function abreModalExameMarcado(exame) {
    setModalExameMarcado(true);
    setExameEspecifico(exame);
  }

  async function fechandoModalModalExameMarcado() {
    setModalExameMarcado(false);
    pegandoDados();
  }

  async function setandoFotoDePerfil(usuario) {
    const chave = usuario.avatar_url;

    if (chave !== null && chave !== '') {
      setCarregandoFoto(true);
      const arquivo = await managerService.GetArquivoPorChave(chave);
      Object.defineProperty(usuario, 'fotoDePerfil', {
        value: arquivo,
      });
    } else {
      setCarregandoFoto(false);
      return;
    }
    await sleep(1700);
    setCarregandoFoto(false);
  }

  /*
  async function registrandoNotificacoes(id){
    if (!Device.isDevice){
      return null;
    }
    const {status} = await Notifications.requestPermissionsAsync();
    if(status !== "granted"){
      return null;
    }
    if (Platform.OS == "android"){
      Notifications.setNotificationChannelAsync("default", {
        
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const tokenNotificacoes = await Notifications.getDevicePushTokenAsync();
    await managerService.requisicaoToken(id,(tokenNotificacoes.type +'/'+ tokenNotificacoes.data))
  }

  */
  return (
    <div>
      <ContainerListadeUsuarios>
        <TopoPagina>
          <TopoPaginaCima>
            {tipoSelect === '' ? (
              <BarraPesquisaComUmSelect>
                <Search
                  placeholder='BUSCAR'
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </BarraPesquisaComUmSelect>
            ) : (
              <BarraPesquisaComDoisSelects>
                <Search
                  placeholder='BUSCAR'
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </BarraPesquisaComDoisSelects>
            )}
            <SelectConsultorio
              id='id_consultorio'
              name='id_consultorio'
              bordered={false}
              defaultValue=''
              onChange={(value) => consultorioFiltrado(value)}
            >
              <option value=''>Todos os consultórios</option>
              {consultorios.map((consultorio) => (
                <>
                  {carregandoConsultorios ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <option
                      key={consultorio.id}
                      value={consultorio.id}
                      color='red'
                    >
                      {consultorio.nome}
                    </option>
                  )}
                </>
              ))}
            </SelectConsultorio>
            <Filtros>
              <SelectData
                defaultValue=''
                bordered={false}
                FiltrarData={tipoSelect}
                onChange={(value) => dataFiltrada(value)}
              >
                <Option value=''>Todas as datas</Option>
                <Option value='filtrado'>Data filtrada</Option>
              </SelectData>
              {tipoSelect === '' ? (
                <></>
              ) : (
                <InputData
                  size='large'
                  name='data'
                  type='date'
                  border={tipoSelect}
                  onChange={(e) => setDataInput(e.target.value)}
                  value={dataInput}
                />
              )}
            </Filtros>
            <SelectTipoAgendamento
              defaultValue=''
              FiltrarTipo={tipoAgendamento}
              bordered={false}
              onChange={(value) => filtrandoTipoAgendamento(value)}
            >
              <Option value=''>Consultas</Option>
              <Option value='exames'>Exames</Option>
            </SelectTipoAgendamento>
          </TopoPaginaCima>

          <Button
            marginTop='0px'
            width='45%'
            height='50px'
            backgroundColor={Cores.lilas[2]}
            borderColor={Cores.azulEscuro}
            color={Cores.azul}
            fontSize='1.45em'
            fontWeight='bold'
            fontSizeMedia950='1.1em'
            fontSizeMedia480='1em'
            fontSizeMedia1080='1.3em'
            gap='1%'
            widthMedia='100%'
            onClick={() => marcandoAgendamento()}
          >
            Novo Agendamento
          </Button>
        </TopoPagina>
        <BarraEstetica></BarraEstetica>
        <DadosUsuario>
          <Titulo></Titulo>
          <Nome>Nome do Usuário</Nome>
          <Telefone>Telefone</Telefone>
          <Data>Data - Horário</Data>
          <Agendamento>Agendamento</Agendamento>
          <CódigoPaciente>Código do Paciente</CódigoPaciente>
        </DadosUsuario>
        {carregandoPagina ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '47.5%',
            }}
          >
            <Spin indicator={antIconPagina} />
          </div>
        ) : (
          <ContainerUsuarios>
            {agendamentosFiltrados?.sort(compararDataAntiga).map((value) => (
              <Usuario>
                {value.avatar_url === null || value.avatar_url === '' ? (
                  <Imagem>
                    {carregandoFoto ? (
                      <div>
                        <Spin size='small' indicator={antIconPagina} />
                      </div>
                    ) : (
                      <>
                        <UserOutlined style={{ fontSize: '2.5em' }} />
                      </>
                    )}
                  </Imagem>
                ) : (
                  <Imagem>
                    {carregandoFoto ? (
                      <div>
                        <Spin size='small' indicator={antIconPagina} />
                      </div>
                    ) : (
                      <>
                        <img
                          src={value.fotoDePerfil}
                          className='foto'
                          alt='fotoPerfil'
                          height='100%'
                          width='100%'
                        ></img>
                      </>
                    )}
                  </Imagem>
                )}
                <Nome>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <div onClick={() => abrindoPerfilPaciente(value.email)}>
                      {value.nome}
                    </div>
                  )}
                </Nome>
                <Telefone>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <>
                      ({value.telefone.slice(0, -9)}){' '}
                      {value.telefone.slice(2, -4)}-{value.telefone.slice(-4)}
                    </>
                  )}
                </Telefone>
                <Data>
                  {formatarData({ 
                    data: value.data_hora, 
                    formatacao: "dd/MM/yyyy - h:mm aaa" 
                  })}
                </Data>

                <Agendamento onClick={() => abreModalConsultaMarcada(value)}>
                  Consulta
                </Agendamento>
                <CódigoPaciente>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <div>{value.codigo}</div>
                  )}
                </CódigoPaciente>
              </Usuario>
            ))}
            {examesFiltrados?.sort(compararDataAntiga).map((value) => (
              <Usuario key={value.id_usuario}>
                {value.avatar_url === null || value.avatar_url === '' ? (
                  <Imagem>
                    {carregandoFoto ? (
                      <div>
                        <Spin size='small' indicator={antIconPagina} />
                      </div>
                    ) : (
                      <>
                        <UserOutlined style={{ fontSize: '2.5em' }} />
                      </>
                    )}
                  </Imagem>
                ) : (
                  <Imagem>
                    {carregandoFoto ? (
                      <div>
                        <Spin size='small' indicator={antIconPagina} />
                      </div>
                    ) : (
                      <>
                        <img
                          src={value.fotoDePerfil}
                          className='foto'
                          alt='fotoPerfil'
                          height='100%'
                          width='100%'
                        ></img>
                      </>
                    )}
                  </Imagem>
                )}
                <Nome>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <div onClick={() => abrindoPerfilPaciente(value.email)}>
                      {value.nome}
                    </div>
                  )}
                </Nome>
                <Telefone>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <>
                      ({value.telefone.slice(0, -9)}){' '}
                      {value.telefone.slice(2, -4)}-{value.telefone.slice(-4)}
                    </>
                  )}
                </Telefone>
                <Data>
                  {formatarData({ 
                    data: value.data_hora, 
                    formatacao: "dd/MM/yyyy - HH:mm" 
                  })}
                </Data>

                <Agendamento onClick={() => abreModalExameMarcado(value)}>
                  {/* {value.titulo} */} Exame
                </Agendamento>
                <CódigoPaciente>
                  {carregando ? (
                    <Spin indicator={antIcon} />
                  ) : (
                    <div>{value.codigo}</div>
                  )}
                </CódigoPaciente>
              </Usuario>
            ))}
          </ContainerUsuarios>
        )}
      </ContainerListadeUsuarios>

      <Modal
        visible={modalAgendamentoEspecifico}
        onCancel={() => fechandoModalAgendamentoEspecifico(false)}
        footer={null}
        width={'70%'}
        centered={true}
      >
        <ModalAgendamentoEspecifico
          emailUsuario={email}
          abertoPeloUsuario={abertoPeloUsuario}
          fechandoModal={() => fechandoModalAgendamentoEspecifico()}
        />
      </Modal>

      <Modal
        visible={modalConsultaMarcada}
        onCancel={fechandoModalConsultaMarcada}
        footer={null}
        width={'auto'}
        centered={true}
        style={{
          backgroundColor: 'black',
        }}
      >
        <ModalConsultaMarcada
          consulta={consultaEspecifica}
          email={consultaEspecifica.email}
          fechandoModal={() => fechandoModalConsultaMarcada()}
        />
      </Modal>

      <Modal
        visible={modalExameMarcado}
        onCancel={fechandoModalModalExameMarcado}
        footer={null}
        width={'auto'}
        centered={true}
        style={{
          backgroundColor: 'black',
        }}
      >
        <ModalExameMarcado
          exame={exameEspecifico}
          email={exameEspecifico.email}
          fechandoModal={() => fechandoModalModalExameMarcado()}
        />
      </Modal>
    </div>
  );
}

export default Agendamentos;
