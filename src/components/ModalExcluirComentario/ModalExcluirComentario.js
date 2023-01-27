import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ContainerModalCodigo, Titulo } from "./Styles";
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
        const { value } = e.target;

        if (camposVazios[value])
            setCamposVazios((valorAnterior) => ({ ...valorAnterior, [value]: false }));

        setEstado({ ...estado, [value]: value });

        setId(value);

        console.log(id);
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
			id_usuario: !estado.id_usuario,
			titulo: !estado.titulo,
			descricao: !estado.descricao,
		};

		setCamposVazios(camposVaziosAtual);

		if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
			toast.warn("Preencha todos os campos");
			return;
		}

        setCarregando(true);

        await managerService.DeleteComentario(id, {
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
                    color={Cores.preto}
                    backgroundColor="#E4E6F4"
                    borderColor="#151B57"
                    fontSize="1em"
                    width="97%"
                    marginTop="5%"
                    marginBottom="5%"
                    size="large"
                    name="id"
                    placeholder="Escolher Comentário para deletar"
                    height="45px"
                    borderWidth820="97%"
                    nome="id"
                    onChange={escolhendoComentario}
                >
                    <option value="" disabled selected>
                        Escolher Comentário para deletar
                    </option>
                    {comentarios.map((value) => (
                        <option key={value.id} value={value.id} color="red">
                            {value.comentario}
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
                    onClick={() => deletandoComentario(id)}
                >
                    {carregando ? <Spin indicator={antIcon} /> : "Excluir Comentário"}
                </Button>
            </ContainerModalCodigo>
        </>
    );
}

export default ModalExcluirComentario;