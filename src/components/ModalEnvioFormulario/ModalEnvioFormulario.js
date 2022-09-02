import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox, Modal } from "antd";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  SelectUsuarios,
  SelectContainer,
  Select
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [formularioPaciente, setFormularioPaciente] = useState();
  const [carregando, setCarregando] = useState(false);
  const [modalEnvio, setModalEnvio] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 22, color: Cores.azul }} spin />
  );
  

  async function enviandoFormularioPaciente() {
    setCarregando(true);
    if (formularioPaciente) {
      await managerService.EnviandoFormularioPaciente(
        false,
        props.idFormulario,
        formularioPaciente,
      );
    //fechandoModal();
    } else {
      toast.error("Escolha um paciente para enviar o formulario");
    }
    setCarregando(false);
  }

  async function preenchendoDados(e) {
    setFormularioPaciente(e.target.value);
  }


  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Enviar formulário para:</Titulo>
        <SelectUsuarios>
        <SelectContainer
          borderWidth="2px"
          width="100%"
        >
          <Select
            marginTop="0px"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            id="id_usuario"
            name="id_usuario"
            onChange={preenchendoDados}
          >
            {props.usuarios?.map((valor) => (
              <>
                <option value="" disabled selected>
                  Escolha um Paciente:
            </option>
                <option value={valor.id}>{valor.nome}</option>
              </>
            ))}
          </Select></SelectContainer>

          <Checkbox>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>
        </SelectUsuarios>
        <Button
          width="100%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
          onClick={() => enviandoFormularioPaciente()}
        >
          {carregando ? <Spin indicator={antIcon} /> : "ENVIAR"}
        </Button>
      </ContainerModalCodigo>
      <AddToast />
    </>
  );
}

export default ModalEnvioFormulario;
