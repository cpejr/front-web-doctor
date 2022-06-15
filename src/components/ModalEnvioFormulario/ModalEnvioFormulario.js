import React, { useState, useEffect } from "react";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { ContainerModalCodigo, Titulo, TextoCheckbox } from "./Styles";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox } from "antd";
import AddToast from "../AddToast/AddToast";
import * as managerService from "../../services/ManagerService/managerService";
import { redirecionamento, sleep } from "../../utils/sleep";

function ModalEnvioFormulario(props) {
  const [usuario, setUsuario] = useState({});
  const [codigo, setCodigo] = useState({});
  //   const [carregando, setCarregando] = useState(false);
  //   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
  }

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
  }

  async function atualizarDados() {
    // setCarregando(true);
    if (usuario.codigo) {
      await managerService.UpdateCodigo(
        usuario.id,
        usuario.codigo + "/" + codigo
      );
    } else {
      await managerService.UpdateCodigo(usuario.id, codigo);
    }
    await sleep(3000);
    redirecionamento("/web/listadeusuarios");
    // setCarregando(false);
  }

  function preenchendoDados(e) {
    setCodigo(e.target.value);
  }

  useEffect(() => {
    pegandoDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Enviar formulário para:</Titulo>
        <Input
          placeholder="Codigo"
          backgroundColor="#E4E6F4"
          borderColor="#151B57"
          color="black"
          fontSize="1em"
          width="100%"
          marginTop="2%"
          name="codigo"
          onKeyPress={verificandoEnter}
          onChange={preenchendoDados}
        ></Input>
        <Checkbox>
          <TextoCheckbox>Notificar paciente</TextoCheckbox>
        </Checkbox>

        <Button
          width="100%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
          onClick={() => atualizarDados()}
        >
          {/* {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"} */}
          Enviar
        </Button>
      </ContainerModalCodigo>
      <AddToast />
    </>
  );
}

export default ModalEnvioFormulario;
