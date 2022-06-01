import React from "react";
import Form from "react-jsonschema-form";

function POC() {
  const schema = {
    type: "object",
    required: ["nome", "email"],
    properties: {
      nome: { title: "nome", type: "string" },
      email: { title: "email", type: "string" },
    },
    // referrals: {
    //   type: "array",
    //   items: {
    //     type: "object",
    //     required: ["nome", "email"],
    //     properties: {
    //       nome: { title: "nome", type: "string" },
    //       email: { title: "email", type: "string" },
    //     },
    //   },
    // },     nao consegui fazer isso funcionar
  };

  return (
    
      <Form
        schema={schema}
        onSubmit={({ formData }) => alert(JSON.stringify(formData, null, 2))}
      />
    
  );
}

export default POC;
