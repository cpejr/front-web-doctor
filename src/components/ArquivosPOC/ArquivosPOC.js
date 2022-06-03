import React from "react";
import Form from "@rjsf/antd";
import POC4 from "../../pages/POC4";

function ArquivosPOC() {
  const schema = {
    type: "object",
    properties: {
      arquivos: {
        type: "string",
        format: "data-url",
      },
    },
  };

  return (
    <>
      <POC4 properties={schema}>
        <Form schema={schema} />
      </POC4>
    </>
  );
}

export default ArquivosPOC;
