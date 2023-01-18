import React, { useState, useEffect } from "react";
import Button from "../../styles/Button";
import { Titulo, Container, ContainerInputs, Botao, Selecionar } from "./Styles";
import Input from "../../styles/Input";
import { Fontes } from "../../variaveis";
import { DeleteOutlined } from "@ant-design/icons";


function ModalExcluirIndicacao (props) {

    const [indicacao, seIndicacao] = useState("");



    return(
        <Container>
            <Titulo>Excluir Indicação:</Titulo>
            <ContainerInputs>
                <Selecionar>
                <option value=''>  Escolher indicação para deletar  </option>
                </Selecionar>
            </ContainerInputs>
            <Botao>
                Excluir Indicação <DeleteOutlined/>
            </Botao>
        </Container>

    )

}


export default ModalExcluirIndicacao;