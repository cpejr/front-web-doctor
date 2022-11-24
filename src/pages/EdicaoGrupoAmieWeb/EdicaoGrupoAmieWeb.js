import React, { useEffect, useState } from "react";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Spin, Menu, Dropdown, Modal } from "antd";
import { useHistory } from "react-router-dom";
import {
  ContainerEditarGrupoAmieWeb,
  DadosGrupoAmie,
  Botoes,
  TheOneAboveAll,
  Titulo,
} from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { brParaPadrao } from "../../utils/date";
import { toast } from "react-toastify";
import _, { get } from "lodash";
import { sleep, redirecionamento } from "../../utils/sleep";
import Select from "../../styles/Select/Select";
import ModalAlterarFoto from "../../components/ModalAlterarFoto";
import ModalExcluirFoto from "../../components/ModalExcluirFoto";

function EdicaoGrupoAmieWeb() {

  return (
    <TheOneAboveAll>
      <ContainerEditarGrupoAmieWeb>
        <Titulo
        
        >
          Página Grupo AMIE
        </Titulo>

        <DadosGrupoAmie>
          <Titulo>
            ALODFUS
          </Titulo>
          <Input />
        </DadosGrupoAmie>

        <Botoes>
          <Button
            width='300px'
            height='60px'
            backgroundColor={Cores.cinza[2]}
            color={Cores.branco}
            fontSize='24px'
            >
            Salvar Alterações
          </Button>
          <Button
            width='300px'
            height='60px'
            backgroundColor={Cores.amarelo}
            fontSize='24px'
          >
            Cancelar Alterações
          </Button>
        </Botoes>

      </ContainerEditarGrupoAmieWeb>

    </TheOneAboveAll>
  )
}
export default EdicaoGrupoAmieWeb;
