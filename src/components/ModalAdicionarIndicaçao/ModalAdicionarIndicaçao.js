import React, { useState, useEffect } from "react";
import Button from "../../styles/Button";
import { Titulo } from "./Styles";
import Input from "../../styles/Input";
import { PlusSquareOutlined } from "@ant-design/icons";


function ModalAdicionarIndicaçao () {

    const [nome, setNome] = useState("");
    const [numeroTel, setNumeroTel] = useState("");
    const [localAtendimento, setLocalAtendimento] = useState("");




    return(
        <div>
            <Titulo>Adicionar Indicação:</Titulo>
            <p>Nome:</p>
            <Input
              backgroundColor = "#EAECF"
              borderColor = "black"
            >
            </Input>
            <p>Telefone:</p>
            <Input
              backgroundColor = "#EAECF"
              borderColor = "black"
            >
            </Input>
            <p>Local de Atendimento:</p>
            <Input
              backgroundColor = "#EAECF"
              borderColor = "black"
            >
            </Input>
            <Button
            borderColor="#0A0E3C"
            backgroundColor="#434B97"
            fonstSize="18px"
            fontWeight="500"
            width="50%"
            paddinTop="5px"
            paddinLeft="10px"
            paddinRight="10px"
            >
                ADICIONAR INDICAÇÃO
            <PlusSquareOutlined/></Button>
        </div>

    )

}


export default ModalAdicionarIndicaçao;