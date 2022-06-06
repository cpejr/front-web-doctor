import React, {useEffect, useState} from "react";
import Form from "@rjsf/antd";
import * as managerService from "../../services/ManagerService/managerService";

function POC5(props) {
const [schema, setSchema] = useState();
const [foi, setFoi] = useState(false);

async function pegandoDados() {
  const resposta = await managerService.GetResposta(
    props.location.state.id_usuario
  );
  setSchema(resposta[3].respostas)
  setFoi(true)
}

useEffect(() => {
  pegandoDados();
}, []);


  return (
    <>
    {foi ? (

      <Form schema={schema}></Form>
    ): (<></>)}
    </>
  );
}

export default POC5;
