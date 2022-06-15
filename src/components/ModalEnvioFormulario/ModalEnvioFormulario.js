import React, { useState, useEffect } from "react";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  SelectUsuarios,
} from "./Styles";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox } from "antd";
import AddToast from "../AddToast/AddToast";
import Select from "../../styles/Select";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [formularioPaciente, setFormularioPaciente] = useState();

  useEffect(() => {
    pegandoDadosUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function pegandoDadosUsuarios() {
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        usuarios.push(usuario);
      }
    });
  }

  // async function enviandoFormularioPaciente() {
  //   const resposta = await managerService.EnviandoFormularioPaciente();
  // }

  async function preenchendoDados(e) {
    setFormularioPaciente({...formularioPaciente, [e.target.name]: e.target.value})
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
          {usuarios?.map((valor) => (
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
        >
          {/* {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"} */}
          Enviar
        </Button>
      </ContainerModalCodigo>
      <AddToast />
    </>
  );
}

export default ModalEnvioFormulario;
