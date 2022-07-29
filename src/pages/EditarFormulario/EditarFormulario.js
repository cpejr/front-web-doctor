import React, { useState, useEffect } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import { CaixaInputs, Container, EditarFormularioTitulo } from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import ModalEditarFormulario from "../../components/ModalEditarFormulario";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function EditarFormulario(props) {
  const [formularios, setFormularios] = useState();
  const [carregando, setCarregando] = useState(true);
  const [modalAlterar, setModalAlterar] = useState();
  const [perguntas, setPerguntas] = useState();
  const [perguntasAlterar, setPerguntasAlterar] = useState();
  let auxiliar = {};
  const [uiSchema, setUiSchema] = useState("");
  const [schema, setSchema] = useState("");
  const [estado, setEstado] = useState();
  const [campos, setCampos] = useState({});

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetFormularioEspecifico(
      props.location.state.id
    );
    setFormularios(resposta);
    setPerguntas(Object.entries(resposta.perguntas.properties));
    setPerguntasAlterar(resposta.perguntas);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDados();
  }, [props]);

  async function atualizarDados() {
    let perguntas = Object.assign(
      auxiliar,
      formularios.perguntas.properties,
      estado.properties
    );
    estado.properties = perguntas;
    await managerService.updatePerguntasFormulario(formularios.id, estado);
  }

  async function atualizarCamposQueNaoSaoPerguntas() {
    await managerService.UpdateFormularios(formularios.id, campos);
  }

  function preenchendoDados(e) {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  }

  async function abrindoModal() {
    setModalAlterar(true);
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
        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <>
            <EditarFormularioTitulo>Editar Formulário</EditarFormularioTitulo>
            <Input
              placeholder={formularios.titulo}
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
              placeholder={formularios.tipo}
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
              placeholder={formularios.finalidade}
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
              <option value="">{formularios.urgencia}</option>
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
              backgroundColor={Cores.lilas[4]}
              borderColor={Cores.azul}
              color={Cores.azulEscuro}
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
              backgroundColor={Cores.lilas[4]}
              borderColor={Cores.azulEscuro}
              color={Cores.azulEscuro}
              fontSize="1.5em"
              fontSizeMedia="1.2em"
              fontWeight="bold"
              onClick={() => abrindoModal()}
            >
              Apagar pergunta especifica
            </Button>
          </>
        )}
      </CaixaInputs>
      <FormBuilder
        schema={schema}
        uischema={uiSchema}
        onChange={mudancasForm}
        mods={TirandoCabecalho}
      />
      <CaixaInputs>
        <Button
          height="50px"
          width="100%"
          backgroundColor={Cores.lilas[4]}
          borderColor={Cores.azul}
          color={Cores.azulEscuro}
          fontSize="1.5em"
          fontSizeMedia="1.2em"
          fontWeight="bold"
          onClick={() => atualizarDados()}
        >
          Adicionar uma nova pergunta
        </Button>
      </CaixaInputs>

      <Modal
        visible={modalAlterar}
        onCancel={() => setModalAlterar(false)}
        footer={null}
        width={"70%"}
        centered={true}
      >
        <ModalEditarFormulario
          formulario={formularios}
          perguntas={perguntas}
          perguntasAlterar={perguntasAlterar}
        />
      </Modal>
    </Container>
  );
}

export default EditarFormulario;
