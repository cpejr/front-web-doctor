import React, { useEffect, useState } from "react";
import Form from "@rjsf/antd";
import { ContainerModalFormulario, Titulo } from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";

function ModalFormulario(props) {
  const [schema, setSchema] = useState();

  const uiSchema = {
    "ui:submitButtonOptions": { norender: true },
  };

  useEffect(() => {
    pegandoDados();
  }, [props]);

  async function pegandoDados() {
    const resposta = await managerService.GetResposta(
      props.idFormularioPaciente
    );
    setSchema(resposta.respostas);
  }

  return (
    <ContainerModalFormulario>
      <Titulo>{props.titulo}</Titulo>
      <Form
        uiSchema={uiSchema}
        schema={props.perguntas}
        formData={schema}
        disabled
      />
    </ContainerModalFormulario>
  );
}

export default ModalFormulario;
