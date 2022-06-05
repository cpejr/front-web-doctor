import React from "react";
import Form from "@rjsf/antd";
import POC4 from "../../pages/POC4";

function InputPOC() {
  const schema = {
      type: "object",
      properties: {
        
        select: {
          type: "string",
          title: "input",
        }
      }
  };

  return (
    <>
      <POC4 properties={schema} >
      <Form schema={schema}/>
      </POC4>

    </>
  );
}

export default InputPOC;
