import React, { useEffect, useState } from "react";
import Form from "@rjsf/antd";
import * as managerService from "../../services/ManagerService/managerService";

function ModalFormulario(props) {
  const [schema, setSchema] = useState();
  const [foi, setFoi] = useState(false);

  useEffect(() => {
    pegandoDados();
  }, [props]);

  async function pegandoDados() {
    const resposta = await managerService.GetResposta(
      props.idFormularioPaciente
    );
    setSchema(resposta.respostas);
    setFoi(true);
  }
  
  return <>{foi ? <Form schema={schema}></Form> : <></>}</>;
}

export default ModalFormulario;
