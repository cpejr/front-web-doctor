import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { ContainerModalComentario, Titulo, Texto, BotaoAdicionar, TextoIcone, TextoTextArea, Icone } from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import TextArea from "../../styles/TextArea"
import { Cores } from "../../variaveis";
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
      <ContainerModalComentario>
        <Titulo>Adicionar Comentário:</Titulo>
        <TextoTextArea>
          <Texto>Comentário:</Texto>
          <TextArea
            placeholder="Insira um novo Comentário"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            fontSizeMedia950="0.8em"
            width="100%"
            minHeight="100px"
            marginTop="2%"
            marginBottom="2%"
            paddingRight="2%"
            line-height="30px"
            name="comentario"
            onChange={preenchendoDados}
            camposVazios={camposVazios.comentario}
          ></TextArea>
        </TextoTextArea>
        <TextoIcone>
          <Button
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontWeight='medium'
            fontSize='1.7em'
            fontSizeMedia1080='1.5em'
            fontSizeMedia950='1.2em'
            fontSizeMedia480='1em'
            fontSizeMedia400="0.8em"
            heightMedia='2em'
            width='70%'
            widthMedia560="70%"
            widthMedia280="58%"
            height='50px'
            gap='1%'
            boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
            onClick={criarComentario}
          >
            {carregando ? <Spin indicator={antIcon} /> :
              <TextoIcone>
                <div>
                  Adicionar Comentário
                </div>
                <Icone>
                  <PlusSquareOutlined style={{ marginLeft: "4%" }} />
                </Icone>
              </TextoIcone>
            }
          </Button>
        </TextoIcone>
      </ContainerModalComentario>
    </>
  );
}

export default ModalAdicionarComentario;