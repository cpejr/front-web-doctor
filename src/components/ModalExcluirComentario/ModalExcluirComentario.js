import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo } from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalExcluirComentario(props) {
    const [comentario, setComentario] = useState({});
    const [carregando, setCarregando] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    async function deletandoComentario() {
        setCarregando(true);
        await managerService.DeleteComentario(comentario.id, comentario);
        props.fechandoModal();
    }

    return (
        <>
            <ContainerModalCodigo>
                <Titulo>Excluir Comentário:</Titulo>

                <Input
                    value=""
                    placeholder="Escolher Comentário para deletar"
                    backgroundColor="#E4E6F4"
                    borderColor="#151B57"
                    color="black"
                    fontSize="1em"
                    width="70%"
                    marginTop="2%"
                    marginBottom="2%"
                    paddingRight="2%"
                    name="codigo"
                    //onKeyPress={verificandoEnter}
                    //onChange={preenchendoDados}
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
                    onClick={() => deletandoComentario()}
                >
                    {carregando ? <Spin indicator={antIcon} /> : "Excluir Comentário"}
                </Button>
            </ContainerModalCodigo>
        </>
    );
}

export default ModalExcluirComentario;