import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { LoadingOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import {
  TopoPagina,
  TopoPaginaBotao,
  ContainerListadeFormularios,
  Filtros,
  FiltroEspecificoUrgencia,
  BarraPesquisa,
  BarraEstetica,
  ContainerFormulario,
  BotaoFinal,
  UrgenciaFormulario,
  TipoFormulario,
  TituloFormulario,
  Formulario,
  DadosFormulario,
  BotoesVerticalMaster,
  BotoesVerticalSecretaria,
  BotaoVertical,
  ContainerFormularioEspecifico,
  TextoUrgencia,
  CaixaTitulo,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import ModalEnvioFormulario from "../../components/ModalEnvioFormulario";
import ModalExcluirFormulario from "../../components/ModalExcluirFormulario/ModalExcluirFormulario";
import * as managerService from "../../services/ManagerService/managerService";
import { compararDataRecente } from "../../utils/tratamentoErros";

function ListaFormularios() {
  const history = useHistory();

  const { Search } = Input;
  const { Option } = Select;
  const [formularios, setFormularios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
  const [tipoSelect, setTipoSelect] = useState("");
  const [modalEnvio, setModalEnvio] = useState(false);
  const [ModalDeletarFormulario, setModalDeletarFormulario] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [idFormulario, setIdFormulario] = useState();
  const [formularioEspecifico, setFormularioEspecifico] = useState({});
  const tipoUsuarioLogado = sessionStorage.getItem("@doctorapp-Tipo");

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  const formulariosFiltrados = formularios.filter((formulario) => {
    if (lowerBusca === "" && tipoSelect === "") {
      return formularios;
    }else{
      if (tipoSelect === '1') {
        return (
          (formulario?.titulo?.toLowerCase().includes(lowerBusca) ||
            formulario?.tipo?.toLowerCase().includes(lowerBusca)) &&
          formulario.urgencia === 1
        );
      } else if (tipoSelect === '2') {
        return (
          (formulario?.titulo?.toLowerCase().includes(lowerBusca) ||
            formulario?.tipo?.toLowerCase().includes(lowerBusca)) &&
          formulario.urgencia === 2
        );
      } else if (tipoSelect === '3') {
        return (
          (formulario?.titulo?.toLowerCase().includes(lowerBusca) ||
            formulario?.tipo?.toLowerCase().includes(lowerBusca)) &&
          formulario.urgencia === 3
        );
      } else {
        return (
          formulario?.titulo?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca) ||
          formulario?.tipo?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lowerBusca)
        );
      }
    }
  });

  function urgenciasFiltradas(value) {
    setTipoSelect(value);
  }

  useEffect(() => {
    pegandoDadosFormularios();
  }, []);

  async function pegandoDadosFormularios() {
    setCarregando(true);
    const resposta = await managerService.GetFormularios();
    setFormularios(resposta);
    setCarregando(false);
  }

  async function verificandoFormularioPeloId(id) {
    history.push({
      pathname: '/web/formularioespecifico',
      state: { id },
    });
  }

  async function editarFormulario(id) {
    history.push({
      pathname: '/web/editarformulario',
      state: { id },
    });
  }

  function fechandoModalDeletarFormulario() {
    setModalDeletarFormulario(false);
  }

  function abreModalDeletarFormulario(formulario){
    setModalDeletarFormulario(true);
    setFormularioEspecifico(formulario)

  }

  async function pegandoDadosUsuarios() {
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === 'PACIENTE') {
        usuarios.push(usuario);
      }
    });
  }

  useEffect(() => {
    pegandoDadosUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fechandoModal() {
    setModalEnvio(false);
  }

  async function abrindoModal(id_formulario) {
    setIdFormulario(id_formulario);
    setModalEnvio(true);
  }

  const idFormularioUrgencia = "046975f7-d7d0-4635-a9d9-25efbe65d7b7";

  const ordenarFormularios = (a, b) => {
    var formulario1 = a.id;
    var formulario2 = b.id;

    if (
      formulario1 === idFormularioUrgencia &&
      formulario2 !== idFormularioUrgencia
    ) {
      return -1;
    }
    if (
      formulario1 !== idFormularioUrgencia &&
      formulario2 === idFormularioUrgencia
    ) {
      return 1;
    }
    return a.titulo.localeCompare(b.titulo);
  };

  return (
    <div>
      <ContainerListadeFormularios>
        {carregando ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '49.5%',
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            <TopoPagina>
              <BarraPesquisa>
                <Search
                  placeholder='BUSCAR'
                  style={{ width: 400 }}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </BarraPesquisa>
              <Filtros>
                
                  <FiltroEspecificoUrgencia
                    defaultValue='Urgencias'
                    onChange={(value) => urgenciasFiltradas(value)}
                  >
                    <Option value=''>Todas as Urgencias</Option>
                    <Option value='1'>Urgência: 1</Option>
                    <Option value='2'>Urgência: 2</Option>
                    <Option value='3'>Urgência: 3</Option>
                  </FiltroEspecificoUrgencia>
                   </Filtros> 
            </TopoPagina>
            <TopoPaginaBotao>
              {tipoUsuarioLogado === "MASTER" && (
                
                  <Button
                    backgroundColor={Cores.cinza[7]}
                    borderColor={Cores.azul}
                    gap="2%"
                    widthMedia="100%"
                    boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                    onClick={() => history.push("/web/criacaoformulario")}
                    marginTop="15px"
                    width="45%"
                    height="50px"
                    color={Cores.azul}
                    fontSize="1.45em"
                    fontWeight="bold"
                    fontSizeMedia950="1.1em"
                    fontSizeMedia480="1em"
                    fontSizeMedia1080="1.3em"
                  >
                    Adicionar Formulários
                  </Button>
                
              )}
            </TopoPaginaBotao>
            <BarraEstetica />
            <ContainerFormulario>
              {formulariosFiltrados?.sort(ordenarFormularios).map((value) => (
                <ContainerFormularioEspecifico>
                  <Formulario>
                    <DadosFormulario>
                      <CaixaTitulo>
                        <Button
                          backgroundColor="transparent"
                          borderColor="transparent"
                          onClick={() => verificandoFormularioPeloId(value.id)}
                          width="100%"
                          marginTop="0px"
                        >
                          <TituloFormulario>{value.titulo}</TituloFormulario>
                        </Button>
                      </CaixaTitulo>
                      <TipoFormulario>Tipo: {value.tipo}</TipoFormulario>
                      <UrgenciaFormulario>
                        <TextoUrgencia>Urgência: </TextoUrgencia>
                        {value.urgencia === 1 ? (
                          <>
                            <StarFilled />
                            <StarOutlined />
                            <StarOutlined />
                          </>
                        ) : value.urgencia === 2 ? (
                          <>
                            <StarFilled />
                            <StarFilled />
                            <StarOutlined />
                          </>
                        ) : (
                          <>
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                          </>
                        )}
                      </UrgenciaFormulario>
                    </DadosFormulario>
                  </Formulario>
                  {tipoUsuarioLogado === 'MASTER' && (
                    <BotoesVerticalMaster>
                      {value.tipo !== 'urgencia_formulario' &&(
                      <BotaoVertical>
                        <Button
                          backgroundColor={Cores.lilas[1]}
                          color={Cores.branco}
                          fontWeight='bold'
                          borderColor={Cores.azulEscuro}
                          height='37px'
                          width='90%'
                          onClick={() => abrindoModal(value.id)}
                        >
                          ENVIAR
                        </Button>
                      </BotaoVertical>
                  )}
                      <BotaoVertical>
                        <Button
                          backgroundColor={Cores.cinza[7]}
                          color={Cores.azulEscuro}
                          fontWeight='bold'
                          borderColor={Cores.azulEscuro}
                          height='37px'
                          width='90%'
                          onClick={() => editarFormulario(value.id)}
                        >
                          EDITAR
                        </Button>
                      </BotaoVertical>

                      <BotaoVertical>
                        <Button
                          backgroundColor={Cores.branco}
                          color={Cores.cinza[2]}
                          fontWeight="bold"
                          borderColor="rgba(255, 0, 0, 0.25)"
                          height="37px"
                          width="90%"
                          onClick={() => abreModalDeletarFormulario(value)}
                        >
                          DELETAR
                        </Button>
                      </BotaoVertical>
                    </BotoesVerticalMaster>
                  )}
                  {tipoUsuarioLogado === 'SECRETARIA(O)' && (
                    <BotoesVerticalSecretaria>
                      <BotaoVertical>
                        <Button
                          backgroundColor={Cores.lilas[1]}
                          color={Cores.branco}
                          fontWeight='bold'
                          borderColor={Cores.azulEscuro}
                          height='37px'
                          width='90%'
                          onClick={() => abrindoModal(value.id)}
                        >
                          ENVIAR
                        </Button>
                      </BotaoVertical>
                    </BotoesVerticalSecretaria>
                  )}
                </ContainerFormularioEspecifico>
              ))}
            </ContainerFormulario>
          </>
        )}
      </ContainerListadeFormularios>
      <Modal
        visible={modalEnvio}
        onCancel={fechandoModal}
        footer={null}
        width={'70%'}
        centered={true}
        destroyOnClose
      >
        <ModalEnvioFormulario
          usuarios={usuarios}
          idFormulario={idFormulario}
          fechandoModal={() => fechandoModal()}
        />
      </Modal>

      <Modal
        visible={ModalDeletarFormulario}
        onCancel={() => setModalDeletarFormulario(false)}
        style={{ maxWidth: "450px", minWidth: "250px" }}
        footer={null}
        width={"50%"}
        centered={true}
      >
        <ModalExcluirFormulario
         formulario={formularioEspecifico}
         fecharModal={() => fechandoModalDeletarFormulario()}
         />
      </Modal>

    </div>
  );
}

export default ListaFormularios;
