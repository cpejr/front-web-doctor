import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox, Select } from "antd";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  SelectUsuarios,
  StyleSelect,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
//import Select from "../../styles/Select";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [formularioPaciente, setFormularioPaciente] = useState();
  const [carregando, setCarregando] = useState(false);
  const [fechandoModalEnvioF, setFechandoModalEnvio] = useState(false);
  const { Option } = Select;
  

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Cores.azul }} spin />
  );

  async function enviandoFormularioPaciente() {
    setCarregando(true);
    
    if (formularioPaciente) {
      await managerService.EnviandoFormularioPaciente(
        false,
        props.idFormulario,
        formularioPaciente,
      );
      
    } else {
      toast.error("Escolha um paciente para enviar o formulario");
    }
    setCarregando(false);
  }

  async function preenchendoDados(e) {
    setFormularioPaciente(e.target.value);
  }

  async function fechandoModalEnvio(){
    setFechandoModalEnvio(true);
  }

  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Enviar formulário para:</Titulo>
        <SelectUsuarios>
          <Select
            defaultValue="Escolha um paciente"
            id="id_usuario"
            name="id_usuario"
            size="large"
            style={{StyleSelect}}
            onChange={preenchendoDados}
          >
            {props.usuarios?.map((valor) => (
              <>
                {/*<Option value="" disabled selected>
                  Paciente:
            </Option>*/}
                <Option value={valor.id}>{valor.nome}</Option>
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
