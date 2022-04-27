import React, { useState, useEffect } from "react";
import {
  ContainerPerfil,
  Perfil,
  Formularios,
  Receitas,
  PerfilSuperior,
  PerfilInferior,
  FotoPerfil,
  Dados,
  Nome,
  DataAnos,
  Data,
  Anos,
  PerfilEsquerda,
  PerfilDireita,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

function PerfilPaciente() {
  
  return (
    <ContainerPerfil>
      <Perfil>
        <PerfilEsquerda>
          <PerfilSuperior>
            <FotoPerfil></FotoPerfil>
            <Dados>
              <Nome>teste</Nome>
              <DataAnos>
                <Data>teste</Data>
                <Anos>teste</Anos>
              </DataAnos>
            </Dados>
          </PerfilSuperior>
          <PerfilInferior></PerfilInferior>
        </PerfilEsquerda>
        <PerfilDireita></PerfilDireita>
      </Perfil>
      <Formularios></Formularios>
      <Receitas></Receitas>
    </ContainerPerfil>
  );
}

export default PerfilPaciente;
