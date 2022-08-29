import React, { useEffect, useState } from "react";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin, Modal, Input } from "antd";
import ModalFormulario from "../../components/ModalFormulario";
import {
  ColunaDireita,
  ColunaEsquerda,
  ContainerFormularioEspecifico,
  ContainerFormularioCima,
  BarraEstetica,
  BarraPaciente,
  BarraRespostas,
  CamposFormularioCima,
  CamposFormularioCimaUrgencia,
  TextoBarraPaciente,
  ImagemPaciente,
  RotuloBarraDeBuscaOpcoes,
  BarraDePesquisa,
  ContainerBarraDeBuscaOpcoes,
  SelectTipos,
  BarraDireita,
  BarraEsquerda,
  BarraCentro,
  Selects,
  MargemEstetica,
  NomePaciente,
  CentralizandoSpin,
  ContainerInterno
} from "./Styles";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function FormularioEspecifico(props) {
  const { Search } = Input;
  const [formularioEspecifico, setFormularioEspecifico] = useState({});
  const [formularioPacientes, setformularioPacientes] = useState([]);
  const [formularioRespostaPendente, setFormularioRespostaPendente] =
    useState(false);
  const [formularioResposta, setFormularioResposta] = useState(false);

  const [modalFormulario, setModalFormulario] = useState(false);
  const [perguntas, setPerguntas] = useState();
  const [titulo, setTitulo] = useState();
  const [idFormularioPaciente, setIdFormularioPaciente] = useState();


  const [carregando, setCarregando] = useState(true);
  const [statusSelect, setStatusSelect] = useState("");
  const { Option } = SelectTipos;
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  async function pegandoDadosFormularioEspecifico() {
    setCarregando(true);
    const resposta = await managerService.GetFormularioEspecifico(
      props.location.state.id
    );
    setFormularioEspecifico(resposta);
    setCarregando(false);
  }

  async function pegandoFormularioPacientes() {
    setCarregando(true);
    const respostaFormularios =
      await managerService.GetFormularioPacientesPorFormulario(
        props.location.state.id
      );

    setformularioPacientes(respostaFormularios);
    setCarregando(false);

    const formularioRespostaPendente = respostaFormularios.filter(
      (item) => item.status === false
    );
    setFormularioRespostaPendente(formularioRespostaPendente);

    const formularioResposta = respostaFormularios.filter(
      (item) => item.status !== false
    );
    setFormularioResposta(formularioResposta);
  }

function abrindoModalFormulario(id, perguntas, titulo) {
    setPerguntas(perguntas);
    setTitulo(titulo);
    setIdFormularioPaciente(id);
    setModalFormulario(true);
  }

  useEffect(() => {
    pegandoFormularioPacientes();

  }, [props.location.state.id]);

  useEffect(() => {
    pegandoDadosFormularioEspecifico();
  }, [props.location.state.id]);

  const usuariosFiltrados = formularioPacientes.filter(
    (formularioPacientes) => {
      if (lowerBusca === "" && statusSelect === "") {
        return formularioPacientes;
      } else {
        if (statusSelect === "true") {
          return (
            formularioPacientes?.nome?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(lowerBusca) &&
            formularioPacientes.status === true
          );
        } else if (statusSelect === "false") {
          return (
            formularioPacientes?.nome?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(lowerBusca) &&
            formularioPacientes.status === false
          );
        } else {
          return formularioPacientes?.nome?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(lowerBusca);
        }
      }
    }
  );

  function usuariosFiltro(value) {
    setStatusSelect(value);
  }

  return (
    <div>
      <ContainerFormularioEspecifico>
        {carregando ? (
          <div
          style={{
            position: "absolute",
            top: "50%",
            left: "49.5%",
          }}
        >
          <Spin indicator={antIcon} />
        </div>
        ) : (
          <>
            <ContainerFormularioCima>
              <CamposFormularioCima>
                {formularioEspecifico.titulo}
              </CamposFormularioCima>
              <CamposFormularioCima>
                Tipo: {formularioEspecifico.tipo}
              </CamposFormularioCima>
              <CamposFormularioCima>
                Finalidade: {formularioEspecifico.finalidade}
              </CamposFormularioCima>
              <CamposFormularioCimaUrgencia>
                Urgência:{" "}
                {formularioEspecifico.urgencia === 1 ? (
                  <>
                    <StarFilled />
                    <StarOutlined />
                    <StarOutlined />
                  </>
                ) : formularioEspecifico.urgencia === 2 ? (
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
              </CamposFormularioCimaUrgencia>
            </ContainerFormularioCima>

            <ColunaEsquerda>
              <ContainerBarraDeBuscaOpcoes>
                <BarraDePesquisa>
                  <Search
                    placeholder="BUSCAR"
                    style={{ width: "100%" }}
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </BarraDePesquisa>
                <Selects>
                  <RotuloBarraDeBuscaOpcoes>
                    <SelectTipos
                      defaultValue=""
                      bordered={false}
                      style={{ width: "auto" }}
                      onChange={(value) => usuariosFiltro(value)}
                    >
                      <Option value="">Todos os Usuários</Option>
                      <Option value="true">Respondido      </Option>
                      <Option value="false">Resposta Pendente</Option>
                    </SelectTipos>
                  </RotuloBarraDeBuscaOpcoes>
                </Selects>
              </ContainerBarraDeBuscaOpcoes>

              <BarraEstetica></BarraEstetica>

              {usuariosFiltrados?.map((value) => (
                <BarraPaciente>
                  <BarraEsquerda>
                    <ImagemPaciente
                      src={fotoPerfil}
                      className="fotoPerfil"
                      alt="fotoPerfil"
                      width="80px"
                      height="80px"
                    ></ImagemPaciente>
                  </BarraEsquerda>
                  <BarraCentro>
                    <NomePaciente
                    onClick={() =>
                      abrindoModalFormulario(
                        value.id,
                        value.perguntas,
                        value.titulo
                      )
                    }>
                      {value.nome}
                    </NomePaciente>
                  </BarraCentro>
                  {value.status !== false ? (
                    <></>
                  ) : (
                    <BarraDireita>
                      <TextoBarraPaciente
                        fontSize="1em"
                        fontWeight="bold"
                        justifyContent="flex-start"
                      >
                        Resposta Pendente{" "}
                      </TextoBarraPaciente>

                      <Button
                        width="70%"
                        backgroundColor="green"
                        boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                        borderColor={Cores.azulEscuro}
                        borderRadius="5px"
                        height="40%"
                        color={Cores.preto}
                        fontSize="0.8em"
                        fontSizeMedia950="0.75em"
                        fontWeight="bold"
                        heightMedia560="28px"
                      >
                        ENVIAR LEMBRETE
                      </Button>
                    </BarraDireita>
                  )}
                </BarraPaciente>
              ))}
            </ColunaEsquerda>
            <ColunaDireita>
              <BarraRespostas>
                Aguardando respostas de {formularioRespostaPendente.length}{" "}
                formulários.
              </BarraRespostas>
              <BarraRespostas>
                {" "}
                {formularioResposta.length} formulários já foram respondidos.
              </BarraRespostas>
              <MargemEstetica />
              <Button
                backgroundColor="green"
                borderRadius="3px"
                borderWidth="1px"
                borderColor={Cores.preto}
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                color={Cores.preto}
                fontSize="15px"
                height="50px"
                width="60%"
                marginTop="10%"
                marginLeft="0%"
                fontSizeMedia950="0.9em"
                onClick={() => {}}
              >
                Gerar documento Word
              </Button>
            </ColunaDireita>
          </>
        )}
      </ContainerFormularioEspecifico>

      <Modal
        visible={modalFormulario}
        onCancel={() => setModalFormulario(false)}
        width={"50%"}
        centered={true}
        footer={null}
      >
        <ModalFormulario
          idFormularioPaciente={idFormularioPaciente}
          perguntas={perguntas}
          titulo={titulo}
        />
      </Modal>

    </div>
  );
}

export default FormularioEspecifico;
