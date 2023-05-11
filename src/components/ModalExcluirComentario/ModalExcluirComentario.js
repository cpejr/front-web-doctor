import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { ContainerModalComentario, TextoIcone, Titulo, Icone } from "./Styles";
import Button from "../../styles/Button";
import Select from "../../styles/Select";
import _ from "lodash";
import { toast } from "react-toastify";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";

const camposVaziosReferencia = {
    id: false,
};

const estadoInicial = {
    id: "",
};

function ModalExcluirComentario(props) {
    const [comentarios, setComentarios] = useState([]);
    const [id, setId] = useState();
    const [carregando, setCarregando] = useState(false);
    const [camposVazios, setCamposVazios] = useState({});
    const [estado, setEstado] = useState(estadoInicial);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const history = useHistory();

    function escolhendoComentario(e) {
        e.preventDefault();
        const { value, name } = e.target;

        if (camposVazios[name])
            setCamposVazios((valorAnterior) => ({ ...valorAnterior, [name]: false }));

        setEstado({ ...estado, [name]: value });

        setId(value);

    }

    async function pegandoComentarios() {
        setCarregando(true);
        const resposta = await managerService.GetComentario();

        setComentarios(resposta);
        setCarregando(false);
    }

    useEffect(() => {
        pegandoComentarios();
    }, []);


    async function deletandoComentario(id) {

        const camposVaziosAtual = {
            id: !estado.id
        };

        setCamposVazios(camposVaziosAtual);

        if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
            toast.warn("Preencha todos os campos");
            return;
        }

        setCarregando(true);

        await managerService.DeleteComentario(id, {
            mensagemSucesso: "Comentário deletado com sucesso",
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
                <Titulo>Excluir Comentário:</Titulo>
                <Select
                    color={Cores.preto}
                    backgroundColor="#E4E6F4"
                    fontSize="1em"
                    width="100%"
                    marginTop="5%"
                    marginBottom="5%"
                    size="large"
                    name="id"
                    placeholder="Escolher Comentário"
                    height="45px"
                    borderWidth820="100%"
                    onChange={escolhendoComentario}
                    camposVazios={camposVazios.id}
                >
                    <option value="" disabled selected>
                        Escolher Comentário
                    </option>
                    {comentarios.map((value) => (
                        <option key={value.id} value={value.id}>
                            {value.comentario.length <= 85 ?
                                (
                                    <div> {value.comentario} </div>
                                ) : (
                                    <div> {(value.comentario).substr(0, 85) + "..."} </div>
                                )
                            }
                        </option>
                    ))}
                </Select>
                <TextoIcone>
                    <Button
                        backgroundColor= '#f8d6cf'
                        borderColor= 'red'
                        color={Cores.preto}
                        fontWeight='medium'
                        fontSize='1.7em'
                        fontSizeMedia1080='1.5em'
                        fontSizeMedia950='1.2em'
                        fontSizeMedia480='1em'
                        heightMedia='2em'
                        width='70%'
                        height='50px'
                        gap='1%'
                        marginBottom="2%"
                        boxShadow='3px 3px 5px 0px rgba(0, 0, 0, 0.2)'
                        onClick={() => deletandoComentario(id)}
                    >
                        {carregando ? <Spin indicator={antIcon} /> :
                            <TextoIcone>
                                <div>
                                    Excluir Comentário
                                </div>
                                <Icone>
                                    <DeleteOutlined style={{ marginLeft: "4%" }} />
                                </Icone>
                            </TextoIcone>
                        }
                    </Button>
                </TextoIcone>
            </ContainerModalComentario>
        </>
    );
}

export default ModalExcluirComentario;