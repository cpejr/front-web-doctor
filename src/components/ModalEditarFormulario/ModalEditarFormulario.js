import React, { useState, useEffect } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import { CaixaInputs, Container } from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Form } from "@rjsf/antd";
import { Checkbox } from "antd";

function ModalEditarFormulario(props) {
  const [formularios, setFormularios] = useState();
  const [foi, setFoi] = useState(false);
  let auxiliar = "";
  let chaves = [];

  async function deletarCampo(valor) {
    delete props.perguntasAlterar[valor[0]]
    await managerService.updatePerguntasFormulario(
      props.formulario.id,
      props.perguntasAlterar)
    }

  return (
    <Container>
      
      {props.perguntas.map((valor) => (
        <>
      {valor[1].title}
      <Button
        height="50px"
        width="100%"
        backgroundColor={Cores.lilas[1]}
        borderColor={Cores.azul}
        color={Cores.branco}
        fontSize="1.5em"
        fontSizeMedia="1.2em"
        fontWeight="bold"
        onClick={() => deletarCampo(valor)}
      >
        Apagar
      </Button>
        </>
      ))}
      
    </Container>
  
    )}

export default ModalEditarFormulario;