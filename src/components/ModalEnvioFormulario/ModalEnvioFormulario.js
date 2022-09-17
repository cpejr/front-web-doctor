import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox } from "antd";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  SelectUsuarios,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import Select from "../../styles/Select";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [formularioPaciente, setFormularioPaciente] = useState();
  const [notificacaoAtiva, setNotificacaoAtiva] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  async function enviandoFormularioPaciente() {
    setCarregando(true);
    if (formularioPaciente) {
      await managerService.EnviandoFormularioPaciente(
        false,
        false,
        props.idFormulario,
        formularioPaciente
      );
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
          <Select
            id="id_usuario"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            name="id_usuario"
            onChange={preenchendoDados}
          >
            {props.usuarios?.map((valor) => (
              <>
                <option value="" disabled selected>
                  Escolha um paciente:
                </option>
                <option value={valor.id}>{valor.nome}</option>
              </>
            ))}
          </Select>

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
