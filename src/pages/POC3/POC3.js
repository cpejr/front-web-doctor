import React, { useState } from "react";

import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";

function POC3() {
  const [schema, setSchema] = useState("");
  const [uiSchema, setUiSchema] = useState("");

  function handleChange(newSchema, newUiSchema) {
    setSchema(newSchema);
    setUiSchema(newUiSchema);
  }
  return (
    <div>
      <FormBuilder
        schema={schema}
        uiSchema={uiSchema}
        onChange={handleChange}
      />
    </div>
  );
}

export default POC3;
