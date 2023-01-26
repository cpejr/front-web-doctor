import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo } from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function ModalExcluirComentario(props) {
    const [comentarios, setComentarios] = useState([]);
    const [comentarioEscolhido, setComentarioEscolhido] = useState();
    const [carregando, setCarregando] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const history = useHistory();

    useEffect(() => {
        async function pegandoComentarios() {
            setCarregando(true);
            const resposta = await managerService.GetComentario();

            setComentarios(resposta);
            setCarregando(false);
        }

        pegandoComentarios();
    }, []);

    function escolhendoComentario(value) {
        setComentarioEscolhido(value);
    }

    async function deletandoComentario() {
        setCarregando(true);

        await managerService.DeleteComentario(comentarioEscolhido, {
            mensagemSucesso: "Receita deletada com sucesso",
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
                <Titulo>Excluir Comentário:</Titulo>

                <Select
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
                    onChange={escolhendoComentario}
                >
                    <option value="" disabled selected>
                        Escolher Comentário para deletar
                    </option>
                    {comentarios.map((value) => (
                        <option key={value.comentarios} value={value.comentarios} color="red">
                            {value.comentarios}
                        </option>
                    ))}
                </Select>

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