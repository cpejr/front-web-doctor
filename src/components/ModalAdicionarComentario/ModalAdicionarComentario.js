import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo, Texto, BotaoAdicionar, TextoIcone } from "./Styles";
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
    const { value, name } = e.target;

    if (camposVazios[name])
      setCamposVazios((valorAnterior) => ({ ...valorAnterior, [name]: false }));

    setEstado({ ...estado, [name]: value });

    setComentario({ ...comentario, comentario: value });

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
      mensagemSucesso: "Comentário criado com sucesso",
      tempo: 1500,
      onClose: () => {
        history.push("/web/edicaocomentario");
      },
    });
    props.fechandoModal();
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
          color="black"
          fontSize="1em"
          width="70%"
          marginTop="2%"
          marginBottom="2%"
          paddingRight="2%"
          name="comentario"
          onChange={preenchendoDados}
          camposVazios={camposVazios.comentario}
        ></Input>
        <BotaoAdicionar
          onClick={criarComentario}
        >
          {carregando ? <Spin indicator={antIcon} /> :
            <TextoIcone>
              Adicionar Comentário
              <PlusSquareOutlined />
            </TextoIcone>}
        </BotaoAdicionar>
      </ContainerModalCodigo>
    </>
  );
}

export default ModalAdicionarComentario;