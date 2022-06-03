import React from "react";
import Form from "@rjsf/antd";

function POC4(props) {
  const schema = {
    type: "array",
    items: props.properties
    
  };

  const uiSchema = props.uiSchema

  return (
    <>
      <Form schema={schema} uiSchema={uiSchema}></Form>
    </>
  );
}

export default POC4;
