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
  //const [emailUsuarios, setEmailUsuarios] = useState([]);
  const [nomeUsuarios, setNomeUsuarios] = useState([]);
  const emailUsuarios = [];

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
  }

  function pegandoEmailUsuarios() {
    console.log(formularioPacientes);
    for (var i = 0; i < formularioPacientes.length; i++) {
      let email = formularioPacientes[i].email
      emailUsuarios[i] = email;
    }
  }
  
  async function setandoNomeUsuarios() {
    const resposta = [];
    

    for (var i = 0; i < emailUsuarios.length; i++) {
      resposta[i] = await managerService.GetDadosUsuario(emailUsuarios[i]);
    }
    for (var j = 0; j < resposta.length; j++) {
      setNomeUsuarios(resposta[j].dadosUsuario.nome);
    }
  }

  useEffect(() => {
    pegandoEmailUsuarios();
  }, [formularioPacientes]);
  
  useEffect(() => {
    setandoNomeUsuarios();
  }, [emailUsuarios]);

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
            {formularioEspecifico.titulo}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {" "}
            {formularioEspecifico.tipo}{" "}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {" "}
            {formularioEspecifico.data}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {" "}
            {formularioEspecifico.finalidade}
          </CamposFormularioCima>
          <CamposFormularioCima>
            {formularioEspecifico.urgencia === 1 ? (
              <>
                <StarOutlined />
                <StarOutlined />
                <StarFilled />
              </>
            ) : formularioEspecifico.urgencia === 2 ? (
              <>
                <StarOutlined />
                <StarFilled />
                <StarFilled />
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
              <Search placeholder="BUSCAR" style={{ width: 400 }} />
            </BarraDePesquisa>
            <RotuloBarraDeBuscaOpcoes>
              <SelectTipos
                defaultValue="Todos os pacientes"
                bordered={false}
                style={{ width: 170 }}
              ></SelectTipos>
            </RotuloBarraDeBuscaOpcoes>
            <RotuloBarraDeBuscaOpcoes>
              <SelectTipos
                defaultValue="Todas as datas"
                bordered={false}
                style={{ width: 140 }}
              ></SelectTipos>
            </RotuloBarraDeBuscaOpcoes>
            <RotuloBarraDeBuscaOpcoes>
              <SelectTipos
                defaultValue="Status"
                bordered={false}
                style={{ width: 90 }}
              ></SelectTipos>
            </RotuloBarraDeBuscaOpcoes>
          </ContainerBarraDeBuscaOpcoes>

          <BarraEstetica></BarraEstetica>

          <BarraPaciente>
            <BarraEsquerda>
              <img
                src={fotoPerfil}
                className="fotoPerfil"
                alt="fotoPerfil"
                width="120px"
                height="120px"
              ></img>

              <TextoBarraPaciente fontSize="1.3em" fontWeight="bold">
                Nome:{}
              </TextoBarraPaciente>
            </BarraEsquerda>

            <BarraDireita>
              <TextoBarraPaciente
                fontSize="1.3em"
                fontWeight="bold"
                justifyContent="flex-start"
              >
                Resposta Pendente{" "}
              </TextoBarraPaciente>

              <Button
                width="24%"
                backgroundColor={Cores.lilas[2]}
                boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                borderColor={Cores.azulEscuro}
                borderRadius="5px"
                height="29%"
                color={Cores.preto}
                fontSize="1.1em"
              >
                ENVIAR LEMBRETE
              </Button>
            </BarraDireita>
          </BarraPaciente>
        </ColunaEsquerda>
        <ColunaDireita>
          <BarraRespostas>
            Aguardando respostas de ____ usuários.
          </BarraRespostas>
          <BarraRespostas> ____ usuários já responderam.</BarraRespostas>
          <Button
            backgroundColor={Cores.azulClaro}
            borderRadius="3px"
            borderWidth="1px"
            borderColor={Cores.preto}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            color={Cores.preto}
            fontSize="15px"
            height="35px"
            width="30%"
            marginTop="10%"
            marginLeft="30%"
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
