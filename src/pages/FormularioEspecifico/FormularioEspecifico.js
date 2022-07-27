import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
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
  RotuloFormularioCima,
  TextoBarraPaciente,
  ImagemPaciente,
  RotuloBarraDeBuscaOpcoes,
  BarraDePesquisa,
  ContainerBarraDeBuscaOpcoes
  
} from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { Titulo } from "../ListaUsuarios/Styles";

function FormularioEspecifico() {

    return(
        <>  
        <ContainerFormularioEspecifico>
            <ContainerFormularioCima>
                <RotuloFormularioCima> Titulo do Forms</RotuloFormularioCima>
                <RotuloFormularioCima> Tipo do forms</RotuloFormularioCima>
                <RotuloFormularioCima> Data</RotuloFormularioCima>
                <RotuloFormularioCima> Finalidade</RotuloFormularioCima>
                <RotuloFormularioCima> Urgência</RotuloFormularioCima>
            </ContainerFormularioCima>
            <ColunaEsquerda>
            <ContainerBarraDeBuscaOpcoes>
                <BarraDePesquisa>Buscar</BarraDePesquisa>
                <RotuloBarraDeBuscaOpcoes>Todos os pacientes</RotuloBarraDeBuscaOpcoes>
                <RotuloBarraDeBuscaOpcoes>Todas as datas</RotuloBarraDeBuscaOpcoes>
                <RotuloBarraDeBuscaOpcoes>Status</RotuloBarraDeBuscaOpcoes>
            </ContainerBarraDeBuscaOpcoes>
                <BarraEstetica></BarraEstetica>
                <BarraPaciente>
                    <ImagemPaciente>
                    <img
                        src={fotoPerfil}
                        className="fotoPerfil"
                        alt="fotoPerfil"
                        width="140%"
                        height="90%"
                    ></img>
                    </ImagemPaciente>
                    <TextoBarraPaciente
                    fontSize="1.3em"
                    fontWeight="bold"
                    justifyContent = "flex-start"
                    >Nome: </TextoBarraPaciente>

                    <TextoBarraPaciente
                    fontSize="1.3em"
                    fontWeight="bold"
                    justifyContent = "flex-start"
                    >Resposta Pendente </TextoBarraPaciente>

                <Button
                    width="28%"
                    backgroundColor={Cores.lilas[2]}
                    boxShadow= "3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                    borderColor={Cores.azulEscuro}
                    borderRadius = "5px"
                    height="25%"
                    color={Cores.preto}
                    fontSize = "1.1em"
                >
                    ENVIAR LEMBRETE
                </Button>
                </BarraPaciente>

                <BarraPaciente>
                    <ImagemPaciente>
                    <img
                        src={fotoPerfil}
                        className="fotoPerfil"
                        alt="fotoPerfil"
                        width="110%"
                        height="90%"
                    ></img>
                    </ImagemPaciente>
                    <TextoBarraPaciente
                    fontSize="1.3em"
                    fontWeight="bold"
                    justifyContent = "flex-start"
                    >Nome: </TextoBarraPaciente>
                </BarraPaciente>

                <BarraPaciente>
                    <ImagemPaciente>
                    <img
                        src={fotoPerfil}
                        className="fotoPerfil"
                        alt="fotoPerfil"
                        width="110%"
                        height="90%"
                    ></img>
                    </ImagemPaciente>
                    <TextoBarraPaciente
                    fontSize="1.3em"
                    fontWeight="bold"
                    justifyContent = "flex-start"
                    >Nome: </TextoBarraPaciente>
                </BarraPaciente>

            </ColunaEsquerda>
            <ColunaDireita>
                <BarraRespostas>Aguardando respostas de ____ usuários.</BarraRespostas>
                <BarraRespostas> ____ usuários já responderam.</BarraRespostas>
                <Button
                    backgroundColor="transparent"
                    borderColor="transparent"
                    color="green"
                    fontSize="1em"
                    textDecoration="underline"
                    height="10px"
                    marginTop = "120%"
                    marginLeft = "30%"
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