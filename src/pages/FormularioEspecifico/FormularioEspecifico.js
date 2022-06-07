import React, { useState, useEffect } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import { CaixaInputs, Container } from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function FormularioEspecifico(props) {
//   const [uiSchema, setUiSchema] = useState("");
//   const [schema, setSchema] = useState("");
//   const [estado, setEstado] = useState({});

//   function mudancasForm(newSchema, newUiSchema) {
//     setEstado({ ...estado, perguntas: newSchema });
//     setSchema(newSchema);
//     setUiSchema(newUiSchema);
//   }

//   function preenchendoDados(e) {
//     setEstado({ ...estado, [e.target.name]: e.target.value });
//   }

//   async function requisicaoFormularios() {
//     console.log(estado)
//     await managerService.CriarFormulario(estado);
//     }
const [formularios, setFormularios] = useState();
async function pegandoDados() {
  const resposta = await managerService.GetFormularioEspecifico(
    props.location.state.id
  );
  setFormularios(resposta)
}

useEffect(() => {
  pegandoDados();
}, []);

async function deletarFormulario() {
    await managerService.DeletarFormulario(formularios.id);
  }

  return (
    <Container>
      <CaixaInputs>
        <Input
          placeholder="{formularios.titulo}"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="titulo"
        ></Input>
        <Input
          placeholder="{formularios.tipo}"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="tipo"
        ></Input>
        <Input
          placeholder="{formularios.finalidade}"
          backgroundColor={Cores.cinza[7]}
          borderColor={Cores.azul}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="finalidade"
        ></Input>
        <Select
          id={"urgencia"}
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          width="100%"
          name="urgencia"
        >
          <option value="">urgencia</option>
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
        fontWeight="bold"
        onClick={() => deletarFormulario()}
      >
        Apagar
      </Button>
      </CaixaInputs>

      {/* <FormBuilder
        schema={schema}
        uischema={uiSchema}
        onChange={mudancasForm}
      />
      <p>{estado.perguntas}</p> */}

    </Container>
  );
}

export default FormularioEspecifico;
