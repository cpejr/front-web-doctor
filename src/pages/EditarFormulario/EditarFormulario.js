import React, { useState, useEffect } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import { CaixaInputs, Container } from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Form } from "@rjsf/antd";
import ModalEditarFormulario from "../../components/ModalEditarFormulario";
import { Modal } from "antd";

function EditarFormulario(props) {
  const [formularios, setFormularios] = useState();
  const [modalAlterar, setModalAlterar] = useState();
  const [aux, setAux] = useState();
  const [foi, setFoi] = useState(false);
  const [perguntas, setPerguntas] = useState();
  const [perguntasAlterar, setPerguntasAlterar] = useState();
  let auxiliar = {};
  let chaves = [];
  const [uiSchema, setUiSchema] = useState("");
  const [schema, setSchema] = useState("");
  const [estado, setEstado] = useState();
  const [campos, setCampos] = useState({});
  // const [perguntasNovo, setPerguntasNovo] = useState({});

  useEffect(() => {
    pegandoDados();
  }, [props]);

  async function pegandoDados() {
    const resposta = await managerService.GetFormularioEspecifico(
      props.location.state.id
    );
    setFormularios(resposta);
    setPerguntas(Object.entries(resposta.perguntas.properties));
    setPerguntasAlterar(resposta.perguntas.properties);
    setFoi(true);
  }

  async function deletarFormulario() {
    await managerService.DeletarFormulario(formularios.id);
  }

  async function atualizarDados() {
    await managerService.updatePerguntasFormulario(
      formularios.id,
      Object.assign(
        auxiliar,
        formularios.perguntas.properties,
        estado.properties
      )
    );
  }

  async function atualizarCamposQueNaoSaoPerguntas() {
    await managerService.UpdateFormularios(formularios.id, campos);
  }

  function preenchendoDados(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  async function fechandoModal() {
    setModalAlterar(false);
  }

  const TirandoCabecalho = {
    showFormHead: false,
  };

  function mudancasForm(newSchema, newUiSchema) {
    setEstado(JSON.parse(newSchema));
    setSchema(newSchema);
    setUiSchema(newUiSchema);
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
          onChange={preenchendoDados}
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
          onChange={preenchendoDados}
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
          onChange={preenchendoDados}
        ></Input>
        <Select
          id={"urgencia"}
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          width="100%"
          name="urgencia"
          onChange={preenchendoDados}
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
          Apagar Formulario
        </Button>
        <Button
          height="50px"
          width="100%"
          backgroundColor={Cores.lilas[1]}
          borderColor={Cores.azul}
          color={Cores.branco}
          fontSize="1.5em"
          fontSizeMedia="1.2em"
          fontWeight="bold"
          onClick={() => setModalAlterar(true)}
        >
          Apagar Pergunta especifica
        </Button>
      </CaixaInputs>
      <FormBuilder
        schema={schema}
        uischema={uiSchema}
        onChange={mudancasForm}
        mods={TirandoCabecalho}
      />
      <Button
        height="50px"
        width="100%"
        backgroundColor={Cores.lilas[1]}
        borderColor={Cores.azul}
        color={Cores.branco}
        fontSize="1.5em"
        fontSizeMedia="1.2em"
        fontWeight="bold"
        onClick={() => atualizarCamposQueNaoSaoPerguntas()}
      >
        Atualizar campos
      </Button>
      <Button
        height="50px"
        width="100%"
        backgroundColor={Cores.lilas[1]}
        borderColor={Cores.azul}
        color={Cores.branco}
        fontSize="1.5em"
        fontSizeMedia="1.2em"
        fontWeight="bold"
        onClick={() => atualizarDados()}
      >
        criar nova pergunta
      </Button>
      {foi ? (
        <Modal
          visible={modalAlterar}
          onCancel={fechandoModal}
          footer={null}
          width={"70%"}
          centered={true}
        >
          <ModalEditarFormulario
            formulario={formularios}
            perguntas={perguntas}
            perguntasAlterar={perguntasAlterar}
            fecharModal={() => fechandoModal()}
          />
        </Modal>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default EditarFormulario;
