import React, { useState } from "react";
import Form from "@rjsf/antd";
import {Container} from "./Styles"

function POC() {
    const schema = {
        type: "array",
        items: {
          type: "object",
          properties: {
              name: {
                  type: "string"
              },
              age: {
                  type: "string"
              }
          }
        }
      };

        //codigo para ja definir quais seram os inputs no caso que nao da para adicionar
        //imagino que para conseguir colocar informacoes nos inputs criados, como rotulo ou placeholder
        //seja necessario fazer algo parecido, mas nao consegui fazer

    // type: "object",
    // required: ["nome", "email"],
    // properties: {
    //   nome: { title: "nome", type: "string" },
    //   email: { title: "email", type: "string" },
    // }, 



  return (
    <Container>
      <Form
        schema={schema}
      />
    </Container>
  );
}

export default POC;
