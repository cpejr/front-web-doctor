import React from "react";
import Form from "@rjsf/antd";
import { Container } from "./Styles";
import POC4 from "../POC4";
import POC from "../POC/POC";

function POC3() {
  // const schema = {
  //   type: "array",
  //   items: {
  //     type: "object",
  //     properties: {
  //       name: {
  //           type: "boolean",
  //           default: false,
  //       },
  //       // age: {
  //       //   type: "string",
  //       //   enum: ["one", "two", "three"],
  //       // },
  //       //   email: {
  //       //     type: "number",
  //       //     title: "numero",
  //       // },
  //     },
  //   },
  // };

  //   const uiSchema = {
  //     "ui:widget": "password",
  //     "ui:help": "Hint: Make it strong!"
  //   };

  const schema = {
    
      type: "object",
      title: "Boolean field",
      properties: {
        default: {
          type: "boolean",
          title: "checkbox (default)",
          description: "This is the checkbox-description"
        },
        radio: {
          type: "string",
          format: "data-url",
        },
        select: {
          type: "string",
          title: "select box",
        }
      }
    
     
  };
  
  const uiSchema = {
    
      radio: {
        "ui:widget": "radio"
      },
      select: {
        "ui:widget": "select"
      }
    
  };

  // const uiSchema = {
  //   "ui:options": {

  //     age: {
  //       "ui:enumDisabled": ["two"],}
  //   }
  // };

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
    <>
    <Container>
      <POC4 properties={schema} uiSchema={uiSchema}>
      <Form schema={schema} uiSchema={uiSchema}/>
      </POC4>
    {/* <Form schema={schema} uiSchema={uiSchema}/> */}
    </Container>

    </>
  );
}

export default POC3;
