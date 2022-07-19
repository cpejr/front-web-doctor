import React, { useState, useEffect } from "react";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import { ContainerModalCodigo, Titulo } from "./Styles";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AddToast from "../AddToast/AddToast";
import * as managerService from "../../services/ManagerService/managerService";
import { redirecionamento, sleep } from "../../utils/sleep";

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

  function setandoCodigo() {
    setCarregando(true);
    setCodigo(usuario.codigo);
    setCarregando(false);
  }

  async function atualizarDados() {
    setCarregando(true);
    if (codigo === "") {
      await managerService.UpdateCodigo(usuario.id, null);
    } else {
      await managerService.UpdateCodigo(usuario.id, codigo);
    }
    await sleep(3000);
    /* redirecionamento("/web/listadeusuarios"); 
    setCarregando(false); */
  }

  function preenchendoDados(e) {
    setCodigo(e.target.value);
  }

  useEffect(() => {
    pegandoDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    setandoCodigo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);


  return (
    <>
    <ContainerModalCodigo>
      <Titulo>Insira um codigo</Titulo>

      {codigo === null?(
        <Input
          value = ""
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
          
      ): (
        <Input
          value = {codigo}
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
    <AddToast />
    </>
  );
}

export default ModalAdicionarCodigo;
