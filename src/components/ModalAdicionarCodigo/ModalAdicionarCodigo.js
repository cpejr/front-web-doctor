import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo } from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalAdicionarCodigo(props) {
  const [usuario, setUsuario] = useState({});
  const [codigo, setCodigo] = useState({});
  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
  }

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
  }

  useEffect(() => {
    pegandoDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function setandoCodigo() {
    setCarregando(true);
    setCodigo(usuario.codigo);
    setCarregando(false);
  }

  useEffect(() => {
    setandoCodigo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);

  async function atualizarDados() {
    setCarregando(true);
    if (codigo === "") {
      await managerService.UpdateCodigo(usuario.id, null);
    } else {
      await managerService.UpdateCodigo(usuario.id, codigo);
    }
    props.fechandoModal();
  }

  function preenchendoDados(e) {
    setCodigo(e.target.value);
  }

  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Insira um código:</Titulo>

        {codigo === null ? (
          <Input
            value=""
            placeholder="Codigo"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            paddingRight="2%"
            name="codigo"
            onKeyPress={verificandoEnter}
            onChange={preenchendoDados}
          ></Input>
        ) : (
          <Input
            value={codigo}
            placeholder="Codigo"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            paddingRight="2%"
            name="codigo"
            onKeyPress={verificandoEnter}
            onChange={preenchendoDados}
          ></Input>
        )}

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
          {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"}
        </Button>
      </ContainerModalCodigo>
    </>
  );
}

export default ModalAdicionarCodigo;
