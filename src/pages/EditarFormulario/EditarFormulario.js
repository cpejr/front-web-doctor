import React, { useState, useEffect } from "react";
import { FormBuilder } from "@ginkgo-bioworks/react-json-schema-form-builder";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import {
  CaixaInputs,
  Container,
  EditarFormularioTitulo,
  Titulo,
  TextoOrientacao,
  ContainerAdicionarPergunta,
  TituloContainer,
} from "./Styles";
import Select from "../../styles/Select/Select";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import ModalEditarFormulario from "../../components/ModalEditarFormulario";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
import { toast } from "react-toastify";
import { sleep } from "../../utils/sleep";
import "bootstrap/dist/css/bootstrap.min.css";

function EditarFormulario(props) {
  const [formularios, setFormularios] = useState();
  const [carregando, setCarregando] = useState(true);
  const [modalAlterar, setModalAlterar] = useState();
  const [perguntas, setPerguntas] = useState();
  const [perguntasAlterar, setPerguntasAlterar] = useState();
  let auxiliar = {};
  const [uiSchema, setUiSchema] = useState("");
  const [schema, setSchema] = useState("");
  const [estado, setEstado] = useState({});
  const [campos, setCampos] = useState({});

  const [botaoForms, setBotaoForms] = useState(false);

  const [carregandoBotaoAtualizar, setCarregandoBotaoAtualizar] =
    useState(false);

  const [camposVazios, setCamposVazios] = useState({
    titulo: true,
    tipo: true,
    finalidade: true,
    urgencia: true,
  });

  const [teste, setTeste] = useState({
    titulo: true,
    tipo: true,
    finalidade: true,
    urgencia: true,
  });

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );

  const antIconAtualizarCampos = (
    <LoadingOutlined style={{ fontSize: 24, color: Cores.azul }} spin />
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
    if (botaoForms) {
      let aux = JSON.parse(schema);

      if (JSON.stringify(aux.properties) === "{}") {
        toast.error("Adicione uma pergunta para concluir esta ação.");
      } else {
        Object.assign(
          auxiliar,
          formularios.perguntas.properties,
          estado.properties
        );


        estado.properties = auxiliar;
        await managerService.EditarPerguntasFormulario(formularios.id, estado);
        await sleep(1500);
        window.location.href = "/web/listaformularios";
      }
    } else {
      toast.error("Adicione uma pergunta para concluir esta ação.");
    }
  }

  async function atualizarCamposQueNaoSaoPerguntas() {
    setCarregandoBotaoAtualizar(true);

    if (_.isEqual(camposVazios, teste)) {
      toast.error("Preencha algum campo para atualizar.");
      setCarregandoBotaoAtualizar(false);
    } else {
      await managerService.EditarFormularios(formularios.id, campos);
      await sleep(1500);
      window.location.href = "/web/listaformularios";
      setCarregandoBotaoAtualizar(false);
    }
  }

  function preenchendoDados(e) {
    if (e.target.value !== "") {
      setCamposVazios({ ...camposVazios, [e.target.name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [e.target.name]: true });
    }

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

    setBotaoForms(true);
  }


  async function fechandoModalAlterarPerguntas() {
    setModalAlterar(false);
    pegandoDados();
  }

  return (
    <Container>
      <CaixaInputs>
        {carregando ? (
          <Spin indicator={antIcon} />
        ) : (
          <>
            <EditarFormularioTitulo>Editar Formulário</EditarFormularioTitulo>
            <Titulo>Título: </Titulo>
            <Input
              placeholder={formularios.titulo}
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="0px"
              name="titulo"
              marginBottom="2%"
              onChange={preenchendoDados}
            ></Input>
            <Titulo>Tipo: </Titulo>
            <Input
              placeholder={formularios.tipo}
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="0px"
              name="tipo"
              marginBottom="2%"
              onChange={preenchendoDados}
            ></Input>
            <Titulo>Finalidade: </Titulo>
            <Input
              placeholder={formularios.finalidade}
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="0px"
              name="finalidade"
              marginBottom="2%"
              onChange={preenchendoDados}
            ></Input>
            <Titulo>Urgência: </Titulo>
            <Select
              id={"urgencia"}
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              width="100%"
              name="urgencia"
              onChange={preenchendoDados}
              marginTop="0px"
              marginBottom="2%"
              borderWidth="2px"
            >
              <option value="" disabled selected>
                {formularios.urgencia}
              </option>

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
              fontSize="1.35em"
              fontSizeMedia="1.2em"
              fontWeight="bold"
              onClick={() => atualizarCamposQueNaoSaoPerguntas()}
              marginTop="4%"
            >
              {carregandoBotaoAtualizar ? (
                <Spin indicator={antIconAtualizarCampos} />
              ) : (
                <>Atualizar campos</>
              )}
            </Button>
            <TextoOrientacao>
              Aperte o botão acima para modificar os campos já salvos referentes
              ao formulário.{" "}
            </TextoOrientacao>
            <Button
              height="50px"
              width="100%"
              backgroundColor={Cores.lilas[4]}
              borderColor={Cores.azulEscuro}
              color={Cores.azulEscuro}
              fontSize="1.35em"
              fontSizeMedia="1.2em"
              fontWeight="bold"
              onClick={() => abrindoModal()}
            >
              Apagar pergunta especifica
            </Button>
            <TextoOrientacao>
              Aperte o botão acima para selecionar uma pergunta do formulário e
              apagá-la.
            </TextoOrientacao>

            <ContainerAdicionarPergunta>
              <TituloContainer>Adicionar nova pergunta</TituloContainer>
              <TextoOrientacao>
                Aperte no + verde abaixo. Em seguida, clique em “Create”. Altere
                o “Object Name” para um nome único, não o deixe vazio, e escreva
                a pergunta em “Display Name”. Escolha o tipo do input em “Input
                Type”. Quando finalizar, clique em “Concluído”.
              </TextoOrientacao>
              <FormBuilder
                schema={schema}
                uischema={uiSchema}
                onChange={mudancasForm}
                mods={TirandoCabecalho}
              />

              <Button
                height="50px"
                width="50%"
                backgroundColor={Cores.lilas[4]}
                borderColor={Cores.azul}
                color={Cores.azulEscuro}
                fontSize="1.1em"
                fontSizeMedia="0.9em"
                fontWeight="bold"
                onClick={() => atualizarDados()}
              >
                Concluído
              </Button>
            </ContainerAdicionarPergunta>
          </>
        )}
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
          fechandoModal={() => fechandoModalAlterarPerguntas()}
        />
      </Modal>
    </Container>
  );
}

export default EditarFormulario;
