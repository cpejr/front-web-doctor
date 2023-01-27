import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo, Texto } from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import _ from "lodash";
import * as managerService from "../../services/ManagerService/managerService";

const camposVaziosReferencia = {
	comentario: false,
};

const estadoIncial = {
	comentario: "",
};

function ModalAdicionarComentario(props) {
  const [comentario, setComentario] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [estado, setEstado] = useState(estadoIncial);
	const [camposVazios, setCamposVazios] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const history = useHistory();


  function preenchendoDados(e) {
    e.preventDefault();
    const { value } = e.target;

    if (camposVazios[value])
			setCamposVazios((valorAnterior) => ({ ...valorAnterior, [value]: false }));

		setEstado({ ...estado, [value]: value });

    setComentario({...comentario, comentario: value});
    
  }

  async function criarComentario(e) {
    e.preventDefault();

    const camposVaziosAtual = {
			comentario: !estado.comentario
		};

		setCamposVazios(camposVaziosAtual);

		if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
			toast.warn("Preencha todos os campos");
			return;
		}

    setCarregando(true);

    await managerService.CriandoComentario(comentario, {
      mensagemSucesso: "Receita criada com sucesso",
      tempo: 1500,
      onClose: () => {
        history.push("/web/edicaocomentario");
      },
    });

    setCarregando(false);
  }

  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Adicionar Comentário:</Titulo>

        <Texto>Comentário:</Texto>
        <Input
          placeholder="Insira um novo Comentário"
          backgroundColor="#E4E6F4"
          borderColor="#151B57"
          color="black"
          fontSize="1em"
          width="70%"
          marginTop="2%"
          marginBottom="2%"
          paddingRight="2%"
          name="comentario"
          onChange={preenchendoDados}
        ></Input>

        <Button
          width="60%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
          onClick={criarComentario}
        >
          {carregando ? <Spin indicator={antIcon} /> : "Adicionar Comentário"}
        </Button>
      </ContainerModalCodigo>
    </>
  );
}

export default ModalAdicionarComentario;