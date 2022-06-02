import React, { useState } from "react";
import Form from "@rjsf/antd";
import {Container} from "./Styles"
import ArrayFieldTemplate from "./ButaoCriarNovoInput";
import CustomFieldTemplate from "./InputCustomizado";

function POC() {
  const schema = {
    type: "array",
      items: {
        type: "string",},

        //codigo para ja definir quais seram os inputs no caso que nao da para adicionar
        //imagino que para conseguir colocar informacoes nos inputs criados, como rotulo ou placeholder
        //seja necessario fazer algo parecido, mas nao consegui fazer

    // type: "object",
    // required: ["nome", "email"],
    // properties: {
    //   nome: { title: "nome", type: "string" },
    //   email: { title: "email", type: "string" },
    // }, 
    
    
  };
  const uiSchema = {
    "ui:ArrayFieldTemplate": ArrayFieldTemplate
  }


  return (
    <Container>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        ArrayFieldTemplate={ArrayFieldTemplate} 
        FieldTemplate={CustomFieldTemplate}
        onSubmit={({ formData }) => alert(JSON.stringify(formData, null, 2))}
      />
    </Container>
  );
}

export default POC;
