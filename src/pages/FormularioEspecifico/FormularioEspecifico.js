import React, { useEffect, useState } from "react";
import { LoadingOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import {
  ColunaDireita,
  ColunaEsquerda,
  ContainerFormularioEspecifico,
  ContainerFormularioCima,
  BarraEstetica,
  BarraPaciente,
  BarraRespostas,
  CamposFormularioCima,
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
} from "./Styles";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { Nome, Titulo } from "../ListaUsuarios/Styles";
import { Input } from "antd";

function FormularioEspecifico(props) {
  const { Search } = Input;
  const [formularioEspecifico, setFormularioEspecifico] = useState({});
  const [formularioPacientes, setformularioPacientes] = useState([]);
  const [formularioRespostaPendente, setFormularioRespostaPendente] =
    useState(false);
  const [formularioResposta, setFormularioResposta] = useState(false);

  async function pegandoDadosFormularioEspecifico() {
    const resposta = await managerService.GetFormularioEspecifico(
      props.location.state.id
    );
    setFormularioEspecifico(resposta);
  }

  async function pegandoFormularioPacientes() {
    const respostaFormularios =
      await managerService.GetFormularioPacientesPorFormulario(
        props.location.state.id
      );

    setformularioPacientes(respostaFormularios);

    const formularioRespostaPendente = respostaFormularios.filter(
      (item) => item.status === false
    );
    setFormularioRespostaPendente(formularioRespostaPendente);

    const formularioResposta = respostaFormularios.filter(
      (item) => item.status !== false
    );
    setFormularioResposta(formularioResposta);
  }

  useEffect(() => {
    pegandoFormularioPacientes();
  }, [props.location.state.id]);

  useEffect(() => {
    pegandoDadosFormularioEspecifico();
  }, [props.location.state.id]);

  return (
    <>
      <ContainerFormularioEspecifico>
        <ContainerFormularioCima>
          <CamposFormularioCima>
            {" "}
            Formulário: {formularioEspecifico.titulo}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {" "}
            Tipo: {formularioEspecifico.tipo}{" "}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {" "}
            Finalidade: {formularioEspecifico.finalidade}
          </CamposFormularioCima>
          <CamposFormularioCima>
            Urgência: {formularioEspecifico.urgencia === 1 ? (
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
          </CamposFormularioCima>
        </ContainerFormularioCima>

        <ColunaEsquerda>
          <ContainerBarraDeBuscaOpcoes>
            <BarraDePesquisa>
              <Search placeholder="BUSCAR" style={{ width: "80%" }} />
            </BarraDePesquisa>
            <Selects>
              <RotuloBarraDeBuscaOpcoes>
                <SelectTipos
                  defaultValue="Status"
                  bordered={false}
                  style={{ width: 90 }}
                ></SelectTipos>
              </RotuloBarraDeBuscaOpcoes>
            </Selects>
          </ContainerBarraDeBuscaOpcoes>

          <BarraEstetica></BarraEstetica>

          {formularioPacientes.map((value) => (
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
                <TextoBarraPaciente
                  fontSize="1.2em"
                  fontWeight="bold"
                  justifyContent="flex-start"
                >
                   {value.nome}
                </TextoBarraPaciente>
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
                    backgroundColor={Cores.lilas[2]}
                    boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                    borderColor={Cores.azulEscuro}
                    borderRadius="5px"
                    height="40%"
                    color={Cores.preto}
                    fontSize="0.8em"
                    fontSizeMedia950="0.6em"
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
            backgroundColor={Cores.azulClaro}
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
      </ContainerFormularioEspecifico>
    </>
  );
}

export default FormularioEspecifico;
