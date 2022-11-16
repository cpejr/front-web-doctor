import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox } from "antd";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";
import { sleep } from "../../utils/sleep";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  Select,
  SelectContainer,
  CheckboxContainer,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [formularioPaciente, setFormularioPaciente] = useState();
  const [carregando, setCarregando] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 22, color: Cores.azul }} spin />
  );

  async function enviandoFormularioPaciente() {
    setCarregando(true);
    if (formularioPaciente) {
      await managerService.EnviandoFormularioPaciente(
        false,
        true,
        props.idFormulario,
        formularioPaciente
      );
      await sleep(2000);
      setCarregando(false);
      await sleep(1000);
      props.fechandoModal()
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
        <SelectContainer borderWidth="2px" width="100%">
          <Select
            id="id_usuario"
            name="id_usuario"
            marginTop="0px"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            onChange={preenchendoDados}
          >
            {props.usuarios?.map((valor) => (
              <>
                <option value="" disabled selected>
                  Escolha o Paciente:
                </option>
                <option value={valor.id}>{valor.nome}</option>
              </>
            ))}
          </Select>
        </SelectContainer>
        <CheckboxContainer>
          <Checkbox>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>
        </CheckboxContainer>
        <Button
          width="100%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          marginTop="3.5%"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
          onClick={() => enviandoFormularioPaciente()}
        >
          {carregando ? <Spin indicator={antIcon} /> : "ENVIAR"}
        </Button>
      </ContainerModalCodigo>
    </>
  );
}

export default ModalEnvioFormulario;
