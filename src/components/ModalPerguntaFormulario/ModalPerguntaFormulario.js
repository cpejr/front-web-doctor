import React, { useEffect, useState } from "react";
import Form from "@rjsf/antd";
import { ContainerModalPerguntaFormulario, Titulo } from "./Styles";

function ModalPerguntaFormulario(props) {
  const [schema, setSchema] = useState();

  const uiSchema = {
    "ui:submitButtonOptions": { norender: true },
  };


  return (
    <ContainerModalPerguntaFormulario>
      <Titulo>{props.titulo}</Titulo>
      <Form
        uiSchema={uiSchema}
        schema={props.perguntas}
      />
    </ContainerModalPerguntaFormulario>
  );
}

export default ModalPerguntaFormulario;