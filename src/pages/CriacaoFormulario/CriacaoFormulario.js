import React, { useState } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import { CaixaInputs, Container } from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function CriacaoFormulario() {
  const [uiSchema, setUiSchema] = useState("");
  const [schema, setSchema] = useState("");
  const [estado, setEstado] = useState({});

  const TirandoCabecalho = {
    showFormHead: false,
  }

  function mudancasForm(newSchema, newUiSchema) {
    setEstado({ ...estado, perguntas: newSchema });
    setSchema(newSchema);
    setUiSchema(newUiSchema);
  }

  function preenchendoDados(e) {
    setEstado({ ...estado, [e.target.name]: e.target.value });
  }

  async function requisicaoFormularios() {
    await managerService.CriarFormulario(estado);
    }

  return (
    <Container>
      <CaixaInputs>
        <Input
          placeholder="Titulo"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="titulo"
          onChange={preenchendoDados}
        ></Input>
        <Input
          placeholder="Tipo"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="tipo"
          onChange={preenchendoDados}
        ></Input>
        <Input
          placeholder="Finalidade"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="finalidade"
          onChange={preenchendoDados}
        ></Input>
        <Select
          id="urgencia"
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          width="100%"
          name="urgencia"
          onChange={preenchendoDados}
        >
          <option value="">Urgência</option>
          <option value="1" borderColor={Cores.azul}>
            1
          </option>
          <option value="2" borderColor={Cores.azul}>
            2
          </option>
          <option value="3" borderColor={Cores.azul}>
            3
          </option>
        </Select>
      <Button
        height="50px"
        width="100%"
        backgroundColor={Cores.lilas[1]}
        borderColor={Cores.azul}
        color={Cores.branco}
        fontSize="1.5em"
        fontSizeMedia="1.2em"
        onClick={() => requisicaoFormularios()}
        fontWeight="bold"
      >
        CRIAR
      </Button>
      </CaixaInputs>

      <FormBuilder
        schema={schema}
        uischema={uiSchema}
        onChange={mudancasForm}
        mods={
          TirandoCabecalho
        }
      />
      <p>{estado.perguntas}</p>

    </Container>
  );
}

export default CriacaoFormulario;